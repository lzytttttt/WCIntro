import { useCallback, useEffect, useRef, useState } from "react";

export function useTerminalOutput(lines: string[], delay = 400) {
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(() => {
    setOutputLines([]);
    setIsComplete(false);
    setIsRunning(true);
    indexRef.current = 0;

    const nextLine = () => {
      if (indexRef.current >= lines.length) {
        setIsRunning(false);
        setIsComplete(true);
        return;
      }
      const line = lines[indexRef.current];
      if (line != null) {
        setOutputLines((prev) => [...prev, line]);
      }
      indexRef.current += 1;
      timeoutRef.current = setTimeout(nextLine, delay);
    };

    timeoutRef.current = setTimeout(nextLine, delay);
  }, [lines, delay]);

  const complete = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOutputLines(lines);
    setIsRunning(false);
    setIsComplete(true);
  }, [lines]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOutputLines([]);
    setIsRunning(false);
    setIsComplete(false);
    indexRef.current = 0;
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { outputLines, isRunning, isComplete, start, complete, reset };
}
