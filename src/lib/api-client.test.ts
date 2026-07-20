import { afterEach, describe, expect, it, vi } from "vitest";

import { apiClient, ApiError } from "./api-client";

describe("apiClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("resolves parsed JSON on a 2xx response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: 1 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    await expect(apiClient.get<{ id: number }>("/posts/1")).resolves.toEqual({ id: 1 });
  });

  it("sends the Authorization header when a token is given", async () => {
    const spy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response("{}", { status: 200, headers: { "content-type": "application/json" } }),
      );
    await apiClient.get("/auth/me", { token: "abc" });
    const init = spy.mock.calls[0][1];
    expect(new Headers(init?.headers).get("Authorization")).toBe("Bearer abc");
  });

  it("throws ApiError with the API message on a non-2xx response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      }),
    );
    await expect(apiClient.post("/auth/login", {})).rejects.toMatchObject({
      name: "ApiError",
      status: 400,
      message: "Invalid credentials",
    });
  });

  it("wraps transport failures as ApiError with status 0", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));
    await expect(apiClient.get("/posts")).rejects.toBeInstanceOf(ApiError);
  });
});
