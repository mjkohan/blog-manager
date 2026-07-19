import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<"button"> & { href?: undefined };
type AnchorProps = ComponentProps<"a"> & { href: string };
type LinkButtonProps = (ButtonProps | AnchorProps) & { disabled?: boolean };

/**
 * LinkButton (Figma "LinkButton"). Text-only action styled as a link: no fill,
 * info-blue label with hover/press/disable states. Renders a `<button>` by
 * default, or an `<a>` when `href` is set (e.g. wrapping a Next `Link` via
 * `asChild`-style usage is not needed — pass `href` directly). Inter 600 / 14 / 20.
 */
export function LinkButton({ className, disabled, ...props }: LinkButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-2 bg-transparent text-center text-sm font-semibold tracking-[-0.02em] outline-none transition-colors",
    "focus-visible:ring-info-fg1 focus-visible:ring-2 focus-visible:ring-offset-2",
    disabled
      ? "text-info-fg1-disable pointer-events-none cursor-not-allowed"
      : "text-info-fg1 hover:text-info-fg1-hover active:text-info-fg1-press",
    className,
  );

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props;
    return (
      <a
        {...anchorProps}
        href={href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
        className={classes}
      />
    );
  }

  const { type = "button", ...buttonProps } = props;
  return <button {...buttonProps} type={type} disabled={disabled} className={classes} />;
}
