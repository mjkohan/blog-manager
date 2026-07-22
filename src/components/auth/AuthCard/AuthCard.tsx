import type { ReactNode } from "react";

import { Section } from "@/components/ui/Section";
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
 * Auth screen shell (Figma "Sign in" / "Sign up"). Composes the shared `Section`
 * (the Figma "Section" component: white card, header, 1px-divider body) and adds
 * what's specific to auth: a full-height centered page and a 480px cap. The body
 * holds the form and an optional centered footer. Presentational — no form logic.
 * Responsive: full width (minus page padding) on mobile, capped at 480px larger.
 */
export function AuthCard({ title, children, footer, className }: AuthCardProps) {
  return (
    <main className="bg-gray-6 flex min-h-screen w-full items-center justify-center p-4">
      <Section label={title} className={cn("w-full max-w-[480px]", className)}>
        <div className="flex flex-col gap-6">
          {children}
          {footer != null && (
            <p className="text-fg1 flex items-center justify-center gap-1 text-center text-sm tracking-[-0.02em]">
              {footer}
            </p>
          )}
        </div>
      </Section>
    </main>
  );
}
