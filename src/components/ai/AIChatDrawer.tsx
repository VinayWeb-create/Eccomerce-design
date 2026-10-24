import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  ShoppingBag,
  Mic,
  ShieldCheck,
} from 'lucide-react';
import { Product } from '../../types';
import { apiClient } from '../../services/apiClient';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVoice: () => void;
  onAddToCart: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  onOpenVoice,
  onAddToCart,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Namaste! I am Deeptha AI Shopping & Health Assistant. Ask me anything about cold-pressed groundnut oil, A2 Vedic Cow ghee, oil pulling, podis, or order tracking!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await apiClient.sendAIChat(query, messages);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Namaste! Our 100% Pure Cold-Pressed Groundnut Oil (1L @ ₹480) and A2 Vedic Cow Ghee (500ml @ ₹1400) are our bestsellers. How can I assist you?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'Which oil is best for daily South Indian cooking?',
    'What is the price of A2 Vedic Cow Ghee 500ml?',
    'Tell me about Avakaya pickle ingredients',
    'How is cold-pressed oil better than refined oil?',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] border-l border-[#E8E4DA] flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-4 bg-[#1E3A25] text-white flex items-center justify-between border-b border-[#2E5B38]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#1E3A25] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold">Deeptha AI Assistant</h3>
                <p className="text-[10px] text-[#D4AF37] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> FSSAI Verified RAG Guidance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenVoice}
                className="p-1.5 rounded-full bg-[#2E5B38] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1E3A25] transition"
                title="Switch to Multilingual Voice Mode"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="p-1.5 text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#1E3A25] text-[#D4AF37] flex items-center justify-center shrink-0 mt-1 text-xs font-bold">
                    D
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#2E5B38] text-white rounded-br-none shadow-xs'
                      : 'bg-white border border-[#E8E4DA] text-[#1E3A25] rounded-bl-none shadow-xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`text-[9px] block mt-1 text-right ${
                      m.sender === 'user' ? 'text-slate-200' : 'text-[#8C7A5B]'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#8C7A5B] text-white flex items-center justify-center shrink-0 mt-1 text-xs font-bold">
                    U
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#8C7A5B] bg-white p-3 rounded-2xl border border-[#E8E4DA] max-w-[70%]">
                <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" />
                <span>Deeptha AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-3 bg-[#F5F2EB] border-t border-[#E8E4DA] overflow-x-auto flex gap-2 no-scrollbar">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap bg-white border border-[#DCD6C8] px-3 py-1.5 rounded-full text-[11px] text-[#2E5B38] hover:bg-[#2E5B38] hover:text-white transition shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-white border-t border-[#E8E4DA]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask in Telugu, English or Hindi..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[#F5F2EB] border border-[#DCD6C8] rounded-full py-2.5 px-4 text-xs text-[#1E3A25] focus:outline-none focus:border-[#2E5B38]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full bg-[#2E5B38] text-white flex items-center justify-center disabled:opacity-50 hover:bg-[#1E3A25] transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
