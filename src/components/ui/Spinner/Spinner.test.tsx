import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders an animated, decorative svg", () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("animate-spin");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("merges size classes", () => {
    const { container } = render(<Spinner className="size-8" />);
    expect(container.querySelector("svg")).toHaveClass("size-8");
  });
});
