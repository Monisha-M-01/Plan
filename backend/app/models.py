"""SQLAlchemy ORM models for EventCraft AI.

Defines schemas for Events, BudgetItems, TimelineMilestones,
VendorItems, and CreativeIdeas with optimized indexing and foreign key constraints.
"""

from __future__ import annotations
import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database import Base


def utcnow() -> datetime:
    """Return timezone-aware current UTC datetime."""
    return datetime.now(timezone.utc)


class Event(Base):
    """Core Event entity storing metadata, parameters, and generated outputs."""

    __tablename__ = "events"

    id: str = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title: str = Column(String(150), nullable=False)
    event_type: str = Column(String(50), nullable=False)  # WEDDING, BIRTHDAY, COMMUNITY
    date: str = Column(String(10), nullable=False)        # YYYY-MM-DD
    location: str = Column(String(150), nullable=False)
    total_budget: float = Column(Float, nullable=False)
    currency: str = Column(String(10), default="USD")
    guest_count: int = Column(Integer, nullable=False)
    vibe_theme: str = Column(Text, nullable=False)
    summary: str | None = Column(Text, nullable=True)
    contingency_advice: str | None = Column(Text, nullable=True)
    created_at: datetime = Column(DateTime, default=utcnow, index=True)

    # Relationships with eager cleanup cascade
    budget_items = relationship("BudgetItem", back_populates="event", cascade="all, delete-orphan", lazy="selectin")
    milestones = relationship("TimelineMilestone", back_populates="event", cascade="all, delete-orphan", lazy="selectin")
    vendors = relationship("VendorItem", back_populates="event", cascade="all, delete-orphan", lazy="selectin")
    ideas = relationship("CreativeIdea", back_populates="event", cascade="all, delete-orphan", lazy="selectin")


class BudgetItem(Base):
    """Individual line item allocated within an event's total budget."""

    __tablename__ = "budget_items"

    id: str = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id: str = Column(String, ForeignKey("events.id", ondelete="CASCADE"), nullable=False, index=True)
    category: str = Column(String(100), nullable=False)
    name: str = Column(String(150), nullable=False)
    allocated: float = Column(Float, nullable=False)
    spent: float = Column(Float, default=0.0)
    priority: str = Column(String(20), default="HIGH")  # CRITICAL, HIGH, MEDIUM, OPTIONAL
    notes: str | None = Column(Text, nullable=True)

    event = relationship("Event", back_populates="budget_items")


class TimelineMilestone(Base):
    """Chronological milestone or schedule item on the production roadmap."""

    __tablename__ = "timeline_milestones"

    id: str = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id: str = Column(String, ForeignKey("events.id", ondelete="CASCADE"), nullable=False, index=True)
    title: str = Column(String(150), nullable=False)
    phase: str = Column(String(50), nullable=False)  # PLANNING, FINAL_PREP, DAY_OF, POST_EVENT
    days_offset: int = Column(Integer, nullable=False, index=True)
    target_time: str | None = Column(String(20), nullable=True)
    description: str | None = Column(Text, nullable=True)
    status: str = Column(String(20), default="PENDING")

    event = relationship("Event", back_populates="milestones")


class VendorItem(Base):
    """Recommended vendor category, inquiry template, and interview guidelines."""

    __tablename__ = "vendor_items"

    id: str = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id: str = Column(String, ForeignKey("events.id", ondelete="CASCADE"), nullable=False, index=True)
    category: str = Column(String(100), nullable=False)
    role_name: str = Column(String(150), nullable=False)
    estimated_cost: float = Column(Float, nullable=False)
    inquiry_template: str = Column(Text, nullable=False)
    questions_json: str | None = Column(Text, nullable=True)

    event = relationship("Event", back_populates="vendors")


class CreativeIdea(Base):
    """AI-curated creative concept, theme prompt, color palette, or activity."""

    __tablename__ = "creative_ideas"

    id: str = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_id: str = Column(String, ForeignKey("events.id", ondelete="CASCADE"), nullable=False, index=True)
    idea_type: str = Column(String(50), nullable=False)  # THEME_CONCEPT, PALETTE, ACTIVITY, COPYWRITING
    title: str = Column(String(150), nullable=False)
    content: str = Column(Text, nullable=False)
    tags: str | None = Column(String(200), nullable=True)

    event = relationship("Event", back_populates="ideas")
