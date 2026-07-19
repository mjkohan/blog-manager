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
