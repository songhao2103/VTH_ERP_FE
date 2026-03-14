import Sidebar from "@/shared/components/sizebar/SideBar";
import type { LayoutProps } from "./type";

const PrivateLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default PrivateLayout;
