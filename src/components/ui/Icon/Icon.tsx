import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type IconProps = ComponentProps<"svg">;

/**
 * Build an icon component from a viewBox + paths. Paths inherit `currentColor`
 * (the svg sets `fill="currentColor"`), so color follows text color. Size via
 * `className` (default 20px). Decorative by default (`aria-hidden`); pass
 * `aria-label` + `aria-hidden={false}` for a standalone, meaningful icon.
 */
function createIcon(viewBox: string, paths: ReactNode) {
  return function Icon({ className, ...props }: IconProps) {
    return (
      <svg
        viewBox={viewBox}
        fill="currentColor"
        aria-hidden="true"
        className={cn("size-5 shrink-0", className)}
        {...props}
      >
        {paths}
      </svg>
    );
  };
}

export const ChevronLeftIcon = createIcon(
  "0 0 6 10",
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M5.5364 0.263604C5.88787 0.615076 5.88787 1.18492 5.5364 1.5364L2.17279 4.9L5.5364 8.2636C5.88787 8.61508 5.88787 9.18492 5.5364 9.5364C5.18493 9.88787 4.61508 9.88787 4.2636 9.5364L0.263604 5.5364C0.0948212 5.36761 0 5.1387 0 4.9C0 4.66131 0.0948212 4.43239 0.263604 4.2636L4.2636 0.263604C4.61508 -0.087868 5.18493 -0.0878679 5.5364 0.263604Z"
  />,
);

export const ChevronRightIcon = createIcon(
  "0 0 6 10",
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M0.263604 0.263604C0.615076 -0.0878679 1.18492 -0.087868 1.5364 0.263604L5.5364 4.2636C5.70518 4.43239 5.8 4.66131 5.8 4.9C5.8 5.1387 5.70518 5.36761 5.5364 5.5364L1.5364 9.5364C1.18492 9.88787 0.615076 9.88787 0.263604 9.5364C-0.087868 9.18492 -0.0878679 8.61508 0.263604 8.2636L3.62721 4.9L0.263604 1.5364C-0.0878679 1.18492 -0.087868 0.615076 0.263604 0.263604Z"
  />,
);

export const ChevronDownIcon = createIcon(
  "0 0 10 6",
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M0.263604 0.263604C0.615076 -0.087868 1.18492 -0.0878679 1.5364 0.263604L4.9 3.62721L8.2636 0.263604C8.61508 -0.0878679 9.18492 -0.087868 9.5364 0.263604C9.88787 0.615076 9.88787 1.18492 9.5364 1.5364L5.5364 5.5364C5.36761 5.70518 5.1387 5.8 4.9 5.8C4.66131 5.8 4.43239 5.70518 4.2636 5.5364L0.263604 1.5364C-0.087868 1.18492 -0.0878679 0.615076 0.263604 0.263604Z"
  />,
);

export const ChevronUpIcon = createIcon(
  "0 0 10 6",
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4.9 0C5.1387 0 5.36761 0.0948212 5.5364 0.263604L9.5364 4.2636C9.88787 4.61508 9.88787 5.18493 9.5364 5.5364C9.18492 5.88787 8.61508 5.88787 8.2636 5.5364L4.9 2.17279L1.5364 5.5364C1.18492 5.88787 0.615076 5.88787 0.263604 5.5364C-0.0878679 5.18493 -0.087868 4.61508 0.263604 4.2636L4.2636 0.263604C4.43239 0.0948212 4.66131 0 4.9 0Z"
  />,
);

export const EllipsisIcon = createIcon(
  "0 0 20 5",
  <>
    <path d="M2.25 0C3.49264 0 4.5 1.00736 4.5 2.25C4.5 3.49264 3.49264 4.5 2.25 4.5C1.00736 4.5 0 3.49264 0 2.25C0 1.00736 1.00736 0 2.25 0Z" />
    <path d="M9.90234 0C11.145 0 12.1523 1.00736 12.1523 2.25C12.1523 3.49264 11.145 4.5 9.90234 4.5C8.6597 4.5 7.65234 3.49264 7.65234 2.25C7.65234 1.00736 8.6597 0 9.90234 0Z" />
    <path d="M17.5547 0C18.7973 0 19.8047 1.00736 19.8047 2.25C19.8047 3.49264 18.7973 4.5 17.5547 4.5C16.312 4.5 15.3047 3.49264 15.3047 2.25C15.3047 1.00736 16.312 0 17.5547 0Z" />
  </>,
);

export const InfoIcon = createIcon(
  "0 0 20 20",
  <>
    <path d="M9.9 0C4.44 0 0 4.44 0 9.9C0 15.36 4.44 19.8 9.9 19.8C15.36 19.8 19.8 15.36 19.8 9.9C19.8 4.44 15.36 0 9.9 0ZM9.9 18C5.46 18 1.8 14.34 1.8 9.9C1.8 5.46 5.46 1.8 9.9 1.8C14.34 1.8 18 5.46 18 9.9C18 14.34 14.34 18 9.9 18Z" />
    <path d="M9.90001 9H8.88C8.40001 9 7.98 9.42 7.98 9.9C7.98 10.38 8.40001 10.8 8.88 10.8H9V14.88C9 15.36 9.42001 15.78 9.90001 15.78C10.38 15.78 10.8 15.36 10.8 14.88V9.9C10.8 9.42 10.38 9 9.90001 9Z" />
    <path d="M9.66004 4.97999C9.36003 4.97999 9.06003 5.09999 8.82003 5.33999C8.58004 5.57999 8.46004 5.81999 8.46004 6.17999C8.46004 6.83999 9.00003 7.31999 9.60003 7.31999C10.26 7.31999 10.74 6.77999 10.74 6.17999C10.8 5.51999 10.26 4.97999 9.66004 4.97999Z" />
  </>,
);

export const CheckCircleIcon = createIcon(
  "0 0 20 20",
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.9 1.8C5.42606 1.8 1.8 5.42606 1.8 9.9C1.8 14.3739 5.42606 18 9.9 18C14.3739 18 18 14.3739 18 9.9C18 5.42606 14.3739 1.8 9.9 1.8ZM9.9 0C4.43194 0 0 4.43194 0 9.9C0 15.3681 4.43194 19.8 9.9 19.8C15.3681 19.8 19.8 15.3681 19.8 9.9C19.8 4.43194 15.3681 0 9.9 0Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5364 7.2636C14.8879 7.61508 14.8879 8.18492 14.5364 8.5364L9.5364 13.5364C9.18492 13.8879 8.61508 13.8879 8.2636 13.5364L5.2636 10.5364C4.91213 10.1849 4.91213 9.61508 5.2636 9.2636C5.61508 8.91213 6.18492 8.91213 6.5364 9.2636L8.9 11.6272L13.2636 7.2636C13.6151 6.91213 14.1849 6.91213 14.5364 7.2636Z"
    />
  </>,
);

export const WarningIcon = createIcon(
  "0 0 22 20",
  // Outlined triangle (even-odd ring of inner + outer boundary) with a solid
  // exclamation bar + dot — matches the Figma outline, not a filled triangle.
  <>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.9014 6.41894C11.3985 6.41894 11.8014 6.82188 11.8014 7.31894V11.0589C11.8014 11.556 11.3985 11.9589 10.9014 11.9589C10.4043 11.9589 10.0014 11.556 10.0014 11.0589V7.31894C10.0014 6.82188 10.4043 6.41894 10.9014 6.41894Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.7514 14.3173C9.74852 13.6774 10.2677 13.1641 10.9004 13.1641C11.5341 13.1641 12.0514 13.6767 12.0514 14.3141C12.0514 14.9491 11.5365 15.4641 10.9014 15.4641C10.2674 15.4641 9.75317 14.9509 9.7514 14.3173Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.1485 2.52451C11.597 1.5585 10.2052 1.5585 9.65368 2.52451L1.99454 15.9288C1.44677 16.8866 2.13808 18.0792 3.24211 18.0792H18.5601C19.6627 18.0792 20.3551 16.887 19.8076 15.9287L12.1485 2.52451ZM13.7115 1.63174C12.4691 -0.543915 9.33316 -0.543915 8.09068 1.63174L0.431844 15.0355C-0.802385 17.1936 0.756135 19.8792 3.24211 19.8792H18.5601C21.0455 19.8792 22.6031 17.1935 21.3706 15.0358L13.7115 1.63174Z"
    />
  </>,
);

export const MenuIcon = createIcon(
  "0 0 20 20",
  <>
    <rect x="1" y="4" width="18" height="2" rx="1" />
    <rect x="1" y="9" width="18" height="2" rx="1" />
    <rect x="1" y="14" width="18" height="2" rx="1" />
  </>,
);

export const PlusIcon = createIcon(
  "0 0 20 20",
  <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />,
);

export const DocumentIcon = createIcon(
  "0 0 20 20",
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Zm2 5a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H6Zm0 4a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H6Z"
  />,
);

/** Registry of all icons (name -> component), handy for pickers/galleries. */
export const icons = {
  "chevron-left": ChevronLeftIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-right": ChevronRightIcon,
  ellipsis: EllipsisIcon,
  info: InfoIcon,
  "check-circle": CheckCircleIcon,
  warning: WarningIcon,
  menu: MenuIcon,
  plus: PlusIcon,
  document: DocumentIcon,
} as const;

export type IconName = keyof typeof icons;
