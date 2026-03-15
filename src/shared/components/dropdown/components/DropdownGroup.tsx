import React from "react";
import { cx } from "../utils/eventGuards";
import type { DropdownGroupProps } from "../types/dropdown.types";

export const DropdownGroup: React.FC<DropdownGroupProps> = ({
  className,
  label,
  children,
  ...props
}) => {
  return (
    <div role="group" className={cx("py-1", className)} {...props}>
      {label ? (
        <div className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wide text-white/50">
          {label}
        </div>
      ) : null}
      {children}
    </div>
  );
};
