import { useMenuContext } from "@/components/menu/constant";
import MenuItem from "@/components/menu/MenuItem";
import type { IMenuNodeProps } from "@/components/menu/type";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const MenuNode: React.FC<IMenuNodeProps> = ({ level, item }) => {
  const { isOpenAccordion } = useMenuContext();

  const hasChildren = !!item.children?.length;
  const isOpen = hasChildren && isOpenAccordion(item.rootPath || "");

  return (
    <div>
      <MenuItem
        item={item}
        level={level}
        hasChildren={hasChildren}
        isOpen={isOpen}
      />

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="children"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="ml-4 overflow-hidden border-l"
          >
            <div className="py-1">
              {item.children?.map((child) => (
                <MenuNode
                  key={child.path || child.rootPath}
                  item={child}
                  level={level + 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuNode;
