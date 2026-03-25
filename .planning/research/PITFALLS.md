# Domain Pitfalls

**Domain:** Senior developer portfolio — dashboard/app aesthetic redesign with AI showcase
**Researched:** 2026-03-25
**Confidence:** MEDIUM — derived from codebase analysis and established Next.js/React patterns; web verification unavailable

---

## Critical Pitfalls

Mistakes that cause rewrites or major rework.

---

### Pitfall 1: Chart Library Bundle Bloat Kills Core Web Vitals

**What goes wrong:** Adding a charting library (Recharts, Chart.js, Victory, Nivo) to display impact metrics results in 200–500KB added to the JS bundle. The portfolio's primary use case is recruiter scanning — they will not wait. A slow portfolio communicates "this developer doesn't care about performance."

**Why it happens:** Charting libraries are monolithic. Even importing a single `<BarChart>` pulls the full library unless the build is configured for deep tree-shaking, which most Next.js setups do not do by default. Recharts alone is ~300KB gzipped.

**Consequences:** LCP degrades from sub-1s to 2–4s. Vercel Analytics (already integrated) will show this. Recruiters on mobile are hit hardest.

**Prevention:**
- Avoid charting libraries entirely for simple stats. Use CSS/Tailwind-animated progress bars, number counters, and stat cards instead.
- If charts are genuinely needed, use dynamic import with `next/dynamic` and `{ ssr: false }` to lazy-load them below the fold.
- Prefer SVG-only micro-visualizations authored by hand over library charts for 1–3 data points.
- Run `next build && next analyze` (with `@next/bundle-analyzer`) before and after adding any visualization library.

**Detection:** Bundle grows >50KB for a new section. LCP increases in Vercel Speed Insights. Lighthouse performance score drops below 90.

**Phase mapping:** Dashboard layout phase — decide upfront, do not add charts speculatively.

---

### Pitfall 2: "Dashboard" Becomes Visual Noise That Obscures the Person

**What goes wrong:** Adding card grids, metric widgets, progress bars, and activity charts produces a UI that looks like a SaaS admin panel — not a senior engineer's portfolio. Recruiters spending 30 seconds on a page cannot extract the signal: who is this person, what have they built, should I contact them.

**Why it happens:** Dashboard aesthetics are borrowed from product UIs designed for repeat, engaged users who return to track their own data. A portfolio is a single-session, first-impression medium with a completely different information hierarchy.

**Consequences:** The page looks impressive in a screenshot but fails the "scan test." Key differentiators (AI expertise, team lead experience, startup background) are buried under chrome. Recruiter moves on.

**Prevention:**
- Apply the "recruiter 10-second scan" filter to every new component: if the value prop is not visible within 10 seconds without scrolling, redesign it.
- Limit the hero/intro card to one primary stat per category (years of experience, companies count, AI tools used) — not a dashboard of metrics.
- Use card visual language (border, shadow, padding) to add structure, but keep content scannable with large type and short labels, not charts.
- Validate layout decisions against the stated goal in PROJECT.md: "Recruiters landing on this site should immediately see a skilled senior developer with strong AI capabilities."

**Detection:** Show the page to someone unfamiliar with the project for 10 seconds, then ask them what Adrian does and what makes him different. If they cannot answer, there is too much visual noise.

**Phase mapping:** Dashboard layout phase — establish information hierarchy before any visual polish.

---

### Pitfall 3: AI Skills Section Reads as Buzzword Padding

**What goes wrong:** Adding "LLMs, RAG, Agents, Prompt Engineering, GPT-4" as skill badges next to Ruby on Rails and PostgreSQL, without any supporting evidence, reads as resume inflation. Recruiters and technical hiring managers are now specifically trained to spot this pattern.

**Why it happens:** The Skills section currently renders all skills as equal-weight badges. Adding AI terms at the same weight as 5-year production technologies creates a false equivalency that erodes trust in the entire skills section.

**Consequences:** Technical interviewers question the candidate before the interview starts. The AI emphasis — intended as the strongest differentiator — becomes a liability.

**Prevention:**
- Separate AI skills visually or structurally from production-proven technologies. A dedicated "AI & Machine Learning" group within the Skills section, or a distinct "AI Toolkit" card, communicates nuance.
- Every AI skill listed must map to either (a) a concrete experience bullet in the Experience section or (b) a project in the AI Projects section. This cross-referencing is the proof.
- Use specificity as a credibility signal: "Claude API (Anthropic)" and "LangChain for RAG pipelines" are more credible than "AI" or "LLMs."
- Translate AI skills to impact language where possible: "Reduced support ticket volume 40% with RAG-powered knowledge base" outperforms any badge.

**Detection:** Ask a technical hiring manager to review the skills list and rate believability. Alternatively: if any AI skill cannot be traced to a concrete project or job bullet, it should be removed or deferred until it can be.

**Phase mapping:** AI skills phase — content strategy must precede implementation.

---

### Pitfall 4: i18n Coverage Gaps in New Sections Cause Silent Failures

**What goes wrong:** Adding the AI Projects section and impact metrics with hardcoded English strings, intending to "add translations later," results in German and Spanish users seeing English text or raw translation keys (e.g., `aiProjects.title`). The CONCERNS.md already documents that missing keys fall back silently.

**Why it happens:** The existing translation system (`src/lib/translations/index.ts`) silently falls back to English then to the key name. There is no build-time validation that all keys exist across all three language files. New sections added under time pressure skip translation files.

**Consequences:** The portfolio's i18n support — a genuine differentiator for a Berlin-based developer — is visibly broken for German-speaking recruiters. The `console.warn()` fallback is invisible to users.

**Prevention:**
- Write all three translation files (`en.ts`, `de.ts`, `es.ts`) simultaneously when adding any new section. Never commit a section without all three.
- Create a TypeScript type guard or build-time assertion that validates all keys present in `en.ts` are also present in `de.ts` and `es.ts`. This should be added in the infrastructure phase.
- For AI-specific terminology: research the actual German/Spanish terms used in job listings (e.g., "Prompt Engineering" is often borrowed in German, but "Retrieval-Augmented Generation" may need explanation).

**Detection:** Switch language to German or Spanish after adding any new content. If anything renders in English that should be German/Spanish, a key is missing.

**Phase mapping:** Every phase that adds user-visible content — must be a DoD (Definition of Done) checkpoint.

---

### Pitfall 5: Projects Section Reactivation Without Resolving the Dead Code Pattern

**What goes wrong:** The existing `Projects.tsx` component is commented out in two places (`page.tsx` and `data.ts`) and the section is completely disabled. The AI Projects section will likely reuse or replace it. If the new section is built as a third parallel implementation (existing `Projects.tsx` + new `AIProjects.tsx` + commented-out references), the codebase accumulates irreconcilable dead code.

**Why it happens:** CONCERNS.md explicitly flags this: "Dead code clutters the codebase." Adding a new Projects variant without first resolving the existing disabled section creates a fourth state: enabled original, disabled original, new enabled variant, and ghost references in `data.ts`.

**Consequences:** The `links` array in `data.ts` does not include Projects navigation. Enabling a new projects section without adding it to navigation means it exists but is unreachable via the header. The active-section detection context will not highlight it.

**Prevention:**
- Before building the AI Projects section, make a single decision: extend the existing `Projects.tsx`, replace it entirely, or delete it and build fresh. Do not leave both.
- Simultaneously update `data.ts` links array, `page.tsx` imports, and all three translation files. The section does not ship until navigation works.
- Remove commented-out code entirely rather than leaving it; use git history to recover if needed.

**Detection:** After adding the AI Projects section, verify that the header navigation highlights the section on scroll and that no dead import or commented block remains.

**Phase mapping:** AI Projects section phase — pre-work step before building.

---

### Pitfall 6: Framer Motion Stagger Animations Compound on Scroll Revisit

**What goes wrong:** The existing Skills and Experience sections use `whileInView` with `viewport={{ once: true }}` correctly. New dashboard cards with staggered animations that omit `once: true` will re-trigger every time the user scrolls back through a section, causing jarring re-animations of content the user has already seen.

**Why it happens:** Copy-pasting animation variants from the existing codebase looks correct but `once: true` is a non-obvious setting that is easy to miss. Dashboard-style "live update" animation patterns (pulse, count-up, progress fill) specifically tempt developers to use infinite or repeat animations that are appropriate in actual dashboards but disorienting in a scrollable document.

**Consequences:** Animations that fire repeatedly make the page feel broken. Animated number counters that count up every time a user scrolls past a section are a known UX anti-pattern in portfolios.

**Prevention:**
- All scroll-triggered animations must use `viewport={{ once: true }}` unless there is a specific, justified reason for repeat animation.
- Animated number counters (impact metrics) should count up once per page load, not once per scroll-into-view. Implement with a ref to track if the animation has fired.
- Audit all new `motion.div` elements before shipping each phase for the `once` flag.

**Detection:** Scroll down through the full page then scroll back to the top, then back down. Every animation section should not re-animate.

**Phase mapping:** Dashboard layout phase and AI Projects phase — bake into component review checklist.

---

### Pitfall 7: Switch Statement Icon Mapping Becomes Unmaintainable With AI Skills

**What goes wrong:** The codebase already has three separate switch-statement icon mappers (in `Skills.tsx` for skill icons, in `Experience.tsx` for company icons, and in `Experience.tsx` for tech stack icons). Adding AI tools (OpenAI, Anthropic, LangChain, Hugging Face, Ollama) requires modifying all affected switch statements plus adding icon imports.

**Why it happens:** CONCERNS.md already flags the `Experience.tsx` icon mapping as fragile: "Long switch statement with hardcoded icon paths. Adding new company requires modifying switch case." The same structural problem exists in `Skills.tsx`. The pattern scales badly.

**Consequences:** Adding 5–8 AI skill icons requires touching multiple files, duplicating icon import logic, and introducing inconsistency (some icons in Skills use `style={{ color: ... }}`, others may use `className`). Easy to miss one location and have a broken icon in production.

**Prevention:**
- Before adding AI icons, refactor icon mapping to a single source-of-truth config object in `src/lib/data.ts` or a new `src/lib/icons.ts`. The component renders from the map; it does not contain the map.
- Structure: `{ key: string, icon: ReactElement, color: string, url: string }` covers all current use cases.
- This refactor is a prerequisite, not optional polish. Doing it during the AI skills phase prevents duplicating the problem with 8 more switch cases.

**Detection:** If adding a new skill requires editing more than one file (beyond `data.ts`), the icon mapping is not centralized.

**Phase mapping:** AI skills phase — refactor icon system first, then add skills.

---

## Moderate Pitfalls

---

### Pitfall 8: Hardcoded Impact Metrics Become Stale

**What goes wrong:** Prominently displayed metrics ("5+ years experience," "X companies," "Y projects shipped") that are hardcoded as strings in JSX or translation files will not automatically update. A metric that was accurate at launch becomes inaccurate 12 months later and creates a credibility gap for a visitor who can do simple math from the Experience section dates.

**Prevention:**
- Metrics that can be derived from existing structured data (e.g., number of companies from `experienceData.length`, years of experience from earliest `date` to now) should be computed, not hardcoded.
- Write a utility function `computePortfolioStats(experienceData, educationData)` in `src/lib/data.ts` that derives all computable metrics at runtime.
- Only hardcode metrics that cannot be derived (e.g., "40% reduction in load time" from the Setting HQ role).
- Add a comment in `data.ts` for hardcoded metrics: `// LAST VERIFIED: [date]` so drift is visible during code review.

**Phase mapping:** Impact metrics phase.

---

### Pitfall 9: Mobile Layout Breaks Under Dashboard Density

**What goes wrong:** Dashboard-style layouts with multi-column card grids, metric widgets, and icon rows work on desktop but collapse poorly on mobile. The existing Skills section already manages this with a separate 2-column mobile grid — but new dashboard components added without explicit mobile design will either overflow or stack into an unusable vertical list.

**Prevention:**
- Design mobile layout explicitly for each new component, not as an afterthought. The pattern `hidden sm:flex` / `grid sm:hidden` already exists in `Skills.tsx` — follow it.
- Test every new component at 375px width (iPhone SE) before considering it complete.
- Metric stat cards should stack vertically on mobile and be readable at a glance without horizontal scrolling.

**Phase mapping:** Dashboard layout phase — mobile design is not a separate concern.

---

### Pitfall 10: Framer Motion `useAnimation` Already Shows a Fragile Pattern

**What goes wrong:** `Experience.tsx` uses `useAnimation` with `controls.start("visible")` on mount — this is the older imperative API that was superseded by the declarative `whileInView` and `animate` prop patterns. Mixing both APIs in new components creates inconsistency and makes it harder to reason about animation state.

**Prevention:**
- New components should use the declarative API (`whileInView`, `initial`, `animate` props) consistent with the pattern in `Skills.tsx`.
- The `useAnimation` + `controls` pattern in `Experience.tsx` can be left as-is to avoid unnecessary churn, but new code should not copy it.

**Phase mapping:** Visual polish phase — document the preferred pattern once.

---

## Minor Pitfalls

---

### Pitfall 11: GitHub Icon Dark Mode Rendering

**What goes wrong:** The GitHub icon in `Experience.tsx` uses `style={{ color: "#181717" }}` — near-black. On dark backgrounds (cards in dark mode use `dark:bg-gray-800`), this icon is invisible. The Skills section does not include GitHub, so it is only visible in the Experience tech stack row, but new AI tools added with similar brand-black colors will have the same problem.

**Prevention:** For icons with near-black brand colors, override to white in dark mode: use `className="dark:text-white"` or detect the current theme.

**Phase mapping:** AI skills phase — check icon contrast in both light and dark contexts.

---

### Pitfall 12: New Navigation Items Require Sync Across Three Locations

**What goes wrong:** Adding an "AI Projects" section requires updating `src/lib/data.ts` (links array), `src/lib/types.ts` (SectionName type), and the active section context. Missing any one of these results in a section that renders but is not navigable or not highlighted in the header.

**Prevention:** Treat the three locations as a single atomic change: `links` in `data.ts`, `SectionName` in `types.ts`, and verification that `ActiveSectionContext` picks up the new section via its `IntersectionObserver` refs in the section component.

**Phase mapping:** AI Projects section phase — pre-shipping checklist item.

---

### Pitfall 13: OG Image Not Updated for New Page Content

**What goes wrong:** CONCERNS.md flags that `/api/og/route.tsx` does not exist or is not functional. The current OG image is either a fallback or static. Adding AI showcase content and impact metrics without updating the OG image means social shares (LinkedIn, Twitter/X) will show stale or generic previews — missing a meaningful impression opportunity.

**Prevention:** Implement (or fix) the dynamic OG image route as part of the visual polish phase, after the final page layout is stable. Using `next/og` (ImageResponse), pull the computed stats and a headline from the same data sources used on the page.

**Phase mapping:** Visual polish / SEO phase — after layout is finalized.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Dashboard layout | Visual noise obscuring recruiter scan path (Pitfall 2) | Establish information hierarchy first, validate with scan test |
| Dashboard layout | Chart library bundle bloat (Pitfall 1) | Prefer CSS/Tailwind stats over charting libraries; lazy-load if unavoidable |
| Dashboard layout | Mobile breakpoints broken under grid density (Pitfall 9) | Design mobile explicitly; test at 375px |
| Dashboard layout | Stagger animations re-firing on scroll revisit (Pitfall 6) | `viewport={{ once: true }}` everywhere |
| Impact metrics | Hardcoded stats becoming stale (Pitfall 8) | Compute from `experienceData` where possible |
| AI skills | Buzzword padding without backing evidence (Pitfall 3) | Every skill must link to a project or job bullet |
| AI skills | Icon mapping proliferation in switch statements (Pitfall 7) | Centralize icon config in `data.ts` or `icons.ts` first |
| AI skills | i18n gaps for new AI terminology (Pitfall 4) | Write all three language files simultaneously |
| AI skills | GitHub-brand-color icon invisible in dark mode (Pitfall 11) | Check all near-black icons for dark mode contrast |
| AI Projects section | Dead code collision with existing Projects.tsx (Pitfall 5) | Resolve the disabled Projects section before building new one |
| AI Projects section | Navigation not wired after adding section (Pitfall 12) | Atomic update: data.ts + types.ts + active section ref |
| AI Projects section | i18n coverage gaps (Pitfall 4) | Same DoD rule: all three languages required to ship |
| Visual polish | OG image stale after content redesign (Pitfall 13) | Fix `/api/og` route after layout is finalized |
| Visual polish | Framer Motion API inconsistency (Pitfall 10) | Document declarative-only pattern; do not copy `useAnimation` from Experience.tsx |

---

## Sources

- Codebase analysis: `src/app/sections/Skills.tsx`, `src/app/sections/Experience.tsx`, `src/app/page.tsx`, `src/lib/data.ts`, `src/lib/translations/en.ts` — HIGH confidence (first-party)
- `.planning/codebase/CONCERNS.md` — HIGH confidence (first-party audit)
- `.planning/PROJECT.md` — HIGH confidence (project requirements)
- Next.js bundle analysis patterns, Framer Motion `viewport.once` documentation, React context re-render behavior — MEDIUM confidence (training data, verified against observable codebase behavior)
- Recruiter UX patterns for portfolio scanning — MEDIUM confidence (training data; web verification unavailable in this session)
