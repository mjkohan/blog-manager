import "server-only";

import { ApiError } from "@/lib/api-client";
import { getAccessToken, getRefreshToken, setSession } from "@/lib/session";

import { getMe, refresh } from "./api/auth-api";
import type { AuthUser } from "./types";

/**
 * Resolve the current user from the httpOnly session cookie (server-only).
 * On a 401 (expired access token) it transparently refreshes once, re-sets the
 * session cookies, and retries. Returns `null` when there is no valid session.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    return await getMe(accessToken);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) return null;

    const refreshToken = await getRefreshToken();
    if (!refreshToken) return null;

    try {
      const tokens = await refresh(refreshToken);
      // Persisting the refreshed cookies is best-effort: `cookies().set()` throws
      // when called during a Server Component render (only Server Actions / Route
      // Handlers may write cookies). Swallow that so we still resolve the user
      // with the fresh token — otherwise a single 401 wipes the header greeting.
      try {
        await setSession(tokens);
      } catch {
        // Not in a writable context; the cookie refresh will happen on the next
        // Server Action / login. The in-memory token is enough for this render.
      }
      return await getMe(tokens.accessToken);
    } catch {
      return null;
    }
  }
}
