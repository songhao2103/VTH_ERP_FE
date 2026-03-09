import type { LayoutProps } from "@/components/layout/type";
import Menu from "@/components/menu/Menu";
import clsx from "clsx";
import type React from "react";

const PrivateLayout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={clsx("", className)}>
      <Menu />
      {children}
    </div>
  );
};

export default PrivateLayout;
