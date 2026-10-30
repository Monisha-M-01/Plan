import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Clock, Briefcase, Sparkles, Download, ArrowLeft, Calendar, Users, MapPin } from "lucide-react";
import { BudgetTracker } from "./BudgetTracker";
import { TimelineRoadmap } from "./TimelineRoadmap";
import { VendorChecklist } from "./VendorChecklist";
import { IdeationBoard } from "./IdeationBoard";

interface ResultsTabsProps {
  event: any;
  onReset: () => void;
}

type TabType = "budget" | "timeline" | "vendors" | "creative";

export function ResultsTabs({ event, onReset }: ResultsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("budget");

  const tabs = [
    { id: "budget" as TabType, label: "Budget Ledger", icon: DollarSign, count: event.budgetItems?.length },
    { id: "timeline" as TabType, label: "Milestone Timeline", icon: Clock, count: event.milestones?.length },
    { id: "vendors" as TabType, label: "Vendor RFPs", icon: Briefcase, count: event.vendors?.length },
    { id: "creative" as TabType, label: "Creative Studio", icon: Sparkles, count: event.ideas?.length },
  ];

  return (
    <div className="space-y-6">
      {/* Top Action & Overview Card */}
      <div className="glass-panel p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-bold text-[#C2561A] hover:text-[#E87D35] flex items-center gap-1.5 mb-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Modify Parameters
            </button>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2118]">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#6B5B4E] mt-2">
              <span className="text-[#C2561A] bg-[#FFE9D6] border border-[#F3D3B8] px-2.5 py-0.5 rounded-full uppercase font-bold text-[10px] tracking-wider">
                {event.eventType}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#E87D35]" />
                {event.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E87D35]" />
                {event.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#E87D35]" />
                {event.guestCount} Guests
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-white hover:bg-[#FFE9D6]/40 text-[#2B2118] rounded-xl text-xs font-bold flex items-center gap-2 border border-[#F3D3B8] shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#C2561A]" />
              Export Brief (PDF)
            </button>
          </div>
        </div>

        {/* Dynamic Tab Switcher */}
        <div className="border-t border-[#F3D3B8]/70 pt-4">
          <div
            role="tablist"
            aria-label="Event Plan Views"
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "text-[#C2561A] bg-[#FFE9D6] border border-[#F3D3B8] shadow-2xs"
                      : "text-[#6B5B4E] hover:text-[#2B2118] hover:bg-white/60 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#C2561A]" : "text-[#9A8878]"}`} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white text-[#C2561A] font-extrabold"
                          : "bg-[#FFE9D6]/60 text-[#9A8878]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#C2561A] rounded-full"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Panels with Cross-Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "budget" && (
            <BudgetTracker
              totalBudget={event.totalBudget}
              currency={event.currency || "USD"}
              items={event.budgetItems || []}
            />
          )}

          {activeTab === "timeline" && (
            <TimelineRoadmap
              milestones={event.milestones || []}
              targetDate={event.date}
            />
          )}

          {activeTab === "vendors" && (
            <VendorChecklist vendors={event.vendors || []} />
          )}

          {activeTab === "creative" && (
            <IdeationBoard ideas={event.ideas || []} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

