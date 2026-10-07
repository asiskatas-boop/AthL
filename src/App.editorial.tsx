import React from 'react';
import EditorialNavbar from './components/EditorialNavbar';
import EditorialHero from './components/EditorialHero';
import EditorialProjects, { EditorialProject } from './components/EditorialProjects';
import EditorialCV from './components/EditorialCV';
import EditorialFooter from './components/EditorialFooter';
import './editorial.css';

// First-pass structure only. Replace these examples with the existing AthL project data.
const projects: EditorialProject[] = [
  {
    title: 'Selected Curatorial Project',
    description: 'Use the existing project description here. Keep this block short enough to read at a glance, then let the image sequence carry the project.',
    role: 'Curatorial direction / research',
    credits: ['Institution / collaborator', 'Location / year'],
  },
  {
    title: 'Research-Led Exhibition',
    description: 'A second project block showing the intended rhythm: compact text and credits followed by a very large horizontal visual field.',
    role: 'Research / exhibition development',
    credits: ['Institution / collaborator', 'Location / year'],
  },
];

export default function App() {
  return (
    <div className="athl-site">
      <EditorialNavbar />
      <main>
        <EditorialHero />
        <EditorialProjects projects={projects} />

        <section id="research" className="athl-text-section">
          <p className="athl-eyebrow">Research + Writing</p>
          <p className="athl-large-copy">A quieter editorial index for essays, dossiers, lectures, and ongoing research — no cards, filters, or dashboard treatment.</p>
        </section>

        <section id="publications" className="athl-text-section athl-text-section--compact">
          <p className="athl-eyebrow">Publications</p>
          <div className="athl-index-row"><span>Publication title</span><span>Publisher / year</span></div>
          <div className="athl-index-row"><span>Publication title</span><span>Publisher / year</span></div>
          <div className="athl-index-row"><span>Publication title</span><span>Publisher / year</span></div>
        </section>

        <EditorialCV />
      </main>
      <EditorialFooter />
    </div>
  );
}
