"use client";

import { usePathname } from "next/navigation";

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
    <nav aria-label="Primary" className={cn("bg-bg1 flex h-full flex-col p-3", className)}>
      <SidebarItem href={ROUTES.articles} selected={onList} onClick={onNavigate}>
        All Articles
      </SidebarItem>
      <SidebarItem href={ROUTES.articlesCreate} selected={onCreate} onClick={onNavigate}>
        New Article
      </SidebarItem>
    </nav>
  );
}
