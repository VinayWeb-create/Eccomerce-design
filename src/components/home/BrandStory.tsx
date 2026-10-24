import React from 'react';
import { COMPANY_INFO } from '../../data/catalogue';
import { Heart, CheckCircle2, XCircle } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF9F6] border-b border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#2E5B38] text-xs font-bold uppercase tracking-widest block mb-2">
            OUR HERITAGE & VISION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A25]">
            Taking You Back to the Glorious Roots of Good Health
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Founders & Story */}
          <div className="space-y-6 text-[#5A5243] text-sm leading-relaxed">
            <div className="bg-[#F5F2EB] p-6 rounded-2xl border border-[#DCD6C8]">
              <p className="font-serif text-lg text-[#1E3A25] font-semibold italic mb-3">
                "Deeptha Oils was started in October 2019 by Savitha and Sandeep Bashetty with a vision to take people back to the glorious roots of good health amidst our fast-paced lifestyle."
              </p>
              <p className="text-xs text-[#8C7A5B] font-medium">— Savitha & Sandeep Bashetty, Founders</p>
            </div>

            <p>
              By choosing not to mass-produce, we ensure ultimate quality with our traditional yet cutting-edge cold-pressed technique. We make use of state-of-the-art German technology and organic food ingredients to create 100% pure, unrefined oils without any added color, jaggery, or water.
            </p>

            <p>
              Whether it is oil pulling with cold-pressed sesame oil, tempering hot rice with A2 Vedic Cow Ghee, or enjoying homemade Avakaya pickle cured in pure sesame oil, Deeptha Naturals delivers uncompromised purity to your home.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E4DA] shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#1E3A25] mb-6 text-center">
              The Deeptha Naturals Difference
            </h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b font-bold text-[#1E3A25]">
                <div>Deeptha Naturals Cold-Press</div>
                <div className="text-slate-500">Commercial Refined Oils</div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 border-b border-[#F5F2EB]">
                <div className="flex items-center gap-2 text-[#2E5B38] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E5B38]" />
                  <span>German Cold-Pressing at Room Temp</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>High Heat (200°C+) Destroys Nutrients</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 border-b border-[#F5F2EB]">
                <div className="flex items-center gap-2 text-[#2E5B38] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E5B38]" />
                  <span>Zero Chemicals, Solvents or Hexane</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>Bleached & Deodorized with Chemicals</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 border-b border-[#F5F2EB]">
                <div className="flex items-center gap-2 text-[#2E5B38] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E5B38]" />
                  <span>100% Natural Aroma & Vitamins Intact</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>Stripped of Natural Flavors & Antioxidants</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="flex items-center gap-2 text-[#2E5B38] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E5B38]" />
                  <span>No Added Water, Color or Jaggery</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <XCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>Adulterated with Artificial Additives</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
