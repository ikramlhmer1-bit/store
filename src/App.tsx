import React, { useState, useEffect, useRef } from 'react';
import { DigitalProduct, CartItem, OrderConfirmation } from './types/product';
import { INITIAL_PRODUCTS, CATEGORIES, CURRENCIES } from './data/defaultProducts';
import { ADMIN_EMAIL } from './types/auth';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AddProductModal } from './components/AddProductModal';
import { ManageProductsModal } from './components/ManageProductsModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { SupportModal } from './components/SupportModal';
import { AccountModal } from './components/AccountModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Footer } from './components/Footer';
import { PlusCircle, ShieldCheck, Zap, Star, CheckCircle, ArrowRight, Sparkles, Lock, Shield } from 'lucide-react';

const STORAGE_KEY_PRODUCTS = 'softcad_products_catalog_v1';
const STORAGE_KEY_CART = 'softcad_cart_items_v1';
const STORAGE_KEY_ORDERS = 'softcad_user_orders_v1';
const STORAGE_KEY_ADMIN = 'softcad_admin_session_v1';

export default function App() {
  // Admin Authentication State: "the admin only can sell the software"
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading admin auth:', e);
    }
    return false;
  });

  const [adminEmail, setAdminEmail] = useState<string>(ADMIN_EMAIL);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [pendingAdminAction, setPendingAdminAction] = useState<'add' | 'manage' | null>(null);

  // Products Catalog with LocalStorage persistence
  const [products, setProducts] = useState<DigitalProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart:', e);
    }
    return [];
  });

  // User Orders History
  const [orders, setOrders] = useState<OrderConfirmation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders:', e);
    }
    return [];
  });

  // Currency & Category filters
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All Software');

  // Modals & Navigation states
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isManageProductsOpen, setIsManageProductsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const bestSellersRef = useRef<HTMLDivElement>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN, JSON.stringify(isAdmin));
    } catch (e) {
      console.error(e);
    }
  }, [isAdmin]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Admin Access Guards: "the admin only can sell the software"
  const handleOpenAddProduct = () => {
    if (!isAdmin) {
      setPendingAdminAction('add');
      setIsAdminAuthOpen(true);
    } else {
      setIsAddProductOpen(true);
    }
  };

  const handleOpenManageProducts = () => {
    if (!isAdmin) {
      setPendingAdminAction('manage');
      setIsAdminAuthOpen(true);
    } else {
      setIsManageProductsOpen(true);
    }
  };

  const handleAdminLoginSuccess = (email: string) => {
    setIsAdmin(true);
    setAdminEmail(email);
    setIsAdminAuthOpen(false);
    showToast(`Verified as Administrator (${email}). You now have access to sell software!`);

    if (pendingAdminAction === 'add') {
      setIsAddProductOpen(true);
    } else if (pendingAdminAction === 'manage') {
      setIsManageProductsOpen(true);
    }
    setPendingAdminAction(null);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setIsAddProductOpen(false);
    setIsManageProductsOpen(false);
    showToast('Signed out of Administrator Mode. Storefront is in customer view.');
  };

  // Cart operations
  const handleAddToCart = (product: DigitalProduct, selectedOs?: 'windows' | 'mac') => {
    const osChoice = selectedOs || (product.os.includes('windows') ? 'windows' : 'mac');
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.product.id === product.id && it.selectedOs === osChoice
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { product, quantity: 1, selectedOs: osChoice }];
    });
    showToast(`Added "${product.shortTitle}" to shopping bag!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: DigitalProduct, selectedOs: 'windows' | 'mac') => {
    handleAddToCart(product, selectedOs);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Add & Manage Products operations (Authorized for Admin only)
  const handleAddNewProduct = (newProduct: DigitalProduct) => {
    if (!isAdmin) {
      showToast('Unauthorized: Only administrators can publish products.');
      return;
    }
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Digital product "${newProduct.shortTitle}" published to catalog by Admin!`);
    setTimeout(() => {
      bestSellersRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const handleDeleteProduct = (productId: string) => {
    if (!isAdmin) {
      showToast('Unauthorized: Only administrators can remove products.');
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog.');
  };

  const handleResetCatalog = () => {
    if (!isAdmin) {
      showToast('Unauthorized: Only administrators can reset the catalog.');
      return;
    }
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
    showToast('Catalog reset to default software products.');
  };

  const handleOrderCompleted = (order: OrderConfirmation) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    showToast(`Order #${order.orderId} completed successfully!`);
  };

  // Filtered Products for the Best Sellers Grid
  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'All Software') return true;
    return p.category === activeCategory;
  });

  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-medium flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Header with Admin detection */}
      <Header
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAddProduct={handleOpenAddProduct}
        onOpenManageProducts={handleOpenManageProducts}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectCategory={setActiveCategory}
        activeCategory={activeCategory}
        isAdmin={isAdmin}
        adminEmail={adminEmail}
        onAdminLogout={handleAdminLogout}
        onOpenAdminAuth={() => {
          setPendingAdminAction(null);
          setIsAdminAuthOpen(true);
        }}
      />

      {/* Hero Section */}
      <Hero
        onShopNow={() => {
          bestSellersRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAddProduct={handleOpenAddProduct}
        isAdmin={isAdmin}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* BEST SELLERS Section matching user screenshot */}
        <div ref={bestSellersRef} className="space-y-6">
          <div className="border-b border-slate-100 pb-2">
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-slate-950 uppercase">
              BEST SELLERS
            </h2>
          </div>

          {/* 4-Column Software Product Grid matching Delvra screenshot layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 pt-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={selectedCurrency.symbol}
                currencyRate={selectedCurrency.rate}
                onSelectProduct={setSelectedProduct}
                onAddToCart={(prod) => handleAddToCart(prod)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center space-y-3">
              <p className="text-sm text-slate-500">No software products found.</p>
              <button
                onClick={() => setActiveCategory('All Software')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                View All Software
              </button>
            </div>
          )}
        </div>

        {/* Trust & Guarantee Section */}
        <section className="mt-20 border-t border-slate-100 pt-14">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-display text-xl font-bold text-slate-900">
              Why Professionals Choose Soft-CAD.com
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Trusted by 12,000+ engineers, designers, architects, and audio producers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">100% Virus-Free & Verified</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every software installer package is verified against official SHA-256 digital checksums before being added to our direct cloud mirrors.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">60-Second Email Fulfillment</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated key dispatch system emails your official lifetime activation code and high-speed installer download link instantaneously.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">30-Day Money-Back Guarantee</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your software fails to activate on your compatible machine, our support team will provide 1-on-1 assistance or an unconditional full refund.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chat Button matching Delvra screenshot */}
      <LiveChatWidget onOpenAddProduct={handleOpenAddProduct} />

      {/* Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenAddProduct={handleOpenAddProduct}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currencySymbol={selectedCurrency.symbol}
        currencyRate={selectedCurrency.rate}
        onAddToCart={(prod, os) => handleAddToCart(prod, os)}
        onBuyNow={(prod, os) => handleBuyNow(prod, os)}
      />

      {/* Admin Auth Modal (Guards selling to admin only) */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => {
          setIsAdminAuthOpen(false);
          setPendingAdminAction(null);
        }}
        onLoginSuccess={handleAdminLoginSuccess}
        intendedActionTitle={pendingAdminAction === 'add' ? 'add and sell digital software' : 'manage the product catalog'}
      />

      {/* Add Product Modal (Admin only) */}
      {isAdmin && (
        <AddProductModal
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onAddProduct={handleAddNewProduct}
        />
      )}

      {/* Manage Products Modal (Admin only) */}
      {isAdmin && (
        <ManageProductsModal
          isOpen={isManageProductsOpen}
          onClose={() => setIsManageProductsOpen(false)}
          products={products}
          onDeleteProduct={handleDeleteProduct}
          onOpenAddModal={() => setIsAddProductOpen(true)}
          onResetCatalog={handleResetCatalog}
          currencySymbol={selectedCurrency.symbol}
          currencyRate={selectedCurrency.rate}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        currencySymbol={selectedCurrency.symbol}
        currencyRate={selectedCurrency.rate}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleOrderCompleted}
        currencySymbol={selectedCurrency.symbol}
        currencyRate={selectedCurrency.rate}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={setSelectedProduct}
        currencySymbol={selectedCurrency.symbol}
        currencyRate={selectedCurrency.rate}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        onOpenChat={() => {}}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        orders={orders}
        userEmail={adminEmail}
        isAdmin={isAdmin}
        onOpenAddProduct={() => setIsAddProductOpen(true)}
        onOpenManageProducts={() => setIsManageProductsOpen(true)}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onAdminLogout={handleAdminLogout}
      />
    </div>
  );
}
