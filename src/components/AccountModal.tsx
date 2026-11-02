import React, { useState } from 'react';
import { OrderConfirmation } from '../types/product';
import { X, User, Key, Download, Copy, Check, Shield, PlusCircle, LayoutDashboard, Lock, ShieldCheck } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderConfirmation[];
  userEmail?: string;
  isAdmin?: boolean;
  onOpenAddProduct?: () => void;
  onOpenManageProducts?: () => void;
  onOpenAdminAuth?: () => void;
  onAdminLogout?: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orders,
  userEmail = 'nouiniwalid@gmail.com',
  isAdmin = false,
  onOpenAddProduct,
  onOpenManageProducts,
  onOpenAdminAuth,
  onAdminLogout
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-base font-semibold font-display">My Account & Digital Licenses</h2>
              <p className="text-xs text-slate-300">{userEmail}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[500px] overflow-y-auto space-y-6">
          {/* Status badge */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-slate-900">Walid Nouini</div>
                <div className="text-slate-500 font-mono text-[11px]">{userEmail}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin ? (
                <div className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-full text-[11px] border border-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Verified Store Admin</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full text-[11px]">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Verified Customer</span>
                </div>
              )}
            </div>
          </div>

          {/* Admin Seller Management Area: "the admin only can sell the software" */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold font-display uppercase tracking-wider">
                  Store Administration & Selling Portal
                </span>
              </div>
              {isAdmin && onAdminLogout && (
                <button
                  onClick={onAdminLogout}
                  className="text-[11px] text-slate-400 hover:text-white cursor-pointer underline"
                >
                  Exit Admin
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed">
              {isAdmin
                ? 'You are authorized as Store Admin. You can publish new digital software products, configure license keys, and manage store catalog pricing.'
                : 'Only authorized store administrators can list, price, and sell software on SoftCad.'}
            </p>

            {isAdmin ? (
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAddProduct?.();
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Add Digital Product</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenManageProducts?.();
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Manage Catalog</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenAdminAuth?.();
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Sign In to Sell Software</span>
              </button>
            )}
          </div>

          {/* Orders / Digital Licenses vault */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-blue-600" />
              Active Software Licenses & Keys ({orders.reduce((acc, o) => acc + o.items.length, 0)})
            </h3>

            {orders.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 space-y-2">
                <p>No software purchases found yet.</p>
                <p className="text-[11px] text-slate-400">
                  Any digital licenses you purchase will automatically be archived here with instant download links.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.orderId} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                      <span className="font-mono font-semibold text-slate-700">Order #{order.orderId}</span>
                      <span className="text-slate-400">{order.createdAt}</span>
                    </div>

                    {order.items.map((it, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{it.product.title}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                            Key: <span className="text-blue-600 font-semibold">{it.licenseKey}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => copyKey(it.licenseKey)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === it.licenseKey ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <a
                            href={it.downloadUrl}
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Downloading installer for ${it.product.shortTitle}`);
                            }}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
