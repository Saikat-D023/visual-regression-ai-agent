"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { AnalysisResult } from "@/lib/analyze";

type ResultPanelProps = {
  result: AnalysisResult | null;
};

export function ResultPanel({ result }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    if (!result?.fixedCode) {
      return;
    }

    await navigator.clipboard.writeText(result.fixedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Panel title="Output" className="min-h-[520px]">
      {!result ? (
        <div className="empty-state">Results will appear here.</div>
      ) : (
        <div className="space-y-5">
          <section>
            <h3 className="section-label">Root cause</h3>
            <p className="mt-2 whitespace-pre-wrap leading-7 text-zinc-300">
              {result.explanation}
            </p>
          </section>
          <section>
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="section-label">Patch</h3>
              <Button type="button" variant="secondary" onClick={copyCode}>
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <pre className="code-box">
              <code>{result.fixedCode}</code>
            </pre>
          </section>
        </div>
      )}
    </Panel>
  );
}
