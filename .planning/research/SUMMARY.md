# Project Research Summary

**Project:** Adrian Sanchez Portfolio — Dashboard Milestone
**Domain:** Senior developer portfolio with dashboard/app aesthetic and AI showcase
**Researched:** 2026-03-25
**Confidence:** MEDIUM

## Executive Summary

This milestone adds a dashboard-style redesign and AI skills showcase to an existing, well-structured Next.js 15 / React 19 / TypeScript / Tailwind CSS / Framer Motion portfolio. The existing architecture is sound and does not need structural changes — new work fits cleanly within the established layer model (data in `src/lib/data.ts`, UI copy in translation files, rendering in section components). The core recommendation is to build additively: extend existing sections, introduce four to six new components, and maintain every architectural invariant already in place rather than refactoring the foundation during this milestone.

The recommended approach is to add Recharts for any chart-based visualizations (lazy-loaded via `next/dynamic` to avoid bundle bloat) and shadcn/ui Card/Badge/Progress primitives via the CLI copy-paste model, keeping bundle additions minimal. Framer Motion is already installed and handles all animation needs including animated number counters. The single highest-leverage improvement relative to effort is the hero stats bar combined with AI skills added to the existing Skills section — both are above-the-fold changes that directly address the recruiter 10-second scan pattern and the gap in AI skill visibility.

The primary risks are performance regression from charting library bloat, visual noise from overengineered dashboard chrome that buries the person behind the portfolio, and credibility damage from AI skill badges that lack supporting project evidence. All three risks are preventable through build-order discipline: establish information hierarchy and content strategy before implementing any visual component, and compute derived metrics from structured data rather than hardcoding them.

---

## Key Findings

### Recommended Stack

The milestone is constrained to additive changes on the existing stack. No new major frameworks. Two net-new library additions are warranted: Recharts (`^2.13.x`) for SVG-based data visualization (lazy-loaded, React 19 compatible, Tailwind-friendly), and shadcn/ui component primitives installed via CLI (Card, Badge, Progress, Separator) which slot into the existing HSL color token system without design system conflict. Everything else — animations, icons, CSS utilities, state management — is already covered by installed dependencies.

**Core technologies:**
- Recharts `^2.13.x`: SVG data visualization — best React 19 compatibility, no canvas conflicts with Tailwind dark mode
- shadcn/ui (CLI-installed): Card/Badge/Progress primitives — copy-paste model, zero bundle weight for unused components, compatible with existing Tailwind 3.4.x
- Framer Motion 12.6.2 (existing): All animation needs including animated number counters via `useMotionValue` + `useSpring`
- react-icons `^5.5.0` (existing): AI/ML brand icons — `SiOpenai`, `SiHuggingface`, `SiLangchain`, `SiPytorch` already available in the `si` set
- react-countup `^6.5.x` (conditional): Add only if Framer Motion count-up implementation is judged too complex during build

**What not to add:** Tremor (design system conflict), Chart.js (canvas rendering), MUI/Chakra (bundle weight + theme conflict), Zustand/React Query (no server state needed), Three.js (mobile performance risk), next-intl (must not replace existing translation system mid-milestone).

### Expected Features

The existing portfolio already covers all table stakes except two critical gaps: AI/ML skills are entirely absent from the skills section (a meaningful gap for a senior engineer in 2026), and impact metrics exist only as buried prose rather than scannable anchors.

**Must ship this milestone:**
- AI skills added to existing Skills section — immediate keyword match improvement, no new architecture required
- Hero stats bar — "5+ Years / 4 Companies / 3 Languages" as scannable stat tiles above or below the bio
- Dashboard/app-style card layout overhaul — grid containers, visual hierarchy, SaaS aesthetic
- Dedicated AI Projects section — re-activates hidden `Projects.tsx` infrastructure, surfaces AI work as a specialty
- Tech breadth grouping in Skills — Backend / Cloud / AI/ML category labels on flat icon grid

**Should have (but can defer):**
- Availability/open-to-work signal — Calendly CTA partially covers this; not blocking
- Interactive expandable experience bullets — micro-interaction polish, scope risk

**Defer entirely:**
- Interactive AI chatbot/LLM demo — API cost, maintenance burden, security surface
- Dark mode toggle — currently disabled for reason; explicitly out of this milestone scope
- GitHub contribution graph — API dependency, can look sparse
- Animated skill progress bars with percentage — perceived as untrustworthy by experienced recruiters
- Blog section, separate project pages, real-time stats widgets

### Architecture Approach

The existing single-column card-per-section layout in `page.tsx` is extended to include a `DashboardGrid` wrapper that creates responsive card grids for stat tiles and AI skill highlights. All new sections follow the established pattern exactly: `"use client"` client component in `src/app/sections/`, reads from `src/lib/data.ts`, uses `useTranslation()` for all UI text, wraps in `<section>` element, receives `<Card>` wrapper in `page.tsx`. New card-level components are dumb (props-only); container sections own data iteration.

**Major new components:**
1. `StatsBar` (`components/StatsBar.tsx`) — Row of impact metric tiles inside Intro, maps `metricsData` to `MetricCard`
2. `MetricCard` (`components/MetricCard.tsx`) — Single stat tile, props-only, index-based Framer Motion stagger
3. `DashboardGrid` (`components/DashboardGrid.tsx`) — Responsive grid layout wrapper
4. `AIProjectCard` (`components/AIProjectCard.tsx`) — Single AI project showcase card, props-only
5. `AIProjects` (`sections/AIProjects.tsx`) — Section container, maps `aiProjectsData` to `AIProjectCard`
6. `TechBadge` (`components/TechBadge.tsx`) — Pill badge for AI tech labels, reused across sections

**Seven architectural invariants that must not be violated:** all user-facing text through `useTranslation()`, all content data in `data.ts`, all imports via `@/` alias, all new sections use `"use client"`, all animations use `whileInView` + `viewport={{ once: true }}`, new `TechItem` values added to `types.ts` before use, `Card` wrapper applied in `page.tsx` not inside section files.

### Critical Pitfalls

1. **Chart library bundle bloat** — Recharts is ~300KB gzipped; importing even one chart pulls the full library without explicit lazy-loading. Prevention: use `next/dynamic` with `{ ssr: false }` for any chart components; prefer CSS/Tailwind stat cards over charts for simple 1–3 data points.

2. **Dashboard visual noise obscures the person** — Card grids and metric widgets look impressive in screenshots but fail the recruiter 10-second scan test. Prevention: apply "scan test" filter to every new component; limit hero to one stat per category; keep large type and short labels, not charts.

3. **AI skills read as buzzword padding** — Listing "LLMs, RAG, Agents" at the same visual weight as 5-year production technologies erodes credibility. Prevention: visually separate AI skills from proven production technologies; every AI skill must map to a concrete experience bullet or project card.

4. **i18n coverage gaps in new sections** — The existing translation system silently falls back to the key name. Prevention: write all three language files (`en.ts`, `de.ts`, `es.ts`) simultaneously for every new section; treat "all three languages complete" as a Definition of Done checkpoint.

5. **Dead code collision with existing Projects.tsx** — The existing Projects section is commented out in both `page.tsx` and `data.ts`. Building an `AIProjects` section alongside without resolving the disabled original creates irreconcilable dead code. Prevention: make a single explicit decision (extend, replace, or delete `Projects.tsx`) before building the AI Projects section.

6. **Icon switch statement proliferation** — Three separate switch-statement icon mappers already exist; adding 5–8 AI skill icons risks inconsistency across files. Prevention: centralize icon config to a single `src/lib/icons.ts` map before adding AI skills.

---

## Implications for Roadmap

Based on the combined research, a 5-phase build order emerges from hard dependencies and risk sequencing.

### Phase 1: Foundation and Data Layer
**Rationale:** All new components depend on types and data being correct first. TypeScript will catch violations at build time, making foundation errors immediately visible. This phase has no external dependencies and creates no visible UI change — safe to do first.
**Delivers:** Extended `TechItem` union, new `SectionName` values, `metricsData` and `aiProjectsData` arrays in `data.ts`, translation key skeletons in all three language files, `src/lib/icons.ts` centralized icon config
**Addresses:** FEATURES.md AI skill coverage gap; FEATURES.md feature dependencies (data required before any UI)
**Avoids:** Pitfall 7 (switch statement proliferation — refactor icon system here before adding AI skills); Pitfall 4 (i18n gaps — establish key structure first)

### Phase 2: AI Skills Integration
**Rationale:** AI skills added to the existing Skills section is the highest-leverage, lowest-risk change. It extends an existing section with no new architecture, delivers immediate keyword visibility, and validates the icon system refactor from Phase 1.
**Delivers:** AI/ML skill subsection with labeled divider in Skills section, icon mappings for OpenAI, Anthropic, LangChain, Hugging Face and others, complete translations in en/de/es
**Addresses:** FEATURES.md "AI/ML skills visible in stack" (critical gap); FEATURES.md tech breadth grouping
**Avoids:** Pitfall 3 (buzzword padding — content strategy must precede implementation; only skills with backing evidence added); Pitfall 11 (near-black icon visibility in dark mode)

### Phase 3: Dashboard Layout and Impact Metrics
**Rationale:** The dashboard layout overhaul and stats bar belong together because they share the same visual language decision. The stats bar lives inside Intro; the DashboardGrid wraps optional metric tiles below it. Establishing information hierarchy before any visual polish prevents the "dashboard obscures the person" failure mode.
**Delivers:** `StatsBar`, `MetricCard`, `DashboardGrid` components; impact metrics derived from `experienceData` where possible; hero stats visible above the fold; card grid visual language established for remaining sections
**Uses:** Framer Motion existing (animated number counters); shadcn/ui Card/Progress primitives; CSS/Tailwind stat cards preferred over Recharts for simple values
**Avoids:** Pitfall 2 (visual noise — hierarchy established before chrome); Pitfall 1 (bundle bloat — no charts in above-the-fold hero area); Pitfall 8 (stale hardcoded metrics — compute from experienceData); Pitfall 9 (mobile layout — design at 375px width explicitly)

### Phase 4: AI Projects Section
**Rationale:** The AI Projects section depends on Phases 1–2 being complete (data arrays, translation keys, AI skills context established). It also requires resolving the dead code around the existing Projects.tsx before building. This is the most content-dependent phase — project data quality determines section quality.
**Delivers:** `AIProjects` section, `AIProjectCard` and `TechBadge` components, navigation registration (data.ts + types.ts + ActiveSectionContext), all three translations, dead Projects.tsx resolved
**Implements:** ARCHITECTURE.md Pattern 1 (Section Component Pattern), Pattern 2 (Dumb Card Components with stagger), Pattern 5 (Section Registration)
**Avoids:** Pitfall 5 (dead code collision — explicit decision on Projects.tsx before building); Pitfall 12 (navigation sync — atomic update across all three locations); Pitfall 4 (i18n — DoD checkpoint)

### Phase 5: Visual Polish and SEO
**Rationale:** Polish is last because it depends on stable layout from Phase 3 and complete sections from Phase 4. Fixing the OG image route requires the final page structure to be known. Animation timing tuning requires all sections to exist.
**Delivers:** Animation timing QA (`once: true` audit across all new `motion.div` elements), responsive QA at 375px for all new components, updated `/api/og` dynamic OG image reflecting new content, Framer Motion API consistency (declarative pattern documented; `useAnimation` anti-pattern not copied)
**Avoids:** Pitfall 6 (stagger re-fires on scroll — `once: true` audit); Pitfall 10 (Framer Motion API inconsistency); Pitfall 13 (stale OG image)

### Phase Ordering Rationale

- Foundation before UI components because TypeScript enforces type correctness at build time — wrong types in Phase 1 surface immediately rather than mid-component build
- AI skills before dashboard layout because skills integration validates the icon system refactor and is the simplest new feature to ship, providing early feedback
- Dashboard layout before AI Projects because the visual language established in Phase 3 (card grid, stat tile aesthetic) informs how AI Project cards should look and feel
- Polish last because it requires all content sections to exist and the layout to be stable — premature polish work is wasted when structure changes

### Research Flags

Phases that should skip `research-phase` during planning (well-documented, patterns in codebase):
- **Phase 1 (Foundation):** Established patterns in `data.ts` and `types.ts`; direct codebase evidence
- **Phase 2 (AI Skills):** Extending existing Skills section; pattern identical to adding any TechItem
- **Phase 4 (AI Projects):** Mirrors existing Experience section pattern exactly; codebase is the spec

Phases likely needing attention or validation during planning:
- **Phase 3 (Dashboard Layout):** Information hierarchy decision is a design/content judgment call, not a code problem. Recommend validating the hero stats bar layout against actual recruiter feedback or design review before implementation begins.
- **Phase 5 (OG Image):** CONCERNS.md flags the `/api/og` route as potentially non-functional; needs investigation before assuming it can be extended.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Existing deps confirmed from codebase (HIGH). Recharts version from training data (August 2025 cutoff) — verify with `npm info recharts version` before install. shadcn/ui CLI-based, always pulls latest. |
| Features | MEDIUM | Existing features confirmed from codebase (HIGH). Recruiter scanning behavior model and AI skill market expectations from training data without live web verification. Recommend spot-checking against current Berlin senior engineer job postings. |
| Architecture | HIGH | All patterns derived from direct source code inspection of `page.tsx`, `layout.tsx`, `sections/`, `data.ts`, `types.ts`. Component boundaries and data flow are first-party findings, not assumptions. |
| Pitfalls | MEDIUM | Codebase-derived pitfalls (icon switch proliferation, dead code, navigation sync) are HIGH confidence first-party findings. Recruiter UX and bundle performance pitfalls are MEDIUM — established patterns but not web-verified for current state. |

**Overall confidence:** MEDIUM — architecture and existing codebase analysis is HIGH confidence; feature market expectations and stack version currency are MEDIUM due to web verification being unavailable during research.

### Gaps to Address

- **AI skill content list:** Research identifies categories (LLM APIs, RAG, agents, vector storage) but the specific skills to add must be confirmed by Adrian — only genuinely practiced skills should appear. This is a content decision, not a technical one.
- **Recharts version:** Run `npm info recharts version` before installing. Training data cutoff is August 2025; patch version may have changed.
- **OG image route status:** CONCERNS.md flags `/api/og` as potentially non-functional. Investigate actual route status before Phase 5 planning.
- **German/Spanish AI terminology:** "Retrieval-Augmented Generation," "Prompt Engineering" may need explanation or borrowing in German/Spanish. Research actual terms used in German-language job postings before writing `de.ts` translations.
- **Mobile layout for DashboardGrid:** No explicit mobile design decision has been made. The 375px constraint must be resolved in Phase 3 planning before any grid implementation begins.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase analysis: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/sections/`, `src/app/components/`, `src/lib/data.ts`, `src/lib/types.ts`, `src/lib/translations/en.ts`
- `.planning/codebase/ARCHITECTURE.md` — existing architecture patterns
- `.planning/codebase/CONCERNS.md` — known fragile areas and dead code
- `.planning/PROJECT.md` — milestone requirements and constraints

### Secondary (MEDIUM confidence)
- Training data (cutoff August 2025): Recharts ecosystem and React 19 compatibility, shadcn/ui CLI model, Framer Motion 12.x API, recruiter portfolio scanning behavior, AI hiring signal trends in 2025-2026

### Tertiary (LOW confidence)
- react-countup `^6.5.x` version — verify before adding if needed
- German/Spanish AI terminology in current job market — requires live web research

---
*Research completed: 2026-03-25*
*Ready for roadmap: yes*
