"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const verbRef = useRef<HTMLHeadingElement>(null);
  const nounRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP staggered entry animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(
        verbRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        nounRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.7"
      )
      .fromTo(
        paraRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#111111] flex flex-col justify-end pb-24 px-6 md:px-16"
      style={{
        backgroundImage: `linear-gradient(to top, #111111 15%, rgba(17, 17, 17, 0.75) 50%, rgba(17, 17, 17, 0.15) 100%), url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1920&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl font-heading text-left">
        {/* Glowing badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E63B2E]/30 bg-[#E63B2E]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#E63B2E] backdrop-blur-md mb-6 animate-pulse">
          SYSTEM ACTIVE // BUILD 06.26
        </div>

        {/* Hero Line Pattern: [Direct verb] the / [System noun]. */}
        <h1 className="text-[#F5F3EE] select-none">
          <span
            ref={verbRef}
            className="block text-4xl sm:text-6xl font-extrabold uppercase tracking-tight font-heading leading-none"
            style={{ opacity: 0 }}
          >
            Repair the
          </span>
          <span
            ref={nounRef}
            className="block text-7xl sm:text-9xl font-normal font-drama italic text-[#E63B2E] leading-none mt-2 drop-shadow-[0_0_35px_rgba(230,59,46,0.2)]"
            style={{ opacity: 0 }}
          >
            Visual Drift.
          </span>
        </h1>

        <p
          ref={paraRef}
          className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-[#E8E4DD] opacity-90 font-heading"
          style={{ opacity: 0 }}
        >
          Agentix maps broken screenshots to source code structures, generating precise, production-ready CSS patches with zero configuration.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-col gap-4 sm:flex-row" style={{ opacity: 0 }}>
          <Link
            href="/analyze"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#E63B2E] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#F5F3EE] shadow-[0_4px_20px_rgba(230,59,46,0.35)] transition-transform duration-300 cubic-bezier(0.25, 0.46, 0.45, 0.94) hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="relative z-10 font-heading">Get Started</span>
            <span className="absolute inset-0 z-0 bg-[#F5F3EE] transition-transform duration-300 translate-y-full hover:translate-y-0"></span>
          </Link>
          
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#E8E4DD]/40 bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#F5F3EE] backdrop-blur-md transition-all duration-300 hover:border-[#F5F3EE] hover:bg-[#F5F3EE]/10 hover:translate-y-[-1px] font-heading"
          >
            Explore System
          </a>
        </div>
      </div>
    </section>
  );
}
