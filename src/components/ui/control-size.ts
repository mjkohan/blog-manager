/**
 * Shared control-size scale for interactive UI components (Figma sm / md / lg).
 * Heights follow the Input scale: sm = 36px, md = 40px (default), lg = 48px.
 * Use this single type everywhere a control exposes a `size` prop so the whole
 * design kit stays consistent and re-sizable in one place.
 */
export type ControlSize = "sm" | "md" | "lg";
