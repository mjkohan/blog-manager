import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: ReactNode;
  /** Optional caption below the label. */
  caption?: ReactNode;
  /** Id applied to the heading (for a section's aria-labelledby). */
  headingId?: string;
  className?: string;
}

/**
 * Section header (Figma "header-content"). Label (18/24, fg1) over an optional
 * caption (14/20, fg2). Renders an h2; pass `headingId` to link a wrapping
 * section's aria-labelledby.
 */
export function SectionHeader({ label, caption, headingId, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <h2 id={headingId} className="text-fg1 text-lg leading-6 font-semibold tracking-[-0.02em]">
        {label}
      </h2>
      {caption != null && (
        <p className="text-fg2 text-sm font-normal tracking-[-0.02em]">{caption}</p>
      )}
    </div>
  );
}
