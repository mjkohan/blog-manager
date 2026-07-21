import { apiClient } from "@/lib/api-client";
import { ARTICLES_PER_PAGE } from "@/lib/constants";

import {
  deletePostResponseSchema,
  postsResponseSchema,
  usernameSchema,
  type DeletePostResponse,
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
