import { useEffect, useRef } from 'react';

/* eslint-disable  @typescript-eslint/no-explicit-any */
function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function debouncedFunction(...args: Parameters<T>) {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  }

  return debouncedFunction;
}

export default useDebounce;
