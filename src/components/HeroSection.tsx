import React from 'react';
import { ArrowDown, Landmark, Sparkles, BookOpen, Award } from 'lucide-react';
import { CURATOR_INFO, COLLABORATING_INSTITUTIONS } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenInquiry: () => void;
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry, onExploreProjects }) => {
  return (
    <section id="statement" className="relative pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#1C1917]/10 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Monograph Top Kicker */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1C1917]/10 text-xs text-[#78716C] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span>CURATORIAL ARCHIVE</span>
            <span aria-hidden="true">·</span>
            <span>ATHENS / VENICE / MILAN</span>
          </div>
          <div className="flex items-center gap-2">
            <span>MONOGRAPH VOL. 2022–2026</span>
            <span aria-hidden="true">·</span>
            <span>AUTONOMOUS PRACTICE</span>
          </div>
        </div>

        {/* Hero Title & Identity Lockup */}
        <div className="pt-10 pb-12">
          <div className="text-xs sm:text-sm tracking-[0.25em] uppercase font-sans text-[#78350F] font-semibold mb-3">
            Art Historian · Curator · Cultural Strategist
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-[#1C1917] leading-[1.08] max-w-5xl" style={{ textWrap: 'balance' }}>
            Where research, materiality, production, and audience engagement intersect.
          </h1>
        </div>

        {/* Two-Column Curatorial Statement with Drop Cap & Theoretical Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-4 items-start">
          
          {/* Main Editorial Prose (Drop Cap) */}
          <div className="lg:col-span-7 space-y-6 text-[#292524] text-base sm:text-lg leading-relaxed font-sans">
            <p className="drop-cap">
              I am an art historian, curator and cultural strategist dedicated to shaping projects where research, production, and audience engagement intersect. My theoretical and research interests focus on materiality, archival activation, neo-Balkan and Balkan cultural narratives, and the contemporarization of the “iconology of the material,” approached through the interrelated lenses of art history, archaeology, and anthropology.
            </p>
            <p className="text-[#44403C]">
              I am particularly interested in how objects, archives, and vernacular histories construct collective memory and cultural identity within contemporary artistic discourse. From curating independent site-responsive interventions in Athens’ industrial basins to fellowships at the Peggy Guggenheim Collection in Venice and circular cultural research with Onassis ONX, each project bridges rigorous scholarship with spatial choreography.
            </p>

            {/* Unboxed Metadata Tenets */}
            <div className="pt-4 border-t border-[#1C1917]/10">
              <div className="text-xs font-mono uppercase tracking-widest text-[#78716C] mb-2">
                Primary Theoretical Anchors
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-serif italic text-[#1C1917]">
                <span>Materiality & Mineral Agency</span>
                <span aria-hidden="true" className="text-[#A8A29E] not-italic">·</span>
                <span>Archival Activation</span>
                <span aria-hidden="true" className="text-[#A8A29E] not-italic">·</span>
                <span>Neo-Balkan Cultural Narratives</span>
                <span aria-hidden="true" className="text-[#A8A29E] not-italic">·</span>
                <span>Contemporarized Iconology</span>
                <span aria-hidden="true" className="text-[#A8A29E] not-italic">·</span>
                <span>Chthonic Topographies</span>
              </div>
            </div>

            {/* Quick Action Affordances */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#292524] transition-all cursor-pointer shadow-xs"
              >
                <span>Explore Curatorial Index</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1C1917]/30 text-[#1C1917] text-xs uppercase tracking-widest font-medium hover:border-[#1C1917] hover:bg-[#1C1917]/5 transition-all cursor-pointer"
              >
                <span>Curatorial Correspondence</span>
              </button>
            </div>
          </div>

          {/* Right Column: Institutional Salience & Quantitative Rigor */}
          <div className="lg:col-span-5 bg-[#F4EFE6] p-6 sm:p-8 border border-[#1C1917]/12 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1917]/10 text-xs font-mono tracking-widest uppercase text-[#78716C]">
              <span>CURATORIAL RECORD</span>
              <span>2022 — 2026</span>
            </div>

            {/* Quantitative Metrics Matrix */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#1C1917]/10">
              <div className="p-3 bg-[#FAF8F5] border border-[#1C1917]/8">
                <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-[#1C1917]">
                  17
                </div>
                <div className="text-xs text-[#57534E] mt-1 font-sans">
                  Curated exhibitions, production & research roles
                </div>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#1C1917]/8">
                <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-[#1C1917]">
                  04
                </div>
                <div className="text-xs text-[#57534E] mt-1 font-sans">
                  Authored publications & monographic essays
                </div>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#1C1917]/8">
                <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-[#1C1917]">
                  02
                </div>
                <div className="text-xs text-[#57534E] mt-1 font-sans">
                  Fellowships (Venice Guggenheim · Onassis ONX)
                </div>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#1C1917]/8">
                <div className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-[#1C1917]">
                  04
                </div>
                <div className="text-xs text-[#57534E] mt-1 font-sans">
                  Academic distinctions & merit scholarships
                </div>
              </div>
            </div>

            {/* Academic Pedigree Snapshot */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                Institutional Pedigree
              </div>
              <p className="text-xs sm:text-sm text-[#292524] font-sans leading-relaxed">
                BA (Hons) in Art History, Deree – The American College of Greece (2021–2025). Recipient of the Outstanding Graduating Student in Art History and Frances Rich Fine and Performing Arts Scholar.
              </p>
            </div>

            {/* Curatorial Philosophy Pull Quote */}
            <blockquote className="pt-2 border-t border-[#1C1917]/10 font-serif italic text-sm text-[#44403C] leading-snug">
              “The object and the archive are not inert relics; they are somatic conduits through which contemporary identities negotiate memory, rupture, and repair.”
            </blockquote>
          </div>
        </div>

        {/* Institutional Collaboration Strip */}
        <div className="mt-16 pt-8 border-t border-[#1C1917]/10">
          <div className="text-xs font-mono tracking-widest uppercase text-[#78716C] mb-4">
            Institutional Collaborations & Curatorial Platforms
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-sans font-medium text-[#44403C]">
            {COLLABORATING_INSTITUTIONS.map((inst, idx) => (
              <React.Fragment key={inst}>
                <span className="hover:text-[#1C1917] transition-colors">{inst}</span>
                {idx < COLLABORATING_INSTITUTIONS.length - 1 && (
                  <span aria-hidden="true" className="text-[#D6CEBE]">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
