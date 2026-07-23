import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ArticleForm } from "./ArticleForm";

// Isolate the form from the router + the (simulated) mutation.
const { mutateMock } = vi.hoisted(() => ({ mutateMock: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));
vi.mock("../hooks/useArticleMutations", () => ({
  useSubmitArticle: () => ({ mutate: mutateMock, isPending: false }),
}));

const EMPTY = { title: "", description: "", body: "", tags: [] as string[] };

function renderCreate() {
  return render(
    <ArticleForm
      tagOptions={["crime", "history"]}
      defaultValues={EMPTY}
      target={{ mode: "create", userId: 1, username: "amy" }}
    />,
  );
}

describe("ArticleForm", () => {
  it("keeps Submit disabled until the required Title is filled", async () => {
    const user = userEvent.setup();
    renderCreate();

    const submit = screen.getByRole("button", { name: "Submit" });
    expect(submit).toBeDisabled();

    await user.type(screen.getByLabelText(/^Title/), "My article");
    expect(submit).toBeEnabled();
  });

  it("submits the entered values", async () => {
    const user = userEvent.setup();
    renderCreate();

    await user.type(screen.getByLabelText(/^Title/), "Hello");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(mutateMock).toHaveBeenCalledWith(expect.objectContaining({ title: "Hello" }));
  });
});
