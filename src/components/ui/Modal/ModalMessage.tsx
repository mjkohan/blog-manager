import type { ComponentProps, ReactNode } from "react";

import { CheckCircleIcon, WarningIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type ModalMessageType = "success" | "error";

interface ModalMessageProps extends ComponentProps<"div"> {
  type?: ModalMessageType;
  /** Override the default icon (success = check-circle, error = warning). */
  icon?: ReactNode;
}

const typeClasses: Record<ModalMessageType, string> = {
  success: "bg-success-bg1 text-success-fg1",
  error: "bg-error-bg1 text-error-fg1",
};

/**
 * Centered status message for a Modal body (Figma "modal content" success/error).
 * A tinted icon circle over a centered message. Colors: success-bg1/-fg1 or
 * error-bg1/-fg1; message text fg1.
 */
export function ModalMessage({
  type = "success",
  icon,
  children,
  className,
  ...props
}: ModalMessageProps) {
  const defaultIcon = type === "success" ? <CheckCircleIcon /> : <WarningIcon />;

  return (
    <div
      className={cn("flex flex-col items-center gap-3 px-6 py-6 text-center", className)}
      {...props}
    >
      <span
        className={cn(
          "rounded-circular flex size-10 items-center justify-center",
          typeClasses[type],
        )}
      >
        {icon ?? defaultIcon}
      </span>
      <p className="text-fg1 text-sm font-normal tracking-[-0.02em]">{children}</p>
    </div>
  );
}
