import { useState } from "react";
import type { DiffLine } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DiffViewerProps {
  diffLines: DiffLine[];
  fileName: string;
}

export function DiffViewer({ diffLines, fileName }: DiffViewerProps) {
  const [collapsedUnchanged, setCollapsedUnchanged] = useState(false);

  const addedCount = diffLines.filter((l) => l.type === "added").length;
  const deletedCount = diffLines.filter((l) => l.type === "deleted").length;

  // 将连续的 unchanged 行分组折叠
  const visibleLines = collapsedUnchanged
    ? diffLines.filter((l) => l.type !== "unchanged")
    : diffLines;

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* 头部 */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <span className="text-sm font-medium text-slate-700">{fileName}</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-green-600">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
              +{addedCount}
            </span>
            <span className="flex items-center gap-1 text-red-600">
              <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
              -{deletedCount}
            </span>
          </div>
          <button
            onClick={() => setCollapsedUnchanged(!collapsedUnchanged)}
            className="text-xs text-slate-400 hover:text-slate-600 px-2 py-0.5 rounded border border-slate-200 hover:bg-white transition-colors"
            title={collapsedUnchanged ? "显示全部" : "折叠未修改"}
          >
            {collapsedUnchanged ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronUp className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Diff 内容 */}
      <div className="flex-1 overflow-auto p-1 font-mono text-sm">
        {collapsedUnchanged && diffLines.some((l) => l.type === "unchanged") && (
          <div className="text-center text-xs text-slate-400 py-1 border-b border-dashed border-slate-200">
            ⋯ 省略 {diffLines.filter((l) => l.type === "unchanged").length} 行未修改内容 ⋯
          </div>
        )}
        {visibleLines.map((line, i) => {
          const bg =
            line.type === "added"
              ? "bg-green-50/70"
              : line.type === "deleted"
              ? "bg-red-50/70"
              : "";
          const textColor =
            line.type === "added"
              ? "text-green-800"
              : line.type === "deleted"
              ? "text-red-800"
              : "text-slate-500";
          const prefix =
            line.type === "added" ? "+" : line.type === "deleted" ? "-" : " ";
          const prefixBg =
            line.type === "added"
              ? "bg-green-100"
              : line.type === "deleted"
              ? "bg-red-100"
              : "";

          return (
            <div
              key={i}
              className={`flex hover:bg-slate-100/50 transition-colors duration-100 ${bg}`}
            >
              <span
                className={`w-10 text-center flex-shrink-0 text-slate-400 select-none text-xs py-0.5`}
              >
                {line.lineNumber || ""}
              </span>
              <span
                className={`w-5 text-center flex-shrink-0 ${textColor} select-none font-bold py-0.5 ${prefixBg}`}
              >
                {prefix}
              </span>
              <span className={`${textColor} whitespace-pre py-0.5`}>
                {line.content}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
