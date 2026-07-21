import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names conditionally, resolving Tailwind conflicts.
 * `clsx` handles conditionals/arrays; `twMerge` dedupes conflicting Tailwind utilities
 * so the last one wins (e.g. `cn("p-2", cond && "p-4")` -> `p-4`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Turn a title into a URL slug: lowercased, non-alphanumerics collapsed to single
 * hyphens, no leading/trailing hyphen. Used for the `/articles/edit/:slug` route
 * (DummyJSON posts have no slug — we derive it from the title, see API-MAPPING).
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * First `words` words of `text`, with an ellipsis appended when it was truncated.
 * Used to derive the article Excerpt column from a post `body` (no excerpt field
 * in the API). Collapses runs of whitespace; empty input yields an empty string.
 */
export function excerpt(text: string, words = 20): string {
  const tokens = text.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return "";
  const head = tokens.slice(0, words).join(" ");
  return tokens.length > words ? `${head}…` : head;
}
