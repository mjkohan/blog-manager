"use client";

import { createContext, useContext } from "react";

interface ModalContextValue {
  titleId: string;
  descriptionId: string;
  onClose?: () => void;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal subcomponents must be rendered inside <Modal>");
  }
  return context;
}
