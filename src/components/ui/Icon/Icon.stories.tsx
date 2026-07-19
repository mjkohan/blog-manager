import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { icons } from "./Icon";

const meta = {
  title: "UI/Icon",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** All icons, like the Figma sheet. Row uses currentColor (fg1). */
export const Gallery: Story = {
  render: () => (
    <div className="text-fg1 flex items-center gap-6">
      {Object.entries(icons).map(([name, Icon]) => (
        <Icon key={name} aria-label={name} aria-hidden={false} />
      ))}
    </div>
  ),
};

/** Color follows text color; size follows the box. */
export const ColorAndSize: Story = {
  render: () => {
    const { info: Info } = icons;
    return (
      <div className="flex items-center gap-6">
        <Info className="text-fg1" aria-label="info" aria-hidden={false} />
        <Info className="text-primary-fg1 size-6" aria-label="info teal" aria-hidden={false} />
        <Info className="text-error-fg1 size-8" aria-label="info red" aria-hidden={false} />
      </div>
    );
  },
};
