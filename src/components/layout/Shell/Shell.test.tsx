import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Shell } from "./Shell";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn<() => string>(() => "/articles"),
}));

vi.mock("next/navigation", () => ({ usePathname: usePathnameMock }));

describe("Shell", () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue("/articles");
  });

  it("renders the greeting and the routed content", () => {
    render(
      <Shell userName="Ada">
        <p>Article list</p>
      </Shell>,
    );
    expect(screen.getByRole("banner")).toHaveTextContent("Welcome Ada");
    expect(screen.getByText("Article list")).toBeInTheDocument();
  });

  it("toggles the drawer from the header menu button", async () => {
    const user = userEvent.setup();
    render(<Shell userName="Ada">content</Shell>);

    const menu = screen.getByRole("button", { name: "Open navigation menu" });
    expect(menu).toHaveAttribute("aria-expanded", "false");

    await user.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "true");
  });
});
