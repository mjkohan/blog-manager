import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LinkButton } from "./LinkButton";

const meta = {
  title: "UI/LinkButton",
  component: LinkButton,
  parameters: { layout: "centered" },
  args: {
    children: "button",
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AsLink: Story = {
  args: { href: "#example" },
};

/** All states side by side. Hover/press are live (interact). */
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <LinkButton>button</LinkButton>
      <LinkButton disabled>button</LinkButton>
    </div>
  ),
};
