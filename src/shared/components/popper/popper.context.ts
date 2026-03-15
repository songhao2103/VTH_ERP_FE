import type { PopperContextValue } from "@/shared/components/popper/popper.type";
import { createContext, useContext } from "react";

const PopperContext = createContext<PopperContextValue | null>(null);

export const PopperContextProvider = PopperContext.Provider;

export const usePopperContext = () => {
  const context = useContext(PopperContext);

  if (!context) {
    throw new Error("Popper components must be used inside <Popper />");
  }

  return context;
};
