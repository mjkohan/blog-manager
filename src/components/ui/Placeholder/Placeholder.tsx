import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Placeholder slot (Figma "placeholder"): a teal-tint block with centered label,
 * used inside Field as the default / fallback stand-in for an input. Purely
 * presentational. Spec: primary-bg1 fill, primary-fg1 text, Inter 600 / 14 / 20,
 * -2% tracking, h-40, no radius. Fluid width (responsive).
 */
export function Placeholder({
  children = "Replace me",
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-primary-bg1 text-primary-fg1 flex h-10 w-full items-center justify-center rounded-none",
        "text-sm font-semibold tracking-[-0.02em]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
