"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { useModalContext } from "./ModalContext";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface ModalHeaderProps {
  title: ReactNode;
  /** Optional caption below the title. */
  caption?: ReactNode;
  /** Show the close button (wired to the Modal's onClose). Defaults to true. */
  closable?: boolean;
  className?: string;
}

/**
 * Modal header (Figma "modal-header"). Title (16/24, fg1) + optional caption
 * (12/16, fg2) and a close button. Bottom border st3. Title/caption ids feed the
 * dialog's aria-labelledby / aria-describedby via context.
 */
export function ModalHeader({ title, caption, closable = true, className }: ModalHeaderProps) {
  const { titleId, descriptionId, onClose } = useModalContext();

  return (
    <div
      className={cn(
        "border-st3 flex items-start justify-between gap-2 border-b px-6 py-4",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <h2 id={titleId} className="text-fg1 text-base font-semibold tracking-[-0.02em]">
          {title}
        </h2>
        {caption != null && (
          <p id={descriptionId} className="text-fg2 text-xs font-normal tracking-[-0.02em]">
            {caption}
          </p>
        )}
      </div>
      {closable && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-fg2 hover:text-fg1 hover:bg-bg1-hover focus-visible:ring-st1 rounded-2 -me-1 flex size-6 shrink-0 items-center justify-center transition-colors outline-none focus-visible:ring-2"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
