import type { Preview } from "@storybook/nextjs-vite";
import { Inter } from "next/font/google";

import "../src/app/globals.css";

// Match the app's default sans (Inter) inside Storybook.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

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
      <div dir="ltr" className={`${inter.variable} p-6 font-sans`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
