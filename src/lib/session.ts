import "server-only";

import { cookies } from "next/headers";

import { ACCESS_TOKEN_TTL_MINUTES, COOKIE, REFRESH_TOKEN_TTL_DAYS } from "./constants";

/**
 * httpOnly session management. DummyJSON returns JWTs in the response body; its
 * own `Set-Cookie` can't bind to our origin, so we mint our **own** httpOnly
 * cookies here (server-only) — tokens are never exposed to client JS (XSS-safe).
 */

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function setSession({ accessToken, refreshToken }: SessionTokens): Promise<void> {
  const store = await cookies();
  store.set(COOKIE.accessToken, accessToken, {
    ...baseCookieOptions,
    maxAge: ACCESS_TOKEN_TTL_MINUTES * 60,
  });
  store.set(COOKIE.refreshToken, refreshToken, {
    ...baseCookieOptions,
    maxAge: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE.accessToken);
  store.delete(COOKIE.refreshToken);
}

export async function getAccessToken(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE.accessToken)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE.refreshToken)?.value;
}
