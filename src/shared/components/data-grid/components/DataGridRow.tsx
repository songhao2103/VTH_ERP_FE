import type { ColumnSizingState, Row } from "@tanstack/react-table";
import type { VirtualItem } from "@tanstack/react-virtual";
import { useDataGridConfig } from "../contexts/DataGridConfigContext";
import { cn } from "../utils/cn";
import { DataGridCell } from "./DataGridCell";

export function DataGridRow<TData>({
  row,
  selected,
  virtualRow,
  dynamicRowHeight,
  measureElement,
  columnSizing,
}: {
  row: Row<TData>;
  selected: boolean;
  virtualRow: VirtualItem;
  dynamicRowHeight: boolean;
  measureElement?: (element: HTMLElement) => void;
  columnSizing?: ColumnSizingState;
}) {
  const {
    zebraRows,
    rowClassName,
    getRowClassName,
    onRowClick,
    onRowDoubleClick,
    onRowContextMenu,
  } = useDataGridConfig<TData>();

  const isOdd = virtualRow.index % 2 === 1;

  const rowToneClass = selected
    ? "bg-primary-100"
    : zebraRows && isOdd
      ? "bg-gray-100"
      : "bg-gray-200";

  return (
    <div
      role="row"
      ref={
        dynamicRowHeight
          ? (node) => {
              if (node) {
                measureElement?.(node);
              }
            }
          : undefined
      }
      className={cn(
        "group absolute left-0 flex w-full border-b border-gray-100 transition-colors",
        onRowClick && "cursor-pointer",
        rowClassName,
        getRowClassName?.(row.original, row.index, selected),
      )}
      style={{
        transform: `translateY(${virtualRow.start}px)`,
        height: dynamicRowHeight ? undefined : virtualRow.size,
      }}
      onClick={() => onRowClick?.(row.original, row.index)}
      onDoubleClick={() => onRowDoubleClick?.(row.original, row.index)}
      onContextMenu={(event) => {
        if (!onRowContextMenu) return;
        event.preventDefault();
        onRowContextMenu(row.original, row.index, event);
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <DataGridCell
          key={cell.id}
          cell={cell}
          rowToneClass={rowToneClass}
          columnSizing={columnSizing}
        />
      ))}
    </div>
  );
}
