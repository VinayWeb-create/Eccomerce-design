import React from 'react';
import { X, Sparkles, CheckCircle2, Heart, Shield, Droplets, Sun } from 'lucide-react';

interface OilPullingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (slug: string) => void;
}

export const OilPullingGuideModal: React.FC<OilPullingGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF9F6] border border-[#E8E4DA] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-[#F5F2EB]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E8E4DA]">
          <div className="w-12 h-12 rounded-full bg-[#1E3A25] text-[#D4AF37] flex items-center justify-center font-bold shadow-md">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] bg-[#D4AF37] text-[#1E3A25] font-bold px-2 py-0.5 rounded uppercase">
              AYURVEDIC WELLNESS RITUAL
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1E3A25] mt-0.5">
              The Ancient Art of Gandusha (Oil Pulling)
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-6 text-xs text-[#5A5243] leading-relaxed">
          <p className="text-sm">
            <strong>Gandusha (Ayurvedic Oil Pulling)</strong> is an ancient Vedic morning oral hygiene ritual mentioned in Charaka Samhita. Swishing 1 tablespoon of 100% unrefined cold-pressed sesame or coconut oil draws out toxins, strengthens gums, and clears oral microbes naturally.
          </p>

          {/* Steps */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#1E3A25] flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-[#D4AF37]" />
              <span>4 Step Daily Morning Ritual:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E8E4DA]">
                <strong className="text-[#1E3A25] block mb-1">Step 1: Morning On Empty Stomach</strong>
                Perform right after waking up, before brushing teeth or eating. Take 1 tablespoon (10–15 ml) of Deeptha Sesame or Coconut Oil.
              </div>

              <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E8E4DA]">
                <strong className="text-[#1E3A25] block mb-1">Step 2: Gentle Swishing (10–15 Mins)</strong>
                Swish the oil gently around teeth, gums, and tongue. Do not swallow. The oil will turn milky white as it binds to toxins.
              </div>

              <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E8E4DA]">
                <strong className="text-[#1E3A25] block mb-1">Step 3: Spit Out into Trash</strong>
                Spit out the milky oil into a trash bin or tissue paper (avoid clogging sinks).
              </div>

              <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E8E4DA]">
                <strong className="text-[#1E3A25] block mb-1">Step 4: Rinse with Warm Water</strong>
                Rinse your mouth thoroughly with warm water, gently brush teeth, and enjoy clean, fresh breath!
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="space-y-2">
            <h4 className="font-serif text-sm font-bold text-[#1E3A25]">
              Proven Health & Oral Benefits:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 bg-[#F5F2EB] p-2.5 rounded-xl text-[#1E3A25] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2E5B38] shrink-0" />
                <span>Eliminates Bad Breath & Plaque Microbes</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5F2EB] p-2.5 rounded-xl text-[#1E3A25] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2E5B38] shrink-0" />
                <span>Strengthens Gums & Teeth Enamel</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5F2EB] p-2.5 rounded-xl text-[#1E3A25] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2E5B38] shrink-0" />
                <span>Promotes Healthy Digestive Detox</span>
              </div>
              <div className="flex items-center gap-2 bg-[#F5F2EB] p-2.5 rounded-xl text-[#1E3A25] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#2E5B38] shrink-0" />
                <span>Soothes Dry Throat & Jaw Stiffness</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#1E3A25] text-white px-6 py-2.5 rounded-xl font-semibold text-xs hover:bg-[#2E5B38] transition"
            >
              Got it, Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
