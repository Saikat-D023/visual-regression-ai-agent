import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="max-w-3xl">
        <p className="mb-5 text-sm uppercase tracking-[0.28em] text-zinc-500">
          visual regression patch agent
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Minimal UI repair from source and screenshot.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          Upload a project folder, attach the broken screen, and get a focused
          root cause analysis with a proposed code patch.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/analyze">Get started</LinkButton>
          <a className="btn btn-secondary" href="#workflow">View workflow</a>
        </div>
      </div>

      <div className="panel hidden lg:block">
        <div className="space-y-4 font-mono text-sm text-zinc-300">
          <p>$ agentix analyze --folder ./app --image bug.png</p>
          <p className="text-emerald-400">[ready] source mapped</p>
          <p className="text-emerald-400">[ready] screenshot attached</p>
          <p className="text-zinc-500">[next] return patch candidate</p>
        </div>
      </div>
    </section>
  );
}
