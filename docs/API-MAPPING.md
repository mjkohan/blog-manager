# API Mapping — DummyJSON ↔ App

Base URL: `https://dummyjson.com` (via `NEXT_PUBLIC_API_BASE_URL`). All network
calls go through `src/lib/api-client.ts`; never `fetch` DummyJSON directly from a
component.

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
  `accessToken` / `refreshToken` cookies → `redirect("/")`.
  Bad credentials (HTTP 400/401) return `{ error }` → surfaced as a
  "Sign-in Failed!" toast; no redirect.
- **Session read** (`getCurrentUser()`, server-only): reads the cookie → `getMe`.
  On 401 it refreshes once (`/auth/refresh`), re-sets cookies, and retries.
- **Route guard** (`middleware.ts`): auth = presence of the `accessToken` cookie.
  Unauthenticated → `/login`; authenticated on `/login`/`/register` → `/`.
- **Logout** (`logoutAction`): `clearSession()` → `redirect("/login")`.

Why httpOnly cookies + Server Actions (not client tokens + React Query): tokens
never reach client JS, so they're XSS-safe. React Query is reserved for the later
article CRUD writes.

## Demo credentials

`emilys` / `emilyspass` (any user from `https://dummyjson.com/users`).
