import type { Metadata } from "next";

import { getTagList } from "@/features/articles/api/posts-api";
import { ArticleForm } from "@/features/articles/components/ArticleForm";
import { getCurrentUser } from "@/features/auth/getCurrentUser";

export const metadata: Metadata = {
  title: "New article",
};

const EMPTY = { title: "", description: "", body: "", tags: [] as string[] };

/**
 * Create-article form (`/articles/create`). Server Component: fetches the
 * alphabetically-sorted tag list and the current user (author `userId`), then
 * hands off to the client `ArticleForm`. The create write is simulated via React
 * Query — not persisted (see docs/API-MAPPING.md).
 */
export default async function CreateArticlePage() {
  const [tagOptions, user] = await Promise.all([getTagList(), getCurrentUser()]);

  return (
    <ArticleForm
      tagOptions={tagOptions}
      defaultValues={EMPTY}
      target={{ mode: "create", userId: user?.id ?? 0, username: user?.username ?? "you" }}
    />
  );
}
