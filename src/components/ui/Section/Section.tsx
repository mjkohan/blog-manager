import { type ComponentProps, type ReactNode, useId } from "react";

import { cn } from "@/lib/utils";

import { SectionHeader } from "./SectionHeader";

interface SectionProps extends ComponentProps<"section"> {
  /** Header label. Omit for a headerless card (e.g. the label lives on a Field inside). */
  label?: ReactNode;
  /** Optional caption below the label. */
  caption?: ReactNode;
  /** Divider between the header and body when there is content. Defaults to true. */
  divider?: boolean;
}

/**
 * Section (Figma "Section"). A white (`neutral-bg1`) card: an optional
 * SectionHeader over a body slot (24px padding), with a full-width divider
 * between them when both a header and content are present. With a `label` it
 * labels itself for a11y via aria-labelledby; without one it renders a plain
 * headerless card (the accessible name then comes from content, e.g. a Field
 * label). Presentational — drop content as children.
 */
export function Section({
  label,
  caption,
  divider = true,
  className,
  children,
  ...props
}: SectionProps) {
  const headingId = useId();
  const hasHeader = label != null;
  const hasContent = children != null;

  return (
    <section
      aria-labelledby={hasHeader ? headingId : undefined}
      className={cn("bg-bg1 flex flex-col rounded-md", className)}
      {...props}
    >
      {hasHeader && (
        <SectionHeader label={label} caption={caption} headingId={headingId} className="p-9" />
      )}
      {hasContent && (
        <div className={cn("p-6", hasHeader && divider && "border-st3 border-t")}>{children}</div>
      )}
    </section>
  );
}
