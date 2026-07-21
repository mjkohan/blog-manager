"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";

/**
 * React Query provider. Holds one QueryClient per app instance (created lazily in
 * state so it survives re-renders but is never shared across requests on the
 * server). Reserved for client **writes** (article CRUD mutations); reads are
 * fetched in Server Components — see docs/API-MAPPING.md.
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // List rows are seeded from the server; the client never refetches
            // them (DummyJSON writes are simulated). Optimistic mutations own the
            // cache from there. See useArticles / API-MAPPING.
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
