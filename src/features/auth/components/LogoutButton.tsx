"use client";

import { Button } from "@/components/ui/Button";

import { logoutAction } from "../actions";

/**
 * Log out control for the dashboard header. A client component so it can be
 * passed as a prop into the client <Shell> (the shared Button renders on the
 * server otherwise, and its DOM handler can't cross the RSC boundary). Submits
 * the `logoutAction` Server Action, which clears the session and redirects.
 */
export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="secondary">
        Log out
      </Button>
    </form>
  );
}
