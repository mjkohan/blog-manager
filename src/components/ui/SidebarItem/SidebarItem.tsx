import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SidebarItemProps extends Omit<ComponentProps<"button">, "type"> {
  /** Active/current item — teal fill + aria-current. */
  selected?: boolean;
  /** Leading icon (uses `currentColor`). */
  icon?: ReactNode;
  /** Optional second line under the label. */
  description?: ReactNode;
  /** Render an `<a>` (navigation) instead of a `<button>`. */
  href?: string;
}

const base =
  "flex w-full items-center gap-2 rounded-none p-2 text-start text-base font-semibold leading-6 tracking-[-0.02em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-bg2 focus-visible:ring-inset";

/**
 * Sidebar navigation item (Figma "_item/sidebar/Menu"). Selected = primary-bg1
 * fill with primary-fg1 text (hover variants); unselected = fg1 text with
 * bg1-hover / bg1-press. 16/24 label, optional icon and description line, no
 * radius. Renders a `<button>` by default, or an `<a>` when `href` is set.
 */
export function SidebarItem({
  selected = false,
  icon,
  description,
  href,
  children,
  className,
  ...rest
}: SidebarItemProps) {
  const classes = cn(
    base,
    selected
      ? "bg-primary-bg1 text-primary-fg1 hover:bg-primary-bg1-hover hover:text-primary-fg1-hover"
      : "text-fg1 hover:bg-bg1-hover hover:text-fg1-hover active:bg-bg1-press active:text-fg1-press",
    className,
  );

  const content = (
    <>
      {icon != null && (
        <span className="flex size-5 shrink-0 items-center justify-center">{icon}</span>
      )}
      {description != null ? (
        <span className="flex min-w-0 flex-col">
          <span className="truncate">{children}</span>
          <span className="text-fg2 truncate text-sm font-normal">{description}</span>
        </span>
      ) : (
        <span className="truncate">{children}</span>
      )}
    </>
  );

  if (href !== undefined) {
    const anchorProps = rest as unknown as ComponentProps<"a">;
    return (
      <a
        {...anchorProps}
        href={href}
        aria-current={selected ? "page" : undefined}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      {...rest}
      type="button"
      aria-current={selected ? "page" : undefined}
      className={classes}
    >
      {content}
    </button>
  );
}
