# Codebase Structure

**Analysis Date:** 2026-03-25

## Directory Layout

```
mywebsite/
├── src/                                # Application source code
│   ├── app/                           # Next.js App Router directory
│   │   ├── layout.tsx                 # Root layout with providers
│   │   ├── page.tsx                   # Home page composition
│   │   ├── globals.css                # Global Tailwind CSS styles
│   │   ├── favicon.ico                # Site favicon
│   │   ├── sections/                  # Page section components
│   │   │   ├── Intro.tsx              # Hero/introduction section
│   │   │   ├── Skills.tsx             # Skills display section
│   │   │   ├── Experience.tsx         # Work experience timeline
│   │   │   ├── Education.tsx          # Education history section
│   │   │   └── Projects.tsx           # Projects showcase (disabled)
│   │   ├── components/                # Reusable UI components
│   │   │   ├── Header.tsx             # Top navigation header
│   │   │   ├── Footer.tsx             # Site footer
│   │   │   ├── Card.tsx               # Card wrapper component
│   │   │   ├── LanguageSelector.tsx   # Language switcher
│   │   │   ├── SectionHeading.tsx     # Section title styling
│   │   │   ├── SectionDivider.tsx     # Visual dividers
│   │   │   ├── ThemeSwitch.tsx        # Theme toggle (disabled)
│   │   │   └── DuckAnimation.tsx      # Easter egg animation
│   │   └── context/                   # React Context providers
│   │       ├── language-context.tsx   # Language state & persistence
│   │       ├── active-section-context.tsx  # Section navigation state
│   │       └── theme-context.tsx      # Theme state (light only)
│   └── lib/                           # Utilities, hooks, data
│       ├── data.ts                    # Centralized content data
│       ├── types.ts                   # TypeScript type definitions
│       ├── hooks/                     # Custom React hooks
│       │   ├── useTranslation.ts      # Translation hook
│       │   └── useLocationDisplay.tsx # Location detection hooks
│       └── translations/              # i18n language files
│           ├── index.ts               # Translation engine
│           ├── en.ts                  # English translations
│           ├── de.ts                  # German translations
│           └── es.ts                  # Spanish translations
├── public/                            # Static assets
│   ├── images/
│   │   ├── logos/                     # Company/education logos
│   │   │   ├── innovandio-icon.png
│   │   │   ├── demodesk.svg
│   │   │   ├── setting.svg
│   │   │   ├── almondia.png
│   │   │   └── tu-berlin.png
│   │   ├── projects/                  # Project showcase images
│   │   │   ├── project1.png
│   │   │   └── project2.png
│   │   └── profile-photo.png          # Adrian's profile photo
│   ├── adrianisanchez-cv.pdf          # English CV
│   ├── adriansanchez-curriculum.pdf   # Spanish/Americas CV
│   └── icon.png                       # OG image & favicon
├── .planning/                         # GSD planning documents
│   └── codebase/                      # Architecture analysis docs
├── .claude/                           # Claude Code cache
├── next.config.js                     # Next.js configuration
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── postcss.config.js                  # PostCSS configuration
├── package.json                       # Project dependencies
└── CLAUDE.md                          # Developer instructions
```

## Directory Purposes

**src/app/:**
- Purpose: Next.js App Router pages and layouts
- Contains: Entry points, layouts, page components, context providers, reusable components
- Key files: `layout.tsx`, `page.tsx`, `globals.css`

**src/app/sections/:**
- Purpose: Large reusable content sections
- Contains: React components for Intro, Skills, Experience, Education, Projects
- Key files: `Experience.tsx` (most complex with timeline and tech icons)

**src/app/components/:**
- Purpose: Small reusable UI components
- Contains: Header, Footer, Card wrapper, language selector, section styling
- Key files: All exported as named exports

**src/app/context/:**
- Purpose: React Context providers for global state
- Contains: Language selection, active section tracking, theme toggle, location detection
- Key files: Each exports both Provider component and custom hook

**src/lib/:**
- Purpose: Data, types, hooks, and utility functions
- Contains: Centralized content, type definitions, translation system, custom hooks
- Key files: `data.ts` (content), `types.ts` (TypeScript), `translations/` (i18n)

**src/lib/hooks/:**
- Purpose: Custom React hooks for specific functionality
- Contains: Translation hook, location detection hooks (display + CV selection)
- Key files: `useTranslation.ts`, `useLocationDisplay.tsx`

**src/lib/translations/:**
- Purpose: Internationalization language files
- Contains: Nested translation objects for en/de/es and translation engine
- Key files: `index.ts` (engine), `en.ts`, `de.ts`, `es.ts` (translations)

**public/:**
- Purpose: Static assets served directly
- Contains: Images (logos, projects, profile), CV PDFs, favicon
- Key structure: `/images/logos/` for company logos, `/images/projects/` for projects

**.planning/codebase/:**
- Purpose: GSD architecture and implementation planning documents
- Contains: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md
- Status: Generated by /gsd:map-codebase command

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx` - Root server component defining HTML, metadata, and context providers
- `src/app/page.tsx` - Client component composing all sections into homepage
- `next.config.js` - Next.js runtime configuration (React strict mode enabled)

**Configuration:**
- `tsconfig.json` - TypeScript compiler options with `@/*` path alias to `./src/*`
- `tailwind.config.js` - Tailwind CSS theme (dark mode via class, custom colors)
- `postcss.config.js` - PostCSS plugins (tailwindcss, autoprefixer)
- `package.json` - Dependencies and npm scripts

**Core Logic:**
- `src/lib/data.ts` - All content: experience, education, projects, skills, navigation links
- `src/lib/types.ts` - TypeScript interfaces: Experience, Education, SectionName, TechItem
- `src/lib/translations/index.ts` - Translation engine with `getTranslation()`, `formatMessage()`, `translateDate()`

**Testing:**
- No test files present (project currently has no testing setup)

## Naming Conventions

**Files:**
- React components: PascalCase (e.g., `Experience.tsx`, `LanguageSelector.tsx`)
- Utilities/hooks: camelCase (e.g., `useTranslation.ts`, `useLocationDisplay.tsx`)
- Styles: Match component name (e.g., `globals.css` for global styles)
- Data files: camelCase (e.g., `data.ts`, `types.ts`)
- Translation files: lowercase language code (e.g., `en.ts`, `de.ts`, `es.ts`)

**Directories:**
- Feature-based: lowercase plural (e.g., `sections/`, `components/`, `contexts/`, `translations/`)
- Context providers stored in: `context/` (not `contexts/`)
- Hooks co-located with usage in: `hooks/` under `lib/`

**Exports:**
- React components: Default export (e.g., `export default function Header()`)
- Utilities: Named exports (e.g., `export function useTranslation()`)
- Data: Named const exports with `as const` (e.g., `export const links = [...] as const`)
- Types: Named type/interface exports (e.g., `export type SectionName = ...`)

**Imports:**
- Always use `@/` alias from `tsconfig.json` path mappings
- Example: `import { useTranslation } from "@/lib/hooks/useTranslation"`
- No relative imports (../ paths avoided)

## Where to Add New Code

**New Experience/Education/Skills Entry:**
- Primary location: `src/lib/data.ts`
- Update arrays: `experienceData`, `educationData`, `skillsData`
- Update translations: All three files in `src/lib/translations/` with matching keys
- Example key pattern: `experience.jobs.{jobKey}.title`, `education[0].degree`

**New Section Component:**
- Implementation: `src/app/sections/NewSection.tsx`
- Pattern: Client component marked with `"use client"` at top
- Wrap in: `<Card id="section-id">` in `src/app/page.tsx`
- Register in navigation: Add to `links` array in `src/lib/data.ts` with `SectionName` type
- Add translations: New keys in all three language files

**New UI Component:**
- Implementation: `src/app/components/NewComponent.tsx`
- Pattern: Reusable, no business logic, styled with Tailwind CSS
- Export: Default export as named function
- Type: Define props interface inline if simple, separate file if complex

**New Custom Hook:**
- Implementation: `src/lib/hooks/useNewHook.ts` or `.tsx`
- Pattern: Named export, may return object with functions/values
- Usage: Provide context provider first if managing global state
- Error handling: Throw error if hook used outside required provider

**New Context:**
- Implementation: `src/app/context/new-context.tsx`
- Pattern: Define type, create context, export Provider component and custom hook
- Hook pattern: Check if context is null and throw error
- Integration: Add provider to `src/app/layout.tsx` nesting order

**New Translation Keys:**
- Update all files: `src/lib/translations/en.ts`, `de.ts`, `es.ts` simultaneously
- Key structure: Use dot notation for nesting (e.g., `experience.jobs.jobName.title`)
- Consistency: All three files must have matching key structure
- Fallback: Missing keys in de/es will fall back to en automatically

**New Tech Stack Item:**
- Update type: Add to `TechItem` union type in `src/lib/types.ts`
- Add icon mapping: Add case to `getTechIcon()` switch in `Experience.tsx`
- Add to data: Reference in experience entries in `src/lib/data.ts`

**New Static Asset:**
- Logo images: `public/images/logos/` with descriptive names
- Project images: `public/images/projects/`
- PDFs: `public/` root directory
- Profile/avatar: `public/images/` directory
- Next.js Image component: Use `unoptimized={true}` if optimization issues occur

## Special Directories

**src/app/:**
- Purpose: Next.js App Router directory
- Generated: No (source code)
- Committed: Yes

**.next/:**
- Purpose: Next.js build output and cache
- Generated: Yes (automatically during `npm run build`)
- Committed: No (.gitignore)

**node_modules/:**
- Purpose: Dependency installations
- Generated: Yes (via `npm install`)
- Committed: No (.gitignore)

**.claude/:**
- Purpose: Claude Code language server cache
- Generated: Yes (by Claude)
- Committed: No (.gitignore)

**public/:**
- Purpose: Static assets with direct HTTP access
- Generated: No (manually maintained)
- Committed: Yes (images and PDFs)

**.planning/codebase/:**
- Purpose: GSD analysis and planning documents
- Generated: Yes (via /gsd:map-codebase and /gsd:plan-phase)
- Committed: Recommended

---

*Structure analysis: 2026-03-25*
