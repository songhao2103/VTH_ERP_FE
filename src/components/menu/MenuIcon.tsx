import type { IMenuIconProps } from "@/components/menu/type";
import SvgIcon from "@/icons/SvgIcon";

const MenuIcon: React.FC<IMenuIconProps> = ({ icon }) => {
  if (!icon) return null;
  return (
    <div>
      <SvgIcon icon={icon} />
    </div>
  );
};

export default MenuIcon;
