export const isNodeWithinElements = (
  node: Node | null,
  elements: Array<HTMLElement | null | undefined>,
) => {
  if (!node) return false;

  return elements.some((element) => {
    if (!element) return false;
    return element === node || element.contains(node);
  });
};

export const isEventOutside = (
  event: Event,
  elements: Array<HTMLElement | null | undefined>,
) => {
  const path =
    typeof event.composedPath === "function" ? event.composedPath() : [];

  const validElements = elements.filter(Boolean) as HTMLElement[];

  if (!validElements.length) return true;

  if (path.length > 0) {
    return validElements.every((element) => !path.includes(element));
  }

  const target = event.target as Node | null;
  return !isNodeWithinElements(target, validElements);
};
