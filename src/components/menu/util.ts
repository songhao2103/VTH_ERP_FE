import type { IMenuItemConfig } from "@/components/menu/type";

export const hasChildren = (item: IMenuItemConfig) =>
  Boolean(item.children && item.children.length > 0);

export const getItemKey = (item: IMenuItemConfig, index = 0) => {
  return (
    item.rootPath ||
    item.path ||
    item.heading ||
    `${item.title || "menu-item"}-${index}`
  );
};

export const isPathMatched = (pathname: string, target?: string) => {
  if (!target) return false;
  if (pathname === target) return true;
  return pathname.startsWith(`${target}/`);
};

export const isItemActive = (
  item: IMenuItemConfig,
  pathname: string,
): boolean => {
  if (item.rootPath && isPathMatched(pathname, item.rootPath)) return true;
  if (item.path && isPathMatched(pathname, item.path)) return true;

  if (item.children?.length) {
    return item.children.some((child) => isItemActive(child, pathname));
  }

  return false;
};

export const collectOpenKeysByPath = (
  items: IMenuItemConfig[],
  pathname: string,
): string[] => {
  const result = new Set<string>();

  const walk = (nodes: IMenuItemConfig[]) => {
    nodes.forEach((item) => {
      if (!item.children?.length) return;

      const isActiveBranch = item.children.some((child) =>
        isItemActive(child, pathname),
      );

      if (isActiveBranch && item.rootPath) {
        result.add(item.rootPath);
      }

      walk(item.children);
    });
  };

  walk(items);

  return Array.from(result);
};

export const filterMenuByRole = (
  items: IMenuItemConfig[],
  isAdmin: boolean,
): IMenuItemConfig[] => {
  return items
    .filter((item) => !item.isOnlyForAdmin || isAdmin)
    .map((item) => ({
      ...item,
      children: item.children
        ? filterMenuByRole(item.children, isAdmin)
        : undefined,
    }));
};
