import * as React from "react";
import { getHelperTextClasses } from "./input.styles";
import clsx from "clsx";

type InputHelperTextProps = {
  id?: string;
  text?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  showHelperText?: boolean;
};

export const InputHelperText = React.memo(function InputHelperText({
  id,
  text,
  disabled,
  error,
  className,
  showHelperText,
}: InputHelperTextProps) {
  if (!text || !showHelperText) return null;

  return (
    <p
      id={id}
      className={clsx(getHelperTextClasses({ disabled, error }), className)}
    >
      {text}
    </p>
  );
});
