import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../Button";
import { Header } from "./Header";

const meta = {
  title: "UI/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  args: {
    userName: "<user>",
    title: "Arvancloud Challenge",
    actions: <Button variant="secondary">Log out</Button>,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTitle: Story = {
  args: { title: undefined },
};

export const GreetingOnly: Story = {
  args: { title: undefined, actions: undefined },
};
