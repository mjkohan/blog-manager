import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/AuthCard";
import { LinkButton } from "@/components/ui/LinkButton";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Sign up"
      footer={
        <>
          Have an account? <LinkButton href={ROUTES.login}>Sign in</LinkButton>
        </>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
