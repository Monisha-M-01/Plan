import { Calendar, Layers, Users, Sparkles, BookOpen, Bookmark } from "lucide-react";

interface HeaderProps {
  currentStep: "details" | "generate" | "review";
  onOpenSavedEvents?: () => void;
  onOpenVendorDirectory?: () => void;
  onNavigatePlanner?: () => void;
}

export function Header({
  currentStep,
  onOpenSavedEvents,
  onOpenVendorDirectory,
  onNavigatePlanner,
}: HeaderProps) {
  return (
    <header className="w-full border-b border-[#F3D3B8]/80 bg-white/75 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand Identity */}
        <div
          onClick={onNavigatePlanner}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#2B2118] group-hover:bg-[#C2561A] flex items-center justify-center text-[#F9A66C] group-hover:text-white shadow-sm transition-colors">
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
            <button
              onClick={onNavigatePlanner}
              className="text-[#C2561A] font-bold cursor-pointer hover:underline transition-all"
            >
              Planner
            </button>
            <button
              onClick={onOpenSavedEvents}
              className="hover:text-[#2B2118] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              Saved Events
            </button>
            <button
              onClick={onOpenVendorDirectory}
              className="hover:text-[#2B2118] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
            >
              Vendor Directory
            </button>
          </div>
        </nav>

        {/* API Status Pill & Mobile Menu Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenSavedEvents}
            className="lg:hidden p-2 text-xs font-bold text-[#6B5B4E] bg-white border border-[#F3D3B8] rounded-xl hover:bg-[#FFE9D6]"
            title="Saved Events"
          >
            Saved Events
          </button>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EBF8F0] text-[#186A3B] border border-[#C3E8D1] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" />
            FastAPI: Live (8000)
          </span>
        </div>
      </div>
    </header>
  );
}
