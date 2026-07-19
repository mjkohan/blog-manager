import { type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Spinner } from "../Spinner";

export type ButtonVariant = "primary" | "danger" | "secondary";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  /** Show a spinner and block interaction while keeping the default color. */
  loading?: boolean;
  /** Leading icon (icon-only when no children). Should use `currentColor`. */
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "text-fg3 bg-primary-bg2 focus-visible:ring-primary-bg2",
    "enabled:hover:bg-primary-bg2-hover enabled:active:bg-primary-bg2-press",
    "disabled:bg-primary-bg2-disable",
  ),
  danger: cn(
    "text-fg3 bg-error-bg2 focus-visible:ring-error-bg2",
    "enabled:hover:bg-error-bg2-hover enabled:active:bg-error-bg2-press",
    "disabled:bg-error-bg2-disable",
  ),
  secondary: cn(
    "text-fg1 bg-bg1 focus-visible:ring-st1 border border-st2",
    "enabled:hover:border-st2-hover enabled:active:border-st2-press",
    "disabled:border-st2-disable disabled:text-fg1-disable",
  ),
};

/**
 * Button (Figma "Button"). Variants primary (teal) / danger (red) / secondary
 * (outline); text layout (min-w-72, label + optional icon) or icon-only (40px
 * square when no children). States default/hover/press/disable via CSS; loading
 * shows a spinner, keeps the default color, and blocks interaction (aria-busy)
 * without the disabled attribute. rounded-lg, h-40, Inter 600 / 14 / 20.
 */
export function Button({
  variant = "primary",
  loading = false,
  icon,
  children,
  className,
  disabled,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const iconOnly = children == null;

  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={loading || undefined}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-semibold tracking-[-0.02em] transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        iconOnly ? "w-10" : "min-w-[72px] px-4",
        loading && "pointer-events-none",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {icon != null && (
            <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>
          )}
          {children != null && <span>{children}</span>}
        </>
      )}
    </button>
  );
}
