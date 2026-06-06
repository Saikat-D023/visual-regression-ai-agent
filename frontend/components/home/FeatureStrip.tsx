"use client";

import { useEffect, useState } from "react";

export function FeatureStrip() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-6 py-24 scroll-mt-20 bg-brand-bg transition-colors duration-500">
      {/* Section Header */}
      <div className="mb-16 border-l-4 border-brand-accent pl-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-dark/60 font-heading">
          SYSTEM CAPABILITIES
        </h2>
        <p className="mt-2 text-3xl font-bold font-heading text-brand-dark">
          Engineered for Raw Information Density
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Card 1: Diagnostic Shuffler */}
        <div className="flex flex-col justify-between border-2 border-brand-border bg-brand-primary rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(17,17,17,0.04)] hover:border-brand-dark/30 transition-all duration-300">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono uppercase text-brand-accent font-bold">Diagnostic Shuffler // 01</span>
              <div className="h-2 w-2 rounded-full bg-brand-accent"></div>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2 font-heading">Visual Analysis</h3>
            <p className="text-sm text-brand-dark/70 leading-relaxed font-heading mb-8">
              High-precision pixel diffing. We detect the subtlest changes in color, layout, and typography before they hit production.
            </p>
          </div>
          
          <DiagnosticShuffler />
        </div>

        {/* Card 2: Telemetry Typewriter */}
        <div className="flex flex-col justify-between border-2 border-brand-border bg-brand-primary rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(17,17,17,0.04)] hover:border-brand-dark/30 transition-all duration-300">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono uppercase text-brand-accent font-bold">Telemetry Typewriter // 02</span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
                <span className="text-[9px] font-mono font-bold text-brand-dark/50">LIVE</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2 font-heading">DOM Mapping</h3>
            <p className="text-sm text-brand-dark/70 leading-relaxed font-heading mb-8">
              Intelligent element identification. We don&apos;t just see pixels; we map visual errors directly to broken DOM nodes and styles.
            </p>
          </div>

          <TelemetryTypewriter />
        </div>

        {/* Card 3: Cursor Protocol Scheduler */}
        <div className="flex flex-col justify-between border-2 border-brand-border bg-brand-primary rounded-[2rem] p-8 shadow-[0_10px_30px_rgba(17,17,17,0.04)] hover:border-brand-dark/30 transition-all duration-300">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-mono uppercase text-brand-accent font-bold">Cursor Protocol // 03</span>
              <div className="h-2 w-2 rounded-full bg-brand-accent"></div>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2 font-heading">Code Patching</h3>
            <p className="text-sm text-brand-dark/70 leading-relaxed font-heading mb-8">
              Automatic CSS and React code fixes delivered directly to your editor. Apply patches and resolve visual drift instantly.
            </p>
          </div>

          <CursorProtocolScheduler />
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// Sub-component 1: Diagnostic Shuffler
// ----------------------------------------------------
function DiagnosticShuffler() {
  const initialCards = [
    { id: "c1", title: "Mismatch: padding-x", value: "-12px shift detected" },
    { id: "c2", title: "Out of bounds: Button text wrap", value: "height overflow 8px" },
    { id: "c3", title: "Drift: Font scale ratio", value: "line-height is 1.25 instead of 1.5" },
  ];

  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const timer = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        const last = next.pop();
        if (last) {
          next.unshift(last);
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-36 w-full flex items-center justify-center">
      {cards.map((card, index) => {
        let transformClass = "";
        let zIndexClass = "";
        let opacityClass = "";

        if (index === 0) {
          transformClass = "translate-y-0 scale-100";
          zIndexClass = "z-30";
          opacityClass = "opacity-100";
        } else if (index === 1) {
          transformClass = "translate-y-4 scale-95";
          zIndexClass = "z-20";
          opacityClass = "opacity-80";
        } else {
          transformClass = "translate-y-8 scale-90";
          zIndexClass = "z-10";
          opacityClass = "opacity-45";
        }

        return (
          <div
            key={card.id}
            className={`absolute top-0 w-full bg-brand-bg border border-brand-border p-4 rounded-xl shadow-md transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${transformClass} ${zIndexClass} ${opacityClass}`}
          >
            <div className="text-[10px] font-mono text-brand-accent font-bold">ERROR STATE</div>
            <div className="text-xs font-bold text-brand-dark mt-1 truncate">{card.title}</div>
            <div className="text-[11px] font-mono text-brand-dark/60 mt-1 truncate">{card.value}</div>
          </div>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------
// Sub-component 2: Telemetry Typewriter
// ----------------------------------------------------
function TelemetryTypewriter() {
  const logs = [
    "Scanning DOM tree...",
    "Match: div#header > button.btn-primary",
    "Drift: justify-content: flex-start",
    "Repair: justify-content: center",
  ];

  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let speed = isDeleting ? 30 : 60;
    
    if (!isDeleting && charIndex === logs[currentLogIndex].length) {
      speed = 2000;
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentLogIndex((prev) => (prev + 1) % logs.length);
      speed = 500;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(logs[currentLogIndex].substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else {
        setTypedText(logs[currentLogIndex].substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentLogIndex]);

  return (
    <div className="rounded-xl border border-brand-border bg-[#111111] dark:bg-black p-4 font-mono text-xs text-brand-bg h-32 flex flex-col justify-between">
      <div className="text-[9px] text-brand-accent tracking-widest font-bold">TELEMETRY STREAM</div>
      <div className="flex-1 flex items-center pt-2">
        <span className="text-[#E8E4DD] text-[11px]">
          {typedText}
          <span className="terminal-cursor bg-brand-accent inline-block h-3 w-1.5 ml-1"></span>
        </span>
      </div>
      <div className="text-[9px] text-brand-dark/40 text-right bg-brand-primary px-1 rounded self-end text-brand-dark font-bold">
        STATUS: OK
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Sub-component 3: Cursor Protocol Scheduler
// ----------------------------------------------------
function CursorProtocolScheduler() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cursorPhase, setCursorPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPhase((prev) => {
        const next = (prev + 1) % 6;
        if (next === 2) {
          setActiveIndex(3);
        } else if (next === 5) {
          setActiveIndex(null);
        }
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  let cursorStyle: React.CSSProperties = {
    transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    pointerEvents: "none",
  };

  if (cursorPhase === 0) {
    cursorStyle = { ...cursorStyle, transform: "translate(120px, 100px)", opacity: 0 };
  } else if (cursorPhase === 1) {
    cursorStyle = { ...cursorStyle, transform: "translate(60px, 32px)", opacity: 1 };
  } else if (cursorPhase === 2) {
    cursorStyle = { ...cursorStyle, transform: "translate(60px, 32px) scale(0.8)", opacity: 1 };
  } else if (cursorPhase === 3) {
    cursorStyle = { ...cursorStyle, transform: "translate(80px, 85px)", opacity: 1 };
  } else if (cursorPhase === 4) {
    cursorStyle = { ...cursorStyle, transform: "translate(80px, 85px) scale(0.85)", opacity: 1 };
  } else {
    cursorStyle = { ...cursorStyle, transform: "translate(80px, 85px)", opacity: 0 };
  }

  return (
    <div className="relative rounded-xl border border-brand-border bg-brand-bg p-5 h-36 flex flex-col justify-between overflow-hidden">
      <div className="flex justify-between items-center">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold font-mono transition-all duration-300 border ${
              activeIndex === idx
                ? "bg-brand-accent border-brand-accent text-white scale-110 shadow-[0_0_10px_rgba(230,59,46,0.3)]"
                : "bg-brand-primary border-brand-border text-brand-dark/70"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="text-[10px] font-mono text-brand-dark/50 uppercase font-bold">Auto-check protocol</span>
        <button
          className={`h-8 px-4 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono border transition-all duration-300 ${
            cursorPhase >= 4
              ? "bg-brand-dark text-brand-bg border-brand-dark"
              : "bg-transparent text-brand-dark/70 border-brand-border"
          }`}
        >
          {cursorPhase >= 4 ? "Applying Patch..." : "Commit Fix"}
        </button>
      </div>

      <div className="absolute top-4 left-4 h-6 w-6 z-40" style={cursorStyle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 drop-shadow-md text-brand-accent"
        >
          <path d="M2.25 2.25l7.5 19.5 2.25-9.75 9.75-2.25z" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
