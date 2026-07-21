import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

const meta = {
  title: "UI/Menu",
  component: Menu,
  parameters: { layout: "padded" },
  args: { "aria-label": "Actions" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[267px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem disabled>Menu Item</MenuItem>
    </Menu>
  ),
};

export const LoadingMore: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem loading>loading...</MenuItem>
    </Menu>
  ),
};

/** sm / md / lg row scale (set per MenuItem). */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Menu {...args}>
        <MenuItem size="sm">Small</MenuItem>
        <MenuItem size="sm">Small</MenuItem>
      </Menu>
      <Menu {...args}>
        <MenuItem size="md">Medium</MenuItem>
        <MenuItem size="md">Medium</MenuItem>
      </Menu>
      <Menu {...args}>
        <MenuItem size="lg">Large</MenuItem>
        <MenuItem size="lg">Large</MenuItem>
      </Menu>
    </div>
  ),
};
