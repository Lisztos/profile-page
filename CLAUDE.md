# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Adrian Sanchez's personal site/CV: a single-page, editorial-style portfolio built with Next.js 16
(App Router), React 19, and TypeScript. No Tailwind, no UI framework, no i18n — hand-written CSS in
one `globals.css`, English only, one page (`/`).

## Development Commands

```bash
# Start development server with Turbopack (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

No test suite exists.

## Architecture

### Page structure

Everything renders from `src/app/page.tsx`, an async server component (it awaits `getStars()`
directly, no client fetching). Top to bottom: hero header (name, role, contact pill, portrait,
ticker), an "About" defs section (NOW / BEFORE / STACK), `StarredRepos`, a `Projects` grid, a CTA,
and a footer. There are no routes, tabs, or sections elsewhere in `src/app/` besides this one page.

- **`src/app/layout.tsx`** — root layout. Sets metadata (OG/Twitter/JSON-LD Person schema), loads
  the two fonts, and mounts four body-level overlays before `{children}`: `Preloader`, `InkCursor`,
  `DotGrid`, `GridLife`.
- **`src/app/components/`** — all client-side widgets (see below); no server components here besides
  what's inlined in `page.tsx`.
- **`src/lib/site.ts`** — the single source of content: name, role, location, bio copy, the
  `before`/`now` work history, ticker items, and the `projects` array. Editing copy almost always
  means editing this file, not a component.
- **`src/lib/github.ts`** — `getStars()` (live GitHub starred-repos fetch, used by `StarredRepos`,
  24h revalidate) and `getContributions()` + `contributionLevel()` (GitHub GraphQL contribution
  calendar). **`getContributions` and its consumer, `CommitGraph.tsx`, are dead code** — defined but
  never imported or rendered anywhere. Either wire `CommitGraph` into the page or delete both before
  extending them.

### Components (`src/app/components/`)

- **`Preloader`** — full-screen loading animation on first load only (module-level `played` flag,
  so it won't replay on client navigation within the session). Drives a 0–100 counter and progress
  bar over 1400ms, then adds `.ready`/removes `.loading` on `<html>`. Skipped entirely under
  `prefers-reduced-motion`.
- **`InkCursor`** — custom cursor-follower `<div id="cursor">` that lags the real pointer (lerp
  factor 0.45) and toggles a `.hot` class over links/buttons. Only runs on
  `(hover: hover) and (pointer: fine)` with motion not reduced; otherwise it's inert and the native
  cursor shows.
- **`DotGrid`** — a single empty `<div id="dots">`; the dot texture itself is pure CSS
  (`background-image: radial-gradient(...)` in `globals.css`), not canvas.
- **`GridLife`** — canvas layer stacked on top of `DotGrid`. Runs a Game-of-Life-style simulation
  on the same 18px grid: cells idly flicker/drift on their own, and moving the mouse lays a short
  trail that grows and fades. Ink-colored, intentionally subtle. Disabled via CSS for
  `prefers-reduced-motion` and `(hover: none)` (touch devices) — the `useEffect` itself also bails
  out early on reduced motion so no rAF loop starts there either.
- **`TiltPortrait`** — wraps the hero photo, tilts it a few degrees toward the pointer via
  `pointermove` on `(hover: hover) and (pointer: fine)` only.
- **`Reveal`** — scroll-reveal wrapper using a single shared native `IntersectionObserver` (not a
  library) that adds `.in` the first time an element crosses 15% visible, then unobserves it.
  Reduced-motion: marks everything `.in` immediately on mount instead of observing.
- **`Ticker`** — infinite marquee of `site.tickerItems`, pure CSS `animation: tick` (see
  `globals.css`), paused under reduced motion.
- **`StarredRepos`** — renders the `StarredRepo[]` passed down from `page.tsx`; returns `null` if
  the GitHub fetch came back empty (e.g. rate-limited), so the section silently disappears rather
  than showing an error state.
- **`CommitGraph`** — dead code, see above.

### Data flow

There's no central `data.ts`/`types.ts` pair and no React Context providers at all — this is
intentionally much flatter than a typical component-library site:

- Static copy lives in `site.ts` and is imported directly where needed.
- The only dynamic data is GitHub stars, fetched server-side in `page.tsx` and passed down as
  props.
- No dark mode, no theme switching, no language switching — one palette, one language, defined by
  CSS custom properties in `globals.css` (`--paper`, `--ink`, `--ink-soft`, `--accent`, etc.).

### Path Alias

TypeScript path alias `@/*` maps to `./src/*` (tsconfig.json).

```typescript
import { site } from "@/lib/site";
import { getStars } from "@/lib/github";
```

### Styling

- **No Tailwind, no CSS framework** — everything is in `src/app/globals.css` (~840 lines), one
  stylesheet, one `:root` palette, loaded via a plain `import "./globals.css"` in `layout.tsx`.
- **No dark mode** — there's no `prefers-color-scheme` or theme-class handling anywhere in the CSS.
- Fonts: `Source_Serif_4` (serif, body/headings) and `JetBrains_Mono` (mono, labels/meta text),
  both loaded via `next/font/google` in `src/app/fonts.ts` and exposed as CSS variables
  (`--font-serif`, `--font-mono`).
- Z-index layering is documented inline at the top of `globals.css`: `0` dots/grid-life, `1`
  column/content, `50` sound (unused), `60` preloader, `70` cursor.
- One responsive breakpoint throughout: `@media (max-width: 560px)`. There's no tablet-specific
  breakpoint.
- Respects three media-feature families: `prefers-reduced-motion`, `prefers-reduced-transparency`
  (hides `#dots`), and `(hover: none)` (hides `#grid-life` on touch).

### SEO & Metadata

- **metadataBase**: `https://adrianisanchez.com` (from `site.url`), set in `layout.tsx`.
- **Open Graph / Twitter**: generated dynamically by `src/app/opengraph-image.tsx` via Next's
  file-convention `ImageResponse` API (fetches Instrument Serif from Google's font repo at request
  time) — there's no static `/icon.png` reference and no manual `images` array in `metadata`.
- **JSON-LD**: a `Person` schema is inlined as a `<script type="application/ld+json">` in
  `layout.tsx`, built from `site.ts` fields.
- **`sitemap.ts`** and **`robots.ts`** both exist (file-convention, not static files in `public/`)
  and both are wired up — `robots.ts` points its `sitemap` field at `/sitemap.xml` and disallows
  `*.pdf`.

### Analytics

Vercel Analytics and Speed Insights, mounted in `layout.tsx`.

## Important Notes

- **No test suite.**
- **Strict mode enabled**: `reactStrictMode: true` in `next.config.js`. That's the entire Next
  config — no image domains, no redirects, no experimental flags.
- **Dead code**: `getContributions`/`contributionLevel` in `src/lib/github.ts` and the
  `CommitGraph` component are unused. `public/CV-adrian-en-ber.pdf`, `CV-adrian-en-mx.pdf`,
  `public/images/duck.png`, and `public/images/projects/project1.png`/`project2.png` are also
  unreferenced from `src/` — there is no CV download button and no duck easter egg in the current
  code, despite the files still being on disk.
- **`GITHUB_TOKEN`** env var is optional for `getStars()` (raises the GitHub rate limit) but
  required for `getContributions()` (which early-returns `[]` without it) — moot while that
  function is unused.

## Adding New Content

1. **Work history / bio copy**: edit `site.ts` (`now*` fields, `before` array, `intro`, `stack`).
2. **New project**: add an entry to `site.projects` in `site.ts`. Entries are a union — `url`,
   `description`, `image`, and `techStack` are all optional per item; `page.tsx` checks for each
   with `"key" in item` before rendering it, and an item without a `url` renders as a plain `div`
   instead of a link.
3. **New page section**: add it directly in `src/app/page.tsx` — there's no sections directory or
   registration array to update elsewhere.

## Image Assets

- Company/education logos: `public/images/logos/`
- Portrait (hero tilt photo): `public/images/portrait.jpg`
- Project images: `public/images/projects/`
- `public/images/profile-photo.png` / `.webp` and the CV PDFs are legacy, unreferenced from code.
