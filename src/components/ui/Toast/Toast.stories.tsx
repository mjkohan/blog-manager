import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Toast } from "./Toast";

const meta = {
  title: "UI/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  args: {
    title: "Title",
    description: "Description",
    type: "success",
  },
  argTypes: {
    type: { control: "inline-radio", options: ["success", "error"] },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Error: Story = {
  args: { type: "error" },
};

export const TitleOnly: Story = {
  args: { description: undefined },
};

export const WithAction: Story = {
  args: {
    action: (
      <button type="button" className="text-xs font-semibold underline">
        Undo
      </button>
    ),
  },
};
