import type { ZodType } from "zod";
import type { EventValidatorForm } from "./form.types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getErrorMessage(error: unknown): string | null {
  if (error == null || error === false) return null;

  if (typeof error === "string") return error;
  if (typeof error === "number" || typeof error === "boolean") {
    return String(error);
  }

  if (Array.isArray(error)) {
    for (const item of error) {
      const message = getErrorMessage(item);
      if (message) return message;
    }
    return null;
  }

  if (typeof error === "object" && error && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }

  return "Invalid value";
}

const toTanStackPath = (path: readonly PropertyKey[]) => {
  return path.reduce<string>((acc, segment) => {
    if (typeof segment === "number") {
      return `${acc}[${segment}]`;
    }

    if (typeof segment === "string") {
      return acc ? `${acc}.${segment}` : segment;
    }

    return acc;
  }, "");
};

export const createFormValidator = <T>(
  schema: ZodType<T>,
  events?: EventValidatorForm[],
) => {
  const validate = (value: T) => {
    const result = schema.safeParse(value);

    if (result.success) return undefined;

    const fields: Record<string, string> = {};

    for (const issue of result.error.issues) {
      const path = toTanStackPath(issue.path);

      if (!path) continue;
      if (!fields[path]) {
        fields[path] = issue.message;
      }
    }

    return { fields };
  };

  if (!events || events.length === 0) {
    return {
      onDynamic: ({ value }: { value: T }) => validate(value),
    };
  }

  return {
    ...(events.includes("onChange") && {
      onChange: ({ value }: { value: T }) => validate(value),
    }),
    ...(events.includes("onBlur") && {
      onBlur: ({ value }: { value: T }) => validate(value),
    }),
    ...(events.includes("onSubmit") && {
      onSubmit: ({ value }: { value: T }) => validate(value),
    }),
    ...(events.includes("onDynamic") && {
      onDynamic: ({ value }: { value: T }) => validate(value),
    }),
  };
};
