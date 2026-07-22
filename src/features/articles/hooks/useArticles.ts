"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/Toaster";

import { deletePost } from "../api/posts-api";
import type { ArticleRow } from "../types";
import { applyOverlay, useArticleOverlay, useOverlayActions } from "./useArticleOverlay";

/**
 * Rows for one list page: the server-rendered `initialRows` with the in-memory
 * mutation overlay applied (deletes filtered, edits merged, session-created rows
 * prepended on page 1). Reads still come from the server; the overlay only layers
 * the simulated writes on top so the table stays in sync across `router.refresh()`.
 */
export function useArticlesList(page: number, initialRows: ArticleRow[]): ArticleRow[] {
  const overlay = useArticleOverlay();
  return applyOverlay(initialRows, overlay, page);
}

/**
 * Optimistic delete. Records the id in the overlay immediately (row disappears
 * from every page), then fires the simulated `DELETE /posts/{id}`. On success it
 * toasts and `router.refresh()`es so the table re-pulls fresh server data — the
 * overlay keeps the deleted row hidden even though the mock resurrects it. On
 * error it removes the id from the overlay (rollback) and toasts. The overlay is
 * cleared on a hard refresh. See docs/API-MAPPING.md.
 */
export function useDeleteArticle() {
  const router = useRouter();
  const { toast } = useToast();
  const { addDeleted, removeDeleted } = useOverlayActions();

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onMutate: (id: number) => {
      addDeleted(id);
      return { id };
    },
    onError: (_error, _id, context) => {
      if (context) removeDeleted(context.id);
      toast({ type: "error", title: "Delete failed", description: "Please try again." });
    },
    onSuccess: () => {
      toast({ type: "success", title: "Article deleted" });
      router.refresh();
    },
  });
}
