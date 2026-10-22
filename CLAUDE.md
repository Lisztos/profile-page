# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. It showcases Adrian Sanchez's experience, skills, education, and starred GitHub repos, with i18n support for English and German.

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

## Architecture & Key Patterns

### App Structure (Next.js App Router)

- **Main entry**: `src/app/page.tsx` — client component with a **tabbed** layout: a full-height Intro card, then a sticky `TabNav` switching between Skills / Experience / Education / GitHub Stars. It is *not* a scroll-through one-pager.
- **Layout**: `src/app/layout.tsx` — root layout with metadata, Header/Footer, gradient blobs, and the context provider stack
- **Sections**: `src/app/sections/` — Intro, Skills, Experience, Education, GithubStars, Projects (Projects is not currently rendered)
- **Components**: `src/app/components/` — Card, Header, Footer, LanguageSelector, SectionHeading, SectionDivider, ThemeSwitch, DuckAnimation
- **API routes**: `src/app/api/github-stars/route.ts` — proxies `api.github.com/users/Lisztos/starred` (6 most recent), 24h revalidate. Uses `GITHUB_TOKEN` from env if set (optional; raises the rate limit), returns 503 on upstream failure.

### Data & Type System

- **Central data**: `src/lib/data.ts` — `links`, `experienceData`, `educationData`, `projectsData`, `skillsData`, `locationConfig`, `americasCountries`
- **Type definitions**: `src/lib/types.ts` — `SectionName`, `ExperienceItem`, `EducationItem`, `TechItem`, `GitHubRepo`
- Data exports use `as const` for type safety and literal types

### Context Providers (React Context)

Nested in `src/app/layout.tsx`:

1. **LocationProvider** (`src/lib/hooks/useLocationDisplay.tsx`) — one `ipapi.co/json/` call, shared via context. Drives region-specific display: `locationConfig.default` ("Berlin, Germany") vs `locationConfig.americas` ("Cuernavaca, Mexico"), and which CV path is used.
2. **ThemeContextProvider** (`src/app/context/theme-context.tsx`) — dark/light theme; the ThemeSwitch UI is commented out in layout.tsx
3. **LanguageContextProvider** (`src/app/context/language-context.tsx`) — `Language = "en" | "de"`, persisted to `localStorage`
4. **ActiveSectionContextProvider** (`src/app/context/active-section-context.tsx`) — provider is mounted but no component currently consumes it (leftover from the pre-tabs scroll layout)

### Internationalization (i18n)

- **Translation files**: `src/lib/translations/` — `en.ts` and `de.ts` are the live locales. `es.ts` still exists on disk but is **dead code**: it is not imported by `index.ts` and Spanish was removed from the `Language` type. Don't add keys to it; delete it rather than reviving it unless Spanish is being deliberately reinstated.
- **Translation system**: `src/lib/translations/index.ts` provides:
  - `getTranslation(key, language)` — nested lookup by dot notation (e.g. `"intro.title"`), falls back to English and warns on a missing key
  - `formatMessage(message, variables)` — variable replacement
  - `translateDate(dateString, language)` — localizes month names and "Present"
- **Usage**: components call `useTranslation()` (`src/lib/hooks/useTranslation.ts`) → `t(key, variables?)`
- **Language switching**: LanguageSelector (flag dropdown in Header, full-name select in Footer). There is **no `?lang=` query param** — switch locales through the selector when verifying.

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*` (configured in tsconfig.json)

```typescript
import { useTranslation } from "@/lib/hooks/useTranslation";
import { experienceData } from "@/lib/data";
```

### Styling Approach

- **Tailwind CSS** with custom theme configuration in `tailwind.config.js`
- **Custom animations**: `tilt`, plus `animate-gradient` on the background blobs
- **HSL color system**: custom color tokens (background, foreground, card, primary, etc.) via CSS variables in `globals.css`
- **Dark mode**: class-based (`darkMode: "class"`)
- **Gradient backgrounds**: fixed-position blurred blobs in layout.tsx

### SEO & Metadata

- **metadataBase**: `https://adrianisanchez.com`, set in layout.tsx so Open Graph/Twitter URLs resolve absolutely
- **Open Graph / Twitter**: static tags in layout.tsx pointing at `/icon.png`. There is no `/api/og` route, no `sitemap.ts`, no JSON-LD, and no Schema.org microdata — don't assume they exist.
- `public/robots.txt` is checked in

### Animation & Interactivity

- **Framer Motion**: used in Intro, Skills, Experience, GithubStars, Projects, SectionDivider
- **Toaster**: react-hot-toast, mounted in layout.tsx
- `react-intersection-observer` is still a dependency but is no longer imported anywhere

### Analytics

- Vercel Analytics and Speed Insights, mounted in layout.tsx

## Important Notes

- **Easter egg**: duck animation appears when `?duck=true` is present
- **Disabled in code**: ThemeSwitch (commented out in layout.tsx), the Projects section (not imported by page.tsx), and the Projects/GitHub Stars entries in the `links` array in data.ts
- **Strict mode enabled**: `reactStrictMode: true` in `next.config.js`
- **No test suite**: the project has no testing setup
- **CVs**: `public/CV-adrian-en-ber.pdf` and `public/CV-adrian-en-mx.pdf` — both English, selected by detected region in `useLocationDisplay`. There is no Spanish CV, and the Download CV button was removed from the UI.

## Adding New Content

1. **New experience/education**: add to `experienceData` or `educationData` in `src/lib/data.ts`
2. **New/changed copy**: update **both** `en.ts` and `de.ts` with matching keys. **This is a hard rule for ANY copy change, not just new content** — a past session shipped an English edit and missed German. Before reporting a content change done: grep the changed key across both files, and check both locales in the browser via the language selector.
3. **New tech stack icons**: add to `TechItem` in `src/lib/types.ts` and make sure the matching icon/logo exists
4. **New tab/section**: create it in `src/app/sections/`, then add it to the `Tab` union and the `tabs` array in `src/app/page.tsx` (adding to `links` in data.ts only affects the Header nav)

## Image Assets

- Company/education logos: `public/images/logos/`
- Profile photo: `public/images/profile-photo.png` (a `.webp` version also exists)
- Project images: `public/images/projects/`
- Duck easter egg: `public/images/duck.png`
