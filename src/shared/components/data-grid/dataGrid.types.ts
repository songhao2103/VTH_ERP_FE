import type {
  ColumnDef,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  Updater,
} from "@tanstack/react-table";

export type RowId = string;
export type RowIdGetter<TData> = (row: TData, index: number) => RowId;

export interface DataGridPaginationConfig {
  mode?: "client" | "server";
  pageIndex: number;
  pageSize: number;
  total?: number;
  pageSizeOptions?: number[];
  onChange: (pageIndex: number, pageSize: number) => void;
}

export interface DataGridHandle {
  selectedRowIds: RowSelectionState;
  setSelectedRowIds: (updater: Updater<RowSelectionState>) => void;
  toggleRow: (rowId: string, value?: boolean) => void;
  toggleAll: (value?: boolean) => void;
  clearSelection: () => void;
}

export interface DataGridProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  rowId: RowIdGetter<TData>;

  selectable?: boolean;
  multiSelect?: boolean;
  stickyFirstColumn?: boolean;
  selectionColumnWidth?: number;

  selectedRowIds?: RowSelectionState;
  defaultSelectedRowIds?: RowSelectionState;
  onSelectedRowIdsChange?: (ids: RowSelectionState) => void;

  sorting?: SortingState;
  defaultSorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  manualSorting?: boolean;

  columnVisibility?: VisibilityState;
  defaultColumnVisibility?: VisibilityState;
  onColumnVisibilityChange?: (state: VisibilityState) => void;

  columnOrder?: ColumnOrderState;
  defaultColumnOrder?: ColumnOrderState;
  onColumnOrderChange?: (state: ColumnOrderState) => void;

  columnPinning?: ColumnPinningState;
  defaultColumnPinning?: ColumnPinningState;
  onColumnPinningChange?: (state: ColumnPinningState) => void;

  columnSizing?: ColumnSizingState;
  defaultColumnSizing?: ColumnSizingState;
  onColumnSizingChange?: (state: ColumnSizingState) => void;

  pagination?: DataGridPaginationConfig;

  loading?: boolean;
  loadingState?: React.ReactNode;
  emptyState?: React.ReactNode;

  height?: number | string;
  overscan?: number;
  estimatedRowHeight?: number;
  dynamicRowHeight?: boolean;

  stickyHeader?: boolean;
  stickyFooter?: boolean;
  zebraRows?: boolean;
  columnResizeMode?: "onChange" | "onEnd";

  className?: string;
  tableClassName?: string;
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
}
