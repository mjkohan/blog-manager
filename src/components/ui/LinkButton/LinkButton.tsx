import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import type { ControlSize } from "../control-size";

type SizedProps = { size?: ControlSize };
type ButtonProps = Omit<ComponentProps<"button">, "size"> & { href?: undefined };
type AnchorProps = ComponentProps<"a"> & { href: string };
type LinkButtonProps = (ButtonProps | AnchorProps) & SizedProps & { disabled?: boolean };

const sizeClasses: Record<ControlSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

/**
 * LinkButton (Figma "LinkButton"). Text-only action styled as a link: no fill,
 * info-blue label with hover/press/disable states. Renders a `<button>` by
 * default, or an `<a>` when `href` is set (e.g. wrapping a Next `Link` via
 * `asChild`-style usage is not needed — pass `href` directly). Sizes sm / md
 * (default) / lg scale the label. Inter 600.
 */
export function LinkButton({ className, disabled, size = "md", ...props }: LinkButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-2 bg-transparent text-center font-semibold tracking-[-0.02em] outline-none transition-colors",
    sizeClasses[size],
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
