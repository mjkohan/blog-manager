import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Toast } from "./Toast";

describe("Toast", () => {
  it("renders title and description", () => {
    render(<Toast title="Saved" description="Article created" />);
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Article created")).toBeInTheDocument();
  });

  it("uses status role for success", () => {
    render(<Toast title="Saved" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses alert role for error", () => {
    render(<Toast type="error" title="Failed" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders the action slot", () => {
    render(<Toast title="Saved" action={<button type="button">Undo</button>} />);
    expect(screen.getByRole("button", { name: "Undo" })).toBeInTheDocument();
  });
});
