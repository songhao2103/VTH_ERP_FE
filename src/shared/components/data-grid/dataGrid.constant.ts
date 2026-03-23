export const DATA_GRID_SELECTION_COLUMN_ID = "__dg_selection__";

export const DATA_GRID_DEFAULTS = {
  selectable: false,
  multiSelect: true,
  stickyFirstColumn: false,
  selectionColumnWidth: 48,
  loading: false,
  height: 700,
  overscan: 8,
  estimatedRowHeight: 44,
  dynamicRowHeight: false,
  stickyHeader: true,
  stickyFooter: true,
  zebraRows: false,
  columnResizeMode: "onChange" as const,
};
