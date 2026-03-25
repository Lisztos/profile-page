# Architecture

**Analysis Date:** 2026-03-25

## Pattern Overview

**Overall:** Multi-layer component-based architecture using Next.js App Router with React Context for global state management.

**Key Characteristics:**
- Client-side rendered sections wrapped in Server-Side Layout entry point
- Context-based state management for language, theme, active section, and location detection
- Centralized data storage with type-safe TypeScript interfaces
- Translation layer abstraction supporting English, German, and Spanish
- Modular section components with composition via Card wrapper

## Layers

**Application Layer (Entry & Layout):**
- Purpose: Bootstrap application, configure global context providers, define SEO metadata, inject analytics
- Location: `src/app/layout.tsx`, `src/app/page.tsx`
- Contains: Root HTML structure, metadata, context provider nesting, background animations, global styles
- Depends on: Context providers, Footer, Header, Section components
- Used by: Next.js runtime

**Page/Composition Layer:**
- Purpose: Orchestrate major sections into a cohesive page layout
- Location: `src/app/page.tsx` (client component)
- Contains: Section imports, Card wrappers, DuckAnimation conditional rendering, layout structure
- Depends on: Section components, Card component, utility hooks
- Used by: Layout (as children)

**Section Components Layer:**
- Purpose: Render major content sections (Intro, Skills, Experience, Education, Projects)
- Location: `src/app/sections/` directory
- Contains: `Intro.tsx`, `Experience.tsx`, `Skills.tsx`, `Education.tsx`, `Projects.tsx`
- Depends on: Data layer, translation hooks, location hooks, context hooks, Framer Motion, UI components
- Used by: Page composition layer

**Context & State Management Layer:**
- Purpose: Provide global state and hooks for language selection, theme, active section tracking, location detection
- Location: `src/app/context/` directory
- Contains:
  - `language-context.tsx` - Language state with localStorage persistence (en/es/de)
  - `active-section-context.tsx` - Section highlight tracking for navigation
  - `theme-context.tsx` - Theme state (currently locked to light mode)
  - `useLocationDisplay.tsx` - Location detection via IP API and geographic routing
- Depends on: React Context API, localStorage, external location API (ipapi.co)
- Used by: Layout providers, all client sections

**Data Layer:**
- Purpose: Centralized content storage and configuration
- Location: `src/lib/data.ts`
- Contains:
  - Navigation links array (`links`)
  - Experience entries (`experienceData`) with translations keys, tech stacks, dates
  - Education entries (`educationData`)
  - Projects data (`projectsData`)
  - Skills list (`skillsData`)
  - Location configuration (`locationConfig`, `americasCountries`)
- Depends on: Type definitions
- Used by: All sections, hooks, context providers

**Translation Layer:**
- Purpose: Manage internationalization with support for English, German, Spanish
- Location: `src/lib/translations/` directory
- Contains:
  - Language files: `en.ts`, `de.ts`, `es.ts` (nested translation objects)
  - Translation engine: `index.ts` with `getTranslation()`, `formatMessage()`, `translateDate()`
  - Hook: `useTranslation.ts` provides `t()` function scoped to current language
- Depends on: Language context, type definitions
- Used by: All components rendering user-facing text

**Type System Layer:**
- Purpose: Centralized TypeScript interfaces and types
- Location: `src/lib/types.ts`
- Contains:
  - `SectionName` - Union type for navigable sections (Home, Projects, Skills, Experience, Education)
  - `TechItem` - Union type for tech stack tags (rails, postgresql, vue, aws, etc.)
  - `ExperienceItem` interface - Structure for job entries
  - `EducationItem` interface - Structure for education entries
- Depends on: None
- Used by: Data layer, context providers, section components

**UI Component Layer:**
- Purpose: Reusable UI building blocks
- Location: `src/app/components/` directory
- Contains:
  - `Card.tsx` - Card wrapper with consistent styling and shadow
  - `Header.tsx` - Fixed navigation header with language selector
  - `Footer.tsx` - Site footer with social links and copyright
  - `LanguageSelector.tsx` - Language switcher component
  - `SectionHeading.tsx` - Section title styling
  - `SectionDivider.tsx` - Visual divider between sections
  - `ThemeSwitch.tsx` - Theme toggle (disabled)
  - `DuckAnimation.tsx` - Easter egg animation
- Depends on: React, Tailwind CSS, react-icons
- Used by: Layout, sections, other components

**Hooks/Utilities Layer:**
- Purpose: Custom hooks and helpers for cross-cutting concerns
- Location: `src/lib/hooks/` directory
- Contains:
  - `useTranslation.ts` - Hook returning `t()` function for translations
  - `useLocationDisplay.tsx` - Hooks for `useLocationDisplay()`, `useCVSelection()`, location context
- Depends on: Context providers, translation system
- Used by: All components needing translations or location-aware behavior

## Data Flow

**Page Load & Initialization:**

1. `src/app/layout.tsx` (server component) renders root HTML and injects context providers
2. Providers nest in order: `LocationProvider` → `ThemeContextProvider` → `LanguageContextProvider` → `ActiveSectionContextProvider` → Layout children
3. `LocationProvider` initiates geolocation API call (`ipapi.co/json/`) to detect user country
4. Children components mount and subscribe to context hooks

**Language Selection Flow:**

1. User selects language via `LanguageSelector` component in Header
2. `setLanguage()` updates `LanguageContext` state
3. Language persists to localStorage
4. All components using `useTranslation()` hook re-render with new language
5. `translateDate()` function converts month names and "Present" text

**Section Navigation Flow:**

1. User clicks navigation link (in Header via `links` array from data.ts)
2. `ActiveSectionContextProvider` updates `activeSection` state via `setActiveSection()`
3. Navigation UI highlights active section
4. Scroll-to-section behavior triggered (via `id` anchors and Framer Motion)

**CV Download Flow:**

1. User clicks download button in Intro or Experience sections
2. `useCVSelection()` hook determines CV path based on location (Americas vs Default)
3. If user location in Americas list, serves `/adriansanchez-curriculum.pdf`
4. Otherwise serves `/adrianisanchez-cv.pdf`
5. User confirms dialog box (bot prevention)
6. File downloads via temporary DOM link element

**Dynamic OG Image Generation:**

- Currently using static Open Graph images (`/icon.png` from public folder)
- Infrastructure in place for dynamic route at `src/app/api/og/route.tsx` (per CLAUDE.md) but not yet implemented

**State Management:**

- **Global state:** Language, theme, active section, location detection results
- **Component state:** Local animations, hand wave timing, mounted flags for hydration
- **Persistence:** Language preference stored in localStorage, location detection cached for session
- **Cross-component communication:** Via React Context only (no prop drilling for state)

## Key Abstractions

**Section Component Pattern:**

- Purpose: Standardized component structure for major content areas
- Examples: `src/app/sections/Experience.tsx`, `src/app/sections/Intro.tsx`
- Pattern:
  - All wrapped in `<Card id="section-name" />` container
  - All use `useTranslation()` hook for text
  - All use Framer Motion for entrance animations
  - All use data from centralized `src/lib/data.ts`
  - All render translations via nested `t()` calls with dot notation keys

**Translation Key Structure:**

- Purpose: Hierarchical organization of translation strings
- Examples: `intro.title`, `experience.jobs.innovandio.title`, `months.january`
- Pattern: Dot notation accessed via `getTranslation(key, language)` function
- Fallback: Missing translations fall back to English version

**Context Provider Composition:**

- Purpose: Clean global state management without prop drilling
- Pattern: Each context exports both Provider component and custom hook
- Example: `LanguageContextProvider` + `useLanguage()` hook
- Rule: Hooks throw error if used outside provider to catch misconfiguration

**Tech Stack Icon Mapping:**

- Purpose: Display technology icons in experience sections
- Pattern: Switch statement in `Experience.tsx` maps `TechItem` string values to `react-icons` components
- Config in: `src/lib/types.ts` defines available TechItem values
- Usage: Icons rendered from array in experience data entries

**Location Detection as Context:**

- Purpose: Single API call to geo-detection shared across entire app
- Pattern: `LocationProvider` wraps app, `useLocationContext()` provides cached results
- Implementation: Detects country code, checks against `americasCountries` array from data.ts
- Fallback: Defaults to Berlin on API failure or error

## Entry Points

**Main App Entry:**
- Location: `src/app/page.tsx` (Client component)
- Triggers: Next.js app router, accessed at `/`
- Responsibilities: Compose sections into full page layout, conditionally render easter egg duck

**Root Layout Entry:**
- Location: `src/app/layout.tsx` (Server component)
- Triggers: Next.js app router for all routes
- Responsibilities: Define HTML structure, configure metadata/SEO, inject context providers, define global styles and animations

**Development Server:**
- Command: `npm run dev` (runs `next dev --turbopack`)
- Port: http://localhost:3000
- Note: Uses Turbopack for faster builds

## Error Handling

**Strategy:** Fail-safe defaults with console warnings for non-critical failures.

**Patterns:**

- **Translation missing:** Console warning logged, falls back to English, returns key as string if English also missing
- **Location detection failure:** Logs warning to console, sets `isLoading = true`, uses default location (Berlin)
- **Context misuse:** Throws error if context hooks used outside provider (strict mode)
- **CV download:** Shows browser confirmation dialog to prevent automated downloads
- **Location API timeout:** Wrapped in try-catch, errors caught and logged without breaking page

## Cross-Cutting Concerns

**Logging:** Console.warn() used only for non-fatal errors (missing translations, location API failures). No structured logging framework.

**Validation:** TypeScript strict mode provides compile-time validation. Runtime validation minimal - relies on `as const` data structures for type safety.

**Authentication:** None. Site is public portfolio with no protected routes.

**Internationalization:** Three-language support (en/de/es) via context + translation files. Language preference persists to localStorage. Fallback to English.

**Location-aware content:** Single geolocation API call cached in context. Used to display location string and select CV version.

**Animations:** Framer Motion used throughout for:
- Section entrance animations (opacity, transform, stagger)
- Timeline animations in Experience section
- Hand wave on Intro section
- Smooth scrolling (via `scroll-smooth` class on HTML)

---

*Architecture analysis: 2026-03-25*
