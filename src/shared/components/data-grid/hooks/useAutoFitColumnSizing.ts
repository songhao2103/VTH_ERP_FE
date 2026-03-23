import * as React from "react";
import type { ColumnSizingState, Table } from "@tanstack/react-table";
import { getColumnLayoutMeta } from "../utils/meta";

type AutoFitOptions<TData> = {
  table: Table<TData>;
  containerWidth: number;
  enabled?: boolean;
};

function clamp(value: number, min?: number, max?: number) {
  let next = value;
  if (typeof min === "number") next = Math.max(next, min);
  if (typeof max === "number") next = Math.min(next, max);
  return next;
}

export function buildAutoFitColumnSizing<TData>({
  table,
  containerWidth,
}: {
  table: Table<TData>;
  containerWidth: number;
}): ColumnSizingState {
  const leafColumns = table.getVisibleLeafColumns();

  if (!leafColumns.length || containerWidth <= 0) {
    return {};
  }

  const specs = leafColumns.map((column) => {
    const meta = getColumnLayoutMeta(column);
    const fallbackSize = column.columnDef.size ?? 160;

    return {
      id: column.id,
      fit: meta.fit,
      grow: meta.grow,
      proportional: meta.proportional,
      basis: meta.basisSize ?? column.columnDef.size ?? fallbackSize,
      min: meta.minSize ?? column.columnDef.minSize ?? 120,
      max: meta.maxSize ?? column.columnDef.maxSize,
    };
  });

  const totalMin = specs.reduce((sum, item) => sum + item.min, 0);
  const allHaveBasis = specs.every((item) => typeof item.basis === "number");
  const allFitColumnsAreProportional = specs
    .filter((item) => item.fit)
    .every((item) => item.proportional || allHaveBasis);

  const nextSizing: ColumnSizingState = {};

  if (containerWidth <= totalMin) {
    specs.forEach((item) => {
      nextSizing[item.id] = clamp(item.basis, item.min, item.max);
    });
    return nextSizing;
  }

  if (allFitColumnsAreProportional) {
    const totalBasis = specs.reduce((sum, item) => sum + item.basis, 0);
    const ratio = containerWidth / totalBasis;

    specs.forEach((item) => {
      nextSizing[item.id] = clamp(item.basis * ratio, item.min, item.max);
    });

    return nextSizing;
  }

  const fixedColumns = specs.filter((item) => !item.fit);
  const flexColumns = specs.filter((item) => item.fit);

  const fixedWidth = fixedColumns.reduce(
    (sum, item) => sum + clamp(item.basis, item.min, item.max),
    0,
  );

  const availableForFlex = Math.max(containerWidth - fixedWidth, 0);

  const flexBaseWidth = flexColumns.reduce((sum, item) => sum + item.min, 0);

  if (availableForFlex <= flexBaseWidth) {
    fixedColumns.forEach((item) => {
      nextSizing[item.id] = clamp(item.basis, item.min, item.max);
    });

    flexColumns.forEach((item) => {
      nextSizing[item.id] = item.min;
    });

    return nextSizing;
  }

  const extra = availableForFlex - flexBaseWidth;
  const totalGrow = flexColumns.reduce((sum, item) => sum + item.grow, 0) || 1;

  fixedColumns.forEach((item) => {
    nextSizing[item.id] = clamp(item.basis, item.min, item.max);
  });

  flexColumns.forEach((item) => {
    const growWidth = (extra * item.grow) / totalGrow;
    nextSizing[item.id] = clamp(item.min + growWidth, item.min, item.max);
  });

  return nextSizing;
}

export function useAutoFitColumnSizing<TData>({
  table,
  containerWidth,
  enabled = true,
}: AutoFitOptions<TData>) {
  return React.useMemo(() => {
    if (!enabled) return {};
    return buildAutoFitColumnSizing({
      table,
      containerWidth,
    });
  }, [containerWidth, enabled, table]);
}
