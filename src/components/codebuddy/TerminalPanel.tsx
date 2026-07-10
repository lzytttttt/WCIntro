import { useEffect, useRef } from "react";
import { useTerminalOutput } from "@/hooks/useTerminalOutput";
import { Terminal, Play, RotateCcw, Zap } from "lucide-react";

interface TerminalPanelProps {
  lines: string[];
  onStart: () => void;
  onReset: () => void;
  autoRun?: boolean;
  autoRunDelay?: number;
}

export function TerminalPanel({
  lines,
  onStart,
  onReset,
  autoRun = false,
  autoRunDelay = 300,
}: TerminalPanelProps) {
  const { outputLines, isRunning: running, isComplete: complete, start, reset } = useTerminalOutput(lines, autoRunDelay);
  const containerRef = useRef<HTMLDivElement>(null);

  // 用 ref 持最新值，避免 effect 重跑
  const startRef = useRef(start);
  const onStartRef = useRef(onStart);
  startRef.current = start;
  onStartRef.current = onStart;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [outputLines]);

  // 自动运行：mount 后立即执行，单次触发，永不重跑
  useEffect(() => {
    if (!autoRun) return;
    const id = setTimeout(() => {
      startRef.current();
      onStartRef.current();
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-950 rounded-xl overflow-hidden shadow-lg border border-slate-800 terminal-font">
      {/* 标题栏 */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Terminal className="w-3.5 h-3.5" />
          <span>终端</span>
        </div>
        <div className="flex items-center gap-2">
          {!autoRun && !running && !complete && (
            <button
              onClick={() => { start(); onStart(); }}
              className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 px-2 py-1 rounded border border-green-800 hover:border-green-700 transition-colors"
            >
              <Play className="w-3 h-3" /> 运行
            </button>
          )}
          {running && (
            <span className="text-xs text-green-400 animate-pulse flex items-center gap-1">
              <Zap className="w-3 h-3" /> 执行中
            </span>
          )}
          {complete && (
            <button
              onClick={() => { reset(); onReset(); }}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300 px-2 py-1 rounded border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> 重置
            </button>
          )}
        </div>
      </div>

      {/* 终端输出 */}
      <div ref={containerRef} className="flex-1 overflow-auto p-4 text-sm">
        {outputLines.length === 0 && !running && (
          <div className="flex items-center gap-2 text-slate-600">
            <Terminal className="w-4 h-4" />
            {autoRun
              ? "终端启动中..."
              : '点击 "运行" 按钮查看终端输出...'}
          </div>
        )}
        {outputLines.filter(Boolean).map((line, i) => (
          <div
            key={i}
            className={`animate-fade-in ${
              line.startsWith("$")
                ? "text-green-400 mt-1"
                : line.startsWith("✓") || line.startsWith("✅")
                ? "text-green-400"
                : line.startsWith("✗") || line.startsWith("❌")
                ? "text-red-400"
                : "text-slate-300"
            }`}
          >
            {line || "\u00A0"}
          </div>
        ))}
        {running && (
          <span className="inline-block w-2.5 h-5 bg-green-400 animate-pulse align-middle ml-0.5" />
        )}
        {complete && outputLines.length > 0 && (
          <div className="text-green-400/60 text-xs mt-2 animate-fade-in">
            ── 命令执行完毕 ──
          </div>
        )}
      </div>
    </div>
  );
}
