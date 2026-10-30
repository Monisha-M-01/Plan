import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Heart,
  PartyPopper,
  UsersRound,
  Loader2,
  Check,
  AlertCircle,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";

export interface EventFormData {
  title: string;
  eventType: string;
  date: string;
  location: string;
  totalBudget: number;
  currency: string;
  guestCount: number;
  vibeTheme: string;
  specialRequests: string;
}

interface EventWizardProps {
  formData: EventFormData;
  onFormChange: (data: EventFormData) => void;
  onPlanCreated: (eventData: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export function EventWizard({
  formData,
  onFormChange,
  onPlanCreated,
  loading,
  setLoading,
}: EventWizardProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof EventFormData, value: any) => {
    const updated = { ...formData, [field]: value };
    onFormChange(updated);
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) {
      errs.title = "Event title is required.";
    }
    if (!formData.location.trim()) {
      errs.location = "Location or venue is required.";
    }
    if (!formData.date) {
      errs.date = "Target date is required.";
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.date = "Target date cannot be in the past.";
      }
    }
    if (formData.totalBudget <= 0 || isNaN(formData.totalBudget)) {
      errs.totalBudget = "Total budget must be greater than $0.";
    }
    if (formData.guestCount < 1 || isNaN(formData.guestCount)) {
      errs.guestCount = "Guest count must be at least 1.";
    }
    if (!formData.vibeTheme.trim()) {
      errs.vibeTheme = "Theme description is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/plan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Plan generation failed.");

      const eventRes = await fetch(`http://localhost:8000/api/events/${data.eventId}`);
      const eventJson = await eventRes.json();
      onPlanCreated(eventJson.event);
    } catch (err: any) {
      alert(`Generation Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#F3D3B8]/70 pb-4">
        <h2 className="text-lg font-bold text-[#2B2118] flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#C2561A]" />
          Event Parameters
        </h2>
        <p className="text-xs text-[#6B5B4E] mt-0.5">
          Configure baseline capacity, financials, and creative atmosphere.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Category Radio Group */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] mb-2">
            Event Category
          </label>
          <div
            role="radiogroup"
            aria-label="Event Category Selection"
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {[
              { type: "WEDDING", label: "Wedding", icon: Heart, desc: "Ceremony & Reception" },
              { type: "BIRTHDAY", label: "Celebration", icon: PartyPopper, desc: "Milestone Soirée" },
              { type: "COMMUNITY", label: "Community", icon: UsersRound, desc: "Public Gathering" },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = formData.eventType === item.type;
              return (
                <motion.button
                  key={item.type}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateField("eventType", item.type)}
                  className={`relative p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2561A] ${
                    isSelected
                      ? "border-[#C2561A] bg-[#FFE9D6]/90 text-[#2B2118] shadow-xs ring-1 ring-[#C2561A]"
                      : "border-[#F3D3B8] bg-white/70 text-[#6B5B4E] hover:border-[#F9A66C] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#C2561A]" : "text-[#9A8878]"}`} />
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#C2561A] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-xs text-[#2B2118]">{item.label}</div>
                  <div className="text-[11px] text-[#9A8878] mt-0.5 leading-tight">{item.desc}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="event-title"
            className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] mb-1.5"
          >
            Event Title
          </label>
          <input
            id="event-title"
            type="text"
            required
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            className={`w-full h-11 px-3.5 bg-white/95 border rounded-xl text-sm text-[#2B2118] placeholder-[#9A8878] transition-all focus:outline-none focus:ring-2 focus:ring-[#F9A66C] focus:border-[#C2561A] ${
              errors.title ? "border-rose-400 bg-rose-50/30" : "border-[#F3D3B8]"
            }`}
            placeholder="e.g., Golden Hour Terrace Reception"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Location & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="event-location"
              className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] mb-1.5"
            >
              Location / Venue
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-[#C2561A] pointer-events-none" />
              <input
                id="event-location"
                type="text"
                required
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                className={`w-full h-11 pl-9 pr-3.5 bg-white/95 border rounded-xl text-sm text-[#2B2118] placeholder-[#9A8878] transition-all focus:outline-none focus:ring-2 focus:ring-[#F9A66C] focus:border-[#C2561A] ${
                  errors.location ? "border-rose-400 bg-rose-50/30" : "border-[#F3D3B8]"
                }`}
                placeholder="Napa Valley, CA"
              />
            </div>
            {errors.location && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.location}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="target-date"
              className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] mb-1.5"
            >
              Target Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-3.5 text-[#C2561A] pointer-events-none" />
              <input
                id="target-date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => updateField("date", e.target.value)}
                className={`w-full h-11 pl-9 pr-3.5 bg-white/95 border rounded-xl text-sm text-[#2B2118] transition-all focus:outline-none focus:ring-2 focus:ring-[#F9A66C] focus:border-[#C2561A] ${
                  errors.date ? "border-rose-400 bg-rose-50/30" : "border-[#F3D3B8]"
                }`}
              />
            </div>
            {errors.date && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.date}
              </p>
            )}
          </div>
        </div>

        {/* Budget & Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="total-budget"
              className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] mb-1.5"
            >
              Total Budget ($ USD)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3 top-3.5 text-[#C2561A] pointer-events-none" />
              <input
                id="total-budget"
                type="number"
                min="500"
                step="500"
                required
                value={formData.totalBudget}
                onChange={(e) => updateField("totalBudget", Number(e.target.value))}
                className={`w-full h-11 pl-9 pr-3.5 bg-white/95 border rounded-xl text-sm text-[#2B2118] transition-all focus:outline-none focus:ring-2 focus:ring-[#F9A66C] focus:border-[#C2561A] ${
                  errors.totalBudget ? "border-rose-400 bg-rose-50/30" : "border-[#F3D3B8]"
                }`}
              />
            </div>
            {errors.totalBudget && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.totalBudget}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="guest-count"
              className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] mb-1.5"
            >
              Guest Count
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3 top-3.5 text-[#C2561A] pointer-events-none" />
              <input
                id="guest-count"
                type="number"
                min="1"
                required
                value={formData.guestCount}
                onChange={(e) => updateField("guestCount", Number(e.target.value))}
                className={`w-full h-11 pl-9 pr-3.5 bg-white/95 border rounded-xl text-sm text-[#2B2118] transition-all focus:outline-none focus:ring-2 focus:ring-[#F9A66C] focus:border-[#C2561A] ${
                  errors.guestCount ? "border-rose-400 bg-rose-50/30" : "border-[#F3D3B8]"
                }`}
              />
            </div>
            {errors.guestCount && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.guestCount}
              </p>
            )}
          </div>
        </div>

        {/* Desired Atmosphere / Vibe */}
        <div>
          <label
            htmlFor="vibe-theme"
            className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] mb-1.5"
          >
            Atmosphere & Aesthetic Notes
          </label>
          <textarea
            id="vibe-theme"
            rows={2}
            required
            value={formData.vibeTheme}
            onChange={(e) => updateField("vibeTheme", e.target.value)}
            className={`w-full p-3 bg-white/95 border rounded-xl text-sm text-[#2B2118] placeholder-[#9A8878] transition-all focus:outline-none focus:ring-2 focus:ring-[#F9A66C] focus:border-[#C2561A] ${
              errors.vibeTheme ? "border-rose-400 bg-rose-50/30" : "border-[#F3D3B8]"
            }`}
            placeholder="Colors, styling, lighting, acoustic vibes..."
          />
          {errors.vibeTheme && (
            <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.vibeTheme}
            </p>
          )}
        </div>

        {/* Special Requests */}
        <div>
          <label
            htmlFor="special-requests"
            className="block text-[11px] font-bold uppercase tracking-wider text-[#6B5B4E] mb-1.5"
          >
            Special Requirements (Optional)
          </label>
          <input
            id="special-requests"
            type="text"
            value={formData.specialRequests}
            onChange={(e) => updateField("specialRequests", e.target.value)}
            className="w-full h-11 px-3.5 bg-white/95 border border-[#F3D3B8] rounded-xl text-sm text-[#2B2118] placeholder-[#9A8878] transition-all focus:outline-none focus:ring-2 focus:ring-[#F9A66C] focus:border-[#C2561A]"
            placeholder="Dietary requirements, signature cocktails, load-in timings..."
          />
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full h-12 bg-[#F9A66C] hover:bg-[#F28F4B] active:bg-[#E87D35] text-white font-bold rounded-xl shadow-warm-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C2561A]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Synthesizing Event Plan...
              </>
            ) : (
              <>
                <span>Generate Event Plan</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            )}
          </motion.button>
          <p className="text-[11px] text-[#9A8878] text-center mt-2">
            Budget splits and milestones compute in real time via live schema.
          </p>
        </div>
      </form>
    </div>
  );
}
