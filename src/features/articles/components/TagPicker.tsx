"use client";

import { type KeyboardEvent, useState } from "react";

import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";

interface TagPickerProps {
  /** All tags from the API, pre-sorted alphabetically. */
  options: string[];
  /** Currently selected tags (checked). */
  value: string[];
  onChange: (next: string[]) => void;
}

/**
 * Tags picker (Figma "Tags"). A "Tags" Field acts as both **search** (typing
 * filters the checkbox list, case-insensitive) and **add** (pressing Enter on a
 * tag not already in the list adds it **checked by default**; the user can
 * uncheck it). The list is the union of the API options, user-added tags, and any
 * preselected tags not in either (edit prefill).
 */
export function TagPicker({ options, value, onChange }: TagPickerProps) {
  const [draft, setDraft] = useState("");
  const [added, setAdded] = useState<string[]>([]);

  const seen = new Set<string>();
  const list = [...options, ...added, ...value].filter((tag) => {
    if (seen.has(tag)) return false;
    seen.add(tag);
    return true;
  });

  const query = draft.trim().toLowerCase();
  const visible = query ? list.filter((tag) => tag.toLowerCase().includes(query)) : list;

  const toggle = (tag: string, checked: boolean) =>
    onChange(checked ? [...value, tag] : value.filter((t) => t !== tag));

  const addTag = () => {
    const tag = draft.trim();
    if (!tag) return;
    const existing = list.find((t) => t.toLowerCase() === tag.toLowerCase());
    const canonical = existing ?? tag;
    if (!existing) setAdded((prev) => [...prev, canonical]);
    if (!value.includes(canonical)) onChange([...value, canonical]); // checked by default
    setDraft("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Field
        label="Tags"
        placeholder="New tag"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <ul className="border-st3 rounded-3 flex max-h-72 flex-col gap-3 overflow-y-auto border p-4">
        {visible.length === 0 ? (
          <li className="text-fg2 px-1 py-2 text-sm">
            {query ? `No tags match. Press Enter to add “${draft.trim()}”.` : "No tags."}
          </li>
        ) : (
          visible.map((tag) => (
            <li key={tag}>
              <Checkbox
                label={tag}
                checked={value.includes(tag)}
                onChange={(event) => toggle(tag, event.target.checked)}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
