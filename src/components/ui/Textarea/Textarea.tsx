import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends ComponentProps<"textarea"> {
  /** Error styling (red border). Interaction states still apply otherwise. */
  error?: boolean;
}

/**
 * Base multiline text input (Figma "Body" field). Mirrors {@link Input}'s look
 * — same border/focus/disabled/error states — with vertical padding and a
 * comfortable min-height, resizable vertically. Presentational — no validation.
 */
export function Textarea({ error, className, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={error || undefined}
      className={cn(
        "bg-bg1 text-fg1 placeholder:text-fg1-disable rounded-3 w-full border px-3 py-2 text-start",
        "min-h-28 resize-y text-sm font-normal tracking-[-0.02em] outline-none",
        "border-st2 hover:border-st2-hover hover:text-fg1-hover",
        "focus:border-primary-fg1 focus:text-fg1",
        "disabled:border-st2-disable disabled:text-fg1-disable disabled:cursor-not-allowed",
        error && "border-error-fg1 hover:border-error-fg1 focus:border-error-fg1",
        className,
      )}
      {...props}
    />
  );
}
