# AthL — editorial redesign first pass

This is a drop-in first-pass visual direction based on the sparse editorial rhythm of the supplied Jacky Boehm reference: tiny navigation, warm off-white field, large plain sans-serif statement, large project imagery, compact credits, generous vertical whitespace, and a CV laid out as a simple editorial page.

## What this package changes

- Removes the dashboard/archive feeling from the primary experience.
- Replaces decorative/generative hero UI with a direct statement + one image.
- Treats curatorial work as editorial case studies rather than cards.
- Uses horizontal image fields that can contain exhibition/documentation images.
- Converts research and publications into quiet indexes.
- Makes the CV a full page section rather than an overlay/modal-first experience.
- Uses one neutral sans-serif stack and almost no visual chrome.

## How to test in the current repo

1. Copy `src/editorial.css` into the project.
2. Copy the files from `src/components/` into the existing components folder.
3. Temporarily replace the current `src/App.tsx` with `src/App.editorial.tsx` (rename it to `App.tsx`).
4. Run the existing Vite dev command.
5. Replace the example arrays/text with the existing AthL project data and actual images.

## Important

The example text and placeholders are intentionally temporary because the current repository content could not be written/read directly from this environment after the GitHub connection was skipped. The structure and visual system are the part to evaluate first. Once the repository files are uploaded into the chat, the same treatment can be wired to the real content without placeholders.
