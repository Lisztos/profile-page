# Adrian Sanchez Portfolio

## What This Is

A personal portfolio website for Adrian Sanchez — a senior software developer — designed to showcase professional experience, technical skills, and AI expertise to recruiters and hiring managers. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS, with i18n support for English, German, and Spanish.

## Core Value

Recruiters landing on this site should immediately see a skilled senior developer with strong AI capabilities — through visual impact, concrete metrics, and depth of technical breadth.

## Requirements

### Validated

- ✓ Professional experience timeline with company logos — existing
- ✓ Skills section with tech stack icons — existing
- ✓ Education section — existing
- ✓ Internationalization (en/de/es) with language switcher — existing
- ✓ Responsive layout with Tailwind CSS — existing
- ✓ Scroll animations with Framer Motion — existing
- ✓ SEO with Open Graph, Twitter cards, JSON-LD structured data — existing
- ✓ Dynamic OG image generation — existing
- ✓ Location-aware content display — existing
- ✓ CV/resume PDF downloads — existing
- ✓ Vercel Analytics integration — existing

### Active

- [ ] Dashboard/app-style layout overhaul — interactive cards, data visualizations, modern SaaS aesthetic
- [ ] Impact metrics prominently displayed — tech breadth stats, impact numbers recruiters can anchor on
- [ ] AI skills added to tech stack — LLMs, RAG, agents, prompt engineering, AI frameworks
- [ ] Dedicated AI projects section — showcasing AI/ML work with project details
- [ ] Visual polish for senior developer impression — typography, spacing, card design, micro-interactions

### Out of Scope

- Interactive AI chatbot demo — high complexity, maintenance burden, not needed for recruiter scanning use case
- Blog/writing section — content maintenance overhead, not core to the goal
- Backend/API features — this is a static portfolio, no server-side logic beyond Next.js
- Dark mode activation — currently disabled, not a priority for this milestone

## Context

- **Existing codebase**: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Target audience**: Recruiters scanning quickly — need fast visual impact and clear key stats
- **Brownfield project**: All new work builds on existing sections and component patterns
- **Current state**: Working portfolio with experience, skills, education sections and i18n
- **Design direction**: Dashboard/app feel with interactive cards, not a traditional resume page
- **AI emphasis**: User wants AI to be a major selling point in the portfolio

## Constraints

- **Tech stack**: Must stay within Next.js/React/TypeScript/Tailwind — no new major frameworks
- **i18n**: All new content must support en/de/es translations
- **Static deployment**: Vercel-hosted, no backend services or databases
- **Performance**: Must maintain fast load times — recruiters won't wait
- **Accessibility**: Maintain semantic HTML and keyboard navigation

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Dashboard/app aesthetic over minimal | Recruiters scanning need visual impact and quick data consumption | — Pending |
| Impact numbers + tech breadth as hero stats | Gives recruiters concrete anchors, more memorable than generic intros | — Pending |
| AI projects as dedicated section | Separates AI work from general experience, emphasizes it as specialty | — Pending |
| AI skills in existing stack section | Shows AI as part of daily toolkit, not just side projects | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-25 after initialization*
