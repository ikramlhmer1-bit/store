import React, { useState } from 'react';
import { DigitalProduct } from '../types/product';
import { X, Plus, Trash2, Edit3, ShieldCheck, Download, Search, RotateCcw } from 'lucide-react';

interface ManageProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: DigitalProduct[];
  onDeleteProduct: (id: string) => void;
  onOpenAddModal: () => void;
  onResetCatalog: () => void;
  currencySymbol: string;
  currencyRate: number;
}

export const ManageProductsModal: React.FC<ManageProductsModalProps> = ({
  isOpen,
  onClose,
  products,
  onDeleteProduct,
  onOpenAddModal,
  onResetCatalog,
  currencySymbol,
  currencyRate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const totalCatalogValue = products.reduce((sum, p) => sum + p.price * p.salesCount, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold font-display">Digital Product Catalog Manager</h2>
            <p className="text-xs text-slate-300">
              Manage inventory, digital licenses, pricing, and active listings
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenAddModal();
              }}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Digital Product</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Catalog KPI Strip */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-slate-500 text-[11px]">Total Products</div>
            <div className="text-base font-bold text-slate-900 font-mono">{products.length}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[11px]">Delivered Licenses</div>
            <div className="text-base font-bold text-slate-900 font-mono">
              {products.reduce((acc, p) => acc + p.salesCount, 0).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-slate-500 text-[11px]">Pricing Baseline</div>
            <div className="text-base font-bold text-emerald-600 font-mono">
              {currencySymbol}{(30 * currencyRate).toFixed(2)} USD Flat
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={onResetCatalog}
              className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
              title="Reset store to original default software catalog"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by software name..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 overflow-x-auto pb-1 sm:pb-0">
            {['All', '3D & CAD', 'Audio & Music', 'Graphic Design', 'Architecture', 'Video & VFX'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer text-xs font-medium ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Table of Products */}
        <div className="max-h-[480px] overflow-y-auto divide-y divide-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 sticky top-0 border-b border-slate-200 font-medium">
              <tr>
                <th className="py-2.5 px-4">Software Product</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">License & OS</th>
                <th className="py-2.5 px-3">Price</th>
                <th className="py-2.5 px-3">Sales / Orders</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => {
                const isCustom = !product.id.startsWith('sketchup') &&
                  !product.id.startsWith('autodesk-auto') &&
                  !product.id.startsWith('fl-studio') &&
                  !product.id.startsWith('wilcom') &&
                  !product.id.startsWith('coreldraw') &&
                  !product.id.startsWith('autodesk-revit') &&
                  !product.id.startsWith('virtual-dj') &&
                  !product.id.startsWith('vectric');

                return (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-10 rounded shadow-xs flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${product.boxStyle.accentColor}, #0f172a)`
                          }}
                        >
                          {product.shortTitle.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">{product.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            Ver: {product.version} · {product.deliveryDetails.fileSize}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-slate-600 font-medium">{product.category}</span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-700 font-medium">{product.licenseType}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-tight">
                        {product.os.join(' / ')}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-slate-900">
                      {currencySymbol}{(product.price * currencyRate).toFixed(2)}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">
                      {product.salesCount.toLocaleString()} units
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete / Remove product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filtered.length} of {products.length} products</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Manager
          </button>
        </div>
      </div>
    </div>
  );
};
