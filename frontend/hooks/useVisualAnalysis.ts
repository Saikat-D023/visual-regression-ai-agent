"use client";

import { FormEvent, useState } from "react";
import {
  AnalysisResult,
  analyzeVisualRegression,
} from "@/lib/analyze";

export function useVisualAnalysis() {
  const [codeFiles, setCodeFiles] = useState<File[]>([]);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (codeFiles.length === 0 || !screenshot) {
      setError("Select a source folder and screenshot first.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setResult(null);

    try {
      setResult(await analyzeVisualRegression(codeFiles, screenshot));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Analysis failed."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  return {
    codeFiles,
    error,
    isAnalyzing,
    result,
    screenshot,
    setCodeFiles,
    setError,
    setResult,
    setScreenshot,
    submit,
  };
}
