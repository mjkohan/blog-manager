"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toaster";
import { ROUTES } from "@/lib/constants";

import { registerAction, type AuthActionState } from "../actions";
import { registerSchema, type RegisterInput } from "../types";

const initialState: AuthActionState = {};

/**
 * Register form. RHF + Zod validate client-side; `registerAction` runs the
 * simulated DummyJSON /users/add write (not persisted — see docs/API-MAPPING.md).
 * On success we toast and route to /login; failures surface as an error toast.
 */
export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useActionState(registerAction, initialState);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: { username: "", email: "", password: "" },
  });

  const lastState = useRef(state);
  useEffect(() => {
    if (state === lastState.current) return;
    lastState.current = state;
    if (state.error) {
      toast({ type: "error", title: "Sign-up Failed!", description: state.error });
    } else if (state.ok) {
      toast({ type: "success", title: "Account created", description: "You can now sign in." });
      router.push(ROUTES.login);
    }
  }, [state, toast, router]);

  const onSubmit = (values: RegisterInput) => {
    const data = new FormData();
    data.set("username", values.username);
    data.set("email", values.email);
    data.set("password", values.password);
    startTransition(() => formAction(data));
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field
        label="Username"
        autoComplete="username"
        placeholder="sample text"
        error={errors.username?.message}
        {...register("username")}
      />
      <Field
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="sample text"
        error={errors.email?.message}
        {...register("email")}
      />
      <Field
        label="Password"
        type="password"
        autoComplete="new-password"
        placeholder="sample text"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" className="mt-2 w-full" disabled={!isValid} loading={isPending}>
        Sign up
      </Button>
    </form>
  );
}
