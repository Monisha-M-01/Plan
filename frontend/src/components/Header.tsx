import { Calendar, Layers, Users, Sparkles } from "lucide-react";

interface HeaderProps {
  currentStep: "details" | "generate" | "review";
}

export function Header({ currentStep }: HeaderProps) {
  return (
    <header className="w-full border-b border-[#F3D3B8]/80 bg-white/75 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#2B2118] flex items-center justify-center text-[#F9A66C] shadow-sm">
            <span className="font-serif font-black text-lg tracking-wider">EC</span>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-[#2B2118]">
              EventCraft
            </span>
            <span className="hidden xl:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider text-[#9A8878] border-l border-[#F3D3B8] pl-2">
              Studio OS
            </span>
          </div>
        </div>

        {/* Navigation & Step Flow Indicator */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6B5B4E]">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE9D6]/60 border border-[#F3D3B8] text-xs font-bold text-[#C2561A]">
            <span className={currentStep === "details" ? "text-[#C2561A] font-extrabold" : "text-[#9A8878]"}>
              1. Details
            </span>
            <span className="text-[#9A8878]">→</span>
            <span className={currentStep === "generate" ? "text-[#C2561A] font-extrabold" : "text-[#9A8878]"}>
              2. Generate
            </span>
            <span className="text-[#9A8878]">→</span>
            <span className={currentStep === "review" ? "text-[#C2561A] font-extrabold" : "text-[#9A8878]"}>
              3. Review
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs text-[#6B5B4E]">
            <span className="text-[#C2561A] font-bold cursor-pointer">Planner</span>
            <span className="hover:text-[#2B2118] transition-colors cursor-pointer">Saved Events</span>
            <span className="hover:text-[#2B2118] transition-colors cursor-pointer">Vendor Directory</span>
          </div>
        </nav>

        {/* API Status Pill */}
        <div className="flex items-center shrink-0">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF8F0] text-[#186A3B] border border-[#C3E8D1] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" />
            FastAPI: Live (8000)
          </span>
        </div>
      </div>
    </header>
  );
}

