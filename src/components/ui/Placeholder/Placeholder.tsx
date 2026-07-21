import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import type { ControlSize } from "../control-size";

interface PlaceholderProps extends Omit<ComponentProps<"div">, "size"> {
  /** Height/text scale, mirroring Input: sm (36) / md (40, default) / lg (48). */
  size?: ControlSize;
}

const sizeClasses: Record<ControlSize, string> = {
  sm: "h-9 text-sm",
  md: "h-10 text-sm",
  lg: "h-12 text-base",
};

/**
 * Placeholder slot (Figma "placeholder"): a teal-tint block with centered label,
 * used inside Field as the default / fallback stand-in for an input. Purely
 * presentational. Spec: primary-bg1 fill, primary-fg1 text, Inter 600, -2%
 * tracking, no radius. Sizes mirror Input (sm/md/lg). Fluid width (responsive).
 */
export function Placeholder({
  children = "Replace me",
  size = "md",
  className,
  ...props
}: PlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-primary-bg1 text-primary-fg1 flex w-full items-center justify-center rounded-none",
        "font-semibold tracking-[-0.02em]",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
