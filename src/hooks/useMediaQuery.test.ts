import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "./useMediaQuery";

type Listener = () => void;

/** Minimal controllable matchMedia mock. */
function mockMatchMedia(initialMatches: boolean) {
  const listeners = new Set<Listener>();
  let matches = initialMatches;
  const mql = {
    get matches() {
      return matches;
    },
    media: "",
    addEventListener: (_: string, cb: Listener) => listeners.add(cb),
    removeEventListener: (_: string, cb: Listener) => listeners.delete(cb),
  };
  window.matchMedia = vi.fn().mockReturnValue(mql) as typeof window.matchMedia;
  return {
    set(value: boolean) {
      matches = value;
      listeners.forEach((cb) => cb());
    },
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useMediaQuery", () => {
  it("returns the current match state", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery("(max-width: 639px)"));
    expect(result.current).toBe(true);
  });

  it("updates when the query changes", () => {
    const control = mockMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("(max-width: 639px)"));
    expect(result.current).toBe(false);
    act(() => control.set(true));
    expect(result.current).toBe(true);
  });
});
