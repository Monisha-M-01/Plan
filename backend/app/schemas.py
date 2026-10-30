from typing import List, Optional, Literal
from pydantic import BaseModel, Field

class PlanGenerationRequest(BaseModel):
    title: str = Field(..., min_length=3)
    eventType: Literal["WEDDING", "BIRTHDAY", "COMMUNITY"]
    date: str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    location: str = Field(..., min_length=2)
    totalBudget: float = Field(..., gt=0)
    currency: str = Field(default="USD")
    guestCount: int = Field(..., ge=1)
    vibeTheme: str = Field(..., min_length=3)
    specialRequests: Optional[str] = None

class BudgetItemGen(BaseModel):
    category: str
    name: str
    percentage: float = Field(..., ge=0, le=100)
    priority: Literal["CRITICAL", "HIGH", "MEDIUM", "OPTIONAL"]
    notes: str

class MilestoneGen(BaseModel):
    title: str
    phase: Literal["PLANNING", "FINAL_PREP", "DAY_OF", "POST_EVENT"]
    daysOffset: int
    targetTime: Optional[str] = None
    description: str

class VendorGen(BaseModel):
    category: str
    recommendedVendorRole: str
    estimatedPercentBudget: float
    inquiryTemplate: str
    keyQuestionsToAsk: List[str]

class IdeaGen(BaseModel):
    type: Literal["THEME_CONCEPT", "PALETTE", "ACTIVITY", "COPYWRITING"]
    title: str
    content: str
    tags: List[str]

class GenAIFullPlan(BaseModel):
    eventSummary: str
    budgetBreakdown: List[BudgetItemGen]
    milestones: List[MilestoneGen]
    vendors: List[VendorGen]
    personalizedIdeas: List[IdeaGen]
    contingencyAdvice: str

