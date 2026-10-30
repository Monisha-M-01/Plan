# EventCraft AI: Decoupled Backend & Frontend Prompts for Antigravity IDE
### Senior Principal Software Engineer & Evaluator Specification

This blueprint provides modular, production-ready prompts designed specifically for the **Google Antigravity IDE** agent to build a completely decoupled full-stack architecture:
- **Backend Service (`backend/`)**: Python 3.11+, FastAPI, Pydantic v2, Google GenAI SDK (`google-genai`), SQLite/SQLAlchemy, and CORS.
- **Frontend Client (`frontend/`)**: React 19, Vite, TypeScript, Tailwind CSS, and Lucide Icons.

---

## 1. Decoupled Architecture Overview

```
  +-------------------------------------------------------------+
  |              Frontend Client (Vite + React 19)              |
  |             Port: 5173  |  VITE_API_URL=http://localhost:8000 |
  |                                                             |
  |  - Event Intake Wizard (Category, Guests, Vibe, Budget)     |
  |  - Interactive Budget Ledger & Variance Visualizer          |
  |  - Reverse-Chronological Milestone Timeline (DAG)           |
  |  - Vendor Procurement Hub & 1-Click RFP Copy                |
  |  - Creative Studio (Themes, Speeches, Palettes)             |
  +------------------------------+------------------------------+
                                 |
                                 | REST JSON API (CORS Enabled)
                                 v
  +-------------------------------------------------------------+
  |               Backend Service (FastAPI + Python)            |
  |             Port: 8000  |  Swagger Docs: /docs              |
  |                                                             |
  |  - CORS Middleware (Allow http://localhost:5173)            |
  |  - Pydantic v2 Strict Schema Decoding Layer                 |
  |  - GenAI Planner Service (Gemini 2.5 Flash Structured Mode) |
  |  - Deterministic Arithmetic Normalizer (0% variance rule)   |
  |  - SQLite / SQLAlchemy Relational Persistence               |
  |  - Senior Evaluator Automated Benchmark Test Suite          |
  +-------------------------------------------------------------+
```

---

## 2. Step-by-Step BACKEND Prompts for Antigravity IDE

---

### [ANTIGRAVITY PROMPT B1] Backend Scaffolding, Environment & Dependencies

**Feed this to Antigravity IDE:**
```text
Act as a Senior Backend Architect. Initialize a high-performance Python FastAPI backend in the `backend/` directory for the EventCraft AI planning assistant.

Create the following files with complete, production-ready code (no placeholders):
1. `backend/requirements.txt`: Include fastapi, uvicorn[standard], pydantic>=2.0, google-genai, sqlalchemy, python-dotenv, and pytest.
2. `backend/.env.example`: Include GEMINI_API_KEY, DATABASE_URL (sqlite:///./events.db), and CORS_ORIGINS (http://localhost:5173).
3. `backend/app/config.py`: Load environment variables with os.getenv defaults.
4. `backend/app/database.py`: Setup SQLAlchemy engine, session maker, and Base declarative model for SQLite.

Ensure the structure allows hot-reloading with uvicorn.
```

#### Reference Code for B1:

**`backend/requirements.txt`**
```txt
fastapi>=0.115.0
uvicorn[standard]>=0.32.0
pydantic>=2.10.0
google-genai>=0.1.2
sqlalchemy>=2.0.36
python-dotenv>=1.0.1
pytest>=8.3.0
```

**`backend/app/config.py`**
```python
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./events.db")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")
```

**`backend/app/database.py`**
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import DATABASE_URL

connect_args = {"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

### [ANTIGRAVITY PROMPT B2] Relational Data Models & Pydantic Validation Layer

**Feed this to Antigravity IDE:**
```text
In `backend/`, implement the database entities in `app/models.py` and strict Pydantic v2 schema contracts in `app/schemas.py`.

Requirements:
1. `app/models.py`:
   - Event: id (UUID), title, event_type (WEDDING, BIRTHDAY, COMMUNITY), date, location, total_budget, currency, guest_count, vibe_theme, summary, contingency_advice, created_at.
   - BudgetItem: id, event_id, category, name, allocated, spent, priority (CRITICAL, HIGH, MEDIUM, OPTIONAL), notes.
   - TimelineMilestone: id, event_id, title, phase (PLANNING, FINAL_PREP, DAY_OF, POST_EVENT), days_offset, target_time, description, status.
   - VendorItem: id, event_id, category, role_name, estimated_cost, inquiry_template, questions_json.
   - CreativeIdea: id, event_id, idea_type (THEME_CONCEPT, PALETTE, ACTIVITY, COPYWRITING), title, content, tags.

2. `app/schemas.py`:
   - PlanGenerationRequest: Validate input constraints (budget > 0, guest_count >= 1, valid date YYYY-MM-DD, enum event_type).
   - GenAIFullPlan: Strict structured output contract for Gemini with sub-models (BudgetItemGen, MilestoneGen, VendorGen, IdeaGen).
```

#### Reference Code for B2:

**`backend/app/models.py`**
```python
import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    event_type = Column(String, nullable=False)  # WEDDING, BIRTHDAY, COMMUNITY
    date = Column(String, nullable=False)        # YYYY-MM-DD
    location = Column(String, nullable=False)
    total_budget = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    guest_count = Column(Integer, nullable=False)
    vibe_theme = Column(Text, nullable=False)
    summary = Column(Text, nullable=True)
    contingency_advice = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    budget_items = relationship("BudgetItem", back_populates="event", cascade="all, delete-orphan")
    milestones = relationship("TimelineMilestone", back_populates="event", cascade="all, delete-orphan")
    vendors = relationship("VendorItem", back_populates="event", cascade="all, delete-orphan")
    ideas = relationship("CreativeIdea", back_populates="event", cascade="all, delete-orphan")

class BudgetItem(Base):
    __tablename__ = "budget_items"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id = Column(String, ForeignKey("events.id"), nullable=False)
    category = Column(String, nullable=False)
    name = Column(String, nullable=False)
    allocated = Column(Float, nullable=False)
    spent = Column(Float, default=0.0)
    priority = Column(String, default="HIGH")
    notes = Column(Text, nullable=True)
    event = relationship("Event", back_populates="budget_items")

class TimelineMilestone(Base):
    __tablename__ = "timeline_milestones"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id = Column(String, ForeignKey("events.id"), nullable=False)
    title = Column(String, nullable=False)
    phase = Column(String, nullable=False)
    days_offset = Column(Integer, nullable=False)
    target_time = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    status = Column(String, default="PENDING")
    event = relationship("Event", back_populates="milestones")

class VendorItem(Base):
    __tablename__ = "vendor_items"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id = Column(String, ForeignKey("events.id"), nullable=False)
    category = Column(String, nullable=False)
    role_name = Column(String, nullable=False)
    estimated_cost = Column(Float, nullable=False)
    inquiry_template = Column(Text, nullable=False)
    questions_json = Column(Text, nullable=True)
    event = relationship("Event", back_populates="vendors")

class CreativeIdea(Base):
    __tablename__ = "creative_ideas"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id = Column(String, ForeignKey("events.id"), nullable=False)
    idea_type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    tags = Column(String, nullable=True)
    event = relationship("Event", back_populates="ideas")
```

**`backend/app/schemas.py`**
```python
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
```

---

### [ANTIGRAVITY PROMPT B3] GenAI Core Engine, Arithmetic Normalizer & REST Endpoints

**Feed this to Antigravity IDE:**
```text
In `backend/`, implement the GenAI core engine, prompt templates, deterministic arithmetic normalizer, and the FastAPI application routes.

Files to create:
1. `backend/app/planner_ai.py`:
   - Initialize GoogleGenAI client with GEMINI_API_KEY.
   - Use model `gemini-2.5-flash` with structured outputs (`response_schema=GenAIFullPlan`, temperature=0.3).
   - Inject deep domain guidance for Weddings, Birthdays, and Community events.
   - Implement `reconcile_budget_arithmetic(plan)`: Normalizes percentage allocations so sum(percentage) === 100.0% exactly.
2. `backend/app/main.py`:
   - Initialize FastAPI app with title "EventCraft AI Engine" and automated OpenAPI docs at `/docs`.
   - Add CORSMiddleware with origins from config (http://localhost:5173).
   - Endpoints:
     * POST `/api/plan/generate`: Takes PlanGenerationRequest, calls planner_ai, normalizes budget, saves to database atomically, and returns the full created event.
     * GET `/api/events/{event_id}`: Returns single event with all relational child records.
     * GET `/health`: Basic health check.
```

#### Reference Code for B3:

**`backend/app/planner_ai.py`**
```python
import json
from google import genai
from google.genai import types
from app.config import GEMINI_API_KEY
from app.schemas import PlanGenerationRequest, GenAIFullPlan

client = genai.Client(api_key=GEMINI_API_KEY)

def build_prompt(req: PlanGenerationRequest) -> str:
    domain_rules = {
        "WEDDING": "Wedding Standards: 45-50% Venue/Catering, 12-15% Photography/Video, 10% Music/DJ, 10% Floral/Decor, 8% Attire/Beauty, 7% Planner/Contingency. Enforce reverse-chronological milestones from D-240 days down to D-Day run sheet.",
        "BIRTHDAY": "Birthday Standards: 35-40% Venue/Activities, 35% Food/Cake/Drinks, 15% Decor/Favors, 10% Entertainment/Invites.",
        "COMMUNITY": "Community Event Standards: Mandatory permits (D-90), insurance, public safety, stage/AV, sanitation, waste management, volunteer logistics."
    }[req.eventType]

    return f"""You are a Master Event Producer with 30 years experience.
Create an exhaustive, mathematically coherent plan.

EVENT DETAILS:
- Title: {req.title}
- Category: {req.eventType}
- Date: {req.date}
- Location: {req.location}
- Total Budget: {req.currency} {req.totalBudget}
- Guests: {req.guestCount}
- Vibe/Theme: {req.vibeTheme}
- Special Notes: {req.specialRequests or 'None'}

DOMAIN RULES:
{domain_rules}

CONSTRAINTS:
1. sum(budgetBreakdown.percentage) MUST EQUAL 100.0%.
2. Milestones MUST be chronological with negative daysOffset leading to day 0.
3. Generate copy-paste ready inquiry emails for vendors.
"""

def generate_plan(req: PlanGenerationRequest) -> GenAIFullPlan:
    prompt = build_prompt(req)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.3,
            response_mime_type="application/json",
            response_schema=GenAIFullPlan,
        ),
    )
    data = json.loads(response.text)
    plan = GenAIFullPlan.model_validate(data)
    return reconcile_budget_arithmetic(plan)

def reconcile_budget_arithmetic(plan: GenAIFullPlan) -> GenAIFullPlan:
    items = plan.budgetBreakdown
    if not items:
        return plan
    raw_sum = sum(i.percentage for i in items)
    if abs(raw_sum - 100.0) < 0.001:
        return plan
    
    running = 0.0
    for idx, item in enumerate(items):
        if idx == len(items) - 1:
            item.percentage = round(100.0 - running, 2)
        else:
            norm = round((item.percentage / raw_sum) * 100.0, 2)
            item.percentage = norm
            running += norm
    return plan
```

**`backend/app/main.py`**
```python
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
```

---

## 3. Step-by-Step FRONTEND Prompts for Antigravity IDE

---

### [ANTIGRAVITY PROMPT F1] Frontend Scaffolding, TypeScript Contracts & API Client

**Feed this to Antigravity IDE:**
```text
Act as a Senior Frontend Architect. Initialize a React 19 + Vite + TypeScript application in `frontend/`.

Create the following files with complete, working code:
1. `frontend/package.json`: Include react, react-dom, lucide-react, clsx, tailwind-merge, and dev dependencies (vite, typescript, tailwindcss, postcss, autoprefixer).
2. `frontend/tailwind.config.js`: Dark slate palette with fuchsia and cyan accents.
3. `frontend/.env`: `VITE_API_URL=http://localhost:8000`.
4. `frontend/src/types.ts`: TypeScript interfaces for PlanGenerationRequest, EventDetail, BudgetItem, Milestone, Vendor, and CreativeIdea matching the FastAPI backend JSON contract.
5. `frontend/src/services/api.ts`: API service with `generatePlan(req)` and `fetchEvent(eventId)`.
```

#### Reference Code for F1:

**`frontend/src/types.ts`**
```typescript
export interface PlanGenerationRequest {
  title: string;
  eventType: "WEDDING" | "BIRTHDAY" | "COMMUNITY";
  date: string;
  location: string;
  totalBudget: number;
  currency: string;
  guestCount: number;
  vibeTheme: string;
  specialRequests?: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  name: string;
  allocated: number;
  spent: number;
  priority: string;
  notes?: string;
}

export interface Milestone {
  id: string;
  title: string;
  phase: string;
  daysOffset: number;
  targetTime?: string | null;
  status: string;
  description?: string;
}

export interface Vendor {
  id: string;
  category: string;
  name: string;
  estimatedCost: number;
  inquiryTemplate: string;
  questions: string[];
}

export interface CreativeIdea {
  id: string;
  type: string;
  title: string;
  content: string;
  tags?: string;
}

export interface EventDetail {
  id: string;
  title: string;
  eventType: string;
  date: string;
  location: string;
  totalBudget: number;
  currency: string;
  guestCount: number;
  vibeTheme: string;
  summary?: string;
  contingencyAdvice?: string;
  budgetItems: BudgetItem[];
  milestones: Milestone[];
  vendors: Vendor[];
  ideas: CreativeIdea[];
}
```

**`frontend/src/services/api.ts`**
```typescript
import { PlanGenerationRequest, EventDetail } from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function generatePlan(request: PlanGenerationRequest): Promise<{ eventId: string }> {
  const res = await fetch(`${API_BASE}/api/plan/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Network error" }));
    throw new Error(error.detail || "Failed to generate plan");
  }
  return res.json();
}

export async function fetchEvent(eventId: string): Promise<EventDetail> {
  const res = await fetch(`${API_BASE}/api/events/${eventId}`);
  if (!res.ok) {
    throw new Error("Failed to load event details");
  }
  const data = await res.json();
  return data.event;
}
```

---

### [ANTIGRAVITY PROMPT F2] Modular Event Planning UI Components

**Feed this to Antigravity IDE:**
```text
In `frontend/src/components/`, build the 5 responsive event planning dashboard components:
1. `EventWizard.tsx`: Multi-step intake form with event type selector (Wedding, Birthday, Community), budget slider, date picker, vibe prompt, and generation submit button.
2. `BudgetTracker.tsx`: Financial matrix showing total budget, remaining cash, mathematical variance verification badge, category progress bar, and itemized allocation table.
3. `TimelineRoadmap.tsx`: Reverse-chronological timeline cards with phase filters (Planning, Final Prep, Day-Of, Post-Event) and D-day offset indicators.
4. `VendorChecklist.tsx`: Procurement grid with target budgets, category tags, and a 1-click modal to view and copy the pre-drafted vendor RFP inquiry email.
5. `IdeationBoard.tsx`: Creative studio rendering moodboard concepts, color palettes, and ceremony/cocktail copywriting.
```

---

### [ANTIGRAVITY PROMPT F3] Application Shell & Decoupled State Integration

**Feed this to Antigravity IDE:**
```text
In `frontend/src/App.tsx`, build the main application shell connecting the EventWizard with the active Event dashboard.
- Display a sticky header with the EventCraft AI branding and backend connection status indicator.
- When an event is generated, call `generatePlan(formData)` -> get `eventId` -> call `fetchEvent(eventId)` -> display the BudgetTracker, TimelineRoadmap, VendorChecklist, and IdeationBoard.
- Provide a button to print/export the production brief and a button to return to the intake wizard.
```

---

## 4. Dual Local Execution SOP

### Terminal 1 (Backend - FastAPI):
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
*API live at `http://localhost:8000` | OpenAPI docs at `http://localhost:8000/docs`*

### Terminal 2 (Frontend - React Vite):
```bash
cd frontend
npm install
npm run dev
```
*Frontend live at `http://localhost:5173`*
