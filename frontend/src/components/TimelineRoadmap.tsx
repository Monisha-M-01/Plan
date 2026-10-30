import { useState } from "react";
import { Clock, CalendarDays } from "lucide-react";
import { Milestone } from "../types";

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
    <div className="formal-card p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3D3B8]/60 pb-5">
        <div>
          <h3 className="text-xl font-bold text-[#2B2118] flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FFE9D6] text-[#E87D35]">
              <Clock className="w-5 h-5" />
            </span>
            Milestone Roadmap & Causal Timeline
          </h3>
          <p className="text-xs text-[#6B5B4E] mt-1">
            Reverse-chronological milestones anchored to event date
          </p>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-[#FFE9D6]/50 p-1.5 rounded-xl text-xs border border-[#F3D3B8]">
          {phases.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all duration-150 cursor-pointer ${
                filter === p
                  ? "bg-white text-[#E87D35] shadow-xs"
                  : "text-[#6B5B4E] hover:text-[#2B2118]"
              }`}
            >
              {p.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-7 space-y-5 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#F3D3B8]">
        {filtered.map((m) => {
          const isDayOf = m.daysOffset === 0;
          return (
            <div key={m.id} className="relative group">
              {/* Node dot */}
              <div
                className={`absolute -left-7 top-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform duration-150 ${
                  isDayOf
                    ? "bg-[#E87D35] border-white ring-4 ring-[#FFD9B8]"
                    : "bg-white border-[#F9A66C] group-hover:scale-110"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isDayOf ? "bg-white" : "bg-[#E87D35]"}`} />
              </div>

              {/* Card */}
              <div className="bg-white/95 border border-[#F3D3B8] hover:border-[#F9A66C] rounded-xl p-4 transition-all duration-150 shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#2B2118] text-sm">{m.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFE9D6] text-[#E87D35] border border-[#F3D3B8]">
                      {m.phase}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#E87D35] flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {m.daysOffset < 0 ? `D ${m.daysOffset} days` : m.daysOffset === 0 ? "Live Day-Of" : `D +${m.daysOffset} days`}
                    {m.targetTime && ` @ ${m.targetTime}`}
                  </div>
                </div>
                {m.description && (
                  <p className="text-xs text-[#6B5B4E] leading-relaxed mt-1">
                    {m.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
