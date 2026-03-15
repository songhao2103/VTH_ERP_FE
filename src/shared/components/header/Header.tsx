import ToggleTheme from "@/shared/components/header/toggle-theme/ToggleTheme";
import UserMenu from "@/shared/components/header/user-menu/UserMenu";
import { menuConfig } from "@/shared/components/menu/constant";
import Menu from "@/shared/components/menu/Menu";

const Header = () => {
  return (
    <div className="w-full bg-gray-200 flex justify-between lg:justify-end px-2 lg:px-4 py-2">
      <div className="lg:hidden">
        <Menu menus={menuConfig} />
      </div>
      <div className="flex items-center gap-x-4">
        <ToggleTheme /> <UserMenu />
      </div>
    </div>
  );
};

export default Header;
