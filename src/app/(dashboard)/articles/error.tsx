"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

/**
 * List error boundary. Any throw from the articles Server Components (e.g. the
 * DummyJSON request failing) lands here. Offers a retry via `reset`, which
 * re-renders the segment and refetches. Covers `/articles` and the paged route.
 */
export default function ArticlesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 py-16 text-center"
      role="alert"
    >
      <h2 className="text-fg1 text-lg font-semibold">Couldn&apos;t load articles</h2>
      <p className="text-fg2 text-sm">Something went wrong while fetching the list.</p>
      <Button onClick={reset}>Try again</Button>
    </section>
  );
}
