import React, { useState, useEffect, useRef } from 'react';
import { DigitalProduct } from '../types/product';
import { Search, X, Zap, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: DigitalProduct[];
  onSelectProduct: (product: DigitalProduct) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  currencySymbol,
  currencyRate
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.shortTitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.version.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search software by name (e.g. AutoCAD, SketchUp, FL Studio)..."
            className="w-full text-sm placeholder:text-slate-400 focus:outline-hidden text-slate-900 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-50">
          {results.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                onSelectProduct(product);
                onClose();
              }}
              className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 min-w-0 pr-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-2xs"
                  style={{
                    background: `linear-gradient(135deg, ${product.boxStyle.accentColor}, #0f172a)`
                  }}
                >
                  {product.shortTitle.charAt(0)}
                </div>

                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                    {product.title}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{product.category}</span>
                    <span>·</span>
                    <span className="capitalize">{product.os.join('/')}</span>
                    <span>·</span>
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <Zap className="w-3 h-3" /> Instant
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono font-bold text-slate-900">
                  {currencySymbol}{(product.price * currencyRate).toFixed(2)} USD
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}

          {results.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              No digital software found matching "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{results.length} software titles found</span>
          <span>Press ESC or click anywhere to exit</span>
        </div>
      </div>
    </div>
  );
};
