import { type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { ControlSize } from "../control-size";
import { Spinner } from "../Spinner";

export type ButtonVariant = "primary" | "danger" | "secondary";

interface ButtonProps extends Omit<ComponentProps<"button">, "size"> {
  variant?: ButtonVariant;
  /** Control height: sm = 36px, md = 40px, lg = 48px. Defaults to md. */
  size?: ControlSize;
  /** Show a spinner and block interaction while keeping the default color. */
  loading?: boolean;
  /** Leading icon (icon-only when no children). Should use `currentColor`. */
  icon?: ReactNode;
}

/** Per-size geometry: [height, text label padding, icon-only square, min-w, gap, text]. */
const sizeClasses: Record<ControlSize, { base: string; text: string; iconOnly: string }> = {
  sm: { base: "h-9 gap-1.5 text-sm", text: "min-w-16 px-3", iconOnly: "w-9" },
  md: { base: "h-10 gap-2 text-sm", text: "min-w-[72px] px-4", iconOnly: "w-10" },
  lg: { base: "h-12 gap-2 text-base", text: "min-w-[88px] px-5", iconOnly: "w-12" },
};

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
 * (outline); text layout (label + optional icon) or icon-only (square when no
 * children). Sizes sm (36) / md (40, default) / lg (48) via `size`. States
 * default/hover/press/disable via CSS; loading shows a spinner, keeps the
 * default color, and blocks interaction (aria-busy) without the disabled
 * attribute. rounded-lg, Inter 600.
 */
export function Button({
  variant = "primary",
  size = "md",
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
  const sizes = sizeClasses[size];

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
        "inline-flex items-center justify-center rounded-lg font-semibold tracking-[-0.02em] transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        sizes.base,
        iconOnly ? sizes.iconOnly : sizes.text,
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
