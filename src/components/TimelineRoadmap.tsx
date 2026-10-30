"use client";

import React, { useState } from "react";
import { Clock, CalendarDays } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  phase: string;
  daysOffset: number;
  targetTime?: string | null;
  status: string;
  description?: string | null;
}

interface TimelineRoadmapProps {
  milestones: Milestone[];
  targetDate: string;
}

export function TimelineRoadmap({ milestones }: TimelineRoadmapProps) {
  const [filter, setFilter] = useState<string>("ALL");

  const phases = ["ALL", "PLANNING", "FINAL_PREP", "DAY_OF", "POST_EVENT"];

  const filtered = filter === "ALL" 
    ? milestones 
    : milestones.filter((m) => m.phase === filter);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Execution Roadmap & Milestone DAG
          </h3>
          <p className="text-xs text-slate-400">Reverse-chronological dependency pipeline keyed to target date</p>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex gap-1 bg-slate-800 p-1 rounded-xl text-xs">
          {phases.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filter === p
                  ? "bg-cyan-500 text-slate-950 font-bold shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {p.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {filtered.map((m) => {
          const isDayOf = m.daysOffset === 0;
          return (
            <div key={m.id} className="relative group">
              {/* Dot */}
              <div className={`absolute -left-6 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                isDayOf 
                  ? "bg-fuchsia-500 border-fuchsia-300 ring-4 ring-fuchsia-500/20" 
                  : "bg-slate-900 border-cyan-400"
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isDayOf ? "bg-white" : "bg-cyan-400"}`} />
              </div>

              {/* Card */}
              <div className="bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{m.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {m.phase}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {m.daysOffset < 0 ? `D ${m.daysOffset} days` : m.daysOffset === 0 ? "D-Day (Live)" : `D +${m.daysOffset} days`}
                    {m.targetTime && ` @ ${m.targetTime}`}
                  </div>
                </div>
                {m.description && (
                  <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

