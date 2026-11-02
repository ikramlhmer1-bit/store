import React from 'react';
import { ArrowDown, ShieldCheck, Zap, Headphones, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onOpenAddProduct: () => void;
  isAdmin?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onOpenAddProduct, isAdmin = false }) => {
  return (
    <div className="relative w-full overflow-hidden bg-[#241442] text-white select-none">
      {/* Ambient background glows matching Delvra violet palette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#200d38] via-[#35185a] to-[#200d38]" />

      {/* Atmospheric lighting effects */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Visual Workspace Elements: Simulated monitor, plant & sleek aesthetic */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 flex flex-col items-center justify-center text-center z-10">
        {/* Hero Headline from Screenshot: "Software Made Simple, Delivered Instantly" */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl text-balance drop-shadow-sm leading-[1.15]">
          Software Made Simple, Delivered Instantly
        </h1>

        <p className="mt-4 text-base sm:text-lg text-purple-200/90 max-w-2xl font-normal leading-relaxed">
          Premium CAD, 3D modeling, architecture, and creative engineering suites with genuine permanent activation on Soft-CAD.com.
        </p>

        {/* Action Button from Screenshot: "SHOP NOW" */}
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={onShopNow}
            className="px-8 py-3.5 bg-slate-200/95 hover:bg-white text-slate-900 font-display font-semibold text-xs tracking-wider uppercase rounded-md shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer"
          >
            SHOP NOW
          </button>
        </div>

        {/* Value Prop Micro-strip */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-4xl w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-purple-300 shrink-0">
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Instant Download</div>
              <div className="text-[11px] text-purple-200/70">Key & file in 60 seconds</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-purple-300 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">100% Genuine</div>
              <div className="text-[11px] text-purple-200/70">Lifetime activation guarantee</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-purple-300 shrink-0">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Zero Subscription</div>
              <div className="text-[11px] text-purple-200/70">One-time payment forever</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-purple-300 shrink-0">
              <Headphones className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">24/7 Setup Help</div>
              <div className="text-[11px] text-purple-200/70">Assisted remote activation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
