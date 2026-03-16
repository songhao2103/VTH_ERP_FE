import { createFormHook } from "@tanstack/react-form";
import { FormMessage } from "./components/FormMessage";
import { FormDescription } from "./components/FormDescription";
import { FormControl } from "./components/FormControl";
import { FormLabel } from "./components/FormLabel";
import { FormItem } from "./components/FormItem";
import { InputBase } from "./components/InputBase";
import { SelectBase } from "./components/SelectBase";
import { TextareaBase } from "./components/TextareaBase";
import { CheckboxBase } from "./components/CheckboxBase";
import { DatePickerBase } from "./components/DatePickerBase";
import { FieldArray } from "./components/FieldArray";
import { AppForm, SubmitButton } from "./components/Form";
import { fieldContext, formContext } from "./components/FormContext";

export const { useAppForm, withForm, withFieldGroup, useTypedAppFormContext } =
  createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
      FormItem,
      FormLabel,
      FormControl,
      FormDescription,
      FormMessage,
      InputBase,
      SelectBase,
      TextareaBase,
      CheckboxBase,
      DatePickerBase,
      FieldArray,
    },
    formComponents: {
      AppForm,
      SubmitButton,
    },
  });
