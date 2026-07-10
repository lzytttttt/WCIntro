import { useState, useEffect, useRef } from "react";
import { Loader, CheckCircle2, Pause, Play } from "lucide-react";

interface ExecutionStatusProps {
  statuses: string[];
  currentIndex: number;
  autoPlay?: boolean;
  playSpeed?: number;
  onComplete?: () => void;
}

export function ExecutionStatus({
  statuses,
  currentIndex: externalIndex,
  autoPlay = false,
  playSpeed = 1200,
  onComplete,
}: ExecutionStatusProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const displayIndex = autoPlay ? internalIndex : externalIndex;
  const allDone = isComplete || displayIndex >= statuses.length - 1;

  useEffect(() => {
    if (!autoPlay) return;
    if (isPlaying && !isComplete) {
      timerRef.current = setInterval(() => {
        setInternalIndex((prev) => {
          const next = prev + 1;
          if (next >= statuses.length - 1) {
            setIsPlaying(false);
            setIsComplete(true);
            if (timerRef.current) clearInterval(timerRef.current);
            onComplete?.();
            return statuses.length - 1;
          }
          return next;
        });
      }, playSpeed);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, isPlaying, isComplete, statuses.length, playSpeed, onComplete]);

  const handlePausePlay = () => {
    if (isComplete) {
      // 重置
      setInternalIndex(0);
      setIsComplete(false);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  const progress = statuses.length > 0 ? ((displayIndex + 1) / statuses.length) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-5">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {allDone ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Loader className="w-5 h-5 text-cyan-500 animate-spin" />
          )}
          <span className="text-sm font-semibold text-cyan-700">
            {allDone ? "执行完成" : "AI 正在执行..."}
          </span>
        </div>
        {autoPlay && (
          <button
            onClick={handlePausePlay}
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg border border-cyan-300 text-cyan-600 hover:bg-cyan-100 transition-colors"
          >
            {allDone ? (
              <>
                <Play className="w-3 h-3" /> 重播
              </>
            ) : isPlaying ? (
              <>
                <Pause className="w-3 h-3" /> 暂停
              </>
            ) : (
              <>
                <Play className="w-3 h-3" /> 继续
              </>
            )}
          </button>
        )}
      </div>

      {/* 进度条 */}
      <div className="h-1.5 bg-cyan-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 状态列表 */}
      <div className="space-y-2.5">
        {statuses.map((status, i) => {
          const done = i < displayIndex;
          const active = i === displayIndex;
          const pending = i > displayIndex;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                active ? "bg-white/80 shadow-sm translate-x-1" : ""
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${
                  done
                    ? "bg-green-400 scale-100"
                    : active
                    ? "bg-cyan-500 animate-pulse-dot scale-125"
                    : "bg-slate-300"
                }`}
              />
              <span
                className={`text-sm transition-colors duration-300 ${
                  done
                    ? "text-green-600 line-through"
                    : active
                    ? "text-cyan-700 font-medium"
                    : "text-slate-400"
                }`}
              >
                {status}
              </span>
              {done && (
                <CheckCircle2 className="w-4 h-4 text-green-400 ml-auto" />
              )}
              {active && (
                <span className="ml-auto text-[10px] text-cyan-400 animate-pulse">
                  处理中
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
