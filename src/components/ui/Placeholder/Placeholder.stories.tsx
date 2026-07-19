import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Placeholder } from "./Placeholder";

const meta = {
  title: "UI/Placeholder",
  component: Placeholder,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[408px] max-w-full">
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
