import React, { useState } from 'react';
import { Lock, ShieldCheck, X, KeyRound, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 2019 (Founding Year) or admin or 100731
    if (pin.trim() === '2019' || pin.trim().toLowerCase() === 'admin' || pin.trim() === '100731') {
      setError(false);
      setPin('');
      onAuthenticate();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF9F6] border border-[#E8E4DA] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-[#F5F2EB]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#1E3A25] text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
              RESTRICTED HQ PORTAL
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1E3A25] mt-1">
              Admin & CRM Portal Auth
            </h3>
            <p className="text-xs text-[#5A5243] mt-2 leading-relaxed">
              Customer CRM leads, revenue analytics, and voice AI transcripts are confidential. Please enter HQ security PIN to access.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C7A5B]" />
                <input
                  type="password"
                  placeholder="Enter Passcode (e.g., 2019)"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError(false);
                  }}
                  autoFocus
                  className="w-full bg-white border border-[#DCD6C8] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#1E3A25] focus:outline-none focus:border-[#2E5B38]"
                />
              </div>
              {error && (
                <div className="flex items-center gap-1.5 text-red-600 text-xs mt-2 justify-center">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Invalid Security PIN. Try default: <strong>2019</strong></span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="w-full bg-[#1E3A25] text-[#D4AF37] py-3 rounded-xl font-semibold text-xs hover:bg-[#2E5B38] hover:text-white transition shadow-sm"
              >
                Verify & Unlock Admin Console
              </button>

              <button
                type="button"
                onClick={() => {
                  setPin('2019');
                  setError(false);
                }}
                className="text-[11px] text-[#2E5B38] font-semibold hover:underline"
              >
                Use Demo PIN (2019)
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-[#E8E4DA] flex items-center justify-center gap-1 text-[10px] text-[#8C7A5B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E5B38]" />
            <span>Encrypted Hyderabad HQ Console</span>
          </div>
        </div>
      </div>
    </div>
  );
};
