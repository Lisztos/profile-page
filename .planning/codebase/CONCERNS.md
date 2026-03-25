# Codebase Concerns

**Analysis Date:** 2025-03-25

## Tech Debt

**Commented Out Features:**
- Issue: Entire "Projects" section is disabled in code (commented out in two places)
  - Files: `src/app/page.tsx` (lines 5, 44-48), `src/lib/data.ts` (lines 8-13), `src/app/sections/Projects.tsx`
- Impact: Dead code clutters the codebase. The Projects.tsx component exists but is unreachable. Maintenance burden increases as code paths diverge
- Fix approach: Either fully remove Projects feature or enable it. If feature is temporary, move commented code to a `disabled/` directory or create a feature flag system

**Theme Switching Disabled:**
- Issue: Theme switching and ThemeSwitch component are disabled throughout codebase
  - Files: `src/app/layout.tsx` (lines 10-11, 62-63), `src/app/context/theme-context.tsx` (full file)
- Impact: Theme context infrastructure exists but is unused, creating dead code. UI has dark mode support that users cannot toggle
- Fix approach: Either remove ThemeSwitch and related context entirely, or enable the feature with a working UI toggle

## Known Bugs

**Location API Potential Failure Mode:**
- Symptoms: When `ipapi.co` is unreachable or returns unexpected format, location detection silently defaults to non-Americas state
  - Files: `src/lib/hooks/useLocationDisplay.tsx` (lines 26-58)
  - Current behavior: Console warning logged, but user may download wrong CV without knowing
- Trigger: Network timeout, API down, unexpected response format (missing `country_code` field)
- Workaround: None exposed to user; CV selection degrades silently to default (non-Americas)

**Translation Key Fallback Silent Failure:**
- Symptoms: Missing translation keys fall back to English, then to key name itself, without prominent user indication
  - Files: `src/lib/translations/index.ts` (lines 26-34)
  - Impact: Users in non-English locales may see untranslated English or raw key names (e.g., "intro.title") instead of translated content
- Trigger: Any missing translation key in language files
- Current mitigation: `console.warn()` logged, but only visible in browser dev tools

## Security Considerations

**Weak Bot Protection on CV Download:**
- Risk: CV download protection uses `window.confirm()` dialog, which is trivial to bypass via browser automation
  - Files: `src/lib/hooks/useLocationDisplay.tsx` (lines 106-123)
- Current mitigation: Basic human check via confirm dialog
- Recommendations: Implement server-side rate limiting per IP, add CAPTCHA, or track download counts in localStorage with time-based decay

**External API Dependency Without Fallback:**
- Risk: Application depends on third-party `ipapi.co` service for location detection with no documented fallback strategy
  - Files: `src/lib/hooks/useLocationDisplay.tsx` (line 30)
- Impact: If ipapi.co is unavailable, all users get default location (affects CV selection and location display)
- Recommendations: Add circuit breaker pattern, cache location results with TTL, implement retry with exponential backoff, or use browser's Geolocation API as secondary fallback

**Hard-coded External URLs Without Validation:**
- Risk: Multiple external links in Experience component have no validation
  - Files: `src/app/sections/Experience.tsx` (lines 35, 49, 62, 77)
- Impact: If linked sites change or go down, user experience degrades. No error handling for failed navigation
- Recommendations: Add link validation in CI/CD, use 404 checks during deployment

## Performance Bottlenecks

**Unoptimized Location Detection:**
- Problem: Location detection runs on every page load via fetch() in effect hook
  - Files: `src/lib/hooks/useLocationDisplay.tsx` (lines 26-61)
- Cause: No caching mechanism; fresh fetch on every mount even if cached recently
- Current capacity: Single blocking fetch that delays page render
- Improvement path: Implement localStorage caching with TTL (24 hours), add request deduplication to prevent multiple simultaneous requests

**Translation Function No Memoization:**
- Problem: `getTranslation()` traverses nested objects on every access without memoization
  - Files: `src/lib/translations/index.ts` (lines 16-35)
- Cause: Called frequently in render loops (e.g., every Experience item renders, every translation key lookup)
- Impact: Unnecessary object traversal on every component render
- Improvement path: Add memoization via useMemo() in components or create cached translation lookup table at startup

**Inefficient Date Translation Regex:**
- Problem: Date translation rebuilds regex for each month on every date render
  - Files: `src/lib/translations/index.ts` (lines 80-87)
- Cause: Regex created in loop for each month instead of pre-compiled patterns
- Impact: Multiple allocations and regex compilations per date element
- Improvement path: Pre-compile month regexes once at module load, reuse across calls

## Fragile Areas

**Language Selector Global Event Listener:**
- Files: `src/app/components/LanguageSelector.tsx` (lines 36-47)
- Why fragile: Click-outside handler added/removed in every render. If component remounts rapidly, listeners may leak
- Safe modification: Use ref-based cleanup or moveListener setup to useCallback with proper dependency array
- Test coverage: No tests for dropdown behavior or listener cleanup

**Experience Section Icon Mapping:**
- Files: `src/app/sections/Experience.tsx` (lines 29-90)
- Why fragile: Long switch statement with hardcoded icon paths. Adding new company requires modifying switch case. Easy to forget Image props (alt text, sizes)
- Safe modification: Extract icon mapping to separate config object in `lib/data.ts`, create reusable IconDisplay component
- Test coverage: No tests for all company icons rendering correctly

**Translation System String Key Pattern:**
- Files: `src/lib/translations/index.ts`, all translation files
- Why fragile: Dot-notation keys like "experience.jobs.innovandio.title" are error-prone to type (no autocomplete in most editors)
- Safe modification: Create typed translation keys using TypeScript const assertions, generate key object from translations
- Test coverage: No validation that all used keys exist in all language files

## Scaling Limits

**Hard-coded Data Structure:**
- Current capacity: Embedded experience/education data in `src/lib/data.ts` with ~5 jobs, 2 education items
- Limit: Will become unwieldy at 20+ experience items; no pagination or filtering
- Scaling path: Move data to external JSON file or CMS, implement server-side rendering for large datasets, add filtering/search UI

**Browser Location API Rate Limits:**
- Current capacity: One location fetch per page load (unique user session)
- Limit: If traffic scales, ipapi.co may rate limit or degrade. No queuing or batching
- Scaling path: Implement location caching per session, add rate limit awareness with backoff, consider private IP geo-database

**Context Provider Nesting Depth:**
- Current capacity: 4 nested context providers in `src/app/layout.tsx`
- Limit: Each provider re-render triggers all children. No optimization via useMemo or composition
- Scaling path: Consolidate related contexts (theme + language into AppConfig context), use useReducer for complex state

## Dependencies at Risk

**No Testing Infrastructure:**
- Risk: Zero test coverage. No Jest/Vitest setup despite TypeScript strict mode
- Impact: Refactoring is high-risk. Bugs in translation system, location detection, context logic are undetected
- Migration plan: Add Jest config, create test suite for utility functions (translations, location detection), add integration tests for context providers

**Missing Error Boundaries:**
- Risk: No React Error Boundary components. Single child error crashes entire app
  - Files: Affects all sections in `src/app/page.tsx`
- Impact: Component crashes (e.g., Image load failure) bring down entire page
- Recommendation: Add Error Boundary wrapper around sections, implement error logging to track issues

**Third-Party Image Asset Risk:**
- Risk: Company logos and profile image loaded from public/ directory with no CDN or backup
  - Files: Multiple Image imports in `src/app/sections/Experience.tsx`, `src/app/sections/Education.tsx`, `src/app/sections/Intro.tsx`
- Impact: If logo images are deleted or corrupted, entire Experience/Education sections break with 404 images
- Recommendation: Add image fallbacks, implement robust Image error handling, version image assets

## Missing Critical Features

**No Analytics Events:**
- Problem: Vercel Analytics integrated but no custom events tracked (e.g., CV downloads, section views, language changes)
  - Files: `src/app/layout.tsx` (line 69)
- Blocks: Cannot measure user engagement, popular sections, language preferences at scale
- Improvement: Add custom event tracking for all interactive features

**No Meta Tags for Dynamic OG Images:**
- Problem: `/api/og/route.tsx` referenced in CLAUDE.md but file doesn't exist or is not functional
  - Files: Not found in codebase
- Blocks: Social media shares show generic preview instead of personalized OG images
- Improvement: Implement dynamic OG image generation route, test social preview rendering

**No Sitemap or robots.txt:**
- Problem: Dynamic sitemap.ts mentioned in CLAUDE.md but not found; no robots.txt for search engine crawlers
  - Files: Not found
- Blocks: SEO optimization, search engine indexing may be suboptimal
- Improvement: Create `public/robots.txt`, verify/create `src/app/sitemap.ts`

## Test Coverage Gaps

**No Tests for Translation System:**
- What's not tested: Key fallback behavior, missing key handling, language switching, date translation
  - Files: `src/lib/translations/index.ts`, `src/lib/hooks/useTranslation.ts`, `src/app/context/language-context.tsx`
- Risk: Breaking changes to translation logic go undetected. Silent failures in language support
- Priority: High (affects all non-English users)

**No Tests for Location Detection:**
- What's not tested: API success/failure handling, fallback to defaults, caching behavior, concurrent requests
  - Files: `src/lib/hooks/useLocationDisplay.tsx`
- Risk: Location-based CV selection breaks silently. No visibility into API failures
- Priority: High (critical business logic)

**No Tests for Context Providers:**
- What's not tested: State management, provider nesting, hook error handling
  - Files: `src/app/context/` (all files)
- Risk: Context-related bugs are only caught in e2e testing or production
- Priority: Medium

**No Async Component Tests:**
- What's not tested: Image loading, external link behavior, animation timing
  - Files: `src/app/sections/`, `src/app/components/`
- Risk: Component rendering bugs, image failures, animation issues undetected
- Priority: Medium

**No E2E Tests:**
- What's not tested: Full user flows (language switching, CV download, section navigation), mobile responsiveness
- Risk: Layout breaks, accessibility issues, interaction bugs in production
- Priority: High (if aiming for portfolio reliability)

---

*Concerns audit: 2025-03-25*
