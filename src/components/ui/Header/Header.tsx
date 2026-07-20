import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HeaderProps extends Omit<ComponentProps<"header">, "title"> {
  /** Current user's name, shown after "Welcome". */
  userName?: ReactNode;
  /** Centered title chip (e.g. the app name). */
  title?: ReactNode;
  /** Right-aligned actions slot (e.g. a Log out button). */
  actions?: ReactNode;
}

/**
 * App header (Figma "header"). Left: "Welcome <user>" (user in semibold). Center:
 * a neutral title chip (bg2, sm radius, 16/24), hidden below `sm` so the greeting
 * and actions fit on mobile. Right: actions slot. Flanking flex-1 zones keep the
 * chip centered; the greeting truncates on small screens.
 * Presentational — pass the Log out button (with its handler) via `actions`.
 */
export function Header({ userName, title, actions, className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "bg-bg1 border-st3 flex h-16 w-full items-center gap-4 border-b px-4 sm:px-6",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center">
        {userName != null && (
          <span className="text-fg1 truncate text-sm tracking-[-0.02em]">
            <span className="font-normal">Welcome </span>
            <span className="font-semibold">{userName}</span>
          </span>
        )}
      </div>

      {title != null && (
        <div className="bg-bg2 text-fg1 rounded-2 hidden px-3 py-2 text-base font-semibold tracking-[-0.02em] whitespace-nowrap sm:block">
          {title}
        </div>
      )}

      <div className="flex min-w-0 flex-1 items-center justify-end">{actions}</div>
    </header>
  );
}
