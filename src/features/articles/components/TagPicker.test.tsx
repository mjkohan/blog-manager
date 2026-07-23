import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { TagPicker } from "./TagPicker";

/** Controlled harness so `value`/`onChange` behave like the real form field. */
function Harness({ options, initial = [] }: { options: string[]; initial?: string[] }) {
  const [value, setValue] = useState<string[]>(initial);
  return (
    <>
      <TagPicker options={options} value={value} onChange={setValue} />
      <output data-testid="selected">{value.join(",")}</output>
    </>
  );
}

const OPTIONS = ["american", "crime", "history", "mystery"];

describe("TagPicker", () => {
  it("renders a checkbox per option and reflects preselected value", () => {
    render(<Harness options={OPTIONS} initial={["crime"]} />);
    expect(screen.getByRole("checkbox", { name: "history" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "crime" })).toBeChecked();
  });

  it("filters the list as you type (search)", async () => {
    const user = userEvent.setup();
    render(<Harness options={OPTIONS} />);
    await user.type(screen.getByLabelText("Tags"), "his");
    expect(screen.getByRole("checkbox", { name: "history" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "crime" })).not.toBeInTheDocument();
  });

  it("toggles selection on and off", async () => {
    const user = userEvent.setup();
    render(<Harness options={OPTIONS} />);
    await user.click(screen.getByRole("checkbox", { name: "history" }));
    expect(screen.getByTestId("selected")).toHaveTextContent("history");
    await user.click(screen.getByRole("checkbox", { name: "history" }));
    expect(screen.getByTestId("selected")).toHaveTextContent("");
  });

  it("adds a new tag on Enter, checked by default, and lets you uncheck it", async () => {
    const user = userEvent.setup();
    render(<Harness options={OPTIONS} />);
    const input = screen.getByLabelText("Tags");

    await user.type(input, "typescript{Enter}");
    const added = screen.getByRole("checkbox", { name: "typescript" });
    expect(added).toBeChecked();
    expect(screen.getByTestId("selected")).toHaveTextContent("typescript");

    await user.click(added);
    expect(screen.getByRole("checkbox", { name: "typescript" })).not.toBeChecked();
  });
});
