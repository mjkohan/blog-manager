import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Sidebar } from "./Sidebar";

const { usePathnameMock } = vi.hoisted(() => ({
  usePathnameMock: vi.fn<() => string>(),
}));

vi.mock("next/navigation", () => ({ usePathname: usePathnameMock }));

describe("Sidebar", () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
  });

  it("renders the two nav links with their routes", () => {
    usePathnameMock.mockReturnValue("/articles");
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: "All articles" })).toHaveAttribute("href", "/articles");
    expect(screen.getByRole("link", { name: "New article" })).toHaveAttribute(
      "href",
      "/articles/create",
    );
  });

  it("marks the list as active on /articles and its paged paths", () => {
    usePathnameMock.mockReturnValue("/articles/page/2");
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: "All articles" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "New article" })).not.toHaveAttribute("aria-current");
  });

  it("marks New article as active on /articles/create", () => {
    usePathnameMock.mockReturnValue("/articles/create");
    render(<Sidebar />);
    expect(screen.getByRole("link", { name: "New article" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "All articles" })).not.toHaveAttribute("aria-current");
  });
});
