import { motion } from "framer-motion";
import { Calendar, DollarSign, Users, MapPin, Clock, Compass, Layers, CheckCircle2 } from "lucide-react";

interface PlanPreviewProps {
  formData: {
    title: string;
    eventType: string;
    date: string;
    location: string;
    totalBudget: number;
    guestCount: number;
    vibeTheme: string;
  };
  isLoading: boolean;
}

export function PlanPreview({ formData, isLoading }: PlanPreviewProps) {
  // Days to go calculation
  const calculateDaysToGo = () => {
    if (!formData.date) return null;
    const target = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const daysToGo = calculateDaysToGo();
  const perGuestCost = formData.guestCount > 0 ? Math.round(formData.totalBudget / formData.guestCount) : 0;

  // Department splits based on event category
  const getCategorySplits = () => {
    if (formData.eventType === "WEDDING") {
      return [
        { name: "Venue & Hospitality", pct: 48, amt: Math.round(formData.totalBudget * 0.48), color: "#F9A66C" },
        { name: "Photography & Media", pct: 14, amt: Math.round(formData.totalBudget * 0.14), color: "#E87D35" },
        { name: "Music & Entertainment", pct: 10, amt: Math.round(formData.totalBudget * 0.10), color: "#F28F4B" },
        { name: "Florals & Styling", pct: 10, amt: Math.round(formData.totalBudget * 0.10), color: "#C2561A" },
        { name: "Attire & Beauty", pct: 8, amt: Math.round(formData.totalBudget * 0.08), color: "#E29578" },
        { name: "Contingency Fund", pct: 10, amt: Math.round(formData.totalBudget * 0.10), color: "#DDA15E" },
      ];
    } else if (formData.eventType === "BIRTHDAY") {
      return [
        { name: "Venue & Activities", pct: 40, amt: Math.round(formData.totalBudget * 0.40), color: "#F9A66C" },
        { name: "Dining, Cake & Drinks", pct: 35, amt: Math.round(formData.totalBudget * 0.35), color: "#E87D35" },
        { name: "Design, Lighting & Favors", pct: 15, amt: Math.round(formData.totalBudget * 0.15), color: "#F28F4B" },
        { name: "Music & Photography", pct: 10, amt: Math.round(formData.totalBudget * 0.10), color: "#C2561A" },
      ];
    } else {
      return [
        { name: "City Permits & Safety", pct: 25, amt: Math.round(formData.totalBudget * 0.25), color: "#F9A66C" },
        { name: "Stage, Audio & Lighting", pct: 35, amt: Math.round(formData.totalBudget * 0.35), color: "#E87D35" },
        { name: "Sanitation & Facilities", pct: 20, amt: Math.round(formData.totalBudget * 0.20), color: "#F28F4B" },
        { name: "Signage & Hospitality", pct: 20, amt: Math.round(formData.totalBudget * 0.20), color: "#C2561A" },
      ];
    }
  };

  const splits = getCategorySplits();

  if (isLoading) {
    return (
      <div className="glass-panel p-8 sm:p-10 space-y-8 animate-shimmer">
        <div className="space-y-3">
          <div className="h-4 w-28 bg-[#FFE9D6] rounded-md" />
          <div className="h-8 w-3/4 bg-[#FFD9B8]/70 rounded-lg" />
          <div className="h-4 w-1/2 bg-[#FFE9D6] rounded-md" />
        </div>

        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-3 gap-4">
          <div className="h-24 bg-[#FFE9D6]/50 rounded-2xl border border-[#F3D3B8]" />
          <div className="h-24 bg-[#FFE9D6]/50 rounded-2xl border border-[#F3D3B8]" />
          <div className="h-24 bg-[#FFE9D6]/50 rounded-2xl border border-[#F3D3B8]" />
        </div>

        {/* Progress Bars Skeleton */}
        <div className="space-y-4 pt-4 border-t border-[#F3D3B8]/60">
          <div className="h-4 w-40 bg-[#FFE9D6] rounded-md" />
          <div className="space-y-3">
            <div className="h-6 w-full bg-[#FFE9D6]/70 rounded-full" />
            <div className="h-6 w-4/5 bg-[#FFE9D6]/50 rounded-full" />
            <div className="h-6 w-3/5 bg-[#FFE9D6]/40 rounded-full" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#FFE9D6]/50 border border-[#F3D3B8] text-center text-xs font-semibold text-[#C2561A]">
          Synthesizing real-time budget arithmetic and dependency graph...
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-10 space-y-8 transition-all">
      {/* Live Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#F3D3B8]/70 pb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2561A] bg-[#FFE9D6] px-2.5 py-1 rounded-full border border-[#F3D3B8]">
            Live Blueprint Preview
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B2118] mt-2 leading-tight">
            {formData.title || "Untitled Occasion"}
          </h3>
          <div className="flex items-center gap-2 text-xs text-[#6B5B4E] mt-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#C2561A]" />
            <span>{formData.location || "Location pending"}</span>
            <span>•</span>
            <span className="uppercase font-bold text-[#C2561A]">{formData.eventType}</span>
          </div>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A8878]">
            Estimated Target
          </div>
          <div className="font-mono text-2xl font-black text-[#2B2118]">
            ${formData.totalBudget.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Asymmetric Metric Callouts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Countdown */}
        <div className="bg-white/90 p-5 rounded-2xl border border-[#F3D3B8] shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A8878] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C2561A]" />
            Timeline Horizon
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#C2561A] tracking-tight">
              {daysToGo !== null ? daysToGo : "—"}
            </span>
            <span className="text-xs font-semibold text-[#6B5B4E]">days to go</span>
          </div>
          <div className="text-[11px] text-[#9A8878] mt-1 truncate">
            {formData.date ? `Target: ${formData.date}` : "Date unset"}
          </div>
        </div>

        {/* Metric 2: Per Guest */}
        <div className="bg-white/90 p-5 rounded-2xl border border-[#F3D3B8] shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A8878] flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#C2561A]" />
            Per-Guest Intensity
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#2B2118] tracking-tight">
              ${perGuestCost}
            </span>
            <span className="text-xs font-semibold text-[#6B5B4E]">/ guest</span>
          </div>
          <div className="text-[11px] text-[#9A8878] mt-1 truncate">
            Across {formData.guestCount} attendees
          </div>
        </div>

        {/* Metric 3: Lead Department */}
        <div className="bg-white/90 p-5 rounded-2xl border border-[#F3D3B8] shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A8878] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#C2561A]" />
            Lead Department
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-[#2B2118] tracking-tight">
              ${splits[0]?.amt.toLocaleString()}
            </span>
          </div>
          <div className="text-[11px] text-[#C2561A] font-semibold mt-1 truncate">
            {splits[0]?.name} ({splits[0]?.pct}%)
          </div>
        </div>
      </div>

      {/* Dynamic Live Budget Allocation Bars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-[#6B5B4E] uppercase tracking-wider">
          <span>Projected Allocation Matrix</span>
          <span className="text-[#C2561A]">100% Calculated</span>
        </div>

        <div className="space-y-3">
          {splits.map((s, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#2B2118]">
                <span>{s.name}</span>
                <span className="font-mono text-[#6B5B4E]">
                  ${s.amt.toLocaleString()} <span className="text-[#9A8878]">({s.pct}%)</span>
                </span>
              </div>
              <div className="h-2.5 w-full bg-[#FFE9D6]/60 rounded-full overflow-hidden p-0.5 border border-[#F3D3B8]/60">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.pct}%` }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  style={{ backgroundColor: s.color }}
                  className="h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vibe / Ambience Note */}
      <div className="p-4 bg-[#FFF4EA]/80 rounded-2xl border border-[#F3D3B8] text-xs text-[#6B5B4E] leading-relaxed">
        <span className="font-bold text-[#2B2118]">Current Direction: </span>
        <span className="italic">
          "{formData.vibeTheme || "Define the mood, food styling, and acoustic preferences on the left."}"
        </span>
      </div>
    </div>
  );
}

