# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS. The site showcases Adrian Sanchez's professional experience, skills, and education with a modern, product-style design featuring internationalization (i18n) support for English, German, and Spanish.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

Development server runs at http://localhost:3000

## Architecture & Key Patterns

### App Structure (Next.js App Router)

- **Main entry**: `src/app/page.tsx` - Client component composing all sections
- **Layout**: `src/app/layout.tsx` - Root layout with metadata, SEO (Open Graph, Twitter, JSON-LD), and context providers
- **Sections**: `src/app/sections/` - Major page sections (Intro, Experience, Skills, Education)
- **Components**: `src/app/components/` - Reusable UI components (Header, Footer, TrustedBy, Stats, Capabilities, etc.)
- **API Routes**: `src/app/api/og/route.tsx` - Dynamic Open Graph image generation using `next/og`

### Data & Type System

- **Central data**: `src/lib/data.ts` - All content data (experience, education, skills, navigation links, location config)
- **Type definitions**: `src/lib/types.ts` - TypeScript interfaces for Experience, Education, SectionName, TechItem
- Data exports use `as const` for type safety and to enable TypeScript literal types

### Context Providers (React Context)

The app uses multiple context providers for global state, nested in `src/app/layout.tsx`:

1. **LocationProvider** (`src/lib/hooks/useLocationDisplay.tsx`) - Detects user's geographic location to display region-specific content (e.g., "Berlin, Germany" vs "Mexico City, Mexico")
2. **ThemeContextProvider** (`src/app/context/theme-context.tsx`) - Dark/light theme management (currently disabled in UI)
3. **LanguageContextProvider** (`src/app/context/language-context.tsx`) - Language selection (en/de/es)
4. **ActiveSectionContextProvider** (`src/app/context/active-section-context.tsx`) - Tracks which section is currently in viewport for navigation highlighting

### Internationalization (i18n)

- **Translation files**: `src/lib/translations/` with `en.ts`, `de.ts`, `es.ts`
- **Translation system**: `src/lib/translations/index.ts` provides:
  - `getTranslation(key, language)` - Fetches nested translations using dot notation (e.g., "intro.title")
  - `formatMessage(message, variables)` - Variable replacement in translation strings
  - `translateDate(dateString, language)` - Localizes month names and "Present"
- **Usage**: Components use `useTranslation()` hook (`src/lib/hooks/useTranslation.ts`) which returns `t(key, variables?)` function
- **Language switching**: LanguageSelector component in Header

### Path Aliases

TypeScript path alias `@/*` maps to `./src/*` (configured in tsconfig.json)

```typescript
import { useTranslation } from "@/lib/hooks/useTranslation";
import { experienceData } from "@/lib/data";
```

### Styling Approach

- **Tailwind CSS** with custom theme configuration in `tailwind.config.js`
- **Custom animations**: `tilt` animation for subtle rotation effects
- **HSL color system**: Custom color tokens (background, foreground, card, primary, etc.) defined via CSS variables
- **Dark mode**: Class-based dark mode (`darkMode: ["class", "class"]`)
- **Gradient backgrounds**: Fixed positioned animated gradient blobs in layout.tsx

### SEO & Metadata

- **metadataBase**: Set to `https://adrianisanchez.com` in layout.tsx for absolute URLs in Open Graph/Twitter tags
- **Dynamic OG images**: `/api/og` route generates 1200x630 images
- **JSON-LD structured data**: Person and WebSite schemas embedded in layout.tsx
- **Sitemap**: Generated via `src/app/sitemap.ts`
- **Microdata**: Schema.org Person properties in page.tsx

### Animation & Interactivity

- **Framer Motion**: Used for scroll animations and transitions
- **react-intersection-observer**: Detects when sections enter viewport
- **Toaster**: react-hot-toast for notifications

### Analytics

- Vercel Analytics and Speed Insights integrated in layout.tsx

## Important Notes

- **Easter egg**: Duck animation appears when `?duck=true` query param is present
- **Commented sections**: ThemeSwitch component and Projects section are currently disabled in code
- **Strict mode enabled**: React StrictMode is active in Next.js config
- **No test suite**: Project currently has no testing setup
- **CV downloads**: PDF resumes available in `public/` (English and Spanish versions)

## Adding New Content

1. **New experience/education**: Add to `experienceData` or `educationData` arrays in `src/lib/data.ts`
2. **New translations**: Update all three language files (`en.ts`, `de.ts`, `es.ts`) with matching keys
3. **New tech stack icons**: Add to TechItem type in `src/lib/types.ts` and ensure corresponding icon/logo exists
4. **New sections**: Create in `src/app/sections/`, import in `page.tsx`, add to `links` array in data.ts for navigation

## Image Assets

- Company/education logos: `public/images/logos/`
- Profile photo: `public/images/profile-photo.png`
- Project images: `public/images/projects/`
