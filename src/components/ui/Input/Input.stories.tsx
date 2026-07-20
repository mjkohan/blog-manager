import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: { layout: "padded" },
  args: {
    placeholder: "sample text",
    "aria-label": "Sample field",
    size: "md",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[456px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty — placeholder shown in `fg1-disable`. Hover/focus are live (interact). */
export const Default: Story = {};

/** Typed value in `fg1`. */
export const Filled: Story = {
  args: { defaultValue: "sample text" },
};

export const Readonly: Story = {
  args: { defaultValue: "sample text", readOnly: true },
};

export const Disabled: Story = {
  args: { defaultValue: "sample text", disabled: true },
};

export const Error: Story = {
  args: { defaultValue: "sample text", error: true },
};

/** All three heights (sm 36 / md 40 / lg 48). */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Input {...args} size="sm" aria-label="Small field" />
      <Input {...args} size="md" aria-label="Medium field" />
      <Input {...args} size="lg" aria-label="Large field" />
    </div>
  ),
};
