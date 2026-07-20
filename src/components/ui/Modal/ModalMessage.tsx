import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ModalMessageType = "success" | "error";

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.9 1.8C5.42606 1.8 1.8 5.42606 1.8 9.9C1.8 14.3739 5.42606 18 9.9 18C14.3739 18 18 14.3739 18 9.9C18 5.42606 14.3739 1.8 9.9 1.8ZM9.9 0C4.43194 0 0 4.43194 0 9.9C0 15.3681 4.43194 19.8 9.9 19.8C15.3681 19.8 19.8 15.3681 19.8 9.9C19.8 4.43194 15.3681 0 9.9 0Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5364 7.2636C14.8879 7.61508 14.8879 8.18492 14.5364 8.5364L9.5364 13.5364C9.18492 13.8879 8.61508 13.8879 8.2636 13.5364L5.2636 10.5364C4.91213 10.1849 4.91213 9.61508 5.2636 9.2636C5.61508 8.91213 6.18492 8.91213 6.5364 9.2636L8.9 11.6272L13.2636 7.2636C13.6151 6.91213 14.1849 6.91213 14.5364 7.2636Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 22 20" fill="none" aria-hidden="true">
      {/* Single even-odd path: the exclamation stroke + dot are cut out of the
          filled triangle as negative space (so the mark reads through the fill). */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7115 1.63174C12.4691 -0.543915 9.33316 -0.543915 8.09068 1.63174L0.431844 15.0355C-0.802385 17.1936 0.756135 19.8792 3.24211 19.8792H18.5601C21.0455 19.8792 22.6031 17.1935 21.3706 15.0358L13.7115 1.63174ZM10.9014 6.41894C11.3985 6.41894 11.8014 6.82188 11.8014 7.31894V11.0589C11.8014 11.556 11.3985 11.9589 10.9014 11.9589C10.4043 11.9589 10.0014 11.556 10.0014 11.0589V7.31894C10.0014 6.82188 10.4043 6.41894 10.9014 6.41894ZM9.7514 14.3173C9.74852 13.6774 10.2677 13.1641 10.9004 13.1641C11.5341 13.1641 12.0514 13.6767 12.0514 14.3141C12.0514 14.9491 11.5365 15.4641 10.9014 15.4641C10.2674 15.4641 9.75317 14.9509 9.7514 14.3173Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
