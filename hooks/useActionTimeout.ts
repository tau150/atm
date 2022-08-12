import { useEffect, useCallback, useRef } from "react";

export const useActionTimeout = (
  action: Function = () => {},
  delay: number = 300000,
): { resetTimeout: Function } => {
  const timerRef = useRef<undefined | number>(undefined);

  const resetTimeout = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(action, delay);
    }
  }, [action, delay]);

  useEffect(() => {
    timerRef.current = setTimeout(action, delay);

    return () => clearTimeout(timerRef.current);
  }, [action, delay]);

  return { resetTimeout };
};
