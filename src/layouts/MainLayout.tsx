import clsx from "clsx";
import type { LayoutProps } from "./type";
import { Outlet } from "@tanstack/react-router";

const MainLayout: React.FC<LayoutProps> = ({ className }) => {
  return (
    <div className={clsx("bg-gray-100 text-gray-900 text-body-md", className)}>
      <Outlet />
    </div>
  );
};

export default MainLayout;
