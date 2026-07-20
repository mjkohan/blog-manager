import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/AuthCard";
import { LinkButton } from "@/components/ui/LinkButton";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign in"
      footer={
        <>
          Don&apos;t have an account? <LinkButton href={ROUTES.register}>Sign up now</LinkButton>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
