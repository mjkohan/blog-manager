import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Placeholder } from "./Placeholder";

describe("Placeholder", () => {
  it("renders the default label", () => {
    render(<Placeholder />);
    expect(screen.getByText("Replace me")).toBeInTheDocument();
  });

  it("renders custom children", () => {
    render(<Placeholder>Select an option</Placeholder>);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("merges custom classes", () => {
    render(<Placeholder className="w-64">x</Placeholder>);
    expect(screen.getByText("x")).toHaveClass("w-64");
  });
});
