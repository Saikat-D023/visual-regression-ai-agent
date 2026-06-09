"use client";

import Link from "next/link";
import { IconAlphabetThai, IconBrandGithub, IconBrandX } from '@tabler/icons-react';

export function Footer() {
  return (
    <footer className="w-full bg-brand-bg py-12 px-6 border-t border-brand-border/30 transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <IconAlphabetThai stroke={2} className="text-brand-accent" size={25} />
          <span className="font-heading font-bold text-sm text-brand-dark">Agentix</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8 text-xs font-medium text-brand-dark/60">
          <Link href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-brand-dark transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-brand-dark transition-colors">Contact</Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4 text-brand-dark/40">
          <a href="https://x.com/dsaikat5" target="_blank" rel="noopener noreferrer" className="hover:text-brand-dark transition-colors">
            {/* <Twitter size={16} /> */}
            <IconBrandX stroke={2} />
          </a>
          <a href="https://github.com/Saikat-D023/visual-regression-ai-agent" target="_blank" rel="noopener noreferrer" className="hover:text-brand-dark transition-colors">
            {/* <Github size={16} /> */}
            <IconBrandGithub stroke={2} />
          </a>
        </div>

      </div>
      <div className="max-w-6xl mx-auto mt-8 text-center md:text-left text-[10px] text-brand-dark/40">
        &copy; {new Date().getFullYear()} Agentix Inc. All rights reserved. Built for visual perfection.
      </div>
    </footer>
  );
}
