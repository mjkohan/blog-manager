# Blog Admin Dashboard — Arvancloud Challenge

A dashboard to manage blog articles (list, create, edit, delete), built from a
Figma design against the [DummyJSON](https://dummyjson.com) mock API.
Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4.

## Getting Started

```bash
pnpm install
cp .env.example .env.local   # NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to
`/login` until you sign in.

## Scripts

```bash
pnpm dev            # dev server
pnpm build          # production build
pnpm typecheck      # tsc --noEmit
pnpm lint           # eslint
pnpm test:run       # vitest (run)
pnpm storybook      # component catalog on :6006
```

## Authentication

Auth runs against DummyJSON. **Demo credentials:** `emilys` / `emilyspass`
(any user from `https://dummyjson.com/users`).

- **Login** is a **Server Action** that calls `/auth/login`, then sets our own
  **httpOnly** `accessToken` / `refreshToken` cookies server-side. Tokens never
  touch client JS (XSS-safe). Wrong credentials show a "Sign-in Failed!" toast.
- **Session**: server components read the cookie and call `/auth/me`; an expired
  access token is transparently refreshed once via `/auth/refresh`.
- **Route guard**: `middleware.ts` redirects unauthenticated users to `/login`
  and bounces authenticated users off `/login` / `/register`.
- The login field is labelled **Username** (DummyJSON authenticates by username,
  not email — see [`docs/API-MAPPING.md`](docs/API-MAPPING.md)).

> **Simulated writes.** DummyJSON does not persist writes. **Register**
> (`/users/add`) validates and submits, but the account is not stored and cannot
> be logged into — it demonstrates the full form/validation flow only. The same
> applies to article create/update/delete (added later).

Forms use **react-hook-form + Zod**; validation errors render as the design's
`Required field` state. See [`docs/API-MAPPING.md`](docs/API-MAPPING.md) for the
full endpoint list and design↔API mismatch handling, and
[`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) for UI conventions.

## Deploy

Deploys to [Vercel](https://vercel.com). Set `NEXT_PUBLIC_API_BASE_URL` in the
project's environment variables.
