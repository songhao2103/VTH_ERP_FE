import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Row } from "@tanstack/react-table";

export function useDataGridVirtualizer<TData>({
  rows,
  scrollElement,
  overscan,
  estimatedRowHeight,
  dynamicRowHeight,
}: {
  rows: Row<TData>[];
  scrollElement: React.RefObject<HTMLElement | null>;
  overscan: number;
  estimatedRowHeight: number;
  dynamicRowHeight: boolean;
}) {
  return useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollElement.current,
    estimateSize: () => estimatedRowHeight,
    overscan,
    getItemKey: (index) => rows[index]?.id ?? index,
    measureElement: dynamicRowHeight
      ? (element) =>
          element?.getBoundingClientRect().height ?? estimatedRowHeight
      : undefined,
  });
}
