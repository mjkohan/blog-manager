import type { ReactNode } from "react";

import { Shell } from "@/components/layout/Shell";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { getCurrentUser } from "@/features/auth/getCurrentUser";

/**
 * Dashboard shell layout. Resolves the current user (server-side) for the header
 * greeting and wires the Log out Server Action, then renders the persistent
 * Sidebar + Header via <Shell> around the routed page. The route guard in
 * `proxy.ts` already redirects unauthenticated requests to /login.
 */
export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return (
    <Shell userName={user?.firstName} actions={<LogoutButton />}>
      {children}
    </Shell>
  );
}
