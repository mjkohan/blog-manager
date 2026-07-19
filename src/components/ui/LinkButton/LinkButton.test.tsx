import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LinkButton } from "./LinkButton";

describe("LinkButton", () => {
  it("renders a button by default and fires onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<LinkButton onClick={onClick}>button</LinkButton>);
    await user.click(screen.getByRole("button", { name: "button" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders an anchor when href is set", () => {
    render(<LinkButton href="/edit">Edit</LinkButton>);
    const link = screen.getByRole("link", { name: "Edit" });
    expect(link).toHaveAttribute("href", "/edit");
  });

  it("disables the button variant", () => {
    render(<LinkButton disabled>button</LinkButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("marks the anchor variant aria-disabled and removes it from tab order", () => {
    render(
      <LinkButton href="/edit" disabled>
        Edit
      </LinkButton>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("tabindex", "-1");
  });
});
