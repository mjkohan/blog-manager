import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Modal content region (Figma "modal content"). Padded body slot. */
export function ModalBody({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("px-6 py-4", className)} {...props} />;
}
