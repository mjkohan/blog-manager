import { type ComponentProps, useId } from "react";

import { cn } from "@/lib/utils";

import { Input, type InputSize } from "../Input";

interface FieldProps extends Omit<ComponentProps<"input">, "id" | "size"> {
  /** Label text shown above the input. */
  label: string;
  /** Input height: sm / md / lg. */
  size?: InputSize;
  /** Show the red required asterisk after the label. */
  required?: boolean;
  /** Default helper message (neutral-fg2). Ignored when `error` is set. */
  hint?: string;
  /** Error message (error-fg1). Overrides `hint` and marks the input invalid. */
  error?: string;
  id?: string;
}

/**
 * Labelled form field: label (+ optional required asterisk), the base Input,
 * and an optional message row (neutral hint or error). Presentational — no
 * validation logic; the consumer passes `error`. Type/colors from Figma:
 * label Inter 400 / 14 / 20 (fg1); required 10 / 12 (error-fg1);
 * message Inter 600 / 12 / 16 (fg2 default, error-fg1 on error).
 */
export function Field({ label, required, hint, error, id, size, className, ...props }: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;
  const isError = Boolean(error);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={inputId}
        className="text-fg1 text-start text-sm font-normal tracking-[-0.02em]"
      >
        {label}
        {required && (
          <span
            aria-hidden="true"
            className="text-error-fg1 ms-0.5 align-top text-[10px] leading-3"
          >
            *
          </span>
        )}
      </label>

      <Input
        id={inputId}
        size={size}
        error={isError}
        required={required}
        aria-describedby={message ? messageId : undefined}
        {...props}
      />

      {message && (
        <p
          id={messageId}
          className={cn(
            "text-start text-xs font-semibold tracking-[-0.02em]",
            isError ? "text-error-fg1" : "text-fg2",
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}
