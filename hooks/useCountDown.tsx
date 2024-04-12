import { useEffect, useRef, useState } from "react";

export function useCountdown(idx: number, initialCount: number) {
  const [countDown, setCountDown] = useState(initialCount);
  // let intervalId: number;
  const intervalRef = useRef<number>();
  useEffect(() => {
    if (idx == -1) {
      return;
    }
    intervalRef.current = window.setInterval(() => {
      setCountDown((count) => {
        return count - 1;
      });
    }, 50);
    return cleanup;
  }, [idx]);
  useEffect(() => {
    setCountDown(initialCount);
  }, [initialCount]);
  useEffect(() => {
    if (countDown === 0) {
      cleanup();
    }
  }, [countDown]);
  const cleanup = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };
  return countDown;
}
