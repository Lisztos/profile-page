# Technology Stack

**Project:** Adrian Sanchez Portfolio — Dashboard Milestone
**Researched:** 2026-03-25
**Confidence:** MEDIUM (external tool access blocked; findings from training data through August 2025 with version notes flagged)

## Context

This is a **brownfield additive milestone** on an existing Next.js 16 / React 19 / TypeScript / Tailwind CSS / Framer Motion stack. The constraint from PROJECT.md is firm: no new major frameworks. Every recommendation below fits inside that constraint.

The goal is interactive dashboard-style cards, impact metric visualizations, and an AI projects showcase section — all statically deployable to Vercel.

---

## Recommended Stack (Additive)

### Data Visualization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Recharts | ^2.13.x | Bar, radar, area charts for skill/impact visualizations | Best React 19 compatibility. Fully composable, renders as SVG, zero canvas dependency. Works at build time without a server. Tailwind-friendly via `stroke` and `fill` props. Largest ecosystem of React charting libraries. |

**Why not Tremor:** Tremor v3+ moved to a "blocks" model that requires their full component system. Too opinionated, creates style conflict with existing Tailwind HSL token setup.

**Why not Victory:** Heavier bundle, slower render for simple portfolio use cases.

**Why not D3 directly:** Too much manual work for standard bar/radar/line charts. Recharts wraps D3 appropriately.

**Why not Chart.js / react-chartjs-2:** Canvas-based rendering is harder to style consistently with CSS variables. SVG (Recharts) respects Tailwind dark mode class toggles better.

### Dashboard UI Components

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui (selective copy-paste) | Latest (CLI-installed) | Card, Badge, Progress, Separator primitives for dashboard cards | Copy-paste model means no bundle weight for unused components. Built on Radix UI primitives for accessibility. Generates Tailwind classes that slot into the existing HSL color token system in `tailwind.config.js`. No new design system conflict. |

**Installation note:** shadcn/ui is not installed as a package dependency — it's a CLI tool (`npx shadcn@latest add card badge progress`) that copies component source into `src/components/ui/`. Only add the specific primitives needed.

**Why not Radix UI directly:** shadcn/ui is already the standard wrapper for Radix in the React ecosystem. Saves boilerplate.

**Why not Headless UI:** Less feature-rich than Radix, smaller ecosystem, fewer accessible primitives.

**Why not MUI / Chakra:** Both impose a full design system that would conflict with the existing Tailwind HSL custom theme. Bundle size is also excessive for a portfolio.

### Animation — Extend Existing Framer Motion

No new library needed. Framer Motion 12.6.2 is already installed and handles:
- Animated number counters (via `useMotionValue` + `useSpring` + `useTransform`)
- Card hover lift effects (`whileHover`)
- Staggered grid entrance (`staggerChildren`)
- Progress bar fills on scroll intersection (combine with existing `react-intersection-observer`)

The existing pattern in `src/app/sections/` already uses Framer Motion for scroll animations. Dashboard components should follow the same pattern.

### Animated Counters for Impact Stats

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Use Framer Motion only | (existing) | Count-up animation for impact metric numbers | `useMotionValue` + `useSpring` achieves smooth count-up with one-time scroll trigger. No extra dependency needed. Pattern well-documented in Framer Motion ecosystem. |

**Alternative if Framer Motion count-up is too complex to implement:** `react-countup ^6.5.x` — ~8KB, zero dependencies, integrates with IntersectionObserver for scroll-triggered starts. Add only if the Framer Motion approach is judged too complex during implementation.

### Icon Expansion for AI Ecosystem

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-icons | ^5.5.0 (existing) | AI/ML tool icons | Already installed. SiOpenai, SiHuggingface, SiLangchain, SiPytorch, SiTensorflow all available in react-icons `si` (Simple Icons) set. No new dependency needed. |

**Action:** Extend `TechItem` union type in `src/lib/types.ts` and add icon mappings in the existing switch statement pattern.

### CSS Utilities — No Changes

The existing setup (`tailwind.config.js` with HSL CSS variables, `clsx`) is sufficient. Dashboard-style cards use the same `bg-[hsl(var(--card))]` pattern already established. No new CSS utility library needed.

---

## Supporting Libraries (Optional / Conditional)

| Library | Version | Purpose | When to Add |
|---------|---------|---------|-------------|
| react-countup | ^6.5.x | Animated number counter for impact stats | Only if Framer Motion count-up implementation is impractical |
| @radix-ui/react-tooltip | ^1.1.x | Tooltips on chart data points or AI project cards | If charts need data labels on hover beyond Recharts' built-in tooltip |

---

## What NOT to Add

| Library | Why Not |
|---------|---------|
| Tremor | v3+ requires full Tremor component ecosystem; conflicts with existing Tailwind HSL token system |
| Victory Charts | Heavier bundle than Recharts, less React 19 compatibility testing |
| Chart.js / react-chartjs-2 | Canvas rendering is inconsistent with CSS variable theming; SVG preferred |
| MUI / Chakra UI | Full design system import; conflicts with existing Tailwind theme; ~100KB+ bundle addition |
| Zustand / Jotai | State management overkill — portfolio has no server state. Existing React Context handles language/theme/section. |
| React Query / SWR | No server fetching needed — all data is static. Don't add async fetching infrastructure. |
| Three.js / WebGL | Performance risk on mobile; no visual payoff that justifies complexity for recruiter audience |
| Lottie animations | Additional bundle weight; Framer Motion already handles micro-interactions |
| next-intl / i18next | Full i18n library replacement — existing translation system works and must not be replaced mid-milestone |

---

## Installation

```bash
# Data visualization
npm install recharts

# shadcn/ui setup (one-time CLI init if not already done)
npx shadcn@latest init
# Then add specific primitives as needed:
npx shadcn@latest add card badge progress separator
```

**shadcn/ui init note:** Running `npx shadcn@latest init` will ask about your Tailwind config and color system. Select "custom" and point to the existing HSL variables already in `tailwind.config.js`. This preserves the current design tokens.

---

## Version Confidence Notes

| Library | Confidence | Note |
|---------|------------|------|
| Recharts ^2.13.x | MEDIUM | Version known as of August 2025; verify latest with `npm info recharts version` before installing |
| shadcn/ui | MEDIUM | shadcn/ui is CLI-installed and always pulls latest components; no pinned package version |
| react-countup ^6.5.x | LOW | Verify version before use if added; training data may be stale on minor version |
| react-icons ^5.5.0 | HIGH | Already installed at this version in the project |
| Framer Motion 12.6.2 | HIGH | Already installed; version confirmed from codebase STACK.md |

---

## Compatibility Validation

| Concern | Assessment | Action |
|---------|------------|--------|
| Recharts + React 19 | Recharts 2.x targets React 18 but works with React 19 in compatibility mode | Test render after install; if peer dependency warning, add `--legacy-peer-deps` |
| shadcn/ui + Tailwind 3.x | shadcn/ui v2 targets Tailwind 3; Tailwind 4 requires shadcn/ui canary | Project uses Tailwind 3.4.17 — standard `npx shadcn@latest init` is compatible |
| Framer Motion 12 + React 19 | Framer Motion 12.x explicitly supports React 19 | Already in use, no concern |

---

## Sources

- Codebase STACK.md: confirmed existing dependency versions
- Codebase ARCHITECTURE.md: confirmed component patterns and data flow
- Training data (August 2025 cutoff): Recharts ecosystem, shadcn/ui model, Framer Motion API
- Confidence on versions: MEDIUM — external verification blocked during research session; recommend `npm info [package] version` check before each install
