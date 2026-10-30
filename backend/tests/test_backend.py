import pytest
from app.schemas import GenAIFullPlan, PlanGenerationRequest
from app.planner_ai import reconcile_budget_arithmetic

def test_arithmetic_normalizer():
    synthetic_plan = {
        "eventSummary": "Test Event",
        "contingencyAdvice": "Contingency buffer",
        "budgetBreakdown": [
            {"category": "Venue", "name": "Main Hall", "percentage": 45.0, "priority": "CRITICAL", "notes": "Deposit paid"},
            {"category": "Catering", "name": "Dinner Buffet", "percentage": 35.0, "priority": "HIGH", "notes": "100 guests"},
            {"category": "Photo", "name": "Photographer", "percentage": 10.0, "priority": "MEDIUM", "notes": "8 hours"},
            {"category": "Decor", "name": "Floral", "percentage": 10.0, "priority": "OPTIONAL", "notes": "Foliage"}
        ],
        "milestones": [
            {"title": "Book Venue", "phase": "PLANNING", "daysOffset": -180, "description": "Deposit"},
            {"title": "Live Ceremony", "phase": "DAY_OF", "daysOffset": 0, "targetTime": "17:00", "description": "Start"}
        ],
        "vendors": [
            {"category": "Venue", "recommendedVendorRole": "Hall Lead", "estimatedPercentBudget": 45.0, "inquiryTemplate": "Hello", "keyQuestionsToAsk": ["Curfew?"]}
        ],
        "personalizedIdeas": [
            {"type": "THEME_CONCEPT", "title": "Golden Hour", "content": "Olive leaves", "tags": ["decor"]}
        ]
    }
    plan = GenAIFullPlan.model_validate(synthetic_plan)
    reconciled = reconcile_budget_arithmetic(plan)
    total_pct = sum(item.percentage for item in reconciled.budgetBreakdown)
    assert abs(total_pct - 100.0) < 0.001

