"use client";

import { type ComponentProps, type ReactNode, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.7682 0.131802C9.94393 0.307538 9.94393 0.592462 9.7682 0.768198L3.5807 6.9557C3.40496 7.13143 3.12004 7.13143 2.9443 6.9557L0.131802 4.1432C-0.043934 3.96746 -0.043934 3.68254 0.131802 3.5068C0.307538 3.33107 0.592462 3.33107 0.768198 3.5068L3.2625 6.0011L9.1318 0.131802C9.30754 -0.043934 9.59246 -0.043934 9.7682 0.131802Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="8" height="2" viewBox="0 0 8 1" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.45C0 0.201472 0.214903 0 0.48 0H6.72C6.9851 0 7.2 0.201472 7.2 0.45C7.2 0.698528 6.9851 0.9 6.72 0.9H0.48C0.214903 0.9 0 0.698528 0 0.45Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  /** Mixed state — renders the minus icon and reports `aria-checked="mixed"`. */
  indeterminate?: boolean;
  /** Optional visible label rendered next to the box. */
  label?: ReactNode;
}

/**
 * Checkbox (Figma "CheckboxElements"). A visually-hidden native checkbox drives
 * a11y/keyboard; a styled box shows the state. Values: off / on (check) /
 * indeterminate (minus). Colors: checked primary-bg2 (hover/press/disable
 * variants); off neutral-bg1 + st1 border (hover/press/disable variants); icon
 * neutral-fg3. 16px box, 4px radius, 2px border. Controlled or uncontrolled.
 */
export function Checkbox({
  indeterminate = false,
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  className,
  id,
  ...props
}: CheckboxProps) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const ref = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(Boolean(defaultChecked));
  const isChecked = isControlled ? Boolean(checked) : internal;
  const filled = isChecked || indeterminate;

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex items-center gap-2",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className="peer sr-only"
        checked={isControlled ? checked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : undefined}
        onChange={(event) => {
          if (!isControlled) setInternal(event.target.checked);
          onChange?.(event);
        }}
        {...props}
      />

      <span
        aria-hidden="true"
        className={cn(
          "text-fg3 rounded-2 flex size-4 shrink-0 items-center justify-center border-2 border-solid transition-colors",
          "peer-focus-visible:ring-primary-bg2 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
          disabled
            ? filled
              ? "bg-primary-bg2-disable border-transparent"
              : "border-st2-disable bg-bg1"
            : filled
              ? "bg-primary-bg2 group-hover:bg-primary-bg2-hover group-active:bg-primary-bg2-press border-transparent"
              : "border-st1 bg-bg1 group-hover:border-st1-hover group-hover:bg-bg1-hover group-active:border-st1-press group-active:bg-bg1-press",
        )}
      >
        {indeterminate ? <MinusIcon /> : isChecked ? <CheckIcon /> : null}
      </span>

      {label != null && <span className="text-fg1 text-sm tracking-[-0.02em]">{label}</span>}
    </label>
  );
}
