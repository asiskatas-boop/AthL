import React from 'react';
import { Award as AwardIcon, GraduationCap, Landmark, Sparkles, Building2, MapPin } from 'lucide-react';
import { AWARDS, CURATOR_INFO, COLLABORATING_INSTITUTIONS } from '../data/portfolioData';

export const InstitutionalRecord: React.FC = () => {
  return (
    <section id="institutional" className="py-20 md:py-28 border-b border-[#1C1917]/10 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="pb-8 border-b border-[#1C1917]/10">
          <div className="text-xs font-mono tracking-widest uppercase text-[#78716C] mb-2">
            ACADEMIC DISTINCTIONS & INSTITUTIONAL AFFILIATIONS
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917]">
            Institutional Record & Fellowships
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-2 font-sans max-w-2xl">
            International fellowships, academic laurels, and institutional partnerships across contemporary art foundations, universities, and biennial platforms.
          </p>
        </div>

        {/* Feature Spotlights: Venice Guggenheim & Onassis ONX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Spotlight 1: Peggy Guggenheim Collection */}
          <div className="bg-[#F4EFE6] p-6 sm:p-8 border border-[#1C1917]/12 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#78716C] font-mono">
              <span className="uppercase font-semibold text-[#78350F]">FELLOWSHIP · VENICE</span>
              <span className="tabular-nums">10/2025 – 11/2025</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917]">
              Peggy Guggenheim Collection
            </h3>
            
            <div className="text-xs text-[#57534E] font-sans">
              Palazzo Venier dei Leoni · Venice, Italy · Institutional Research Fellow
            </div>

            <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
              Selected for the competitive curatorial fellowship at Palazzo Venier dei Leoni. Research and mediation focused on modern masterworks, sculpture conservation archives, and the transnational cultural strategies that situated Peggy Guggenheim at the vanguard of 20th-century artistic discourse.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#78716C]">
              FOCUS: Modernist Archives · Venetian Architectural Heritage · Provenance Research
            </div>
          </div>

          {/* Spotlight 2: ONASSIS ONX x British Council */}
          <div className="bg-[#F4EFE6] p-6 sm:p-8 border border-[#1C1917]/12 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#78716C] font-mono">
              <span className="uppercase font-semibold text-[#78350F]">RESEARCH SCHOOL · ATHENS</span>
              <span className="tabular-nums">05/2026</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917]">
              Circular Cultures Design School
            </h3>
            
            <div className="text-xs text-[#57534E] font-sans">
              ONASSIS ONX x British Council · Athens, Greece · Participant & Researcher
            </div>

            <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
              Participant in the intensive research program “Time as Memory as Space”, examining sustainable design epistemologies, local material life-cycles, and how collective memory is conserved within circular architectural transitions across the Aegean.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#78716C]">
              FOCUS: Circular Materiality · Somatic Heritage · Ecological Design Methodologies
            </div>
          </div>

        </div>

        {/* Awards and Achievements */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1C1917]/10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                ACADEMIC HONORS
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917]">
                Awards & Scholarships
              </h3>
            </div>
            <AwardIcon className="w-5 h-5 text-[#78350F]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AWARDS.map((award, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 bg-[#FAF8F5] border border-[#1C1917]/10 space-y-2.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-mono tabular-nums text-[#78716C]">
                    {award.period}
                  </span>
                  <span className="text-[11px] font-mono uppercase text-[#78350F]">
                    {award.institution}
                  </span>
                </div>
                <h4 className="text-lg font-serif font-medium text-[#1C1917]">
                  {award.title}
                </h4>
                <p className="text-xs text-[#57534E] font-sans leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Academic Formation */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1C1917]/10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#78716C]">
                CURRICULAR ACCREDITATION
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917]">
                Education & Formative Programs
              </h3>
            </div>
            <GraduationCap className="w-5 h-5 text-[#78350F]" />
          </div>

          <div className="divide-y divide-[#1C1917]/10 border border-[#1C1917]/10 bg-[#FAF8F5]">
            {CURATOR_INFO.education.map((edu, idx) => (
              <div key={idx} className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-base sm:text-lg font-serif font-medium text-[#1C1917]">
                    {edu.degree}
                  </div>
                  <div className="text-xs text-[#57534E] font-sans">
                    {edu.institution}
                  </div>
                  {edu.honors && (
                    <div className="text-xs text-[#78350F] font-serif italic pt-0.5">
                      {edu.honors}
                    </div>
                  )}
                </div>
                <div className="text-xs font-mono tabular-nums text-[#78716C] shrink-0">
                  {edu.period}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
