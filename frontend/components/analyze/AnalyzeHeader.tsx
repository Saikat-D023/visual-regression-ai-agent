import Link from "next/link";
import { getApiBaseUrl } from "@/lib/analyze";

export function AnalyzeHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link href="/" className="text-sm text-zinc-500 hover:text-white">
          Back home
        </Link>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
          Analyze UI bug
        </h1>
      </div>
      <p className="font-mono text-xs text-zinc-500">API {getApiBaseUrl()}</p>
    </header>
  );
}
