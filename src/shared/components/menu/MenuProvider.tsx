import { MenuContext } from "@/shared/components/menu/constant";
import { collectOpenKeysByPath } from "@/shared/components/menu/util";
import type {
  IMenuContext,
  IMenuProviderProps,
} from "@/shared/components/menu/type";
import { useCallback, useEffect, useMemo, useState } from "react";

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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
