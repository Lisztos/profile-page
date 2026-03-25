# Feature Landscape

**Domain:** Senior developer portfolio — recruiter-facing, AI emphasis, dashboard aesthetic
**Researched:** 2026-03-25
**Confidence:** MEDIUM — based on deep domain knowledge of developer portfolio patterns, recruiter scanning behavior, and AI hiring trends. WebSearch unavailable; findings drawn from training data (cutoff August 2025) and direct codebase analysis.

---

## Context: What Already Exists

The following features are already shipped and should NOT be re-built:

| Existing Feature | Location |
|------------------|----------|
| Professional experience timeline with company logos | `sections/Experience.tsx` |
| Tech stack skills section with icons | `sections/Skills.tsx` |
| Education section | `sections/Education.tsx` |
| Projects section (built, currently hidden from nav) | `sections/Projects.tsx` |
| i18n support (en/de/es) with language switcher | `context/language-context.tsx` |
| Responsive layout, scroll animations (Framer Motion) | Global |
| SEO: Open Graph, Twitter cards, JSON-LD, dynamic OG | `layout.tsx`, `api/og/` |
| Location-aware content (Berlin vs Mexico City display) | `hooks/useLocationDisplay.tsx` |
| CV/resume PDF download (location-aware) | `hooks/useLocationDisplay.tsx` |
| Calendly CTA ("Let's work together") | `sections/Intro.tsx` |
| LinkedIn + GitHub social links | `sections/Intro.tsx` |
| Vercel Analytics + Speed Insights | `layout.tsx` |

---

## Table Stakes

Features recruiters expect. Missing = portfolio feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear name + role above the fold | Recruiter identifies who this is in 2s | Low | EXISTS — "Adrian Sanchez, Senior Software Engineer" |
| Profile photo | Human connection, trust signal | Low | EXISTS — circular photo in Intro |
| Contact / booking CTA | Recruiter needs a next action | Low | EXISTS — Calendly link |
| Downloadable CV/resume | ATS upload, offline review | Low | EXISTS — PDF download |
| Employment timeline with company logos | Verifies seniority, tenure, trajectory | Medium | EXISTS |
| Tech stack listing | Keyword matching for ATS / recruiter scanning | Low | EXISTS — but missing AI skills |
| Links to LinkedIn + GitHub | Verification, deeper research | Low | EXISTS |
| Responsive mobile layout | Recruiters on mobile | Low | EXISTS |
| Fast load time (< 3s) | Recruiters won't wait | Medium | EXISTS via static Vercel deploy |
| **Impact metrics / numbers** | Anchors seniority claim with evidence — "45% performance improvement", "led team of N", "N+ years" | Medium | PARTIALLY EXISTS in project descriptions; NOT surfaced visibly in hero or stats area |
| **AI/ML skills visible in stack** | In 2025-2026, absence of AI skills raises questions for senior engineers | Low | MISSING — current stack: Rails, Vue, PostgreSQL, AWS, Redis, Terraform, Bash, Heroku, Salesforce, Git, Twilio |

---

## Differentiators

Features that set this portfolio apart. Not expected by default, but create strong positive signal.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Dashboard/app-style layout** | Portfolio looks like a product, not a template — signals product-minded thinking | High | MISSING — current layout is vertical scroll single-column. Target: cards grid, stat widgets, SaaS-feel |
| **Hero stats bar** (e.g. "5+ years experience / 4 companies / 3 languages") | Recruiters scan for anchors — concrete numbers stick better than prose | Low-Med | MISSING — exists in prose only ("5+ years in startup environments") |
| **Dedicated AI projects section** | Separates AI work from general experience, signals AI as specialty vs. afterthought | Medium | MISSING — current Projects section is general, hidden from nav |
| **Tech breadth indicator** | Visual grouping of skills by domain (Backend, Frontend, Cloud, AI/ML) shows breadth at a glance | Medium | MISSING — current skills are flat icon grid, no categorization |
| **Interactive micro-details on experience cards** | Expandable bullet points, hover states with tech tags — signals attention to UX/engineering quality | Medium | PARTIAL — basic timeline exists, no interactivity beyond hover scale |
| **Visible open-to-work / availability signal** | Recruiter knows immediately if candidate is hireable | Low | MISSING — Calendly CTA implies availability but no explicit "Available for opportunities" label |
| **Multilingual signal as a feature** | Shows language switcher prominently as a language fluency signal (German for Berlin market) | Low | EXISTS but under-emphasized — language switcher is present but not called out as a skill |
| **AI skills grouped visually** | Grouping OpenAI, LangChain, RAG, agents together as a coherent "AI toolkit" reads stronger than individual items in a flat list | Medium | MISSING |
| **Scroll-aware sticky nav with active section highlight** | Polished navigation feel expected in premium portfolios | Low | EXISTS — active section context in place |
| **Consistent card-based layout** | Cards create visual separation and density — feel like a product dashboard | Medium | PARTIAL — Card wrapper exists but used inconsistently |

---

## Anti-Features

Features to explicitly NOT build for this milestone.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Interactive AI chatbot / LLM demo | High complexity, maintenance burden, API costs, security surface, unreliable for recruiter use case | Let project cards explain AI work clearly |
| Blog / writing section | Content maintenance overhead indefinitely; empty blog signals neglect | Link to external writing (LinkedIn, Medium) if relevant |
| Backend APIs / databases | Static Vercel deploy is a constraint; no server-side services needed | Solve everything client-side or at build time |
| Dark mode toggle (enabling disabled feature) | Currently disabled for reason; scope expansion risk | Keep deferred until post-this-milestone |
| GitHub contribution graph embed | Requires API, adds loading complexity, can look sparse | Use project cards with concrete outcomes instead |
| Third-party testimonials widget | Adds external dependency, complicates layout | Quote-style text testimonials in project cards if needed |
| Animated skill progress bars (percentage) | Perceived as subjective and untrustworthy by experienced recruiters ("I'm 87% good at AWS?") | Use tech categories + years of experience framing instead |
| Heavy video background / hero video | Hurts load performance, distracts from content | Keep animated gradient blobs already in place |
| Separate pages for each project | Increases complexity, breaks single-page scrolling recruiter UX | Keep all content on one scrollable page |
| Real-time GitHub stats widgets | External API dependency, can fail, adds loading state complexity | Hard-code curated stats instead |

---

## Feature Dependencies

```
AI skills in tech stack
  → AI projects section (AI projects require AI skills context to land properly)
  → Tech breadth grouping (grouping by domain requires enough skills per group)

Dashboard layout overhaul
  → Hero stats bar (stats bar is a component of the new layout, not independent)
  → Card-based consistency (dashboard feel requires all sections in cards)
  → Tech breadth indicator (grouped skills fits dashboard card pattern)

Hero stats bar
  → Impact metrics in experience data (stats bar pulls numbers from experience descriptions)
  → Translation support for all 3 languages (stats must be translatable)

AI projects section
  → Projects section re-activation (currently hidden from nav)
  → AI project data entries in data.ts (need actual project content)
  → Translation keys for new project content (en/de/es)
```

---

## MVP Recommendation

For this milestone (dashboard + AI emphasis), prioritize in this order:

**Must ship (milestone goal):**
1. AI skills added to existing Skills section — extends existing section, no new architecture, immediate keyword impact
2. Hero stats bar — Low complexity, high recruiter impact, fits above Intro prose
3. Dashboard/app-style layout overhaul — Cards grid, visual hierarchy, SaaS feel
4. Dedicated AI projects section — new section, re-activates hidden Projects infra
5. Tech breadth grouping in Skills — Backend / Cloud / AI categories

**Can defer (later milestone):**
- Availability/open-to-work signal — nice-to-have, Calendly CTA partially covers this
- Interactive expandable experience bullets — micro-interaction polish, scope risk

---

## Recruiter Scanning Behavior Model

Understanding how recruiters actually use portfolio sites informs feature priority.

Senior recruiter scanning pattern (estimated 10-30 seconds first pass):

1. **Name + role** — confirmed in 2s
2. **Photo** — human/trust check
3. **Experience years + company names** — tenure and trajectory scan
4. **Tech stack keywords** — ATS / role-fit match (AI skills absent here is a gap)
5. **Stats / numbers** — concrete anchors ("5+ years", "led team") scanned faster than prose
6. **Contact CTA** — can they reach them easily?

Features above the fold (hero area) have 10x more impact than sections below the fold. The stats bar and AI skills are highest-leverage improvements relative to effort.

---

## AI Skill Coverage Gap

Current skills (from `skillsData`): Ruby on Rails, Vue.js, PostgreSQL, Redis, Terraform, AWS, Bash, Heroku, Salesforce, Git, Twilio.

**Missing AI/ML skill categories for a senior engineer in 2026:**

| Category | Specific Skills to Add | Priority |
|----------|------------------------|----------|
| LLM APIs | OpenAI API, Anthropic Claude API | High |
| AI frameworks | LangChain, LlamaIndex | High |
| Retrieval patterns | RAG (Retrieval-Augmented Generation) | High |
| Agent patterns | AI Agents, Tool calling | Medium |
| Prompt engineering | Prompt Engineering (soft skill, still expected) | Medium |
| Vector storage | Pgvector, Pinecone (if applicable) | Low |
| AI-adjacent | Python (often assumed for AI work) | Low-Med |

Note: Add only skills Adrian has genuine experience with. Inflated skill lists are caught in technical interviews and damage credibility.

---

## Dashboard Layout Reference Patterns

What "dashboard/app aesthetic" means in practice for a portfolio (MEDIUM confidence — based on SaaS design patterns in training data):

| Element | Traditional Portfolio | Dashboard Portfolio |
|---------|----------------------|---------------------|
| Layout | Single column, vertical scroll | Grid of cards, stat widgets |
| Info density | Low — big whitespace, prose | Higher — structured data, numbers |
| Visual hierarchy | Typography-driven | Card borders + shadows + sections |
| Navigation | Section anchors | Sticky nav with active state |
| Data display | Bullet lists | Stats with icons, progress, counts |
| Section transitions | Full-width dividers | Card boundaries |

Concrete patterns to implement:
- **Stat cards**: "5+ Years" / "4 Companies" / "3 Languages" displayed as mini-dashboard widgets
- **Bento grid**: Skills section as categorized bento-style boxes (Backend, Cloud, AI/ML)
- **Project cards**: Image, description, tech tags, links — card style already present in Projects.tsx
- **Experience timeline**: Keep timeline but add card-style entry containers

---

## Sources

- Direct codebase analysis (`src/lib/data.ts`, `src/app/sections/`, `src/lib/translations/en.ts`)
- Architecture analysis from `.planning/codebase/ARCHITECTURE.md`
- Project requirements from `.planning/PROJECT.md`
- Domain knowledge: recruiter portfolio scanning patterns, AI hiring signal trends (training data, confidence: MEDIUM — verify against current job descriptions in the target market if possible)
- Note: WebSearch unavailable during this research session. Recommend spot-checking against current senior developer job postings in Berlin to validate AI skill expectations.
