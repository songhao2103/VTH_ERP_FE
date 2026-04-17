import CircularProgress from "@mui/material/CircularProgress";
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import * as React from "react";

import Button from "@mui/material/Button";
import type { AppButtonProps } from "./button.types";
import { getButtonColorStyles, resolveMuiColor } from "./button.utils";

const buildLoadingSx = (
  loading: boolean,
  loadingPosition: AppButtonProps["loadingPosition"],
): SxProps<Theme> => {
  if (!loading) return {};

  if (loadingPosition === "center") {
    return {
      "& .app-button__content": {
        visibility: "hidden",
      },
    };
  }

  return {};
};

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  function AppButton(
    {
      children,
      loading = false,
      loadingText,
      loadingPosition = "center",
      spinnerProps,
      disabled,
      startIcon,
      endIcon,
      color = "primary",
      colorConfig,
      sx,
      variant = "contained",
      ...muiProps
    },
    ref,
  ) {
    const spinner = (
      <CircularProgress size={18} color="inherit" {...spinnerProps} />
    );

    const resolvedStartIcon =
      loading && loadingPosition === "start" ? spinner : startIcon;

    const resolvedEndIcon =
      loading && loadingPosition === "end" ? spinner : endIcon;

    const normalizedSx = Array.isArray(sx) ? sx : sx ? [sx] : [];

    return (
      <Button
        ref={ref}
        variant={variant}
        color={resolveMuiColor(color)}
        disabled={disabled || loading}
        startIcon={resolvedStartIcon}
        endIcon={resolvedEndIcon}
        sx={[
          (theme) => ({
            position: "relative",
            whiteSpace: "nowrap",
            transition: theme.transitions.create(
              ["background-color", "border-color", "color", "box-shadow"],
              { duration: theme.transitions.duration.shorter },
            ),
            "&.Mui-disabled": {
              backgroundColor:
                variant === "contained"
                  ? alpha(theme.palette.action.disabled, 0.12)
                  : undefined,
              color: theme.palette.text.disabled,
              borderColor:
                variant === "outlined" ? theme.palette.divider : undefined,
            },
            ...getButtonColorStyles(theme, colorConfig),
          }),
          buildLoadingSx(loading, loadingPosition),
          ...normalizedSx,
        ]}
        {...muiProps}
      >
        {loading && loadingPosition === "center" && (
          <CircularProgress
            size={18}
            color="inherit"
            {...spinnerProps}
            sx={[
              {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              },
              ...(Array.isArray(spinnerProps?.sx)
                ? spinnerProps.sx
                : spinnerProps?.sx
                  ? [spinnerProps.sx]
                  : []),
            ]}
          />
        )}

        <span
          className="app-button__content"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {loading && loadingText ? loadingText : children}
        </span>
      </Button>
    );
  },
);

// AppButton.displayName = "Button";

export { AppButton as Button };
