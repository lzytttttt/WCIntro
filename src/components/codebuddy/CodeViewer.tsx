import { useState, useEffect, useRef } from "react";
import { Code2, Copy, CheckCircle2 } from "lucide-react";
import { copyToClipboard } from "@/utils/clipboard";

interface CodeViewerProps {
  code: string;
  fileName: string;
}

// 简易 JS/TS 语法高亮
function highlightCode(code: string): { text: string; className: string }[][] {
  const keywordSet = new Set([
    "import", "export", "default", "from", "const", "let", "var",
    "function", "return", "if", "else", "for", "of", "in", "while",
    "class", "extends", "interface", "type", "enum", "as", "async",
    "await", "try", "catch", "throw", "new", "this", "void",
    "true", "false", "null", "undefined", "typeof",
  ]);

  return code.split("\n").map((line) => {
    const tokens: { text: string; className: string }[] = [];
    let remaining = line;
    let idx = 0;

    while (idx < remaining.length) {
      // 注释
      if (remaining[idx] === "/" && remaining[idx + 1] === "/") {
        if (idx > 0) tokens.push({ text: remaining.slice(0, idx), className: "" });
        tokens.push({ text: remaining.slice(idx), className: "text-slate-500 italic" });
        remaining = "";
        break;
      }
      // 字符串
      if (remaining[idx] === '"' || remaining[idx] === "'" || remaining[idx] === "`") {
        const quote = remaining[idx];
        const endIdx = remaining.indexOf(quote, idx + 1);
        const strEnd = endIdx === -1 ? remaining.length : endIdx + 1;
        if (idx > 0) tokens.push({ text: remaining.slice(0, idx), className: "" });
        tokens.push({ text: remaining.slice(idx, strEnd), className: "text-amber-300" });
        remaining = remaining.slice(strEnd);
        idx = 0;
        continue;
      }
      // 单词边界
      const match = remaining.slice(idx).match(/[A-Za-z0-9_$]+/);
      if (match && match.index === 0) {
        const word = match[0];
        if (idx > 0) tokens.push({ text: remaining.slice(0, idx), className: "" });
        if (keywordSet.has(word)) {
          tokens.push({ text: word, className: "text-purple-400" });
        } else if (/^[A-Z]/.test(word)) {
          tokens.push({ text: word, className: "text-cyan-300" });
        } else {
          tokens.push({ text: word, className: "" });
        }
        remaining = remaining.slice(idx + word.length);
        idx = 0;
        continue;
      }
      // JSX 标签
      if (remaining[idx] === "<") {
        if (idx > 0) tokens.push({ text: remaining.slice(0, idx), className: "" });
        const endIdx = remaining.indexOf(">", idx);
        if (endIdx !== -1) {
          tokens.push({ text: remaining.slice(idx, endIdx + 1), className: "text-rose-300" });
          remaining = remaining.slice(endIdx + 1);
        } else {
          tokens.push({ text: remaining.slice(idx), className: "" });
          remaining = "";
        }
        idx = 0;
        continue;
      }
      idx++;
    }

    if (remaining) {
      tokens.push({ text: remaining, className: "" });
    }

    return tokens.length > 0 ? tokens : [{ text: line, className: "" }];
  });
}

export function CodeViewer({ code, fileName }: CodeViewerProps) {
  const lines = code.split("\n");
  const highlighted = highlightCode(code);
  const [copied, setCopied] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 逐行动画显示
  useEffect(() => {
    setVisibleLines(0);
    let cancelled = false;
    const timer = setInterval(() => {
      if (cancelled) return;
      setVisibleLines((prev) => {
        if (cancelled || prev >= lines.length) {
          clearInterval(timer);
          return prev;
        }
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        });
        return prev + 1;
      });
    }, 30);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [code, lines.length]);

  const handleCopy = () => {
    copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
      {/* 文件标签栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-700 rounded-md">
            <Code2 className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-xs text-slate-300">{fileName}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-700 transition-colors"
            title="复制代码"
          >
            {copied ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* 代码内容 */}
      <div ref={containerRef} className="flex-1 overflow-auto p-4 code-line">
        {highlighted.slice(0, visibleLines).map((tokens, i) => (
          <div key={i} className="flex hover:bg-slate-800/50 transition-colors animate-fade-in">
            <span className="w-10 text-right pr-4 text-slate-600 select-none flex-shrink-0 text-xs leading-6">
              {i + 1}
            </span>
            <span className="text-slate-300 whitespace-pre text-sm leading-6">
              {tokens.map((token, j) => (
                <span key={j} className={token.className || undefined}>
                  {token.text}
                </span>
              ))}
            </span>
          </div>
        ))}
        {visibleLines < lines.length && (
          <div className="flex items-center gap-2 text-slate-500 text-xs mt-1 animate-pulse">
            <span className="inline-block w-2 h-5 bg-violet-400" />
            加载代码中...
          </div>
        )}
      </div>
    </div>
  );
}
