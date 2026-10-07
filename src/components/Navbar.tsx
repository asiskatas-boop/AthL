import React, { useState } from 'react';
import { Mail, FileText, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: () => void;
  onOpenDossier: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, onOpenDossier }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#1C1917]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          className="text-xl sm:text-2xl font-serif tracking-widest uppercase font-semibold text-[#1C1917] hover:text-[#78350F] transition-colors"
        >
          AthLasith
        </a>

        {/* Zone 2: Navigation Links (single line, clean typographic hover) */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-sans font-medium text-[#44403C]">
          <a href="#statement" className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors">
            Overview
          </a>
          <a href="#projects" className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors">
            Curatorial Projects
          </a>
          <a href="#research" className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors">
            Research & Theory
          </a>
          <a href="#publications" className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors">
            Publications
          </a>
          <a href="#institutional" className="hover:text-[#1C1917] hover:underline underline-offset-8 transition-colors">
            Institutional Record
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenDossier}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#44403C] hover:text-[#1C1917] border border-[#1C1917]/15 rounded-none hover:border-[#1C1917] transition-all whitespace-nowrap cursor-pointer"
            title="Curatorial Dossier & CV Summary"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Curatorial CV</span>
          </button>
          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-wider uppercase font-medium text-[#FAF8F5] bg-[#1C1917] hover:bg-[#292524] transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inquiries</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenInquiry}
            className="p-1.5 text-xs text-[#FAF8F5] bg-[#1C1917] px-2.5"
            aria-label="Contact Curator"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1917] hover:bg-[#EFECE6] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1C1917]/10 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3">
          <div className="text-[11px] tracking-widest uppercase text-[#78716C] mb-2 font-mono">
            Navigation Index
          </div>
          <a
            href="#statement"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#1C1917] py-1.5 border-b border-[#1C1917]/5"
          >
            Curatorial Statement
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#1C1917] py-1.5 border-b border-[#1C1917]/5"
          >
            Projects (17 Records)
          </a>
          <a
            href="#research"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#1C1917] py-1.5 border-b border-[#1C1917]/5"
          >
            Research & Theoretical Pillars
          </a>
          <a
            href="#publications"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#1C1917] py-1.5 border-b border-[#1C1917]/5"
          >
            Publications & Monograph Texts
          </a>
          <a
            href="#institutional"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#1C1917] py-1.5 border-b border-[#1C1917]/5"
          >
            Fellowships & Honors
          </a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDossier();
              }}
              className="w-full text-center py-2 text-xs uppercase tracking-wider border border-[#1C1917]/20 text-[#1C1917]"
            >
              View Curatorial CV
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full text-center py-2 text-xs uppercase tracking-wider bg-[#1C1917] text-white"
            >
              Curatorial Inquiries
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
