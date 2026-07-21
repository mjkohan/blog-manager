import "server-only";

import { cache } from "react";

import { ARTICLES_PER_PAGE } from "@/lib/constants";
import { excerpt, slugify } from "@/lib/utils";

import { getPosts, getUsername } from "./api/posts-api";
import type { ArticlesPage } from "./types";

/**
 * Per-request author cache. A single list page repeats authors, and React
 * `cache()` dedupes `getUsername(userId)` calls within one server render so each
 * distinct user is fetched at most once. A failed lookup degrades to `userN`
 * rather than failing the whole page.
 */
const resolveUsername = cache(async (userId: number): Promise<string> => {
  try {
    return await getUsername(userId);
  } catch {
    return `user${userId}`;
  }
});

/**
 * Synthetic, stable "Created" date. The API has no created field (see
 * API-MAPPING); we derive a deterministic date from the post id so it never
 * shifts between renders. Purely presentational — not real post metadata.
 */
const EPOCH = Date.UTC(2024, 0, 1);
function syntheticDate(id: number): string {
  const date = new Date(EPOCH + id * 86_400_000);
  return date.toISOString().slice(0, 10);
}

/**
 * Resolve one list page into view-model rows plus pagination math. Fetches the
 * page of posts, resolves each author `@username`, and derives excerpt / slug /
 * created date. Reads happen in a Server Component; this is the single loader.
 */
export async function getArticles(page: number): Promise<ArticlesPage> {
  const { posts, total } = await getPosts(page);

  const rows = await Promise.all(
    posts.map(async (post) => ({
      id: post.id,
      title: post.title,
      slug: slugify(post.title),
      author: await resolveUsername(post.userId),
      tags: post.tags,
      excerpt: excerpt(post.body),
      createdAt: syntheticDate(post.id),
    })),
  );

  const totalPages = Math.max(1, Math.ceil(total / ARTICLES_PER_PAGE));
  return { rows, page, totalPages, total };
}
