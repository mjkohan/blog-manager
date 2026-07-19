import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Menu / dropdown surface (Figma "DropDownContent"). White panel with soft
 * shadow that stacks MenuItem rows. Presentational — positioning/open state and
 * full arrow-key navigation belong to the host (or a future popover wrapper).
 * Give it an accessible name via `aria-label` / `aria-labelledby`.
 */
export function Menu({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      role="menu"
      className={cn(
        "bg-bg1 rounded-3 flex w-full flex-col p-2 shadow-[0px_4px_16px_0px_#00000029]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
