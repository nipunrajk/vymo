/**
 * Design System Breakpoint Constants
 *
 * Mobile:  <= 767px (Single column, full-width inputs, sticky mobile submit)
 * Tablet:  768px - 1024px (Comfortable single-column or stacked layout)
 * Desktop: >= 1025px (Two columns, full name & email in row 1, span-2 for textarea/consent)
 */
export const BREAKPOINTS = {
  mobileMax: 767,
  tabletMin: 768,
  tabletMax: 1024,
  desktopMin: 1025,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;
