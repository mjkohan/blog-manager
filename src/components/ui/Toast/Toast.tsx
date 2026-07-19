import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ToastType = "success" | "error";

interface ToastProps extends Omit<ComponentProps<"div">, "title"> {
  type?: ToastType;
  /** Bold leading title. */
  title: ReactNode;
  /** Optional description shown after the title. */
  description?: ReactNode;
  /** Optional trailing action slot (e.g. a button). */
  action?: ReactNode;
}

const typeClasses: Record<ToastType, string> = {
  success: "bg-success-bg1 text-success-fg1",
  error: "bg-error-bg1 text-error-fg1",
};

/**
 * Toast notification (Figma "Toast"). Success or error variant: tinted bg with
 * matching fg text, bold title + optional description, optional action slot,
 * soft drop shadow. Presentational — positioning/auto-dismiss belong to the
 * toaster host. Colors: success-bg1/-fg1, error-bg1/-fg1. rounded-lg, 12/16
 * padding, 8px gap. Errors announce assertively, success politely.
 */
export function Toast({
  type = "success",
  title,
  description,
  action,
  className,
  ...props
}: ToastProps) {
  const isError = type === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-3",
        "shadow-[0px_8px_40px_0px_#2533433D]",
        typeClasses[type],
        className,
      )}
      {...props}
    >
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-semibold tracking-[-0.02em]">{title}</span>
        {description != null && (
          <span className="text-xs font-normal tracking-[-0.02em]">{description}</span>
        )}
      </div>
      {action != null && <div className="ms-2 flex items-center">{action}</div>}
    </div>
  );
}
