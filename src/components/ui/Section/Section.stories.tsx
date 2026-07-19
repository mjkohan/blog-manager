import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Placeholder } from "../Placeholder";
import { Section } from "./Section";

const meta = {
  title: "UI/Section",
  component: Section,
  parameters: { layout: "padded" },
  args: {
    label: "Title",
    caption: "Description",
  },
  decorators: [
    (Story) => (
      <div className="w-[560px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Header only (no content, no divider). */
export const HeaderOnly: Story = {};

export const WithContent: Story = {
  render: (args) => (
    <Section {...args}>
      <Placeholder />
    </Section>
  ),
};

export const WithoutDivider: Story = {
  args: { divider: false },
  render: (args) => (
    <Section {...args}>
      <Placeholder />
    </Section>
  ),
};
