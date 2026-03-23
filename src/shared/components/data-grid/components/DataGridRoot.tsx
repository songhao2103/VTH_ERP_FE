import * as React from "react";
import { cn } from "../utils/cn";
import { DataGridHeader } from "./DataGridHeader";
import { DataGridBody } from "./DataGridBody";
import { DataGridFooter } from "./DataGridFooter";
import { useDataGridConfig } from "@/shared/components/data-grid/contexts/DataGridConfigContext";
import { useDataGridTable } from "@/shared/components/data-grid/contexts/DataGridTableContext";
import { useContainerWidth } from "../hooks/useContainerWidth";
import { useAutoFitColumnSizing } from "../hooks/useAutoFitColumnSizing";

export function DataGridRoot<TData>({
  className,
  tableClassName,
  height,
  estimatedRowHeight,
  overscan,
  dynamicRowHeight,
  emptyState,
  loadingState,
}: {
  className?: string;
  tableClassName?: string;
  height: number | string;
  estimatedRowHeight: number;
  overscan: number;
  dynamicRowHeight: boolean;
  emptyState?: React.ReactNode;
  loadingState?: React.ReactNode;
}) {
  const table = useDataGridTable<TData>();
  const { loading } = useDataGridConfig<TData>();
  const { ref: scrollRef, width: containerWidth } =
    useContainerWidth<HTMLDivElement>();

  const autoFitSizing = useAutoFitColumnSizing({
    table,
    containerWidth,
    enabled: true,
  });

  const visualTableWidth = React.useMemo(() => {
    const total = Object.values(autoFitSizing).reduce(
      (sum, size) => sum + Number(size || 0),
      0,
    );

    return Math.max(total, containerWidth);
  }, [autoFitSizing, containerWidth]);

  return (
    <div
      className={cn(
        "dg-root relative bg-white w-full min-w-0 max-w-full overflow-auto rounded-xl border border-gray-300 text-sm text-gray-800 shadow-sm",
        "",
        className,
      )}
    >
      <div
        ref={scrollRef}
        className="dg-root relative w-full min-w-0 max-w-full overflow-auto rounded-xl border border-gray-300 bg-white text-sm text-gray-800 shadow-sm"
        style={{ height }}
      >
        <div
          className={cn("dg-table relative min-w-full", tableClassName)}
          style={{ width: visualTableWidth }}
        >
          <div role="table" className="relative min-w-full">
            <DataGridHeader<TData> columnSizing={autoFitSizing} />
            <DataGridBody<TData>
              scrollRef={scrollRef}
              estimatedRowHeight={estimatedRowHeight}
              overscan={overscan}
              dynamicRowHeight={dynamicRowHeight}
              emptyState={emptyState}
              loadingState={loadingState}
              columnSizing={autoFitSizing}
            />
            <DataGridFooter<TData> columnSizing={autoFitSizing} />
          </div>
        </div>
      </div>

      {loading && table.getRowModel().rows.length > 0 && (
        <div className="pointer-events-none absolute inset-0 bg-white/45 dark:bg-neutral-950/35" />
      )}
    </div>
  );
}
