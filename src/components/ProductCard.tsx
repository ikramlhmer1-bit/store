import React, { useState } from 'react';
import { DigitalProduct } from '../types/product';
import { SoftwareBox3D } from './SoftwareBox3D';
import { ShoppingBag, Eye, Zap, Check } from 'lucide-react';

interface ProductCardProps {
  product: DigitalProduct;
  currencySymbol: string;
  currencyRate: number;
  onSelectProduct: (product: DigitalProduct) => void;
  onAddToCart: (product: DigitalProduct, e?: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currencySymbol,
  currencyRate,
  onSelectProduct,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const displayPrice = (product.price * currencyRate).toFixed(2);
  const displayOriginalPrice = (product.originalPrice * currencyRate).toFixed(2);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, e);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col justify-between cursor-pointer bg-transparent transition-all duration-200 select-none"
    >
      {/* 3D Software Box Presentation Container */}
      <div className="relative w-full aspect-[4/5] min-h-[260px] flex items-center justify-center p-4 rounded-xl transition-all duration-300">
        <SoftwareBox3D product={product} size="md" isHovered={isHovered} />

        {/* Hover Quick Action Overlay */}
        <div
          className={`absolute bottom-3 left-4 right-4 flex items-center gap-2 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="p-2 bg-white text-slate-800 rounded-lg shadow-md hover:bg-slate-100 transition-colors border border-slate-200"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtle instant delivery badge in upper right */}
        {product.instantDelivery && (
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[11px] font-medium text-slate-600 opacity-80">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Instant</span>
          </div>
        )}
      </div>

      {/* Product Details matching screenshot */}
      <div className="pt-3 px-1 flex flex-col">
        {/* Full title in clean typography */}
        <h3 className="text-sm font-medium text-slate-900 leading-snug line-clamp-2 hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>

        {/* Price row */}
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-900 font-mono tabular-nums">
            {currencySymbol}{displayPrice} USD
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-600 line-through font-mono tabular-nums">
              {currencySymbol}{displayOriginalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
