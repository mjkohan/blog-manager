import { cn } from "@/lib/utils";

import type { ArticleRow } from "../types";
import { RowActions } from "./RowActions";

interface ArticlesTableProps {
  rows: ArticleRow[];
  onDelete: (id: number) => void;
  /** Id of the row whose delete is in flight (drives the confirm button spinner). */
  deletingId?: number;
}

const COLUMNS = ["#", "Title", "Author", "Tags", "Excerpt", "Created", ""] as const;

/** Small rounded index chip shown in the `#` column (matches the design). */
function IndexBadge({ value }: { value: number }) {
  return (
    <span className="bg-bg2 text-fg1 inline-flex min-w-6 items-center justify-center rounded-md px-1.5 py-0.5 text-xs font-semibold">
      {value}
    </span>
  );
}

function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return <span className="text-fg2">—</span>;
  return <span className="text-fg2">{tags.join(", ")}</span>;
}

/**
 * Article list, responsive. Desktop (`md+`) renders a semantic `<table>` with a
 * sticky-scoped header; below `md` the same rows become stacked cards (label →
 * value) so nothing overflows a narrow screen. Each row carries the `...` actions
 * menu. Empty input shows a friendly empty state. Presentational — data + the
 * delete handler come from the parent (`ArticlesList`).
 */
export function ArticlesTable({ rows, onDelete, deletingId }: ArticlesTableProps) {
  if (rows.length === 0) {
    return (
      <div className="text-fg2 flex min-h-40 flex-col items-center justify-center gap-1 text-center">
        <p className="text-fg1 text-base font-semibold">No articles found</p>
        <p className="text-sm">There are no posts on this page.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop: table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-start text-sm">
          <thead>
            <tr className="bg-bg2 border-st3 h-12 border-b">
              {COLUMNS.map((col, index) => (
                <th
                  key={col || "actions"}
                  scope="col"
                  className={cn(
                    "text-fg1 px-4 text-start align-middle text-lg leading-6 font-semibold tracking-[-0.02em] whitespace-nowrap",
                    index === 0 && "rounded-s-md",
                    index === COLUMNS.length - 1 && "rounded-e-md text-end",
                  )}
                >
                  {col || <span className="sr-only">Actions</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-st3 hover:bg-bg2/50 border-b transition-colors">
                <td className="px-4 py-3 align-middle">
                  <IndexBadge value={row.id} />
                </td>
                <td className="text-fg1 max-w-[220px] truncate px-4 py-3 align-middle font-semibold">
                  {row.title}
                </td>
                <td className="text-fg2 px-4 py-3 align-middle whitespace-nowrap">@{row.author}</td>
                <td className="max-w-[160px] truncate px-4 py-3 align-middle">
                  <TagList tags={row.tags} />
                </td>
                <td className="text-fg2 max-w-[280px] truncate px-4 py-3 align-middle">
                  {row.excerpt}
                </td>
                <td className="text-fg2 px-4 py-3 align-middle whitespace-nowrap">
                  {row.createdAt}
                </td>
                <td className="px-4 py-3 align-middle">
                  <RowActions row={row} onDelete={onDelete} deleting={deletingId === row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <ul className="flex flex-col gap-3 md:hidden">
        {rows.map((row) => (
          <li key={row.id} className="border-st3 rounded-3 flex flex-col gap-3 border p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <IndexBadge value={row.id} />
                <h3 className="text-fg1 truncate text-sm font-semibold">{row.title}</h3>
              </div>
              <RowActions row={row} onDelete={onDelete} deleting={deletingId === row.id} />
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
              <dt className="text-fg2">Author</dt>
              <dd className="text-fg1 truncate">@{row.author}</dd>
              <dt className="text-fg2">Tags</dt>
              <dd className="text-fg1 truncate">
                <TagList tags={row.tags} />
              </dd>
              <dt className="text-fg2">Excerpt</dt>
              <dd className="text-fg1">{row.excerpt}</dd>
              <dt className="text-fg2">Created</dt>
              <dd className="text-fg1">{row.createdAt}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
