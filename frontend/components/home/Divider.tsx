"use client";

export function Divider() {
  return (
    <div className="w-full h-16 flex items-center justify-center opacity-50 overflow-hidden select-none py-8">
      <svg width="100%" height="24" viewBox="0 0 1200 24" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Horizontal Line */}
        <line x1="0" y1="12" x2="1200" y2="12" stroke="currentColor" className="text-brand-border" strokeWidth="1" strokeDasharray="4 8" />
        
        {/* Center Node */}
        <rect x="590" y="2" width="20" height="20" rx="4" className="fill-brand-bg stroke-brand-border" strokeWidth="1" />
        <circle cx="600" cy="12" r="3" className="fill-brand-accent/50" />
        
        {/* Left Node */}
        <rect x="295" y="8" width="10" height="8" rx="2" className="fill-brand-bg stroke-brand-border" strokeWidth="1" />
        <path d="M300 8 L305 4" stroke="currentColor" className="text-brand-accent/40" strokeWidth="1" />
        
        {/* Right Node */}
        <rect x="895" y="8" width="10" height="8" rx="2" className="fill-brand-bg stroke-brand-border" strokeWidth="1" />
        <path d="M900 8 L895 4" stroke="currentColor" className="text-brand-accent/40" strokeWidth="1" />
      </svg>
    </div>
  );
}
