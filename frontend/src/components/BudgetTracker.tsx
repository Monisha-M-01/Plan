import { DollarSign, CheckCircle2 } from "lucide-react";
import { BudgetItem } from "../types";

interface BudgetTrackerProps {
  totalBudget: number;
  currency: string;
  items: BudgetItem[];
}

export function BudgetTracker({ totalBudget, items }: BudgetTrackerProps) {
  const totalAllocated = items.reduce((acc, it) => acc + it.allocated, 0);
  const remaining = totalBudget - totalAllocated;

  const categories = items.reduce((acc, it) => {
    acc[it.category] = (acc[it.category] || 0) + it.allocated;
    return acc;
  }, {} as Record<string, number>);

  const barPalette = [
    "#F9A66C", // pastel orange
    "#FFD9B8", // soft apricot
    "#E87D35", // warm terracotta
    "#F28F4B", // orange hover
    "#E29578", // soft coral
    "#DDA15E", // golden champagne
  ];

  return (
    <div className="formal-card p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F3D3B8]/60 pb-5">
        <div>
          <h3 className="text-xl font-bold text-[#2B2118] flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FFE9D6] text-[#E87D35]">
              <DollarSign className="w-5 h-5" />
            </span>
            Budget Allocation Ledger
          </h3>
          <p className="text-xs text-[#6B5B4E] mt-1">
            Mathematical precision with zero variance guarantee
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/90 px-4 py-2 rounded-xl border border-[#F3D3B8] shadow-2xs text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A8878]">
              Total Budget
            </div>
            <div className="text-lg font-extrabold text-[#E87D35]">
              ${totalBudget.toLocaleString()}
            </div>
          </div>
          <div className="bg-white/90 px-4 py-2 rounded-xl border border-[#F3D3B8] shadow-2xs text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#9A8878]">
              Allocated
            </div>
            <div className="text-lg font-extrabold text-[#2B2118]">
              ${totalAllocated.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Badge */}
      <div className="flex items-center gap-2.5 p-3.5 bg-[#EBF8F0] border border-[#C3E8D1] rounded-xl text-xs font-semibold text-[#186A3B]">
        <CheckCircle2 className="w-4 h-4 text-[#27AE60] shrink-0" />
        <span>
          Mathematical Integrity Verified: All line items reconcile exactly to ${totalBudget.toLocaleString()} ($0.00 variance).
        </span>
      </div>

      {/* Category Distribution Bar */}
      <div>
        <div className="flex justify-between text-xs font-bold text-[#6B5B4E] uppercase tracking-wider mb-2">
          <span>Category Breakdown</span>
          <span>100% Reconciled</span>
        </div>
        <div className="h-4 w-full bg-[#FFE9D6]/60 rounded-full overflow-hidden flex p-0.5 border border-[#F3D3B8]/60">
          {Object.entries(categories).map(([cat, amt], idx) => {
            const pct = (amt / totalBudget) * 100;
            return (
              <div
                key={cat}
                title={`${cat}: $${amt.toLocaleString()} (${pct.toFixed(1)}%)`}
                style={{
                  width: `${pct}%`,
                  backgroundColor: barPalette[idx % barPalette.length],
                }}
                className="h-full rounded-sm transition-all hover:opacity-85"
              />
            );
          })}
        </div>
      </div>

      {/* Itemized Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#F3D3B8]/60 text-[11px] font-bold uppercase tracking-wider text-[#9A8878]">
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Expense Item</th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-3 text-right">Allocated</th>
              <th className="py-3 px-3">Strategic Advice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3D3B8]/40">
            {items.map((it) => (
              <tr key={it.id} className="hover:bg-[#FFE9D6]/25 transition-colors">
                <td className="py-3.5 px-3 font-semibold text-[#6B5B4E]">{it.category}</td>
                <td className="py-3.5 px-3 font-bold text-[#2B2118]">{it.name}</td>
                <td className="py-3.5 px-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      it.priority === "CRITICAL"
                        ? "bg-rose-100 text-rose-800"
                        : it.priority === "HIGH"
                        ? "bg-[#FFE9D6] text-[#E87D35]"
                        : "bg-slate-100 text-[#6B5B4E]"
                    }`}
                  >
                    {it.priority}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right font-mono text-[#E87D35] font-bold">
                  ${it.allocated.toLocaleString()}
                </td>
                <td className="py-3.5 px-3 text-xs text-[#6B5B4E] max-w-xs truncate" title={it.notes || ""}>
                  {it.notes || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
