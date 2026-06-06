"use client";

import { useState, useEffect } from "react";
import { AnalysisResult } from "@/lib/analyze";
import { Copy, CheckCircle2, Terminal as TerminalIcon } from "lucide-react";

type ResultPanelProps = {
  result: AnalysisResult | null;
  isAnalyzing?: boolean;
};

export function ResultPanel({ result, isAnalyzing }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isAnalyzing) return;
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? "" : d + ".");
    }, 500);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  async function copyCode() {
    if (!result?.fixedCode) return;
    await navigator.clipboard.writeText(result.fixedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col border border-[#333] rounded-xl bg-[#0A0C10] shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden h-full min-h-[600px]">
      <div className="bg-[#18181C] px-4 py-3 flex items-center justify-between border-b border-[#333] select-none">
        <div className="flex items-center gap-2 text-[#888]">
          <TerminalIcon size={14} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#888]">Telemetry_Output.log</span>
        </div>
        <div className="flex items-center gap-2">
          {result && <span className="flex items-center gap-1.5 text-[9px] text-emerald-500 font-bold uppercase tracking-widest"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Success</span>}
        </div>
      </div>
      
      <div className="flex-1 p-0 overflow-auto bg-[#050505]">
        {!result && !isAnalyzing ? (
          <div className="h-full flex flex-col items-center justify-center text-[#444] space-y-4 p-8 text-center">
            <TerminalIcon size={48} className="opacity-20" />
            <p className="font-mono text-sm">System ready. Awaiting telemetry data.</p>
          </div>
        ) : isAnalyzing ? (
          <div className="p-6 font-mono text-sm text-[#888] space-y-2">
            <div className="text-brand-accent">&gt; Initiating Agentix Visual Regression Protocol v1.0.0</div>
            <div>&gt; Mapping source tree to virtual DOM{dots}</div>
            <div className="animate-pulse text-blue-400 mt-4">&gt; Diffing engine active. Analyzing geometric variances...</div>
          </div>
        ) : (
          <div className="p-6 font-mono text-sm space-y-8">
            {/* Root Cause Section */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-brand-accent font-bold text-xs uppercase tracking-widest">
                <span className="text-white">&gt;</span> Root Cause Analysis
              </div>
              <div className="bg-[#111] border border-[#222] p-4 rounded-lg text-[#CCC] leading-relaxed text-xs">
                {result?.explanation}
              </div>
            </section>
            
            {/* Patch Section */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                  <span className="text-white">&gt;</span> Generated Patch
                </div>
                <button
                  type="button"
                  onClick={copyCode}
                  className="flex items-center gap-2 bg-[#222] hover:bg-[#333] border border-[#444] text-[#DDD] px-3 py-1.5 rounded text-xs transition-colors"
                >
                  {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy Code"}
                </button>
              </div>
              
              <div className="relative group">
                <div className="absolute top-0 left-0 bottom-0 w-8 bg-[#18181C] border-r border-[#333] flex flex-col items-center py-4 text-[#555] text-[10px] select-none rounded-l-lg z-10">
                  {result?.fixedCode.split('\\n').map((_, i) => (
                    <div key={i} className="h-5 leading-5">{i + 1}</div>
                  ))}
                </div>
                <pre className="bg-[#0A0C10] border border-[#333] p-4 pl-12 rounded-lg text-[#E8E4DD] text-xs overflow-x-auto leading-5 shadow-inner">
                  <code>{result?.fixedCode}</code>
                </pre>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
