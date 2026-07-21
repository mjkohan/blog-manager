import { describe, expect, it } from "vitest";

import { cn, excerpt, slugify } from "./utils";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("supports conditional object syntax", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("resolves conflicting Tailwind utilities (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-fg1", "text-fg2")).toBe("text-fg2");
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("His mother had always taught him")).toBe("his-mother-had-always-taught-him");
  });

  it("collapses punctuation and whitespace, trims edge hyphens", () => {
    expect(slugify("  It wasn't, quite—yet!  ")).toBe("it-wasn-t-quite-yet");
  });

  it("returns empty string for non-alphanumeric input", () => {
    expect(slugify("!!! ???")).toBe("");
  });
});

describe("excerpt", () => {
  it("returns the whole text when within the word limit", () => {
    expect(excerpt("short body here")).toBe("short body here");
  });

  it("truncates to the first N words and appends an ellipsis", () => {
    expect(excerpt("one two three four five", 3)).toBe("one two three…");
  });

  it("collapses whitespace and handles empty input", () => {
    expect(excerpt("  a\n b   c ", 2)).toBe("a b…");
    expect(excerpt("   ")).toBe("");
  });
});
