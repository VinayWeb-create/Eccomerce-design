import React from 'react';
import { X, Check, Flame, ShieldAlert, Sparkles, Heart } from 'lucide-react';

export const OilComparison: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5F2EB] border-y border-[#E8E4DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[#2E5B38] text-xs font-bold uppercase tracking-widest block">
            THE TRUTH BEHIND YOUR COOKING OIL
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E3A25]">
            Commercial Refined Oil vs. Deeptha 100% Cold-Pressed Oil
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5243] leading-relaxed">
            Standard refined oils undergo extreme high-temperature heating and chemical solvent bleaching that strip away essential antioxidants. Here is why Deeptha's slow German cold-press technology protects your family's health.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Commercial Refined Oil (Bad) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-xs space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-red-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest bg-red-100 px-2.5 py-1 rounded">
                  COMMERCIAL REFINED OIL
                </span>
                <h3 className="font-serif text-xl font-bold text-slate-800 mt-2">
                  Chemical & High-Heat Processed
                </h3>
              </div>
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>

            <ul className="space-y-4 text-xs text-slate-700">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-semibold">Extreme Heat Crushing (200°C+)</strong>
                  High friction temperatures damage delicate omega fatty acids and produce harmful free radicals.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-semibold">Hexane Solvent Extraction</strong>
                  Uses petroleum-derived chemical solvents like Hexane to extract maximum oil from seeds.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-semibold">Bleached & Deodorized</strong>
                  Chemical bleaching earth and phosphoric acid remove natural colors, aromas, and vital Vitamin E.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <X className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-semibold">Synthetic Preservatives Added</strong>
                  TBHQ and BHA synthetic anti-foaming agents added to prolong shelf life indefinitely.
                </div>
              </li>
            </ul>
          </div>

          {/* Deeptha Cold Pressed Oil (Good) */}
          <div className="bg-[#1E3A25] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#2E5B38] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#1E3A25] uppercase tracking-widest bg-[#D4AF37] px-2.5 py-1 rounded">
                  DEEPTHA NATURALS
                </span>
                <h3 className="font-serif text-xl font-bold text-white mt-2">
                  100% Single Cold-Pressed Unrefined
                </h3>
              </div>
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <ul className="space-y-4 text-xs text-[#F5F2EB]">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#1E3A25] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-[#D4AF37] font-semibold">Low-Temperature German Milling (&lt;45°C)</strong>
                  Slow mechanical crushing retains natural antioxidants, Vitamin E, phytosterols, and natural aroma.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#1E3A25] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-[#D4AF37] font-semibold">Zero Chemicals or Hexane Solvents</strong>
                  100% mechanical seed pressing with zero added water, jaggery, or chemical refining agents.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#1E3A25] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-[#D4AF37] font-semibold">Naturally Nutrient Dense</strong>
                  Zero cholesterol, trans-fat free, and rich in natural healthy monounsaturated fatty acids (MUFA/PUFA).
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#1E3A25] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="block text-[#D4AF37] font-semibold">FSSAI Certified & Batch Tested</strong>
                  Every single batch tested for peroxide value, moisture, and 0.00 PPM chemical purity.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
