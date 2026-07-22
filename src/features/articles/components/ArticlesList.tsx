"use client";

import type { ArticleRow } from "../types";
import { useArticlesList, useDeleteArticle } from "../hooks/useArticles";
import { ArticlesPagination } from "./ArticlesPagination";
import { ArticlesTable } from "./ArticlesTable";

interface ArticlesListProps {
  /** Rows resolved on the server (RSC) and seeded into the query cache. */
  initialRows: ArticleRow[];
  page: number;
  totalPages: number;
}

/**
 * Client glue for the list: seeds the server rows into React Query, wires the
 * optimistic delete mutation, and renders the responsive table + URL pagination.
 * Reads stay on the server; only the delete write lives here (see API-MAPPING).
 */
export function ArticlesList({ initialRows, page, totalPages }: ArticlesListProps) {
  const rows = useArticlesList(page, initialRows);
  const deleteArticle = useDeleteArticle();

  return (
    <div className="flex flex-col gap-6">
      <ArticlesTable
        rows={rows}
        onDelete={deleteArticle.mutate}
        deletingId={deleteArticle.isPending ? deleteArticle.variables : undefined}
      />
      <ArticlesPagination page={page} totalPages={totalPages} />
    </div>
  );
}
