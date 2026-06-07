"use client";

import { Key, Lock, Eye, ShieldCheck } from "lucide-react";

export function BYOK() {
  const providers = [
    "OpenAI", "Anthropic", "Google", "Nvidia", "OpenRouter", "Mistral", "Cohere", "Groq"
  ];

  return (
    <section id="byok" className="py-32 px-6 w-full max-w-6xl mx-auto overflow-hidden bg-brand-bg transition-colors duration-500">

      <div className="flex flex-col lg:flex-row items-center gap-16">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck size={14} /> Privacy First
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark leading-tight">
              Bring Your Own Key
            </h2>
            <p className="mt-6 text-lg text-brand-dark/70 leading-relaxed">
              We don't mark up API costs. Bring your own API key from your favorite provider and pay exactly what you use. Zero lock-in, total transparency.
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Fade Overlays */}
            <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-brand-bg to-transparent z-10"></div>
            <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-brand-bg to-transparent z-10"></div>

            {/* Marquee Track */}
            <div className="flex w-max animate-marquee space-x-12 items-center">
              {[...providers, ...providers].map((provider, i) => (
                <div key={i} className="text-xl font-heading font-bold text-brand-dark/20 uppercase tracking-widest whitespace-nowrap">
                  {provider}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right UI Mockup */}
        <div className="w-full lg:w-1/2">
          <div className="relative p-1 rounded-2xl bg-gradient-to-br from-brand-border/50 to-transparent">
            <div className="bg-brand-primary rounded-xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-brand-border/30">

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-brand-dark">API Configuration</h3>
                    <p className="text-xs text-brand-dark/50">Stored locally in your browser.</p>
                  </div>
                  <Lock size={20} className="text-brand-accent/50" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-brand-dark/70">Provider</label>
                    <select className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-sm text-brand-dark outline-none focus:border-brand-accent transition-colors appearance-none cursor-pointer">
                      <option>OpenAI (gpt-4o)</option>
                      <option>Anthropic (claude-3.5-sonnet)</option>
                      <option>Google (gemini-1.5-pro)</option>
                      <option>Nvidia (nemotron-4)</option>
                      <option>OpenRouter (auto)</option>
                      <option>Deepseek</option>
                      <option>Minimax</option>
                      <option>X-ai Grok</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-brand-dark/70">API Key</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/40">
                        <Key size={16} />
                      </div>
                      <input
                        type="password"
                        value="sk-proj-••••••••••••••••••••••••"
                        readOnly
                        className="w-full bg-brand-bg border border-brand-border rounded-lg pl-10 pr-10 py-3 text-sm text-brand-dark font-mono outline-none"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-dark cursor-pointer transition-colors">
                        <Eye size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#E63B2E] text-white font-bold py-3 rounded-lg hover:bg-[#E63B2E]/90 transition-colors shadow-lg shadow-[#E63B2E]/20">
                  Save & Authenticate
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
