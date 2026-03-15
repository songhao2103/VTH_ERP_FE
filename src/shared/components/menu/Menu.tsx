import type { IMenuProps } from "@/shared/components/menu/type";
import React from "react";
import CollapsedMenu from "./MenuCollapsed";
import MenuInner from "./MenuInner";
import MobileMenu from "./MenuMobile";
import MenuProvider from "./MenuProvider";

const Menu: React.FC<IMenuProps> = ({ menus = [], collapsed, isAdmin }) => {
  return (
    <>
      <div className="lg:hidden">
        <MenuProvider items={menus} isCollapsed={false} isAdmin={isAdmin}>
          <MobileMenu items={menus} />
        </MenuProvider>
      </div>

      <div className="hidden h-full p-3 lg:block">
        <MenuProvider items={menus} isCollapsed={collapsed} isAdmin={isAdmin}>
          <div className="h-full overflow-y-auto overflow-x-hidden">
            {collapsed ? (
              <CollapsedMenu items={menus} />
            ) : (
              <MenuInner items={menus} theme="dark" />
            )}
          </div>
        </MenuProvider>
      </div>
    </>
  );
};

export default Menu;
