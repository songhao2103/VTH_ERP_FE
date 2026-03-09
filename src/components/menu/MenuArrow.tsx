import type { IMenuArrowProps } from "@/components/menu/type";
import SvgIcon from "@/icons/SvgIcon";
import clsx from "clsx";
import React from "react";

const MenuArrow: React.FC<IMenuArrowProps> = ({ isOpen }) => {
  return (
    <div
      className={clsx("transition-transform", {
        "rotate-0": !isOpen,
        "rotate-180": isOpen,
      })}
    >
      <SvgIcon icon="chevronDown" />
    </div>
  );
};

export default MenuArrow;
