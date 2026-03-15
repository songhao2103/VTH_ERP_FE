import Menu from "../menu/Menu";
import { menuConfig } from "@/shared/components/menu/constant";

interface SidebarContentProps {
  collapsed?: boolean;
}
const SidebarContent: React.FC<SidebarContentProps> = ({ collapsed }) => {
  return (
    <div>
      <Menu menus={menuConfig} collapsed={collapsed} />
    </div>
  );
};
export default SidebarContent;
