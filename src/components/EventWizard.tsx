"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, DollarSign, Users, MapPin, Heart, PartyPopper, UsersRound, Loader2 } from "lucide-react";

interface EventWizardProps {
  onPlanCreated: (eventData: any) => void;
}

export function EventWizard({ onPlanCreated }: EventWizardProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Golden Hour Rooftop Reception",
    eventType: "WEDDING",
    date: "2026-09-18",
    location: "San Francisco, CA",
    totalBudget: 35000,
    currency: "USD",
    guestCount: 120,
    vibeTheme: "Modern Romantic with Terracotta & Olive tones, intimate acoustic live music, farm-to-table dining",
    specialRequests: "Gluten-free dessert options, sunset ceremony timing at 6:45 PM",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/plan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      onPlanCreated(data.event);
    } catch (err: any) {
      alert(`Error generating plan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-xl text-fuchsia-400">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Event Producer</h2>
          <p className="text-sm text-slate-400">Architect your full wedding, birthday, or community event in seconds</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Type Cards */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Event Category</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { type: "WEDDING", label: "Wedding", icon: Heart, desc: "Ceremonies, Receptions" },
              { type: "BIRTHDAY", label: "Birthday", icon: PartyPopper, desc: "Milestones, Themed Parties" },
              { type: "COMMUNITY", label: "Community", icon: UsersRound, desc: "Festivals, Fundraisers" },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = formData.eventType === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setFormData({ ...formData, eventType: item.type })}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-fuchsia-500 bg-fuchsia-500/10 text-white shadow-lg shadow-fuchsia-500/10"
                      : "border-slate-800 bg-slate-850 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-fuchsia-400" : "text-slate-400"}`} />
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Event Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 text-sm"
              placeholder="e.g. Maya & Alex's Wedding"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Location / Venue</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 text-sm"
                placeholder="City, State, or Specific Venue"
              />
            </div>
          </div>
        </div>

        {/* Date, Budget, Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Target Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-fuchsia-500 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Total Budget ($)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="number"
                min="500"
                step="500"
                required
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-fuchsia-500 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Guest Count</label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="number"
                min="5"
                required
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-fuchsia-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Vibe & Special Requests */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Desired Theme, Vibe & Aesthetic</label>
          <textarea
            rows={2}
            required
            value={formData.vibeTheme}
            onChange={(e) => setFormData({ ...formData, vibeTheme: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 text-sm"
            placeholder="Describe colors, music, food style, ambiance..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Special Requests & Notes</label>
          <input
            type="text"
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500 text-sm"
            placeholder="Dietary requirements, timing constraints, custom traditions..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-xl shadow-fuchsia-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Synthesizing Budgets, Timelines & Custom Ideas...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Production-Ready Master Plan
            </>
          )}
        </button>
      </form>
    </div>
  );
}

