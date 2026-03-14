import { useMenuContext } from "@/shared/components/menu/constant";
import { filterMenuByRole, getItemKey } from "@/shared/components/menu/util";
import MenuNode from "@/shared/components/menu/MenuNode";
import type { IMenuInnerProps } from "@/shared/components/menu/type";

const MenuInner: React.FC<IMenuInnerProps> = ({ items, theme = "dark" }) => {
  const { items: contextItems, isAdmin } = useMenuContext();
  const finalItems = filterMenuByRole(items || contextItems, isAdmin);

  return (
    <div className="flex flex-col gap-1">
      {finalItems.map((item, index) => (
        <MenuNode
          key={getItemKey(item, index)}
          item={item}
          level={0}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default MenuInner;
