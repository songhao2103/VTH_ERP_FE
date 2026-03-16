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
