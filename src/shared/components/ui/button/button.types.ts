import type { ButtonProps, CircularProgressProps } from "@mui/material";

export type AppButtonSemanticColor =
  | NonNullable<ButtonProps["color"]>
  | "neutral"
  | "brand"
  | "white";

export type AppButtonColorConfig = {
  main?: string;
  hover?: string;
  active?: string;
  contrastText?: string;
  border?: string;
  softBg?: string;
};

export interface AppButtonProps extends Omit<ButtonProps, "color"> {
  color?: AppButtonSemanticColor;
  loading?: boolean;
  loadingText?: string;
  loadingPosition?: "start" | "center" | "end";
  spinnerProps?: CircularProgressProps;
  colorConfig?: AppButtonColorConfig;
}
