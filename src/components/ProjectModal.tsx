import React, { useEffect, useState } from 'react';
import { X, Copy, Check, MapPin, Calendar, Building, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { CuratorPlate } from './CuratorPlate';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectAnotherProject?: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const catalogCitation = `${project.title}. Curated / Produced by AthLasith (${project.role}). ${project.venue}, ${project.institution}, ${project.location} (${project.dateRange}). Ref: ${project.accessionCode}.`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(catalogCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#1C1917]/20 shadow-2xl overflow-hidden my-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F4EFE6] border-b border-[#1C1917]/12 text-xs font-mono uppercase tracking-widest text-[#78716C]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1C1917]">{project.accessionCode}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category.toUpperCase()} DOSSIER</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1C1917]/10 text-[#1C1917] transition-colors cursor-pointer"
            aria-label="Close dossier modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Main Title & Curatorial Designation */}
          <div className="space-y-3 pb-6 border-b border-[#1C1917]/10">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider font-sans text-[#78350F] font-semibold">
              <span>{project.role}</span>
              <span aria-hidden="true" className="text-[#A8A29E]">·</span>
              <span>{project.institution}</span>
            </div>
            
            <h2 id="modal-project-title" className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917] leading-tight">
              {project.title}
            </h2>

            {/* Quick Context Bar */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-[#57534E] pt-2">
              <span className="inline-flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#78716C]" />
                {project.venue}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#78716C]" />
                {project.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#78716C]" />
                {project.dateRange}
              </span>
            </div>
          </div>

          {/* Visual Plate & Curatorial Drawing */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-6">
              <CuratorPlate
                type={project.visualPlateType}
                accessionCode={project.accessionCode}
                title={project.title}
                venue={project.venue}
                year={project.year}
                aspectRatio="landscape"
                className="shadow-xs"
              />
              <div className="mt-2 text-[11px] text-[#78716C] font-serif italic">
                Fig. Curatorial schematic representation of spatial layout and material vectors for {project.title}.
              </div>
            </div>

            {/* Right: Key Curatorial Highlights */}
            <div className="md:col-span-6 bg-[#F4EFE6] p-5 border border-[#1C1917]/10 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                Curatorial & Production Scope
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#292524] font-sans">
                {project.curatorialHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#78350F] font-mono font-semibold text-xs mt-0.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Materials & Forms */}
              <div className="pt-3 border-t border-[#1C1917]/10 space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                  Materiality & Medium
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#44403C] font-mono">
                  {project.materialsAndForms.map((mat, i) => (
                    <span key={i}>
                      {mat}{i < project.materialsAndForms.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Curatorial Rationale / Statement */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
              Curatorial Rationale & Theoretical Framework
            </div>
            <p className="text-base sm:text-lg text-[#292524] font-serif leading-relaxed drop-cap">
              {project.statement}
            </p>
          </div>

          {/* Thematic Vectors */}
          <div className="pt-4 border-t border-[#1C1917]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
              <span className="font-mono uppercase text-[#78716C]">Thematic Vectors:</span>
              {project.theme.map((t, idx) => (
                <span key={idx} className="font-sans font-medium text-[#1C1917]">
                  {t}{idx < project.theme.length - 1 ? ' /' : ''}
                </span>
              ))}
            </div>

            {/* Copy Citation Button */}
            <button
              onClick={handleCopyCitation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans text-[#1C1917] border border-[#1C1917]/20 hover:border-[#1C1917] hover:bg-[#F4EFE6] transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Citation Copied' : 'Copy Catalog Citation'}</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F4EFE6] border-t border-[#1C1917]/12 flex items-center justify-between text-xs text-[#78716C]">
          <span className="font-mono">Record: {project.accessionCode}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#292524] transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
