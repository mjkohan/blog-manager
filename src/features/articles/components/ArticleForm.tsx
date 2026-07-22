"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Section } from "@/components/ui/Section";
import { Textarea } from "@/components/ui/Textarea";

import { useSubmitArticle, type SubmitTarget } from "../hooks/useArticleMutations";
import { articleFormSchema, type ArticleFormValues } from "../types";
import { TagPicker } from "./TagPicker";

interface ArticleFormProps {
  /** Tags from the API, pre-sorted alphabetically. */
  tagOptions: string[];
  /** Prefilled values (edit) or empty strings/array (create). */
  defaultValues: ArticleFormValues;
  /** Create (with author `userId`) or edit (with post `id`). */
  target: SubmitTarget;
}

/**
 * Create/edit article form (Figma "New article" / "Edit article"). A single
 * `<form>` spanning two Sections: the left card holds Title (required) /
 * Description / Body + Submit; the right card holds the Tags picker. Validation is
 * RHF + Zod (`Required field` on an empty Title). Submit is disabled until valid
 * and shows a spinner while the (simulated) create/update mutation is in flight.
 */
export function ArticleForm({ tagOptions, defaultValues, target }: ArticleFormProps) {
  const bodyId = useId();
  const mutation = useSubmitArticle(target);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    mode: "onTouched",
    defaultValues,
  });

  const onSubmit = (values: ArticleFormValues) => mutation.mutate(values);
  const heading = target.mode === "create" ? "New article" : "Edit article";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_360px] lg:items-start"
    >
      <Section label={heading}>
        <div className="flex flex-col gap-4">
          <Field
            label="Title"
            required
            placeholder="Title"
            error={errors.title?.message}
            {...register("title")}
          />
          <Field label="Description" placeholder="Description" {...register("description")} />

          <div className="flex flex-col gap-2">
            <label
              htmlFor={bodyId}
              className="text-fg1 text-start text-sm font-normal tracking-[-0.02em]"
            >
              Body
            </label>
            <Textarea id={bodyId} rows={6} {...register("body")} />
          </div>

          <Button
            type="submit"
            className="mt-2 self-start"
            disabled={!isValid}
            loading={mutation.isPending}
          >
            Submit
          </Button>
        </div>
      </Section>

      <Section label="Tags">
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <TagPicker options={tagOptions} value={field.value} onChange={field.onChange} />
          )}
        />
      </Section>
    </form>
  );
}
