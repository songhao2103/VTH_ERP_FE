import Header from "@/shared/components/header/Header";
import Sidebar from "@/shared/components/sidebar/Sidebar";
import type { LayoutProps } from "./type";

const PrivateLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-dvh w-full overflow-x-hidden overflow-y-auto">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <Header />

        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
