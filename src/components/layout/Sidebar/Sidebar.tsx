"use client";

import { usePathname } from "next/navigation";

import { DocumentIcon, PlusIcon } from "@/components/ui/Icon";
import { SidebarItem } from "@/components/ui/SidebarItem";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SidebarProps {
  /** Called after a nav link is activated (e.g. to close the mobile drawer). */
  onNavigate?: () => void;
  className?: string;
}

/**
 * Dashboard sidebar navigation. Two entries — "All articles" (the list, page 1)
 * and "New article" (the create form) — each a Next `Link` rendered through the
 * presentational `SidebarItem`. The active entry is derived from the current
 * pathname (`/articles` + `/articles/page/*` → list; `/articles/create` →
 * create). `onNavigate` lets the mobile drawer close on selection.
 */
export function Sidebar({ onNavigate, className }: SidebarProps) {
  const pathname = usePathname();

  const onList = pathname === ROUTES.articles || pathname.startsWith("/articles/page");
  const onCreate = pathname.startsWith(ROUTES.articlesCreate);

  return (
    <div className={cn("bg-bg1 flex h-full flex-col", className)}>
      <div className="border-st3 flex h-16 shrink-0 items-center border-b px-4">
        <span className="text-fg1 text-base font-semibold tracking-[-0.02em]">Blog Manager</span>
      </div>
      <nav aria-label="Primary" className="flex flex-col gap-1 p-3">
        <SidebarItem
          href={ROUTES.articles}
          selected={onList}
          icon={<DocumentIcon />}
          onClick={onNavigate}
        >
          All articles
        </SidebarItem>
        <SidebarItem
          href={ROUTES.articlesCreate}
          selected={onCreate}
          icon={<PlusIcon />}
          onClick={onNavigate}
        >
          New article
        </SidebarItem>
      </nav>
    </div>
  );
}
