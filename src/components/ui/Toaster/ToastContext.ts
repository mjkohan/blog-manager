"use client";

import { createContext } from "react";

import type { ToastType } from "../Toast";

export interface ToastOptions {
  type?: ToastType;
  title: string;
  description?: string;
  /** Auto-dismiss delay in ms. Defaults to 4000. */
  duration?: number;
}

export interface ToastContextValue {
  /** Show a toast; returns its id (for manual dismissal). */
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
