"use client";

import type { ComponentProps, ReactNode } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

import type { ControlSize } from "../control-size";
import { getPaginationRange } from "./pagination-range";

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 3.5 5.5 8l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PaginationProps extends Omit<ComponentProps<"nav">, "onChange"> {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called with the target page when a page/nav cell is activated. */
  onPageChange?: (page: number) => void;
  /** Render cells as links (e.g. `/articles/page/${p}`) instead of buttons. */
  getHref?: (page: number) => string;
  /** Pages shown either side of the current page. */
  siblingCount?: number;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Cell/bar scale: sm / md (default) / lg. */
  size?: ControlSize;
}

const cellBase =
  "inline-flex items-center justify-center rounded-3 px-1 font-semibold tracking-[-0.02em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-bg2 focus-visible:ring-offset-1 disabled:cursor-not-allowed";

const sizeClasses: Record<ControlSize, { bar: string; cell: string }> = {
  sm: { bar: "h-9", cell: "size-7 min-w-7 text-xs" },
  md: { bar: "h-10", cell: "size-8 min-w-8 text-sm" },
  lg: { bar: "h-12", cell: "size-10 min-w-10 text-base" },
};

/**
 * Pagination (Figma "pagination"). Bordered bar of page cells with prev/next
 * chevrons and collapsing ellipsis. Controlled: pass `page` + `totalPages` and
 * either `onPageChange` (buttons) or `getHref` (links, for URL-based server
 * pagination). Selected cell uses primary-bg2 / fg3; others fg1 with
 * hover/press; disabled uses fg1-disable. md radius; sizes sm/md/lg via `size`.
 * Siblings collapse to 0 below `sm` so the bar never overflows narrow (<320px)
 * screens.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  getHref,
  siblingCount = 1,
  disabled = false,
  size = "md",
  className,
  ...props
}: PaginationProps) {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const effectiveSiblings = isMobile ? 0 : siblingCount;
  const items = getPaginationRange(page, totalPages, effectiveSiblings);
  const sizes = sizeClasses[size];

  const renderCell = ({
    key,
    targetPage,
    active = false,
    cellDisabled,
    label,
    children,
  }: {
    key: string | number;
    targetPage: number;
    active?: boolean;
    cellDisabled: boolean;
    label: string;
    children: ReactNode;
  }) => {
    const classes = cn(
      cellBase,
      sizes.cell,
      active
        ? cellDisabled
          ? "bg-primary-bg2-disable text-fg3"
          : "bg-primary-bg2 text-fg3"
        : cellDisabled
          ? "text-fg1-disable"
          : "text-fg1 enabled:hover:bg-bg1-hover enabled:active:bg-bg1-press",
    );

    if (getHref && !cellDisabled) {
      return (
        <a
          key={key}
          href={getHref(targetPage)}
          aria-label={label}
          aria-current={active ? "page" : undefined}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        key={key}
        type="button"
        disabled={cellDisabled}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        onClick={() => onPageChange?.(targetPage)}
        className={classes}
      >
        {children}
      </button>
    );
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "bg-bg1 rounded-3 inline-flex max-w-full items-center gap-2 border p-1",
        sizes.bar,
        disabled ? "border-st2-disable" : "border-st2",
        className,
      )}
      {...props}
    >
      {renderCell({
        key: "prev",
        targetPage: page - 1,
        cellDisabled: disabled || page <= 1,
        label: "Previous page",
        children: <ChevronLeft />,
      })}

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className={cn("text-fg2 inline-flex items-center justify-center", sizes.cell)}
          >
            …
          </span>
        ) : (
          renderCell({
            key: item,
            targetPage: item,
            active: item === page,
            cellDisabled: disabled,
            label: `Page ${item}`,
            children: item,
          })
        ),
      )}

      {renderCell({
        key: "next",
        targetPage: page + 1,
        cellDisabled: disabled || page >= totalPages,
        label: "Next page",
        children: <ChevronRight />,
      })}
    </nav>
  );
}
