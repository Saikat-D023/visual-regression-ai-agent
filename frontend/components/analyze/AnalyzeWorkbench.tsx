"use client";

import { useState, useCallback, useMemo } from "react";
import { AnalyzeHeader } from "./AnalyzeHeader";
import { ResultPanel } from "./ResultPanel";
import { UploadForm } from "./UploadForm";
import { BYOKModal } from "./BYOKModal";
import { useVisualAnalysis } from "@/hooks/useVisualAnalysis";
import { useApiKey, ApiKeyConfig } from "@/hooks/useApiKey";

const PROVIDER_LABELS: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Gemini",
  minimax: "Minimax",
  custom: "Custom",
};

export function AnalyzeWorkbench() {
  const analysis = useVisualAnalysis();
  const apiKey = useApiKey();
  const [showBYOK, setShowBYOK] = useState(false);

  // Gate interactions — if no API key, show modal and block the action
  const handleInteraction = useCallback((): boolean => {
    if (!apiKey.hasApiKey) {
      setShowBYOK(true);
      return false;
    }
    return true;
  }, [apiKey.hasApiKey]);

  const handleApiKeySave = useCallback(
    (config: ApiKeyConfig) => {
      apiKey.setConfig(config);
      setShowBYOK(false);
    },
    [apiKey]
  );

  const submitHandler = useMemo(
    () => analysis.createSubmitHandler(apiKey.config),
    [analysis, apiKey.config]
  );

  return (
    <main className="min-h-screen bg-[#050505] text-[#E8E4DD] font-mono selection:bg-brand-accent selection:text-white">
      {/* Background terminal grid effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
      
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-8">
        <AnalyzeHeader
          providerName={PROVIDER_LABELS[apiKey.config.provider]}
          hasApiKey={apiKey.hasApiKey}
          onApiKeyClick={() => setShowBYOK(true)}
        />
        
        <section className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)] flex-1 pb-10">
          <UploadForm
            codeFiles={analysis.codeFiles}
            error={analysis.error}
            isAnalyzing={analysis.isAnalyzing}
            screenshot={analysis.screenshot}
            textPrompt={analysis.textPrompt}
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
            onTextPromptChange={(value) => {
              analysis.setTextPrompt(value);
            }}
            onSubmit={submitHandler}
            onInteraction={handleInteraction}
          />
          <ResultPanel result={analysis.result} isAnalyzing={analysis.isAnalyzing} />
        </section>
      </div>

      {/* BYOK Modal */}
      <BYOKModal
        isOpen={showBYOK}
        initialConfig={apiKey.config}
        onSave={handleApiKeySave}
        onClose={() => setShowBYOK(false)}
      />
    </main>
  );
}
