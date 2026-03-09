import { useMenuContext } from "@/components/menu/constant";
import MenuArrow from "@/components/menu/MenuArrow";
import MenuIcon from "@/components/menu/MenuIcon";
import MenuLabel from "@/components/menu/MenuLabel";
import type { IMenuItemProps } from "@/components/menu/type";
import React from "react";

const MenuItem: React.FC<IMenuItemProps> = ({ item, hasChildren, isOpen }) => {
  const { setOpenAccordion } = useMenuContext();

  const open = () => {
    if (item.rootPath) {
      setOpenAccordion(item.rootPath);
    }
  };

  return (
    <div onClick={open} className="flex items-center">
      <MenuIcon />
      <MenuLabel title={item.title || "default.."} className="" />
      {hasChildren && <MenuArrow isOpen={isOpen} />}
    </div>
  );
};

export default MenuItem;
