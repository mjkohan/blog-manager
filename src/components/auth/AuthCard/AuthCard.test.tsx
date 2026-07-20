import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AuthCard } from "./AuthCard";

describe("AuthCard", () => {
  it("renders the title as a heading", () => {
    render(<AuthCard title="Sign in">body</AuthCard>);
    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
  });

  it("renders the form body", () => {
    render(
      <AuthCard title="Sign in">
        <input aria-label="Email" />
      </AuthCard>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders the footer when provided", () => {
    render(
      <AuthCard title="Sign in" footer={<span>footer text</span>}>
        body
      </AuthCard>,
    );
    expect(screen.getByText("footer text")).toBeInTheDocument();
  });

  it("omits the footer row when not provided", () => {
    render(<AuthCard title="Sign in">body</AuthCard>);
    expect(screen.queryByText(/account/i)).not.toBeInTheDocument();
  });
});
