import * as React from "react";
import {
  getClearButtonClasses,
  getIconClasses,
  getWrapperClasses,
} from "./input.styles";
import type { InputColor, InputSize, InputVariant } from "./input.types";
import clsx from "clsx";

type InputWrapperProps = {
  variant: InputVariant;
  size: InputSize;
  color: InputColor;
  disabled?: boolean;
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clearable?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
  className?: string;
  children: React.ReactNode;
};

function ClearIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
      <path
        d="M6 6L14 14M14 6L6 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const InputWrapper = React.memo(function InputWrapper({
  variant,
  size,
  color,
  disabled,
  error,
  startIcon,
  endIcon,
  clearable,
  showClearButton,
  onClear,
  className,
  children,
}: InputWrapperProps) {
  return (
    <div
      className={clsx(
        getWrapperClasses({
          variant,
          size,
          color,
          disabled,
          error,
          hasStartIcon: !!startIcon,
          hasEndIcon: !!endIcon,
          clearable,
        }),
        className,
      )}
    >
      {startIcon ? (
        <span className={getIconClasses(size, disabled)} aria-hidden="true">
          {startIcon}
        </span>
      ) : null}

      {children}

      {showClearButton ? (
        <button
          type="button"
          tabIndex={disabled ? -1 : 0}
          disabled={disabled}
          onClick={onClear}
          aria-label="Clear input"
          className={getClearButtonClasses(size)}
        >
          <ClearIcon />
        </button>
      ) : null}

      {endIcon ? (
        <span className={getIconClasses(size, disabled)} aria-hidden="true">
          {endIcon}
        </span>
      ) : null}
    </div>
  );
});
