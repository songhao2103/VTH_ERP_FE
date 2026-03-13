import type { IMenuArrowProps } from "@/components/menu/type";
import SvgIcon from "@/icons/SvgIcon";
import clsx from "clsx";
import React from "react";

const MenuArrow: React.FC<IMenuArrowProps> = ({ isOpen, className }) => {
  return (
    <div
      className={clsx(
        "shrink-0 transition-transform duration-200",
        {
          "rotate-0": !isOpen,
          "rotate-180": isOpen,
        },
        className,
      )}
    >
      <SvgIcon icon="chevronDown" />
    </div>
  );
};

export default MenuArrow;
