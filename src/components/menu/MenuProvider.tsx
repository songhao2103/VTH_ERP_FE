import { MenuContext } from "@/components/menu/constant";
import type { IMenuContext, IMenuProviderProps } from "@/components/menu/type";
import { useCallback, useMemo, useState } from "react";

const MenuProvider: React.FC<IMenuProviderProps> = ({ children }) => {
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  const setOpenAccordion = useCallback((path: string) => {
    setOpenAccordions((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }

      return newSet;
    });
  }, []);

  const isOpenAccordion = useCallback(
    (path: string) => openAccordions.has(path),
    [openAccordions],
  );

  const contextValue = useMemo<IMenuContext>(() => {
    return {
      props: {},
      isOpenAccordion: isOpenAccordion,
      setOpenAccordion: setOpenAccordion,
    };
  }, [isOpenAccordion, setOpenAccordion]);
  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};

export default MenuProvider;
