import React, { useState } from 'react';
import { RESEARCH_PILLARS, PROJECTS, Project } from '../data/portfolioData';
import { BookMarked, Compass, Layers, Sparkles, ArrowRight, Quote } from 'lucide-react';

interface ResearchTheoreticalDossierProps {
  onSelectProject: (project: Project) => void;
}

export const ResearchTheoreticalDossier: React.FC<ResearchTheoreticalDossierProps> = ({ onSelectProject }) => {
  const [activePillarId, setActivePillarId] = useState<string>(RESEARCH_PILLARS[0].id);

  const activePillar = RESEARCH_PILLARS.find((p) => p.id === activePillarId) || RESEARCH_PILLARS[0];

  const handleLinkCaseStudy = (caseStudyRef: string) => {
    // find matching project
    const match = PROJECTS.find(
      (p) =>
        caseStudyRef.toLowerCase().includes(p.title.toLowerCase()) ||
        p.title.toLowerCase().includes(caseStudyRef.toLowerCase().split('&')[0].trim())
    );
    if (match) {
      onSelectProject(match);
    }
  };

  return (
    <section id="research" className="py-20 md:py-28 border-b border-[#1C1917]/10 bg-[#F4EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="pb-8 border-b border-[#1C1917]/10">
          <div className="text-xs font-mono tracking-widest uppercase text-[#78716C] mb-2">
            THEORETICAL APPARATUS & METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917]">
            Research Vectors & Curatorial Poetics
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-2 font-sans max-w-3xl">
            My theoretical and research interests center on how physical substances, institutional silence, and vernacular Southeast European memories construct contemporary artistic discourse.
          </p>
        </div>

        {/* 4 Pillars Interactive Tab Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-6">
          {RESEARCH_PILLARS.map((pillar) => {
            const isSelected = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`p-4 text-left transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#FAF8F5] border-[#1C1917] shadow-sm'
                    : 'bg-[#EAE5D9]/50 border-[#1C1917]/10 hover:bg-[#FAF8F5]/60 hover:border-[#1C1917]/30'
                }`}
              >
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#78716C] mb-1">
                  {pillar.latinIndex}
                </div>
                <div className="font-serif text-base sm:text-lg font-medium text-[#1C1917] leading-snug">
                  {pillar.title}
                </div>
                <div className="text-xs text-[#57534E] font-sans mt-1 line-clamp-1">
                  {pillar.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Deep Reading View */}
        <div className="mt-8 bg-[#FAF8F5] border border-[#1C1917]/12 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Essay & Conceptual Framework */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="text-xs font-mono tracking-widest uppercase text-[#78350F] mb-1">
                  {activePillar.latinIndex} · THEORETICAL DOSSIER
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917]">
                  {activePillar.title}
                </h3>
                <p className="text-sm font-sans italic text-[#57534E] mt-1">
                  {activePillar.subtitle}
                </p>
              </div>

              {/* Core Summary (Drop Cap) */}
              <p className="drop-cap text-base sm:text-lg text-[#292524] font-serif leading-relaxed">
                {activePillar.summary}
              </p>

              {/* Extended Curatorial Notes */}
              <div className="p-4 bg-[#F4EFE6] border-l-2 border-[#78350F] text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[#78716C] mb-1">
                  Curatorial Field Notes
                </div>
                {activePillar.extendedNotes}
              </div>

              {/* Methodology */}
              <div className="space-y-1.5 pt-2">
                <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                  Triangulated Methodology
                </div>
                <p className="text-xs sm:text-sm text-[#292524] font-sans">
                  {activePillar.methodology}
                </p>
              </div>
            </div>

            {/* Right 5 cols: Bibliographic Anchors & Case Studies */}
            <div className="lg:col-span-5 bg-[#F4EFE6] p-6 border border-[#1C1917]/10 space-y-6">
              
              {/* Theoretical Anchors */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] pb-2 border-b border-[#1C1917]/10">
                  Critical Epistemologies & Authors
                </div>
                <ul className="space-y-2 text-xs text-[#292524] font-sans">
                  {activePillar.theoreticalAnchors.map((anchor, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#78350F] font-mono font-bold">•</span>
                      <span>{anchor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disciplinary Intersections */}
              <div className="space-y-2 pt-2 border-t border-[#1C1917]/10">
                <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                  Interdisciplinary Lenses
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#44403C] font-serif italic">
                  <span>Art History</span>
                  <span aria-hidden="true">·</span>
                  <span>Archaeological Stratigraphy</span>
                  <span aria-hidden="true">·</span>
                  <span>Anthropology of Matter</span>
                  <span aria-hidden="true">·</span>
                  <span>Vernacular Archives</span>
                </div>
              </div>

              {/* Linked Case Study */}
              <div className="pt-3 border-t border-[#1C1917]/10 space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                  Exemplary Case Study
                </div>
                <div className="p-3 bg-[#FAF8F5] border border-[#1C1917]/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-serif font-medium text-[#1C1917]">
                      {activePillar.caseStudyRef}
                    </div>
                    <div className="text-[10px] text-[#78716C] font-mono">
                      Curatorial Execution in Athens
                    </div>
                  </div>
                  <button
                    onClick={() => handleLinkCaseStudy(activePillar.caseStudyRef)}
                    className="p-1.5 text-xs text-[#78350F] hover:bg-[#EAE5D9] transition-colors cursor-pointer"
                    title="Open Case Study Project"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
