import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { LinkButton } from "@/components/ui/LinkButton";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Sign up"
      footer={
        <>
          Have an account? <LinkButton href="/login">Sign in</LinkButton>
        </>
      }
    >
      <form className="flex flex-col gap-4" noValidate>
        <Field label="Username" name="username" autoComplete="username" placeholder="sample text" />
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
          autoComplete="new-password"
          placeholder="sample text"
        />
        <Button type="submit" className="mt-2 w-full">
          Sign up
        </Button>
      </form>
    </AuthCard>
  );
}
