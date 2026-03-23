import * as React from "react";
import type { Table } from "@tanstack/react-table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataGridTableContext = React.createContext<Table<any> | null>(null);

export function DataGridTableProvider<TData>({
  table,
  children,
}: {
  table: Table<TData>;
  children: React.ReactNode;
}) {
  return (
    <DataGridTableContext.Provider value={table}>
      {children}
    </DataGridTableContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDataGridTable<TData>() {
  const context = React.useContext(DataGridTableContext);

  if (!context) {
    throw new Error(
      "useDataGridTable must be used within DataGridTableProvider",
    );
  }

  return context as Table<TData>;
}
