# Testing Patterns

**Analysis Date:** 2026-03-25

## Test Framework

**Status:** Not detected

**Runner:** Not configured
- No test runner found in `package.json` (Jest, Vitest, or similar)
- No test configuration files (`jest.config.js`, `vitest.config.js`, etc.) present in project root

**Assertion Library:** Not configured

**Test Scripts:** Not available
```bash
# No test commands defined in package.json
# npm test              # Not available
# npm run test:watch   # Not available
# npm run test:coverage # Not available
```

## Current Testing Status

**Project has no test suite.** As noted in `CLAUDE.md`:
- "No test suite: Project currently has no testing setup"
- No `.test.ts`, `.test.tsx`, `.spec.ts`, or `.spec.tsx` files in `src/` directory
- All test files in `node_modules/` belong to dependencies (Zod, Next.js, tsconfig-paths, etc.), not the project itself

## Code Architecture Ready for Testing

Despite the absence of a test suite, the codebase is well-structured for future testing:

### Testable Patterns Identified

**Pure Utility Functions:**
- `getTranslation(key: string, language: Language)` in `src/lib/translations/index.ts` - deterministic, no side effects
- `formatMessage(message: string, variables)` - string manipulation, easy to unit test
- `translateDate(dateString: string, language: Language)` - date localization, deterministic output

**Type-Safe Data:**
- `src/lib/data.ts` exports strongly-typed constants (`as const`), reducing test surface area
- `src/lib/types.ts` defines strict interfaces for data validation

**Context Providers (Mockable):**
- `LanguageContextProvider` in `src/app/context/language-context.tsx` - manages language state
- `LocationProvider` in `src/lib/hooks/useLocationDisplay.tsx` - wraps async location detection
- `ActiveSectionContextProvider` in `src/app/context/active-section-context.tsx` - viewport tracking
- All context hooks validate consumer is wrapped in provider, enabling error boundary testing

**Isolated Business Logic:**
- `useCVSelection()` hook in `src/lib/hooks/useLocationDisplay.tsx` - encapsulates CV download logic
- `useLocationDetection()` hook - async API call with error handling and fallback logic
- Error handling with `console.warn()` provides observable test points

### Components with Dependencies

**Challenge:** Most components are "use client" with deep dependencies:
- `Experience.tsx` (~234 lines) - depends on translations, data, animation library, icons
- `Intro.tsx` (~224 lines) - depends on animations, translation system
- Skills.tsx (~192 lines) - depends on tech mapping and icons
- Suggests integration tests would be more valuable than isolated unit tests

## Recommended Test Structure (Not Yet Implemented)

### Test Framework Recommendation

**Vitest + React Testing Library** suggested for Next.js 15:
- Vitest: Fast, Vite-native, compatible with Node.js test runner
- React Testing Library: Focused on user behavior, aligns with component design
- Both support TypeScript out of the box

### Where to Add Tests

**Unit Tests** (`src/__tests__/unit/`):
```
src/__tests__/unit/
├── translations/
│   ├── getTranslation.test.ts
│   ├── formatMessage.test.ts
│   └── translateDate.test.ts
├── data/
│   └── constants.test.ts
└── hooks/
    └── useLocationDetection.test.ts
```

**Integration Tests** (`src/__tests__/integration/`):
```
src/__tests__/integration/
├── contexts/
│   ├── LanguageContext.test.tsx
│   └── LocationProvider.test.tsx
└── sections/
    ├── Experience.test.tsx
    └── Skills.test.tsx
```

**E2E Tests** (Playwright/Cypress, not yet present):
```
e2e/
├── homepage.spec.ts
├── language-switching.spec.ts
└── cv-download.spec.ts
```

## Test Data & Fixtures

### Mock Patterns to Implement

**Mock Translation Data:**
```typescript
// src/__tests__/fixtures/translations.ts
export const mockTranslations = {
  en: {
    intro: { title: "Test Title" },
    locations: { americas: "Test Location" }
  }
};
```

**Mock Context Providers:**
```typescript
// src/__tests__/fixtures/providers.tsx
export function MockLanguageProvider({
  children,
  language = "en"
}: { children: React.ReactNode; language?: string }) {
  return (
    <LanguageContextProvider defaultLanguage={language}>
      {children}
    </LanguageContextProvider>
  );
}
```

**Mock External API Responses:**
- Location API (`ipapi.co/json/`) would be mocked in tests to avoid network calls
- Framer Motion animations would be mocked or disabled for deterministic tests

## Test Coverage Gaps

### Critical Areas Without Tests

**Translation System** (High Priority):
- `getTranslation()` - missing translation key fallback not tested
- `formatMessage()` - variable replacement edge cases
- Language persistence in localStorage not verified
- Files: `src/lib/translations/index.ts`
- Risk: Silent translation failures, runtime errors from missing keys

**Location Detection** (High Priority):
- `useLocationDetection()` - network failure handling
- Fallback to default location not tested
- Americas country detection logic not verified
- Files: `src/lib/hooks/useLocationDisplay.tsx`
- Risk: Incorrect location-based CV selection, unhandled API errors

**Context Providers** (Medium Priority):
- Provider initialization and state management
- Hook validation (thrown errors when used outside provider)
- LocalStorage persistence for language preference
- Files: `src/app/context/language-context.tsx`, `src/app/context/active-section-context.tsx`
- Risk: Context hook errors in edge cases, state inconsistency

**Component Rendering** (Medium Priority):
- Experience, Skills, Education sections not tested
- Icon mapping logic not verified
- Responsive layout behavior not tested
- Files: `src/app/sections/*.tsx`
- Risk: UI regressions, broken icon displays, layout issues

**Data Integrity** (Low Priority):
- Experience and education data structure validation
- Tech stack icon references consistency
- Files: `src/lib/data.ts`
- Risk: Missing icons, inconsistent data structure

## Known Challenges for Testing

**Animation Dependencies:**
- Framer Motion animations in sections make testing complex
- Would require mocking or disabling animations in test environment
- Suggested approach: Mock `motion` components in tests

**External APIs:**
- Location detection calls real API; network requests needed for integration tests
- CV download triggers browser downloads; difficult to test without headless browser setup

**Next.js Integration:**
- `useSearchParams()` from `next/navigation` requires special setup
- Dynamic imports and lazy loading need mocking

---

*Testing analysis: 2026-03-25*
