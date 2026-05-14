# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server with Turbopack (`http://localhost:3000`)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`next/core-web-vitals` + `next/typescript`)
- Docker: `docker compose up --build` (exposes container on host port `3001`)

No test runner is configured.

## Environment

- `NEXT_PUBLIC_API_EXTERNAL_URL` — base URL of the backend REST API (consumed by `lib/api-external.ts`). The app has no API routes of its own; all data comes from this external service.

## Architecture

This is an admin-only Next.js 15 App Router dashboard (React 19, TypeScript, Tailwind v4, shadcn/ui "new-york" style). It is a thin UI over an external REST API — no database, no internal API routes. Path alias `@/*` resolves to the repo root.

### Routing & auth boundary

- Routes are split by route groups under `app/`:
  - `(protected)/dashboard/**` — admin UI (products, categories, admin, settings).
  - `(public)/**` — `login`, `landing`, `privacy`, `terms-and-conditions`.
- `middleware.ts` is the auth gate. It reads the `accessToken` cookie and, for `/dashboard/*`, requires the JWT to be non-expired AND have `rol === 'admin'` (see `lib/jwt.ts`). On failure it deletes the session and redirects to `/login`. Authenticated users hitting public routes are redirected to `/dashboard`. The matcher excludes `api`, `_next/static`, `_next/image`, and `.png`.
- Sessions are httpOnly cookies set/cleared by `lib/session.ts` (`createSession` / `deleteSession`), 7-day expiry, `secure` + `sameSite=lax`.

### Server Actions are the data layer

All mutations and most reads go through Server Actions in `app/actions/*-actions.ts` (e.g. `category-actions.ts`, `product-actions.ts`). The consistent pattern:

1. Read `accessToken` from `cookies()` and attach as `Authorization: Bearer …`.
2. Call `apiExternal` (axios instance in `lib/api-external.ts`) — the single backend client.
3. For form submissions: `parseForm(formData)` → Zod schema in `lib/definitions/*-schema.ts` → on `safeParse` failure return a `FormState<T>` (`{ value, errors, message, success }`) for `useActionState`; on success either `redirect()` to the detail page or return `{ success: true, value, message }`.
4. API responses follow `ServerResponse<T>` and list endpoints return `Paginated<T, K>` (see `interfaces/rest/common/`).

When adding a new resource, mirror this shape: interface under `interfaces/rest/<resource>/`, Zod schema under `lib/definitions/`, actions under `app/actions/`, and route under `app/(protected)/dashboard/<resource>/`.

### Feature folder convention

Each dashboard feature uses the same internal layout:

- `page.tsx` — list view; renders `<DataTable>` driven by…
- `columns.tsx` — TanStack Table column defs (uses shared `components/data-table-*.tsx`).
- `create/page.tsx` — create form.
- `[id]/page.tsx` — detail/edit form.
- `ui/` — feature-specific presentational pieces (e.g. `category-details.tsx`, `product-details.tsx`).
- `layout.tsx` — feature-scoped layout/breadcrumb.

Generic UI lives in `components/` (shadcn primitives in `components/ui/`, plus shared `data-table*`, `multi-select`, `image-handler`, `app-sidebar`, `nav-bar`).

### Security headers

`next.config.ts` defines a strict CSP and security headers (`X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, etc.) limiting `connect-src`/`img-src` to `self` and `https://esmeraldaenlinea.com`. When introducing new external origins (images, scripts, API hosts), update the CSP here or requests will be blocked.

### Server Action body limit

`experimental.serverActions.bodySizeLimit` is `2mb` (relevant for image uploads — images are submitted as base64 in form fields, e.g. `imageBase64` in `category-actions.parseForm`).
