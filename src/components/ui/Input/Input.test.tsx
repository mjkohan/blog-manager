import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("renders the placeholder", () => {
    render(<Input placeholder="sample text" aria-label="field" />);
    expect(screen.getByPlaceholderText("sample text")).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="field" />);
    const input = screen.getByRole("textbox");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("defaults to md height and applies the requested size", () => {
    const { rerender } = render(<Input aria-label="field" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-10");
    rerender(<Input aria-label="field" size="lg" />);
    expect(screen.getByRole("textbox")).toHaveClass("h-12");
  });

  it("marks the input invalid and applies the error border when error", () => {
    render(<Input aria-label="field" error />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveClass("border-error-fg1");
  });

  it("is not invalid by default", () => {
    render(<Input aria-label="field" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("merges custom classes", () => {
    render(<Input aria-label="field" className="w-64" />);
    expect(screen.getByRole("textbox")).toHaveClass("w-64");
  });
});
