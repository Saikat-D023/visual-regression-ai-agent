"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

type AnalysisResult = {
  explanation: string;
  fixedCode: string;       // how do i know that the fixed code is correct ?
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "http://localhost:5000";

export default function Home() {
  const [codeFile, setCodeFile] = useState<File | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const screenshotPreviewUrl = useMemo(() => {
    if (!screenshot) {
      return "";
    }

    return URL.createObjectURL(screenshot);
  }, [screenshot]);

  useEffect(() => {
    return () => {
      if (screenshotPreviewUrl) {
        URL.revokeObjectURL(screenshotPreviewUrl);
      }
    };
  }, [screenshotPreviewUrl]);

  function handleCodeFileChange(event: ChangeEvent<HTMLInputElement>) {
    setCodeFile(event.target.files?.[0] ?? null);
    setResult(null);
    setError("");
  }

  function handleScreenshotChange(event: ChangeEvent<HTMLInputElement>) {
    setScreenshot(event.target.files?.[0] ?? null);
    setResult(null);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!codeFile || !screenshot) {
      setError("Upload a source file and a screenshot before analyzing.");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("codeFile", codeFile);
    formData.append("screenshot", screenshot);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Analysis failed.");
      }

      setResult(payload as AnalysisResult);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Analysis failed."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-[#151922]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-3 border-b border-[#d7dde8] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase text-[#526071]">
              Visual Regression Patch Agent
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-[#151922] sm:text-4xl">
              Analyze UI drift from code and screenshot
            </h1>
          </div>
          <div className="rounded-md border border-[#c9d2df] bg-white px-3 py-2 text-sm text-[#526071]">
            API: {API_BASE_URL}
          </div>
        </header>

        <section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-lg border border-[#d7dde8] bg-white p-5 shadow-sm"
          >
            <div className="space-y-2">
              <label
                htmlFor="codeFile"
                className="block text-sm font-semibold text-[#151922]"
              >
                Source file
              </label>
              <input
                id="codeFile"
                name="codeFile"
                type="file"
                accept=".css,.html,.js,.jsx,.ts,.tsx,.vue,.svelte"
                onChange={handleCodeFileChange}
                className="block w-full cursor-pointer rounded-md border border-[#c9d2df] bg-[#f8fafc] text-sm text-[#2b3440] file:mr-4 file:border-0 file:bg-[#22577a] file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-[#17415d]"
              />
              {codeFile ? (
                <p className="text-sm text-[#526071]">{codeFile.name}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="screenshot"
                className="block text-sm font-semibold text-[#151922]"
              >
                Screenshot
              </label>
              <input
                id="screenshot"
                name="screenshot"
                type="file"
                accept="image/*"
                onChange={handleScreenshotChange}
                className="block w-full cursor-pointer rounded-md border border-[#c9d2df] bg-[#f8fafc] text-sm text-[#2b3440] file:mr-4 file:border-0 file:bg-[#22577a] file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-[#17415d]"
              />
            </div>

            {screenshotPreviewUrl ? (
              <div className="overflow-hidden rounded-lg border border-[#c9d2df] bg-[#edf2f7]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshotPreviewUrl}
                  alt="Uploaded screenshot preview"
                  className="h-64 w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-[#c9d2df] bg-[#edf2f7] text-sm text-[#526071]">
                Screenshot preview
              </div>
            )}

            {error ? (
              <p className="rounded-md border border-[#d9a59a] bg-[#fff1ee] px-3 py-2 text-sm text-[#8a2f22]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isAnalyzing || !codeFile || !screenshot}
              className="mt-auto inline-flex h-12 items-center justify-center rounded-md bg-[#22577a] px-5 text-sm font-semibold text-white transition hover:bg-[#17415d] disabled:cursor-not-allowed disabled:bg-[#9aa6b4]"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </button>
          </form>

          <section className="flex min-h-[520px] flex-col gap-5 rounded-lg border border-[#172033] bg-[#151922] p-5 text-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <h2 className="text-xl font-semibold">Result</h2>
              </div>
            </div>

            {result ? (
              <div className="flex min-h-0 flex-1 flex-col gap-5">
                <article className="rounded-lg border border-white/15 bg-white/5 p-4">
                  <h3 className="text-sm font-semibold uppercase text-[#f0c36b]">
                    Explanation
                  </h3>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/85">
                    {result.explanation}
                  </p>
                </article>

                <article className="flex min-h-0 flex-1 flex-col rounded-lg border border-white/15 bg-[#0d1210]">
                  <div className="border-b border-white/10 px-4 py-3">
                    <h3 className="text-sm font-semibold uppercase text-[#f0c36b]">
                      Fixed code
                    </h3>
                  </div>
                  <pre className="min-h-0 flex-1 overflow-auto p-4 text-sm leading-6 text-[#e7e2d8]">
                    <code>{result.fixedCode}</code>
                  </pre>
                </article>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-8 text-center text-sm leading-6 text-white/65">
                Awaiting analysis output.
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
