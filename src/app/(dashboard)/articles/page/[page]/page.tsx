import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { ArticlesView } from "@/features/articles/components/ArticlesView";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Articles",
};

/**
 * Article list, pages 2..N (`/articles/page/:page`). Page 1 canonicalises to the
 * special `/articles` path; a non-numeric or < 1 segment is a 404. In Next 16
 * dynamic `params` is async and must be awaited.
 */
export default async function ArticlesPagedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 1) notFound();
  if (pageNumber === 1) redirect(ROUTES.articles);

  return <ArticlesView page={pageNumber} />;
}
