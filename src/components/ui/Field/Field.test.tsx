import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field } from "./Field";

describe("Field", () => {
  it("associates the label with the input", () => {
    render(<Field label="Title" placeholder="Replace me" />);
    expect(screen.getByLabelText("Title")).toBe(screen.getByPlaceholderText("Replace me"));
  });

  it("shows a hint without marking the input invalid", () => {
    render(<Field label="Title" hint="be concise" />);
    expect(screen.getByText("be concise")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
  });

  it("marks the input invalid and describes it with the error", () => {
    render(<Field label="Title" error="Required field" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Required field");
  });

  it("error overrides hint", () => {
    render(<Field label="Title" hint="hint" error="oops" />);
    expect(screen.queryByText("hint")).not.toBeInTheDocument();
    expect(screen.getByText("oops")).toBeInTheDocument();
  });
});
