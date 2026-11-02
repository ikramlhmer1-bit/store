import React, { useState } from 'react';
import { DigitalProduct } from '../types/product';
import { SoftwareBox3D } from './SoftwareBox3D';
import { X, ShoppingBag, Zap, ShieldCheck, Check, Star, Download, Monitor, HardDrive, Cpu, Layers } from 'lucide-react';

interface ProductDetailModalProps {
  product: DigitalProduct | null;
  onClose: () => void;
  currencySymbol: string;
  currencyRate: number;
  onAddToCart: (product: DigitalProduct, selectedOs: 'windows' | 'mac') => void;
  onBuyNow: (product: DigitalProduct, selectedOs: 'windows' | 'mac') => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currencySymbol,
  currencyRate,
  onAddToCart,
  onBuyNow
}) => {
  if (!product) return null;

  const defaultOs: 'windows' | 'mac' = product.os.includes('windows') ? 'windows' : 'mac';
  const [selectedOs, setSelectedOs] = useState<'windows' | 'mac'>(defaultOs);
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'delivery'>('overview');
  const [justAdded, setJustAdded] = useState(false);

  const displayPrice = (product.price * currencyRate).toFixed(2);
  const displayOriginalPrice = (product.originalPrice * currencyRate).toFixed(2);
  const savingsPct = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAdd = () => {
    onAddToCart(product, selectedOs);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedOs);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Side: 3D Box Display with background highlight (5 cols) */}
          <div className="md:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/70 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            <div className="py-6 scale-110">
              <SoftwareBox3D product={product} size="lg" isHovered={true} />
            </div>

            {/* Instant Delivery badge under box */}
            <div className="w-full mt-4 p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <Zap className="w-4 h-4 fill-emerald-600" />
                <span>Instant Digital Delivery in 60s</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                License activation key & direct official installer link will be emailed immediately after payment.
              </p>
              <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-100">
                <span>File Size: {product.deliveryDetails.fileSize}</span>
                <span>Format: {product.deliveryDetails.format}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Product Buy Module & Tabs (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 text-xs mb-2">
                <span className="font-semibold uppercase tracking-wider text-indigo-600">
                  {product.category}
                </span>

                <div className="flex items-center gap-1 text-slate-700">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold ml-1">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 leading-snug">
                {product.title}
              </h2>

              {product.subtitle && (
                <p className="text-xs text-slate-500 mt-1">
                  {product.subtitle} · Version: <span className="font-mono">{product.version}</span>
                </p>
              )}

              {/* Price Banner */}
              <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold font-mono text-slate-950 tabular-nums">
                    {currencySymbol}{displayPrice} <span className="text-xs font-sans font-medium text-slate-500">USD</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                    <span className="line-through">{currencySymbol}{displayOriginalPrice}</span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">
                      Save {savingsPct}%
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Lifetime License
                  </span>
                  <div className="text-[11px] text-slate-500">One-time payment</div>
                </div>
              </div>

              {/* OS Selection */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Operating System:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.os.includes('windows') && (
                    <button
                      type="button"
                      onClick={() => setSelectedOs('windows')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        selectedOs === 'windows'
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 88 88" fill="currentColor">
                        <path d="M0 12.402l35.689-4.86v35.435H0V12.402zm35.689 39.463v35.435L0 82.44V51.865h35.689zm5.311-40.185L88 4.298v38.679H41v-31.274zm47 40.185L41 51.865v38.679l47-6.529V51.865z" />
                      </svg>
                      <span>Windows 10 / 11</span>
                    </button>
                  )}

                  {product.os.includes('mac') && (
                    <button
                      type="button"
                      onClick={() => setSelectedOs('mac')}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        selectedOs === 'mac'
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 170 170" fill="currentColor">
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.76-7.87-12.23-14.35-6.55-9.52-11.75-20.73-15.6-33.64-3.85-12.9-5.78-25.04-5.78-36.42 0-14.19 3.52-26.04 10.57-35.56 7.05-9.52 16.03-14.37 26.94-14.56 5.26 0 10.96 1.34 17.1 4.02 6.13 2.68 10.15 4.07 12.06 4.18 1.54 0 5.8-1.47 12.78-4.41 6.98-2.94 13.06-4.22 18.24-3.85 13.9.73 24.8 5.76 32.7 15.09-12.18 7.39-18.17 17.43-17.97 30.12.2 10.18 4.13 18.73 11.8 25.66 7.67 6.93 16.94 10.83 27.81 11.7-2.34 7.04-5.36 14.54-9.06 22.5zM119.22 31.85c0-7.39 2.63-14.35 7.89-20.88 5.26-6.53 11.78-10.52 19.57-11.97.13 1.01.2 1.94.2 2.8 0 7.32-2.78 14.4-8.34 21.24-5.56 6.84-12.33 10.74-20.32 11.71-.27-.9-.4-1.87-.4-2.9z" />
                      </svg>
                      <span>macOS (Apple Silicon / Intel)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Informational Tabs */}
              <div className="mt-5">
                <div className="flex border-b border-slate-200 text-xs">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 px-3 font-semibold transition-colors cursor-pointer ${
                      activeTab === 'overview'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Overview & Features
                  </button>
                  <button
                    onClick={() => setActiveTab('requirements')}
                    className={`pb-2 px-3 font-semibold transition-colors cursor-pointer ${
                      activeTab === 'requirements'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    System Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`pb-2 px-3 font-semibold transition-colors cursor-pointer ${
                      activeTab === 'delivery'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Instant Delivery Guide
                  </button>
                </div>

                <div className="py-3 text-xs text-slate-600 min-h-[110px]">
                  {activeTab === 'overview' && (
                    <div className="space-y-2">
                      <p className="line-clamp-2 leading-relaxed">{product.description}</p>
                      <ul className="space-y-1 mt-2">
                        {product.features.slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'requirements' && (
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 bg-slate-50 rounded">
                        <span className="font-semibold text-slate-700 block">OS:</span>
                        <span className="text-slate-500">{product.systemRequirements.os}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded">
                        <span className="font-semibold text-slate-700 block">Processor:</span>
                        <span className="text-slate-500">{product.systemRequirements.cpu}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded">
                        <span className="font-semibold text-slate-700 block">RAM:</span>
                        <span className="text-slate-500">{product.systemRequirements.ram}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded">
                        <span className="font-semibold text-slate-700 block">Storage:</span>
                        <span className="text-slate-500">{product.systemRequirements.storage}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'delivery' && (
                    <div className="space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
                      <p><strong>1. Immediate Access:</strong> You will receive an instant email receipt containing your genuine license key and official direct download mirror.</p>
                      <p><strong>2. One-Click Setup:</strong> Run the installer, paste your lifetime key, and activate permanently without any renewal prompts.</p>
                      <p><strong>3. Support Guarantee:</strong> Our technical team is available 24/7 if you need assistance during installation.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 active:scale-95'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuy}
                className="flex-1 py-3 px-4 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Buy Now with 1-Click</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
