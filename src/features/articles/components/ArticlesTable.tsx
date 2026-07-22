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

/** Index chip in the `#` column: 32px square, sm radius, bg2, 12/16 semibold fg1. */
function IndexBadge({ value }: { value: number }) {
  return (
    <span className="bg-bg2 text-fg1 rounded-2 inline-flex size-8 items-center justify-center text-xs font-semibold tracking-[-0.02em]">
      {value}
    </span>
  );
}

function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return <span className="text-fg2">—</span>;
  return <>{tags.join(", ")}</>;
}

/**
 * Article list, responsive. Desktop (`lg+`) renders a semantic fixed-layout
 * `<table>` whose columns share the available width and truncate; below `lg`
 * (mobile + tablet, where the sidebar would squeeze the table) the same rows
 * become stacked cards (label → value). Each row carries the `...` actions menu.
 * Empty input shows a friendly empty state. Presentational — data + the delete
 * handler come from the parent (`ArticlesList`).
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
      {/* Desktop (lg+): fixed-layout table — columns share the available width and
          truncate, so it never overflows the sidebar-narrowed main. Below lg the
          same rows render as stacked cards. */}
      <div className="hidden lg:block">
        <table className="w-full table-fixed border-collapse text-start text-sm">
          <colgroup>
            <col className="w-14" />
            <col className="w-[24%]" />
            <col className="w-32" />
            <col className="w-[16%]" />
            <col />
            <col className="w-28" />
            <col className="w-16" />
          </colgroup>
          <thead>
            <tr className="bg-bg2 border-st3 h-12 border-b">
              {COLUMNS.map((col, index) => (
                <th
                  key={col || "actions"}
                  scope="col"
                  className={cn(
                    "text-fg1 px-4 text-start align-middle text-lg leading-6 font-semibold tracking-[-0.02em] whitespace-nowrap",
                    index === 0 && "text-center",
                    index === COLUMNS.length - 1 && "text-end",
                  )}
                >
                  {col || <span className="sr-only">Actions</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-st3 hover:bg-bg2/50 h-12 border-b transition-colors"
              >
                <td className="px-4 py-2 text-center align-middle">
                  <IndexBadge value={row.id} />
                </td>
                <td className="text-fg1 truncate px-4 py-2 align-middle text-base leading-6 font-semibold tracking-[-0.02em]">
                  {row.title}
                </td>
                <td className="text-fg1 truncate px-4 py-2 align-middle text-sm leading-5 font-normal tracking-[-0.02em]">
                  @{row.author}
                </td>
                <td className="text-fg1 truncate px-4 py-2 align-middle text-sm leading-5 font-normal tracking-[-0.02em]">
                  <TagList tags={row.tags} />
                </td>
                <td className="text-fg1 truncate px-4 py-2 align-middle text-sm leading-5 font-normal tracking-[-0.02em]">
                  {row.excerpt}
                </td>
                <td className="text-fg1 truncate px-4 py-2 align-middle text-sm leading-5 font-normal tracking-[-0.02em]">
                  {row.createdAt}
                </td>
                <td className="px-4 py-2 align-middle">
                  <RowActions row={row} onDelete={onDelete} deleting={deletingId === row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile + tablet (< lg): stacked cards */}
      <ul className="flex flex-col gap-3 lg:hidden">
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
