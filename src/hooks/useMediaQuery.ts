import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query and return whether it currently matches.
 * SSR-safe via `useSyncExternalStore`: the server snapshot is `false`, so the
 * first client paint matches the server (no hydration mismatch) and then
 * updates to the real value.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
