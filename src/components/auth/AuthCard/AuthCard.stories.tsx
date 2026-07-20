import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../../ui/Button";
import { Field } from "../../ui/Field";
import { LinkButton } from "../../ui/LinkButton";
import { Toast } from "../../ui/Toast";
import { AuthCard } from "./AuthCard";

const meta = {
  title: "Auth/AuthCard",
  component: AuthCard,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Login screen — clean default state. */
export const SignIn: Story = {
  args: {
    title: "Sign in",
    footer: (
      <>
        Don&apos;t have an account? <LinkButton href="#">Sign up now</LinkButton>
      </>
    ),
    children: (
      <form className="flex flex-col gap-4" noValidate>
        <Field label="Email" type="email" placeholder="sample text" />
        <Field label="Password" type="password" placeholder="sample text" />
        <Button type="submit" className="mt-2 w-full">
          Sign in
        </Button>
      </form>
    ),
  },
};

/** Register screen — clean default state. */
export const SignUp: Story = {
  args: {
    title: "Sign up",
    footer: (
      <>
        Have an account? <LinkButton href="#">Sign in</LinkButton>
      </>
    ),
    children: (
      <form className="flex flex-col gap-4" noValidate>
        <Field label="Username" placeholder="sample text" />
        <Field label="Email" type="email" placeholder="sample text" />
        <Field label="Password" type="password" placeholder="sample text" />
        <Button type="submit" className="mt-2 w-full">
          Sign up
        </Button>
      </form>
    ),
  },
};

/** Validation error state (wired in a later pass): invalid password field. */
export const WithFieldError: Story = {
  args: {
    ...SignIn.args,
    children: (
      <form className="flex flex-col gap-4" noValidate>
        <Field label="Email" type="email" placeholder="sample text" />
        <Field label="Password" type="password" placeholder="sample text" error="Required field" />
        <Button type="submit" className="mt-2 w-full">
          Sign in
        </Button>
      </form>
    ),
  },
};

/** Failed sign-in: error toast above the card (later pass). */
export const SignInFailed: Story = {
  args: SignIn.args,
  render: (args) => (
    <div className="bg-gray-6 flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <Toast
        type="error"
        title="Sign-in Failed!"
        description="Username and/or Password is invalid"
      />
      <div className="w-full max-w-md">
        <AuthCard {...args} className="shadow-none" />
      </div>
    </div>
  ),
};
