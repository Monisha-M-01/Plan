import os
from pathlib import Path
from dotenv import load_dotenv

# Load backend/.env then root .env as fallback
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent.parent / ".env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./events.db")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

