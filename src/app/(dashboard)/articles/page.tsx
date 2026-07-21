import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
};

/**
 * Article list, page 1 (the `/articles` special path; pages 2..N live under
 * `/articles/page/:page`). The table + server-side pagination land with the
 * articles feature — this is the shell-mounted placeholder for now.
 */
export default function ArticlesPage() {
  return (
    <section aria-labelledby="articles-heading" className="mx-auto w-full max-w-5xl">
      <h1 id="articles-heading" className="text-fg1 text-xl font-semibold tracking-[-0.02em]">
        Articles
      </h1>
      <p className="text-fg2 mt-2 text-sm">The article list is coming next.</p>
    </section>
  );
}
