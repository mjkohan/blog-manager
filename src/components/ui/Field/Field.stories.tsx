import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Field } from "./Field";

const meta = {
  title: "UI/Field",
  component: Field,
  parameters: { layout: "centered" },
  args: {
    label: "Label",
    placeholder: "Replace me",
  },
  decorators: [
    (Story) => (
      <div className="w-[408px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};

/** Neutral helper message (neutral-fg2). */
export const WithHint: Story = {
  args: { hint: "error message" },
};

/** Error message (error-fg1) + invalid input. */
export const WithError: Story = {
  args: { required: true, error: "error message" },
};
