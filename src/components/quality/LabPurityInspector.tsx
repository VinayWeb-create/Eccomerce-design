import React, { useState } from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2, Search, X, Download, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../../data/catalogue';

interface LabPurityInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LabPurityInspector: React.FC<LabPurityInspectorProps> = ({ isOpen, onClose }) => {
  const [selectedBatch, setSelectedBatch] = useState('CP-2026-92');
  const [searchBatch, setSearchBatch] = useState('');

  if (!isOpen) return null;

  const batchReports: Record<string, {
    batchNumber: string;
    productName: string;
    crushingDate: string;
    fssaiLic: string;
    parameters: { name: string; value: string; standard: string; status: 'PASS' | 'EXCELLENT' }[];
    labTechnician: string;
    location: string;
  }> = {
    'CP-2026-92': {
      batchNumber: 'CP-2026-92',
      productName: 'Cold-Pressed Sesame Oil (100% Single Pressed)',
      crushingDate: 'August 10, 2026',
      fssaiLic: COMPANY_INFO.fssaiLic,
      parameters: [
        { name: 'Cold Press Extraction Temp', value: '38.5°C (<45°C)', standard: 'Max 45°C', status: 'PASS' },
        { name: 'Hexane / Chemical Solvent Residue', value: '0.00 PPM (NOT DETECTED)', standard: 'Zero Tolerance', status: 'EXCELLENT' },
        { name: 'Free Fatty Acid (as Oleic Acid)', value: '0.28%', standard: 'Max 1.5%', status: 'PASS' },
        { name: 'Peroxide Value', value: '0.82 meq/kg', standard: 'Max 10.0 meq/kg', status: 'PASS' },
        { name: 'Heavy Metals (Lead, Arsenic, Cadmium)', value: 'ABSENT', standard: 'Not Detected', status: 'EXCELLENT' },
        { name: 'Added Artificial Colors / Flavors', value: 'NIL', standard: 'Nil', status: 'PASS' },
      ],
      labTechnician: 'Dr. V. S. Ramakrishna, Chief Quality Control Director',
      location: 'Deeptha Food Testing Lab, Domalguda, Hyderabad',
    },
    'CP-2026-88': {
      batchNumber: 'CP-2026-88',
      productName: 'Cold-Pressed Groundnut Oil (Wood Pressed)',
      crushingDate: 'August 08, 2026',
      fssaiLic: COMPANY_INFO.fssaiLic,
      parameters: [
        { name: 'Cold Press Extraction Temp', value: '36.2°C (<45°C)', standard: 'Max 45°C', status: 'PASS' },
        { name: 'Chemical Hexane Residue', value: '0.00 PPM (NOT DETECTED)', standard: 'Zero Tolerance', status: 'EXCELLENT' },
        { name: 'Iodine Value', value: '92.4', standard: '85.0 - 98.0', status: 'PASS' },
        { name: 'Acid Value', value: '0.34 mg KOH/g', standard: 'Max 1.0', status: 'PASS' },
        { name: 'Aflatoxin Screen (B1, B2, G1, G2)', value: 'NOT DETECTED', standard: 'Max 10 ppb', status: 'EXCELLENT' },
      ],
      labTechnician: 'Dr. V. S. Ramakrishna',
      location: 'Deeptha Quality Control Lab, Hyderabad',
    },
    'BG-2026-11': {
      batchNumber: 'BG-2026-11',
      productName: 'A2 Vedic Desi Cow Ghee (Bilona Churn Method)',
      crushingDate: 'August 05, 2026',
      fssaiLic: COMPANY_INFO.fssaiLic,
      parameters: [
        { name: 'A2 Beta-Casein Protein Screen', value: '100% A2 Certified (Zero A1)', standard: 'A2 Beta-Casein Only', status: 'EXCELLENT' },
        { name: 'Reichert Meissl (RM) Value', value: '29.8', standard: 'Min 28.0', status: 'PASS' },
        { name: 'Moisture Content', value: '0.18%', standard: 'Max 0.3%', status: 'PASS' },
        { name: 'Pesticide & Antibiotic Residue', value: 'NIL (NOT DETECTED)', standard: 'Nil', status: 'EXCELLENT' },
      ],
      labTechnician: 'A. Savitha Bashetty',
      location: 'Deeptha Dairy Standards Unit, Telangana',
    },
  };

  const activeReport = batchReports[selectedBatch] || batchReports['CP-2026-92'];

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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#D4AF37] text-[#1E3A25] font-bold px-2 py-0.5 rounded uppercase">
                FSSAI Lic # {COMPANY_INFO.fssaiLic}
              </span>
              <span className="text-xs text-[#2E5B38] font-bold">100% Lab Verified</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E3A25] mt-0.5">
              Deeptha Batch Purity & Quality Certificate Inspector
            </h3>
          </div>
        </div>

        {/* Batch Selector */}
        <div className="my-5 space-y-2">
          <label className="text-xs font-bold text-[#1E3A25] uppercase tracking-wider block">
            Select Active Crushing Batch Report:
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(batchReports).map((bCode) => (
              <button
                key={bCode}
                onClick={() => setSelectedBatch(bCode)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                  selectedBatch === bCode
                    ? 'bg-[#1E3A25] text-white border-[#1E3A25]'
                    : 'bg-white text-[#5A5243] border-[#E8E4DA] hover:bg-[#F5F2EB]'
                }`}
              >
                Batch #{bCode}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-white rounded-2xl border-2 border-[#1E3A25]/20 p-5 space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
            <Award className="w-48 h-48 text-[#1E3A25]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8E4DA] pb-3 gap-2">
            <div>
              <h4 className="font-serif text-base font-bold text-[#1E3A25]">
                {activeReport.productName}
              </h4>
              <p className="text-xs text-[#8C7A5B]">
                Milling Date: <strong>{activeReport.crushingDate}</strong> | Location: {activeReport.location}
              </p>
            </div>
            <span className="bg-[#2E5B38] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">
              ✓ PASSED ALL TESTS
            </span>
          </div>

          {/* Parameters Table */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#1E3A25] uppercase tracking-wider block">
              Chemical & Purity Test Parameters:
            </span>
            <div className="space-y-2">
              {activeReport.parameters.map((param, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] p-2.5 rounded-xl border border-[#E8E4DA] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#1E3A25] block">{param.name}</span>
                    <span className="text-[10px] text-[#8C7A5B]">FSSAI Limit: {param.standard}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-[#2E5B38]">{param.value}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold block mt-0.5">
                      {param.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E8E4DA] pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5A5243]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2E5B38]" />
              <span>Certified by: <strong>{activeReport.labTechnician}</strong></span>
            </div>

            <button
              onClick={() => alert(`Downloading official PDF lab report for Batch #${selectedBatch}`)}
              className="bg-[#F5F2EB] text-[#1E3A25] border border-[#DCD6C8] px-3.5 py-1.5 rounded-xl font-semibold hover:bg-[#2E5B38] hover:text-white transition flex items-center gap-1.5 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Lab PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
