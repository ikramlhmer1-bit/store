import React from 'react';
import { ShieldCheck, Zap, Lock, Headphones, RefreshCw } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenSupport: () => void;
  onOpenAddProduct: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSupport,
  onOpenAddProduct
}) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-display font-black text-2xl tracking-tighter text-white flex items-center">
              <span>Soft</span>
              <span className="text-blue-400">Cad</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Software Made Simple, Delivered Instantly. The premier marketplace for genuine digital CAD, 3D modeling, architecture, audio, and engineering software licenses.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Genuine Licenses
              </span>
              <span className="text-slate-700">·</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                <Zap className="w-3.5 h-3.5" />
                Instant Delivery
              </span>
            </div>
          </div>

          {/* Software Categories (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Software Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectCategory('3D & CAD')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3D & CAD Software
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Audio & Music')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Audio & Music Production
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Graphic Design')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Graphic & Vector Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Architecture')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  BIM & Architectural Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Video & VFX')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Video Editing & Visual Effects
                </button>
              </li>
            </ul>
          </div>

          {/* Vendor & Digital Portal (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Product Portal
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenAddProduct}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer"
                >
                  + Add Digital Product
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSupport}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Vendor Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSupport}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Instant Key Fulfillment
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Trust & Support (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Customer Trust
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>256-Bit Encrypted Payments</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>30-Day Activation Guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <Headphones className="w-3.5 h-3.5 text-slate-400" />
                <span>24/7 Dedicated Support Help</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Soft-CAD.com Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenSupport} className="hover:text-slate-400 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={onOpenSupport} className="hover:text-slate-400 transition-colors cursor-pointer">
              Terms of Service
            </button>
            <span>·</span>
            <button onClick={onOpenSupport} className="hover:text-slate-400 transition-colors cursor-pointer">
              Digital Delivery Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
