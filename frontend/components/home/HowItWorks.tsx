"use client";

import { useEffect, useRef } from "react";
import { IconBrandGithub } from '@tabler/icons-react';
import { PenTool, MessageSquare, Send, CheckCircle2, Box } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Glow beam animation
      gsap.to(".glow-beam", {
        backgroundPosition: "200% center",
        duration: 3,
        repeat: -1,
        ease: "linear",
      });

      // Nodes entrance
      gsap.from(".workflow-node", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 w-full max-w-6xl mx-auto overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-brand-dark mb-4">
          Visual debugging on autopilot
        </h2>
        <p className="text-lg text-brand-dark/60 max-w-2xl mx-auto">
          Connect your repository. Agentix automatically maps visual regressions to DOM nodes and generates ready-to-merge code patches.
        </p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto h-[400px] flex items-center justify-center">
        {/* Background Dashed Line connecting everything horizontally */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-brand-border/50 z-0"></div>

        {/* --- LEFT SIDE INPUT NODES --- */}
        <div className="absolute left-0 w-[250px] h-full flex flex-col justify-center gap-12 z-10">
          <div className="workflow-node flex items-center gap-3 bg-brand-bg border border-brand-border shadow-sm rounded-xl py-3 px-4 transform -translate-x-4">
            {/* <Github size={18} className="text-brand-dark" /> */}
            <IconBrandGithub stroke={2} className="text-brand-dark" />
            <span className="text-sm font-medium text-brand-dark">Pull Request Created</span>
          </div>

          <div className="workflow-node flex items-center gap-3 bg-brand-bg border border-brand-border shadow-sm rounded-xl py-3 px-4 transform translate-x-8">
            <PenTool size={18} className="text-[#F24E1E]" />
            <span className="text-sm font-medium text-brand-dark">Design Drift Detected</span>
          </div>

          <div className="workflow-node flex items-center gap-3 bg-brand-bg border border-brand-border shadow-sm rounded-xl py-3 px-4 transform -translate-x-2">
            <MessageSquare size={18} className="text-[#4A154B] dark:text-[#E01E5A]" />
            <span className="text-sm font-medium text-brand-dark">QA Slack Thread</span>
          </div>
        </div>

        {/* --- CENTER AGENT NODE --- */}
        <div className="workflow-node relative z-20 flex flex-col items-center">
          <div className="w-28 h-28 bg-brand-bg border border-brand-border rounded-3xl shadow-xl flex items-center justify-center relative overflow-hidden group">
            {/* Ambient glow behind logo */}
            <div className="absolute inset-0 bg-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-full"></div>

            <div className="w-12 h-12 bg-brand-accent rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(230,59,46,0.4)] z-10">
              A
            </div>
          </div>
          <span className="mt-4 text-xs font-bold tracking-widest text-brand-dark/50 uppercase">Your AI Agent</span>
        </div>

        {/* --- GLOW BEAM --- */}
        <div className="workflow-node absolute left-1/2 top-1/2 -translate-y-1/2 h-10 w-[200px] z-10 hidden md:block">
          <div
            className="glow-beam w-full h-full rounded-r-full opacity-80"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(230,59,46,0.1), rgba(230,59,46,0.6), rgba(230,59,46,0.8), transparent)",
              backgroundSize: "200% 100%",
            }}
          ></div>
        </div>

        {/* --- RIGHT SIDE OUTPUT NODE --- */}
        <div className="workflow-node absolute right-0 z-20 transform translate-x-4 md:translate-x-0 hidden md:flex items-center gap-3 bg-brand-bg border border-brand-border shadow-md rounded-xl py-4 px-6">
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <CheckCircle2 size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-brand-dark">Draft Patch Code</span>
            <span className="text-xs text-brand-dark/60">Sent to Editor</span>
          </div>
        </div>

      </div>
    </section>
  );
}
