import type { Preview } from "@storybook/nextjs-vite";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'error' fails the a11y check on violations; 'todo' only surfaces them.
      test: "error",
    },
  },
  // UI is LTR / English (see CLAUDE.md §8).
  decorators: [
    (Story) => (
      <div dir="ltr" className="p-6">
        <Story />
      </div>
    ),
  ],
};

export default preview;
