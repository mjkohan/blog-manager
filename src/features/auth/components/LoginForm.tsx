"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { useToast } from "@/components/ui/Toaster";

import { loginAction, type AuthActionState } from "../actions";
import { loginSchema, type LoginInput } from "../types";

const initialState: AuthActionState = {};

/**
 * Login form. Client-side validation (RHF + Zod) drives the "Required field"
 * states; submission runs the `loginAction` Server Action, which sets httpOnly
 * cookies and redirects on success or returns an error state we surface as a
 * "Sign-in Failed!" toast.
 */
export function LoginForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(loginAction, initialState);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { username: "", password: "" },
  });

  const lastState = useRef(state);
  useEffect(() => {
    if (state !== lastState.current && state.error) {
      toast({ type: "error", title: "Sign-in Failed!", description: state.error });
    }
    lastState.current = state;
  }, [state, toast]);

  const onSubmit = (values: LoginInput) => {
    const data = new FormData();
    data.set("username", values.username);
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
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="sample text"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" className="mt-2 w-full" disabled={!isValid} loading={isPending}>
        Sign in
      </Button>
    </form>
  );
}
