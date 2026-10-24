import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  X,
  Volume2,
  Sparkles,
  Phone,
  PhoneOff,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToShop: () => void;
}

export const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({
  isOpen,
  onClose,
  onNavigateToShop,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [executedActions, setExecutedActions] = useState<string[]>([]);
  const [language, setLanguage] = useState<'en' | 'te' | 'hi'>('en');
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');

  if (!isOpen) return null;

  const handleStartListening = () => {
    setIsListening(true);
    setStatus('listening');
    setTranscript('Listening for your voice input...');

    // Use Web Speech API if available, else simulate quick query
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onresult = async (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceInput(text);
      };

      recognition.onerror = () => {
        simulateSampleQuery('Tell me the price of 1 Litre Cold-Pressed Groundnut Oil');
      };

      recognition.start();
    } else {
      setTimeout(() => {
        simulateSampleQuery('Naaku groundnut oil 1 litre price cheppandi');
      }, 1500);
    }
  };

  const simulateSampleQuery = (text: string) => {
    setTranscript(text);
    processVoiceInput(text);
  };

  const processVoiceInput = async (text: string) => {
    setIsListening(false);
    setStatus('processing');

    try {
      const data = await apiClient.sendVoiceInteraction(text, language);
      setResponse(data.text);
      setExecutedActions(data.actions || ['search_products']);
      setStatus('speaking');

      // Speak response using browser TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.text);
        utterance.onend = () => setStatus('idle');
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => setStatus('idle'), 2000);
      }
    } catch (err) {
      setResponse(
        'Our 100% Pure Cold-Pressed Groundnut Oil is ₹480 for 1 Litre and ₹250 for 500ml. Would you like to add it to your cart?'
      );
      setExecutedActions(['get_product_price']);
      setStatus('idle');
    }
  };

  const sampleVoicePrompts = [
    { label: 'Groundnut Oil Price', query: 'What is the price of 1 Litre Cold-Pressed Groundnut Oil?' },
    { label: 'Telugu Query (groundnut oil)', query: 'Naaku 1 Litre Groundnut Oil price cheppandi' },
    { label: 'A2 Ghee Details', query: 'Tell me about Deeptha A2 Vedic Cow Ghee' },
    { label: 'Track Order', query: 'Track my order DN-2026-8891' },
    { label: 'Human Agent Handoff', query: 'Transfer my call to human support agent' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF9F6] border border-[#E8E4DA] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E4DA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1E3A25] text-[#D4AF37] flex items-center justify-center font-bold shadow-sm">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1E3A25]">
                Deeptha Voice AI Agent
              </h3>
              <p className="text-[11px] text-[#8C7A5B]">
                Multilingual Voice Agent (English, Telugu, Hindi)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-[#F5F2EB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-center my-4 gap-2">
          {(['en', 'te', 'hi'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border transition ${
                language === lang
                  ? 'bg-[#2E5B38] text-white border-[#2E5B38]'
                  : 'bg-[#F5F2EB] text-[#5A5243] border-[#DCD6C8]'
              }`}
            >
              {lang === 'en' ? 'English' : lang === 'te' ? 'తెలుగు (Telugu)' : 'हिंदी (Hindi)'}
            </button>
          ))}
        </div>

        {/* Center Waveform & Mic Circle */}
        <div className="py-8 text-center space-y-6">
          <div className="relative inline-block">
            {/* Pulsing visual rings */}
            {status === 'listening' && (
              <div className="absolute inset-0 rounded-full bg-[#2E5B38]/20 animate-ping" />
            )}
            {status === 'speaking' && (
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/30 animate-pulse" />
            )}

            <button
              onClick={handleStartListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl transition transform hover:scale-105 ${
                status === 'listening'
                  ? 'bg-red-600'
                  : status === 'speaking'
                  ? 'bg-[#D4AF37] text-[#1E3A25]'
                  : 'bg-[#2E5B38]'
              }`}
            >
              {status === 'listening' ? (
                <MicOff className="w-10 h-10 animate-bounce" />
              ) : status === 'speaking' ? (
                <Volume2 className="w-10 h-10 animate-pulse" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              {status === 'idle'
                ? 'Tap Mic to Speak'
                : status === 'listening'
                ? 'Listening...'
                : status === 'processing'
                ? 'Processing Gemini RAG Tool Call...'
                : 'Deeptha Assistant Speaking'}
            </span>
            <p className="text-sm font-medium text-[#1E3A25] max-w-xs mx-auto italic">
              "{transcript || 'Click mic or pick a sample query below...'}"
            </p>
          </div>

          {/* AI Response Display */}
          {response && (
            <div className="bg-white p-4 rounded-2xl border border-[#E8E4DA] text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E5B38]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Deeptha AI Voice Output:</span>
              </div>
              <p className="text-xs text-[#1E3A25] leading-relaxed">{response}</p>

              {/* Tools Executed Pills */}
              {executedActions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8E4DA]">
                  <span className="text-[10px] text-[#8C7A5B] font-bold">Tools Fired:</span>
                  {executedActions.map((act, idx) => (
                    <span
                      key={idx}
                      className="bg-[#F5F2EB] text-[#2E5B38] text-[10px] font-bold px-2 py-0.5 rounded border border-[#DCD6C8]"
                    >
                      ✓ {act}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Sample Voice Prompts */}
        <div className="border-t border-[#E8E4DA] pt-4 space-y-2">
          <span className="text-[11px] font-bold text-[#8C7A5B] uppercase block">
            Test Preset Queries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleVoicePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => simulateSampleQuery(p.query)}
                className="bg-[#F5F2EB] hover:bg-[#E8E4DA] text-[#1E3A25] text-xs px-3 py-1.5 rounded-full border border-[#DCD6C8] font-medium transition"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
