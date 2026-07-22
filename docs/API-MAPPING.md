# API Mapping — DummyJSON ↔ App

Base URL: `https://dummyjson.com` (via `NEXT_PUBLIC_API_BASE_URL`). All network
calls go through `src/lib/api-client.ts`; never `fetch` DummyJSON directly from a
component.

## Endpoints in use (articles)

| Endpoint                          | Used by                                      | Notes                                                                                                                         |
| --------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `GET /posts?limit&skip&select`    | `features/articles/api/posts-api › getPosts` | List page. `limit` fixed = `ARTICLES_PER_PAGE` (10); `skip = (page-1)*limit`. Reads `total`. `select=title,body,tags,userId`. |
| `GET /users/{id}?select=username` | `getUsername`                                | Author `@username`. Deduped per `userId` within a render via React `cache()` in `getArticles`.                                |
| `GET /posts/tag-list`             | `getTagList`                                 | Tag names for the form picker. **Sorted alphabetically** (Figma tip).                                                         |
| `GET /posts?limit=0&select=title` | `getPostIdBySlug`                            | Slug → id: scan all titles, match `slugify(title)`. `null` ⇒ 404. See slug note below.                                        |
| `GET /posts/{id}`                 | `getPost`                                    | Full post for the edit-form prefill.                                                                                          |
| `POST /posts/add`                 | `createPost`                                 | **Simulated** create — not persisted (see below).                                                                             |
| `PUT /posts/{id}`                 | `updatePost`                                 | **Simulated** update — not persisted (see below).                                                                             |
| `DELETE /posts/{id}`              | `deletePost`                                 | **Simulated** delete — not persisted (see below).                                                                             |

All responses are validated with Zod (`features/articles/types.ts`).

## Article list — reads vs. writes (architecture)

- **Read (list) = Server Component.** `getArticles(page)` runs on the server:
  fetches the page, resolves each author, and derives the view model
  (`ArticleRow`). No client fetch, no loading flash, URL is the source of truth
  for the page. Both routes (`/articles`, `/articles/page/:page`) call
  `ArticlesView` → `getArticles`.
- **Writes (create / edit / delete) = optimistic + a session overlay + refresh.**
  All three mutations layer their result onto the server rows through an in-memory
  **overlay** (`useArticleOverlay`, held in the React Query cache): `deleted` is an
  **array of ids** (multi-delete safe), `created` is prepended on page 1, and
  `updated` is a per-id field patch. `applyOverlay(serverRows, overlay, page)`
  reconciles the two so the list reflects the mutation on every page.
  - **Why an overlay, not plain refetch.** DummyJSON writes are simulated — a
    refetch would resurrect a deleted row, drop a created one, and revert an edit.
    So each mutation updates the overlay optimistically (rolling back on error),
    then calls `router.refresh()` to re-pull fresh server data; the overlay is
    re-applied on top, keeping the table both **in sync and honest**.
  - **Scope: session-only.** The overlay lives in JS memory (`staleTime`/`gcTime`
    Infinity), so it survives client navigation + `router.refresh()` but is
    **cleared on a hard browser reload** — after which the list shows raw
    DummyJSON data again (deletes undone, creates gone, edits reverted). This is
    the deliberate consequence of a non-persisting mock; against a real backend
    you'd drop the overlay and `invalidateQueries` instead.

## Design ↔ API mismatches — article list (handled explicitly)

| Design column    | Reality                 | Handling                                                                                                                             |
| ---------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `Author` `@name` | post has only `userId`  | `GET /users/{userId}?select=username`, cached per id (`cache()`); fallback `userN`.                                                  |
| `Created` (date) | **no field in the API** | Synthetic **stable** date derived from post `id` (`getArticles › syntheticDate`). Presentational only, never shifts between renders. |
| `Excerpt`        | **no field**            | First 20 words of `body` via `excerpt()` (`lib/utils.ts`).                                                                           |
| `Tags`           | `string[]` on the post  | Joined with `, ` in the cell.                                                                                                        |
| `slug` (edit)    | **not in the API**      | `slugify(title)` (`lib/utils.ts`); the edit route is `/articles/edit/:slug`.                                                         |
| `Description`    | **not in post schema**  | Kept in the create/edit form and sent on the (simulated) write; edit prefill starts empty. See create/edit note below.               |

## Article create / edit (writes)

- **Reads (form data) = Server Components.** `/articles/create` fetches the sorted
  tag list + current user (author `userId`); `/articles/edit/:slug` resolves the
  slug → post (`getArticleForm`) and prefills. Both pass into the shared client
  `ArticleForm` (RHF + Zod; only **Title** is required → `Required field`).
- **Writes (create/update) = React Query mutations** (`useCreateArticle` /
  `useUpdateArticle`). On success: toast + redirect to the list + `router.refresh()`.
  Both are **simulated** by DummyJSON and do not persist.
- **Slug → id:** DummyJSON posts have no slug, so `getPostIdBySlug` scans every
  post title once (`limit=0&select=title`) and matches `slugify(title)`. Keeps the
  visible slug `= slugify(title)` (no id in the URL); an unknown slug 404s.
- **Tags:** `getTagList` sorts alphabetically. The picker lets the user add a new
  tag (checked by default, uncheckable) on top of the API list.

## Endpoints in use (auth)

| Endpoint             | Used by                                   | Notes                                                                                        |
| -------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------- |
| `POST /auth/login`   | `features/auth/api/auth-api.ts › login()` | Body `{ username, password, expiresInMins }`. Returns user + `accessToken` + `refreshToken`. |
| `GET /auth/me`       | `getMe()`                                 | `Authorization: Bearer <accessToken>`. Returns the current user.                             |
| `POST /auth/refresh` | `refresh()`                               | Body `{ refreshToken, expiresInMins }`. Returns fresh tokens.                                |
| `POST /users/add`    | `addUser()`                               | **Simulated** create — not persisted (see below).                                            |

## Design ↔ API mismatches (handled explicitly)

| Design                           | Reality                                                                             | Handling                                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Login field labelled **Email**   | DummyJSON authenticates by **username** (e.g. `emilys`)                             | Field relabelled to **Username**. Value sent as `username` to `/auth/login`.                                   |
| Register creates an account      | `/users/add` is **simulated**; the response is not stored and cannot be logged into | Form validates + POSTs + toasts + redirects to `/login`. Documented as non-persistent.                         |
| Tokens as cookies from DummyJSON | Cross-origin `Set-Cookie` from `dummyjson.com` can't bind to our origin             | We read the tokens from the JSON body and set our **own** httpOnly cookies server-side (`src/lib/session.ts`). |

## Session & auth flow

- **Login** (`features/auth/actions.ts › loginAction`, a Server Action):
  validate with Zod → `login()` → `setSession()` writes httpOnly
  `accessToken` / `refreshToken` cookies → `redirect("/articles")`.
  Bad credentials (HTTP 400/401) return `{ error }` → surfaced as a
  "Sign-in Failed!" toast; no redirect.
- **Session read** (`getCurrentUser()`, server-only): reads the cookie → `getMe`.
  On 401 it refreshes once (`/auth/refresh`), re-sets cookies, and retries.
- **Route guard** (`proxy.ts`, Next 16's renamed Middleware): auth = presence of the `accessToken` cookie.
  Unauthenticated → `/login`; authenticated on `/login`/`/register` → `/`.
- **Logout** (`logoutAction`): `clearSession()` → `redirect("/login")`.

Why httpOnly cookies + Server Actions (not client tokens + React Query): tokens
never reach client JS, so they're XSS-safe. React Query is reserved for the later
article CRUD writes.

## Demo credentials

`emilys` / `emilyspass` (any user from `https://dummyjson.com/users`).
