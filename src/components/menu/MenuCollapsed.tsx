import { useMenuContext } from "@/components/menu/constant";
import {
  filterMenuByRole,
  getItemKey,
  hasChildren,
  isItemActive,
} from "@/components/menu/util";
import MenuIcon from "@/components/menu/MenuIcon";
import type {
  ICollapsedMenuProps,
  IMenuItemConfig,
} from "@/components/menu/type";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import FlyoutMenu from "@/components/menu/MenuFlyout";

const CollapsedMenuItem: React.FC<{
  item: IMenuItemConfig;
  onHover: () => void;
}> = ({ item, onHover }) => {
  const { pathname } = useMenuContext();
  const active = isItemActive(item, pathname);
  const children = hasChildren(item);

  const baseClass = clsx(
    "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
    active
      ? "bg-primary/20 text-primary"
      : "text-white hover:bg-secondary/15 hover:text-secondary",
    item.disabled && "cursor-not-allowed opacity-50",
  );

  const content = (
    <MenuIcon
      icon={item.icon}
      fallback={item.title || "M"}
      active={active}
      className="h-10 w-10"
    />
  );

  if (children || item.disabled || !item.path) {
    return (
      <button
        type="button"
        className={baseClass}
        onMouseEnter={onHover}
        title={item.title}
      >
        {content}
      </button>
    );
  }

  if (item.blank) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        onMouseEnter={onHover}
        title={item.title}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={item.path}
      className={baseClass}
      onMouseEnter={onHover}
      title={item.title}
    >
      {content}
    </Link>
  );
};

const CollapsedMenu: React.FC<ICollapsedMenuProps> = ({ items }) => {
  const { isAdmin } = useMenuContext();
  const visibleItems = useMemo(
    () => filterMenuByRole(items, isAdmin),
    [isAdmin, items],
  );

  const [hoveredItem, setHoveredItem] = useState<IMenuItemConfig | null>(null);

  return (
    <div
      className="relative flex h-full flex-col gap-2"
      onMouseLeave={() => setHoveredItem(null)}
    >
      {visibleItems.map((item, index) => {
        if (item.heading) {
          return (
            <div
              key={getItemKey(item, index)}
              className="mx-auto mt-2 h-px w-8 bg-zinc-800"
            />
          );
        }

        if (item.separator) {
          return (
            <div
              key={getItemKey(item, index)}
              className="mx-auto my-1 h-px w-10 bg-zinc-800"
            />
          );
        }

        const currentKey = getItemKey(item, index);
        const hoveredKey = hoveredItem ? getItemKey(hoveredItem) : null;
        const children = hasChildren(item);

        return (
          <div
            key={currentKey}
            className="relative"
            onMouseEnter={() => setHoveredItem(item)}
          >
            <CollapsedMenuItem
              item={item}
              onHover={() => setHoveredItem(item)}
            />

            <AnimatePresence>
              {children && hoveredKey === currentKey && item.children && (
                <FlyoutMenu items={item.children} />
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default CollapsedMenu;
