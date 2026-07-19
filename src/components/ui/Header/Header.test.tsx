import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "./Header";

describe("Header", () => {
  it("greets the user with the name in the banner", () => {
    render(<Header userName="Ada" />);
    const banner = screen.getByRole("banner");
    expect(banner).toHaveTextContent("Welcome Ada");
  });

  it("renders the title and actions", () => {
    render(
      <Header title="Arvancloud Challenge" actions={<button type="button">Log out</button>} />,
    );
    expect(screen.getByText("Arvancloud Challenge")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
  });

  it("omits the greeting when no userName is given", () => {
    render(<Header title="App" />);
    expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
  });
});
