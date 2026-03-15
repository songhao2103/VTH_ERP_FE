import type { MotionProps } from "motion/react";
import type React from "react";

export const POPPER_POSITION = [
  "top-start",
  "top",
  "top-end",
  "left-start",
  "left",
  "left-end",
  "right-start",
  "right",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
] as const;

export type PopperPosition = (typeof POPPER_POSITION)[number];
export type PopperTriggerMode = "click" | "hover" | "focus" | "manual";
export type PopperAnimation = "none" | "fade" | "fade-scale";

export interface PopperProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  openDefault?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: PopperTriggerMode;
  placement?: PopperPosition;
  position?: PopperPosition;
  offset?: number;
  viewportPadding?: number;
  openDelay?: number;
  closeDelay?: number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  matchTriggerWidth?: boolean;
  portal?: boolean;
  disabled?: boolean;
  role?: React.AriaRole;
}

export interface TriggerInteractionProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  "aria-haspopup"?: React.AriaAttributes["aria-haspopup"];
  "data-state"?: "open" | "closed";
  "data-disabled"?: "";
}

export interface PopperTriggerRenderProps extends TriggerInteractionProps {
  setTriggerRef: (node: HTMLElement | null) => void;
}

export interface PopperTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  children:
    | React.ReactNode
    | ((props: PopperTriggerRenderProps) => React.ReactNode);
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export interface ContentInteractionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "children"
> {
  id?: string;
  role?: React.AriaRole;
  "data-state"?: "open" | "closed";
  "data-placement"?: PopperPosition;
}

export interface PopperContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (value: boolean) => void;

  triggerMode: PopperTriggerMode;
  placement: PopperPosition;
  resolvedPlacement: PopperPosition;

  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;

  contentId: string;
  contentStyle: React.CSSProperties;

  portal: boolean;
  disabled: boolean;
  role?: React.AriaRole;

  getTriggerProps: (props?: TriggerInteractionProps) => TriggerInteractionProps;

  getContentProps: (props?: ContentInteractionProps) => ContentInteractionProps;
}

export interface PopperArrowProps {
  className?: string;
  size?: number;
}

type ConflictingMotionDomProps =
  | "children"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart";

export interface ContentInteractionProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  ConflictingMotionDomProps
> {
  id?: string;
  role?: React.AriaRole;
  "data-state"?: "open" | "closed";
  "data-placement"?: PopperPosition;
}

export interface PopperContentProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  ConflictingMotionDomProps
> {
  children: React.ReactNode;
  animation?: PopperAnimation;
  motionProps?: Omit<MotionProps, "children">;
}
