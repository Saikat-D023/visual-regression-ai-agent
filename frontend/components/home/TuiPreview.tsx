"use client";

import { useEffect, useState } from "react";

export function TuiPreview() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Auto-cycle the selected index in the mock TUI list
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="tui" className="py-24 px-6 w-full bg-brand-bg transition-colors duration-500 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Descriptive Column */}
        <div className="w-full md:w-1/2 space-y-6 text-left">
          <div className="inline-block bg-brand-accent/10 text-brand-accent border border-brand-accent/20 font-mono text-[10px] font-bold py-1.5 px-3.5 rounded-full uppercase">
            Upcoming CLI Release
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-brand-dark leading-none uppercase">
            Agentix TUI
          </h2>
          <p className="font-heading text-base text-brand-dark/70 leading-relaxed">
            Keyboard-driven visual regression debugging. Inspect diffs, approve code patches, and commit changes straight to Git without ever leaving your terminal window.
          </p>
          <div className="font-mono text-xs text-brand-accent font-bold">
            ▸ AVAILABLE IN BETA // W26 Q3
          </div>
        </div>

        {/* High-Fidelity Terminal Mock Column */}
        <div className="w-full md:w-1/2">
          <div className="bg-[#0A0C10] rounded-[2rem] border border-[#D1CCC4]/30 dark:border-white/10 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)]">
            
            {/* Terminal Header */}
            <div className="bg-[#18181C] px-6 py-3 flex items-center justify-between border-b border-[#2A2A30]/50 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E63B2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#D1CCC4]/40"></div>
                <div className="w-3 h-3 rounded-full bg-[#D1CCC4]/20"></div>
              </div>
              <span className="font-mono text-[10px] font-bold text-[#E8E4DD]/60">agentix --tui</span>
              <div className="w-12"></div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-xs text-[#E8E4DD]/90 space-y-4 font-medium leading-relaxed">
              {/* Command Prompt */}
              <div className="text-[#666666]">
                ~ $ <span className="text-[#F5F3EE]">agentix --tui</span>
                <span className="terminal-cursor bg-[#E63B2E] inline-block h-3.5 w-1.5 ml-1"></span>
              </div>

              {/* Loader Logs */}
              <div className="space-y-1 text-[#E8E4DD]/60">
                <div>Scanning visual diffs...</div>
                <div className="text-emerald-400">✔ Workspace index completed [42 component templates mapped]</div>
                <div className="text-[#E63B2E]">⚠ Found 3 regressions in /components/layout/Header</div>
              </div>

              {/* Simulated Interactive Component List */}
              <div className="border border-[#2D2D35] rounded-xl bg-[#111116] p-4 space-y-2">
                <div className="text-[10px] text-[#666666] font-bold tracking-wider uppercase mb-1">
                  Regression Index [3 Active]
                </div>
                
                {/* List Item 1 */}
                <div
                  className={`flex justify-between items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                    selectedIdx === 0 ? "bg-[#E63B2E]/10 border border-[#E63B2E]/30 text-white" : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={selectedIdx === 0 ? "text-[#E63B2E]" : "text-zinc-600"}>
                      {selectedIdx === 0 ? "●" : "○"}
                    </span>
                    <span>Header Logo Alignment</span>
                  </div>
                  <span className="text-xs text-[#E63B2E] font-bold font-mono">[DIFF]</span>
                </div>

                {/* List Item 2 */}
                <div
                  className={`flex justify-between items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                    selectedIdx === 1 ? "bg-[#E63B2E]/10 border border-[#E63B2E]/30 text-white" : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={selectedIdx === 1 ? "text-[#E63B2E]" : "text-zinc-600"}>
                      {selectedIdx === 1 ? "●" : "○"}
                    </span>
                    <span>Navigation Link Spacing</span>
                  </div>
                  <span className="text-xs text-[#E63B2E] font-bold font-mono">[DIFF]</span>
                </div>

                {/* List Item 3 */}
                <div
                  className={`flex justify-between items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                    selectedIdx === 2 ? "bg-[#E63B2E]/10 border border-[#E63B2E]/30 text-white" : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={selectedIdx === 2 ? "text-[#E63B2E]" : "text-zinc-600"}>
                      {selectedIdx === 2 ? "●" : "○"}
                    </span>
                    <span>Button Color Variance</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold font-mono">[PATCH READY]</span>
                </div>
              </div>

              {/* Footer Controls Cues */}
              <div className="border-t border-[#2D2D35] pt-3 text-[10px] text-[#666666] flex justify-between uppercase tracking-wider font-bold">
                <span>[j/k] Navigate</span>
                <span>[enter] Inspect</span>
                <span>[a] Apply patch</span>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
