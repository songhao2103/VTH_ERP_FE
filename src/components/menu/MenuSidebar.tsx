import { menuConfig } from "@/components/menu/constant";
import CollapsedMenu from "@/components/menu/MenuCollapsed";
import MenuInner from "@/components/menu/MenuInner";
import MobileMenu from "@/components/menu/MenuMobile";
import MenuProvider from "@/components/menu/MenuProvider";
import type { IMenuProps } from "@/components/menu/type";
import clsx from "clsx";
import React from "react";

const Sidebar: React.FC<IMenuProps> = ({
  collapsed = false,
  isAdmin = false,
  className,
}) => {
  return (
    <>
      <div className="lg:hidden">
        <MenuProvider items={menuConfig} isCollapsed={false} isAdmin={isAdmin}>
          <MobileMenu items={menuConfig} />
        </MenuProvider>
      </div>

      <aside
        className={clsx(
          "hidden h-screen shrink-0 border-r border-zinc-800 bg-black text-white lg:block",
          collapsed ? "w-20" : "w-72",
          className,
        )}
      >
        <div className="h-full overflow-y-auto p-3">
          <MenuProvider
            items={menuConfig}
            isCollapsed={collapsed}
            isAdmin={isAdmin}
          >
            {collapsed ? (
              <CollapsedMenu items={menuConfig} />
            ) : (
              <MenuInner items={menuConfig} theme="dark" />
            )}
          </MenuProvider>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
