import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./Pagination";
import { getPaginationRange } from "./pagination-range";

describe("getPaginationRange", () => {
  it("lists every page when few", () => {
    expect(getPaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("collapses both sides around the middle", () => {
    expect(getPaginationRange(5, 10)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
  });

  it("only collapses the right near the start", () => {
    expect(getPaginationRange(1, 10)).toEqual([1, 2, "ellipsis", 10]);
  });
});

describe("Pagination", () => {
  it("marks the current page with aria-current", () => {
    render(<Pagination page={5} totalPages={10} />);
    expect(screen.getByRole("button", { name: "Page 5" })).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange with the clicked page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={5} totalPages={10} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "Page 6" }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("disables previous on the first page", () => {
    render(<Pagination page={1} totalPages={10} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
  });

  it("disables next on the last page", () => {
    render(<Pagination page={10} totalPages={10} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("renders links when getHref is set", () => {
    render(<Pagination page={5} totalPages={10} getHref={(p) => `/articles/page/${p}`} />);
    expect(screen.getByRole("link", { name: "Page 6" })).toHaveAttribute(
      "href",
      "/articles/page/6",
    );
  });
});
