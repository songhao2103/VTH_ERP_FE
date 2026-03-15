import Header from "@/shared/components/header/Header";
import Sidebar from "@/shared/components/sidebar/Sidebar";
import type { LayoutProps } from "./type";

const PrivateLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
