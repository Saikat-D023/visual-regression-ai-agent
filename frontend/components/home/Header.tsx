import { LinkButton } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <div className="text-lg font-semibold tracking-tight">Agentix</div>
      <nav className="hidden items-center gap-6 text-sm text-zinc-400 sm:flex">
        <a href="#features" className="hover:text-white">Features</a>
        <a href="#workflow" className="hover:text-white">Workflow</a>
      </nav>
      <LinkButton href="/analyze" variant="secondary">Get started</LinkButton>
    </header>
  );
}
