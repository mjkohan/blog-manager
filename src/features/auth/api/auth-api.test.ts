import { describe, expect, it } from "vitest";

import { ApiError } from "@/lib/api-client";
import { VALID_ACCESS_TOKEN, VALID_USER } from "@/test/msw/handlers";

import { addUser, getMe, login, refresh } from "./auth-api";

describe("auth-api (against MSW)", () => {
  it("login returns tokens + user for valid credentials", async () => {
    const result = await login(VALID_USER);
    expect(result.username).toBe("emilys");
    expect(result.accessToken).toBe(VALID_ACCESS_TOKEN);
    expect(result.refreshToken).toBeTruthy();
  });

  it("login throws ApiError(400) for bad credentials", async () => {
    await expect(login({ username: "nope", password: "wrong" })).rejects.toMatchObject({
      name: "ApiError",
      status: 400,
    });
  });

  it("getMe returns the user for a valid token", async () => {
    const user = await getMe(VALID_ACCESS_TOKEN);
    expect(user.id).toBe(1);
    expect(user.username).toBe("emilys");
  });

  it("getMe throws ApiError(401) for an invalid token", async () => {
    await expect(getMe("bad-token")).rejects.toBeInstanceOf(ApiError);
  });

  it("refresh returns new tokens", async () => {
    const tokens = await refresh("valid-refresh-token");
    expect(tokens.accessToken).toBe(VALID_ACCESS_TOKEN);
  });

  it("addUser echoes a new id (simulated create)", async () => {
    const created = await addUser({
      username: "ovi",
      email: "ovi@example.com",
      password: "secret1",
    });
    expect(created.id).toBe(209);
  });
});
