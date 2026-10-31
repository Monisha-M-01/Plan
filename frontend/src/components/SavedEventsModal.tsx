import { useState, useEffect } from "react";
import { Calendar, DollarSign, Users, MapPin, Trash2, ArrowRight, X, Clock, Layers, Loader2 } from "lucide-react";
import { API_BASE } from "../services/api";

interface SavedEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (eventData: any) => void;
}

export function SavedEventsModal({ isOpen, onClose, onSelectEvent }: SavedEventsModalProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);

  const fetchSavedEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/events`);
      if (!res.ok) throw new Error("Failed to load saved events");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err: any) {
      setError(err.message || "Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSavedEvents();
    }
  }, [isOpen]);

  const handleOpenEvent = async (id: string) => {
    setLoadingEventId(id);
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`);
      if (!res.ok) throw new Error("Could not retrieve event details");
      const data = await res.json();
      onSelectEvent(data.event);
      onClose();
    } catch (err: any) {
      alert(`Error loading event: ${err.message}`);
    } finally {
      setLoadingEventId(null);
    }
  };

  const handleDeleteEvent = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this saved event?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setEvents((prev) => prev.filter((it) => it.id !== id));
    } catch (err: any) {
      alert(`Error deleting event: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2B2118]/40 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-warm-lg border border-[#F3D3B8] bg-white/95">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#F3D3B8]/80 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE9D6] border border-[#F3D3B8] text-[10px] font-bold uppercase tracking-wider text-[#C2561A] mb-1">
              Database Registry
            </div>
            <h2 className="text-xl font-bold text-[#2B2118]">Saved Event Blueprints</h2>
            <p className="text-xs text-[#6B5B4E]">
              Browse, reopen, or manage all generated event architectures.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#FFE9D6]/60 border border-[#F3D3B8] flex items-center justify-center text-[#6B5B4E] hover:text-[#2B2118] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-7 h-7 text-[#C2561A] animate-spin mx-auto" />
              <p className="text-xs font-semibold text-[#6B5B4E]">Loading saved blueprints from database...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          ) : events.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE9D6] text-[#C2561A] flex items-center justify-center mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#2B2118] text-sm">No Saved Events Found</h3>
              <p className="text-xs text-[#6B5B4E] max-w-sm mx-auto">
                Generate your first event plan using the Studio Workspace form to save it automatically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => handleOpenEvent(ev.id)}
                  className="p-5 rounded-2xl bg-white/80 hover:bg-[#FFE9D6]/30 border border-[#F3D3B8] shadow-2xs hover:shadow-warm-sm transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#C2561A] bg-[#FFE9D6] px-2 py-0.5 rounded-full border border-[#F3D3B8]">
                        {ev.eventType}
                      </span>
                      <button
                        title="Delete Event"
                        disabled={deletingId === ev.id}
                        onClick={(e) => handleDeleteEvent(ev.id, e)}
                        className="p-1 text-[#9A8878] hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
                      >
                        {deletingId === ev.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#2B2118] group-hover:text-[#C2561A] transition-colors leading-snug">
                      {ev.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#6B5B4E]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C2561A]" />
                        {ev.date}
                      </span>
                      <span className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#C2561A] shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-[#2B2118]">
                        <DollarSign className="w-3.5 h-3.5 text-[#C2561A]" />
                        ${ev.totalBudget?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#C2561A]" />
                        {ev.guestCount} Attendees
                      </span>
                    </div>

                    {ev.summary && (
                      <p className="text-[11px] text-[#9A8878] line-clamp-2 leading-relaxed pt-1 border-t border-[#F3D3B8]/50">
                        {ev.summary}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F3D3B8]/70 flex items-center justify-between text-xs font-bold text-[#C2561A]">
                    <span>
                      {ev.budgetCount || 0} line items • {ev.milestoneCount || 0} milestones
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {loadingEventId === ev.id ? "Loading..." : "Open Plan"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#F3D3B8]/80 bg-[#FFE9D6]/20 flex justify-between items-center text-xs text-[#6B5B4E]">
          <span>{events.length} saved plan(s) in local SQLite database</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-[#F3D3B8] rounded-xl font-bold text-[#2B2118] hover:bg-[#FFE9D6]/40 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

