import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

describe("Menu", () => {
  it("exposes a menu with menuitem rows", () => {
    render(
      <Menu aria-label="Actions">
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>,
    );
    expect(screen.getByRole("menu", { name: "Actions" })).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
  });

  it("fires onClick for an enabled item", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<MenuItem onClick={onClick}>Edit</MenuItem>);
    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <MenuItem disabled onClick={onClick}>
        Edit
      </MenuItem>,
    );
    await user.click(screen.getByRole("menuitem"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a loading row that is not interactive", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <MenuItem loading onClick={onClick}>
        loading...
      </MenuItem>,
    );
    const item = screen.getByRole("menuitem");
    expect(item).toHaveAttribute("aria-disabled", "true");
    await user.click(item);
    expect(onClick).not.toHaveBeenCalled();
  });
});
