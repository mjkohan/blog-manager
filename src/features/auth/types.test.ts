import { describe, expect, it } from "vitest";

import { loginSchema, registerSchema } from "./types";

describe("loginSchema", () => {
  it("accepts a filled username and password", () => {
    expect(loginSchema.safeParse({ username: "emilys", password: "emilyspass" }).success).toBe(
      true,
    );
  });

  it("rejects empty fields with 'Required field'", () => {
    const result = loginSchema.safeParse({ username: "", password: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((i) => i.message)).toContain("Required field");
    }
  });

  it("trims whitespace-only usernames to invalid", () => {
    expect(loginSchema.safeParse({ username: "   ", password: "x" }).success).toBe(false);
  });
});

describe("registerSchema", () => {
  it("accepts valid input", () => {
    const result = registerSchema.safeParse({
      username: "ovi",
      email: "ovi@example.com",
      password: "secret1",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = registerSchema.safeParse({
      username: "ovi",
      email: "not-an-email",
      password: "secret1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a short password", () => {
    const result = registerSchema.safeParse({
      username: "ovi",
      email: "ovi@example.com",
      password: "123",
    });
    expect(result.success).toBe(false);
  });
});
