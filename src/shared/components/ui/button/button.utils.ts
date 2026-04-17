import type { ButtonProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type {
  AppButtonColorConfig,
  AppButtonSemanticColor,
} from "./button.types";

export const resolveMuiColor = (
  color?: AppButtonSemanticColor,
): ButtonProps["color"] | "neutral" | "brand" | "white" => {
  return color ?? "primary";
};

export const getButtonColorStyles = (
  theme: Theme,
  colorConfig?: AppButtonColorConfig,
) => {
  if (!colorConfig) return undefined;

  return {
    ...(colorConfig.main && {
      backgroundColor: colorConfig.main,
      borderColor: colorConfig.border ?? colorConfig.main,
      color: colorConfig.contrastText ?? theme.palette.common.white,
    }),
    ...(colorConfig.hover && {
      "&:hover": {
        backgroundColor: colorConfig.hover,
        borderColor: colorConfig.border ?? colorConfig.hover,
      },
    }),
    ...(colorConfig.active && {
      "&:active": {
        backgroundColor: colorConfig.active,
      },
    }),
  };
};
