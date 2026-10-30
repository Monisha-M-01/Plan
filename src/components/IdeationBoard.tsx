"use client";

import React from "react";
import { Lightbulb, Palette, FileText, Sparkles, Tag } from "lucide-react";

interface Idea {
  id: string;
  type: string;
  title: string;
  content: string;
  tags?: string | null;
}

interface IdeationBoardProps {
  ideas: Idea[];
}

export function IdeationBoard({ ideas }: IdeationBoardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "PALETTE":
        return <Palette className="w-4 h-4 text-fuchsia-400" />;
      case "COPYWRITING":
        return <FileText className="w-4 h-4 text-cyan-400" />;
      default:
        return <Lightbulb className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      <div className="border-b border-slate-800 pb-5">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-fuchsia-400" />
          Personalized Creative Studio & Copywriting
        </h3>
        <p className="text-xs text-slate-400">Signature moments, custom ceremony scripts, speeches, and color narratives</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ideas.map((idea) => (
          <div key={idea.id} className="bg-slate-850 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-slate-800">{getIcon(idea.type)}</div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{idea.type}</span>
                <h4 className="font-bold text-white text-sm">{idea.title}</h4>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
              {idea.content}
            </p>

            {idea.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {idea.tags.split(",").map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full flex items-center gap-1">
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

