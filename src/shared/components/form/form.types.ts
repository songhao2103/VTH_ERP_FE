import type { AnyFieldApi, DeepKeys, DeepValue } from "@tanstack/react-form";

export type FormValues = Record<string, unknown>;

export type FormFieldName<TValues extends FormValues> = DeepKeys<TValues>;

export type FormFieldValue<
  TValues extends FormValues,
  TName extends FormFieldName<TValues>,
> = DeepValue<TValues, TName>;

export type BaseInputType = "text" | "email" | "password";

export type AppFieldApi = AnyFieldApi;

export type FormSubmitHandler<TValues extends FormValues> = (
  values: TValues,
) => void | Promise<void>;

export type FieldValidateResult = string | undefined | null;
export type FieldAsyncValidateResult = Promise<FieldValidateResult>;

export interface FieldValidationContext<
  TValues extends FormValues,
  TName extends FormFieldName<TValues>,
> {
  value: FormFieldValue<TValues, TName>;
  field: AppFieldApi;
}

export interface FormFieldValidators<
  TValues extends FormValues,
  TName extends FormFieldName<TValues>,
> {
  onChange?: (
    context: FieldValidationContext<TValues, TName>,
  ) => FieldValidateResult;
  onBlur?: (
    context: FieldValidationContext<TValues, TName>,
  ) => FieldValidateResult;
  onSubmit?: (
    context: FieldValidationContext<TValues, TName>,
  ) => FieldValidateResult;

  onChangeAsync?: (
    context: FieldValidationContext<TValues, TName>,
  ) => FieldAsyncValidateResult;
  onBlurAsync?: (
    context: FieldValidationContext<TValues, TName>,
  ) => FieldAsyncValidateResult;
  onSubmitAsync?: (
    context: FieldValidationContext<TValues, TName>,
  ) => FieldAsyncValidateResult;

  onChangeAsyncDebounceMs?: number;
  onBlurAsyncDebounceMs?: number;
  onSubmitAsyncDebounceMs?: number;
}

export interface FormFieldListeners<
  TValues extends FormValues,
  TName extends FormFieldName<TValues>,
> {
  onChange?: (context: FieldValidationContext<TValues, TName>) => void;
  onBlur?: (context: FieldValidationContext<TValues, TName>) => void;
  onMount?: (context: FieldValidationContext<TValues, TName>) => void;
}
