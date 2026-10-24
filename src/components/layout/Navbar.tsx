import React, { useState } from 'react';
import {
  ShoppingBag,
  Mic,
  Search,
  User as UserIcon,
  Phone,
  Sparkles,
  Menu,
  X,
  MessageCircle,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/catalogue';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenVoice: () => void;
  onOpenChat: () => void;
  onNavigate: (view: string, param?: string) => void;
  activeView: string;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenLabPurity?: () => void;
  onOpenOilPulling?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenVoice,
  onOpenChat,
  onNavigate,
  activeView,
  isAdmin,
  onToggleAdmin,
  onOpenLabPurity,
  onOpenOilPulling,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop', searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b border-[#E8E4DA] shadow-xs">
      {/* Announcement Bar */}
      <div className="bg-[#1E3A25] text-[#F5F2EB] text-xs py-2 px-4 text-center font-medium flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>FSSAI Lic No: {COMPANY_INFO.fssaiLic}</span>
        </div>
        <p className="mx-auto sm:mx-0">
          🌿 100% Pure Cold-Pressed Oils & Organic Foods | Free Shipping Over ₹999 | Call: {COMPANY_INFO.phone}
        </p>
        <div className="hidden md:flex items-center gap-3 text-[11px] text-[#D4AF37]">
          {onOpenLabPurity && (
            <button
              onClick={onOpenLabPurity}
              className="hover:underline flex items-center gap-1 font-semibold"
            >
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
              <span>Lab Reports</span>
            </button>
          )}
          <span>•</span>
          <span>Hyderabad HQ</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-full bg-[#2E5B38] text-[#FAF9F6] flex items-center justify-center font-serif text-xl font-bold shadow-sm group-hover:bg-[#1E3A25] transition">
              D
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#1E3A25] block leading-none">
                DEEPTHA
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#8C7A5B] font-sans uppercase font-semibold block mt-0.5">
                NATURALS
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative items-center"
          >
            <input
              type="text"
              placeholder="Search cold-pressed oils, A2 ghee, pickles, podis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-full py-2 pl-4 pr-10 text-sm text-[#2C261E] focus:outline-none focus:border-[#2E5B38] placeholder-[#9C9280] transition"
            />
            <button
              type="submit"
              className="absolute right-3 text-[#2E5B38] hover:text-[#1E3A25]"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Actions & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Voice Assistant Button */}
            <button
              onClick={onOpenVoice}
              className="flex items-center gap-1.5 bg-[#2E5B38] text-[#FAF9F6] px-3.5 py-2 rounded-full text-xs font-medium hover:bg-[#1E3A25] transition shadow-xs group"
              title="Talk to AI Multilingual Voice Assistant"
            >
              <Mic className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span className="hidden sm:inline">Voice Assistant</span>
            </button>

            {/* AI Chat Button */}
            <button
              onClick={onOpenChat}
              className="hidden sm:flex items-center gap-1.5 bg-[#F5F2EB] text-[#2E5B38] border border-[#DCD6C8] px-3 py-2 rounded-full text-xs font-medium hover:bg-[#E8E4DA] transition"
              title="Ask AI Shopping Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2E5B38]" />
              <span>Ask AI</span>
            </button>

            {/* Account */}
            <button
              onClick={() => onNavigate('account')}
              className={`p-2 rounded-full border transition ${
                activeView === 'account'
                  ? 'bg-[#2E5B38] text-white border-[#2E5B38]'
                  : 'border-[#DCD6C8] text-[#2C261E] hover:bg-[#F5F2EB]'
              }`}
              title="Customer Account & Orders"
            >
              <UserIcon className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-full border border-[#DCD6C8] text-[#2C261E] hover:bg-[#F5F2EB] transition"
              title="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#1E3A25] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF9F6]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-[#2C261E]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Links Bar (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-8 py-2.5 border-t border-[#E8E4DA]/60 text-xs font-medium tracking-wide uppercase text-[#5A5243]">
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-[#2E5B38] transition ${activeView === 'home' ? 'text-[#2E5B38] font-bold border-b-2 border-[#2E5B38] pb-1' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className={`hover:text-[#2E5B38] transition ${activeView === 'shop' ? 'text-[#2E5B38] font-bold border-b-2 border-[#2E5B38] pb-1' : ''}`}
          >
            All Products
          </button>
          <button
            onClick={() => onNavigate('shop', 'cold-pressed-oils')}
            className="hover:text-[#2E5B38] transition"
          >
            Cold-Pressed Oils
          </button>
          <button
            onClick={() => onNavigate('shop', 'ghee')}
            className="hover:text-[#2E5B38] transition"
          >
            A2 Vedic Ghee
          </button>
          <button
            onClick={() => onNavigate('shop', 'pickles')}
            className="hover:text-[#2E5B38] transition"
          >
            Traditional Pickles
          </button>
          <button
            onClick={() => onNavigate('shop', 'homemade-podis')}
            className="hover:text-[#2E5B38] transition"
          >
            Homemade Podis
          </button>
          <button
            onClick={() => onNavigate('shop', 'sweets')}
            className="hover:text-[#2E5B38] transition"
          >
            Guilt-Free Sweets
          </button>
          <button
            onClick={() => onNavigate('recipes')}
            className={`hover:text-[#2E5B38] transition ${activeView === 'recipes' ? 'text-[#2E5B38] font-bold border-b-2 border-[#2E5B38] pb-1' : ''}`}
          >
            Recipes & Heritage
          </button>
          {onOpenOilPulling && (
            <button
              onClick={onOpenOilPulling}
              className="text-[#2E5B38] font-semibold hover:underline transition"
            >
              ✨ Oil Pulling Guide
            </button>
          )}
          <button
            onClick={() => onNavigate('story')}
            className={`hover:text-[#2E5B38] transition ${activeView === 'story' ? 'text-[#2E5B38] font-bold border-b-2 border-[#2E5B38] pb-1' : ''}`}
          >
            Brand Story
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-[#E8E4DA] px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search catalogue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F2EB] border border-[#DCD6C8] rounded-full py-2 pl-4 pr-10 text-sm"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-[#2E5B38]">
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col space-y-2 text-sm text-[#2C261E] font-medium">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-[#2E5B38]"
            >
              Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-[#2E5B38]"
            >
              Shop All Products
            </button>
            <button
              onClick={() => {
                onNavigate('shop', 'cold-pressed-oils');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-xs text-[#5A5243] pl-2"
            >
              • Cold-Pressed Oils
            </button>
            <button
              onClick={() => {
                onNavigate('shop', 'ghee');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-xs text-[#5A5243] pl-2"
            >
              • A2 Vedic Cow Ghee
            </button>
            <button
              onClick={() => {
                onNavigate('shop', 'pickles');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-xs text-[#5A5243] pl-2"
            >
              • Avakaya & Traditional Pickles
            </button>
            <button
              onClick={() => {
                onNavigate('shop', 'homemade-podis');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 text-xs text-[#5A5243] pl-2"
            >
              • Authentic Homemade Podis
            </button>
            <button
              onClick={() => {
                onNavigate('recipes');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-[#2E5B38]"
            >
              Recipes & Blog
            </button>
            <button
              onClick={() => {
                onNavigate('story');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1.5 hover:text-[#2E5B38]"
            >
              Savitha & Sandeep Story
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
