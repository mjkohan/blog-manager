/**
 * List loading state — a lightweight skeleton shown while the Server Component
 * fetches the page. Mirrors the "All Posts" section + a few table rows so the
 * layout doesn't jump when data arrives. Covers `/articles` and the paged route.
 */
export default function ArticlesLoading() {
  return (
    <section className="mx-auto w-full max-w-6xl" aria-busy="true" aria-label="Loading articles">
      <div className="bg-bg2 h-6 w-28 animate-pulse rounded-md" />
      <div className="border-st3 mt-4 flex flex-col gap-3 border-t pt-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-bg2 h-12 w-full animate-pulse rounded-md" />
        ))}
      </div>
    </section>
  );
}
