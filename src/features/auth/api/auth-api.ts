import { apiClient } from "@/lib/api-client";
import { ACCESS_TOKEN_TTL_MINUTES } from "@/lib/constants";

import {
  addUserResponseSchema,
  authTokensSchema,
  authUserSchema,
  loginResponseSchema,
  type AddUserResponse,
  type AuthTokens,
  type AuthUser,
  type LoginInput,
  type LoginResponse,
  type RegisterInput,
} from "../types";

/**
 * DummyJSON auth endpoints. Each response is parsed through its Zod schema so
 * the rest of the app only ever sees validated, typed data.
 */

/** POST /auth/login → user + accessToken + refreshToken. */
export async function login(input: LoginInput): Promise<LoginResponse> {
  const data = await apiClient.post<unknown>("/auth/login", {
    username: input.username,
    password: input.password,
    expiresInMins: ACCESS_TOKEN_TTL_MINUTES,
  });
  return loginResponseSchema.parse(data);
}

/** GET /auth/me → current user (Bearer access token). */
export async function getMe(token: string): Promise<AuthUser> {
  const data = await apiClient.get<unknown>("/auth/me", { token });
  return authUserSchema.parse(data);
}

/** POST /auth/refresh → fresh access + refresh tokens. */
export async function refresh(refreshToken: string): Promise<AuthTokens> {
  const data = await apiClient.post<unknown>("/auth/refresh", {
    refreshToken,
    expiresInMins: ACCESS_TOKEN_TTL_MINUTES,
  });
  return authTokensSchema.parse(data);
}

/** POST /users/add → simulated create (not persisted; can't be logged into). */
export async function addUser(input: RegisterInput): Promise<AddUserResponse> {
  const data = await apiClient.post<unknown>("/users/add", {
    username: input.username,
    email: input.email,
    password: input.password,
  });
  return addUserResponseSchema.parse(data);
}
