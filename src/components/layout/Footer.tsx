import React from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Heart,
  ExternalLink,
  MessageCircle,
  Lock,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/catalogue';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenAdminAuth?: () => void;
  onOpenLabPurity?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminAuth, onOpenLabPurity }) => {
  return (
    <footer className="bg-[#1E3A25] text-[#FAF6F0] pt-16 pb-10 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2E5B38]">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1E3A25] flex items-center justify-center font-serif text-xl font-bold">
                D
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-white block leading-none">
                  DEEPTHA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] font-sans uppercase font-semibold block mt-0.5">
                  NATURALS
                </span>
              </div>
            </div>
            <p className="text-xs text-[#DCD6C8] leading-relaxed">
              Started in Oct 2019 by Savitha and Sandeep Bashetty with a vision to take people back to the glorious roots of good health using 100% pure cold-pressed extraction and traditional methods.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4" />
              <span>FSSAI Lic No: {COMPANY_INFO.fssaiLic}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#D4AF37] mb-4">Shop Collections</h4>
            <ul className="space-y-2.5 text-xs text-[#DCD6C8]">
              <li>
                <button onClick={() => onNavigate('shop', 'cold-pressed-oils')} className="hover:text-white transition">
                  Cold-Pressed Sesame, Groundnut, Coconut Oils
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'ghee')} className="hover:text-white transition">
                  A2 Vedic Desi Cow Ghee (Bilona Churned)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'pickles')} className="hover:text-white transition">
                  Avakaya & Cut Mango Pickles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'homemade-podis')} className="hover:text-white transition">
                  Karivepaku, Palli & Kakarakaya Podis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'sweets')} className="hover:text-white transition">
                  Sugar-Free Dry Fruit & Anjeer Delights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'honey')} className="hover:text-white transition">
                  Raw Forest Organic Honey
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Customer Care */}
          <div>
            <h4 className="font-serif text-base font-bold text-[#D4AF37] mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-[#DCD6C8]">
              <li>
                <button onClick={() => onNavigate('account')} className="hover:text-white transition">
                  My Orders & Order Tracking
                </button>
              </li>
              {onOpenLabPurity && (
                <li>
                  <button onClick={onOpenLabPurity} className="text-[#D4AF37] font-bold hover:underline transition">
                    ✓ Inspect Batch Lab Test Certificates
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onNavigate('recipes')} className="hover:text-white transition">
                  Oil Pulling & Ayurvedic Health Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-white transition">
                  German Technology Cold-Press Process
                </button>
              </li>
              <li>
                <a href="#shipping-policy" className="hover:text-white transition">
                  Shipping & Free Delivery Policy
                </a>
              </li>
              <li>
                <a href="#refund-policy" className="hover:text-white transition">
                  Return & Refund Guarantee
                </a>
              </li>
              <li>
                <a href="#privacy-policy" className="hover:text-white transition">
                  Privacy Policy & Data Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3.5 text-xs text-[#DCD6C8]">
            <h4 className="font-serif text-base font-bold text-[#D4AF37] mb-4">Contact Us</h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{COMPANY_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-3.5 py-2 rounded-lg text-xs font-semibold hover:bg-[#20ba59] transition mt-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89E8C]">
          <p>© {new Date().getFullYear()} Deeptha Naturals. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span>for healthy living & traditional roots.</span>
            </div>
            {onOpenAdminAuth && (
              <button
                onClick={onOpenAdminAuth}
                className="text-[11px] text-[#A89E8C] hover:text-[#D4AF37] flex items-center gap-1 transition opacity-60 hover:opacity-100"
                title="Restricted Staff & Admin Portal"
              >
                <Lock className="w-3 h-3" />
                <span>HQ Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
