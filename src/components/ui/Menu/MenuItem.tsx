import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Spinner } from "../Spinner";

interface MenuItemProps extends ComponentProps<"button"> {
  /** Leading icon (uses `currentColor`). */
  icon?: ReactNode;
  /** Render a non-interactive "loading more" row (spinner + muted label). */
  loading?: boolean;
}

/**
 * Menu row (Figma "DropDownElement"/"DropDownContent"). Interactive item with
 * hover/press/disable states, or a `loading` status row. Colors: text fg1 (hover
 * bg1-hover, press bg1-press); disabled text fg1-disable; loading label fg2 with
 * an fg1 spinner. 8px radius, 8/12 padding, Inter 400 / 14 / 20.
 */
export function MenuItem({
  icon,
  loading,
  children,
  className,
  disabled,
  ...props
}: MenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled || loading}
      aria-disabled={loading || undefined}
      className={cn(
        "rounded-3 flex w-full items-center gap-2 px-3 py-2 text-start text-sm font-normal tracking-[-0.02em] transition-colors outline-none",
        loading
          ? "text-fg2 cursor-default"
          : disabled
            ? "text-fg1-disable cursor-not-allowed"
            : "text-fg1 enabled:hover:bg-bg1-hover enabled:active:bg-bg1-press focus-visible:bg-bg1-hover",
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner className="text-fg1" />
      ) : (
        icon != null && (
          <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span>
        )
      )}
      <span>{children}</span>
    </button>
  );
}
