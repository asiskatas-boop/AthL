import React, { useState } from 'react';
import { X, Mail, Copy, Check, Send, Sparkles } from 'lucide-react';
import { CURATOR_INFO } from '../data/portfolioData';

interface CuratorialInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CuratorialInquiryModal: React.FC<CuratorialInquiryModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [subjectType, setSubjectType] = useState('Exhibition Curation & Commission');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CURATOR_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate pre-populated mailto
    const subject = encodeURIComponent(`[${subjectType}] Curatorial Inquiry from ${senderName || 'Institutional Colleague'}`);
    const body = encodeURIComponent(
      `Name: ${senderName}\nInstitution / Gallery: ${institution}\nEmail: ${senderEmail}\n\nProject Scope & Message:\n${message}`
    );
    window.location.href = `mailto:${CURATOR_INFO.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#1C1917]/20 shadow-2xl p-6 sm:p-10 my-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1C1917]/10 text-xs font-mono uppercase text-[#78716C]">
          <span>CURATORIAL CORRESPONDENCE · ATHENS</span>
          <button
            onClick={onClose}
            className="p-1 text-[#1C1917] hover:bg-[#1C1917]/10 cursor-pointer"
            aria-label="Close inquiry window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6">
          <div>
            <div className="text-xs uppercase tracking-wider font-sans text-[#78350F] font-semibold mb-1">
              Direct Contact & Proposals
            </div>
            <h2 id="inquiry-title" className="text-3xl font-serif font-medium text-[#1C1917]">
              Curatorial & Research Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] font-sans mt-2">
              For exhibition commissions, archival research consultancies, monograph catalog texts, or institutional lectures.
            </p>
          </div>

          {/* Quick Direct Email Pill-free Strip */}
          <div className="p-4 bg-[#F4EFE6] border border-[#1C1917]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#78716C]">
                Official Inquiries Mailbox
              </div>
              <div className="text-sm font-mono font-medium text-[#1C1917] select-all">
                {CURATOR_INFO.email}
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#1C1917]/20 hover:border-[#1C1917] text-[#1C1917] transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Address' : 'Copy Email Address'}</span>
            </button>
          </div>

          {/* Inquiry Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#78716C] mb-1">
                Inquiry Focus
              </label>
              <select
                value={subjectType}
                onChange={(e) => setSubjectType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#1C1917]/20 focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
              >
                <option value="Exhibition Curation & Commission">Exhibition Curation & Commission</option>
                <option value="Archival Research & Advisory">Archival Research & Advisory</option>
                <option value="Monograph Essay & Critical Text">Monograph Essay & Critical Text</option>
                <option value="Institutional Lecture / Symposium">Institutional Lecture / Symposium</option>
                <option value="General Curatorial Collaboration">General Curatorial Collaboration</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#78716C] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Maria Angelou"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#1C1917]/20 focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#78716C] mb-1">
                  Institution or Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Museum of Contemporary Art"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#1C1917]/20 focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#78716C] mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                required
                placeholder="colleague@institution.org"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#1C1917]/20 focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
              >
              </input>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#78716C] mb-1">
                Proposal Brief / Timeline
              </label>
              <textarea
                rows={4}
                required
                placeholder="Outline the exhibition context, research theme, dates, and geographic location..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#1C1917]/20 focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#78716C] font-mono">
                Transmits directly to {CURATOR_INFO.email}
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#292524] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Initiate Correspondence</span>
              </button>
            </div>
          </form>

          {submitted && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              Your default email client has been prepared. You can also write directly to <strong className="font-mono">{CURATOR_INFO.email}</strong>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
