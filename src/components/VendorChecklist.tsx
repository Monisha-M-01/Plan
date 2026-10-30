"use client";

import React, { useState } from "react";
import { Briefcase, Mail, Copy, Check } from "lucide-react";

interface Vendor {
  id: string;
  category: string;
  name: string;
  estimatedCost: number;
  actualCost?: number | null;
  status: string;
  rfpNotes?: string | null;
}

interface VendorChecklistProps {
  vendors: Vendor[];
}

export function VendorChecklist({ vendors }: VendorChecklistProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedRfp, setSelectedRfp] = useState<Vendor | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            Vendor Procurement Hub & AI RFP Dispatch
          </h3>
          <p className="text-xs text-slate-400">Auto-generated contract specs, inquiries & negotiation points</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map((v) => (
          <div key={v.id} className="bg-slate-850 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  {v.category}
                </span>
                <h4 className="font-bold text-white text-base mt-1">{v.name}</h4>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">Target Budget</div>
                <div className="font-mono font-bold text-emerald-400">
                  ${v.estimatedCost.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Status: Not Contacted</span>
              {v.rfpNotes && (
                <button
                  onClick={() => setSelectedRfp(v)}
                  className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  View 1-Click RFP
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RFP Modal */}
      {selectedRfp && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-white text-lg">{selectedRfp.name} - Vendor RFP Draft</h4>
                <p className="text-xs text-slate-400">Tailored inquiry template generated with specific questions</p>
              </div>
              <button
                onClick={() => setSelectedRfp(null)}
                className="text-slate-400 hover:text-white text-sm cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {selectedRfp.rfpNotes}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => handleCopy(selectedRfp.id, selectedRfp.rfpNotes || "")}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
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
          </div>
        </div>
      )}
    </div>
  );
}

