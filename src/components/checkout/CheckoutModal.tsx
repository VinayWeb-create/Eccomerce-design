import React, { useState } from 'react';
import { CartItem } from '../../types';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  Phone,
  MessageCircle,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderData: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: 'Avala Vinay',
    phone: '9885089899',
    email: 'vinay@example.com',
    address: 'Plot 42, Green Avenue, Himayatnagar',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500029',
    paymentMethod: 'UPI',
    whatsappUpdates: true,
  });

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 999 ? 0 : 70;
  const total = subtotal + shippingFee;

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const newOrder = {
      orderNumber: `DN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      items: items.map((i) => ({
        productName: i.product.name,
        size: i.selectedVariant.size,
        price: i.selectedVariant.price,
        quantity: i.quantity,
      })),
      subtotal,
      shippingFee,
      totalAmount: total,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'COD' ? 'Pending COD' : 'PAID (Razorpay)',
      orderStatus: 'Processing',
      createdAt: new Date().toISOString(),
    };

    setStep('success');
    setTimeout(() => {
      onOrderSuccess(newOrder);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF9F6] border border-[#E8E4DA] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1E3A25] text-[#D4AF37] flex items-center justify-center font-serif text-sm font-bold">
              D
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1E3A25]">
                Deeptha Naturals Checkout
              </h3>
              <p className="text-[11px] text-[#8C7A5B]">Safe 256-Bit SSL Encrypted Order</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-[#F5F2EB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {step === 'success' ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2E5B38] text-[#FAF9F6] flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#1E3A25]">
              Order Placed Successfully!
            </h2>
            <p className="text-xs text-[#5A5243] max-w-md mx-auto">
              Thank you for choosing Deeptha Naturals! We have received your order. Order tracking updates will be sent to <strong>{formData.phone}</strong> via WhatsApp.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Step 1: Customer & Delivery Details */}
            {step === 'details' && (
              <form onSubmit={handleSubmitDetails} className="space-y-4 text-xs">
                <h4 className="font-serif text-sm font-bold text-[#1E3A25] uppercase tracking-wider">
                  1. Delivery Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#5A5243] font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-xl p-2.5 text-xs text-[#1E3A25]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A5243] font-semibold mb-1">Phone Number (10 Digits)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-xl p-2.5 text-xs text-[#1E3A25]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#5A5243] font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-xl p-2.5 text-xs text-[#1E3A25]"
                  />
                </div>

                <div>
                  <label className="block text-[#5A5243] font-semibold mb-1">Flat / House No. / Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-xl p-2.5 text-xs text-[#1E3A25]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#5A5243] font-semibold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-xl p-2.5 text-xs text-[#1E3A25]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A5243] font-semibold mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-xl p-2.5 text-xs text-[#1E3A25]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5A5243] font-semibold mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-xl p-2.5 text-xs text-[#1E3A25]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="waCheck"
                    checked={formData.whatsappUpdates}
                    onChange={(e) => setFormData({ ...formData, whatsappUpdates: e.target.checked })}
                    className="rounded accent-[#2E5B38]"
                  />
                  <label htmlFor="waCheck" className="text-xs text-[#5A5243] flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    Send order updates & tracking on WhatsApp
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2E5B38] text-white py-3.5 rounded-full font-semibold text-xs hover:bg-[#1E3A25] transition mt-4"
                >
                  Continue to Payment Options (₹{total})
                </button>
              </form>
            )}

            {/* Step 2: Payment Option Selection */}
            {step === 'payment' && (
              <div className="space-y-4 text-xs">
                <h4 className="font-serif text-sm font-bold text-[#1E3A25] uppercase tracking-wider">
                  2. Select Payment Method
                </h4>

                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-[#DCD6C8] bg-white cursor-pointer hover:border-[#2E5B38]">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay"
                        value="UPI"
                        checked={formData.paymentMethod === 'UPI'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="accent-[#2E5B38]"
                      />
                      <div>
                        <span className="font-bold text-[#1E3A25] block">Instant UPI (GPay / PhonePe / Paytm / BHIM)</span>
                        <span className="text-[11px] text-[#8C7A5B]">Fastest delivery processing via Razorpay</span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-[#2E5B38]" />
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-[#DCD6C8] bg-white cursor-pointer hover:border-[#2E5B38]">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay"
                        value="CARD"
                        checked={formData.paymentMethod === 'CARD'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="accent-[#2E5B38]"
                      />
                      <div>
                        <span className="font-bold text-[#1E3A25] block">Credit / Debit Card or Netbanking</span>
                        <span className="text-[11px] text-[#8C7A5B]">All major Indian banks supported</span>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-3.5 rounded-2xl border border-[#DCD6C8] bg-white cursor-pointer hover:border-[#2E5B38]">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pay"
                        value="COD"
                        checked={formData.paymentMethod === 'COD'}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="accent-[#2E5B38]"
                      />
                      <div>
                        <span className="font-bold text-[#1E3A25] block">Cash on Delivery (COD)</span>
                        <span className="text-[11px] text-[#8C7A5B]">Pay in cash to courier agent at doorstep</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Summary Box */}
                <div className="bg-[#F5F2EB] p-4 rounded-2xl border border-[#DCD6C8] space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Delivery:</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between font-serif font-bold text-[#1E3A25] text-sm pt-2 border-t border-[#DCD6C8]">
                    <span>Total Amount:</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep('details')}
                    className="w-1/3 bg-[#F5F2EB] text-[#1E3A25] py-3 rounded-full font-semibold border border-[#DCD6C8]"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-2/3 bg-[#2E5B38] text-white py-3 rounded-full font-semibold hover:bg-[#1E3A25] transition shadow-md flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Pay ₹{total} & Confirm Order</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
