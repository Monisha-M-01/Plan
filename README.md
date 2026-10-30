# EventCraft AI — Intelligent Event Planning & Production OS

EventCraft AI is a full-stack, enterprise-grade event engineering and production suite. It pairs a **FastAPI backend AI engine** with a **React + Vite studio dashboard** featuring an asymmetric two-pane layout, real-time budget arithmetic, milestone dependency tracking, vendor RFP generators, and creative mood boards.

---

## 📸 Key Capabilities & Architecture

- **Asymmetric Studio Layout**:
  - **Left Pane (~40%)**: Live parameter configuration (title, venue, target date, budget, guest count, aesthetic atmosphere notes, and radio category selector for Weddings, Celebrations, and Community Events).
  - **Right Pane (~60%)**: 
    - *Pre-generation*: Live blueprint preview computing countdown days, cost per attendee, and dynamic department budget allocation bars in real time as the user types.
    - *Post-generation*: Tabbed production results suite across **Budget Ledger**, **Milestone Timeline**, **Vendor RFPs**, and **Creative Studio**.
- **Mathematical Budget Coherence**: Enforces 100% budget allocation reconciliation with zero rounding drift across all categories.
- **Causal Milestone Roadmap**: Reverse-chronological timeline mapping from pre-planning ($D-240$ days) through day-of run sheets ($D-0$) down to post-event load-out ($D+1$).
- **Vendor RFP Generator**: Ready-to-send personalized inquiry email templates and vendor interview checklists.
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

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js**: v18+ and `npm`
- **Python**: v3.10+
- **Gemini API Key**: From [Google AI Studio](https://aistudio.google.com/)

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and supply your GEMINI_API_KEY
```

Run the backend server:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The backend will be live at:
- **API Base**: `http://localhost:8000`
- **Swagger Documentation**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/health`

---

### 3. Frontend Setup

In a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev -- --host 0.0.0.0 --port 5173
```
Open **`http://localhost:5173`** in your browser.

---

## ⚙️ Environment Configuration

### Root / Backend `.env`
```env
GEMINI_API_KEY="your-gemini-api-key"
DATABASE_URL="sqlite:///./events.db"
CORS_ORIGINS="http://localhost:5173,http://localhost:3000"
```

---

## 📊 API Specification Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Health check & service ping |
| `POST` | `/api/plan/generate` | Generates a complete event plan from user specifications |
| `GET` | `/api/events/{id}` | Fetches detailed plan, itemized budget, milestones, and vendors |

---

## 📄 License
MIT © 2026 EventCraft AI
