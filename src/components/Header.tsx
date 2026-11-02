import React, { useState } from 'react';
import { Search, User, ShoppingBag, ChevronDown, PlusCircle, LayoutDashboard, Shield, ShieldCheck, Lock, LogOut } from 'lucide-react';
import { CURRENCIES, CATEGORIES } from '../data/defaultProducts';

interface HeaderProps {
  selectedCurrency: typeof CURRENCIES[0];
  onSelectCurrency: (currency: typeof CURRENCIES[0]) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAddProduct: () => void;
  onOpenManageProducts: () => void;
  onOpenSupport: () => void;
  onOpenAccount: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  isAdmin: boolean;
  adminEmail: string;
  onAdminLogout: () => void;
  onOpenAdminAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCurrency,
  onSelectCurrency,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAddProduct,
  onOpenManageProducts,
  onOpenSupport,
  onOpenAccount,
  onSelectCategory,
  activeCategory,
  isAdmin,
  adminEmail,
  onAdminLogout,
  onOpenAdminAuth
}) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* LEFT ZONE: Navigation links */}
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <button
            onClick={() => onSelectCategory('All Software')}
            className={`cursor-pointer transition-colors hover:text-slate-900 ${
              activeCategory === 'All Software' ? 'text-slate-950 font-semibold underline underline-offset-8 decoration-2 decoration-slate-900' : ''
            }`}
          >
            Home
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              onBlur={() => setTimeout(() => setIsCategoriesOpen(false), 200)}
              className="flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors py-2"
            >
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCategoriesOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                      setIsCategoriesOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors hover:bg-slate-50 flex items-center justify-between ${
                      activeCategory === cat ? 'text-indigo-600 bg-indigo-50/50 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <span>{cat}</span>
                    {activeCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenSupport}
            className="hidden sm:inline-flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors"
          >
            <span>Support</span>
          </button>
        </nav>

        {/* CENTER ZONE: SoftCad Brand Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('All Software');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 group"
          >
            <span className="font-display font-black text-2xl tracking-tighter group-hover:opacity-90 transition-opacity">
              <span className="text-black">Soft</span>
              <span className="text-blue-600">Cad</span>
            </span>
          </a>
        </div>

        {/* RIGHT ZONE: Region, Search, Add Product, User Account, Shopping Bag */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Currency / Region Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              onBlur={() => setTimeout(() => setIsCurrencyOpen(false), 200)}
              className="flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer py-1.5 px-2 rounded-md hover:bg-slate-50 transition-colors"
            >
              <span>{selectedCurrency.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCurrencyOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCurrencyOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Select Currency
                </div>
                {CURRENCIES.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      onSelectCurrency(curr);
                      setIsCurrencyOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs transition-colors hover:bg-slate-50 flex items-center justify-between ${
                      selectedCurrency.code === curr.code ? 'font-semibold text-indigo-600 bg-indigo-50/40' : 'text-slate-700'
                    }`}
                  >
                    <span>{curr.label}</span>
                    <span className="font-mono text-slate-400">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Search software"
            title="Search software catalog"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Account Icon */}
          <button
            onClick={onOpenAccount}
            className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="User Account"
            title="Account & My Licenses"
          >
            <User className="w-4.5 h-4.5" />
          </button>

          {/* Cart Bag Icon with badge counter */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Shopping Bag"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white font-mono tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
