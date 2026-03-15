import type {
  DropdownManagerContextValue,
  DropdownRegistration,
} from "@/shared/components/dropdown/types/dropdown.types";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

const DropdownManagerContext =
  createContext<DropdownManagerContextValue | null>(null);

interface DropdownProviderProps {
  children: React.ReactNode;
}

export const DropdownProvider: React.FC<DropdownProviderProps> = ({
  children,
}) => {
  const registrationsRef = useRef<Map<string, DropdownRegistration>>(new Map());
  const openPathRef = useRef<string[]>([]);
  const [openPath, setOpenPath] = useState<string[]>([]);

  const setOpenPathSafe = useCallback((nextPath: string[]) => {
    openPathRef.current = nextPath;
    setOpenPath(nextPath);
  }, []);

  const registerDropdown = useCallback(
    (id: string, registration: DropdownRegistration) => {
      registrationsRef.current.set(id, registration);
    },
    [],
  );

  const unregisterDropdown = useCallback(
    (id: string) => {
      registrationsRef.current.delete(id);

      const current = openPathRef.current;
      const index = current.indexOf(id);

      if (index !== -1) {
        setOpenPathSafe(current.slice(0, index));
      }
    },
    [setOpenPathSafe],
  );

  const buildPath = useCallback((id: string) => {
    const path: string[] = [];
    let cursor: string | null = id;
    let guard = 0;

    while (cursor && guard < 100) {
      path.unshift(cursor);
      cursor = registrationsRef.current.get(cursor)?.parentId ?? null;
      guard += 1;
    }

    return path;
  }, []);

  const notifyCloseIds = useCallback((ids: string[]) => {
    ids.forEach((id) => {
      registrationsRef.current.get(id)?.notifyClose?.();
    });
  }, []);

  const requestOpen = useCallback(
    (id: string) => {
      const nextPath = buildPath(id);
      const currentPath = openPathRef.current;

      const idsToClose = currentPath
        .filter((openId) => !nextPath.includes(openId))
        .reverse();

      setOpenPathSafe(nextPath);
      notifyCloseIds(idsToClose);
    },
    [buildPath, notifyCloseIds, setOpenPathSafe],
  );

  const requestClose = useCallback(
    (id: string) => {
      const currentPath = openPathRef.current;
      const index = currentPath.indexOf(id);

      if (index === -1) return;

      const idsToClose = currentPath.slice(index).reverse();
      const nextPath = currentPath.slice(0, index);

      setOpenPathSafe(nextPath);
      notifyCloseIds(idsToClose);
    },
    [notifyCloseIds, setOpenPathSafe],
  );

  const isOpen = useCallback((id: string) => {
    return openPathRef.current.includes(id);
  }, []);

  const getOpenBranchElements = useCallback((id: string) => {
    const currentPath = openPathRef.current;
    const index = currentPath.indexOf(id);

    if (index === -1) return [];

    const branchIds = currentPath.slice(index);
    const elements: HTMLElement[] = [];

    branchIds.forEach((branchId) => {
      const branchElements =
        registrationsRef.current.get(branchId)?.getElements().filter(Boolean) ??
        [];

      branchElements.forEach((element) => {
        if (element && !elements.includes(element)) {
          elements.push(element);
        }
      });
    });

    return elements;
  }, []);

  const value = useMemo<DropdownManagerContextValue>(() => {
    return {
      activeDropdownId: openPath[openPath.length - 1] ?? null,
      openPath,
      registerDropdown,
      unregisterDropdown,
      requestOpen,
      requestClose,
      isOpen,
      getOpenBranchElements,
    };
  }, [
    getOpenBranchElements,
    isOpen,
    openPath,
    registerDropdown,
    requestClose,
    requestOpen,
    unregisterDropdown,
  ]);

  return (
    <DropdownManagerContext.Provider value={value}>
      {children}
    </DropdownManagerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDropdownManager = () => {
  const context = useContext(DropdownManagerContext);

  if (!context) {
    throw new Error("useDropdownManager must be used inside DropdownProvider.");
  }

  return context;
};
