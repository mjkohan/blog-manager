import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AuthCardProps {
  /** Card title (e.g. "Sign in" / "Sign up"). */
  title: ReactNode;
  /** Form body — labelled fields + submit button. */
  children: ReactNode;
  /** Footer row: helper text + a LinkButton to the other auth screen. */
  footer?: ReactNode;
  className?: string;
}

/**
 * Auth screen shell (Figma "Sign in" / "Sign up"). A white 480px card centered
 * on a full-height neutral page. Two Figma sections: a 92px-min header (title,
 * 24px padding) and a body divided by a 1px top border (form + optional footer,
 * 24px padding). Presentational — no form logic. Responsive: full width (minus
 * page padding) on mobile, capped at 480px on larger screens.
 */
export function AuthCard({ title, children, footer, className }: AuthCardProps) {
  return (
    <main className="bg-gray-6 flex min-h-screen w-full items-center justify-center p-4">
      <div className={cn("bg-bg1 w-full max-w-[480px] overflow-hidden rounded-md", className)}>
        <header className="flex min-h-[92px] flex-col justify-center gap-6 p-6">
          <h1 className="text-fg1 text-start text-lg leading-6 font-semibold tracking-[-0.02em]">
            {title}
          </h1>
        </header>
        <section className="border-st3 flex flex-col gap-6 border-t p-6">
          {children}
          {footer != null && (
            <p className="text-fg1 flex items-center justify-center gap-1 text-center text-sm tracking-[-0.02em]">
              {footer}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
