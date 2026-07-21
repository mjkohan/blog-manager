import { Section } from "@/components/ui/Section";

import { getArticles } from "../getArticles";
import { ArticlesList } from "./ArticlesList";

/**
 * Server entry for the list screen. Fetches the requested page (RSC read),
 * wraps the rows in the "All Posts" Section, and hands off to the client
 * `ArticlesList` for interactivity. Shared by `/articles` and
 * `/articles/page/:page` so both routes stay one line.
 */
export async function ArticlesView({ page }: { page: number }) {
  const { rows, totalPages } = await getArticles(page);

  return (
    <Section label="All Posts" className="mx-auto w-full max-w-6xl">
      <ArticlesList initialRows={rows} page={page} totalPages={totalPages} />
    </Section>
  );
}
