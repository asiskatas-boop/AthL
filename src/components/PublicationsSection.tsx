import React, { useState } from 'react';
import { BookOpen, Copy, Check, Quote, ArrowUpRight, X } from 'lucide-react';
import { Publication, PUBLICATIONS } from '../data/portfolioData';

export const PublicationsSection: React.FC = () => {
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCitation = (pub: Publication) => {
    navigator.clipboard.writeText(pub.citation);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <section id="publications" className="py-20 md:py-28 border-b border-[#1C1917]/10 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="pb-8 border-b border-[#1C1917]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#78716C] mb-2">
              BIBLIOGRAPHY & CRITICAL WRITING
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917]">
              Authored Publications
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2 font-sans max-w-2xl">
              Monographic exhibition texts, catalog essays, and peer-reviewed periodical contributions investigating material agency, Balkan craft epistemologies, and archival fragility.
            </p>
          </div>
          <div className="text-xs font-mono text-[#78716C] tabular-nums">
            4 VOLUMES · 2023–2025
          </div>
        </div>

        {/* 4 Publications Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          {PUBLICATIONS.map((pub, idx) => (
            <article
              key={pub.id}
              className="bg-[#FAF8F5] border border-[#1C1917]/12 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#1C1917] transition-all"
            >
              <div className="space-y-4">
                {/* Header Kicker */}
                <div className="flex items-center justify-between text-xs text-[#78716C] font-mono">
                  <span>VOL. 0{idx + 1} · {pub.year}</span>
                  <span className="uppercase">{pub.type}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917] leading-snug">
                  {pub.title}
                </h3>

                {/* Unboxed Metadata (Zero Pill Rule) */}
                <div className="flex items-center gap-2 text-xs text-[#57534E] font-sans">
                  <span>{pub.publisher}</span>
                  <span aria-hidden="true">·</span>
                  <span>{pub.date}</span>
                </div>

                {/* Abstract */}
                <p className="text-xs sm:text-sm text-[#44403C] font-sans leading-relaxed">
                  {pub.abstract}
                </p>

                {/* Pull Quote Excerpt */}
                <blockquote className="p-4 bg-[#F4EFE6] border-l border-[#78350F] text-xs sm:text-sm font-serif italic text-[#292524] leading-relaxed">
                  {pub.excerpt}
                </blockquote>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#1C1917]/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedPub(pub)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#1C1917] hover:text-[#78350F] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Monograph Text</span>
                </button>

                <button
                  onClick={() => handleCopyCitation(pub)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-sans text-[#78716C] hover:text-[#1C1917] border border-[#1C1917]/15 hover:border-[#1C1917] transition-all cursor-pointer"
                  title="Copy full academic citation"
                >
                  {copiedId === pub.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal for Selected Publication */}
      {selectedPub && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#1C1917]/20 shadow-2xl p-6 sm:p-10 my-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1C1917]/10 text-xs font-mono uppercase text-[#78716C]">
              <span>MONOGRAPHIC READER · {selectedPub.date}</span>
              <button
                onClick={() => setSelectedPub(null)}
                className="p-1 text-[#1C1917] hover:bg-[#1C1917]/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider font-sans text-[#78350F] font-semibold">
                  {selectedPub.type}
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917]">
                  {selectedPub.title}
                </h2>
                <div className="text-xs text-[#78716C] font-mono">
                  {selectedPub.publisher} · {selectedPub.date}
                </div>
              </div>

              {/* Monograph Essay Excerpt */}
              <div className="space-y-4 text-base sm:text-lg text-[#292524] font-serif leading-relaxed">
                <p className="drop-cap">
                  {selectedPub.excerpt.replace(/^[“”"]|[“”"]$/g, '')}
                </p>
                <p className="text-sm font-sans text-[#57534E] leading-relaxed">
                  {selectedPub.abstract}
                </p>
              </div>

              {/* Academic Citation Box */}
              <div className="p-4 bg-[#F4EFE6] border border-[#1C1917]/10 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#78716C]">
                  Full Bibliographic Citation
                </div>
                <div className="text-xs font-mono text-[#1C1917] select-all">
                  {selectedPub.citation}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#1C1917]/10 flex items-center justify-between">
              <button
                onClick={() => handleCopyCitation(selectedPub)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#1C1917]/20 hover:border-[#1C1917] text-[#1C1917] cursor-pointer"
              >
                {copiedId === selectedPub.id ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === selectedPub.id ? 'Copied to Clipboard' : 'Copy Citation'}</span>
              </button>
              <button
                onClick={() => setSelectedPub(null)}
                className="px-4 py-1.5 bg-[#1C1917] text-[#FAF8F5] text-xs uppercase font-medium hover:bg-[#292524] cursor-pointer"
              >
                Close Reader
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
