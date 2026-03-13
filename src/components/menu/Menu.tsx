import Sidebar from "@/components/menu/MenuSidebar";
import type { IMenuProps } from "@/components/menu/type";
import React from "react";

const Menu: React.FC<IMenuProps> = (props) => {
  return <Sidebar {...props} />;
};

export default Menu;
