import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles when uncontrolled", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="accept" />);
    const box = screen.getByRole("checkbox");
    expect(box).not.toBeChecked();
    await user.click(box);
    expect(box).toBeChecked();
  });

  it("associates a visible label", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Remember me" />);
    const box = screen.getByLabelText("Remember me");
    await user.click(box);
    expect(box).toBeChecked();
  });

  it("reports mixed state when indeterminate", () => {
    render(<Checkbox aria-label="all" indeterminate />);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("aria-checked", "mixed");
    expect((box as HTMLInputElement).indeterminate).toBe(true);
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox aria-label="accept" disabled onChange={onChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("respects the controlled checked prop", () => {
    render(<Checkbox aria-label="accept" checked readOnly />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
