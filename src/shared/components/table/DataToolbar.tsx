/* eslint-disable @typescript-eslint/no-unused-vars */
import LoadingButton from "@mui/lab/LoadingButton";
import type { LoadingButtonProps } from "@mui/lab/LoadingButton";
import type { ReactNode } from "react";

// material-ui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material/styles";

// icons
import {
  ChevronDown,
  CloudDownload,
  CloudUpload,
  ListFilter,
  Plus,
} from "lucide-react";

// ==============================|| REUSABLE DATA TOOLBAR ||============================== //

type ToolbarColor =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "purple"
  | "white";

type ToolbarIconType =
  | "upload"
  | "download"
  | "add"
  | "filter"
  | "dropdown"
  | ReactNode;

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

export interface DataToolbarProps {
  buttons?: ToolbarButton[];
  align?: "left" | "right" | "space-between";
  sx?: SxProps<Theme>;
}

const getIconColor = (color?: ToolbarColor) => {
  if (!color) return undefined;
  return color === "white" ? "common.white" : `${color}.main`;
};

const getIcon = (
  iconType?: ToolbarIconType,
  color?: ToolbarColor,
): ReactNode | undefined => {
  if (!iconType) return undefined;
  if (typeof iconType !== "string") return iconType;

  // const iconSx = { color: getIconColor(color), flexShrink: 0 };

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

const resolveButtonTextColor = (
  variant: LoadingButtonProps["variant"],
  color?: ToolbarColor,
  bgcolor?: ToolbarColor,
) => {
  if (bgcolor === "white") {
    return color === "white"
      ? "text.primary"
      : color
        ? `${color}.main`
        : "text.primary";
  }

  if (variant === "contained") {
    return color === "white"
      ? "common.white"
      : color
        ? `${color}.main`
        : "common.white";
  }

  return color === "white"
    ? "common.white"
    : color
      ? `${color}.main`
      : "secondary.main";
};

const resolveButtonBgColor = (
  variant: LoadingButtonProps["variant"],
  bgcolor?: ToolbarColor,
) => {
  if (!bgcolor) return undefined;
  if (bgcolor === "white") return "common.white";
  if (variant === "contained" || variant === "outlined" || variant === "text") {
    return `${bgcolor}.main`;
  }
  return undefined;
};

const DataToolbar = ({
  buttons = [],
  align = "left",
  sx,
}: DataToolbarProps) => {
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
          const variant = btn.variant ?? "outlined";
          const icon = getIcon(btn.icon, btn.color);
          const isDropdown = btn.icon === "dropdown";
          const textColor = resolveButtonTextColor(
            variant,
            btn.color,
            btn.bgcolor,
          );
          const buttonBgColor = resolveButtonBgColor(variant, btn.bgcolor);

          return (
            <LoadingButton
              key={btn.id}
              variant={variant}
              color={
                btn.bgcolor !== "white"
                  ? ((btn.bgcolor ??
                      "secondary") as LoadingButtonProps["color"])
                  : "secondary"
              }
              startIcon={!isDropdown ? icon : undefined}
              endIcon={isDropdown ? icon : undefined}
              onClick={btn.onClick}
              disabled={btn.disabled}
              loading={btn.loading}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                px: variant === "contained" ? 2.5 : 2,
                ...(buttonBgColor && {
                  bgcolor: buttonBgColor,
                }),
                ...(btn.bgcolor === "white" && {
                  borderColor: "divider",
                }),
                "& .MuiLoadingButton-startIcon, & .MuiLoadingButton-endIcon": {
                  color: textColor,
                },
              }}
            >
              <Typography
                variant="body2"
                component="span"
                sx={{ color: textColor }}
              >
                {btn.label}
              </Typography>
            </LoadingButton>
          );
        })}
      </Stack>
    </Box>
  );
};

export default DataToolbar;
