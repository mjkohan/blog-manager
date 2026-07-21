"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/ui/Header";
import { MenuIcon } from "@/components/ui/Icon";

interface ShellProps {
  /** Current user's name for the header greeting. */
  userName?: ReactNode;
  /** Right-aligned header actions (e.g. the Log out form/button). */
  actions?: ReactNode;
  children: ReactNode;
}

/**
 * Dashboard shell: a persistent Sidebar + Header around the routed content.
 * Desktop (`md+`) shows a fixed left sidebar; below that the sidebar collapses
 * into a drawer opened from a header menu button. The drawer is a native
 * `<dialog>` (`showModal`), which gives a focus trap, Esc-to-close, and an inert
 * background for free — and closes on navigation via the Sidebar's `onNavigate`.
 */
export function Shell({ userName, actions, children }: ShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync the native dialog with state (focus trap + inert background). Mirrors
  // the pattern in ui/Modal, with a jsdom fallback where showModal is missing.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (drawerOpen) {
      if (!dialog.open) {
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.open = true;
      }
    } else if (dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.open = false;
    }
  }, [drawerOpen]);

  return (
    <div className="bg-bg2 flex min-h-dvh flex-col">
      <Header
        userName={userName}
        title="Arvancloud Challenge"
        actions={actions}
        leading={
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            className="text-fg1 hover:bg-bg1-hover focus-visible:ring-primary-bg2 inline-flex size-10 shrink-0 items-center justify-center rounded-lg outline-none focus-visible:ring-2 md:hidden"
          >
            <MenuIcon />
          </button>
        }
      />

      <div className="flex flex-1">
        <aside className="border-st3 hidden w-64 shrink-0 border-e md:block">
          <Sidebar />
        </aside>
        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Navigation menu"
        onCancel={(event) => {
          event.preventDefault();
          setDrawerOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setDrawerOpen(false);
        }}
        className="drawer-dialog m-0 h-dvh max-h-dvh w-64 max-w-[80vw] p-0 md:hidden"
      >
        <Sidebar onNavigate={() => setDrawerOpen(false)} />
      </dialog>
    </div>
  );
}
