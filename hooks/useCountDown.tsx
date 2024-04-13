import { useEffect, useRef, useState } from "react";

export function useCountdown(idx: number, initialCount: number = -1) {
  const [countDown, setCountDown] = useState(initialCount);
  // let intervalId: number;
  const intervalRef = useRef<number>();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (idx == -1) {
      return;
    }

    if (isRunning && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCountDown((count) => {
          return count - 1;
        });
      }, 1000);
    }
    return cleanup;
  }, [idx, isRunning]);

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
      setIsRunning(false);
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  return {
    countDown,
    isRunning,
    stop: cleanup,
    start: (count?: number) => {
      setCountDown(count ?? initialCount);
      setIsRunning(true);
    },
  };
}
