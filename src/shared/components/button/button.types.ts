import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonAction =
  | "submit"
  | "approve"
  | "reject"
  | "close"
  | "open"
  | "add"
  | "edit"
  | "delete"
  | "save"
  | "cancel"
  | "search"
  | "refresh"
  | "download"
  | "upload";

export type ButtonVariant = "solid" | "outline" | "ghost" | "soft";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "gray";

export type ButtonIconPosition = "left" | "right";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  action?: ButtonAction;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;

  /**
   * Show action icon automatically.
   * Defaults to true when action exists.
   */
  showIcon?: boolean;

  /**
   * Custom icon override.
   * If provided, it replaces the default action icon.
   */
  icon?: ReactNode;

  iconPosition?: ButtonIconPosition;

  loading?: boolean;
  fullWidth?: boolean;

  /**
   * Optional custom label when loading.
   * Useful if you want "Saving..." while keeping width stable.
   */
  loadingText?: ReactNode;
}
