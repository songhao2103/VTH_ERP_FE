import type { IMenuItemConfig } from "@/shared/components/menu/type";

export const hasChildren = (item: IMenuItemConfig) =>
  Boolean(item.children && item.children.length > 0);

export const isStructuralMenuItem = (item: IMenuItemConfig) =>
  Boolean(item.heading || item.separator);

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

const hasRenderableNextItem = (
  items: IMenuItemConfig[],
  startIndex: number,
) => {
  return items
    .slice(startIndex + 1)
    .some((item) => !isStructuralMenuItem(item));
};

const normalizeMenuStructure = (items: IMenuItemConfig[]) => {
  const result: IMenuItemConfig[] = [];

  items.forEach((item, index) => {
    const prev = result[result.length - 1];

    if (item.separator) {
      if (!result.length || prev?.separator || prev?.heading) return;
      if (!hasRenderableNextItem(items, index)) return;

      result.push(item);
      return;
    }

    if (item.heading) {
      if (prev?.heading) return;
      if (!hasRenderableNextItem(items, index)) return;

      result.push(item);
      return;
    }

    result.push(item);
  });

  while (result.length && result[result.length - 1]?.separator) {
    result.pop();
  }

  return result;
};

export const filterMenuByRole = (
  items: IMenuItemConfig[],
  isAdmin: boolean,
): IMenuItemConfig[] => {
  const filtered = items.reduce<IMenuItemConfig[]>((acc, item) => {
    if (item.isOnlyForAdmin && !isAdmin) {
      return acc;
    }

    const children = item.children
      ? filterMenuByRole(item.children, isAdmin)
      : undefined;

    const nextItem: IMenuItemConfig = {
      ...item,
      children: children?.length ? children : undefined,
    };

    const canRender =
      nextItem.heading ||
      nextItem.separator ||
      nextItem.path ||
      nextItem.disabled ||
      hasChildren(nextItem);

    if (!canRender) {
      return acc;
    }

    acc.push(nextItem);
    return acc;
  }, []);

  return normalizeMenuStructure(filtered);
};

export const getCollapsedRootItems = (
  items: IMenuItemConfig[],
  isAdmin: boolean,
) => {
  return filterMenuByRole(items, isAdmin).filter(
    (item) => !isStructuralMenuItem(item),
  );
};
