import * as React from "react";
import { useFormField } from "../useFormField";

type ControlLikeProps = {
  id?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  "data-invalid"?: string;
};

export type FormControlProps = {
  children: React.ReactElement<ControlLikeProps>;
  includeDescription?: boolean;
};

export function FormControl({
  children,
  includeDescription = false,
}: FormControlProps): React.ReactElement {
  const { invalid, formItemId, descriptionId, messageId } = useFormField();

  const describedBy =
    [
      children.props["aria-describedby"],
      includeDescription ? descriptionId : undefined,
      invalid ? messageId : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return React.cloneElement(children, {
    id: children.props.id ?? formItemId,
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy,
    "data-invalid": invalid ? "true" : undefined,
  });
}
