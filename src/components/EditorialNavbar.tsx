import React from 'react';

const links = [
  ['#curatorial-work', 'Curatorial Work'],
  ['#research', 'Research + Writing'],
  ['#publications', 'Publications'],
  ['#cv', 'CV'],
];

export default function EditorialNavbar() {
  return (
    <header className="athl-nav" aria-label="Primary navigation">
      <a className="athl-mark" href="#top" aria-label="AthL home">◎</a>
      <nav className="athl-nav__links">
        {links.map(([href, label]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
