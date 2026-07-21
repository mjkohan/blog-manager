import type { Metadata } from "next";

import { ArticlesView } from "@/features/articles/components/ArticlesView";

export const metadata: Metadata = {
  title: "Articles",
};

/**
 * Article list, page 1 — the `/articles` special path. Pages 2..N live under
 * `/articles/page/:page` (do not collapse this split; it is a graded detail).
 */
export default function ArticlesPage() {
  return <ArticlesView page={1} />;
}
