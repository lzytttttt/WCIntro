import { useState, useEffect, useRef } from "react";
import { TerminalPanel } from "./TerminalPanel";
import {
  CheckCircle2, XCircle, Package, Clock, Globe,
  ExternalLink, Sparkles,
} from "lucide-react";
import type { BuildCheckItem } from "@/data/scenarios/types";

interface BuildVerificationProps {
  terminalLines: string[];
  checks: BuildCheckItem[];
  bundleSize?: { raw: string; gzip: string };
  buildTime?: string;
  previewUrl?: string;
  previewTitle?: string;
}

function AnimatedCheck({ passed, label, detail }: BuildCheckItem & { index: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-500 ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      } ${passed ? "bg-green-50/60" : "bg-red-50/60"}`}
    >
      {passed ? (
        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium ${passed ? "text-green-700" : "text-red-700"}`}>
          {label}
        </span>
        {detail && (
          <p className="text-xs text-slate-400 mt-0.5 truncate">{detail}</p>
        )}
      </div>
    </div>
  );
}

type Phase = "idle" | "running" | "done";

export function BuildVerification({
  terminalLines,
  checks,
  bundleSize,
  buildTime,
  previewUrl,
  previewTitle,
}: BuildVerificationProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [showResults, setShowResults] = useState(false);
  const keyRef = useRef(0);

  // 根据终端行数估算完成时间（每行约 300ms + 初始延迟 300ms）
  const estimatedDuration = terminalLines.length * 300 + 600;

  const handleStart = () => setPhase("running");
  const handleReset = () => {
    keyRef.current += 1;
    setPhase("idle");
    setShowResults(false);
  };

  // 终端开始后，延迟到预计完成时间自动显示结果
  useEffect(() => {
    if (phase !== "running") return;
    const timer = setTimeout(() => {
      setPhase("done");
      setTimeout(() => setShowResults(true), 200);
    }, estimatedDuration);
    return () => clearTimeout(timer);
  }, [phase, estimatedDuration]);

  return (
    <div className="grid grid-cols-3 gap-4 h-80">
      {/* 终端面板 */}
      <div className="col-span-2">
        <TerminalPanel
          key={keyRef.current}
          lines={terminalLines}
          autoRun
          onStart={handleStart}
          onReset={handleReset}
        />
      </div>

      {/* 构建结果面板 */}
      <div
        className={`bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col overflow-auto transition-all duration-500 ${
          showResults ? "opacity-100" : "opacity-40"
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-slate-700">构建结果</h3>
        </div>

        {/* 检查项 */}
        <div className="space-y-2 mb-3">
          {checks.map((check, i) => (
            <AnimatedCheck key={i} index={i} {...check} />
          ))}
        </div>

        {/* 包体积 */}
        {bundleSize && showResults && (
          <div className="flex items-center gap-2 px-3 py-2 bg-violet-50 rounded-lg mb-2 animate-fade-in">
            <Package className="w-4 h-4 text-violet-500" />
            <span className="text-xs text-violet-700 font-medium">
              包体积：{bundleSize.raw}（gzip: {bundleSize.gzip}）
            </span>
          </div>
        )}

        {/* 构建耗时 */}
        {buildTime && showResults && (
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg mb-2 animate-fade-in">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-600">构建耗时：{buildTime}</span>
          </div>
        )}

        {/* 预览链接 */}
        {previewUrl && showResults && (
          <div className="mt-auto animate-fade-in">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg border border-violet-100">
              <Globe className="w-4 h-4 text-violet-500" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-violet-700 font-medium truncate">
                  {previewTitle || "浏览器预览"}
                </p>
                <p className="text-xs text-violet-400 truncate">{previewUrl}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-violet-400" />
            </div>
          </div>
        )}

        {/* 状态提示 */}
        <div className="flex-1 flex items-center justify-center">
          {phase === "idle" && (
            <p className="text-xs text-slate-400 text-center">
              终端即将自动运行
              <br />
              完成后显示构建结果
            </p>
          )}
          {phase === "running" && (
            <p className="text-xs text-slate-400 animate-pulse">
              正在构建中...
            </p>
          )}
          {phase === "done" && !showResults && (
            <p className="text-xs text-slate-400">加载结果...</p>
          )}
        </div>
      </div>
    </div>
  );
}
