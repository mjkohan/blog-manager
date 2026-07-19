import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Base text input (Figma "field" placeholder spec).
 *
 * Default appearance only for now — the stateful "input layer" (hover/focus/
 * filled/disabled/error) lands when that Figma layer is provided. Presentational:
 * no data logic. Spec: h-40, primary-bg1 fill, Inter 600 / 14 / 20, tracking -2%,
 * primary-fg1 text + placeholder, logical-start aligned, no radius.
 */
export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "text-primary-fg1 placeholder:text-primary-fg1 bg-primary-bg1",
        "h-10 w-full rounded-none px-4 text-start",
        "text-sm font-semibold tracking-[-0.02em]",
        "border-0 outline-none",
        className,
      )}
      {...props}
    />
  );
}
