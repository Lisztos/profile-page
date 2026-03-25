# Technology Stack

**Analysis Date:** 2026-03-25

## Languages

**Primary:**
- TypeScript 5.x - Frontend and full codebase
- JSX/TSX - React component syntax

**Secondary:**
- CSS/Tailwind - Styling

## Runtime

**Environment:**
- Node.js 24.13.0 (verified in environment)

**Package Manager:**
- npm (npm 10.x inferred from package-lock.json)
- Lockfile: `package-lock.json` present (lockfileVersion 3)

## Frameworks

**Core:**
- Next.js 16.1.1 - Full-stack React framework with App Router
  - Turbopack for development bundling (`npm run dev --turbopack`)
  - Built-in image optimization via next/image
  - Dynamic OG image generation via next/og

**UI & State:**
- React 19.0.0 - UI library
- React DOM 19.0.0 - DOM rendering

**Animation & Interactivity:**
- Framer Motion 12.6.2 - Scroll animations and transitions
- react-intersection-observer 9.16.0 - Viewport detection for scroll animations
- react-hot-toast 2.5.2 - Toast notifications

**Styling:**
- Tailwind CSS 3.4.17 - Utility-first CSS framework
- PostCSS 8.5.3 - CSS processing
- Autoprefixer 10.4.21 - Browser prefixing

**Icons & Assets:**
- @heroicons/react 2.2.0 - SVG icon library
- react-icons 5.5.0 - Multiple icon sets (Font Awesome, Feather, etc.)
- country-flag-icons 1.5.19 - Country flag components

**Testing:**
- Not configured - No test framework present

**Build/Dev:**
- TypeScript 5.x - Type checking
- ESLint 9.x - Code linting
- @types/react 19.x - React type definitions
- @types/react-dom 19.x - React DOM type definitions
- @types/node 20.x - Node.js type definitions

## Key Dependencies

**Critical:**
- next 16.1.1 - Core framework enabling server-side rendering, API routes, and optimizations
- react 19.0.0 - Why it matters: React 19 includes features like Actions and Server Components support
- framer-motion 12.6.2 - Why it matters: Provides scroll-triggered animations throughout the portfolio
- react-hot-toast 2.5.2 - Why it matters: Toast notifications for user feedback (e.g., location detection status)

**Infrastructure:**
- @vercel/analytics 1.5.0 - Performance and event tracking
- @vercel/speed-insights 1.2.0 - Web vitals monitoring and performance metrics

**Utilities:**
- clsx 2.1.1 - Conditional class name utility
- country-flag-icons 1.5.19 - Flag rendering for location display

## Configuration

**Environment:**
- `.env` file present (currently empty - no secrets required for local development)
- Environment-based behavior: Location-based CV selection via `useLocationDisplay` hook

**Build:**
- `next.config.js` - Minimal configuration with React Strict Mode enabled
- `tsconfig.json` - TypeScript compiler options:
  - Target: ES2017
  - Module Resolution: bundler
  - Path alias: `@/*` maps to `./src/*`
  - Strict mode: true
- `tailwind.config.js` - Custom theme with HSL color variables and animations
- `postcss.config.js` - PostCSS configuration for Tailwind
- `eslint.config.mjs` - ESLint configuration (flat config format)

**Fonts:**
- Google Fonts - Inter font family (latin subset)

## Platform Requirements

**Development:**
- Node.js 24.13.0+
- npm 10.x
- Git (for version control)

**Production:**
- Deployment target: Vercel (inferred from `@vercel/analytics` and `@vercel/speed-insights` integration)
- No build-time secrets required
- No database or external services required for core functionality

## Browser Support

- Modern browsers supporting ES2017
- CSS variables for theming (not IE11 compatible)
- Intersection Observer API for scroll detection

---

*Stack analysis: 2026-03-25*
