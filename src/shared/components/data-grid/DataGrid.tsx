import * as React from "react";
import type {
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useControllableState } from "./hooks/useControllableState";
import { useDataGridSelection } from "./hooks/useDataGridSelection";
import { useDataGridColumns } from "./hooks/useDataGridColumns";
import { useDataGridTable } from "./hooks/useDataGridTable";
import type {
  DataGridHandle,
  DataGridProps,
} from "@/shared/components/data-grid/dataGrid.types";
import { DATA_GRID_DEFAULTS } from "@/shared/components/data-grid/dataGrid.constant";
import { DataGridConfigProvider } from "@/shared/components/data-grid/contexts/DataGridConfigContext";
import { DataGridSelectionProvider } from "@/shared/components/data-grid/contexts/DataGridSelectionContext";
import { DataGridTableProvider } from "@/shared/components/data-grid/contexts/DataGridTableContext";
import { DataGridRoot } from "@/shared/components/data-grid/components/DataGridRoot";

function DataGridInner<TData>(
  props: DataGridProps<TData>,
  ref: React.ForwardedRef<DataGridHandle>,
) {
  const selectable = props.selectable ?? DATA_GRID_DEFAULTS.selectable;
  const multiSelect = props.multiSelect ?? DATA_GRID_DEFAULTS.multiSelect;
  const selectionColumnWidth =
    props.selectionColumnWidth ?? DATA_GRID_DEFAULTS.selectionColumnWidth;

  const [sortingState, setSortingState] = useControllableState<SortingState>({
    value: props.sorting,
    defaultValue: props.defaultSorting ?? [],
    onChange: props.onSortingChange,
  });

  const [columnVisibilityState, setColumnVisibilityState] =
    useControllableState<VisibilityState>({
      value: props.columnVisibility,
      defaultValue: props.defaultColumnVisibility ?? {},
      onChange: props.onColumnVisibilityChange,
    });

  const [columnOrderState, setColumnOrderState] =
    useControllableState<ColumnOrderState>({
      value: props.columnOrder,
      defaultValue: props.defaultColumnOrder ?? [],
      onChange: props.onColumnOrderChange,
    });

  const [columnPinningState, setColumnPinningState] =
    useControllableState<ColumnPinningState>({
      value: props.columnPinning,
      defaultValue: props.defaultColumnPinning ?? {},
      onChange: props.onColumnPinningChange,
    });

  const [columnSizingState, setColumnSizingState] =
    useControllableState<ColumnSizingState>({
      value: props.columnSizing,
      defaultValue: props.defaultColumnSizing ?? {},
      onChange: props.onColumnSizingChange,
    });

  const selection = useDataGridSelection({
    multiSelect,
    selectedRowIds: props.selectedRowIds,
    defaultSelectedRowIds: props.defaultSelectedRowIds,
    onSelectedRowIdsChange: props.onSelectedRowIdsChange,
  });

  const resolvedColumns = useDataGridColumns({
    columns: props.columns,
    selectable,
    multiSelect,
    selectionColumnWidth,
    rowSelection: selection.rowSelection,
    setSelectedRowIds: selection.setSelectedRowIds,
    toggleRow: selection.toggleRow,
  });

  const table = useDataGridTable({
    props,
    resolvedColumns,
    rowSelection: selection.rowSelection,
    sortingState,
    columnVisibilityState,
    columnOrderState,
    columnPinningState,
    columnSizingState,
    onRowSelectionChange: selection.setSelectedRowIds,
    onSortingChange: setSortingState,
    onColumnVisibilityChange: setColumnVisibilityState,
    onColumnOrderChange: setColumnOrderState,
    onColumnPinningChange: setColumnPinningState,
    onColumnSizingChange: setColumnSizingState,
  });

  const toggleAll = React.useCallback(
    (value?: boolean) => {
      const currentRows = table.getRowModel().rows;
      const rowIds = currentRows.map((row) => row.id);

      if (!multiSelect) {
        if (value === false || rowIds.length === 0) {
          selection.setSelectedRowIds({});
          return;
        }

        selection.setSelectedRowIds({ [rowIds[0]]: true });
        return;
      }

      selection.setSelectedRowIds((prev: RowSelectionState) => {
        const shouldSelect =
          value ?? rowIds.some((currentRowId) => !prev[currentRowId]);

        if (!shouldSelect) {
          const next = { ...prev };
          rowIds.forEach((currentRowId) => {
            delete next[currentRowId];
          });
          return next;
        }

        const next = { ...prev };
        rowIds.forEach((currentRowId) => {
          next[currentRowId] = true;
        });
        return next;
      });
    },
    [multiSelect, selection, table],
  );

  const stickyFirstColumnAppliedRef = React.useRef(false);
  const isColumnPinningControlled = props.columnPinning !== undefined;

  React.useEffect(() => {
    if (!props.stickyFirstColumn) return;
    if (isColumnPinningControlled) return;
    if (stickyFirstColumnAppliedRef.current) return;

    const firstLeafColumn = table.getVisibleLeafColumns()[0];
    if (!firstLeafColumn) return;

    setColumnPinningState((prev) => {
      const left = prev.left ?? [];
      if (left.includes(firstLeafColumn.id)) return prev;

      stickyFirstColumnAppliedRef.current = true;

      return {
        ...prev,
        left: [firstLeafColumn.id, ...left],
      };
    });
  }, [
    isColumnPinningControlled,
    props.stickyFirstColumn,
    setColumnPinningState,
    table,
  ]);

  React.useImperativeHandle(
    ref,
    () => ({
      selectedRowIds: selection.rowSelection,
      setSelectedRowIds: selection.setSelectedRowIds,
      toggleRow: selection.toggleRow,
      toggleAll,
      clearSelection: selection.clearSelection,
    }),
    [selection, toggleAll],
  );

  return (
    <DataGridConfigProvider<TData>
      value={{
        loading: props.loading ?? DATA_GRID_DEFAULTS.loading,
        stickyHeader: props.stickyHeader ?? DATA_GRID_DEFAULTS.stickyHeader,
        stickyFooter: props.stickyFooter ?? DATA_GRID_DEFAULTS.stickyFooter,
        zebraRows: props.zebraRows ?? DATA_GRID_DEFAULTS.zebraRows,
        rowClassName: props.rowClassName,
        getRowClassName: props.getRowClassName,
        onRowClick: props.onRowClick,
        onRowDoubleClick: props.onRowDoubleClick,
        onRowContextMenu: props.onRowContextMenu,
      }}
    >
      <DataGridSelectionProvider
        value={{
          selectable,
          multiSelect,
          selectedRowIds: selection.rowSelection,
          setSelectedRowIds: selection.setSelectedRowIds,
          toggleRow: selection.toggleRow,
          toggleAll,
          clearSelection: selection.clearSelection,
        }}
      >
        <DataGridTableProvider table={table}>
          <DataGridRoot<TData>
            className={props.className}
            tableClassName={props.tableClassName}
            height={props.height ?? DATA_GRID_DEFAULTS.height}
            estimatedRowHeight={
              props.estimatedRowHeight ?? DATA_GRID_DEFAULTS.estimatedRowHeight
            }
            overscan={props.overscan ?? DATA_GRID_DEFAULTS.overscan}
            dynamicRowHeight={
              props.dynamicRowHeight ?? DATA_GRID_DEFAULTS.dynamicRowHeight
            }
            emptyState={props.emptyState}
            loadingState={props.loadingState}
          />
        </DataGridTableProvider>
      </DataGridSelectionProvider>
    </DataGridConfigProvider>
  );
}

type DataGridComponent = <TData>(
  props: DataGridProps<TData> & React.RefAttributes<DataGridHandle>,
) => React.ReactElement | null;

export const DataGrid = React.forwardRef(DataGridInner) as DataGridComponent;
