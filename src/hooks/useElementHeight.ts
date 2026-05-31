import { RefObject, useEffect, useState } from 'react';

export default function useElementHeight<T extends HTMLElement>(
  ref: RefObject<T | null>
) {
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const updateHeight = () => {
      setHeight(Math.round(element.getBoundingClientRect().height));
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [ref]);

  return height;
}
