import {
  flexRender,
  type Cell,
  type ColumnSizingState,
} from "@tanstack/react-table";
import { getPinnedStyles } from "../utils/pinning";
import { cn } from "../utils/cn";
import { useDataGridTable } from "../contexts/DataGridTableContext";
import { resolveCellClassName } from "../utils/meta";

export function DataGridCell<TData>({
  cell,
  rowToneClass,
  columnSizing,
}: {
  cell: Cell<TData, unknown>;
  rowToneClass: string;
  columnSizing?: ColumnSizingState;
}) {
  const table = useDataGridTable<TData>();

  return (
    <div
      role="cell"
      className={cn(
        "dg-td flex items-center border-r border-gray-300 px-3 py-2 ",
        "group-hover:bg-gray-300",
        rowToneClass,
        resolveCellClassName(cell, table),
      )}
      style={getPinnedStyles(cell.column, "body", columnSizing)}
    >
      <div className="min-w-0 flex-1 truncate">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </div>
    </div>
  );
}
