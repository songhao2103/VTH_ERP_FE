import type { IMenuProps } from "@/shared/components/menu/type";
import React from "react";
import CollapsedMenu from "./MenuCollapsed";
import MenuInner from "./MenuInner";
import MobileMenu from "./MenuMobile";
import MenuProvider from "./MenuProvider";

const Menu: React.FC<IMenuProps> = ({ menus, collapsed, isAdmin }) => {
  return (
    <>
      <div className="lg:hidden">
        <MenuProvider items={menus} isCollapsed={false} isAdmin={isAdmin}>
          <MobileMenu items={menus} />
        </MenuProvider>
      </div>

      <div className="h-full overflow-y-auto p-3">
        <MenuProvider items={menus} isCollapsed={collapsed} isAdmin={isAdmin}>
          {collapsed ? (
            <CollapsedMenu items={menus} />
          ) : (
            <MenuInner items={menus} theme="dark" />
          )}
        </MenuProvider>
      </div>
    </>
  );
};

export default Menu;
