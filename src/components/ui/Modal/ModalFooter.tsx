import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * Modal footer (Figma "modal-footer"). Right-aligned action row with a top
 * border st3 and 16px gap. Drop Buttons in as children.
 */
export function ModalFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("border-st3 flex items-center justify-end gap-4 border-t px-6 py-4", className)}
      {...props}
    />
  );
}
