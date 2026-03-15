import clsx from "clsx";
import type { LayoutProps } from "./type";
import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { initTheme } from "@/shared/utils/theme";

const MainLayout: React.FC<LayoutProps> = ({ className }) => {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className={clsx("bg-gray-100 text-gray-900 text-body-md", className)}>
      <Outlet />
    </div>
  );
};

export default MainLayout;
