import * as React from "react";

export function useContainerWidth<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [width, setWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const update = () => {
      setWidth(element.clientWidth);
    };

    update();

    const observer = new ResizeObserver(() => {
      update();
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
