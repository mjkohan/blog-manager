import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SidebarItem } from "./SidebarItem";

const meta = {
  title: "UI/SidebarItem",
  component: SidebarItem,
  parameters: { layout: "padded" },
  args: {
    children: "Title",
  },
  argTypes: {
    selected: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[216px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const WithDescription: Story = {
  args: { description: "12 articles" },
};

/** A small nav list, one item selected. */
export const List: Story = {
  render: () => (
    <nav className="flex flex-col">
      <SidebarItem>Title</SidebarItem>
      <SidebarItem selected>Title</SidebarItem>
      <SidebarItem>Title</SidebarItem>
    </nav>
  ),
};
