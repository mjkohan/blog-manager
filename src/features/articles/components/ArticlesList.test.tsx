import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toaster";

// Delete/create/edit call router.refresh(); stub the App Router in jsdom.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

import type { ArticleRow } from "../types";
import { ArticlesList } from "./ArticlesList";

const rows: ArticleRow[] = [
  {
    id: 1,
    title: "First article",
    slug: "first-article",
    author: "author100",
    tags: ["history"],
    excerpt: "First body words",
    createdAt: "2024-01-02",
  },
  {
    id: 2,
    title: "Second article",
    slug: "second-article",
    author: "author101",
    tags: ["crime"],
    excerpt: "Second body words",
    createdAt: "2024-01-03",
  },
];

function Wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, retry: false } },
  });
  return (
    <QueryClientProvider client={client}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  );
}

function renderList() {
  return render(<ArticlesList initialRows={rows} page={1} totalPages={5} />, { wrapper: Wrapper });
}

describe("ArticlesList", () => {
  it("renders a row per article with the derived columns", () => {
    renderList();
    // Desktop table + mobile cards both mount in jsdom, so titles appear twice.
    expect(screen.getAllByText("First article").length).toBeGreaterThan(0);
    expect(screen.getAllByText("@author100").length).toBeGreaterThan(0);
    expect(screen.getAllByText("First body words").length).toBeGreaterThan(0);
  });

  it("Edit links to the slug-based edit route", async () => {
    const user = userEvent.setup();
    renderList();
    await user.click(screen.getAllByRole("button", { name: "Actions for First article" })[0]);
    const edit = screen.getByRole("menuitem", { name: "Edit" });
    expect(edit).toHaveAttribute("href", "/articles/edit/first-article");
  });

  it("optimistically removes a row on confirmed delete", async () => {
    const user = userEvent.setup();
    renderList();

    await user.click(screen.getAllByRole("button", { name: "Actions for First article" })[0]);
    await user.click(screen.getByRole("menuitem", { name: "Delete" }));

    // Confirm dialog → click its Delete button.
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(screen.queryByText("First article")).not.toBeInTheDocument();
    });
    // The other row survives.
    expect(screen.getAllByText("Second article").length).toBeGreaterThan(0);
  });
});
