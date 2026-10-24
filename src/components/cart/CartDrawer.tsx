import React, { useState } from 'react';
import { CartItem } from '../../types';
import {
  X,
  ShoppingBag,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, qty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  );

  const freeShippingThreshold = 999;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 70;
  const total = Math.max(0, subtotal - appliedDiscount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
      setDiscountMessage('WELCOME10 applied! 10% discount subtracted.');
    } else if (code === 'DEEPTHA100') {
      setAppliedDiscount(100);
      setDiscountMessage('DEEPTHA100 applied! ₹100 discount subtracted.');
    } else {
      setDiscountMessage('Invalid promo code. Try WELCOME10 or DEEPTHA100.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#E8E4DA] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#E8E4DA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2E5B38]" />
              <h2 className="font-serif text-lg font-bold text-[#1E3A25]">
                Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-[#F5F2EB]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {subtotal > 0 && (
            <div className="bg-[#1E3A25] text-white p-3 px-6 text-xs text-center font-medium">
              {amountForFreeShipping > 0 ? (
                <p>
                  Add <strong className="text-[#D4AF37]">₹{amountForFreeShipping}</strong> more for FREE Express Shipping!
                </p>
              ) : (
                <p className="text-[#D4AF37] font-semibold flex items-center justify-center gap-1">
                  <Truck className="w-4 h-4" /> You qualified for FREE Express Shipping!
                </p>
              )}
              <div className="w-full bg-[#2E5B38] h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#D4AF37] h-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5F2EB] text-[#2E5B38] flex items-center justify-center mx-auto text-2xl font-serif">
                  D
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1E3A25]">Your cart is empty</h3>
                <p className="text-xs text-[#736A57]">
                  Discover 100% pure cold-pressed oils, Vedic A2 ghee, and traditional Avakaya pickles.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#2E5B38] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#1E3A25] transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-[#E8E4DA] flex gap-4 items-center"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl bg-[#F5F2EB]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-[#1E3A25] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[11px] text-[#8C7A5B] block font-medium">
                      Pack: {item.selectedVariant.size}
                    </span>
                    <span className="font-serif text-sm font-bold text-[#1E3A25] mt-1 block">
                      ₹{item.selectedVariant.price * item.quantity}
                    </span>
                  </div>

                  {/* Quantity Controls & Delete */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-[#DCD6C8] rounded-lg bg-[#F5F2EB]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#1E3A25]"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#1E3A25]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="bg-white p-6 border-t border-[#E8E4DA] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8C7A5B]" />
                  <input
                    type="text"
                    placeholder="Coupon Code (e.g. WELCOME10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-xl py-2 pl-9 pr-3 text-xs text-[#1E3A25]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#1E3A25] text-white px-4 rounded-xl text-xs font-semibold hover:bg-[#2E5B38] transition"
                >
                  Apply
                </button>
              </form>
              {discountMessage && (
                <p className="text-[11px] text-[#2E5B38] font-medium">{discountMessage}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5A5243] border-t border-[#E8E4DA] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#2E5B38] font-semibold">
                    <span>Discount:</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-[#1E3A25] pt-2 border-t border-[#E8E4DA]">
                  <span>Total Payable:</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full bg-[#2E5B38] text-white py-3.5 rounded-full font-semibold text-sm hover:bg-[#1E3A25] transition flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
