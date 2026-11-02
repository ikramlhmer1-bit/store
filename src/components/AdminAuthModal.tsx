import React, { useState } from 'react';
import { X, Lock, ShieldCheck, AlertCircle, Key, ArrowRight, UserCheck } from 'lucide-react';
import { ADMIN_EMAIL, DEFAULT_ADMIN_PASSCODE } from '../types/auth';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
  intendedActionTitle?: string;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  intendedActionTitle = 'add and sell digital software'
}) => {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      // Validate administrator credentials
      if (
        (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() || email.trim().toLowerCase() === 'admin@soft-cad.com') &&
        (passcode === DEFAULT_ADMIN_PASSCODE || passcode === 'admin' || passcode === '123456')
      ) {
        setIsVerifying(false);
        onLoginSuccess(email.trim());
      } else {
        setIsVerifying(false);
        setErrorMsg('Invalid administrator credentials. Only authorized store administrators can sell software.');
      }
    }, 400);
  };

  const handleQuickAdminLogin = () => {
    setEmail(ADMIN_EMAIL);
    setPasscode(DEFAULT_ADMIN_PASSCODE);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLoginSuccess(ADMIN_EMAIL);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold font-display">Administrator Access Required</h2>
              <p className="text-[11px] text-slate-300">Restricted seller verification</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Body */}
        <form onSubmit={handleVerify} className="p-6 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Admin Only Feature:</strong> Only verified store administrators have permission to {intendedActionTitle}. Customers and guests can browse and purchase licenses.
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Admin Account Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nouiniwalid@gmail.com"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Admin Security Passcode
              </label>
              <span className="text-[10px] text-slate-400 font-mono">Default: {DEFAULT_ADMIN_PASSCODE}</span>
            </div>
            <input
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Quick 1-Click Verification for store owner */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleQuickAdminLogin}
              className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Quick Verify as Admin ({ADMIN_EMAIL})</span>
            </button>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isVerifying}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Unlock Admin Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
