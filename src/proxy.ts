import { NextResponse, type NextRequest } from "next/server";

import { COOKIE, ROUTES } from "@/lib/constants";

const PUBLIC_PATHS = new Set<string>([ROUTES.login, ROUTES.register]);

/**
 * Route guard (Next 16 Proxy — the renamed Middleware). Auth = presence of the
 * httpOnly `accessToken` cookie.
 * - Root `/` → /articles when authed, /login otherwise.
 * - Unauthenticated request to a protected route → redirect to /login.
 * - Authenticated request to /login or /register → redirect to /articles.
 * The matcher below excludes Next internals, static assets, and API routes.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = Boolean(request.cookies.get(COOKIE.accessToken)?.value);
  const isPublic = PUBLIC_PATHS.has(pathname);

  if (pathname === ROUTES.home) {
    const url = request.nextUrl.clone();
    url.pathname = isAuthed ? ROUTES.articles : ROUTES.login;
    return NextResponse.redirect(url);
  }

  if (!isAuthed && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.login;
    return NextResponse.redirect(url);
  }

  if (isAuthed && isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.articles;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
