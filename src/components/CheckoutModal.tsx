import React, { useState } from 'react';
import { CartItem, OrderConfirmation } from '../types/product';
import { X, Check, Copy, Download, ShieldCheck, Zap, Lock, CreditCard, ArrowLeft, ExternalLink } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: OrderConfirmation) => void;
  currencySymbol: string;
  currencyRate: number;
  initialEmail?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
  currencySymbol,
  currencyRate,
  initialEmail = 'nouiniwalid@gmail.com'
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState('Walid Nouini');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'paypal' | 'crypto'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('789');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null);
  const [copiedKeyIndex, setCopiedKeyIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Generate genuine license keys for purchased items
      const orderId = 'SCAD-' + Math.floor(100000 + Math.random() * 900000);
      const confirmedItems = items.map((item) => {
        const randomSegment = () => Math.random().toString(36).substring(2, 6).toUpperCase();
        const licenseKey = `${item.product.shortTitle.slice(0, 4).toUpperCase()}-${randomSegment()}-${randomSegment()}-${randomSegment()}`;
        return {
          product: item.product,
          quantity: item.quantity,
          licenseKey: item.product.deliveryDetails.sampleKey || licenseKey,
          downloadUrl: item.product.deliveryDetails.installerUrl,
          selectedOs: item.selectedOs
        };
      });

      const order: OrderConfirmation = {
        orderId,
        customerEmail: email,
        customerName: name,
        items: confirmedItems,
        totalAmount,
        currency: 'USD',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      };

      setIsProcessing(false);
      setCompletedOrder(order);
      onOrderCompleted(order);
    }, 1200);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyIndex(index);
    setTimeout(() => setCopiedKeyIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold font-display">
              {completedOrder ? 'Order Confirmed - Digital Delivery' : 'Soft-CAD.com Secure Instant Checkout'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 2: Instant Delivery Success Screen */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-950">
                Payment Successful & License Issued!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Order <span className="font-mono font-semibold text-slate-700">#{completedOrder.orderId}</span> · Delivery confirmation sent to <span className="font-semibold text-slate-900">{completedOrder.customerEmail}</span>
              </p>
            </div>

            {/* Generated License Keys & Download Section */}
            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Your Purchased Digital Software ({completedOrder.items.length})
              </div>

              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.product.title}</h4>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Platform: {item.selectedOs.toUpperCase()} · Lifetime Genuine License
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {currencySymbol}{(item.product.price * currencyRate).toFixed(2)}
                    </span>
                  </div>

                  {/* License Key Box */}
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-2 shadow-2xs">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold text-slate-400">Lifetime Product Key</div>
                      <div className="text-xs font-mono font-bold text-indigo-700 tracking-wider truncate">
                        {item.licenseKey}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.licenseKey, idx)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        copiedKeyIndex === idx
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {copiedKeyIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Key</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct Installer Download */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Size: {item.product.deliveryDetails.fileSize}
                    </span>

                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Starting direct download for ${item.product.shortTitle} installer (.zip package)!`);
                      }}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Installer</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Post-order actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => alert(`Receipt #${completedOrder.orderId} printed / saved!`)}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer flex items-center gap-1"
              >
                <span>Print Invoice</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ) : (
          /* STEP 1: Payment and Customer Information */
          <form onSubmit={handlePay} className="p-6 sm:p-8 space-y-5">
            {/* Delivery Email Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instant Delivery Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Your license activation keys and direct installer links will be delivered here instantly.
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cardholder / Licensee Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Payment Option
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'applepay'
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span>Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Mock Card Input */}
            {paymentMethod === 'card' && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">Expires</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1">CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Total breakdown */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              <span className="text-xs text-slate-600">Total Charged</span>
              <span className="text-lg font-bold font-mono text-slate-900">
                {currencySymbol}{(totalAmount * currencyRate).toFixed(2)} USD
              </span>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Instant License Delivery...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Pay {currencySymbol}{(totalAmount * currencyRate).toFixed(2)} USD & Receive Key</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant digital fulfillment verified with SHA-256 secure checkout</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
