import type { Column, ColumnSizingState } from "@tanstack/react-table";

export function getColumnVisualSize<TData>(
  column: Column<TData>,
  columnSizing?: ColumnSizingState,
) {
  return columnSizing?.[column.id] ?? column.getSize();
}

export function getPinnedStyles<TData>(
  column: Column<TData>,
  section: "header" | "body" | "footer",
  columnSizing?: ColumnSizingState,
): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeft = isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRight = isPinned === "right" && column.getIsFirstColumn("right");

  const width = getColumnVisualSize(column, columnSizing);

  const zIndexMap = {
    header: isPinned ? 40 : 20,
    body: isPinned ? 15 : 1,
    footer: isPinned ? 35 : 20,
  } as const;

  return {
    position: isPinned ? "sticky" : "relative",
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    width,
    minWidth: width,
    maxWidth: width,
    zIndex: zIndexMap[section],
    boxShadow: isLastLeft
      ? "-8px 0 8px -8px rgb(0 0 0 / 0.18) inset"
      : isFirstRight
        ? "8px 0 8px -8px rgb(0 0 0 / 0.18) inset"
        : undefined,
  };
}
