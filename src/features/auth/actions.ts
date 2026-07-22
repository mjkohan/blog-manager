"use server";

import { redirect } from "next/navigation";

import { ApiError } from "@/lib/api-client";
import { ROUTES } from "@/lib/constants";
import { clearSession, setSession } from "@/lib/session";

import { addUser, login } from "./api/auth-api";
import { loginSchema, registerSchema } from "./types";

/** Result state consumed by the forms via `useActionState`. */
export interface AuthActionState {
  error?: string;
  ok?: boolean;
}

const INVALID_CREDENTIALS = "Username and/or Password is invalid";
const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Server Action: authenticate against DummyJSON, then mint httpOnly session
 * cookies and redirect home. Returns an error state (for the failure toast)
 * instead of throwing on bad credentials.
 */
export async function loginAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: INVALID_CREDENTIALS };

  try {
    const result = await login(parsed.data);
    await setSession(result);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 400 || error.status === 401)) {
      return { error: INVALID_CREDENTIALS };
    }
    return { error: GENERIC_ERROR };
  }

  // Outside try/catch: redirect() throws NEXT_REDIRECT by design. Go straight to
  // the list (not "/") so we don't bounce through the proxy's home redirect.
  redirect(ROUTES.articles);
}

/**
 * Server Action: simulated registration via DummyJSON /users/add. The write is
 * not persisted (see docs/API-MAPPING.md); on success the form toasts and sends
 * the user to /login.
 */
export async function registerAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = registerSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };

  try {
    await addUser(parsed.data);
  } catch {
    return { error: GENERIC_ERROR };
  }

  return { ok: true };
}

/** Server Action: clear the session and return to /login. */
export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect(ROUTES.login);
}
