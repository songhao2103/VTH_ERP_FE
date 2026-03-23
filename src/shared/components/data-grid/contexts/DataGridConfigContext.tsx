import * as React from "react";

type DataGridConfigContextValue<TData> = {
  loading: boolean;
  stickyHeader: boolean;
  stickyFooter: boolean;
  zebraRows: boolean;
  rowClassName?: string;
  getRowClassName?: (
    row: TData,
    rowIndex: number,
    selected: boolean,
  ) => string | undefined;
  onRowClick?: (row: TData, rowIndex: number) => void;
  onRowDoubleClick?: (row: TData, rowIndex: number) => void;
  onRowContextMenu?: (
    row: TData,
    rowIndex: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;
};

const DataGridConfigContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.createContext<DataGridConfigContextValue<any> | null>(null);

export function DataGridConfigProvider<TData>({
  value,
  children,
}: {
  value: DataGridConfigContextValue<TData>;
  children: React.ReactNode;
}) {
  return (
    <DataGridConfigContext.Provider value={value}>
      {children}
    </DataGridConfigContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDataGridConfig<TData>() {
  const context = React.useContext(DataGridConfigContext);

  if (!context) {
    throw new Error(
      "useDataGridConfig must be used within DataGridConfigProvider",
    );
  }

  return context as DataGridConfigContextValue<TData>;
}
