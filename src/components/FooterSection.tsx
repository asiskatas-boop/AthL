import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUp, FileText } from 'lucide-react';
import { CURATOR_INFO } from '../data/portfolioData';

interface FooterSectionProps {
  onOpenInquiry: () => void;
  onOpenDossier: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenInquiry, onOpenDossier }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CURATOR_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F4EFE6] border-t border-[#1C1917]/12 text-[#1C1917] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Colophon Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-[#1C1917]/10">
          
          {/* Brand & Mission Statement */}
          <div className="md:col-span-6 space-y-3">
            <div className="text-xl sm:text-2xl font-serif font-semibold tracking-wider uppercase">
              AthLasith
            </div>
            <div className="text-xs uppercase tracking-widest text-[#78350F] font-sans font-medium">
              Art Historian · Curator · Cultural Strategist
            </div>
            <p className="text-xs sm:text-sm text-[#44403C] font-serif leading-relaxed max-w-lg">
              Dedicated to shaping curatorial projects where research, materiality, production, and archival activation intersect across contemporary Mediterranean and Balkan landscapes.
            </p>
          </div>

          {/* Direct Curatorial Connection */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              Institutional Inquiries
            </div>
            <div className="text-sm font-mono text-[#1C1917] flex items-center gap-2">
              <span>{CURATOR_INFO.email}</span>
              <button
                onClick={handleCopyEmail}
                className="text-[11px] text-[#78350F] hover:underline cursor-pointer"
                title="Copy email address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700 inline" /> : <Copy className="w-3.5 h-3.5 inline" />}
              </button>
            </div>
            <div className="text-xs text-[#57534E] font-sans pt-1">
              Based in {CURATOR_INFO.basedIn} · Active across {CURATOR_INFO.activeRegions}
            </div>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#292524] transition-colors cursor-pointer"
              >
                <Mail className="w-3 h-3" />
                <span>Send Proposal</span>
              </button>
              <button
                onClick={onOpenDossier}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#1C1917]/20 text-[#1C1917] text-xs uppercase tracking-wider font-medium hover:border-[#1C1917] transition-colors cursor-pointer"
              >
                <FileText className="w-3 h-3" />
                <span>Curatorial CV</span>
              </button>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <div className="md:col-span-2 space-y-2 text-xs font-sans text-[#57534E]">
            <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] mb-2">
              Sections
            </div>
            <div>
              <a href="#statement" className="hover:text-[#1C1917] transition-colors">Curatorial Statement</a>
            </div>
            <div>
              <a href="#projects" className="hover:text-[#1C1917] hover:underline">Projects (17 Records)</a>
            </div>
            <div>
              <a href="#research" className="hover:text-[#1C1917] hover:underline">Theoretical Pillars</a>
            </div>
            <div>
              <a href="#publications" className="hover:text-[#1C1917] hover:underline">Publications</a>
            </div>
            <div>
              <a href="#institutional" className="hover:text-[#1C1917] hover:underline">Fellowships & Honors</a>
            </div>
          </div>

        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78716C]">
          <div>
            © {new Date().getFullYear()} AthLasith. All curatorial texts and research rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Athens · Venice · Milan</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-[#1C1917] transition-colors cursor-pointer uppercase tracking-wider"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
