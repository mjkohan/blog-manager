# Engineering Guide

Architecture, conventions, and constraints for this repository. Skim before contributing.

---

## 1. Project Overview

**Blog Admin Dashboard.** A dashboard to manage blog articles (list, create, edit,
delete), built pixel-close to a Figma design against the DummyJSON mock API.

**Design goals:**

- Pixel-faithful to the Figma Design Kit, with all component states (hover / focus / disabled / error).
- Responsive down to tablet & mobile (mobile was not in the design — the responsive decisions are ours).
- Clean architecture, typed end-to-end, good docs, meaningful git history, live deploy.
- Handle the mismatches between the design and the mock API explicitly (see §7).

**Package manager: `pnpm`** (see `pnpm-lock.yaml`). Always use `pnpm`, never `npm`/`yarn`.

---

## 2. Tech Stack

- **Next.js 16 (App Router)** + React 19.2 + **TypeScript (strict)**.
- **Tailwind CSS 4** — design tokens live in CSS via `@theme` in `src/app/globals.css`
  (no `tailwind.config.js`); that is the single source of truth.
- **TanStack Query (React Query)** for client-side mutations + cache.
- **React Server Components** for reads (list, detail).
- **react-hook-form + Zod** for forms & validation.
- **Vitest + React Testing Library + MSW** (unit/component), **Playwright** (E2E).
- **Storybook 9** (`@storybook/nextjs-vite`) for the component catalog.
- Deploy: **Vercel**. CI: **GitHub Actions** (`.github/workflows/ci.yml`).

Prefer the stack above; introduce a new dependency only with a clear reason noted in the commit body.

---

## 3. Commands

```bash
pnpm dev             # start dev server
pnpm build           # production build (must pass before any deploy/PR)
pnpm start           # run production build locally
pnpm lint            # eslint
pnpm typecheck       # tsc --noEmit  (must be clean; no `any`)
pnpm format          # prettier --write .
pnpm format:check    # prettier --check .  (CI gate)
pnpm test:run        # vitest (run)
pnpm test:e2e        # playwright end-to-end
pnpm storybook       # component workshop on :6006
pnpm build-storybook # static Storybook -> storybook-static/
```

Run `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, and `pnpm test:run` before
finishing any task — all must pass. Husky runs `lint-staged` + `typecheck` pre-commit
and commitlint on the message; do not bypass with `--no-verify`.

---

## 4. Project Structure (feature-based, not type-based)

```
src/
  app/
    (dashboard)/
      layout.tsx                 # Shell: Sidebar + Header (persists across nav)
      articles/
        page.tsx                 # /articles          (page 1)
        page/[page]/page.tsx     # /articles/page/2 ...
        create/page.tsx          # /articles/create
        edit/[slug]/page.tsx     # /articles/edit/:slug
        loading.tsx  error.tsx
    login/page.tsx  register/page.tsx
  components/
    ui/                          # base design-kit components (presentational)
    layout/                      # Sidebar, Header, Shell
  features/
    articles/{api,components,hooks,getArticles,types.ts}
    auth/{api,actions,session,types.ts}
  lib/
    api-client.ts                # single fetch wrapper
    utils.ts                     # slugify, excerpt, syntheticDate, cn, ...
    constants.ts
  hooks/                         # shared: useMediaQuery
  proxy.ts                       # route guard (Next 16 Proxy — sibling of app/)
```

**Rules:**

- `components/ui/*` are presentational only — no data fetching, no domain logic.
- Domain logic lives in `features/*`.
- One component per folder, co-located with its `.stories.tsx` and `.test.tsx`.

---

## 5. Routing

| Route                  | Meaning                             |
| ---------------------- | ----------------------------------- |
| `/articles`            | article list, page 1 (special path) |
| `/articles/page/:page` | article list, pages 2..N            |
| `/articles/create`     | create form                         |
| `/articles/edit/:slug` | edit form, prefilled                |
| `/login` · `/register` | auth                                |

The "page 1 → `/articles`, else `/articles/page/:page`" split is a design detail;
do not collapse it into a single query-param route.

---

## 6. Data Fetching Strategy

- **Reads (list, detail):** fetch in **Server Components**. Read `params`/`searchParams`
  for the current page. Pagination is server-side: `limit` fixed (10),
  `skip = (page-1)*limit`, use `total` from the response to compute page count.
- **Writes (create/update/delete):** **React Query mutations** with **optimistic
  updates**. Because DummyJSON does not persist writes, mutations layer their result
  onto the server rows through an in-memory **session overlay** (`useArticleOverlay`)
  rather than refetching — a refetch would resurrect a deleted row / drop a created
  one. The overlay clears on a hard reload. See `docs/API-MAPPING.md`.
- All network calls go through `lib/api-client.ts`; never `fetch` DummyJSON directly
  from a component.
- Every fetch has typed input/output and handled error + loading + empty states.

---

## 7. DummyJSON API — Endpoints & Gotchas

Base URL: `https://dummyjson.com` (via `NEXT_PUBLIC_API_BASE_URL`).

```
GET    /posts?limit=10&skip=0            # list + pagination (read `total`)
GET    /posts/{id}                       # single post (for edit)
GET    /posts/tag-list                   # tag list -> SORT ALPHABETICALLY
GET    /users/{userId}?select=username   # author username (cache per userId)
POST   /posts/add                        # create (simulated, not persisted)
PUT    /posts/{id}                       # update (simulated)
DELETE /posts/{id}                       # delete -> { isDeleted, deletedOn }
POST   /auth/login                       # -> accessToken
GET    /auth/me                          # current user (needs token)
```

**Design ↔ API mismatches — handled explicitly, documented in `docs/API-MAPPING.md`:**

| Design field           | Reality                | Handling                                                |
| ---------------------- | ---------------------- | ------------------------------------------------------- |
| `Author` = `@username` | post only has `userId` | fetch `/users/{userId}?select=username`, cache per id   |
| `Created` (date)       | not in API             | stable date derived from post id; noted in docs         |
| `Description`          | not in post schema     | kept in the form, sent on submit (write is simulated)   |
| `slug` (edit route)    | not in API             | derive via `slugify(title)`; map slug↔id to fetch by id |
| `Tags` picker list     | `/posts/tag-list`      | sort alphabetically                                     |
| `Excerpt`              | no field               | first 20 words of `body`, client-side                   |

**Writes are simulated and do not persist.** Use optimistic UI so the interaction
feels real, and state this limitation clearly in the README. Do not pretend writes persist.

---

## 8. UI / Design System Rules

- Pull colors, typography, spacing, radius, shadows from Figma into `@theme` in
  `src/app/globals.css`. Single source of truth.
- Primary/action color is the teal/green from the design; error is the red border/text (`Required field`).
- Build every base component with all states: default / hover / focus / filled / disabled / **error**.
- LTR, English UI (`dir="ltr"`). Prefer logical CSS properties (`ms-*`/`me-*`, `text-start`).
- Table on desktop; on mobile convert rows to stacked cards. Sidebar becomes a drawer on mobile/tablet.
- Row `…` menu → dropdown with Edit / Delete. Delete opens a focus-trapped ConfirmDialog.
- Success actions show a toast (e.g. "Article updated" / "Article created").

---

## 9. Accessibility & Performance

- Full keyboard navigation; focus trap in modals/menus; visible focus rings.
- Proper ARIA labels; `<th scope>` in tables; sufficient contrast; `alt` on images.
- Use `next/image`, code-split, avoid needless re-renders, prefetch links.
- No unhandled promise rejections; every async path has an error state.

---

## 10. Forms & Validation

- react-hook-form + Zod schemas colocated with each form in `features/articles`.
- `Title` is required → show `Required field` + red border on the input.
- Submit button: disabled when invalid, loading while submitting.
- On success: toast + redirect to the list.

---

## 11. Coding Conventions

- TypeScript strict; **never use `any`** (use `unknown` + narrowing if needed).
- Prefer server components; add `"use client"` only for state/effects/handlers/browser APIs.
- Named exports for components. `UpperCamelCase` component files, `camelCase` utils.
- Keep components small and single-responsibility. Extract logic into hooks.
- No dead code, no leftover `console.log`, no commented-out blocks.
- Use the `cn()` helper for conditional classes; no inline style objects unless dynamic.

---

## 12. Git & Commits

- **Conventional Commits**: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`.
- Small atomic commits; one logical change each.
- Work on feature branches; keep history clean and readable.
- Husky + lint-staged run lint/format/typecheck pre-commit — do not bypass with `--no-verify`.

---

## 13. Testing

- Unit-test pure utils (`slugify`, `excerpt`, pagination math, `applyOverlay`) and key base components.
- E2E (Playwright) for the main flows: login, create, delete, pagination.
- Mock the API with MSW in tests — do not hit the real DummyJSON in test runs.
- Coverage need not be 100%; tests should be meaningful, not decorative.

---

## 14. Definition of Done

- [ ] Matches the design (states included) and is responsive on mobile/tablet.
- [ ] `typecheck`, `lint`, `format:check`, `test:run` all pass; `build` succeeds.
- [ ] Loading / error / empty states present.
- [ ] a11y: keyboard + focus + labels OK.
- [ ] No `any`, no `console.log`, no dead code.
- [ ] Relevant docs updated (README / API-MAPPING / DESIGN-SYSTEM).
- [ ] Conventional-commit message written.

---

## 15. Things to Avoid

- Don't call DummyJSON directly from components — always via `api-client`.
- Don't collapse the `/articles` vs `/articles/page/:page` routing.
- Don't claim writes persist; they don't (mock).
- Don't add heavy dependencies for trivial needs.
- Don't ship a desktop-only layout — tablet/mobile matters.
- Don't skip the empty/error/loading states.
