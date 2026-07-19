import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";

/** check-circle icon drawn with `currentColor` so it follows the button text color. */
function CheckCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.9 1.8C5.42606 1.8 1.8 5.42606 1.8 9.9C1.8 14.3739 5.42606 18 9.9 18C14.3739 18 18 14.3739 18 9.9C18 5.42606 14.3739 1.8 9.9 1.8ZM9.9 0C4.43194 0 0 4.43194 0 9.9C0 15.3681 4.43194 19.8 9.9 19.8C15.3681 19.8 19.8 15.3681 19.8 9.9C19.8 4.43194 15.3681 0 9.9 0Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5364 7.2636C14.8879 7.61508 14.8879 8.18492 14.5364 8.5364L9.5364 13.5364C9.18492 13.8879 8.61508 13.8879 8.2636 13.5364L5.2636 10.5364C4.91213 10.1849 4.91213 9.61508 5.2636 9.2636C5.61508 8.91213 6.18492 8.91213 6.5364 9.2636L8.9 11.6272L13.2636 7.2636C13.6151 6.91213 14.1849 6.91213 14.5364 7.2636Z"
        fill="currentColor"
      />
    </svg>
  );
}

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: {
    children: "button",
    variant: "primary",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "danger", "secondary"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Danger: Story = { args: { variant: "danger" } };
export const Secondary: Story = { args: { variant: "secondary" } };

export const IconOnly: Story = {
  args: { children: undefined, icon: <CheckCircle />, "aria-label": "Confirm" },
};

export const WithIcon: Story = {
  args: { icon: <CheckCircle /> },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** Full matrix: variant × (text / icon) × state. Hover/press are live. */
export const Matrix: Story = {
  render: () => {
    const variants = ["primary", "secondary", "danger"] as const;
    return (
      <div className="flex flex-col gap-3">
        {variants.map((variant) => (
          <div key={variant} className="flex items-center gap-3">
            <Button variant={variant}>button</Button>
            <Button variant={variant} icon={<CheckCircle />} aria-label="confirm" />
            <Button variant={variant} disabled>
              button
            </Button>
            <Button variant={variant} loading>
              button
            </Button>
            <Button variant={variant} loading icon={<CheckCircle />} aria-label="loading" />
          </div>
        ))}
      </div>
    );
  },
};
