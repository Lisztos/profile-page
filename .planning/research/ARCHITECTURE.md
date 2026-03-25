# Architecture Patterns

**Domain:** Senior developer portfolio with dashboard/app aesthetic
**Researched:** 2026-03-25
**Confidence:** HIGH (based on direct codebase analysis + established Next.js App Router patterns)

---

## Recommended Architecture

The existing architecture is sound and does not require structural changes. The milestone adds new components within the existing layer model. The key architectural move is splitting the monolithic `Card`-per-section layout into a mixed grid — some sections occupy full width, others sit in a multi-column grid for a dashboard feel.

### Current Layout (Single-column, card-per-section)

```
page.tsx
  └── <main> (flex-col, max-w-5xl)
       ├── <Card id="intro-card">     → Intro section (full width, 100vh)
       ├── <Card id="skills-card">    → Skills section (full width)
       ├── <Card id="experience-card"> → Experience section (full width)
       └── <Card id="education-card"> → Education section (full width)
```

### Target Layout (Dashboard grid + sections)

```
page.tsx
  └── <main> (flex-col, max-w-5xl)
       ├── <Card id="intro-card">           → Intro section (full width, 100vh)
       │    └── StatsBar (inline, inside Intro)
       ├── <DashboardGrid>                  → NEW: responsive grid wrapper
       │    ├── <MetricCard> × N            → NEW: standalone stat tiles
       │    └── <AISkillsCard>              → NEW: AI skills mini-card
       ├── <Card id="skills-card">          → Skills section (full width, extended with AI)
       ├── <Card id="experience-card">      → Experience section (full width, unchanged)
       ├── <Card id="ai-projects-card">     → NEW: AI Projects section (full width)
       └── <Card id="education-card">       → Education section (full width)
```

---

## Component Boundaries

### Existing Components (unchanged)

| Component | File | Responsibility | Communicates With |
|-----------|------|---------------|-------------------|
| `Card` | `components/Card.tsx` | Container with shadow/border styling | Receives children, used by page.tsx |
| `Intro` | `sections/Intro.tsx` | Hero — name, title, bio, CTAs | `useTranslation`, `useLocationDisplay`, `useCVSelection` |
| `Skills` | `sections/Skills.tsx` | Tech icon grid | `useTranslation`, `skillsData` |
| `Experience` | `sections/Experience.tsx` | Work timeline | `useTranslation`, `experienceData` |
| `Education` | `sections/Education.tsx` | Education timeline | `useTranslation`, `educationData` |
| `Header` | `components/Header.tsx` | Fixed nav + language selector | `ActiveSectionContext`, `LanguageContext`, `links` data |
| `SectionHeading` | `components/SectionHeading.tsx` | Styled section title | None (pure display) |

### New Components

| Component | File | Responsibility | Communicates With |
|-----------|------|---------------|-------------------|
| `StatsBar` | `components/StatsBar.tsx` | Row of 3-4 impact metric tiles inside Intro | `useTranslation`, static `metricsData` |
| `MetricCard` | `components/MetricCard.tsx` | Single stat tile (number + label + icon) | Props only (number, label, icon, color) |
| `DashboardGrid` | `components/DashboardGrid.tsx` | Responsive grid layout wrapper | Receives children |
| `AIProjectCard` | `components/AIProjectCard.tsx` | Single AI project showcase card | Props (title, description, tags, links) |
| `AIProjects` | `sections/AIProjects.tsx` | Section containing AI project cards | `useTranslation`, `aiProjectsData` |
| `TechBadge` | `components/TechBadge.tsx` | Pill badge for AI tech labels | Props (label, variant) |

**Design decision:** `MetricCard` is dumb (props-only). `StatsBar` owns the data array and maps over `MetricCard`. This keeps `Intro` clean and makes stats independently testable later.

**Design decision:** `AIProjectCard` is dumb. `AIProjects` section owns data and iteration. Mirrors the existing `Experience` pattern exactly.

---

## Data Flow

### Metrics Data Flow

```
src/lib/data.ts
  └── metricsData[]          (new: { value, labelKey, icon, color }[])
       └── StatsBar.tsx
            └── MetricCard.tsx × N  (renders metric tiles)
```

Translation keys for metric labels go in `en.ts`/`de.ts`/`es.ts` under `metrics.*`. Values (the numbers) live in `data.ts` as static constants — no dynamic computation needed for a static site.

### AI Projects Data Flow

```
src/lib/data.ts
  └── aiProjectsData[]       (new: { titleKey, descriptionKey, tags, links, imageUrl? }[])
       └── AIProjects.tsx
            └── AIProjectCard.tsx × N
```

Translation keys for project titles and descriptions go in translations under `aiProjects.*`. Tags (tech labels) are English-only strings — they are technology names, not translated UI copy.

### AI Skills Data Flow

```
src/lib/data.ts
  └── skillsData[]           (extended: existing + AI skill strings)
  └── aiSkillsData[]         (new optional: dedicated AI skill array)

src/lib/types.ts
  └── TechItem union         (extended with new AI tech values)

Skills.tsx
  └── getSkillIcon()         (extended with AI tech cases)
  └── getTechUrl()           (extended with AI tech cases)
```

**Decision:** AI skills should be a visually distinct subsection within the existing `Skills` section — not a completely separate component. This avoids nav link proliferation and keeps the skills section as a single coherent unit. Implementation: add a labeled divider and a second grid below existing skills.

### Context Flow (unchanged for new features)

```
layout.tsx
  └── LocationProvider
       └── ThemeContextProvider
            └── LanguageContextProvider  ← all new components read language from here
                 └── ActiveSectionContextProvider
                      └── Header / page children
```

New components do not need new contexts. They read from `LanguageContext` via `useTranslation()` exactly as existing sections do.

---

## Patterns to Follow

### Pattern 1: Section Component Pattern

**What:** Every major section is a client component in `src/app/sections/`, uses `"use client"`, wraps in a semantic `<section>` with an `id`, uses `useTranslation()`, and reads data from `src/lib/data.ts`.

**When:** Any new top-level page section (`AIProjects`).

**Example structure:**
```typescript
// src/app/sections/AIProjects.tsx
"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/app/components/SectionHeading";
import { aiProjectsData } from "@/lib/data";
import { useTranslation } from "@/lib/hooks/useTranslation";
import AIProjectCard from "@/app/components/AIProjectCard";

export default function AIProjects() {
  const { t } = useTranslation();
  return (
    <section id="ai-projects" className="scroll-mt-28 ...">
      <SectionHeading>{t('aiProjects.title')}</SectionHeading>
      {aiProjectsData.map((project, index) => (
        <AIProjectCard key={index} project={project} index={index} />
      ))}
    </section>
  );
}
```

### Pattern 2: Dumb Card Components with index-based Framer Motion stagger

**What:** Card-level components receive all display data via props and use a `custom={index}` prop on `motion.div` for staggered entrance animations. No internal state, no data fetching.

**When:** `MetricCard`, `AIProjectCard`, `TechBadge`.

**Example structure:**
```typescript
// src/app/components/MetricCard.tsx
"use client";

import { motion } from "framer-motion";

interface MetricCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  index: number;
}

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.05 * i }
  }),
};

export default function MetricCard({ value, label, icon, index }: MetricCardProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
    >
      {icon}
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </motion.div>
  );
}
```

### Pattern 3: Extended Data Array with `as const`

**What:** New data arrays in `src/lib/data.ts` use `as const` and TypeScript-inferred types. Translation keys in data entries (e.g., `titleKey: "aiProjects.projectName.title"`) decouple content from translation strings.

**When:** `metricsData`, `aiProjectsData`, AI skill additions.

### Pattern 4: Translation Key Namespacing

**What:** New sections get their own top-level namespace in translation files.

**When:** Adding `metrics.*`, `aiProjects.*` to `en.ts`, `de.ts`, `es.ts`.

**Key structure:**
```typescript
// en.ts additions
metrics: {
  yearsExperience: { value: "5+", label: "Years Experience" },
  projectsDelivered: { value: "20+", label: "Projects Delivered" },
  // ...
},
aiProjects: {
  title: "AI Projects",
  projectName: {
    title: "...",
    description: "...",
  },
}
```

### Pattern 5: Section Registration in page.tsx and data.ts

**What:** Every section rendered in `page.tsx` must be registered in the `links` array in `data.ts` and have a corresponding `SectionName` union value in `types.ts`.

**When:** Adding `AIProjects` section.

**Steps:**
1. Add `"AI Projects"` to `SectionName` union in `types.ts`
2. Add `{ name: "AI Projects", hash: "#ai-projects" }` to `links` in `data.ts`
3. Import `AIProjects` in `page.tsx` and wrap in `<Card id="ai-projects-card">`

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Putting data directly in section components

**What:** Hardcoding metric values or project data inside component files.
**Why bad:** Breaks the centralized data pattern. Makes content updates require component edits. Breaks i18n if copy is inline.
**Instead:** All content data in `src/lib/data.ts`. All UI copy in translation files. Components only render.

### Anti-Pattern 2: Creating new Context providers for new features

**What:** Adding a `MetricsContext` or `AIProjectsContext` for the new features.
**Why bad:** The new sections are stateless display components. Context adds indirection and complexity with no benefit.
**Instead:** Pass data via props from parent sections. Use `useTranslation()` for text. Read from `data.ts` directly in section components.

### Anti-Pattern 3: Using relative imports

**What:** `import MetricCard from "../../components/MetricCard"`.
**Why bad:** Breaks the established `@/` alias convention and creates brittle path coupling.
**Instead:** Always use `import MetricCard from "@/app/components/MetricCard"`.

### Anti-Pattern 4: Building a separate "AI Skills" section with its own nav link

**What:** Creating `sections/AISkills.tsx` and adding it to navigation as a new top-level section.
**Why bad:** Fragment navigation, makes the page feel like a table of contents rather than a dashboard. AI is a specialization, not a separate category.
**Instead:** Integrate AI skills as a visually distinct subsection within the existing `Skills` section, using a labeled divider. Recruiters see the full breadth in one place.

### Anti-Pattern 5: Animating on every render instead of once on viewport entry

**What:** Using `animate` prop without `whileInView` + `viewport={{ once: true }}`.
**Why bad:** Animations re-trigger on scroll direction change, causing visual noise. Expensive on mobile.
**Instead:** Use `whileInView="animate"` with `viewport={{ once: true }}` exactly as existing `Skills.tsx` does.

### Anti-Pattern 6: Importing from `react-icons` without checking existing usage

**What:** Installing a different icon library (e.g., `lucide-react`, `heroicons`) for AI skill icons.
**Why bad:** Bundle bloat, visual inconsistency with existing icons.
**Instead:** Use `react-icons/si` (Simple Icons) for new tech logos. Check `react-icons` first — it covers virtually all AI/ML brands (`SiOpenai`, `SiHuggingface`, `SiLangchain` etc.).

---

## Scalability Considerations

| Concern | Current scale | At milestone completion |
|---------|--------------|------------------------|
| Bundle size | Small — 11 skills, 5 experience entries | Adds ~3-5 new components. No new libraries needed. Negligible size increase. |
| Translation files | Shallow — ~50 keys total | Adds ~20-30 keys per language. Still flat enough to manage manually. |
| Data.ts length | ~160 lines | Adds ~30-50 lines. No need to split yet. |
| Navigation items | 4 items (Home, Skills, Experience, Education) | Adds 1 (AI Projects). 5 items fit comfortably in header. |
| Card count in page.tsx | 4 cards | Adds 1-2. Single-file composition still clean at this scale. |

**When to reconsider:** If `data.ts` exceeds ~400 lines or translation files exceed ~200 keys each, split into domain-specific data files. Not needed at this milestone.

---

## Suggested Build Order

Dependencies between new components determine order. Build in this sequence to avoid blocking:

### Phase 1: Foundation (no blockers)

1. **Extend `src/lib/types.ts`** — Add new `TechItem` values for AI tools (e.g., `"openai"`, `"langchain"`, `"huggingface"`). Add `"AI Projects"` to `SectionName`.
2. **Add translation keys** — Add `metrics.*` and `aiProjects.*` skeletons to `en.ts`, `de.ts`, `es.ts`. Placeholder text is fine; structure must be correct.
3. **Add data arrays to `src/lib/data.ts`** — Add `metricsData`, `aiProjectsData`, extend `skillsData` with AI entries.

### Phase 2: Leaf Components (depend on Phase 1 types/data)

4. **Build `MetricCard`** — Pure display component. No external dependencies beyond Framer Motion and Tailwind.
5. **Build `AIProjectCard`** — Pure display component. No external dependencies beyond Framer Motion and Tailwind.
6. **Build `TechBadge`** — Simplest component. Pill badge with label. Can be reused in both `AIProjectCard` and `Skills`.

### Phase 3: Container Components (depend on Phase 2 components + Phase 1 data)

7. **Build `StatsBar`** — Maps `metricsData` to `MetricCard`. Depends on Phase 1 data + Phase 2 `MetricCard`.
8. **Build `AIProjects` section** — Maps `aiProjectsData` to `AIProjectCard`. Depends on Phase 1 data + Phase 2 `AIProjectCard`.
9. **Extend `Skills` section** — Add AI skill subsection with divider. Depends on Phase 1 types + existing `Skills.tsx`.

### Phase 4: Integration (depend on Phase 3 sections)

10. **Update `page.tsx`** — Add `<Card id="ai-projects-card"><AIProjects /></Card>` at correct position. Uncomment/add nav registration.
11. **Update `Intro.tsx`** — Embed `StatsBar` below bio text or above CTAs.
12. **Update `data.ts` links array** — Add "AI Projects" nav entry.

### Phase 5: Polish (no structural dependencies)

13. **Visual tuning** — Tweak spacing, colors, card gradients for dashboard feel. Typography adjustments.
14. **Animation timing** — Adjust stagger delays if metrics and AI cards feel abrupt alongside existing sections.
15. **Responsive QA** — Verify `DashboardGrid` breakpoints. Ensure mobile layout is not cluttered.

---

## Component Communication Map

```
layout.tsx (Server)
  ├── Provides contexts: Location, Theme, Language, ActiveSection
  └── page.tsx (Client)
       ├── <Intro>
       │    └── reads: useTranslation, useLocationDisplay, useCVSelection
       │    └── renders: StatsBar
       │         └── reads: metricsData (data.ts), useTranslation
       │         └── renders: MetricCard × N (props only)
       ├── <Skills> (extended)
       │    └── reads: skillsData (data.ts), useTranslation
       │    └── renders: existing icon grid + AI subsection
       │         └── renders: TechBadge × N (props only, optional)
       ├── <Experience>
       │    └── reads: experienceData (data.ts), useTranslation (unchanged)
       ├── <AIProjects>
       │    └── reads: aiProjectsData (data.ts), useTranslation
       │    └── renders: AIProjectCard × N
       │         └── renders: TechBadge × N (props only)
       └── <Education>
            └── reads: educationData (data.ts), useTranslation (unchanged)
```

**Rule:** Data flows down (data.ts → sections → cards). State flows up only via React Context for global concerns (language, active section). New components add no new state — they are purely rendering transformations of static data.

---

## Key Architectural Invariants

These must not be violated by the new milestone work:

1. **All user-facing text goes through `useTranslation()`** — no hardcoded English strings in JSX
2. **All content data lives in `src/lib/data.ts`** — no data inside component files
3. **All imports use the `@/` path alias** — no relative `../` paths
4. **All new section components use `"use client"` directive** — they use hooks and Framer Motion
5. **All animations use `whileInView` + `viewport={{ once: true }}`** — for performance and consistent UX
6. **All new `TechItem` values are added to `types.ts` before using in data.ts** — TypeScript will catch violations at build time
7. **The `Card` component wraps sections in `page.tsx`, not inside section files** — section files render `<section>` elements, `page.tsx` wraps them in `<Card>`

---

## Sources

- Direct codebase analysis: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/sections/`, `src/app/components/Card.tsx`, `src/lib/data.ts`, `src/lib/types.ts`
- Existing architecture documentation: `.planning/codebase/ARCHITECTURE.md`
- Project requirements: `.planning/PROJECT.md`
- Confidence: HIGH — all patterns derived from direct source code inspection, not training data assumptions
