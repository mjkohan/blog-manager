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
      await setSession(tokens);
      return await getMe(tokens.accessToken);
    } catch {
      return null;
    }
  }
}
