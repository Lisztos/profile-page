# Coding Conventions

**Analysis Date:** 2026-03-25

## Naming Patterns

**Files:**
- PascalCase for React components (e.g., `Header.tsx`, `Experience.tsx`, `LanguageSelector.tsx`)
- camelCase for utility functions and hooks (e.g., `useTranslation.ts`, `useLocationDisplay.tsx`)
- lowercase with hyphens for Next.js routes (e.g., `page.tsx`, `layout.tsx`, `route.tsx`)
- UPPERCASE for configuration constants in data files

**Functions:**
- camelCase for all functions and methods: `getTranslation()`, `formatMessage()`, `handleCVDownload()`
- Descriptive verb-noun pattern: `getCompanyIcon()`, `getTechStackIcon()`, `handleLanguageChange()`
- Hook functions prefixed with `use`: `useTranslation()`, `useLanguage()`, `useLocationDisplay()`, `useCVSelection()`
- Export functions as `export default` or named exports depending on component type

**Variables:**
- camelCase for local variables and function parameters
- snake_case for data object keys (e.g., `country_code`, `country_name`, `job_key`)
- UPPERCASE for constants and configuration values (e.g., `LanguageContext`, `LocationContext`)
- Boolean variables prefixed with `is`, `has`, or `can`: `isAmericas`, `isLoading`, `isMounted`, `showDuck`

**Types:**
- PascalCase for TypeScript interfaces and types: `LocationData`, `LocationContextType`, `CardProps`, `ExperienceItem`, `EducationItem`
- Type suffix convention: `Type` for context types (`LanguageContextType`, `LocationContextType`)
- Type union for limited enumerations: `Language = "en" | "es" | "de"`, `SectionName = "Home" | "Projects" | "Skills" | "Experience" | "Education"`

## Code Style

**Formatting:**
- No explicit Prettier config found; inferred style from codebase:
  - 2-space indentation (standard Next.js/React)
  - Semicolons required at end of statements
  - Single quotes for string literals (inconsistent - both single and double used)
  - Max line length appears to be 100-120 characters

**Linting:**
- ESLint configured via `eslint.config.mjs` (flat config format)
- Extends `next/core-web-vitals` and `next/typescript` presets
- Run with: `npm run lint`
- No custom ESLint rules beyond Next.js defaults; uses Next.js recommended configuration

**TypeScript Configuration:**
- Strict mode enabled (`"strict": true`)
- Target: ES2017
- Module resolution: `bundler` (Next.js 13+)
- JSX: `react-jsx`
- `isolatedModules: true` for Turbopack compatibility

## Import Organization

**Order:**
1. React and external libraries (`react`, `next/`, third-party packages)
2. Internal components and utilities (`@/app/`, `@/lib/`)
3. Types and data (`@/lib/types`, `@/lib/data`)
4. Styles (CSS/Tailwind classes in JSX)

**Examples:**
```typescript
import React, { createContext, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Header from "./components/Header";
import { experienceData } from "@/lib/data";
import { useTranslation } from "@/lib/hooks/useTranslation";
import { getTranslation } from "@/lib/translations";
```

**Path Aliases:**
- Primary alias: `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- All imports use `@/` prefix: `@/app/`, `@/lib/`, `@/components/`
- Avoid relative imports; use path aliases instead

## Error Handling

**Patterns:**
- Try-catch blocks with informative console warnings on external API failures (e.g., location detection)
  ```typescript
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('Failed to fetch location data');
    const data = await response.json();
  } catch (error) {
    console.warn('Location detection failed, using defaults:', error);
    // Fallback to sensible defaults
  }
  ```
- Context hooks validate they're used within their provider and throw descriptive errors:
  ```typescript
  if (context === null) {
    throw new Error("useLanguage must be used within a LanguageContextProvider");
  }
  ```
- Graceful degradation: API failures don't crash the app; fallback values are used
- Client-side errors logged to console with context information

## Logging

**Framework:** `console` (browser console API)

**Patterns:**
- `console.warn()` for non-critical warnings (location API failures, missing translation keys)
- `console.error()` not explicitly used; fatal errors thrown instead
- Warning message format: `"[Feature Name] failed, [fallback behavior]: error"`
- Example: `console.warn('Location detection failed, using defaults:', error);`
- Minimal logging in production; warnings used mainly for development debugging

**Translation Fallbacks:**
- Missing translation keys logged as warnings with the key and language context
- Example: `console.warn(\`Translation key "${key}" not found in language "${language}"\`);`

## Comments

**When to Comment:**
- Explain the "why" not the "what" (code clarity should be self-explanatory)
- Used for non-obvious logic or workarounds:
  - `// Load saved language preference from localStorage`
  - `// Single API call to get location data` (explains optimization choice)
  - `// Simple human verification to prevent bots` (explains business logic)
- Used for marking temporarily disabled features:
  - `// Theme switch is temporarily disabled`
  - `// Projects section temporarily hidden`

**JSDoc/TSDoc:**
- Minimal use of JSDoc; function signatures are self-documenting via TypeScript
- Interface properties documented via TypeScript types, not JSDoc comments
- No formal JSDoc blocks observed in codebase; description provided inline when needed

## Function Design

**Size:**
- Most functions 10-30 lines of code
- Larger functions like `Experience.tsx` component (~234 lines) are broken into helper functions
- Helper functions extracted as nested functions or separate utilities when logic repeats

**Parameters:**
- Destructured object parameters for React components: `({ children, id, className = "" }: CardProps)`
- Optional parameters have default values: `className = ""`
- Type-safe parameters enforced with TypeScript interfaces
- Callback parameters typed as event handlers: `(e: React.MouseEvent) => void`

**Return Values:**
- Components return JSX elements (explicit typing via `export default function`)
- Hooks return objects with named properties: `{ t }`, `{ language, setLanguage }`, `{ displayLocation, isLoading }`
- Utility functions return typed values (strings, booleans, objects)
- No `null` returns in error handling; instead use graceful fallbacks or throw errors

## Module Design

**Exports:**
- Default exports for React components (files with one primary export)
- Named exports for utility functions and context providers
- Data files use named exports: `export const experienceData`, `export const links`
- Mixed approach in some files: context provider as default export, hook as named export

**Barrel Files:**
- Context providers defined in single files with multiple exports:
  - `src/app/context/language-context.tsx` exports both provider and hooks
  - `src/lib/hooks/useLocationDisplay.tsx` exports multiple hooks from shared location context
- Translation module (`src/lib/translations/index.ts`) aggregates language files and utilities
- No explicit barrel index files; imports are direct from source files

**File Organization:**
- Components colocated with their context providers: `src/app/context/`
- Hooks grouped by domain: `src/lib/hooks/`
- Utilities and data separated: `src/lib/data.ts`, `src/lib/types.ts`, `src/lib/translations/`
- Sections organized by page layout: `src/app/sections/`

---

*Convention analysis: 2026-03-25*
