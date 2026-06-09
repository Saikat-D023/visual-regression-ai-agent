"use client";

import { FormEvent, useState } from "react";
import {
  AnalysisResult,
  analyzeVisualRegression,
} from "@/lib/analyze";
import { ApiKeyConfig } from "./useApiKey";

export function useVisualAnalysis() {
  const [codeFiles, setCodeFiles] = useState<File[]>([]);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [textPrompt, setTextPrompt] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  function createSubmitHandler(apiKeyConfig: ApiKeyConfig) {
    return async function submit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if (codeFiles.length === 0) {
        setError("Select a source folder first.");
        return;
      }

      if (!screenshot && !textPrompt.trim()) {
        setError("Provide a screenshot or describe the issue.");
        return;
      }

      setIsAnalyzing(true);
      setError("");
      setResult(null);

      try {
        setResult(
          await analyzeVisualRegression({
            codeFiles,
            screenshot,
            textPrompt: textPrompt.trim() || undefined,
            apiKey: apiKeyConfig.apiKey,
            provider: apiKeyConfig.provider,
            modelName: apiKeyConfig.modelName || undefined,
            baseUrl: apiKeyConfig.baseUrl || undefined,
          })
        );
      } catch (caughtError) {
        setError(
          caughtError instanceof Error ? caughtError.message : "Analysis failed."
        );
      } finally {
        setIsAnalyzing(false);
      }
    };
  }

  return {
    codeFiles,
    error,
    isAnalyzing,
    result,
    screenshot,
    textPrompt,
    setCodeFiles,
    setError,
    setResult,
    setScreenshot,
    setTextPrompt,
    createSubmitHandler,
  };
}
