import React from "react";
import { useDropdown } from "../hooks/useDropdown";
import { cx } from "../utils/eventGuards";
import type { DropdownItemProps } from "../types/dropdown.types";

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(function DropdownItem(
  {
    className,
    inset = false,
    closeOnSelect = true,
    disabled,
    onClick,
    type = "button",
    ...props
  },
  ref,
) {
  const { closeDropdown } = useDropdown();

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      role="menuitem"
      disabled={disabled}
      className={cx(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
        "hover:bg-white/10 focus:bg-white/10 focus:outline-none",
        disabled && "cursor-not-allowed opacity-50",
        inset && "pl-8",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || disabled) return;
        if (closeOnSelect) {
          closeDropdown();
        }
      }}
    />
  );
});
