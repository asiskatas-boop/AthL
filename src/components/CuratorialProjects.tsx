import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, Table, ArrowUpRight, Filter, Calendar, MapPin } from 'lucide-react';
import { Project, PROJECTS } from '../data/portfolioData';
import { CuratorPlate } from './CuratorPlate';

interface CuratorialProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const CuratorialProjects: React.FC<CuratorialProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory =
        activeCategory === 'all' ? true : p.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q) ||
        p.institution.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.year.includes(q) ||
        p.theme.some((t) => t.toLowerCase().includes(q)) ||
        p.materialsAndForms.some((m) => m.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: PROJECTS.length,
      curatorial: PROJECTS.filter((p) => p.category === 'curatorial').length,
      production: PROJECTS.filter((p) => p.category === 'production').length,
      fellowship: PROJECTS.filter((p) => p.category === 'fellowship').length,
    };
  }, []);

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-[#1C1917]/10 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1C1917]/10">
          <div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#78716C] mb-2">
              CATALOGUE RAISONNÉ · 2022–2026
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-[#1C1917]">
              Curatorial Projects & Archive
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2 font-sans max-w-2xl">
              Chronological corpus of 17 curated exhibitions, spatial productions, fair booths, and institutional fellowships across Athens, Venice, Patmos, and Milan.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#F4EFE6] border border-[#1C1917]/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#FAF8F5] text-[#1C1917] shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
              title="Editorial Card Grid"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Plates</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#FAF8F5] text-[#1C1917] shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
              title="Chronological Register Table"
            >
              <Table className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-[#1C1917]/10">
          
          {/* Functional Category Filter Tabs (allowed buttons with click handlers) */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer border ${
                activeCategory === 'all'
                  ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5]'
                  : 'border-[#1C1917]/15 bg-transparent text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917]'
              }`}
            >
              All Projects <span className="font-mono tabular-nums text-[10px]">({categoryCounts.all})</span>
            </button>
            <button
              onClick={() => setActiveCategory('curatorial')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer border ${
                activeCategory === 'curatorial'
                  ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5]'
                  : 'border-[#1C1917]/15 bg-transparent text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917]'
              }`}
            >
              Curatorial <span className="font-mono tabular-nums text-[10px]">({categoryCounts.curatorial})</span>
            </button>
            <button
              onClick={() => setActiveCategory('production')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer border ${
                activeCategory === 'production'
                  ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5]'
                  : 'border-[#1C1917]/15 bg-transparent text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917]'
              }`}
            >
              Production & Management <span className="font-mono tabular-nums text-[10px]">({categoryCounts.production})</span>
            </button>
            <button
              onClick={() => setActiveCategory('fellowship')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer border ${
                activeCategory === 'fellowship'
                  ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5]'
                  : 'border-[#1C1917]/15 bg-transparent text-[#57534E] hover:border-[#1C1917] hover:text-[#1C1917]'
              }`}
            >
              Fellowships <span className="font-mono tabular-nums text-[10px]">({categoryCounts.fellowship})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#78716C]" />
            <input
              type="text"
              placeholder="Search title, venue, material..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#1C1917]/20 focus:outline-none focus:border-[#1C1917] text-[#1C1917] placeholder:text-[#A8A29E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#78716C] hover:text-[#1C1917] font-mono"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="py-3 flex items-center justify-between text-xs text-[#78716C] font-mono">
          <span>Showing {filteredProjects.length} of {PROJECTS.length} records</span>
          {searchQuery && <span>Filter query: &quot;{searchQuery}&quot;</span>}
        </div>

        {/* Content Mode 1: Editorial Plate Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group flex flex-col bg-[#FAF8F5] border border-[#1C1917]/12 hover:border-[#1C1917] transition-all cursor-pointer p-5 space-y-4 shadow-xs hover:shadow-md"
              >
                {/* Visual Curator Plate */}
                <CuratorPlate
                  type={project.visualPlateType}
                  accessionCode={project.accessionCode}
                  title={project.title}
                  venue={project.venue}
                  year={project.year}
                  aspectRatio="landscape"
                />

                {/* Unboxed Metadata (Zero Pill Rule) */}
                <div className="flex items-center gap-2 text-xs text-[#78716C] font-mono">
                  <span>{project.dateRange}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{project.location}</span>
                </div>

                {/* Primary Card Title & Institution */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-serif font-medium text-[#1C1917] group-hover:text-[#78350F] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#A8A29E] group-hover:text-[#1C1917] transition-colors shrink-0 mt-1" />
                  </div>
                  <div className="text-xs text-[#57534E] font-sans">
                    {project.institution} · <span className="italic">{project.role}</span>
                  </div>
                </div>

                {/* Short Excerpt */}
                <p className="text-xs text-[#44403C] font-sans line-clamp-2 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Thematic unboxed separator line */}
                <div className="pt-3 border-t border-[#1C1917]/8 flex items-center justify-between text-[11px] text-[#78716C]">
                  <span className="truncate font-sans">{project.theme.join(' / ')}</span>
                  <span className="font-mono text-[10px] text-[#1C1917] shrink-0 uppercase tracking-wider underline group-hover:no-underline">
                    Dossier →
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Content Mode 2: Chronological Accession Register Table */
          <div className="overflow-x-auto pt-4">
            <table className="w-full text-left text-xs font-sans border border-[#1C1917]/12 bg-[#FAF8F5]">
              <thead className="bg-[#F4EFE6] border-b border-[#1C1917]/12 text-[#78716C] font-mono tracking-wider uppercase">
                <tr>
                  <th className="py-3 px-4">Accession</th>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Exhibition / Program Title</th>
                  <th className="py-3 px-4">Institution & Venue</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1917]/8 text-[#292524]">
                {filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="hover:bg-[#F4EFE6]/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono text-[#78716C] tabular-nums">
                      {project.accessionCode}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums whitespace-nowrap text-[#57534E]">
                      {project.dateRange}
                    </td>
                    <td className="py-3 px-4 font-serif text-sm font-medium text-[#1C1917] group-hover:text-[#78350F]">
                      {project.title}
                    </td>
                    <td className="py-3 px-4 text-[#57534E]">
                      {project.institution}
                      {project.venue !== project.institution && (
                        <span className="text-[#78716C] block text-[11px]">{project.venue}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#44403C]">
                      {project.role}
                    </td>
                    <td className="py-3 px-4 text-[#78716C] whitespace-nowrap">
                      {project.location}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#78350F] group-hover:underline">
                        View Dossier <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center border border-dashed border-[#1C1917]/20 p-8 space-y-3">
            <p className="text-base font-serif text-[#1C1917]">
              No curatorial records matched the filter &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 text-xs font-sans bg-[#1C1917] text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
