import { useStore } from "@tanstack/react-form";
import { useFieldContext } from "./components/FormContext";
import { useFormItemContext } from "./components/FormItem";
import { getErrorMessage } from "./form.utils";

export type UseFormFieldReturn<TValue = unknown> = {
  name: string;
  value: TValue;
  error: string | null;
  touched: boolean;
  dirty: boolean;
  invalid: boolean;
  formItemId: string;
  descriptionId: string;
  messageId: string;
};

export function useFormField<TValue = unknown>(): UseFormFieldReturn<TValue> {
  const field = useFieldContext<TValue>();
  const { id } = useFormItemContext();

  const value = useStore(field.store, (state) => state.value) as TValue;
  const touched = useStore(field.store, (state) => state.meta.isTouched);
  const dirty = useStore(field.store, (state) => state.meta.isDirty);
  const errors = useStore(field.store, (state) => state.meta.errors);

  const error = getErrorMessage(errors[0]);
  const invalid = Boolean(touched && error);

  return {
    name: String(field.name),
    value,
    error,
    touched,
    dirty,
    invalid,
    formItemId: `${id}-form-item`,
    descriptionId: `${id}-form-item-description`,
    messageId: `${id}-form-item-message`,
  };
}
