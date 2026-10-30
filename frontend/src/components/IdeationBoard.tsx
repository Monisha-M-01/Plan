import { Sparkles, Palette, FileText, Lightbulb, Tag } from "lucide-react";
import { CreativeIdea } from "../types";

interface IdeationBoardProps {
  ideas: CreativeIdea[];
}

export function IdeationBoard({ ideas }: IdeationBoardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "PALETTE":
        return <Palette className="w-4 h-4 text-[#E87D35]" />;
      case "COPYWRITING":
        return <FileText className="w-4 h-4 text-[#F28F4B]" />;
      default:
        return <Lightbulb className="w-4 h-4 text-[#DDA15E]" />;
    }
  };

  return (
    <div className="formal-card p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#F3D3B8]/60 pb-5">
        <h3 className="text-xl font-bold text-[#2B2118] flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#FFE9D6] text-[#E87D35]">
            <Sparkles className="w-5 h-5" />
          </span>
          Creative Studio & Personalized Concepts
        </h3>
        <p className="text-xs text-[#6B5B4E] mt-1">
          Signature moments, custom ceremony scripts, and curated palettes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white/95 border border-[#F3D3B8] hover:border-[#F9A66C] rounded-xl p-5 space-y-3 shadow-2xs transition-all duration-150"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#FFE9D6]">{getIcon(idea.type)}</div>
              <div>
                <span className="text-[10px] font-bold text-[#E87D35] uppercase tracking-wider">
                  {idea.type}
                </span>
                <h4 className="font-bold text-[#2B2118] text-sm">{idea.title}</h4>
              </div>
            </div>

            <p className="text-xs text-[#6B5B4E] leading-relaxed whitespace-pre-line bg-[#FFF4EA]/60 p-3.5 rounded-lg border border-[#F3D3B8]/60 font-sans">
              {idea.content}
            </p>

            {idea.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {idea.tags.split(",").map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-2.5 py-0.5 bg-[#FFE9D6] text-[#E87D35] rounded-full border border-[#F3D3B8] flex items-center gap-1"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {t.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
