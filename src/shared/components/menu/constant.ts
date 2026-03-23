import type { IMenuContext } from "@/shared/components/menu/type";
import { createContext, useContext } from "react";

export const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("MenuContext chưa được khởi tạo");
  }
  return context;
};
