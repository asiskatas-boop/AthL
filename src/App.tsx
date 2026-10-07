/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { GenerativeHeader } from './components/GenerativeHeader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CuratorialProjects } from './components/CuratorialProjects';
import { ResearchTheoreticalDossier } from './components/ResearchTheoreticalDossier';
import { PublicationsSection } from './components/PublicationsSection';
import { InstitutionalRecord } from './components/InstitutionalRecord';
import { FooterSection } from './components/FooterSection';
import { ProjectModal } from './components/ProjectModal';
import { CuratorialInquiryModal } from './components/CuratorialInquiryModal';
import { CuratorialDossierModal } from './components/CuratorialDossierModal';
import { Project } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const handleExploreProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] selection:bg-[#E8E2D5] selection:text-[#1C1917]">
      {/* Primary site navigation stays first and sticky. */}
      <Navbar
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      <main className="flex-1">
        {/* Interactive archival plate: deliberately placed directly beneath navigation. */}
        <GenerativeHeader />

        {/* Curatorial Statement & Hero */}
        <HeroSection
          onOpenInquiry={() => setIsInquiryOpen(true)}
          onExploreProjects={handleExploreProjects}
        />

        {/* Curatorial Projects & Catalogue Raisonné */}
        <CuratorialProjects
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Theoretical Framework & Research Vectors */}
        <ResearchTheoreticalDossier
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Monographic Publications & Critical Writings */}
        <PublicationsSection />

        {/* Institutional Record: Fellowships, Laurels & Education */}
        <InstitutionalRecord />
      </main>

      {/* Museum Colophon & Footer */}
      <FooterSection
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* Project Deep Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Curatorial Inquiry Correspondence Modal */}
      <CuratorialInquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Curatorial Dossier & CV Printable View */}
      <CuratorialDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />
    </div>
  );
}
