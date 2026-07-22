import { z } from "zod";

/**
 * DummyJSON post shape. The list request selects only the fields the table
 * needs (`title,body,tags,userId`); `reactions`/`views` are optional so the same
 * schema also validates a full `/posts/{id}` response.
 */
export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()).default([]),
  userId: z.number(),
  reactions: z
    .object({
      likes: z.number(),
      dislikes: z.number(),
    })
    .optional(),
  views: z.number().optional(),
});

export type Post = z.infer<typeof postSchema>;

/** Paged list envelope from `GET /posts` (and `/posts/search`). */
export const postsResponseSchema = z.object({
  posts: z.array(postSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type PostsResponse = z.infer<typeof postsResponseSchema>;

/** `GET /users/{id}?select=username` — used to resolve the Author column. */
export const usernameSchema = z.object({
  id: z.number(),
  username: z.string(),
});

/** `DELETE /posts/{id}` — simulated delete (not persisted). */
export const deletePostResponseSchema = z.object({
  id: z.number(),
  isDeleted: z.boolean(),
  deletedOn: z.string(),
});

export type DeletePostResponse = z.infer<typeof deletePostResponseSchema>;

/** `GET /posts/tag-list` — flat `string[]` of tag names (we sort alphabetically). */
export const tagListSchema = z.array(z.string());

/** Lightweight `{id,title}` post — used when resolving a slug via `select=title`. */
export const postTitleSchema = z.object({ id: z.number(), title: z.string() });

/** Envelope for the slug-resolution scan (`GET /posts?limit=0&select=title`). */
export const postTitlesResponseSchema = z.object({
  posts: z.array(postTitleSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

/**
 * Response of the simulated create/update writes (`/posts/add`, `PUT /posts/{id}`).
 * DummyJSON echoes only the sent fields plus an `id`, so everything but `id` is
 * optional. Not persisted — see docs/API-MAPPING.md.
 */
export const mutatedPostSchema = postSchema.partial().extend({ id: z.number() });

export type MutatedPost = z.infer<typeof mutatedPostSchema>;

/**
 * Article create/edit form model. Only `Title` is required (`Required field`);
 * `Description` has no API field (sent on the simulated write) and `body`/`tags`
 * are optional. Shared by the create and edit forms + their mutations.
 */
export const articleFormSchema = z.object({
  title: z.string().trim().min(1, "Required field"),
  description: z.string().trim(),
  body: z.string().trim(),
  tags: z.array(z.string()),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;

/** Payload for `POST /posts/add` — the form values plus the author `userId`. */
export type CreatePostInput = ArticleFormValues & { userId: number };

/** Prefilled data for the edit form, resolved server-side from a slug. */
export interface ArticleFormData extends ArticleFormValues {
  id: number;
}

/**
 * View model for one list row — the design's columns resolved from the API:
 * `#` (id), Title, Author (`@username`), Tags, Excerpt (first 20 words of body),
 * Created (synthetic stable date — no field in the API), plus the derived slug
 * for the edit route. See docs/API-MAPPING.md.
 */
export interface ArticleRow {
  id: number;
  title: string;
  slug: string;
  author: string;
  tags: string[];
  excerpt: string;
  createdAt: string;
}

/** A page of resolved rows plus the pagination math the UI needs. */
export interface ArticlesPage {
  rows: ArticleRow[];
  page: number;
  totalPages: number;
  total: number;
}
