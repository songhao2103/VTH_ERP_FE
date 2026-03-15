import { useState } from "react";
import SidebarHeader from "./SizebarHeader";
import clsx from "clsx";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={clsx(
        "hidden h-screen shrink-0 border-r border-zinc-800 transition-all bg-black text-white lg:block",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <SidebarHeader collapsed={collapsed} onToggle={handleToggle} />
      <SidebarContent collapsed={collapsed} />
    </aside>
  );
};
export default Sidebar;
