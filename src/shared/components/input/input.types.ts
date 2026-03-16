import * as React from "react";

export type InputVariant = "outlined" | "filled" | "standard";
export type InputSize = "sm" | "md" | "lg";
export type InputColor =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  showHelperText?: boolean;
  error?: boolean;
  required?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clearable?: boolean;
  size?: InputSize;
  variant?: InputVariant;
  color?: InputColor;
  containerClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  onClear?: () => void;
}
