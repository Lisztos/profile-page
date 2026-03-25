# External Integrations

**Analysis Date:** 2026-03-25

## APIs & External Services

**Geolocation:**
- ipapi.co - Location detection service for region-specific content
  - Endpoint: `https://ipapi.co/json/`
  - Used by: `src/lib/hooks/useLocationDisplay.tsx`
  - Purpose: Detect user's country to display region-appropriate location text and select correct CV version
  - No authentication required
  - Client-side call with error fallback to defaults

## Data Storage

**Databases:**
- Not applicable - Portfolio is static content, no database required
- All content stored in `src/lib/data.ts` as TypeScript constants

**File Storage:**
- Local filesystem only
  - Profile photo: `public/images/profile-photo.png`
  - Company logos: `public/images/logos/`
  - Project images: `public/images/projects/`
  - PDF CVs: `public/adrianisanchez-cv.pdf`, `public/adriansanchez-curriculum.pdf`
  - Static assets served by Next.js public directory

**Caching:**
- Next.js built-in caching for static assets
- No external caching service (CDN via Vercel inferred)

## Authentication & Identity

**Auth Provider:**
- None - No user authentication system
- Portfolio is publicly accessible without login

## Monitoring & Observability

**Error Tracking:**
- Not explicitly configured - Errors logged to browser console only
- User-facing error fallback in `useLocationDisplay.tsx` with console.warn()

**Logs:**
- Browser console logging only (`console.warn()` in location detection)
- Vercel server logs available via Vercel dashboard (implicit through deployment)

**Analytics:**
- Vercel Analytics (`@vercel/analytics`) - Event tracking and performance analytics
  - Integration: `src/app/layout.tsx` line 69
  - Tracks user interactions and events
- Vercel Speed Insights (`@vercel/speed-insights`) - Web vitals and performance metrics
  - Integration: `src/app/layout.tsx` line 70
  - Automatically tracks Core Web Vitals (LCP, FID, CLS, etc.)

## CI/CD & Deployment

**Hosting:**
- Vercel - Inferred from framework choice (Next.js) and integration of `@vercel/analytics` and `@vercel/speed-insights`
- Domain: `https://adrianisanchez.dev` (set as metadataBase in `src/app/layout.tsx`)

**CI Pipeline:**
- Not explicitly configured in codebase - Vercel provides automatic deployments on git push

## Environment Configuration

**Required env vars:**
- None - Application requires no environment variables for local or production operation
- `.env` file exists but is empty

**Secrets location:**
- Not applicable - No secrets required
- API integrations use public endpoints (ipapi.co, Google Fonts)

## Webhooks & Callbacks

**Incoming:**
- None configured

**Outgoing:**
- None configured

## External Content & References

**Fonts:**
- Google Fonts API - Inter font family loaded in `src/app/layout.tsx`

**Icons & SVGs:**
- Hero Icons (npm package @heroicons/react) - UI icons
- React Icons (npm package react-icons) - Additional icon sets
- Country flag icons (npm package country-flag-icons) - Flag SVGs for location display

## Metrics & SEO

**Structured Data:**
- JSON-LD schemas embedded in `src/app/layout.tsx`:
  - Person schema for Adrian Sanchez
  - WebSite schema for portfolio metadata
  - Open Graph metadata for social sharing

**Sitemap:**
- Generated dynamically via `src/app/sitemap.ts` (Next.js native feature)

**Robots:**
- `public/robots.txt` - Search engine crawling rules

## Design & Performance

**Image Optimization:**
- Next.js Image component for optimized image delivery (next/image)
- Dynamic OG image generation via `/api/og` route using `next/og`

---

*Integration audit: 2026-03-25*
