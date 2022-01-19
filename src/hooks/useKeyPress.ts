import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const useKeyPress = (
  keys: string[],
  callback: (event: KeyboardEvent) => void,
  ctrlCmd: boolean = false,
  node = null,
) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const isAppleDevice = useCallback(() => {
    const expression = /(Mac|iPhone|iPod|iPad)/i;
    return expression.test(navigator.platform);
  }, []);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (keys.some((key) => event.key === key)) {
        if (ctrlCmd) {
          if (isAppleDevice() && event.metaKey) {
            callbackRef.current(event);
          } else if (event.ctrlKey) {
            callbackRef.current(event);
          }
        } else {
          callbackRef.current(event);
        }
      }
    },
    [keys],
  );

  useEffect(() => {
    const targetNode = node ?? document;
    targetNode && targetNode.addEventListener('keydown', handleKeyPress);

    return () => {
      targetNode && targetNode.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, node]);
};
