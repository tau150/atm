import { useEffect, useCallback, KeyboardEvent } from "react";

const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Enter", "Backspace"];

export const useNumericPadKeyboard = (callback: Function): void => {
  const keydownListener = useCallback(
    (e: { key: string }) => {
      const { key } = e;

      if (!validKeys.includes(key)) return;
      callback(key);
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener("keydown", keydownListener);

    return () => {
      document.removeEventListener("keydown", keydownListener);
    };
  }, [keydownListener]);
};
