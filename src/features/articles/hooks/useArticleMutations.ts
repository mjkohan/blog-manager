"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/Toaster";
import { ROUTES } from "@/lib/constants";
import { excerpt, slugify, syntheticDate } from "@/lib/utils";

import { createPost, updatePost } from "../api/posts-api";
import type { ArticleFormValues, ArticleRow } from "../types";
import { useOverlayActions } from "./useArticleOverlay";

/** Where the create/edit form submits — discriminated by mode. */
export type SubmitTarget =
  { mode: "create"; userId: number; username: string } | { mode: "edit"; id: number };

/**
 * Create mutation (`POST /posts/add`, simulated). On success it adds the new row
 * to the session overlay (so it shows on the list despite the mock not
 * persisting), toasts, then returns to the list and refreshes. See API-MAPPING.
 */
export function useCreateArticle(userId: number, username: string) {
  const router = useRouter();
  const { toast } = useToast();
  const { addCreated } = useOverlayActions();

  return useMutation({
    mutationFn: (values: ArticleFormValues) => createPost({ ...values, userId }),
    onSuccess: (created, values) => {
      const row: ArticleRow = {
        id: created.id,
        title: values.title,
        slug: slugify(values.title),
        author: username,
        tags: values.tags,
        excerpt: excerpt(values.body),
        createdAt: syntheticDate(created.id),
      };
      addCreated(row);
      toast({ type: "success", title: "Article created" });
      router.push(ROUTES.articles);
      router.refresh();
    },
    onError: () => {
      toast({ type: "error", title: "Create failed", description: "Please try again." });
    },
  });
}

/**
 * Update mutation (`PUT /posts/{id}`, simulated). On success it records the edited
 * fields in the session overlay (merged onto the matching row), toasts, then
 * returns to the list and refreshes. See API-MAPPING.
 */
export function useUpdateArticle(id: number) {
  const router = useRouter();
  const { toast } = useToast();
  const { addUpdated } = useOverlayActions();

  return useMutation({
    mutationFn: (values: ArticleFormValues) => updatePost(id, values),
    onSuccess: (_updated, values) => {
      addUpdated(id, {
        title: values.title,
        slug: slugify(values.title),
        tags: values.tags,
        excerpt: excerpt(values.body),
      });
      toast({ type: "success", title: "Article updated" });
      router.push(ROUTES.articles);
      router.refresh();
    },
    onError: () => {
      toast({ type: "error", title: "Update failed", description: "Please try again." });
    },
  });
}

/**
 * Pick the right mutation for the form's target. Both hooks are called
 * unconditionally (Rules of Hooks); only the matching one is returned.
 */
export function useSubmitArticle(target: SubmitTarget) {
  const create = useCreateArticle(
    target.mode === "create" ? target.userId : 0,
    target.mode === "create" ? target.username : "",
  );
  const update = useUpdateArticle(target.mode === "edit" ? target.id : 0);
  return target.mode === "create" ? create : update;
}
