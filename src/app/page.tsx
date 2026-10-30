"use client";

import React, { useState } from "react";
import { EventWizard } from "@/components/EventWizard";
import { BudgetTracker } from "@/components/BudgetTracker";
import { TimelineRoadmap } from "@/components/TimelineRoadmap";
import { VendorChecklist } from "@/components/VendorChecklist";
import { IdeationBoard } from "@/components/IdeationBoard";
import { ArrowLeft, Download, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const [currentEvent, setCurrentEvent] = useState<any | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-fuchsia-500 selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-fuchsia-600 to-pink-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-fuchsia-500/20">
              E
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">EventCraft</span>
              <span className="text-fuchsia-400 font-bold ml-1 text-xs">AI Studio</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Antigravity Engine Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {!currentEvent ? (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Plan Unforgettable Events with <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-amber-400">GenAI Precision</span>
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                Architect complete weddings, birthdays, and community festivals with mathematical budget guarantees, reverse-chronological milestones, and customized vendor RFPs.
              </p>
            </div>
            <EventWizard onPlanCreated={(evt) => setCurrentEvent(evt)} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div>
                <button
                  onClick={() => setCurrentEvent(null)}
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 mb-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Plan Another Event
                </button>
                <h2 className="text-2xl font-bold text-white">{currentEvent.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{currentEvent.eventType}</span>
                  <span>•</span>
                  <span>{new Date(currentEvent.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{currentEvent.location}</span>
                  <span>•</span>
                  <span>{currentEvent.guestCount} Guests</span>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Export Production Brief (PDF)
              </button>
            </div>

            {/* Dashboard Tabs & Modules */}
            <div className="grid grid-cols-1 gap-8">
              <BudgetTracker
                totalBudget={currentEvent.totalBudget}
                currency={currentEvent.currency}
                items={currentEvent.budgetItems}
              />
              <TimelineRoadmap
                milestones={currentEvent.timelineItems}
                targetDate={currentEvent.date}
              />
              <VendorChecklist vendors={currentEvent.vendors} />
              <IdeationBoard ideas={currentEvent.creativeIdeas} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

