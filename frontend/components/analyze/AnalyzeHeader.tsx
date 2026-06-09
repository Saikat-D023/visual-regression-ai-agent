"use client";

import Link from "next/link";
import { getApiBaseUrl } from "@/lib/analyze";
import { Terminal, Activity, Key, ChevronRight } from "lucide-react";

type AnalyzeHeaderProps = {
  providerName?: string;
  hasApiKey?: boolean;
  onApiKeyClick?: () => void;
};

export function AnalyzeHeader({ providerName, hasApiKey, onApiKeyClick }: AnalyzeHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-[#222] pb-4 sm:flex-row sm:items-center sm:justify-between bg-[#0A0C10]/80 backdrop-blur-md p-4 rounded-xl border border-[#333]">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-accent/20 border border-brand-accent/50 text-brand-accent">
          <Terminal size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            AGENTIX <span className="text-brand-accent">/</span> ANALYZE
          </h1>
          <Link href="/" className="text-xs text-[#888] hover:text-white transition-colors flex items-center gap-1 mt-1">
            <span className="text-brand-accent">←</span> Return to system core
          </Link>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* API Key Badge */}
        <button
          onClick={onApiKeyClick}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all text-[10px] font-bold uppercase tracking-wider ${
            hasApiKey
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
              : "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 animate-pulse"
          }`}
        >
          <Key size={12} />
          {hasApiKey ? (
            <span className="flex items-center gap-1">
              {providerName || "Configured"}
              <ChevronRight size={10} />
            </span>
          ) : (
            <span>Set API Key</span>
          )}
        </button>

        <div className="flex items-center gap-3 bg-[#111] border border-[#222] px-3 py-1.5 rounded-md">
          <Activity size={14} className="text-emerald-500 animate-pulse" />
          <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-wider">
            API Link: Active <span className="text-[#555] ml-2">[{getApiBaseUrl()}]</span>
          </p>
        </div>
      </div>
    </header>
  );
}
