import ToggleTheme from "@/shared/components/header/toggle-theme/ToggleTheme";
import type { LayoutProps } from "./type";

const PublicLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <ToggleTheme />
      </div>
      {children}
    </>
  );
};

export default PublicLayout;
