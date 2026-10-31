import { useState } from "react";
import confetti from "canvas-confetti";
import { Header } from "./components/Header";
import { EventWizard, EventFormData } from "./components/EventWizard";
import { PlanPreview } from "./components/PlanPreview";
import { ResultsTabs } from "./components/ResultsTabs";
import { SavedEventsModal } from "./components/SavedEventsModal";
import { VendorDirectoryModal } from "./components/VendorDirectoryModal";

export default function App() {
  const [currentEvent, setCurrentEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSavedEvents, setShowSavedEvents] = useState(false);
  const [showVendorDirectory, setShowVendorDirectory] = useState(false);

  const [formData, setFormData] = useState<EventFormData>({
    title: "Golden Hour Terrace Reception",
    eventType: "WEDDING",
    date: "2026-09-18",
    location: "Napa Valley, CA",
    totalBudget: 35000,
    currency: "USD",
    guestCount: 120,
    vibeTheme: "Sun-drenched Tuscan picnic with warm peach linens, terracotta pots, citrus accents, and acoustic guitar",
    specialRequests: "Farm-to-table seasonal harvest menu, sparkling peach welcome drinks",
  });

  const handlePlanCreated = (eventData: any) => {
    setCurrentEvent(eventData);
    try {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.55 },
        colors: ["#F9A66C", "#FFD9B8", "#E87D35", "#C2561A", "#27AE60"],
      });
    } catch {
      // Fallback gracefully if confetti fails
    }
  };

  const handleSelectSavedEvent = (eventData: any) => {
    setCurrentEvent(eventData);
    setShowSavedEvents(false);
    try {
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.5 },
        colors: ["#F9A66C", "#FFE9D6", "#C2561A"],
      });
    } catch {}
  };

  const currentStep = currentEvent ? "review" : loading ? "generate" : "details";

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-[#FFF4EA] to-[#FFE8D6] text-[#2B2118]">
      {/* Ambient drifting pastel glow blobs (GPU transform only, low opacity) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#FFD9B8]/30 blur-3xl animate-blob-float-1" />
        <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-[#F9A66C]/20 blur-3xl animate-blob-float-2" />
        <div className="absolute -bottom-40 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#FFE9D6]/40 blur-3xl" />
      </div>

      {/* Slim, full-width header */}
      <Header
        currentStep={currentStep}
        onOpenSavedEvents={() => setShowSavedEvents(true)}
        onOpenVendorDirectory={() => setShowVendorDirectory(true)}
        onNavigatePlanner={() => {
          setShowSavedEvents(false);
          setShowVendorDirectory(false);
        }}
      />

      {/* Main Product Workspace Shell */}
      <main className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-8 flex-1">
        {/* Asymmetric Two-Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Pane (~40% on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Human Left-Aligned Headline (No generic centered hero) */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FFE9D6] border border-[#F3D3B8] text-[11px] font-bold uppercase tracking-wider text-[#C2561A]">
                Studio Workspace
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#2B2118] leading-[1.15] tracking-tight">
                Tell us the occasion.<br />We'll build the plan.
              </h1>
              <p className="text-sm text-[#6B5B4E] leading-relaxed">
                Budget splits update as you type. Real-time timeline dependency mapping and vendor specifications.
              </p>
            </div>

            {/* Left Form: Sticky on large desktop */}
            <div className="lg:sticky lg:top-24">
              <EventWizard
                formData={formData}
                onFormChange={setFormData}
                onPlanCreated={handlePlanCreated}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          </div>

          {/* Right Pane (~60% on desktop) */}
          <div className="lg:col-span-7">
            {!currentEvent ? (
              <PlanPreview formData={formData} isLoading={loading} />
            ) : (
              <ResultsTabs
                event={currentEvent}
                onReset={() => setCurrentEvent(null)}
              />
            )}
          </div>
        </div>
      </main>

      {/* Saved Events Registry Modal */}
      <SavedEventsModal
        isOpen={showSavedEvents}
        onClose={() => setShowSavedEvents(false)}
        onSelectEvent={handleSelectSavedEvent}
      />

      {/* Vendor Directory Modal */}
      <VendorDirectoryModal
        isOpen={showVendorDirectory}
        onClose={() => setShowVendorDirectory(false)}
      />

      {/* Full-Width Slim Product Footer */}
      <footer className="relative z-10 w-full border-t border-[#F3D3B8]/80 bg-white/50 backdrop-blur-xs py-5 text-xs text-[#9A8878]">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#2B2118]">EventCraft Studio OS</span>
            <span>•</span>
            <span>Enterprise Event Architecture & Production Engine</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FastAPI Core :8000</span>
            <span>•</span>
            <span>Vite React :5173</span>
            <span>•</span>
            <span className="text-[#C2561A] font-semibold">WCAG AA Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
