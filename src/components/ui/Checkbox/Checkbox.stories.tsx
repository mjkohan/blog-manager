import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  args: {
    "aria-label": "Accept",
  },
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};

export const On: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const WithLabel: Story = {
  args: { label: "Remember me", "aria-label": undefined },
};

/** All three values × enabled/disabled. Hover/press are live (interact). */
export const Matrix: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Checkbox aria-label="off" />
      <Checkbox aria-label="on" checked readOnly />
      <Checkbox aria-label="mixed" indeterminate />
      <Checkbox aria-label="off disabled" disabled />
      <Checkbox aria-label="on disabled" checked readOnly disabled />
      <Checkbox aria-label="mixed disabled" indeterminate disabled />
    </div>
  ),
};
