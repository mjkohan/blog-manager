import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("renders the placeholder", () => {
    render(<Input placeholder="Replace me" aria-label="field" />);
    expect(screen.getByPlaceholderText("Replace me")).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="field" />);
    const input = screen.getByRole("textbox");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("merges custom classes", () => {
    render(<Input aria-label="field" className="w-64" />);
    expect(screen.getByRole("textbox")).toHaveClass("w-64");
  });
});
