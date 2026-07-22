import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTagList } from "@/features/articles/api/posts-api";
import { ArticleForm } from "@/features/articles/components/ArticleForm";
import { getArticleForm } from "@/features/articles/getArticleForm";

export const metadata: Metadata = {
  title: "Edit article",
};

/**
 * Edit-article form (`/articles/edit/:slug`). Server Component: resolves the slug
 * to a post (`getArticleForm`, 404 when unknown) and fetches the sorted tag list,
 * then prefills the client `ArticleForm`. The update write is simulated via React
 * Query — not persisted (see docs/API-MAPPING.md). Next 16 `params` is async.
 */
export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, tagOptions] = await Promise.all([getArticleForm(slug), getTagList()]);

  if (!article) notFound();

  const { id, ...defaultValues } = article;

  return (
    <ArticleForm
      tagOptions={tagOptions}
      defaultValues={defaultValues}
      target={{ mode: "edit", id }}
    />
  );
}
