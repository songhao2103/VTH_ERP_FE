import clsx from "clsx";
import type { LayoutProps } from "./type";

const MainLayout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={clsx("bg-gray-100 text-gray-900 text-body-md", className)}>
      {children}
    </div>
  );
};

export default MainLayout;
