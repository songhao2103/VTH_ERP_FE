import type { ReactNode } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type { Theme } from "@mui/material/styles";
import type { SystemStyleObject } from "@mui/system";

import {
  ChevronDown,
  CloudDownload,
  CloudUpload,
  ListFilter,
  Plus,
} from "lucide-react";

import type {
  PageContainerToolbarProps,
  ToolbarColor,
  ToolbarIconType,
} from "./page-container.types";
import {
  Button,
  type AppButtonColorConfig,
  type AppButtonSemanticColor,
} from "../ui";

type ToolbarButtonVariant = "text" | "outlined" | "contained";

/**
 * ToolbarColor gốc của anh hiện KHÔNG có "white"
 */
type ToolbarSemanticColor = Exclude<ToolbarColor, undefined>;

/**
 * Tone dùng ở UI cho text/bg có thể thêm "white"
 */
type ToolbarTone = ToolbarSemanticColor | "white";

const toolbarColorMap: Record<ToolbarSemanticColor, AppButtonSemanticColor> = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  purple: "secondary",
  white: "white",
};

const getIcon = (iconType?: ToolbarIconType): ReactNode | undefined => {
  if (!iconType) return undefined;
  if (typeof iconType !== "string") return iconType;

  switch (iconType) {
    case "upload":
      return <CloudUpload size={18} style={{ verticalAlign: "middle" }} />;
    case "download":
      return <CloudDownload size={18} style={{ verticalAlign: "middle" }} />;
    case "add":
      return <Plus size={18} style={{ verticalAlign: "middle" }} />;
    case "filter":
      return <ListFilter size={18} style={{ verticalAlign: "middle" }} />;
    case "dropdown":
      return <ChevronDown size={18} style={{ verticalAlign: "middle" }} />;
    default:
      return undefined;
  }
};

const resolveSemanticColor = (
  bgcolor?: ToolbarTone,
): AppButtonSemanticColor => {
  if (!bgcolor || bgcolor === "white") return "secondary";
  return toolbarColorMap[bgcolor];
};

const resolveCssColorVar = (color: ToolbarSemanticColor) => {
  switch (color) {
    case "primary":
      return "var(--color-primary)";
    case "secondary":
      return "var(--color-secondary)";
    case "success":
      return "var(--color-success)";
    case "warning":
      return "var(--color-warning)";
    case "error":
      return "var(--color-danger)";
    case "info":
      return "var(--color-info)";
    case "purple":
      return "var(--color-secondary)";
    default:
      return "var(--color-secondary)";
  }
};

const resolveCssHoverVar = (color: ToolbarSemanticColor) => {
  switch (color) {
    case "primary":
      return "var(--color-primary-600)";
    case "secondary":
      return "var(--color-secondary-600)";
    case "success":
      return "var(--color-success-active)";
    case "warning":
      return "var(--color-warning-active)";
    case "error":
      return "var(--color-danger-active)";
    case "info":
      return "var(--color-info-active)";
    case "purple":
      return "var(--color-secondary-600)";
    default:
      return "var(--color-secondary-600)";
  }
};

const resolveContrastVar = (color: ToolbarSemanticColor) => {
  switch (color) {
    case "success":
      return "var(--color-success-foreground)";
    case "warning":
      return "var(--color-warning-foreground)";
    case "error":
      return "var(--color-danger-foreground)";
    case "info":
      return "var(--color-info-foreground)";
    default:
      return "rgb(var(--text-inverse))";
  }
};

const resolveButtonColorConfig = (
  variant: ToolbarButtonVariant,
  color?: ToolbarTone,
  bgcolor?: ToolbarTone,
): AppButtonColorConfig | undefined => {
  if (bgcolor === "white") {
    return {
      main: "var(--color-light)",
      hover: "color-mix(in srgb, var(--color-light) 92%, var(--color-dark) 8%)",
      contrastText:
        color && color !== "white"
          ? resolveCssColorVar(color)
          : "rgb(var(--text-primary))",
      border: "var(--color-border)",
    };
  }

  if (!bgcolor) return undefined;

  if (variant === "contained") {
    return {
      main: resolveCssColorVar(bgcolor),
      hover: resolveCssHoverVar(bgcolor),
      contrastText: resolveContrastVar(bgcolor),
      border: resolveCssColorVar(bgcolor),
    };
  }

  return undefined;
};

const resolveTextStyles = (
  variant: ToolbarButtonVariant,
  color?: ToolbarTone,
  bgcolor?: ToolbarTone,
): SystemStyleObject<Theme> => {
  if (bgcolor === "white") {
    return {
      color:
        color && color !== "white" ? resolveCssColorVar(color) : "text.primary",
    };
  }

  if (variant === "contained") {
    return {
      color:
        color === "white"
          ? "common.white"
          : color
            ? resolveCssColorVar(color)
            : "common.white",
    };
  }

  return {
    color:
      color === "white"
        ? "common.white"
        : color
          ? resolveCssColorVar(color)
          : "text.secondary",
  };
};

const PageContainerToolbar = ({
  buttons = [],
  align = "left",
  sx,
}: PageContainerToolbarProps) => {
  if (buttons.length === 0) return null;

  const justifyContent =
    align === "left"
      ? "flex-start"
      : align === "right"
        ? "flex-end"
        : "space-between";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent,
        mb: 2,
        gap: 2,
        ...sx,
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        useFlexGap
        sx={{ flexWrap: "wrap", alignItems: "center" }}
      >
        {buttons.map((btn) => {
          const variant: ToolbarButtonVariant = btn.variant ?? "outlined";
          const icon = getIcon(btn.icon);
          const isDropdown = btn.icon === "dropdown";

          const bgTone = (btn.bgcolor ?? undefined) as ToolbarTone | undefined;
          const textTone = (btn.color ?? undefined) as ToolbarTone | undefined;
          const textStyles = resolveTextStyles(variant, textTone, bgTone);

          return (
            <Button
              key={btn.id}
              variant={variant}
              color={resolveSemanticColor(bgTone)}
              colorConfig={resolveButtonColorConfig(variant, textTone, bgTone)}
              startIcon={!isDropdown ? icon : undefined}
              endIcon={isDropdown ? icon : undefined}
              onClick={btn.onClick}
              disabled={btn.disabled}
              loading={btn.loading}
              loadingPosition="center"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: variant === "contained" ? 2.5 : 2,
                ...(bgTone === "white" && {
                  borderColor: "divider",
                }),
                ...textStyles,
                "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                  ...textStyles,
                },
                "& .MuiCircularProgress-root": {
                  ...textStyles,
                },
              }}
            >
              {btn.label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

PageContainerToolbar.displayName = "PageContainerToolbar";

export default PageContainerToolbar;
