# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two roughly equal audiences, both self-serving and unassisted: recruiters/hiring managers screening
Adrian Sanchez for a role, and potential clients/collaborators considering hiring him for freelance or
contract work. Both are evaluating fit quickly, without a guided sales process.

## Product Purpose

Adrian Sanchez's personal portfolio/CV site. It exists to give either audience a fast, credible read on
who he is, what he's worked on, and whether to reach out. Success is a strong impression and clarity on
fit — there is no hard conversion goal or CTA pressure; a booked call (via the cal.eu link) or outreach
is a welcome outcome, not the metric the site is designed around.

## Positioning

A working software engineer's own site, not a template résumé: generalist full-stack/product engineer
(backend, frontend, infra, AI-in-the-loop) who has shipped in small teams/startups rather than large-org
career-ladder roles. Currently Software Engineer at One Call (.NET Core platform, Physical Medicine
division), based in Basel, Switzerland. Previously Senior Software Engineer at Innovandio GmbH.

## Operating Context

Single-page site (`src/app/page.tsx`), currently an editorial masthead layout (not the older tabbed
Skills/Experience/Education/GitHub-Stars layout — that architecture was replaced; see note below).
Visitors land, scan, and leave within one session; there is no multi-page navigation or account/login
flow to account for.

## Capabilities and Constraints

- English-only. There is no i18n system in the current codebase (no translation files, no language
  context/provider, no language selector) — this is the current, deliberate state, not an in-progress
  gap.
- Content sourced from `src/lib/site.ts` (identity, role, intro, work history, tech-stack ticker items,
  project list) and `src/lib/github.ts` (starred GitHub repos).
- CV files exist as static PDFs in `public/` for region-based serving; no Spanish CV.
- No backend/database beyond the GitHub API proxy; no auth, no forms that collect user data.
- Stack: Next.js, React, TypeScript, Tailwind CSS (pre-existing codebase; not a greenfield stack
  decision).

## Brand Commitments

- Name: Adrian Sanchez. Role line: "Software Engineer" at "One Call".
- Voice: professional, not casual — per user request, moved away from the earlier slangy voice
  ("pays rent", "reach me", "EST. ... IN PROD"). No em dashes in any site copy.
- Location line: "BASEL, CH".
- Employment facts are sourced from LinkedIn (linkedin.com/in/adrian-isaias-sanchez), not invented:
  One Call (current), Innovandio GmbH (Senior Software Engineer, Oct 2023 to May 2026), Demodesk
  (started as Software Engineer Intern Feb 2022, grew into Full Stack Software Engineer / Team-Lead,
  through Sep 2023), Setting.io and Almondia GmbH (earlier working-student roles). There is no "HQ"
  employer, that was a past inaccuracy.

## Evidence on Hand

- Real employment history and company names in `src/lib/site.ts` (One Call, Innovandio, Demodesk, HQ,
  Almondia) — do not invent employers, dates, or titles not already recorded there.
- Real GitHub starred repos pulled live via `src/lib/github.ts` / `/api/github-stars` — do not fabricate
  repos.
- Project list in `src/lib/site.ts` (`projects`) currently has titles/kickers only, no descriptions,
  metrics, or outcomes — do not invent metrics, client names, or testimonials to fill this in.

## Product Principles

- Credibility over persuasion: the site should read as evidence, not a pitch.
- No fabricated proof, ever: no invented testimonials, client logos, metrics, or case-study numbers.
- Plain, terse voice throughout — no jargon inflation or self-aggrandizing copy.
- Single page, fast scan: don't reintroduce multi-tab/multi-page navigation without a deliberate reason.
- Dual-audience by default: don't optimize copy or layout so hard for recruiters that it reads badly to
  a prospective client, or vice versa.
