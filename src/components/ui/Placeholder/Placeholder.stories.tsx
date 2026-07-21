import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Placeholder } from "./Placeholder";

const meta = {
  title: "UI/Placeholder",
  component: Placeholder,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[408px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = {
  args: { children: "Select an option" },
};

/** sm (36) / md (40) / lg (48) heights, mirroring Input. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Placeholder {...args} size="sm">
        Small
      </Placeholder>
      <Placeholder {...args} size="md">
        Medium
      </Placeholder>
      <Placeholder {...args} size="lg">
        Large
      </Placeholder>
    </div>
  ),
};
