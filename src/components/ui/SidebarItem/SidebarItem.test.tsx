import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SidebarItem } from "./SidebarItem";

describe("SidebarItem", () => {
  it("renders a button and fires onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SidebarItem onClick={onClick}>Articles</SidebarItem>);
    await user.click(screen.getByRole("button", { name: "Articles" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("marks the selected item with aria-current", () => {
    render(<SidebarItem selected>Articles</SidebarItem>);
    expect(screen.getByRole("button", { name: "Articles" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders an anchor when href is set", () => {
    render(<SidebarItem href="/articles">Articles</SidebarItem>);
    expect(screen.getByRole("link", { name: "Articles" })).toHaveAttribute("href", "/articles");
  });

  it("renders a description line", () => {
    render(<SidebarItem description="12 articles">Articles</SidebarItem>);
    expect(screen.getByText("12 articles")).toBeInTheDocument();
  });
});
