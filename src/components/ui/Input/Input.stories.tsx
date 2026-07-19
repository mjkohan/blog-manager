import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: { layout: "centered" },
  args: {
    placeholder: "Replace me",
    "aria-label": "Example field",
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[408px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Placeholder / empty state per the Figma spec. */
export const Placeholder: Story = {};

/** With a typed value (content layer). */
export const Filled: Story = {
  args: { defaultValue: "Replace me" },
};
