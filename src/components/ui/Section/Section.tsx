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
 * Section (Figma "Section"). A labelled content region: a SectionHeader over a
 * body slot, separated by a divider when there is content. Labels itself for
 * a11y via aria-labelledby. Presentational — drop any content as children.
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
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      <SectionHeader label={label} caption={caption} headingId={headingId} />
      {hasContent && <div className={cn(divider && "border-st3 border-t pt-4")}>{children}</div>}
    </section>
  );
}
