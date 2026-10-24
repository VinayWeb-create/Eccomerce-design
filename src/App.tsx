import React, { useState } from 'react';
import { Product, CartItem, Order, CustomerProfile } from './types';
import { PRODUCTS, CATEGORIES, COMPANY_INFO } from './data/catalogue';

// Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { BrandStory } from './components/home/BrandStory';
import { CategoryGrid } from './components/home/CategoryGrid';
import { ProductCard } from './components/product/ProductCard';
import { ProductDetail } from './components/product/ProductDetail';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { AccountView } from './components/account/AccountView';
import { AIChatDrawer } from './components/ai/AIChatDrawer';
import { VoiceAgentModal } from './components/voice/VoiceAgentModal';
import { RecipesView } from './components/content/RecipesView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { LabPurityInspector } from './components/quality/LabPurityInspector';
import { OilPullingGuideModal } from './components/content/OilPullingGuideModal';
import { OilComparison } from './components/home/OilComparison';

import {
  ShieldCheck,
  Award,
  Sparkles,
  Mic,
  Star,
  CheckCircle2,
  Heart,
  Truck,
  RotateCcw,
  Search,
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals & Drawers State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isLabPurityOpen, setIsLabPurityOpen] = useState(false);
  const [isOilPullingOpen, setIsOilPullingOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'c-1',
      product: PRODUCTS[0], // Groundnut Oil
      selectedVariant: PRODUCTS[0].variants[2], // 1 Litre
      quantity: 1,
    },
    {
      id: 'c-2',
      product: PRODUCTS[10], // Avakaya Pickle
      selectedVariant: PRODUCTS[10].variants[1], // 250g
      quantity: 1,
    },
  ]);

  // Orders History State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-101',
      orderNumber: 'DN-2026-8891',
      customerName: 'Avala Vinay',
      customerPhone: '9885089899',
      customerEmail: 'vinay@example.com',
      shippingAddress: 'Plot 42, Green Avenue, Himayatnagar, Hyderabad - 500029',
      items: [
        { productName: '100% Pure Cold-Pressed Groundnut Oil', size: '1 Litre', price: 480, quantity: 2 },
        { productName: 'Traditional Avakaya Cut Mango Pickle', size: '250g Jar', price: 300, quantity: 1 },
      ],
      subtotal: 1260,
      shippingFee: 0,
      totalAmount: 1260,
      paymentMethod: 'UPI (GPay)',
      paymentStatus: 'PAID',
      status: 'DELIVERED',
      courierPartner: 'Express Courier Hyderabad',
      trackingNumber: 'HYD-EXP-9921',
      createdAt: '2026-08-10T10:30:00Z',
    },
  ]);

  // Customer Profile
  const [customer, setCustomer] = useState<CustomerProfile>({
    name: 'Avala Vinay',
    phone: '9885089899',
    email: 'vinay@example.com',
    address: 'Plot 42, Green Avenue, Himayatnagar, Hyderabad - 500029',
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Navigation Handler
  const handleNavigate = (view: string, param?: string) => {
    setActiveView(view);
    if (view === 'shop') {
      if (param) {
        if (param.includes(' ') || param.length < 3) {
          setSearchFilter(param);
          setSelectedCategorySlug(null);
        } else {
          setSelectedCategorySlug(param);
          setSearchFilter('');
        }
      } else {
        setSelectedCategorySlug(null);
        setSearchFilter('');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add To Cart Handler
  const handleAddToCart = (product: Product, variantId?: string, qty: number = 1) => {
    const targetVariant = variantId
      ? product.variants.find((v) => v.id === variantId) || product.variants[0]
      : product.variants[0];

    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id && item.selectedVariant.id === targetVariant.id
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += qty;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        product,
        selectedVariant: targetVariant,
        quantity: qty,
      };
      setCartItems([...cartItems, newItem]);
    }

    showToast(`Added ${qty}x ${product.name} (${targetVariant.size}) to cart!`);
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems(
      cartItems.map((item) => (item.id === cartItemId ? { ...item, quantity: qty } : item))
    );
  };

  // Remove Cart Item
  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(cartItems.filter((i) => i.id !== cartItemId));
  };

  // Order Success Handler
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setActiveView('account');
    showToast(`Order ${newOrder.orderNumber} confirmed!`);
  };

  // Filtered Products for Shop View
  const getFilteredProducts = () => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCategorySlug ? p.categorySlug === selectedCategorySlug : true;
      const q = searchFilter.toLowerCase();
      const matchQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.ingredients.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C261E] font-sans antialiased selection:bg-[#2E5B38] selection:text-white flex flex-col justify-between">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E3A25] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37] flex items-center gap-3 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header Navbar */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenChat={() => setIsAIChatOpen(true)}
        onNavigate={handleNavigate}
        activeView={activeView}
        isAdmin={isAdminMode}
        onToggleAdmin={() => {
          if (isAdminMode) {
            setIsAdminMode(false);
            setActiveView('home');
          } else {
            setIsAdminAuthOpen(true);
          }
        }}
        onOpenLabPurity={() => setIsLabPurityOpen(true)}
        onOpenOilPulling={() => setIsOilPullingOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* Admin Portal View */}
        {activeView === 'admin' && (
          <AdminDashboard
            onExitAdmin={() => {
              setIsAdminMode(false);
              setActiveView('home');
            }}
          />
        )}

        {/* Home Page View */}
        {activeView === 'home' && (
          <>
            <Hero
              onNavigate={handleNavigate}
              onOpenVoice={() => setIsVoiceModalOpen(true)}
            />

            <CategoryGrid
              onSelectCategory={(slug) => handleNavigate('shop', slug)}
            />

            {/* Bestsellers Showcase */}
            <section className="py-20 bg-[#FAF9F6]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                  <div>
                    <span className="text-[#2E5B38] text-xs font-bold uppercase tracking-widest block mb-2">
                      CUSTOMER FAVORITES
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A25]">
                      Best Selling Cold-Pressed Oils & Delights
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigate('shop')}
                    className="text-xs font-bold text-[#2E5B38] hover:text-[#1E3A25] mt-2 sm:mt-0"
                  >
                    View Entire Catalogue →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.slice(0, 4).map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onSelectProduct={(prod) => {
                        setSelectedProduct(prod);
                        setActiveView('product-detail');
                      }}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            </section>

            <BrandStory />

            <OilComparison />

            {/* Customer Trust Reviews */}
            <section className="py-16 bg-[#1E3A25] text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block">
                  REAL VERIFIED REVIEWS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold">
                  Loved by 25,000+ Health Conscious Families
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="bg-[#2E5B38]/60 p-6 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-[#F5F2EB]">
                      "Deeptha's cold-pressed sesame oil is pure perfection for daily oil pulling. My digestion and dental health have improved significantly."
                    </p>
                    <span className="text-[11px] font-bold text-[#D4AF37] block">
                      — Dr. Laxmi Narayana, Hyderabad
                    </span>
                  </div>

                  <div className="bg-[#2E5B38]/60 p-6 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-[#F5F2EB]">
                      "The A2 Vedic Cow Ghee has that authentic granular texture and divine aroma. Reminds me of my grandmother's village kitchen."
                    </p>
                    <span className="text-[11px] font-bold text-[#D4AF37] block">
                      — Madhavi Latha, Jubilee Hills
                    </span>
                  </div>

                  <div className="bg-[#2E5B38]/60 p-6 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed text-[#F5F2EB]">
                      "Avakaya pickle cured in cold-pressed sesame oil is spicy, rich, and feels homemade. Plus ordering through their voice assistant is super easy!"
                    </p>
                    <span className="text-[11px] font-bold text-[#D4AF37] block">
                      — Rajeshwar Rao, Secunderabad
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Shop All Products View */}
        {activeView === 'shop' && (
          <div className="py-12 bg-[#FAF9F6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div>
                <span className="text-[#2E5B38] text-xs font-bold uppercase tracking-widest block mb-1">
                  OFFICIAL CATALOGUE
                </span>
                <h1 className="font-serif text-3xl font-bold text-[#1E3A25]">
                  {selectedCategorySlug
                    ? CATEGORIES.find((c) => c.slug === selectedCategorySlug)?.name || 'Category'
                    : 'All Pure Cold-Pressed Products'}
                </h1>
                <p className="text-xs text-[#736A57] mt-1">
                  Showing {getFilteredProducts().length} unrefined items extracted using state-of-the-art German cold-press technology.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 pb-4 border-b border-[#E8E4DA]">
                <button
                  onClick={() => setSelectedCategorySlug(null)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase transition border ${
                    !selectedCategorySlug
                      ? 'bg-[#1E3A25] text-white border-[#1E3A25]'
                      : 'bg-white text-[#5A5243] border-[#E8E4DA] hover:bg-[#F5F2EB]'
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategorySlug(cat.slug)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase transition border ${
                      selectedCategorySlug === cat.slug
                        ? 'bg-[#1E3A25] text-white border-[#1E3A25]'
                        : 'bg-white text-[#5A5243] border-[#E8E4DA] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Products Cards Grid */}
              {getFilteredProducts().length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-[#E8E4DA]">
                  <p className="text-sm text-[#736A57]">
                    No items found matching "{searchFilter}". Try searching for groundnut oil, ghee, pickles, or podi.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {getFilteredProducts().map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onSelectProduct={(prod) => {
                        setSelectedProduct(prod);
                        setActiveView('product-detail');
                      }}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Single Product Details View */}
        {activeView === 'product-detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setActiveView('shop')}
            onAddToCart={handleAddToCart}
            onOpenVoice={() => setIsVoiceModalOpen(true)}
            onOpenChat={() => setIsAIChatOpen(true)}
          />
        )}

        {/* Recipes & Ayurvedic Guides View */}
        {activeView === 'recipes' && (
          <RecipesView
            onSelectCategory={(slug) => handleNavigate('shop', slug)}
          />
        )}

        {/* Brand Story View */}
        {activeView === 'story' && (
          <div className="py-12">
            <BrandStory />
          </div>
        )}

        {/* Customer Account & Order Tracking View */}
        {activeView === 'account' && (
          <AccountView
            orders={orders}
            customer={customer}
            onTrackOrder={(ordNum) => showToast(`Tracking order ${ordNum}...`)}
            onOpenVoice={() => setIsVoiceModalOpen(true)}
          />
        )}
      </main>

      {/* Drawers and Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        onOpenVoice={() => {
          setIsAIChatOpen(false);
          setIsVoiceModalOpen(true);
        }}
        onAddToCart={(prod) => handleAddToCart(prod)}
      />

      <VoiceAgentModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onNavigateToShop={() => {
          setIsVoiceModalOpen(false);
          setActiveView('shop');
        }}
      />

      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onAuthenticate={() => {
          setIsAdminAuthOpen(false);
          setIsAdminMode(true);
          setActiveView('admin');
          showToast('Authenticated as Hyderabad HQ Admin');
        }}
      />

      <LabPurityInspector
        isOpen={isLabPurityOpen}
        onClose={() => setIsLabPurityOpen(false)}
      />

      <OilPullingGuideModal
        isOpen={isOilPullingOpen}
        onClose={() => setIsOilPullingOpen(false)}
        onSelectProduct={(slug) => {
          setIsOilPullingOpen(false);
          handleNavigate('shop', slug);
        }}
      />

      {/* Main Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onOpenLabPurity={() => setIsLabPurityOpen(true)}
      />
    </div>
  );
}
