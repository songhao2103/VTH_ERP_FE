import { menuConfig } from "@/components/menu/constant";
import MenuNode from "@/components/menu/MenuNode";

const MenuInner = () => {
  return (
    <div>
      {menuConfig.map((item) => (
        <MenuNode key={item.path || item.rootPath} item={item} level={0} />
      ))}
    </div>
  );
};

export default MenuInner;
