"use client";

import { type ComponentProps, useEffect, useId, useRef } from "react";

import { cn } from "@/lib/utils";

import { ModalContext } from "./ModalContext";

export type ModalSize = "small" | "medium" | "large";

const sizeClasses: Record<ModalSize, string> = {
  small: "max-w-[456px]",
  medium: "max-w-[600px]",
  large: "max-w-[800px]",
};

interface ModalProps extends Omit<ComponentProps<"dialog">, "onClose"> {
  open: boolean;
  onClose?: () => void;
  size?: ModalSize;
  /** Close when the backdrop is clicked. Defaults to true. */
  dismissable?: boolean;
}

/**
 * Modal dialog (Figma "_base-modal"). Built on the native `<dialog>` element for
 * a free focus trap, Esc-to-close, and an inert background. Controlled via
 * `open` / `onClose`. Sizes small (456) / medium (600) / large (800). Compose
 * with ModalHeader / ModalBody / ModalFooter / ModalMessage. 8px radius. Keeps a
 * ~16px gutter each side on small screens (never edge-to-edge).
 */
export function Modal({
  open,
  onClose,
  size = "small",
  dismissable = true,
  className,
  children,
  ...props
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) {
        // showModal gives the focus trap + backdrop; fall back to the open
        // attribute where it is unavailable (e.g. jsdom in tests).
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.open = true;
      }
    } else if (dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.open = false;
    }
  }, [open]);

  return (
    <ModalContext.Provider value={{ titleId, descriptionId, onClose }}>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onCancel={(event) => {
          event.preventDefault();
          onClose?.();
        }}
        onClick={(event) => {
          if (dismissable && event.target === event.currentTarget) onClose?.();
        }}
        className={cn(
          "bg-bg1 rounded-3 m-auto w-[calc(100%-2rem)] p-0 shadow-[0px_8px_40px_0px_#2533433D]",
          "max-h-[85dvh] overflow-y-auto backdrop:bg-gray-100/50",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </dialog>
    </ModalContext.Provider>
  );
}
