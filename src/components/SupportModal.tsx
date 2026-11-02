import React, { useState } from 'react';
import { X, HelpCircle, ShieldCheck, Zap, Mail, MessageSquare, Check } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, onOpenChat }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How do I receive my digital download and license?',
      a: 'Immediately after completing checkout (usually within 30 to 60 seconds), an automated fulfillment email is dispatched to your provided address. It contains your unique official license activation key, a direct high-speed installer download link (.exe or .dmg), and a step-by-step activation guide.'
    },
    {
      q: 'Are these lifetime licenses or recurring subscriptions?',
      a: 'All digital products sold on Soft-CAD.com are genuine lifetime licenses. You make a single one-time payment with zero monthly or annual recurring fees.'
    },
    {
      q: 'Can I install the software on both Mac and Windows?',
      a: 'Software marked for both Windows and Mac includes multi-platform activation keys. You can install on up to 2 workstations owned by the same user.'
    },
    {
      q: 'What if I need help during activation or setup?',
      a: 'Our technical team is on standby 24/7. You can use our live chat in the bottom right corner or submit a support ticket below for remote setup assistance.'
    },
    {
      q: 'What is your refund guarantee?',
      a: 'We offer a 100% 30-day money-back guarantee. If a license key does not activate on a compatible device, our team will either replace the key immediately or issue a full refund.'
    }
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setTicketSubject('');
      setTicketMsg('');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-semibold font-display">Soft-CAD.com Customer Support & Help Center</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[540px] overflow-y-auto space-y-6">
          {/* Quick Contact Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => {
                onClose();
                onOpenChat();
              }}
              className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl cursor-pointer hover:bg-indigo-100/70 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Live Chat Assistant</h4>
                <p className="text-[11px] text-slate-500">Average response time: &lt; 2 minutes</p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Activation Guarantee</h4>
                <p className="text-[11px] text-slate-500">100% genuine keys verified</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-slate-200 rounded-xl overflow-hidden text-xs"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full text-left p-3.5 bg-slate-50/70 hover:bg-slate-50 font-semibold text-slate-900 flex justify-between items-center cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 font-mono text-sm ml-2">
                      {activeFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  {activeFaq === i && (
                    <div className="p-3.5 bg-white text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Ticket Form */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-indigo-600" />
              Submit Priority License Assistance Ticket
            </h3>

            {ticketSent ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Ticket submitted! A support technician will email you within 15 minutes.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="space-y-3">
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Subject (e.g. AutoCAD 2027 installation on macOS Sonoma)"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
                <textarea
                  required
                  rows={3}
                  value={ticketMsg}
                  onChange={(e) => setTicketMsg(e.target.value)}
                  placeholder="Describe your question or order number..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Send Ticket
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
