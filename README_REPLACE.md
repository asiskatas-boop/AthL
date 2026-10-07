AthL interactive element — drop-in replacement

Replace exactly these files in your GitHub repo:
1. src/App.tsx
2. src/components/GenerativeHeader.tsx

What this version does:
- Keeps the existing AthL Navbar first.
- Places the interactive generative artwork directly beneath it.
- Removes all visible headings, instructions, pattern names, and explanatory copy from the artwork.
- Keeps two compact icon-only controls over the artwork: change pattern and burst.
- Keeps pointer/touch interaction, pattern generation, drag attraction, repulsion, bursts, responsive canvas sizing, and reduced-motion handling.

Do NOT replace the repo root index.html with the standalone preview HTML. The repo is a React/Vite app; the TSX files above are the production integration.

AthL-interactive-element.html is only a standalone browser preview of the element itself.
