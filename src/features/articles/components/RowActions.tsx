"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { EllipsisIcon } from "@/components/ui/Icon";
import { Menu, MenuItem } from "@/components/ui/Menu";
import { Modal, ModalFooter, ModalHeader, ModalMessage } from "@/components/ui/Modal";
import { ROUTES } from "@/lib/constants";

import type { ArticleRow } from "../types";

interface RowActionsProps {
  row: ArticleRow;
  /** Called with the post id when the user confirms deletion. */
  onDelete: (id: number) => void;
  /** This row's delete is in flight. */
  deleting?: boolean;
}

/**
 * Row `...` menu (Figma): a trigger button opening a dropdown with Edit (links to
 * `/articles/edit/:slug`) and Delete. Delete opens a focus-trapped ConfirmDialog
 * (native `<dialog>` Modal) before calling `onDelete`. The menu closes on outside
 * click, Escape, or selection; the trigger is fully labelled for screen readers.
 */
export function RowActions({ row, onDelete, deleting = false }: RowActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <div ref={containerRef} className="relative flex justify-end">
      <button
        type="button"
        aria-label={`Actions for ${row.title}`}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuOpen ? menuId : undefined}
        onClick={() => setMenuOpen((open) => !open)}
        className="text-fg2 hover:bg-bg1-hover hover:text-fg1 focus-visible:ring-primary-bg2 border-st2 inline-flex size-10 shrink-0 items-center justify-center rounded-lg border outline-none focus-visible:ring-2"
      >
        <EllipsisIcon className="size-5" />
      </button>

      {menuOpen && (
        <Menu
          id={menuId}
          aria-label={`Actions for ${row.title}`}
          className="absolute end-0 top-9 z-10 w-40"
        >
          <MenuItem href={ROUTES.articlesEdit(row.slug)} onClick={() => setMenuOpen(false)}>
            Edit
          </MenuItem>
          <MenuItem
            className="text-error-fg1 hover:bg-error-bg1 active:bg-error-bg1"
            onClick={() => {
              setMenuOpen(false);
              setConfirmOpen(true);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      )}

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} size="small">
        <ModalHeader title="Delete article" caption="This action cannot be undone." />
        <ModalMessage type="error">
          Delete <strong className="font-semibold">{row.title}</strong>?
        </ModalMessage>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setConfirmOpen(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button
            variant="danger"
            loading={deleting}
            onClick={() => {
              onDelete(row.id);
              setConfirmOpen(false);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
