import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New article",
};

/**
 * Create-article form (`/articles/create`). The react-hook-form + Zod form and
 * the optimistic create mutation land with the articles feature — this is the
 * shell-mounted placeholder for now.
 */
export default function CreateArticlePage() {
  return (
    <section aria-labelledby="create-heading" className="mx-auto w-full max-w-3xl">
      <h1 id="create-heading" className="text-fg1 text-xl font-semibold tracking-[-0.02em]">
        New article
      </h1>
      <p className="text-fg2 mt-2 text-sm">The create form is coming next.</p>
    </section>
  );
}
