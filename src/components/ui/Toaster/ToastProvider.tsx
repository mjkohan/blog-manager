"use client";

import {
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { Toast } from "../Toast";
import { ToastContext, type ToastOptions } from "./ToastContext";

interface ActiveToast extends ToastOptions {
  id: string;
}

const DEFAULT_DURATION = 4000;

/**
 * Toast host. Provides `useToast()` and renders active toasts in a fixed,
 * top-centered stack via a portal, mounted once near the app root. Each toast
 * auto-dismisses after `duration` (default 4s). Uses the presentational `Toast`.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  // Portal only after hydration: server and first client render must match.
  // false on the server and during hydration, true once mounted on the client.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { ...options, id }]);
      const timer = setTimeout(() => dismiss(id), options.duration ?? DEFAULT_DURATION);
      timers.current.set(id, timer);
      return id;
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4"
          >
            {toasts.map((t) => (
              <Toast
                key={t.id}
                type={t.type}
                title={t.title}
                description={t.description}
                className="pointer-events-auto"
              />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
