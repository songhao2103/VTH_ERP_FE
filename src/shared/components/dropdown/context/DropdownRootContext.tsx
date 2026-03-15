import { createContext, useContext } from "react";
import type { DropdownRootContextValue } from "../types/dropdown.types";

export const DropdownRootContext =
  createContext<DropdownRootContextValue | null>(null);

export const useDropdownRootContext = () => {
  const context = useContext(DropdownRootContext);

  if (!context) {
    throw new Error("useDropdownRootContext must be used inside <Dropdown>.");
  }

  return context;
};
