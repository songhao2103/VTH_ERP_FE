import { MenuContext } from "@/components/menu/constant";
import { collectOpenKeysByPath } from "@/components/menu/util";
import type { IMenuContext, IMenuProviderProps } from "@/components/menu/type";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

const MenuProvider: React.FC<IMenuProviderProps> = ({
  children,
  items,
  isCollapsed = false,
  isAdmin = false,
}) => {
  // const { pathname } = useLocation();
  const pathname = "/";
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());

  const toggleAccordion = useCallback((path: string) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev);

      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }

      return next;
    });
  }, []);

  const openAccordion = useCallback((path: string) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      next.add(path);
      return next;
    });
  }, []);

  const closeAllAccordions = useCallback(() => {
    setOpenAccordions(new Set());
  }, []);

  const isOpenAccordion = useCallback(
    (path: string) => openAccordions.has(path),
    [openAccordions],
  );

  useEffect(() => {
    const activeKeys = collectOpenKeysByPath(items, pathname);

    if (!activeKeys.length) return;

    setOpenAccordions((prev) => {
      const next = new Set(prev);
      activeKeys.forEach((key: any) => next.add(key));
      return next;
    });
  }, [items, pathname]);

  const contextValue = useMemo<IMenuContext>(() => {
    return {
      props: {
        collapsed: isCollapsed,
        isAdmin,
      },
      items,
      pathname,
      isCollapsed,
      isAdmin,
      toggleAccordion,
      openAccordion,
      closeAllAccordions,
      isOpenAccordion,
    };
  }, [
    closeAllAccordions,
    isAdmin,
    isCollapsed,
    isOpenAccordion,
    items,
    openAccordion,
    pathname,
    toggleAccordion,
  ]);

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};

export default MenuProvider;
