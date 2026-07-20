import { z } from "zod";

/**
 * Auth schemas + inferred types. Zod is the single source of truth: form inputs
 * are validated with these, and API responses are parsed through them so nothing
 * untyped crosses the network boundary.
 */

const REQUIRED = "Required field";

/** Login form input. Username (DummyJSON authenticates by username) + password. */
export const loginSchema = z.object({
  username: z.string().trim().min(1, REQUIRED),
  password: z.string().min(1, REQUIRED),
});
export type LoginInput = z.infer<typeof loginSchema>;

/** Register form input. Email is validated for shape (write is simulated). */
export const registerSchema = z.object({
  username: z.string().trim().min(1, REQUIRED),
  email: z.string().trim().min(1, REQUIRED).pipe(z.email("Enter a valid email")),
  password: z.string().min(6, "At least 6 characters"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

/** Session tokens returned by /auth/login and /auth/refresh. */
export const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type AuthTokens = z.infer<typeof authTokensSchema>;

/** The authenticated user, as returned by /auth/login and /auth/me. */
export const authUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string().optional(),
  image: z.string().optional(),
});
export type AuthUser = z.infer<typeof authUserSchema>;

/** /auth/login response = user fields + tokens. */
export const loginResponseSchema = authUserSchema.extend(authTokensSchema.shape);
export type LoginResponse = z.infer<typeof loginResponseSchema>;

/** /users/add response (simulated create) — id echoed back with sent fields. */
export const addUserResponseSchema = z.object({
  id: z.number(),
  username: z.string().optional(),
  email: z.string().optional(),
});
export type AddUserResponse = z.infer<typeof addUserResponseSchema>;
