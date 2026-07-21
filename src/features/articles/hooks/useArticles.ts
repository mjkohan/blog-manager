"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/Toaster";

import { deletePost } from "../api/posts-api";
import type { ArticleRow } from "../types";

/** Query key for one list page. Scoped by page so each URL has its own cache. */
export const articlesListKey = (page: number) => ["articles", "list", page] as const;

/**
 * Read hook for the list. The rows are **fetched on the server** (RSC) and passed
 * in as `initialRows`; this seeds them into the React Query cache so client
 * mutations (delete) can update them optimistically. `staleTime: Infinity` means
 * the client never refetches — a refetch against the simulated DummyJSON write
 * would resurrect a just-deleted row. See docs/API-MAPPING.md.
 */
export function useArticlesList(page: number, initialRows: ArticleRow[]): ArticleRow[] {
  const { data } = useQuery({
    queryKey: articlesListKey(page),
    queryFn: () => initialRows,
    initialData: initialRows,
    staleTime: Infinity,
  });
  return data;
}

/**
 * Optimistic delete. Removes the row from the cache immediately, then fires the
 * (simulated) `DELETE /posts/{id}`. On error it rolls the row back and toasts;
 * on success it toasts. It deliberately does **not** invalidate/refetch — the
 * mock API doesn't persist, so the optimistic removal is what makes the action
 * feel real. Against a real backend you'd `invalidateQueries` here instead.
 */
export function useDeleteArticle(page: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const key = articlesListKey(page);

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<ArticleRow[]>(key);
      queryClient.setQueryData<ArticleRow[]>(key, (rows) =>
        (rows ?? []).filter((row) => row.id !== id),
      );
      return { previous };
    },
    onError: (_error, _id, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
      toast({ type: "error", title: "Delete failed", description: "Please try again." });
    },
    onSuccess: () => {
      toast({ type: "success", title: "Article deleted" });
    },
  });
}
