import React from 'react';
import { X, Printer, Download, ExternalLink } from 'lucide-react';
import { CURATOR_INFO, PROJECTS, PUBLICATIONS, AWARDS } from '../data/portfolioData';

interface CuratorialDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CuratorialDossierModal: React.FC<CuratorialDossierModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#1C1917]/20 shadow-2xl p-6 sm:p-12 my-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dossier-title"
      >
        {/* Top Control Bar (hidden in print) */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1C1917]/10 text-xs font-mono uppercase text-[#78716C] print:hidden">
          <span>CURATORIAL CURRICULUM VITAE & SUMMARY DOSSIER</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[#1C1917]/20 hover:border-[#1C1917] text-[#1C1917] text-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[#1C1917] hover:bg-[#1C1917]/10 cursor-pointer"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="py-6 space-y-8 text-[#1C1917]">
          
          {/* Header Title */}
          <div className="border-b border-[#1C1917]/15 pb-6 space-y-2">
            <h1 id="dossier-title" className="text-3xl sm:text-4xl font-serif font-medium uppercase tracking-wider">
              {CURATOR_INFO.name}
            </h1>
            <div className="text-xs sm:text-sm font-sans tracking-wide text-[#78350F] font-semibold">
              {CURATOR_INFO.title}
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#57534E] font-mono pt-1">
              <span>{CURATOR_INFO.basedIn}</span>
              <span aria-hidden="true">·</span>
              <span>{CURATOR_INFO.email}</span>
              <span aria-hidden="true">·</span>
              <span>Regional Mobility: {CURATOR_INFO.activeRegions}</span>
            </div>
          </div>

          {/* Curatorial & Theoretical Statement */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              01. Curatorial & Research Profile
            </h2>
            <p className="text-xs sm:text-sm font-serif leading-relaxed text-[#292524]">
              {CURATOR_INFO.biography}
            </p>
          </div>

          {/* Fellowships & Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              02. Education & Formative Fellowships
            </h2>
            <div className="space-y-2 text-xs font-sans">
              {CURATOR_INFO.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline border-b border-[#1C1917]/8 pb-1">
                  <div>
                    <span className="font-semibold text-[#1C1917]">{edu.degree}</span> — {edu.institution}
                    {edu.honors && <span className="block text-[11px] text-[#78350F] italic">{edu.honors}</span>}
                  </div>
                  <span className="font-mono text-[#78716C] tabular-nums shrink-0">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Corpus */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              03. Selected Curatorial & Production Corpus (17 Records)
            </h2>
            <div className="space-y-1.5 text-xs font-sans">
              {PROJECTS.map((project) => (
                <div key={project.id} className="flex justify-between items-baseline border-b border-[#1C1917]/6 pb-1">
                  <div className="pr-4">
                    <span className="font-semibold text-[#1C1917]">{project.title}</span> ({project.dateRange})
                    <span className="text-[#57534E]"> — {project.role}, {project.venue} [{project.institution}], {project.location}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#78716C] uppercase shrink-0">{project.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              04. Publications & Critical Writings
            </h2>
            <div className="space-y-1.5 text-xs font-sans">
              {PUBLICATIONS.map((pub) => (
                <div key={pub.id} className="border-b border-[#1C1917]/6 pb-1">
                  <span className="font-medium text-[#1C1917]">{pub.citation}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              05. Academic Distinctions & Awards
            </h2>
            <div className="space-y-1.5 text-xs font-sans">
              {AWARDS.map((award, i) => (
                <div key={i} className="flex justify-between items-baseline border-b border-[#1C1917]/6 pb-1">
                  <div>
                    <span className="font-semibold text-[#1C1917]">{award.title}</span> — {award.institution}
                  </div>
                  <span className="font-mono text-[#78716C] tabular-nums shrink-0">{award.period}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer (hidden in print) */}
        <div className="pt-6 border-t border-[#1C1917]/10 flex items-center justify-between text-xs text-[#78716C] print:hidden">
          <span className="font-mono">Curatorial Dossier · AthLasith</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1C1917] text-[#FAF8F5] uppercase tracking-wider font-medium hover:bg-[#292524] cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
