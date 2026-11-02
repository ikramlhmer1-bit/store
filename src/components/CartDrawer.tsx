import React, { useState } from 'react';
import { CartItem } from '../types/product';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
  currencySymbol: string;
  currencyRate: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  currencySymbol,
  currencyRate
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = rawSubtotal * appliedDiscount;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SOFTCAD10' || promoCode.trim().toUpperCase() === 'CAD10' || promoCode.trim().toUpperCase() === 'DELVRA10') {
      setAppliedDiscount(0.10);
      setPromoMessage('10% discount code applied!');
    } else if (promoCode.trim().toUpperCase() === 'FIRSTBUY') {
      setAppliedDiscount(0.15);
      setPromoMessage('15% First-time buyer discount applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try SOFTCAD10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-slate-900">Shopping Bag</span>
            <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {items.reduce((acc, it) => acc + it.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Banner */}
        <div className="bg-emerald-50 px-5 py-2.5 border-b border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Instant Email Delivery included (Delivery Time: &lt; 60 seconds)</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
          {items.map((item) => {
            const itemPrice = (item.product.price * currencyRate).toFixed(2);
            return (
              <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                {/* Micro Box Icon */}
                <div
                  className="w-12 h-14 rounded-md shadow-xs flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${item.product.boxStyle.accentColor}, #0f172a)`
                  }}
                >
                  {item.product.shortTitle.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-slate-900 leading-snug line-clamp-1">
                    {item.product.title}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                    <span className="capitalize">{item.selectedOs} Platform</span>
                    <span>·</span>
                    <span>Lifetime</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border border-slate-200 rounded-md">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {currencySymbol}{(item.product.price * item.quantity * currencyRate).toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="py-20 text-center text-slate-400 text-xs">
              Your bag is currently empty.
            </div>
          )}
        </div>

        {/* Promo code & Summary Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Coupon code (SOFTCAD10)"
                  className="w-full pl-8 pr-2 py-1.5 text-xs uppercase font-mono border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 cursor-pointer"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <div className={`text-[11px] font-medium ${appliedDiscount > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                {promoMessage}
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium">{currencySymbol}{(rawSubtotal * currencyRate).toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({appliedDiscount * 100}%)</span>
                  <span className="font-mono">-{currencySymbol}{(discountAmount * currencyRate).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Digital Delivery</span>
                <span className="font-medium text-emerald-600">FREE (Instant)</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-950 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span className="font-mono">{currencySymbol}{(finalTotal * currencyRate).toFixed(2)} USD</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedCheckout}
              className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instant Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>256-Bit SSL Encrypted & Virus-Free Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
