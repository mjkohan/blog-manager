import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<ComponentProps<"input">, "size"> {
  /** Control height: sm = 36px, md = 40px, lg = 48px. Defaults to md. */
  size?: InputSize;
  /** Error styling (red border). Interaction states still apply otherwise. */
  error?: boolean;
}

const sizeClasses: Record<InputSize, string> = {
  sm: "h-9",
  md: "h-10",
  lg: "h-12",
};

/**
 * Base text input (Figma "Input" layer). Presentational — no validation logic.
 *
 * States (Figma): default `st2` border → hover `st2-hover` → focus `primary-fg1`
 * (teal) → read-only `st1` → disabled `st2-disable`. `error` forces a red
 * `error-fg1` border across states. Text `fg1` (hover `fg1-hover`); placeholder
 * and disabled text `fg1-disable`. Fill (bg-bg1), 8px radius, 1px border,
 * Inter 400 / 14 / 20, -2% tracking.
 */
export function Input({ size = "md", error, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={error || undefined}
      className={cn(
        "bg-bg1 text-fg1 placeholder:text-fg1-disable rounded-3 w-full border px-3 text-start",
        "text-sm font-normal tracking-[-0.02em] outline-none",
        "border-st2 hover:border-st2-hover hover:text-fg1-hover",
        "focus:border-primary-fg1 focus:text-fg1",
        "read-only:border-st1",
        "disabled:border-st2-disable disabled:text-fg1-disable disabled:cursor-not-allowed",
        sizeClasses[size],
        error && "border-error-fg1 hover:border-error-fg1 focus:border-error-fg1",
        className,
      )}
      {...props}
    />
  );
}
