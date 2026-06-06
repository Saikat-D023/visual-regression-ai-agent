"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { IconAlphabetThai } from "@tabler/icons-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-full border transition-all duration-500 ${scrolled
        ? "bg-black/40 border-white/10 backdrop-blur-xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] py-3 px-6"
        : "bg-transparent border-transparent py-4 px-6"
        }`}
    >
      <div className="flex w-full items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <IconAlphabetThai stroke={2} className="text-brand-accent" size={25} />
          <span className="text-xl font-bold tracking-tight text-white font-heading">
            Agentix
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden items-center gap-8 text-sm font-bold text-white/70 sm:flex font-heading">
          <a href="#features" className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">
            features
          </a>
          <a href="#protocol" className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">
            protocol
          </a>
          <a href="#byok" className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">
            byok
          </a>
          <a href="#tui" className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">
            tui
          </a>
        </nav>

        {/* Right side: Theme Toggle & CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-transform hover:scale-110"
            aria-label="Toggle Theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          <Link
            href="/analyze"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#E63B2E] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_15px_rgba(230,59,46,0.3)] transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_6px_20px_rgba(230,59,46,0.5)] active:scale-[0.98]"
          >
            <span className="relative z-10 font-heading text-white">Get Started</span>
            <span className="absolute inset-0 z-0 bg-[#CC2920] transition-transform duration-300 translate-y-full hover:translate-y-0"></span>
          </Link>
        </div>
      </div>
    </header>
  );
}
