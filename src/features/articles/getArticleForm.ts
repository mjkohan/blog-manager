import "server-only";

import { getPost, getPostIdBySlug } from "./api/posts-api";
import type { ArticleFormData } from "./types";

/**
 * Resolve the edit route's `:slug` into prefilled form data (Server Component
 * read). Maps slug → id (`getPostIdBySlug`), then fetches the full post. Returns
 * `null` when the slug matches nothing so the page can 404. `Description` has no
 * API field, so it starts empty (sent on the simulated write — API-MAPPING.md).
 */
export async function getArticleForm(slug: string): Promise<ArticleFormData | null> {
  const id = await getPostIdBySlug(slug);
  if (id == null) return null;

  const post = await getPost(id);
  return {
    id: post.id,
    title: post.title,
    description: "",
    body: post.body,
    tags: post.tags,
  };
}
