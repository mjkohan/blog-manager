"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { ArticleOverlay, ArticleRow } from "../types";

/** Query key for the session overlay of pending create/edit/delete mutations. */
export const overlayKey = ["articles", "overlay"] as const;

const EMPTY: ArticleOverlay = { deleted: [], created: [], updated: {} };

/**
 * Read the in-memory mutation overlay. Held in the React Query cache with
 * `staleTime`/`gcTime` Infinity so it survives client navigation and
 * `router.refresh()`, but not a hard browser reload (see docs/API-MAPPING.md).
 */
export function useArticleOverlay(): ArticleOverlay {
  const { data } = useQuery({
    queryKey: overlayKey,
    queryFn: () => EMPTY,
    initialData: EMPTY,
    staleTime: Infinity,
    gcTime: Infinity,
  });
  return data;
}

/** Imperative writers for the overlay, used by the CRUD mutations. */
export function useOverlayActions() {
  const queryClient = useQueryClient();

  const update = (fn: (overlay: ArticleOverlay) => ArticleOverlay) =>
    queryClient.setQueryData<ArticleOverlay>(overlayKey, (overlay) => fn(overlay ?? EMPTY));

  return {
    addDeleted: (id: number) => update((o) => ({ ...o, deleted: [...o.deleted, id] })),
    removeDeleted: (id: number) =>
      update((o) => ({ ...o, deleted: o.deleted.filter((x) => x !== id) })),
    addCreated: (row: ArticleRow) => update((o) => ({ ...o, created: [row, ...o.created] })),
    addUpdated: (id: number, patch: Partial<ArticleRow>) =>
      update((o) => ({ ...o, updated: { ...o.updated, [id]: { ...o.updated[id], ...patch } } })),
  };
}

/**
 * Apply the overlay to one page of server rows: drop deleted ids, merge edit
 * patches, and prepend session-created rows on page 1. Pure — the same server
 * page + overlay always yields the same list.
 */
export function applyOverlay(
  rows: ArticleRow[],
  overlay: ArticleOverlay,
  page: number,
): ArticleRow[] {
  const deleted = new Set(overlay.deleted);
  const merged = rows
    .filter((row) => !deleted.has(row.id))
    .map((row) => (overlay.updated[row.id] ? { ...row, ...overlay.updated[row.id] } : row));

  if (page > 1) return merged;
  const created = overlay.created.filter((row) => !deleted.has(row.id));
  return [...created, ...merged];
}
