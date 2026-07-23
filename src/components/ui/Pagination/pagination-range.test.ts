import { describe, expect, it } from "vitest";

import { getPaginationRange } from "./pagination-range";

describe("getPaginationRange", () => {
  it("returns empty for non-positive totals", () => {
    expect(getPaginationRange(1, 0)).toEqual([]);
    expect(getPaginationRange(1, -3)).toEqual([]);
  });

  it("lists every page when the total fits without collapsing", () => {
    // siblingCount 1 → threshold = 7; total 7 shows all.
    expect(getPaginationRange(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("collapses both sides in the middle", () => {
    expect(getPaginationRange(5, 10)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
  });

  it("omits the left ellipsis near the start", () => {
    expect(getPaginationRange(2, 10)).toEqual([1, 2, 3, "ellipsis", 10]);
  });

  it("omits the right ellipsis near the end", () => {
    expect(getPaginationRange(9, 10)).toEqual([1, "ellipsis", 8, 9, 10]);
  });

  it("never duplicates the first/last page", () => {
    const items = getPaginationRange(1, 20);
    expect(items[0]).toBe(1);
    expect(items.at(-1)).toBe(20);
    expect(items.filter((i) => i === 1)).toHaveLength(1);
    expect(items.filter((i) => i === 20)).toHaveLength(1);
  });

  it("respects a wider siblingCount", () => {
    expect(getPaginationRange(5, 20, 2)).toEqual([1, "ellipsis", 3, 4, 5, 6, 7, "ellipsis", 20]);
  });
});
