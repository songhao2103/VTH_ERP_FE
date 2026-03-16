import * as React from "react";
import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "./FormContext";
import { cn, getErrorMessage } from "../form.utils";

type ArrayFieldApi<TItem> = ReturnType<typeof useFieldContext<TItem[]>> & {
  pushValue: (value: TItem) => void;
  removeValue: (index: number) => void;
  moveValue: (fromIndex: number, toIndex: number) => void;
  swapValues: (indexA: number, indexB: number) => void;
};

export type FieldArrayRenderItemArgs<TItem> = {
  index: number;
  value: TItem;
  total: number;
  remove: () => void;
  moveUp: () => void;
  moveDown: () => void;
  swapWithPrev: () => void;
  swapWithNext: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
};

export type FieldArrayProps<TItem> = {
  label?: string;
  description?: string;
  emptyMessage?: string;
  addLabel?: string;
  createItem: () => TItem;
  getItemKey?: (item: TItem, index: number) => React.Key;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  children: (args: FieldArrayRenderItemArgs<TItem>) => React.ReactNode;
};

export function FieldArray<TItem>({
  label,
  description,
  emptyMessage = "No items yet.",
  addLabel = "Add item",
  createItem,
  getItemKey,
  className,
  listClassName,
  itemClassName,
  children,
}: FieldArrayProps<TItem>): React.JSX.Element {
  const field = useFieldContext<TItem[]>() as ArrayFieldApi<TItem>;

  const items = useStore(field.store, (state) =>
    Array.isArray(state.value) ? state.value : [],
  ) as TItem[];

  const touched = useStore(field.store, (state) => state.meta.isTouched);
  const errors = useStore(field.store, (state) => state.meta.errors);
  const error = touched ? getErrorMessage(errors[0]) : null;

  return (
    <div className={cn("mb-4", className)}>
      {label ? (
        <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>
      ) : null}

      {description ? (
        <p className="mb-3 text-sm text-gray-500">{description}</p>
      ) : null}

      <div className={cn("flex flex-col gap-3", listClassName)}>
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">{emptyMessage}</p>
        ) : (
          items.map((item, index) => {
            const total = items.length;
            const canMoveUp = index > 0;
            const canMoveDown = index < total - 1;

            return (
              <div
                key={getItemKey ? getItemKey(item, index) : index}
                className={cn("rounded-md border p-3", itemClassName)}
              >
                {children({
                  index,
                  value: item,
                  total,
                  remove: () => field.removeValue(index),
                  moveUp: () => {
                    if (canMoveUp) field.moveValue(index, index - 1);
                  },
                  moveDown: () => {
                    if (canMoveDown) field.moveValue(index, index + 1);
                  },
                  swapWithPrev: () => {
                    if (canMoveUp) field.swapValues(index, index - 1);
                  },
                  swapWithNext: () => {
                    if (canMoveDown) field.swapValues(index, index + 1);
                  },
                  canMoveUp,
                  canMoveDown,
                })}
              </div>
            );
          })
        )}
      </div>

      <button
        type="button"
        onClick={() => field.pushValue(createItem())}
        className="mt-3 inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50"
      >
        {addLabel}
      </button>

      {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
