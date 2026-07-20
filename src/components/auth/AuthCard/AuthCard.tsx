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
 * Auth screen shell (Figma "Sign in" / "Sign up"). A white card centered on a
 * full-height neutral page: title over a divider, the form body, then an
 * optional footer row. Presentational — no form logic. Responsive: full width
 * (minus page padding) on mobile, capped at ~448px on larger screens.
 */
export function AuthCard({ title, children, footer, className }: AuthCardProps) {
  return (
    <main className="bg-gray-6 flex min-h-screen w-full items-center justify-center p-4">
      <div
        className={cn(
          "bg-bg1 rounded-5 w-full max-w-md shadow-[0px_8px_40px_0px_#2533431f]",
          "flex flex-col gap-5 p-6",
          className,
        )}
      >
        <h1 className="text-fg1 text-start text-lg leading-6 font-semibold tracking-[-0.02em]">
          {title}
        </h1>
        <hr className="border-st3 -mx-6 border-t" />
        {children}
        {footer != null && (
          <p className="text-fg1 flex items-center justify-center gap-1 text-center text-sm tracking-[-0.02em]">
            {footer}
          </p>
        )}
      </div>
    </main>
  );
}
