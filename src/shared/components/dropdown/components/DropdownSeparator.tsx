import React from "react";
import { cx } from "../utils/eventGuards";
import type { DropdownSeparatorProps } from "../types/dropdown.types";

export const DropdownSeparator: React.FC<DropdownSeparatorProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      role="separator"
      className={cx("my-1 h-px bg-white/10", className)}
      {...props}
    />
  );
};
