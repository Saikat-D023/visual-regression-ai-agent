"use client";

import { AnalyzeHeader } from "./AnalyzeHeader";
import { ResultPanel } from "./ResultPanel";
import { UploadForm } from "./UploadForm";
import { useVisualAnalysis } from "@/hooks/useVisualAnalysis";

export function AnalyzeWorkbench() {
  const analysis = useVisualAnalysis();

  return (
    <main className="app-shell">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-5 py-6 sm:px-8">
        <AnalyzeHeader />
        <section className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
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
          <ResultPanel result={analysis.result} />
        </section>
      </div>
    </main>
  );
}
