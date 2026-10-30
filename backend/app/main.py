import json
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.config import CORS_ORIGINS
from app.database import Base, engine, get_db
from app.models import Event, BudgetItem, TimelineMilestone, VendorItem, CreativeIdea
from app.schemas import PlanGenerationRequest
from app.planner_ai import generate_plan

Base.metadata.create_all(bind=engine)

app = FastAPI(title="EventCraft AI Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "EventCraft AI Backend"}

@app.post("/api/plan/generate")
def create_event_plan(req: PlanGenerationRequest, db: Session = Depends(get_db)):
    try:
        ai_plan = generate_plan(req)
        
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

        for item in ai_plan.budgetBreakdown:
            dollar_amt = round((item.percentage / 100.0) * req.totalBudget, 2)
            db.add(BudgetItem(
                event_id=event.id,
                category=item.category,
                name=item.name,
                allocated=dollar_amt,
                priority=item.priority,
                notes=item.notes
            ))

        for m in ai_plan.milestones:
            db.add(TimelineMilestone(
                event_id=event.id,
                title=m.title,
                phase=m.phase,
                days_offset=m.daysOffset,
                target_time=m.targetTime,
                description=m.description,
            ))

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
        return {"success": True, "eventId": event.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/events/{event_id}")
def get_event(event_id: str, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    return {
        "event": {
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
            "budgetItems": [{"id": b.id, "category": b.category, "name": b.name, "allocated": b.allocated, "spent": b.spent, "priority": b.priority, "notes": b.notes} for b in event.budget_items],
            "milestones": [{"id": m.id, "title": m.title, "phase": m.phase, "daysOffset": m.days_offset, "targetTime": m.target_time, "description": m.description, "status": m.status} for m in sorted(event.milestones, key=lambda x: x.days_offset)],
            "vendors": [{"id": v.id, "category": v.category, "name": v.role_name, "estimatedCost": v.estimated_cost, "inquiryTemplate": v.inquiry_template, "questions": json.loads(v.questions_json or "[]")} for v in event.vendors],
            "ideas": [{"id": i.id, "type": i.idea_type, "title": i.title, "content": i.content, "tags": i.tags} for i in event.ideas],
        }
    }

