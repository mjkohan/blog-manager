"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/Toaster";
import { ROUTES } from "@/lib/constants";

import { createPost, updatePost } from "../api/posts-api";
import type { ArticleFormValues } from "../types";

/** Where the create/edit form submits — discriminated by mode. */
export type SubmitTarget = { mode: "create"; userId: number } | { mode: "edit"; id: number };

/**
 * Create mutation (`POST /posts/add`, simulated). On success it toasts
 * "Article created", returns to the list and refreshes the server data. The
 * write is not persisted (DummyJSON) — the toast + redirect make it feel real.
 */
export function useCreateArticle(userId: number) {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: ArticleFormValues) => createPost({ ...values, userId }),
    onSuccess: () => {
      toast({ type: "success", title: "Article created" });
      router.push(ROUTES.articles);
      router.refresh();
    },
    onError: () => {
      toast({ type: "error", title: "Create failed", description: "Please try again." });
    },
  });
}

/** Update mutation (`PUT /posts/{id}`, simulated). Toasts "Article updated" then returns to the list. */
export function useUpdateArticle(id: number) {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: ArticleFormValues) => updatePost(id, values),
    onSuccess: () => {
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
  const create = useCreateArticle(target.mode === "create" ? target.userId : 0);
  const update = useUpdateArticle(target.mode === "edit" ? target.id : 0);
  return target.mode === "create" ? create : update;
}
