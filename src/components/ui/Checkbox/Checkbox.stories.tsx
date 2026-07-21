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
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
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

/** sm / md / lg box + label scale. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-6">
      <Checkbox {...args} size="sm" label="Small" checked aria-label={undefined} />
      <Checkbox {...args} size="md" label="Medium" checked aria-label={undefined} />
      <Checkbox {...args} size="lg" label="Large" checked aria-label={undefined} />
    </div>
  ),
};
