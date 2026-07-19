import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * Design-token reference (not a component). Renders straight from the Tailwind 4
 * `@theme` tokens in `src/styles/tokens.css` — the single source of truth.
 * Also serves as the smoke test that tokens actually resolve inside Storybook.
 */
const meta: Meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

function Swatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className={`rounded-3 border-st3 h-14 w-full border ${className}`} />
      <span className="text-fg2 text-xs">{label}</span>
    </div>
  );
}

export const SemanticColors: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
      <Swatch className="bg-primary-bg2" label="primary-bg2 (teal)" />
      <Swatch className="bg-primary-bg2-hover" label="primary-bg2-hover" />
      <Swatch className="bg-success-bg2" label="success-bg2" />
      <Swatch className="bg-error-bg2" label="error-bg2" />
      <Swatch className="bg-bg1" label="bg1" />
      <Swatch className="bg-bg2" label="bg2" />
      <Swatch className="bg-primary-bg1" label="primary-bg1" />
      <Swatch className="bg-error-bg1" label="error-bg1" />
    </div>
  ),
};

// NOTE: Tailwind 4 scans source for *literal* class strings — interpolated names
// like `bg-blue-${n}` are never generated. Every utility below is spelled out.
export const BlueRamp: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-6 sm:grid-cols-6">
      <Swatch className="bg-blue-2" label="blue-2" />
      <Swatch className="bg-blue-4" label="blue-4" />
      <Swatch className="bg-blue-6" label="blue-6" />
      <Swatch className="bg-blue-8" label="blue-8" />
      <Swatch className="bg-blue-10" label="blue-10" />
      <Swatch className="bg-blue-20" label="blue-20" />
      <Swatch className="bg-blue-30" label="blue-30" />
      <Swatch className="bg-blue-40" label="blue-40" />
      <Swatch className="bg-blue-50" label="blue-50" />
      <Swatch className="bg-blue-60" label="blue-60" />
      <Swatch className="bg-blue-70" label="blue-70" />
      <Swatch className="bg-blue-80" label="blue-80" />
    </div>
  ),
};

function RadiusChip({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`bg-primary-bg2 size-16 ${className}`} />
      <span className="text-fg2 text-xs">{label}</span>
    </div>
  );
}

export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4 p-6">
      <RadiusChip className="rounded-1" label="rounded-1" />
      <RadiusChip className="rounded-2" label="rounded-2" />
      <RadiusChip className="rounded-3" label="rounded-3" />
      <RadiusChip className="rounded-4" label="rounded-4" />
      <RadiusChip className="rounded-5" label="rounded-5" />
      <RadiusChip className="rounded-6" label="rounded-6" />
      <RadiusChip className="rounded-circular" label="rounded-circular" />
    </div>
  ),
};
