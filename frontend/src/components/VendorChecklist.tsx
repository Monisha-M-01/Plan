import { useState } from "react";
import { Briefcase, Mail, Copy, Check, X } from "lucide-react";
import { Vendor } from "../types";

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
    <div className="formal-card p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F3D3B8]/60 pb-5">
        <div>
          <h3 className="text-xl font-bold text-[#2B2118] flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FFE9D6] text-[#E87D35]">
              <Briefcase className="w-5 h-5" />
            </span>
            Vendor Hub & 1-Click RFP Inquiry
          </h3>
          <p className="text-xs text-[#6B5B4E] mt-1">
            Pre-drafted vendor contracts, budgets, and interview questions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map((v) => (
          <div
            key={v.id}
            className="bg-white/95 border border-[#F3D3B8] hover:border-[#F9A66C] rounded-xl p-5 space-y-3 shadow-2xs transition-all duration-150"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87D35] bg-[#FFE9D6] px-2.5 py-1 rounded-full border border-[#F3D3B8]">
                  {v.category}
                </span>
                <h4 className="font-bold text-[#2B2118] text-base mt-2">{v.name}</h4>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#9A8878]">
                  Target Budget
                </div>
                <div className="font-mono font-bold text-[#E87D35] text-base">
                  ${v.estimatedCost.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F3D3B8]/40 flex items-center justify-between">
              <span className="text-xs text-[#9A8878] font-medium">Status: Ready to Contact</span>
              {v.inquiryTemplate && (
                <button
                  type="button"
                  onClick={() => setSelectedRfp(v)}
                  className="px-3.5 py-1.5 bg-[#FFE9D6] hover:bg-[#FFD9B8] text-[#E87D35] border border-[#F3D3B8] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors duration-150 cursor-pointer shadow-2xs"
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
        <div className="fixed inset-0 bg-[#2B2118]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-warm-lg border border-[#F3D3B8]">
            <div className="flex items-center justify-between border-b border-[#F3D3B8]/60 pb-3">
              <div>
                <h4 className="font-bold text-[#2B2118] text-lg">
                  {selectedRfp.name} — RFP Proposal
                </h4>
                <p className="text-xs text-[#6B5B4E]">
                  Copy-ready inquiry message tailored to your event requirements
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRfp(null)}
                className="text-[#9A8878] hover:text-[#2B2118] p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FFF4EA]/70 border border-[#F3D3B8] rounded-xl p-4 text-xs font-mono text-[#2B2118] max-h-72 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {selectedRfp.inquiryTemplate}
              {"\n\nKey Strategic Questions to Ask:\n"}
              {selectedRfp.questions?.map((q) => `- ${q}`).join("\n")}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  const fullText = `${selectedRfp.inquiryTemplate}\n\nQuestions:\n- ${selectedRfp.questions.join("\n- ")}`;
                  handleCopy(selectedRfp.id, fullText);
                }}
                className="px-5 py-2.5 bg-[#F9A66C] hover:bg-[#F28F4B] active:bg-[#E87D35] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
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
