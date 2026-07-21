import { redirect } from "next/navigation";

import { ROUTES } from "@/lib/constants";
import { getAccessToken } from "@/lib/session";

/**
 * Root redirect. Primary routing for `/` happens in `middleware.ts`; this is a
 * fallback for any request that reaches the page directly: authed → /articles,
 * otherwise → /login.
 */
export default async function Home() {
  const isAuthed = Boolean(await getAccessToken());
  redirect(isAuthed ? ROUTES.articles : ROUTES.login);
}
