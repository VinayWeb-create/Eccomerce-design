import React, { useState } from 'react';
import { Product } from '../../types';
import { Star, ShoppingBag, Eye, ShieldCheck, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, variantId?: string, qty?: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || ''
  );
  const [isWishlisted, setIsWishlisted] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  return (
    <div className="bg-[#FAF9F6] border border-[#E8E4DA] rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition duration-300 group relative">
      {/* Top Badges & Wishlist */}
      <div className="flex items-center justify-between mb-3 z-10">
        <span className="bg-[#1E3A25] text-[#F5F2EB] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {product.categoryName}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-red-500 transition shadow-xs"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </button>
      </div>

      {/* Product Image */}
      <div
        onClick={() => onSelectProduct(product)}
        className="aspect-square rounded-xl overflow-hidden mb-4 cursor-pointer bg-[#F5F2EB] relative"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        {product.isBestSeller && (
          <span className="absolute bottom-2 left-2 bg-[#D4AF37] text-[#1E3A25] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">
            Best Seller
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5 text-xs text-[#8C7A5B]">
            <div className="flex items-center text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span className="font-bold text-[#1E3A25] ml-1">{product.rating}</span>
            </div>
            <span>({product.reviewCount} reviews)</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-base font-bold text-[#1E3A25] hover:text-[#2E5B38] transition cursor-pointer line-clamp-2 leading-snug mb-1.5"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#736A57] line-clamp-2 mb-3">
            {product.shortDescription}
          </p>
        </div>

        <div>
          {/* Variant Size Selector Pills */}
          {product.variants.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariantId(v.id);
                  }}
                  className={`text-[11px] px-2 py-0.5 rounded border font-medium transition ${
                    selectedVariantId === v.id
                      ? 'bg-[#2E5B38] text-white border-[#2E5B38]'
                      : 'bg-[#F5F2EB] text-[#5A5243] border-[#DCD6C8] hover:bg-[#E8E4DA]'
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-serif text-lg font-bold text-[#1E3A25]">
              ₹{activeVariant?.price}
            </span>
            {activeVariant?.comparePrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{activeVariant.comparePrice}
              </span>
            )}
            <span className="text-[10px] text-[#2E5B38] font-semibold ml-auto">
              {activeVariant?.size}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProduct(product)}
              className="flex items-center justify-center gap-1 bg-[#F5F2EB] text-[#1E3A25] border border-[#DCD6C8] py-2 rounded-lg text-xs font-semibold hover:bg-[#E8E4DA] transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <button
              onClick={() => onAddToCart(product, activeVariant?.id, 1)}
              className="flex items-center justify-center gap-1 bg-[#2E5B38] text-white py-2 rounded-lg text-xs font-semibold hover:bg-[#1E3A25] transition shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
