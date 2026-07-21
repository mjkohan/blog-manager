"use client";

import { Pagination } from "@/components/ui/Pagination";
import { ROUTES } from "@/lib/constants";

interface ArticlesPaginationProps {
  page: number;
  totalPages: number;
}

/**
 * URL-based pagination for the list. Renders link cells (not buttons) so page
 * navigation is a real server round-trip that re-fetches the RSC list. Encodes
 * the graded routing rule via `ROUTES.articlesPage`: page 1 → `/articles`, else
 * `/articles/page/:page`. Hidden when there is only one page.
 */
export function ArticlesPagination({ page, totalPages }: ArticlesPaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-end">
      <Pagination page={page} totalPages={totalPages} getHref={ROUTES.articlesPage} />
    </div>
  );
}
