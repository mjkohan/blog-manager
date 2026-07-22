import { type ComponentProps, type ReactNode, useId } from "react";

import { cn } from "@/lib/utils";

import { SectionHeader } from "./SectionHeader";

interface SectionProps extends ComponentProps<"section"> {
  label: ReactNode;
  /** Optional caption below the label. */
  caption?: ReactNode;
  /** Divider between the header and body when there is content. Defaults to true. */
  divider?: boolean;
}

/**
 * Section (Figma "Section"). A labelled content region rendered as a white
 * (`neutral-bg1`) card: a SectionHeader (24px padding) over a body slot (24px
 * padding), with a full-width divider between them when there is content. Labels
 * itself for a11y via aria-labelledby. Presentational — drop content as children.
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
  const hasContent = children != null;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("bg-bg1 flex flex-col rounded-md", className)}
      {...props}
    >
      <SectionHeader label={label} caption={caption} headingId={headingId} className="p-9" />
      {hasContent && <div className={cn("p-6", divider && "border-st3 border-t")}>{children}</div>}
    </section>
  );
}
