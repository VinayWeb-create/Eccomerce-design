import React, { useState } from 'react';
import { Order, CustomerProfile } from '../../types';
import {
  User as UserIcon,
  Package,
  Clock,
  CheckCircle2,
  Phone,
  MapPin,
  ShieldCheck,
  Search,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface AccountViewProps {
  orders: Order[];
  customer: CustomerProfile;
  onTrackOrder: (orderNumber: string) => void;
  onOpenVoice: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  orders,
  customer,
  onTrackOrder,
  onOpenVoice,
}) => {
  const [searchPhone, setSearchPhone] = useState(customer.phone);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'support'>('orders');

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-[#1E3A25] to-[#2E5B38] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#1E3A25] font-serif text-2xl font-bold flex items-center justify-center border-4 border-white shadow-sm">
              {customer.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold">{customer.name}</h1>
              <p className="text-xs text-[#DCD6C8] flex items-center gap-2 mt-1">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+91 {customer.phone}</span>
                <span className="mx-1">•</span>
                <span>{customer.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                Total Orders
              </span>
              <span className="font-serif text-xl font-bold">{orders.length}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                Deeptha Health Points
              </span>
              <span className="font-serif text-xl font-bold">340 pts</span>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#E8E4DA] gap-6 text-sm font-semibold text-[#5A5243]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition ${
              activeTab === 'orders'
                ? 'border-[#2E5B38] text-[#2E5B38]'
                : 'border-transparent hover:text-[#1E3A25]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History & Courier Tracking</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition ${
              activeTab === 'profile'
                ? 'border-[#2E5B38] text-[#2E5B38]'
                : 'border-transparent hover:text-[#1E3A25]'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Delivery Addresses</span>
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Lookup Phone Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8E4DA] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Search className="w-4 h-4 text-[#8C7A5B]" />
                <input
                  type="text"
                  placeholder="Lookup orders by Phone Number..."
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="bg-[#F5F2EB] border border-[#DCD6C8] rounded-xl px-3 py-1.5 text-xs text-[#1E3A25] w-full sm:w-64"
                />
              </div>

              <button
                onClick={onOpenVoice}
                className="flex items-center gap-1.5 bg-[#1E3A25] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#2E5B38] transition shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Ask AI to Track Order</span>
              </button>
            </div>

            {/* Orders Cards List */}
            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-[#E8E4DA]">
                <Package className="w-12 h-12 text-[#8C7A5B] mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#1E3A25]">No Orders Found</h3>
                <p className="text-xs text-[#736A57] mt-1">
                  You haven't placed any orders yet with phone {searchPhone}.
                </p>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white p-6 rounded-3xl border border-[#E8E4DA] shadow-xs hover:border-[#2E5B38] transition space-y-4"
                >
                  {/* Order Top Meta */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E4DA] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#1E3A25] text-base">
                          {ord.orderNumber}
                        </span>
                        <span className="bg-[#2E5B38]/10 text-[#2E5B38] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                          {ord.status}
                        </span>
                      </div>
                      <span className="text-xs text-[#8C7A5B]">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="text-right sm:text-right">
                      <span className="font-serif text-lg font-bold text-[#1E3A25] block">
                        ₹{ord.totalAmount}
                      </span>
                      <span className="text-xs text-[#2E5B38] font-medium">{ord.paymentStatus}</span>
                    </div>
                  </div>

                  {/* Purchased Items List */}
                  <div className="space-y-2">
                    {ord.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs text-[#5A5243] bg-[#FAF9F6] p-2.5 rounded-xl border border-[#E8E4DA]"
                      >
                        <div className="font-medium">
                          <strong className="text-[#1E3A25]">{item.productName}</strong> ({item.size})
                        </div>
                        <div>
                          Qty: {item.quantity} × ₹{item.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address & Courier Timeline */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 text-xs text-[#5A5243]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#2E5B38] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#1E3A25] block">Delivery Address:</strong>
                        <span>{ord.shippingAddress}</span>
                      </div>
                    </div>

                    {ord.trackingNumber && (
                      <div className="bg-[#F5F2EB] p-2.5 rounded-xl border border-[#DCD6C8] shrink-0 text-right">
                        <span className="text-[10px] text-[#8C7A5B] uppercase font-bold block">
                          Courier Partner
                        </span>
                        <span className="font-bold text-[#1E3A25]">{ord.courierPartner}</span>
                        <span className="text-[11px] text-[#2E5B38] block mt-0.5">
                          AWB: {ord.trackingNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 rounded-3xl border border-[#E8E4DA] space-y-4 max-w-2xl">
            <h3 className="font-serif text-lg font-bold text-[#1E3A25]">
              Saved Shipping Address
            </h3>
            <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#E8E4DA] text-xs text-[#5A5243] space-y-1">
              <span className="font-bold text-[#1E3A25] block">{customer.name}</span>
              <p>{customer.address}</p>
              <p>Phone: +91 {customer.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
