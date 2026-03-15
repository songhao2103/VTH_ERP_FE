import { useMenuContext } from "@/shared/components/menu/constant";
import {
  getCollapsedRootItems,
  getItemKey,
  hasChildren,
  isItemActive,
} from "@/shared/components/menu/util";
import MenuIcon from "@/shared/components/menu/MenuIcon";
import type {
  ICollapsedMenuProps,
  IMenuItemConfig,
} from "@/shared/components/menu/type";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { useMemo, useRef, useState } from "react";
import FlyoutMenu from "@/shared/components/menu/MenuFlyout";
import { Link } from "@tanstack/react-router";

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

const CollapsedMenuRootItem: React.FC<{
  item: IMenuItemConfig;
  itemKey: string;
  hoveredKey: string | null;
  setHoveredKey: (key: string | null) => void;
}> = ({ item, itemKey, hoveredKey, setHoveredKey }) => {
  const children = hasChildren(item);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={anchorRef}
      className="relative"
      onMouseEnter={() => setHoveredKey(itemKey)}
    >
      <CollapsedMenuItem item={item} onHover={() => setHoveredKey(itemKey)} />

      <AnimatePresence initial={false}>
        {children && hoveredKey === itemKey && item.children && (
          <FlyoutMenu items={item.children} anchorRef={anchorRef} />
        )}
      </AnimatePresence>
    </div>
  );
};

const CollapsedMenu: React.FC<ICollapsedMenuProps> = ({ items }) => {
  const { isAdmin } = useMenuContext();

  const visibleItems = useMemo(
    () => getCollapsedRootItems(items, isAdmin),
    [isAdmin, items],
  );

  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div
      className="relative flex h-full flex-col gap-2"
      onMouseLeave={() => setHoveredKey(null)}
    >
      {visibleItems.map((item, index) => {
        const currentKey = getItemKey(item, index);

        return (
          <CollapsedMenuRootItem
            key={currentKey}
            item={item}
            itemKey={currentKey}
            hoveredKey={hoveredKey}
            setHoveredKey={setHoveredKey}
          />
        );
      })}
    </div>
  );
};

export default CollapsedMenu;
