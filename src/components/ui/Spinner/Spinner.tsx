import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Loading spinner (inline SVG, `currentColor`). Decorative by default
 * (`aria-hidden`) — convey busy state via `aria-busy` or adjacent text on the
 * host. Size via `className` (defaults to 16px).
 */
export function Spinner({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      className={cn("size-4 shrink-0 animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
