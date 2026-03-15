import Sidebar from "@/shared/components/sidebar/Sidebar";
import type { LayoutProps } from "./type";
import Header from "@/shared/components/header/Header";

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
