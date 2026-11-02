import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, CheckCircle2, Sparkles } from 'lucide-react';

interface LiveChatWidgetProps {
  onOpenAddProduct: () => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ onOpenAddProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Hello! Welcome to Soft-CAD.com. Looking for a genuine CAD or 3D software license, or need help adding a digital product to the catalog?',
      time: 'Just now'
    }
  ]);

  const quickPrompts = [
    'How do I add a digital product?',
    'How fast is instant delivery?',
    'Are these lifetime licenses?',
    'What payment methods are accepted?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMessage = {
      sender: 'user' as const,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');

    // Automated smart assistant response
    setTimeout(() => {
      let botReply = "Thank you for reaching out! Our team is available 24/7 to guarantee smooth activation and installation.";
      const lower = text.toLowerCase();

      if (lower.includes('add') || lower.includes('product') || lower.includes('sell') || lower.includes('upload')) {
        botReply = "To add a new digital product, simply click the '+ Add Product' button in the top navigation bar or the button in the hero banner. You can customize the 3D software box, set the price, and configure your instant download link!";
      } else if (lower.includes('delivery') || lower.includes('fast') || lower.includes('instant')) {
        botReply = "All orders are fulfilled instantly via our automated CDN. Your genuine license key and direct download link are delivered in under 60 seconds directly to your checkout email.";
      } else if (lower.includes('lifetime') || lower.includes('subscription') || lower.includes('renew')) {
        botReply = "Yes! All software listed on Soft-CAD.com is 100% genuine lifetime licensing. You make a single one-time payment with zero recurring monthly or annual fees.";
      } else if (lower.includes('payment') || lower.includes('card') || lower.includes('apple')) {
        botReply = "We accept all major credit/debit cards (Visa, MasterCard, Amex), Apple Pay, Google Pay, PayPal, and cryptocurrency with 256-bit encryption.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col mb-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">Soft-CAD.com Support & Assistant</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online · Instant reply</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="p-3.5 space-y-3 h-72 overflow-y-auto text-xs bg-slate-50/60">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-2xs rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded-full text-[10px] text-slate-600 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask anything or request product..."
              className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Pill Chat Button exactly matching screenshot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-[#262626] hover:bg-black text-white text-xs font-semibold rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer border border-white/10"
        title="Live Chat Support"
      >
        <MessageSquare className="w-4 h-4 fill-white/15" />
        <span>Chat</span>
      </button>
    </div>
  );
};
