import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "./Section";

describe("Section", () => {
  it("renders the label and caption", () => {
    render(<Section label="General" caption="Basic settings" />);
    expect(screen.getByRole("heading", { name: "General" })).toBeInTheDocument();
    expect(screen.getByText("Basic settings")).toBeInTheDocument();
  });

  it("labels the region with its heading", () => {
    render(<Section label="General" />);
    const heading = screen.getByRole("heading", { name: "General" });
    const region = screen.getByRole("region", { name: "General" });
    expect(region).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("renders children as content", () => {
    render(
      <Section label="General">
        <p>content</p>
      </Section>,
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
