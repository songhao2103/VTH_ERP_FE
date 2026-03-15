import { useMenuContext } from "@/shared/components/menu/constant";
import { getItemKey, hasChildren } from "@/shared/components/menu/util";
import MenuItem from "@/shared/components/menu/MenuItem";
import type { IMenuNodeProps } from "@/shared/components/menu/type";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const MenuNode: React.FC<IMenuNodeProps> = ({ level, item, theme }) => {
  const { isOpenAccordion, isCollapsed } = useMenuContext();

  if (item.heading) {
    return (
      <div
        className={clsx(
          "px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em]",
          theme === "dark" ? "text-zinc-400" : "text-zinc-500",
          isCollapsed ? "hidden" : "block",
        )}
      >
        {item.heading}
      </div>
    );
  }

  if (item.separator) {
    return (
      <div
        className={clsx(
          "my-1 border-t",
          theme === "dark" ? "border-zinc-800" : "border-zinc-200",
        )}
      />
    );
  }

  const hasChildNodes = hasChildren(item);
  const isOpen = hasChildNodes && isOpenAccordion(item.rootPath || "");

  return (
    <div>
      <MenuItem
        item={item}
        level={level}
        hasChildren={hasChildNodes}
        isOpen={isOpen}
        theme={theme}
      />

      <AnimatePresence initial={false}>
        {hasChildNodes && isOpen && (
          <motion.div
            key={item.rootPath || item.path}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className={clsx(
                "ml-2 border-l pl-2",
                theme === "dark" ? "border-zinc-800" : "border-zinc-200",
              )}
            >
              {item.children?.map((child, index) => (
                <MenuNode
                  key={getItemKey(child, index)}
                  item={child}
                  level={level + 1}
                  theme={theme}
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
