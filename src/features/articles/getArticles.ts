import "server-only";

import { cache } from "react";

import { ARTICLES_PER_PAGE } from "@/lib/constants";
import { excerpt, slugify, syntheticDate } from "@/lib/utils";

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
