import * as React from "react";
import type { RowSelectionState, Updater } from "@tanstack/react-table";

type DataGridSelectionContextValue = {
  selectable: boolean;
  multiSelect: boolean;
  selectedRowIds: RowSelectionState;
  setSelectedRowIds: (updater: Updater<RowSelectionState>) => void;
  toggleRow: (rowId: string, value?: boolean) => void;
  toggleAll: (value?: boolean) => void;
  clearSelection: () => void;
};

const DataGridSelectionContext =
  React.createContext<DataGridSelectionContextValue | null>(null);

export function DataGridSelectionProvider({
  value,
  children,
}: {
  value: DataGridSelectionContextValue;
  children: React.ReactNode;
}) {
  return (
    <DataGridSelectionContext.Provider value={value}>
      {children}
    </DataGridSelectionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDataGridSelection() {
  const context = React.useContext(DataGridSelectionContext);

  if (!context) {
    throw new Error(
      "useDataGridSelection must be used within DataGridSelectionProvider",
    );
  }

  return context;
}
