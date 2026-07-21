import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChevronLeftIcon, icons, InfoIcon } from "./Icon";

describe("Icon", () => {
  it("is decorative (aria-hidden) and inherits currentColor by default", () => {
    const { container } = render(<ChevronLeftIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(svg).toHaveClass("size-5");
  });

  it("merges size classes and exposes a label when requested", () => {
    render(<InfoIcon className="size-8" aria-label="info" aria-hidden={false} />);
    const svg = screen.getByLabelText("info");
    expect(svg).toHaveClass("size-8");
  });

  it("registry exposes every named icon", () => {
    expect(Object.keys(icons)).toContain("check-circle");
    expect(Object.keys(icons)).toContain("menu");
    expect(Object.keys(icons)).toHaveLength(11);
  });
});
