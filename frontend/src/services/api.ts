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

