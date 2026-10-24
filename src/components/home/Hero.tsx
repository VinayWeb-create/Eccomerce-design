import React from 'react';
import { ShieldCheck, Sparkles, Mic, ArrowRight, Award, Zap, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenVoice: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenVoice }) => {
  return (
    <section className="relative bg-gradient-to-b from-[#FAF9F6] via-[#F5F2EB] to-[#FAF9F6] py-16 sm:py-24 border-b border-[#E8E4DA] overflow-hidden">
      {/* Decorative organic background element */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#2E5B38]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#1E3A25] text-[#F5F2EB] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-xs">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>State-of-the-Art German Cold-Pressing Tech</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A25] leading-tight">
              100% Pure Cold-Pressed Oils & Guilt-Free Products.
            </h1>

            <p className="text-base sm:text-lg text-[#5A5243] max-w-2xl leading-relaxed">
              Extracted slowly at room temperature from organic seeds without added heat, chemicals, jaggery, or water. Preserving full vitamins, natural aroma, and medicinal benefits for your family.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('shop', 'cold-pressed-oils')}
                className="flex items-center gap-2 bg-[#2E5B38] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#1E3A25] transition shadow-md group"
              >
                <span>Shop Cold-Pressed Oils</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenVoice}
                className="flex items-center gap-2 bg-[#FAF9F6] text-[#1E3A25] border-2 border-[#2E5B38] px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-[#F5F2EB] transition shadow-xs"
              >
                <Mic className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                <span>Order via Voice Assistant</span>
              </button>
            </div>

            {/* Key Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#DCD6C8]/80 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2E5B38] shrink-0" />
                <div>
                  <span className="font-bold text-[#1E3A25] block">100% Pure</span>
                  <span className="text-[#736A57]">No chemical refining</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#2E5B38] shrink-0" />
                <div>
                  <span className="font-bold text-[#1E3A25] block">German Tech</span>
                  <span className="text-[#736A57]">Slow crushing process</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#2E5B38] shrink-0" />
                <div>
                  <span className="font-bold text-[#1E3A25] block">Bilona Ghee</span>
                  <span className="text-[#736A57]">Grass-fed A2 cows</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#2E5B38] shrink-0" />
                <div>
                  <span className="font-bold text-[#1E3A25] block">FSSAI Certified</span>
                  <span className="text-[#736A57]">Lic: 13622011000731</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Imagery Banner Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white relative">
                <img
                  src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=1000"
                  alt="Deeptha Naturals Cold Pressed Oils"
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-[#D4AF37] text-[#1E3A25] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    BEST SELLER
                  </span>
                  <h3 className="font-serif text-2xl font-bold">Cold-Pressed Groundnut & Sesame Oils</h3>
                  <p className="text-xs text-slate-200 mt-1">Starting from ₹130 | Pure, Unrefined & Chemical-Free</p>
                </div>
              </div>

              {/* Floating Badge Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#E8E4DA] hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1E3A25] text-[#D4AF37] flex items-center justify-center font-serif text-xl font-bold">
                  A2
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#1E3A25] text-sm">Vedic Cow Ghee</h4>
                  <p className="text-xs text-[#736A57]">500ml @ ₹1,400 | Bilona Method</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
