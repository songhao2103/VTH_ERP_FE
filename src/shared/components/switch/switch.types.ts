import type React from "react";

export type SwitchSize = "sm" | "md" | "lg";

export type SwitchColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;

  disabled?: boolean;

  size?: SwitchSize;
  color?: SwitchColor;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  className?: string;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange" | "children" | "color"
>;
