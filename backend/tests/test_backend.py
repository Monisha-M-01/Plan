"""Comprehensive Unit and Integration Test Suite for EventCraft AI.

Validates:
- Arithmetic budget normalization algorithms
- Deterministic hashing and response caching
- Domain-specific fallback synthesis engines
- API endpoint handlers (/health, /api/plan/generate, /api/events, /api/vendors)
- Input boundary validation and Pydantic error handling
- Complete event lifecycle (Create -> Retrieve -> List -> Delete -> 404 Verification)
"""

import pytest
from pydantic import ValidationError
from app.database import SessionLocal
from app.schemas import (
    GenAIFullPlan,
    PlanGenerationRequest,
    BudgetItemGen,
    MilestoneGen,
    VendorGen,
    IdeaGen,
)
from app.planner_ai import (
    reconcile_budget_arithmetic,
    compute_plan_cache_key,
    get_cached_plan,
    store_cached_plan,
    generate_fallback_plan,
)
from app.main import (
    health,
    create_event_plan,
    list_events,
    get_event,
    delete_event,
    list_vendors,
)
from fastapi import HTTPException


# ============================================================================
# 1. Arithmetic & Normalization Tests
# ============================================================================

def test_arithmetic_normalizer_exact():
    """Ensure sum of budget percentages is normalized to exactly 100.0%."""
    synthetic_plan = GenAIFullPlan(
        eventSummary="Test Event",
        contingencyAdvice="Contingency buffer",
        budgetBreakdown=[
            BudgetItemGen(category="Venue", name="Main Hall", percentage=45.0, priority="CRITICAL", notes="Deposit paid"),
            BudgetItemGen(category="Catering", name="Dinner Buffet", percentage=35.0, priority="HIGH", notes="100 guests"),
            BudgetItemGen(category="Photo", name="Photographer", percentage=10.0, priority="MEDIUM", notes="8 hours"),
            BudgetItemGen(category="Decor", name="Floral", percentage=10.0, priority="OPTIONAL", notes="Foliage"),
        ],
        milestones=[
            MilestoneGen(title="Book Venue", phase="PLANNING", daysOffset=-180, description="Deposit"),
            MilestoneGen(title="Live Ceremony", phase="DAY_OF", daysOffset=0, targetTime="17:00", description="Start"),
        ],
        vendors=[
            VendorGen(category="Venue", recommendedVendorRole="Hall Lead", estimatedPercentBudget=45.0, inquiryTemplate="Hello", keyQuestionsToAsk=["Curfew?"]),
        ],
        personalizedIdeas=[
            IdeaGen(type="THEME_CONCEPT", title="Golden Hour", content="Olive leaves", tags=["decor"]),
        ],
    )
    reconciled = reconcile_budget_arithmetic(synthetic_plan)
    total_pct = sum(item.percentage for item in reconciled.budgetBreakdown)
    assert abs(total_pct - 100.0) < 0.001


def test_arithmetic_normalizer_uneven_split():
    """Verify normalization when percentages initially sum to an uneven value (e.g. 99.9%)."""
    synthetic_plan = GenAIFullPlan(
        eventSummary="Uneven Split Test",
        contingencyAdvice="Buffer",
        budgetBreakdown=[
            BudgetItemGen(category="A", name="Item A", percentage=33.3, priority="HIGH", notes="Note"),
            BudgetItemGen(category="B", name="Item B", percentage=33.3, priority="HIGH", notes="Note"),
            BudgetItemGen(category="C", name="Item C", percentage=33.3, priority="HIGH", notes="Note"),
        ],
        milestones=[],
        vendors=[],
        personalizedIdeas=[],
    )
    reconciled = reconcile_budget_arithmetic(synthetic_plan)
    total_pct = sum(item.percentage for item in reconciled.budgetBreakdown)
    assert abs(total_pct - 100.0) < 0.001


# ============================================================================
# 2. Caching & Efficiency Tests
# ============================================================================

def test_cache_key_deterministic():
    """Test that identical requests yield identical cache hash keys and strip whitespace."""
    req1 = PlanGenerationRequest(
        title="  Summer Gala  ",
        eventType="WEDDING",
        date="2026-09-15",
        location=" Napa Valley ",
        totalBudget=50000.0,
        currency="USD",
        guestCount=120,
        vibeTheme="Rustic Vineyard",
    )
    req2 = PlanGenerationRequest(
        title="Summer Gala",
        eventType="WEDDING",
        date="2026-09-15",
        location="Napa Valley",
        totalBudget=50000.0,
        currency="USD",
        guestCount=120,
        vibeTheme="Rustic Vineyard",
    )
    assert compute_plan_cache_key(req1) == compute_plan_cache_key(req2)


def test_cache_store_and_retrieve():
    """Test storage and retrieval from in-memory cache."""
    req = PlanGenerationRequest(
        title="Cache Verification",
        eventType="BIRTHDAY",
        date="2026-11-20",
        location="Seattle",
        totalBudget=15000.0,
        currency="USD",
        guestCount=40,
        vibeTheme="Urban Chic",
    )
    cache_key = compute_plan_cache_key(req)
    plan = generate_fallback_plan(req)
    store_cached_plan(cache_key, plan)

    cached_result = get_cached_plan(cache_key)
    assert cached_result is not None
    assert cached_result.eventSummary == plan.eventSummary


# ============================================================================
# 3. Domain Fallback Synthesis Tests
# ============================================================================

def test_fallback_plan_wedding():
    """Verify wedding plan generation contains critical categories and 100% budget sum."""
    req = PlanGenerationRequest(
        title="Elena & Mark Wedding",
        eventType="WEDDING",
        date="2026-08-10",
        location="Sonoma, CA",
        totalBudget=45000.0,
        currency="USD",
        guestCount=90,
        vibeTheme="Tuscan Sunset",
    )
    plan = generate_fallback_plan(req)
    assert len(plan.budgetBreakdown) >= 4
    assert len(plan.milestones) >= 5
    assert len(plan.vendors) >= 3
    assert len(plan.personalizedIdeas) >= 2
    assert abs(sum(b.percentage for b in plan.budgetBreakdown) - 100.0) < 0.001


def test_fallback_plan_birthday():
    """Verify birthday plan generation structure."""
    req = PlanGenerationRequest(
        title="Alex 30th Birthday",
        eventType="BIRTHDAY",
        date="2026-10-05",
        location="Austin, TX",
        totalBudget=8000.0,
        currency="USD",
        guestCount=35,
        vibeTheme="Neon Retro",
    )
    plan = generate_fallback_plan(req)
    assert "birthday" in plan.eventSummary.lower() or "milestone" in plan.eventSummary.lower()
    assert abs(sum(b.percentage for b in plan.budgetBreakdown) - 100.0) < 0.001


def test_fallback_plan_community():
    """Verify community festival generation contains permits and safety components."""
    req = PlanGenerationRequest(
        title="Downtown Arts Fair",
        eventType="COMMUNITY",
        date="2026-12-01",
        location="Portland, OR",
        totalBudget=30000.0,
        currency="USD",
        guestCount=500,
        vibeTheme="Open Civic Celebration",
    )
    plan = generate_fallback_plan(req)
    categories = [b.category.lower() for b in plan.budgetBreakdown]
    assert any("permit" in c or "safety" in c or "stage" in c for c in categories)
    assert abs(sum(b.percentage for b in plan.budgetBreakdown) - 100.0) < 0.001


# ============================================================================
# 4. Input Boundary Validation Tests
# ============================================================================

def test_validation_rejects_negative_budget():
    """Verify Pydantic validation rejects negative or zero budgets."""
    with pytest.raises(ValidationError):
        PlanGenerationRequest(
            title="Invalid Budget Event",
            eventType="WEDDING",
            date="2026-10-10",
            location="Boston",
            totalBudget=-1000.0,
            guestCount=50,
            vibeTheme="Classic",
        )


def test_validation_rejects_invalid_date():
    """Verify Pydantic validation rejects non-ISO date formats."""
    with pytest.raises(ValidationError):
        PlanGenerationRequest(
            title="Invalid Date Event",
            eventType="WEDDING",
            date="10/10/2026",
            location="Boston",
            totalBudget=10000.0,
            guestCount=50,
            vibeTheme="Classic",
        )


def test_validation_rejects_zero_guests():
    """Verify attendee validation requires at least 1 guest."""
    with pytest.raises(ValidationError):
        PlanGenerationRequest(
            title="Zero Guest Event",
            eventType="BIRTHDAY",
            date="2026-10-10",
            location="Boston",
            totalBudget=5000.0,
            guestCount=0,
            vibeTheme="Party",
        )


# ============================================================================
# 5. API Handler & Full Lifecycle Tests
# ============================================================================

def test_health_check_handler():
    """Verify service health handler returns operational status."""
    res = health()
    assert res["status"] == "ok"
    assert "version" in res


def test_full_event_lifecycle_crud():
    """Test full end-to-end lifecycle: Generate -> Read -> List -> Delete -> 404 Verification."""
    db = SessionLocal()
    try:
        req = PlanGenerationRequest(
            title="Unit Test Celebration",
            eventType="WEDDING",
            date="2027-06-20",
            location="Carmel by the Sea, CA",
            totalBudget=60000.0,
            currency="USD",
            guestCount=110,
            vibeTheme="Coastal Elegance",
            specialRequests="Organic wine pairing",
        )

        # 1. Create plan
        create_res = create_event_plan(req=req, db=db)
        assert create_res.success is True
        event_id = create_res.eventId
        assert event_id is not None

        # 2. Duplicate generation tests caching
        dup_res = create_event_plan(req=req, db=db)
        assert dup_res.success is True
        assert dup_res.cached is True

        # 3. Retrieve event details
        detail_res = get_event(event_id=event_id, db=db)
        event = detail_res.event
        assert event.id == event_id
        assert event.title == req.title
        assert len(event.budgetItems) > 0
        assert len(event.milestones) > 0
        assert len(event.vendors) > 0
        assert len(event.ideas) > 0

        # Verify budget calculations match total budget
        total_allocated = sum(b.allocated for b in event.budgetItems)
        assert abs(total_allocated - req.totalBudget) < 1.0

        # 4. List events with pagination
        list_res = list_events(limit=20, offset=0, db=db)
        assert list_res.total >= 1
        ids = [e.id for e in list_res.events]
        assert event_id in ids

        # 5. List vendors
        vendor_res = list_vendors(db=db)
        assert len(vendor_res.vendors) > 0

        # 6. Delete event
        del_res = delete_event(event_id=event_id, db=db)
        assert del_res["success"] is True

        # 7. Verify 404 on deleted event
        with pytest.raises(HTTPException) as exc_info:
            get_event(event_id=event_id, db=db)
        assert exc_info.value.status_code == 404

        # 8. Verify delete on nonexistent returns 404
        with pytest.raises(HTTPException) as exc_del:
            delete_event(event_id=event_id, db=db)
        assert exc_del.value.status_code == 404

    finally:
        db.close()
