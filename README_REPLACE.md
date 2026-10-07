# AthL interactive header drop-in

Replace exactly these two files in the repository:

1. `src/App.tsx`
2. `src/components/GenerativeHeader.tsx`

No package changes are required.

## What changes

- The existing sticky `Navbar` is rendered first.
- The interactive generative artwork is rendered immediately beneath it.
- The duplicate AthLasith header and duplicate CV/inquiry/search controls are removed from the artwork component.
- The artwork now uses the site's warm archival design language: `#FAF8F5`, `#F4EFE6`, `#1C1917`, and `#78350F`.
- Interaction remains rich: pointer repulsion, press/drag attraction, tap/burst disruption, twelve pattern families, responsive high-DPI canvas rendering, and reduced-motion support.
- Pattern and Burst controls remain accessible without drag gestures and use 44px minimum target height.

## Verification performed

- `GenerativeHeader.tsx`: TypeScript type check against ES2022 + DOM APIs passed using the repository's compiler style.
- `App.tsx` and `GenerativeHeader.tsx`: TSX transpilation passed.

A full repository-wide Vite build was not run because this execution environment cannot clone/install the GitHub repository dependencies directly.
