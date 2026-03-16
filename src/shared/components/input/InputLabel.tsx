import * as React from "react";
import { getLabelClasses } from "./input.styles";
import clsx from "clsx";

type InputLabelProps = {
  htmlFor?: string;
  label?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
};

export const InputLabel = React.memo(function InputLabel({
  htmlFor,
  label,
  required,
  disabled,
  error,
  className,
}: InputLabelProps) {
  if (!label) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={clsx(getLabelClasses({ disabled, error }), className)}
    >
      <span>{label}</span>
      {required ? (
        <span
          aria-hidden="true"
          className={clsx("text-red-500 dark:text-red-400")}
        >
          *
        </span>
      ) : null}
    </label>
  );
});
