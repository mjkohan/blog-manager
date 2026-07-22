import { describe, expect, it } from "vitest";

import type { ArticleOverlay, ArticleRow } from "../types";
import { applyOverlay } from "./useArticleOverlay";

const row = (id: number, over: Partial<ArticleRow> = {}): ArticleRow => ({
  id,
  title: `Post ${id}`,
  slug: `post-${id}`,
  author: "amy",
  tags: [],
  excerpt: "",
  createdAt: "2024-01-01",
  ...over,
});

const overlay = (over: Partial<ArticleOverlay> = {}): ArticleOverlay => ({
  deleted: [],
  created: [],
  updated: {},
  ...over,
});

describe("applyOverlay", () => {
  const rows = [row(1), row(2), row(3)];

  it("filters out every deleted id (multi-delete)", () => {
    const result = applyOverlay(rows, overlay({ deleted: [1, 3] }), 1);
    expect(result.map((r) => r.id)).toEqual([2]);
  });

  it("merges edit patches onto the matching row", () => {
    const result = applyOverlay(rows, overlay({ updated: { 2: { title: "Edited" } } }), 1);
    expect(result.find((r) => r.id === 2)?.title).toBe("Edited");
    expect(result.find((r) => r.id === 1)?.title).toBe("Post 1");
  });

  it("prepends created rows on page 1 only", () => {
    const created = [row(99, { title: "New" })];
    expect(applyOverlay(rows, overlay({ created }), 1).map((r) => r.id)).toEqual([99, 1, 2, 3]);
    expect(applyOverlay(rows, overlay({ created }), 2).map((r) => r.id)).toEqual([1, 2, 3]);
  });

  it("hides a created row that was then deleted", () => {
    const created = [row(99)];
    const result = applyOverlay(rows, overlay({ created, deleted: [99] }), 1);
    expect(result.map((r) => r.id)).toEqual([1, 2, 3]);
  });
});
