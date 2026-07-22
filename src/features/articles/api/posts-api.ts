import { apiClient } from "@/lib/api-client";
import { ARTICLES_PER_PAGE } from "@/lib/constants";
import { slugify } from "@/lib/utils";

import {
  deletePostResponseSchema,
  mutatedPostSchema,
  postSchema,
  postsResponseSchema,
  postTitlesResponseSchema,
  tagListSchema,
  usernameSchema,
  type ArticleFormValues,
  type CreatePostInput,
  type DeletePostResponse,
  type MutatedPost,
  type Post,
  type PostsResponse,
} from "../types";

/** Fields the list needs — keeps the payload small (design shows no reactions/views). */
const LIST_SELECT = "title,body,tags,userId";

/**
 * `GET /posts?limit&skip&select` — one page of posts. Server-side pagination:
 * `limit` fixed, `skip = (page - 1) * limit`. Read `total` from the envelope to
 * compute the page count. Response is validated through Zod.
 */
export async function getPosts(page: number): Promise<PostsResponse> {
  const skip = (Math.max(1, page) - 1) * ARTICLES_PER_PAGE;
  const data = await apiClient.get<unknown>(
    `/posts?limit=${ARTICLES_PER_PAGE}&skip=${skip}&select=${LIST_SELECT}`,
  );
  return postsResponseSchema.parse(data);
}

/**
 * `GET /users/{id}?select=username` → the `@username` for the Author column.
 * Callers should dedupe/cache per `userId` (a page repeats authors); the
 * server loader wraps this in React `cache()`.
 */
export async function getUsername(userId: number): Promise<string> {
  const data = await apiClient.get<unknown>(`/users/${userId}?select=username`);
  return usernameSchema.parse(data).username;
}

/**
 * `DELETE /posts/{id}` — **simulated** (DummyJSON does not persist). Returns the
 * post with `isDeleted`/`deletedOn`. The UI treats a 2xx as success and refreshes.
 */
export async function deletePost(id: number): Promise<DeletePostResponse> {
  const data = await apiClient.delete<unknown>(`/posts/${id}`);
  return deletePostResponseSchema.parse(data);
}

/**
 * `GET /posts/tag-list` → the tag names, **sorted alphabetically** (Figma tip).
 * Feeds the Tags picker in the create/edit form.
 */
export async function getTagList(): Promise<string[]> {
  const data = await apiClient.get<unknown>("/posts/tag-list");
  return tagListSchema.parse(data).sort((a, b) => a.localeCompare(b));
}

/** `GET /posts/{id}` — a single full post (for the edit form prefill). */
export async function getPost(id: number): Promise<Post> {
  const data = await apiClient.get<unknown>(`/posts/${id}`);
  return postSchema.parse(data);
}

/**
 * Resolve the edit route's `:slug` → post id. DummyJSON has no slug, so we scan
 * every post's title once (`limit=0&select=title`) and match `slugify(title)`.
 * Returns `null` when nothing matches (→ 404). See docs/API-MAPPING.md.
 */
export async function getPostIdBySlug(slug: string): Promise<number | null> {
  const data = await apiClient.get<unknown>("/posts?limit=0&select=title");
  const { posts } = postTitlesResponseSchema.parse(data);
  return posts.find((post) => slugify(post.title) === slug)?.id ?? null;
}

/**
 * `POST /posts/add` — **simulated** create (not persisted). Returns the echoed
 * post with a fresh id. The UI treats a 2xx as success. See docs/API-MAPPING.md.
 */
export async function createPost(input: CreatePostInput): Promise<MutatedPost> {
  const data = await apiClient.post<unknown>("/posts/add", input);
  return mutatedPostSchema.parse(data);
}

/** `PUT /posts/{id}` — **simulated** update (not persisted). Returns the echoed post. */
export async function updatePost(id: number, input: ArticleFormValues): Promise<MutatedPost> {
  const data = await apiClient.put<unknown>(`/posts/${id}`, input);
  return mutatedPostSchema.parse(data);
}
