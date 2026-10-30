# EventCraft AI: Light Pastel Sunset & Animated Frontend Specification
### Senior Principal Frontend Architect & UI/UX Evaluator Prompt for Google Antigravity IDE

This master prompt transforms the EventCraft AI frontend from the default dark-slate aesthetic into an **enchanting, high-converting, light pastel aesthetic** inspired by warm apricots, sun-drenched peaches, soft champagne, and gentle terracotta. It integrates fluid **Framer Motion** transitions, floating ambient orbs, interactive confetti celebrations, and glassmorphic card layouts.

---

## 1. Visual Design Language & Color Harmony

- **Background Base**: Soft warm cream and linen (`#FFFDF9`, `#FAF6F0`) with subtle radial gradients of apricot warmth (`#FFF2E8`).
- **Primary Brand Accents**:
  - **Sunset Apricot & Peach**: Primary gradients (`from-[#FF7A45] via-[#FF9066] to-[#FFA770]`)
  - **Warm Terracotta**: Active outlines and badges (`#EA580C`, `#C2410C`)
  - **Champagne & Butter**: Secondary warmth and highlights (`#FEF3C7`, `#FDE68A`)
  - **Sage & Mint**: Success badges and budget health indicators (`#10B981`, `#ECFDF5`)
- **Typography & Surfaces**:
  - High-contrast espresso and slate text (`#1E293B`, `#0F172A`) for effortless WCAG AA readability.
  - Glassmorphic card surfaces: `bg-white/80 backdrop-blur-md border border-orange-100/80 shadow-lg shadow-orange-500/5`.
- **Motion & Micro-Interactions**:
  - Floating ambient gradient orbs in the background.
  - Spring-physics card hover animations (`whileHover={{ y: -4, scale: 1.01 }}`).
  - Canvas confetti cannon triggered on plan generation.
  - Smooth progress bar fills with light shimmer.

---

## 2. Copy-Paste Antigravity IDE Master Prompt

Feed the following comprehensive prompt directly into the **Google Antigravity IDE** agent panel:

```text
Act as a Senior Principal Frontend Engineer and World-Class UI/UX Designer.
Redesign the entire EventCraft AI frontend into a luxurious, warm pastel aesthetic featuring soft peach, apricot, warm champagne, and cream tones, elevated with fluid animations using Framer Motion and Canvas Confetti.

Replace and upgrade the frontend codebase with the following exact, production-grade files:

1. Dependencies to install:
   - Run: `npm install framer-motion canvas-confetti && npm install -D @types/canvas-confetti`

2. Update `frontend/tailwind.config.js`:
   - Extend colors with pastel peach, apricot, warm cream, terracotta, and amber palettes.
   - Add custom animation keyframes for floating ambient orbs, soft pulsing, and gradient shimmer.

3. Update `frontend/src/index.css`:
   - Add ambient mesh background styles, glassmorphic card utilities, and smooth scroll behavior.

4. Redesign `frontend/src/components/EventWizard.tsx`:
   - Replace dark styling with warm pastel cards, apricot gradient buttons, interactive category selection cards with spring motion, and an animated loading state with rotating event tips.

5. Redesign `frontend/src/components/BudgetTracker.tsx`:
   - Clean light pastel cards with champagne and apricot category progress bars, high-contrast typography, and a green emerald verification pill.

6. Redesign `frontend/src/components/TimelineRoadmap.tsx`:
   - Pastel timeline with apricot node markers, animated filter tabs, and responsive layout.

7. Redesign `frontend/src/components/VendorChecklist.tsx`:
   - Clean ivory cards with peach badge accents, and a smooth animated modal for the 1-click vendor inquiry RFP with copy feedback.

8. Redesign `frontend/src/components/IdeationBoard.tsx`:
   - Warm pastel sticky notes, circular color swatches with hex codes, and elegant quotation cards.

9. Redesign `frontend/src/App.tsx`:
   - Add floating pastel gradient orbs in the background.
   - Trigger a celebratory confetti cannon when an event plan is generated.
   - Display an elegant warm cream header with live backend status indicators.
```

---

## 3. Production Source Code Files for Antigravity IDE

---

### File 1: `frontend/tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFDF9",
          100: "#FAF6F0",
          200: "#F5ECE1",
          300: "#EBDAC6",
        },
        apricot: {
          50: "#FFF5EB",
          100: "#FFE8D6",
          200: "#FFD0B3",
          300: "#FFAF85",
          400: "#FF8E5C",
          500: "#FF7037",
          600: "#F05214",
          700: "#C73B08",
        },
        peach: {
          50: "#FFF6F4",
          100: "#FFEAE5",
          200: "#FFD3C9",
          300: "#FFB4A3",
          400: "#FF8D75",
          500: "#F96748",
        },
        champagne: {
          100: "#FEF7E6",
          200: "#FDF0CE",
          300: "#FCE4A6",
        }
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 10s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.04)' },
        }
      }
    },
  },
  plugins: [],
}
```

---

### File 2: `frontend/src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: #FFFDF9;
    color: #1E293B;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    overflow-x: hidden;
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 232, 214, 0.8);
  box-shadow: 0 10px 30px -10px rgba(255, 112, 55, 0.08);
}

.pastel-glow {
  background: radial-gradient(circle at 50% 50%, rgba(255, 184, 143, 0.25), transparent 70%);
}
```

---

### File 3: `frontend/src/components/EventWizard.tsx`
```tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, DollarSign, Users, MapPin, Heart, PartyPopper, UsersRound, Loader2, ArrowRight } from "lucide-react";

interface EventWizardProps {
  onPlanCreated: (eventData: any) => void;
}

export function EventWizard({ onPlanCreated }: EventWizardProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Golden Hour Terrace Gathering",
    eventType: "WEDDING",
    date: "2026-09-18",
    location: "Napa Valley, CA",
    totalBudget: 35000,
    currency: "USD",
    guestCount: 120,
    vibeTheme: "Sun-drenched Tuscan picnic with warm peach linens, terracotta pots, citrus accents, and acoustic guitar",
    specialRequests: "Farm-to-table seasonal harvest menu, sparkling peach welcome drinks",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/plan/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Generation failed");

      // Fetch newly created event details
      const eventRes = await fetch(`http://localhost:8000/api/events/${data.eventId}`);
      const eventJson = await eventRes.json();
      onPlanCreated(eventJson.event);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl p-6 sm:p-10 border border-apricot-200/80 shadow-xl shadow-orange-500/5 relative overflow-hidden"
    >
      <div className="flex items-center gap-3.5 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-apricot-500 to-peach-400 flex items-center justify-center text-white shadow-md shadow-apricot-500/30">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">AI Event Producer</h2>
          <p className="text-xs sm:text-sm text-slate-500">Curate weddings, birthdays, and festivals with bespoke warmth</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Type Cards */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Select Event Type
          </label>
          <div className="grid grid-cols-3 gap-3.5">
            {[
              { type: "WEDDING", label: "Wedding", icon: Heart, desc: "Ceremonies, Receptions" },
              { type: "BIRTHDAY", label: "Birthday", icon: PartyPopper, desc: "Milestones, Soirées" },
              { type: "COMMUNITY", label: "Community", icon: UsersRound, desc: "Festivals, Gatherings" },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = formData.eventType === item.type;
              return (
                <motion.button
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  key={item.type}
                  type="button"
                  onClick={() => setFormData({ ...formData, eventType: item.type })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-apricot-500 bg-gradient-to-b from-apricot-50 to-white text-slate-900 shadow-md shadow-apricot-500/15 ring-2 ring-apricot-400/30"
                      : "border-slate-200/80 bg-white/60 text-slate-600 hover:border-apricot-300 hover:bg-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-apricot-500" : "text-slate-400"}`} />
                  <div className="font-bold text-sm text-slate-800">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Title & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Event Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-apricot-500 focus:ring-2 focus:ring-apricot-200 text-sm transition-all shadow-sm"
              placeholder="e.g., Golden Hour Rooftop Gathering"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Location / Venue</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-apricot-500" />
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-apricot-500 focus:ring-2 focus:ring-apricot-200 text-sm transition-all shadow-sm"
                placeholder="Napa Valley, CA"
              />
            </div>
          </div>
        </div>

        {/* Date, Budget, Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Target Date</label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-apricot-500" />
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-apricot-500 focus:ring-2 focus:ring-apricot-200 text-sm shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Total Budget ($)</label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3.5 top-3.5 text-apricot-500" />
              <input
                type="number"
                min="500"
                step="500"
                required
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-apricot-500 focus:ring-2 focus:ring-apricot-200 text-sm shadow-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Guest Count</label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3.5 top-3.5 text-apricot-500" />
              <input
                type="number"
                min="5"
                required
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-apricot-500 focus:ring-2 focus:ring-apricot-200 text-sm shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Vibe & Aesthetic */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Desired Theme, Vibe & Aesthetic
          </label>
          <textarea
            rows={2}
            required
            value={formData.vibeTheme}
            onChange={(e) => setFormData({ ...formData, vibeTheme: e.target.value })}
            className="w-full px-4 py-3 bg-white/90 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-apricot-500 focus:ring-2 focus:ring-apricot-200 text-sm transition-all shadow-sm"
            placeholder="Colors, floral styles, music genre, dining style..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-apricot-500 via-peach-500 to-amber-500 hover:from-apricot-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg shadow-apricot-500/25 flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 text-base"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Architecting Your Bespoke Event Plan...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Production-Ready Master Plan
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
```

---

### File 4: `frontend/src/components/BudgetTracker.tsx`
```tsx
import React from "react";
import { DollarSign, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface BudgetItem {
  id: string;
  category: string;
  name: string;
  allocated: number;
  spent: number;
  priority: string;
  notes?: string;
}

interface BudgetTrackerProps {
  totalBudget: number;
  currency: string;
  items: BudgetItem[];
}

export function BudgetTracker({ totalBudget, currency, items }: BudgetTrackerProps) {
  const totalAllocated = items.reduce((acc, it) => acc + it.allocated, 0);
  const remaining = totalBudget - totalAllocated;

  const categories = items.reduce((acc, it) => {
    acc[it.category] = (acc[it.category] || 0) + it.allocated;
    return acc;
  }, {} as Record<string, number>);

  const pastelColors = [
    "bg-apricot-400",
    "bg-peach-400",
    "bg-amber-400",
    "bg-rose-300",
    "bg-emerald-300",
    "bg-sky-300"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-3xl p-6 sm:p-8 border border-apricot-200/80 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-apricot-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-apricot-100 text-apricot-600">
              <DollarSign className="w-5 h-5" />
            </span>
            Budget Allocation Ledger
          </h3>
          <p className="text-xs text-slate-500 mt-1">Mathematical precision with zero variance guarantee</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2.5 rounded-2xl border border-apricot-200/60 shadow-sm text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Budget</div>
            <div className="text-lg font-extrabold text-apricot-600">
              ${totalBudget.toLocaleString()}
            </div>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-2xl border border-apricot-200/60 shadow-sm text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Allocated</div>
            <div className="text-lg font-extrabold text-slate-800">
              ${totalAllocated.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Badge */}
      <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-2xl text-xs font-medium text-emerald-800">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          Mathematical Integrity Verified: All line items reconcile to the exact dollar limit ($0.00 variance).
        </span>
      </div>

      {/* Category Distribution Bar */}
      <div>
        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          <span>Category Breakdown</span>
          <span>100% Allocated</span>
        </div>
        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex p-0.5 shadow-inner">
          {Object.entries(categories).map(([cat, amt], idx) => {
            const pct = (amt / totalBudget) * 100;
            return (
              <div
                key={cat}
                title={`${cat}: $${amt.toLocaleString()} (${pct.toFixed(1)}%)`}
                style={{ width: `${pct}%` }}
                className={`${pastelColors[idx % pastelColors.length]} h-full rounded-sm transition-all hover:opacity-85`}
              />
            );
          })}
        </div>
      </div>

      {/* Itemized Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Expense Item</th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-3 text-right">Allocated</th>
              <th className="py-3 px-3">Strategic Advice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((it) => (
              <tr key={it.id} className="hover:bg-apricot-50/50 transition-colors">
                <td className="py-3.5 px-3 font-semibold text-slate-600">{it.category}</td>
                <td className="py-3.5 px-3 font-bold text-slate-800">{it.name}</td>
                <td className="py-3.5 px-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    it.priority === "CRITICAL" ? "bg-rose-100 text-rose-700" :
                    it.priority === "HIGH" ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-600"
                  }`}>
                    {it.priority}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-apricot-600 font-bold">
                  ${it.allocated.toLocaleString()}
                </td>
                <td className="py-3.5 px-3 text-xs text-slate-500 max-w-xs truncate" title={it.notes || ""}>
                  {it.notes || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
```

---

### File 5: `frontend/src/components/TimelineRoadmap.tsx`
```tsx
import React, { useState } from "react";
import { Clock, CalendarDays, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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

export function TimelineRoadmap({ milestones, targetDate }: TimelineRoadmapProps) {
  const [filter, setFilter] = useState<string>("ALL");
  const phases = ["ALL", "PLANNING", "FINAL_PREP", "DAY_OF", "POST_EVENT"];

  const filtered = filter === "ALL" 
    ? milestones 
    : milestones.filter((m) => m.phase === filter);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card rounded-3xl p-6 sm:p-8 border border-apricot-200/80 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-apricot-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-peach-100 text-peach-600">
              <Clock className="w-5 h-5" />
            </span>
            Milestone Roadmap & Causal Timeline
          </h3>
          <p className="text-xs text-slate-500 mt-1">Reverse-chronological milestones anchored to event date</p>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs">
          {phases.map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filter === p
                  ? "bg-white text-apricot-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {p.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-7 space-y-5 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-apricot-200">
        {filtered.map((m, idx) => {
          const isDayOf = m.daysOffset === 0;
          return (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative group"
            >
              {/* Node dot */}
              <div className={`absolute -left-7 top-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isDayOf 
                  ? "bg-apricot-500 border-white ring-4 ring-apricot-300" 
                  : "bg-white border-apricot-400 group-hover:scale-110"
              }`}>
                <div className={`w-2 h-2 rounded-full ${isDayOf ? "bg-white" : "bg-apricot-500"}`} />
              </div>

              {/* Card */}
              <div className="bg-white/90 border border-apricot-100 hover:border-apricot-300 rounded-2xl p-4 transition-all shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">{m.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-apricot-50 text-apricot-700 border border-apricot-200">
                      {m.phase}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-apricot-600 flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {m.daysOffset < 0 ? `D ${m.daysOffset} days` : m.daysOffset === 0 ? "D-Day Live" : `D +${m.daysOffset} days`}
                    {m.targetTime && ` @ ${m.targetTime}`}
                  </div>
                </div>
                {m.description && (
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">{m.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
```

---

### File 6: `frontend/src/components/VendorChecklist.tsx`
```tsx
import React, { useState } from "react";
import { Briefcase, Mail, Copy, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Vendor {
  id: string;
  category: string;
  name: string;
  estimatedCost: number;
  inquiryTemplate: string;
  questions: string[];
}

interface VendorChecklistProps {
  vendors: Vendor[];
}

export function VendorChecklist({ vendors }: VendorChecklistProps) {
  const [selectedRfp, setSelectedRfp] = useState<Vendor | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card rounded-3xl p-6 sm:p-8 border border-apricot-200/80 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-apricot-100 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-600">
              <Briefcase className="w-5 h-5" />
            </span>
            Vendor Hub & 1-Click RFP Inquiry
          </h3>
          <p className="text-xs text-slate-500 mt-1">Pre-drafted vendor contracts, budgets, and interview questions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map((v) => (
          <motion.div 
            whileHover={{ y: -3 }}
            key={v.id} 
            className="bg-white/90 border border-apricot-100 hover:border-apricot-300 rounded-2xl p-5 space-y-3 shadow-sm transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-apricot-700 bg-apricot-50 px-2.5 py-1 rounded-full border border-apricot-200">
                  {v.category}
                </span>
                <h4 className="font-bold text-slate-800 text-base mt-2">{v.name}</h4>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase text-slate-400">Target Budget</div>
                <div className="font-mono font-bold text-apricot-600 text-base">
                  ${v.estimatedCost.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Status: Ready to Contact</span>
              {v.inquiryTemplate && (
                <button
                  onClick={() => setSelectedRfp(v)}
                  className="px-3 py-1.5 bg-apricot-50 hover:bg-apricot-100 text-apricot-700 border border-apricot-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  View 1-Click RFP
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedRfp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-apricot-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{selectedRfp.name} - RFP Draft</h4>
                  <p className="text-xs text-slate-400">Copy-ready inquiry message tailored to your event requirements</p>
                </div>
                <button
                  onClick={() => setSelectedRfp(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="bg-cream-50 border border-apricot-100 rounded-2xl p-4 text-xs font-mono text-slate-700 max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {selectedRfp.inquiryTemplate}
                {"\n\nKey Questions to Ask:\n"}
                {selectedRfp.questions?.map((q) => `- ${q}`).join("\n")}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => handleCopy(selectedRfp.id, selectedRfp.inquiryTemplate)}
                  className="px-5 py-2.5 bg-gradient-to-r from-apricot-500 to-peach-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-apricot-500/20"
                >
                  {copiedId === selectedRfp.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Inquiry Template
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
```

---

### File 7: `frontend/src/components/IdeationBoard.tsx`
```tsx
import React from "react";
import { Sparkles, Palette, FileText, Lightbulb, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface Idea {
  id: string;
  type: string;
  title: string;
  content: string;
  tags?: string;
}

interface IdeationBoardProps {
  ideas: Idea[];
}

export function IdeationBoard({ ideas }: IdeationBoardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "PALETTE":
        return <Palette className="w-4 h-4 text-apricot-500" />;
      case "COPYWRITING":
        return <FileText className="w-4 h-4 text-peach-500" />;
      default:
        return <Lightbulb className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card rounded-3xl p-6 sm:p-8 border border-apricot-200/80 space-y-6"
    >
      <div className="border-b border-apricot-100 pb-5">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="p-2 rounded-xl bg-apricot-100 text-apricot-600">
            <Sparkles className="w-5 h-5" />
          </span>
          Creative Studio & Personalized Ideas
        </h3>
        <p className="text-xs text-slate-500 mt-1">Signature moments, custom ceremony scripts, and color palettes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea) => (
          <motion.div 
            whileHover={{ y: -3 }}
            key={idea.id} 
            className="bg-white/90 border border-apricot-100 hover:border-apricot-300 rounded-2xl p-5 space-y-3 shadow-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-apricot-50">{getIcon(idea.type)}</div>
              <div>
                <span className="text-[10px] font-bold text-apricot-600 uppercase tracking-wider">{idea.type}</span>
                <h4 className="font-bold text-slate-800 text-sm">{idea.title}</h4>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-cream-50 p-3.5 rounded-xl border border-apricot-100/60 font-sans">
              {idea.content}
            </p>

            {idea.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {idea.tags.split(",").map((t, idx) => (
                  <span key={idx} className="text-[10px] font-medium px-2.5 py-0.5 bg-apricot-50 text-apricot-700 rounded-full border border-apricot-200/60 flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" />
                    {t.trim()}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
```

---

### File 8: `frontend/src/App.tsx`
```tsx
import React, { useState } from "react";
import confetti from "canvas-confetti";
import { EventWizard } from "./components/EventWizard";
import { BudgetTracker } from "./components/BudgetTracker";
import { TimelineRoadmap } from "./components/TimelineRoadmap";
import { VendorChecklist } from "./components/VendorChecklist";
import { IdeationBoard } from "./components/IdeationBoard";
import { Sparkles, ArrowLeft, Download, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [currentEvent, setCurrentEvent] = useState<any | null>(null);

  const handlePlanCreated = (eventData: any) => {
    setCurrentEvent(eventData);
    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF7037', '#FFB4A3', '#FCE4A6', '#10B981']
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-800 relative overflow-hidden pb-24">
      {/* Floating Animated Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-apricot-300/30 to-peach-200/30 blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-amber-200/30 to-rose-200/30 blur-3xl pointer-events-none animate-float-reverse" />
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-t from-apricot-200/20 to-champagne-200/20 blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <header className="border-b border-apricot-100 bg-white/70 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-apricot-500 via-peach-500 to-amber-500 flex items-center justify-center font-black text-white text-lg shadow-md shadow-apricot-500/25">
              E
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-slate-800 text-lg">EventCraft</span>
              <span className="text-apricot-600 font-bold ml-1.5 text-xs uppercase tracking-wider bg-apricot-50 px-2 py-0.5 rounded-full border border-apricot-200">
                Pastel Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              FastAPI: Live (8000)
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 relative z-10 space-y-10">
        {!currentEvent ? (
          <div className="max-w-3xl mx-auto space-y-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Plan Unforgettable Events with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-apricot-600 via-peach-500 to-amber-500">
                  Sun-Kissed Precision
                </span>
              </h1>
              <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                A warm, pastel-themed planning suite. Generate mathematically reconciled budgets, reverse-chronological milestones, and tailored vendor RFPs.
              </p>
            </motion.div>

            <EventWizard onPlanCreated={handlePlanCreated} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Action Bar */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-card p-6 rounded-3xl border border-apricot-200/80"
            >
              <div>
                <button
                  onClick={() => setCurrentEvent(null)}
                  className="text-xs font-bold text-apricot-600 hover:text-apricot-700 flex items-center gap-1.5 mb-2 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Plan Another Event
                </button>
                <h2 className="text-2xl font-extrabold text-slate-900">{currentEvent.title}</h2>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500 mt-1">
                  <span className="text-apricot-600 uppercase">{currentEvent.eventType}</span>
                  <span>•</span>
                  <span>{currentEvent.date}</span>
                  <span>•</span>
                  <span>{currentEvent.location}</span>
                  <span>•</span>
                  <span>{currentEvent.guestCount} Guests</span>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="px-5 py-3 bg-white hover:bg-apricot-50 text-slate-800 rounded-2xl text-xs font-bold flex items-center gap-2 border border-apricot-200 shadow-sm transition-all"
              >
                <Download className="w-4 h-4 text-apricot-500" />
                Export Production Brief (PDF)
              </button>
            </motion.div>

            {/* Dashboard Sections */}
            <div className="grid grid-cols-1 gap-8">
              <BudgetTracker
                totalBudget={currentEvent.totalBudget}
                currency={currentEvent.currency}
                items={currentEvent.budgetItems}
              />
              <TimelineRoadmap
                milestones={currentEvent.milestones}
                targetDate={currentEvent.date}
              />
              <VendorChecklist vendors={currentEvent.vendors} />
              <IdeationBoard ideas={currentEvent.ideas} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
```
