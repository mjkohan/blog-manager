"use client";

import { type KeyboardEvent, useState } from "react";

import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";

interface TagPickerProps {
  /** All tags from the API, pre-sorted alphabetically. */
  options: string[];
  /** Currently selected tags (checked). */
  value: string[];
  onChange: (next: string[]) => void;
}

/**
 * Tags picker (Figma "Tags"). A "New tag" input over a scrollable checkbox list.
 * Typing a tag and pressing Enter adds it to the list **checked by default**; the
 * user can uncheck it (it stays in the list). The list is the union of the API
 * options, user-added tags, and any preselected tags not in either (edit prefill).
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

  const toggle = (tag: string, checked: boolean) =>
    onChange(checked ? [...value, tag] : value.filter((t) => t !== tag));

  const addTag = () => {
    const tag = draft.trim();
    if (!tag) return;
    if (!list.includes(tag)) setAdded((prev) => [...prev, tag]);
    if (!value.includes(tag)) onChange([...value, tag]); // checked by default
    setDraft("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        aria-label="New tag"
        placeholder="New tag"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <ul className="border-st3 rounded-3 flex max-h-72 flex-col gap-3 overflow-y-auto border p-4">
        {list.map((tag) => (
          <li key={tag}>
            <Checkbox
              label={tag}
              checked={value.includes(tag)}
              onChange={(event) => toggle(tag, event.target.checked)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
