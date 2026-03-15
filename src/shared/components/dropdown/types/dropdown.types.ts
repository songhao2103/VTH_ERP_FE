import type React from "react";

export type DropdownTriggerType =
  | "hover"
  | "click"
  | "doubleClick"
  | "contextMenu";

export type DropdownPlacement = "bottom-start" | "bottom-center" | "bottom-end";

export interface DropdownRootProps {
  id?: string;
  children: React.ReactNode;
  trigger?: DropdownTriggerType;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  animationDuration?: number;
  placement?: DropdownPlacement;
  offset?: number;
  disabled?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
}

export interface DropdownTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  trigger?: DropdownTriggerType;
  disabled?: boolean;
  as?: "div" | "span";
}

export interface DropdownContentProps {
  children: React.ReactNode;
  forceMount?: boolean;
  portal?: boolean;
  placement?: DropdownPlacement;
  animationDuration?: number;
  offset?: number;
}

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
  closeOnSelect?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DropdownSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DropdownGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

export interface DropdownRegistration {
  parentId: string | null;
  notifyClose?: () => void;
  getElements: () => Array<HTMLElement | null>;
}

export interface DropdownManagerContextValue {
  activeDropdownId: string | null;
  openPath: string[];
  registerDropdown: (id: string, registration: DropdownRegistration) => void;
  unregisterDropdown: (id: string) => void;
  requestOpen: (id: string) => void;
  requestClose: (id: string) => void;
  isOpen: (id: string) => boolean;
  getOpenBranchElements: (id: string) => HTMLElement[];
}

export interface DropdownRootContextValue {
  id: string;
  parentId: string | null;
  open: boolean;
  trigger: DropdownTriggerType;
  placement: DropdownPlacement;
  animationDuration: number;
  openDelay: number;
  closeDelay: number;
  offset: number;
  disabled: boolean;
  closeOnOutsideClick: boolean;
  closeOnEscape: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  openDropdown: () => void;
  closeDropdown: () => void;
  toggleDropdown: () => void;
  scheduleOpen: (delay?: number) => void;
  scheduleClose: (delay?: number) => void;
  cancelScheduled: () => void;

  isWithinContent: (node: Node | null) => boolean;
}
