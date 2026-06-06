"use client";

import { AnalyzeHeader } from "./AnalyzeHeader";
import { ResultPanel } from "./ResultPanel";
import { UploadForm } from "./UploadForm";
import { useVisualAnalysis } from "@/hooks/useVisualAnalysis";

export function AnalyzeWorkbench() {
  const analysis = useVisualAnalysis();

  return (
    <main className="min-h-screen bg-[#050505] text-[#E8E4DD] font-mono selection:bg-brand-accent selection:text-white">
      {/* Background terminal grid effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
      
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-8">
        <AnalyzeHeader />
        
        <section className="grid gap-6 lg:grid-cols-[400px_minmax(0,1fr)] flex-1 pb-10">
          <UploadForm
            codeFiles={analysis.codeFiles}
            error={analysis.error}
            isAnalyzing={analysis.isAnalyzing}
            screenshot={analysis.screenshot}
            onCodeFilesChange={(files) => {
              analysis.setCodeFiles(files);
              analysis.setError("");
              analysis.setResult(null);
            }}
            onScreenshotChange={(file) => {
              analysis.setScreenshot(file);
              analysis.setError("");
              analysis.setResult(null);
            }}
            onSubmit={analysis.submit}
          />
          <ResultPanel result={analysis.result} isAnalyzing={analysis.isAnalyzing} />
        </section>
      </div>
    </main>
  );
}
