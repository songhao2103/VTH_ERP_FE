import { forwardRef, memo, type ReactNode } from "react";
import {
  BUTTON_ACTION_COLORS,
  BUTTON_ACTION_LABELS,
  BUTTON_DEFAULTS,
} from "./button.constants";
import { BUTTON_ACTION_ICONS } from "./button.icons";
import {
  getButtonClassName,
  getButtonIconClassName,
  getButtonSpinnerClassName,
} from "./button.styles";
import type { ButtonProps } from "./button.types";
import clsx from "clsx";
import SvgIcon from "@/icons/SvgIcon";
import Spinner from "./ButtonLoader";

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      action,
      variant = BUTTON_DEFAULTS.variant,
      size = BUTTON_DEFAULTS.size,
      color,
      showIcon,
      icon,
      iconPosition = BUTTON_DEFAULTS.iconPosition,
      loading = BUTTON_DEFAULTS.loading,
      loadingText,
      fullWidth = BUTTON_DEFAULTS.fullWidth,
      disabled,
      children,
      className,
      type,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const resolvedColor =
      color ?? (action ? BUTTON_ACTION_COLORS[action] : BUTTON_DEFAULTS.color);
    const resolvedType = type ?? (action === "submit" ? "submit" : "button");
    const resolvedLabel =
      children ?? (action ? BUTTON_ACTION_LABELS[action] : null);

    const ActionIcon = action ? (
      <SvgIcon
        icon={BUTTON_ACTION_ICONS[action]}
        className={getButtonIconClassName(size)}
      />
    ) : null;

    const shouldShowIcon = !loading && (showIcon ?? Boolean(action || icon));
    const resolvedIcon = icon ?? (ActionIcon ? ActionIcon : null);

    const isDisabled = disabled || loading;
    const content = loadingText ?? resolvedLabel;

    const computedAriaLabel =
      ariaLabel ??
      (typeof resolvedLabel === "string" ? resolvedLabel : undefined);

    const iconLeft =
      shouldShowIcon && iconPosition === "left" ? resolvedIcon : null;
    const iconRight =
      shouldShowIcon && iconPosition === "right" ? resolvedIcon : null;

    return (
      <button
        ref={ref}
        type={resolvedType}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        aria-label={computedAriaLabel}
        data-loading={loading ? "true" : "false"}
        data-action={action}
        className={getButtonClassName({
          variant,
          size,
          color: resolvedColor,
          fullWidth,
          className,
        })}
        {...rest}
      >
        <span
          className={clsx(
            "inline-flex items-center justify-center",
            loading && "opacity-0",
            fullWidth && "w-full",
          )}
        >
          {iconLeft}
          {content as ReactNode}
          {iconRight}
        </span>

        {loading && (
          <span className="absolute inset-0 inline-flex items-center justify-center">
            <Spinner className={getButtonSpinnerClassName(size)} />
          </span>
        )}
      </button>
    );
  },
);

ButtonBase.displayName = "Button";

export const Button = memo(ButtonBase);
Button.displayName = "Button";
