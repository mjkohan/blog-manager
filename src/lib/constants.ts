/**
 * App-wide constants. Single source for the API base URL, auth cookie names,
 * token lifetimes, and route paths so nothing is hard-coded at call sites.
 */

/** DummyJSON base URL. Public env (safe to expose — it's the mock API host). */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dummyjson.com";

/** httpOnly session cookie names (set by our Server Actions, not DummyJSON). */
export const COOKIE = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
} as const;

/** Access-token lifetime in minutes — sent to DummyJSON and used for cookie maxAge. */
export const ACCESS_TOKEN_TTL_MINUTES = 30;

/** Refresh-token cookie lifetime (DummyJSON refresh tokens are longer-lived). */
export const REFRESH_TOKEN_TTL_DAYS = 7;

/** Application route paths. */
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
} as const;
