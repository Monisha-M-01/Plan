"""FastAPI Application Entrypoint for EventCraft AI.

Exposes RESTful endpoints for intelligent plan generation, event persistence,
vendor directory exploration, and operational health checks.
"""

from __future__ import annotations
import json
import logging
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, selectinload, joinedload
from app.config import CORS_ORIGINS
from app.database import Base, engine, get_db
from app.models import Event, BudgetItem, TimelineMilestone, VendorItem, CreativeIdea
from app.schemas import (
    PlanGenerationRequest,
    GeneratePlanResponse,
    EventListResponse,
    EventDetailResponse,
    VendorListResponse,
)
from app.planner_ai import generate_plan

logger = logging.getLogger(__name__)

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EventCraft AI Engine",
    description="High-performance intelligent event planning and budget optimization microservice.",
    version="1.1.0",
)

# CORS configuration supporting development and production deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(
    "/health",
    tags=["System"],
    summary="Service health check",
    status_code=status.HTTP_200_OK,
)
def health() -> dict[str, str]:
    """Return operational health status of the backend engine."""
    return {"status": "ok", "service": "EventCraft AI Backend", "version": "1.1.0"}


@app.post(
    "/api/plan/generate",
    response_model=GeneratePlanResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Planner"],
    summary="Synthesize and persist an intelligent event plan",
)
def create_event_plan(
    req: PlanGenerationRequest,
    db: Session = Depends(get_db),
) -> GeneratePlanResponse:
    """Generate an event plan via Gemini AI and persist all normalized sub-resources."""
    try:
        ai_plan, is_cached = generate_plan(req)

        event = Event(
            title=req.title,
            event_type=req.eventType,
            date=req.date,
            location=req.location,
            total_budget=req.totalBudget,
            currency=req.currency,
            guest_count=req.guestCount,
            vibe_theme=req.vibeTheme,
            summary=ai_plan.eventSummary,
            contingency_advice=ai_plan.contingencyAdvice,
        )
        db.add(event)
        db.flush()

        # Batch insert budget items
        for item in ai_plan.budgetBreakdown:
            dollar_amt = round((item.percentage / 100.0) * req.totalBudget, 2)
            db.add(BudgetItem(
                event_id=event.id,
                category=item.category,
                name=item.name,
                allocated=dollar_amt,
                priority=item.priority,
                notes=item.notes,
            ))

        # Batch insert milestones
        for m in ai_plan.milestones:
            db.add(TimelineMilestone(
                event_id=event.id,
                title=m.title,
                phase=m.phase,
                days_offset=m.daysOffset,
                target_time=m.targetTime,
                description=m.description,
            ))

        # Batch insert vendors
        for v in ai_plan.vendors:
            cost = round((v.estimatedPercentBudget / 100.0) * req.totalBudget, 2)
            db.add(VendorItem(
                event_id=event.id,
                category=v.category,
                role_name=v.recommendedVendorRole,
                estimated_cost=cost,
                inquiry_template=v.inquiryTemplate,
                questions_json=json.dumps(v.keyQuestionsToAsk),
            ))

        # Batch insert creative ideas
        for idea in ai_plan.personalizedIdeas:
            db.add(CreativeIdea(
                event_id=event.id,
                idea_type=idea.type,
                title=idea.title,
                content=idea.content,
                tags=",".join(idea.tags),
            ))

        db.commit()
        db.refresh(event)
        return GeneratePlanResponse(success=True, eventId=event.id, cached=is_cached)
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to generate event plan: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Plan generation failed: {str(e)}",
        )


@app.get(
    "/api/events",
    response_model=EventListResponse,
    tags=["Events"],
    summary="List persisted events with pagination",
)
def list_events(
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db),
) -> EventListResponse:
    """Retrieve saved events using eager loading to eliminate N+1 queries."""
    total = db.query(Event).count()
    events = (
        db.query(Event)
        .options(
            selectinload(Event.budget_items),
            selectinload(Event.milestones),
            selectinload(Event.vendors),
        )
        .order_by(Event.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return EventListResponse(
        total=total,
        events=[
            {
                "id": e.id,
                "title": e.title,
                "eventType": e.event_type,
                "date": e.date,
                "location": e.location,
                "totalBudget": e.total_budget,
                "currency": e.currency,
                "guestCount": e.guest_count,
                "summary": e.summary,
                "vibeTheme": e.vibe_theme,
                "createdAt": e.created_at.isoformat() if e.created_at else None,
                "budgetCount": len(e.budget_items),
                "milestoneCount": len(e.milestones),
                "vendorCount": len(e.vendors),
            }
            for e in events
        ],
    )


@app.get(
    "/api/events/{event_id}",
    response_model=EventDetailResponse,
    tags=["Events"],
    summary="Get comprehensive details of a single event",
)
def get_event(event_id: str, db: Session = Depends(get_db)) -> EventDetailResponse:
    """Retrieve full event specification including budget, timeline, vendors, and ideas."""
    event = (
        db.query(Event)
        .options(
            selectinload(Event.budget_items),
            selectinload(Event.milestones),
            selectinload(Event.vendors),
            selectinload(Event.ideas),
        )
        .filter(Event.id == event_id)
        .first()
    )
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event with id '{event_id}' not found",
        )

    return EventDetailResponse(
        event={
            "id": event.id,
            "title": event.title,
            "eventType": event.event_type,
            "date": event.date,
            "location": event.location,
            "totalBudget": event.total_budget,
            "currency": event.currency,
            "guestCount": event.guest_count,
            "vibeTheme": event.vibe_theme,
            "summary": event.summary,
            "contingencyAdvice": event.contingency_advice,
            "budgetItems": [
                {
                    "id": b.id,
                    "category": b.category,
                    "name": b.name,
                    "allocated": b.allocated,
                    "spent": b.spent,
                    "priority": b.priority,
                    "notes": b.notes,
                }
                for b in event.budget_items
            ],
            "milestones": [
                {
                    "id": m.id,
                    "title": m.title,
                    "phase": m.phase,
                    "daysOffset": m.days_offset,
                    "targetTime": m.target_time,
                    "description": m.description,
                    "status": m.status,
                }
                for m in sorted(event.milestones, key=lambda x: x.days_offset)
            ],
            "vendors": [
                {
                    "id": v.id,
                    "category": v.category,
                    "name": v.role_name,
                    "estimatedCost": v.estimated_cost,
                    "inquiryTemplate": v.inquiry_template,
                    "questions": json.loads(v.questions_json or "[]"),
                }
                for v in event.vendors
            ],
            "ideas": [
                {
                    "id": i.id,
                    "type": i.idea_type,
                    "title": i.title,
                    "content": i.content,
                    "tags": i.tags,
                }
                for i in event.ideas
            ],
        }
    )


@app.delete(
    "/api/events/{event_id}",
    tags=["Events"],
    summary="Delete an event and its cascading records",
)
def delete_event(event_id: str, db: Session = Depends(get_db)) -> dict[str, object]:
    """Permanently delete an event and its associated relational entries."""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event with id '{event_id}' not found",
        )
    db.delete(event)
    db.commit()
    return {"success": True, "deletedId": event_id}


@app.get(
    "/api/vendors",
    response_model=VendorListResponse,
    tags=["Vendors"],
    summary="List deduplicated vendor catalog across events",
)
def list_vendors(db: Session = Depends(get_db)) -> VendorListResponse:
    """Retrieve distinct vendor catalog with joinedload to eliminate N+1 queries."""
    vendors = db.query(VendorItem).options(joinedload(VendorItem.event)).all()
    vendor_list = []
    seen: set[tuple[str, str]] = set()

    for v in vendors:
        key = (v.category, v.role_name)
        if key not in seen:
            seen.add(key)
            vendor_list.append({
                "id": v.id,
                "category": v.category,
                "roleName": v.role_name,
                "estimatedCost": v.estimated_cost,
                "inquiryTemplate": v.inquiry_template,
                "questions": json.loads(v.questions_json or "[]"),
                "eventTitle": v.event.title if v.event else None,
                "eventDate": v.event.date if v.event else None,
            })

    return VendorListResponse(vendors=vendor_list)
