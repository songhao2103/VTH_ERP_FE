import { flexRender, type ColumnSizingState } from "@tanstack/react-table";
import { getPinnedStyles } from "../utils/pinning";
import { cn } from "../utils/cn";
import { resolveHeaderClassName } from "../utils/meta";
import { useDataGridTable } from "@/shared/components/data-grid/contexts/DataGridTableContext";

export function DataGridHeader<TData>({
  columnSizing,
}: {
  columnSizing?: ColumnSizingState;
}) {
  const table = useDataGridTable<TData>();

  return (
    <div
      role="rowgroup"
      className="sticky top-0 z-30 border-b border-neutral-200 bg-neutral-50/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/95"
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <div key={headerGroup.id} role="row" className="flex min-w-full">
          {headerGroup.headers.map((header) => {
            // const canSort = header.column.getCanSort();
            const canSort = header.column.getCanSort();
            const sorted = header.column.getIsSorted();

            return (
              <div
                key={header.id}
                role="columnheader"
                className={cn(
                  "dg-th relative flex h-11 items-center border-r border-neutral-200 px-3 dark:border-neutral-800",
                  header.column.getIsPinned() &&
                    "bg-neutral-50/95 dark:bg-neutral-900/95",
                  resolveHeaderClassName(header, table),
                )}
                style={getPinnedStyles(header.column, "header", columnSizing)}
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={cn(
                      "flex w-full items-center gap-2 truncate",
                      canSort && "cursor-pointer select-none",
                    )}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="truncate font-medium">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>

                    {canSort && (
                      <span className="text-xs text-neutral-400">
                        {sorted === "asc" ? "▲" : sorted === "desc" ? "▼" : "↕"}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
