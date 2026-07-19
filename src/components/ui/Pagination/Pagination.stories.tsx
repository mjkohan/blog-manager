import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Pagination } from "./Pagination";

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  args: {
    page: 5,
    totalPages: 10,
  },
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstPage: Story = {
  args: { page: 1 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FewPages: Story = {
  args: { page: 2, totalPages: 4 },
};

export const AsLinks: Story = {
  args: { getHref: (p) => `/articles/page/${p}` },
};

/** Interactive — click updates the current page. */
export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};
