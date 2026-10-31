# EventCraft AI — Intelligent Event Planning & Production OS

EventCraft AI is a full-stack, enterprise-grade event engineering and production suite. It pairs a **FastAPI backend AI engine** with a **React + Vite studio dashboard** featuring an asymmetric two-pane layout, real-time budget arithmetic, milestone dependency tracking, vendor RFP generators, and creative mood boards.

---

## 📸 Key Capabilities & Architecture

- **Asymmetric Studio Layout**:
  - **Left Pane (~40%)**: Live parameter configuration (title, venue, target date, budget, guest count, aesthetic atmosphere notes, and radio category selector for Weddings, Celebrations, and Community Events).
  - **Right Pane (~60%)**: 
    - *Pre-generation*: Live blueprint preview computing countdown days, cost per attendee ($/guest), and dynamic department budget allocation bars in real time as the user types.
    - *Post-generation*: Tabbed production results suite across **Budget Ledger**, **Milestone Timeline**, **Vendor RFPs**, and **Creative Studio**.
- **Mathematical Budget Coherence**: Enforces 100% budget allocation reconciliation with zero rounding drift across all categories.
- **Causal Milestone Roadmap**: Reverse-chronological timeline mapping from pre-planning ($D-240$ days) through day-of run sheets ($D-0$) down to post-event load-out ($D+1$).
- **Vendor RFP Generator & Directory**: Ready-to-send personalized inquiry email templates, vendor interview checklists, and a curated vendor catalog with one-click copy actions.
- **Saved Events Registry**: Local SQLite database persistence to inspect, manage, and reload previously generated event architectures back into the workspace.
- **Design System**: Warm pastel peach & cream palette (`#FFF4EA` → `#FFE8D6`) accented with burnt ochre (`#C2561A`), glassmorphism cards, and strict WCAG AA contrast compliance.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide React
- **Animations**: Framer Motion + Canvas Confetti
- **Typography**: Plus Jakarta Sans / Inter & Playfair Display

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **ASGI Server**: Uvicorn
- **AI Core**: Google Gemini API (`@google/genai` SDK with `gemini-3.8-flash` / domain synthesis engine)
- **Database**: SQLite with SQLAlchemy ORM + Pydantic v2 schemas

---

## 📊 API Specification Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Health check & service ping |
| `POST` | `/api/plan/generate` | Generates a complete event plan from user specifications |
| `GET` | `/api/events` | Lists all saved event blueprints from database registry |
| `GET` | `/api/events/{id}` | Fetches detailed plan, itemized budget, milestones, and vendors |
| `DELETE` | `/api/events/{id}` | Deletes an event and associated records from database |
| `GET` | `/api/vendors` | Returns vendor directory specifications and RFP templates |
