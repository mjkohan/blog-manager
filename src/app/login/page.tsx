import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { LinkButton } from "@/components/ui/LinkButton";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign in"
      footer={
        <>
          Don&apos;t have an account? <LinkButton href="/register">Sign up now</LinkButton>
        </>
      }
    >
      <form className="flex flex-col gap-4" noValidate>
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="sample text"
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="sample text"
        />
        <Button type="submit" className="mt-2 w-full">
          Sign in
        </Button>
      </form>
    </AuthCard>
  );
}
