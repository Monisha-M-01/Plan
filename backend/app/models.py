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

