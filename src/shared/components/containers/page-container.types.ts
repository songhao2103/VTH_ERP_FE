import type { LoadingButtonProps } from "@mui/lab/LoadingButton";
import type Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import * as React from "react";

export type PageContainerElement = React.ElementRef<typeof Box>;
export type PageContainerBaseProps = React.ComponentPropsWithoutRef<typeof Box>;

export interface PageContainerProps extends PageContainerBaseProps {
  children?: React.ReactNode;
  fullHeight?: boolean;
  centered?: boolean;
}

export interface PageContainerHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  sticky?: boolean;
  withDivider?: boolean;
  toolbar?: PageContainerToolbarProps;
}

export type PageContainerToolbarAlign = "left" | "center" | "right" | "between";

export interface PageContainerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean;
  padded?: boolean;
}

export type PageContainerFooterAlign = "left" | "center" | "right" | "between";

export interface PageContainerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: PageContainerFooterAlign;
  sticky?: boolean;
  withDivider?: boolean;
}

export interface ToolbarButton {
  id: string;
  label: string;
  variant?: LoadingButtonProps["variant"];
  color?: ToolbarColor;
  bgcolor?: ToolbarColor;
  icon?: ToolbarIconType;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface PageContainerToolbarProps {
  buttons?: ToolbarButton[];
  align?: "left" | "right" | "space-between";
  sx?: SxProps<Theme>;
}

export type ToolbarColor =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "purple"
  | "white";

export type ToolbarIconType =
  | "upload"
  | "download"
  | "add"
  | "filter"
  | "dropdown"
  | React.ReactNode;
