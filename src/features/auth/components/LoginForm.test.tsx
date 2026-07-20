import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toaster";

import type { AuthActionState } from "../actions";
import { LoginForm } from "./LoginForm";

const { loginActionMock } = vi.hoisted(() => ({
  loginActionMock: vi.fn<(prev: AuthActionState, data: FormData) => Promise<AuthActionState>>(),
}));

vi.mock("../actions", () => ({ loginAction: loginActionMock }));

function renderForm() {
  return render(
    <ToastProvider>
      <LoginForm />
    </ToastProvider>,
  );
}

describe("LoginForm", () => {
  beforeEach(() => {
    loginActionMock.mockReset();
    loginActionMock.mockResolvedValue({});
  });

  it("disables the submit button until the form is valid", async () => {
    renderForm();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeDisabled();
  });

  it("shows 'Required field' after touching then clearing a field", async () => {
    const user = userEvent.setup();
    renderForm();
    const username = screen.getByLabelText("Username");
    await user.click(username);
    await user.tab();
    expect(await screen.findAllByText("Required field")).not.toHaveLength(0);
  });

  it("submits valid credentials to loginAction as FormData", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText("Username"), "emilys");
    await user.type(screen.getByLabelText("Password"), "emilyspass");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => expect(loginActionMock).toHaveBeenCalled());
    const formData = loginActionMock.mock.calls[0][1];
    expect(formData.get("username")).toBe("emilys");
    expect(formData.get("password")).toBe("emilyspass");
  });

  it("shows an error toast when the action reports invalid credentials", async () => {
    loginActionMock.mockResolvedValue({ error: "Username and/or Password is invalid" });
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText("Username"), "emilys");
    await user.type(screen.getByLabelText("Password"), "wrong");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(await screen.findByText("Sign-in Failed!")).toBeInTheDocument();
    expect(screen.getByText("Username and/or Password is invalid")).toBeInTheDocument();
  });
});
