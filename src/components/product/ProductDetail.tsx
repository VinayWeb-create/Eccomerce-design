import React, { useState } from 'react';
import { Product, ProductVariant } from '../../types';
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Award,
  Sparkles,
  Mic,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/catalogue';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, variantId?: string, qty?: number) => void;
  onOpenVoice: () => void;
  onOpenChat: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onAddToCart,
  onOpenVoice,
  onOpenChat,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'usage' | 'reviews'>('desc');

  const activeVariant: ProductVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-[#2E5B38] hover:text-[#1E3A25] mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E4DA] shadow-sm">
          {/* Left: Product Images Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#F5F2EB] border border-[#E8E4DA] relative">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#1E3A25] text-[#F5F2EB] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.categoryName}
              </span>
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl overflow-hidden border border-[#E8E4DA] cursor-pointer hover:border-[#2E5B38] transition"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* FSSAI Trust Banner */}
            <div className="bg-[#F5F2EB] p-4 rounded-xl border border-[#DCD6C8] flex items-center justify-between text-xs text-[#5A5243]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2E5B38]" />
                <span>
                  FSSAI Certified Quality: <strong>Lic No. {product.fssaiLic}</strong>
                </span>
              </div>
              <span className="text-[#D4AF37] font-bold">100% Organic</span>
            </div>
          </div>

          {/* Right: Product Details & Variant Purchase */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-2 text-xs text-[#8C7A5B] mb-2">
                <div className="flex items-center text-[#D4AF37]">
                  <Star className="w-4 h-4 fill-[#D4AF37]" />
                  <span className="font-bold text-[#1E3A25] ml-1">{product.rating}</span>
                </div>
                <span>({product.reviewCount} Verified Customer Reviews)</span>
              </div>

              <h1 className="font-serif text-3xl font-bold text-[#1E3A25] mb-2">
                {product.name}
              </h1>

              <p className="text-sm text-[#5A5243] leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Approved Claims Pills */}
            <div className="flex flex-wrap gap-2">
              {product.approvedClaims.map((claim, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-[#F5F2EB] text-[#2E5B38] text-xs font-semibold px-3 py-1 rounded-full border border-[#DCD6C8]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E5B38]" />
                  <span>{claim}</span>
                </span>
              ))}
            </div>

            {/* Pack Size / Variant Selector */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-[#1E3A25] uppercase tracking-wider">
                Select Pack Size / Quantity:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      selectedVariantId === v.id
                        ? 'bg-[#1E3A25] text-white border-[#1E3A25] shadow-sm'
                        : 'bg-[#FAF9F6] text-[#2C261E] border-[#E8E4DA] hover:border-[#2E5B38]'
                    }`}
                  >
                    <span className="text-xs font-bold">{v.size}</span>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="font-serif text-sm font-bold">₹{v.price}</span>
                      {v.comparePrice && (
                        <span className={`text-[10px] line-through ${selectedVariantId === v.id ? 'text-slate-300' : 'text-slate-400'}`}>
                          ₹{v.comparePrice}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity Selector */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E8E4DA]">
              <div>
                <span className="text-xs text-[#736A57] block">Selected Pack Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#1E3A25]">
                    ₹{activeVariant?.price * quantity}
                  </span>
                  {activeVariant?.comparePrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ₹{activeVariant.comparePrice * quantity}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Incrementor */}
              <div className="flex items-center border border-[#DCD6C8] rounded-xl bg-[#F5F2EB] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white text-[#1E3A25] font-bold text-lg flex items-center justify-center hover:bg-[#E8E4DA]"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm text-[#1E3A25]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white text-[#1E3A25] font-bold text-lg flex items-center justify-center hover:bg-[#E8E4DA]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => onAddToCart(product, activeVariant?.id, quantity)}
                className="w-full flex items-center justify-center gap-2 bg-[#2E5B38] text-white py-3.5 rounded-full font-semibold text-sm hover:bg-[#1E3A25] transition shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantity} to Shopping Cart</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onOpenVoice}
                  className="flex items-center justify-center gap-1.5 bg-[#FAF9F6] text-[#1E3A25] border-2 border-[#2E5B38] py-2.5 rounded-full text-xs font-semibold hover:bg-[#F5F2EB] transition"
                >
                  <Mic className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Order by Voice</span>
                </button>

                <button
                  onClick={onOpenChat}
                  className="flex items-center justify-center gap-1.5 bg-[#F5F2EB] text-[#2E5B38] border border-[#DCD6C8] py-2.5 rounded-full text-xs font-semibold hover:bg-[#E8E4DA] transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#2E5B38]" />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </div>

            {/* Delivery Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E8E4DA] text-xs text-[#5A5243]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2E5B38]" />
                <span>Free Express Shipping Over ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#2E5B38]" />
                <span>100% Quality Replacement Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section (Description, Ingredients/Nutrition, Usage, Reviews) */}
        <div className="mt-12 bg-white rounded-3xl border border-[#E8E4DA] p-6 sm:p-10 shadow-sm">
          <div className="flex border-b border-[#E8E4DA] gap-8 mb-8 text-sm font-semibold text-[#5A5243]">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'desc'
                  ? 'border-[#2E5B38] text-[#2E5B38]'
                  : 'border-transparent hover:text-[#1E3A25]'
              }`}
            >
              Description & Ingredients
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'nutrition'
                  ? 'border-[#2E5B38] text-[#2E5B38]'
                  : 'border-transparent hover:text-[#1E3A25]'
              }`}
            >
              Nutritional Facts ({product.nutritionFacts.portion})
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`pb-3 border-b-2 transition ${
                activeTab === 'usage'
                  ? 'border-[#2E5B38] text-[#2E5B38]'
                  : 'border-transparent hover:text-[#1E3A25]'
              }`}
            >
              Suggested Usage & Ayurveda
            </button>
          </div>

          {/* Tab 1: Description & Ingredients */}
          {activeTab === 'desc' && (
            <div className="space-y-6 text-sm text-[#5A5243] leading-relaxed">
              <div>
                <h4 className="font-serif text-lg font-bold text-[#1E3A25] mb-2">
                  Product Description
                </h4>
                <p>{product.description}</p>
              </div>

              <div>
                <h4 className="font-serif text-lg font-bold text-[#1E3A25] mb-2">
                  100% Natural Ingredients
                </h4>
                <p className="bg-[#F5F2EB] p-4 rounded-xl border border-[#DCD6C8] text-[#1E3A25] font-medium">
                  {product.ingredients}
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Nutrition Facts */}
          {activeTab === 'nutrition' && (
            <div className="max-w-md bg-[#FAF9F6] p-6 rounded-2xl border border-[#E8E4DA]">
              <h4 className="font-serif text-xl font-bold text-[#1E3A25] mb-1">
                Nutrition Facts
              </h4>
              <p className="text-xs text-[#8C7A5B] mb-4">
                Amount {product.nutritionFacts.portion}
              </p>

              <div className="space-y-2 text-xs divide-y divide-[#E8E4DA]">
                <div className="flex justify-between py-1.5 font-bold text-sm text-[#1E3A25]">
                  <span>Calories</span>
                  <span>{product.nutritionFacts.calories}</span>
                </div>
                {product.nutritionFacts.totalFat && (
                  <div className="flex justify-between py-1.5">
                    <span>Total Fat</span>
                    <span className="font-semibold">{product.nutritionFacts.totalFat}</span>
                  </div>
                )}
                {product.nutritionFacts.saturatedFat && (
                  <div className="flex justify-between py-1.5 pl-3 text-slate-600">
                    <span>Saturated Fat</span>
                    <span>{product.nutritionFacts.saturatedFat}</span>
                  </div>
                )}
                {product.nutritionFacts.monounsaturatedFat && (
                  <div className="flex justify-between py-1.5 pl-3 text-slate-600">
                    <span>Monounsaturated Fat</span>
                    <span>{product.nutritionFacts.monounsaturatedFat}</span>
                  </div>
                )}
                {product.nutritionFacts.carbohydrates && (
                  <div className="flex justify-between py-1.5">
                    <span>Total Carbohydrates</span>
                    <span className="font-semibold">{product.nutritionFacts.carbohydrates}</span>
                  </div>
                )}
                {product.nutritionFacts.protein && (
                  <div className="flex justify-between py-1.5">
                    <span>Protein</span>
                    <span className="font-semibold">{product.nutritionFacts.protein}</span>
                  </div>
                )}
                {product.nutritionFacts.sodium && (
                  <div className="flex justify-between py-1.5">
                    <span>Sodium</span>
                    <span className="font-semibold">{product.nutritionFacts.sodium}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Usage */}
          {activeTab === 'usage' && (
            <div className="space-y-4 text-sm text-[#5A5243]">
              <h4 className="font-serif text-lg font-bold text-[#1E3A25]">
                How to Use for Optimal Health Benefits
              </h4>
              <p className="leading-relaxed">{product.usageInfo}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
