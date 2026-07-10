import { useState, useRef, useEffect } from "react";
import { FileTree } from "./FileTree";
import { CodeViewer } from "./CodeViewer";
import {
  Send, RefreshCw, User, Bot, Code2, Bug, Lightbulb,
  ChevronDown, Zap,
} from "lucide-react";
import type { FileNode } from "@/types";
import type { IterationRound } from "@/data/scenarios/types";

interface IterationChatProps {
  rounds: IterationRound[];
  fileTree: FileNode[];
  codeSnippets: Record<string, string>;
  problemHint?: string;
}

export function IterationChat({
  rounds,
  fileTree,
  codeSnippets,
  problemHint,
}: IterationChatProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string; fixFiles?: string[]; fixSnippets?: Record<string, string> }>>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [expandedFix, setExpandedFix] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 自动播放一轮对话
  useEffect(() => {
    if (rounds.length > 0 && currentRound === 0 && messages.length === 0) {
      // 先显示用户消息
      const round = rounds[0];
      const t1 = setTimeout(() => {
        setMessages([{ role: "user", content: round.userMessage }]);
      }, 500);

      // 再模拟 AI 回复
      const t2 = setTimeout(() => {
        setIsTyping(true);
        let i = 0;
        const text = round.aiResponse;
        const interval = setInterval(() => {
          i += Math.floor(Math.random() * 3) + 2;
          if (i >= text.length) {
            setTypingText(text);
            setIsTyping(false);
            clearInterval(interval);
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: text, fixFiles: round.fixFiles, fixSnippets: round.fixSnippets },
            ]);
          } else {
            setTypingText(text.slice(0, i));
          }
        }, 18);
        return () => clearInterval(interval);
      }, 1200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [rounds.length]);

  // 自动滚动
  useEffect(() => {
    requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages, typingText]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    const text = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    // 如果有下一轮预置对话，使用它
    const nextIdx = currentRound + 1;
    if (nextIdx < rounds.length) {
      setCurrentRound(nextIdx);
      const round = rounds[nextIdx];
      setTimeout(() => {
        setIsTyping(true);
        let i = 0;
        const aiText = round.aiResponse;
        const interval = setInterval(() => {
          i += Math.floor(Math.random() * 3) + 2;
          if (i >= aiText.length) {
            setTypingText(aiText);
            setIsTyping(false);
            clearInterval(interval);
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: aiText, fixFiles: round.fixFiles, fixSnippets: round.fixSnippets },
            ]);
          } else {
            setTypingText(aiText.slice(0, i));
          }
        }, 18);
      }, 600);
    } else {
      // 通用回应
      setTimeout(() => {
        setIsTyping(true);
        const rsp = "收到您的反馈。请查看左侧文件树中被修改的文件，确认修复内容是否符合预期。如需进一步调整，欢迎继续描述。";
        let i = 0;
        const interval = setInterval(() => {
          i += 3;
          if (i >= rsp.length) {
            setTypingText(rsp);
            setIsTyping(false);
            clearInterval(interval);
            setMessages((prev) => [...prev, { role: "assistant", content: rsp }]);
          } else {
            setTypingText(rsp.slice(0, i));
          }
        }, 18);
      }, 400);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentRound(0);
    setTypingText("");
    setIsTyping(false);
    setInputValue("");
    setSelectedFile(null);
    setExpandedFix(null);
  };

  return (
    <div className="grid grid-cols-4 h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      {/* 左侧文件树 */}
      <FileTree
        nodes={fileTree}
        selectedId={selectedFile}
        onSelect={(id) => {
          setSelectedFile(id);
          setExpandedFix(null);
        }}
      />

      {/* 右侧对话区 */}
      <div className="col-span-3 flex flex-col bg-slate-50">
        {/* 对话标题 */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-slate-700">迭代修复对话</span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> 重置
          </button>
        </div>

        {/* 对话消息列表 */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {/* 问题提示 */}
          {problemHint && messages.length === 0 && !isTyping && (
            <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50 rounded-lg border border-amber-100 animate-fade-in">
              <Bug className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700">{problemHint}</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              {/* 头像 */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant" ? "bg-violet-100" : "bg-slate-200"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-4 h-4 text-violet-600" />
                ) : (
                  <User className="w-4 h-4 text-slate-500" />
                )}
              </div>

              {/* 气泡 */}
              <div className={`flex-1 min-w-0 ${msg.role === "user" ? "flex justify-end" : ""}`}>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 text-sm max-w-[90%] ${
                    msg.role === "assistant"
                      ? "bg-white border border-slate-200 text-slate-700 shadow-sm"
                      : "bg-violet-500 text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-xs">{msg.content}</div>

                  {/* 修复文件列表 */}
                  {msg.role === "assistant" && msg.fixFiles && msg.fixFiles.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                        <Code2 className="w-3 h-3 text-violet-400" />
                        修改文件
                      </div>
                      {msg.fixFiles.map((f) => (
                        <button
                          key={f}
                          onClick={() => {
                            setSelectedFile(f);
                            setExpandedFix(f);
                          }}
                          className="block w-full text-left text-xs text-violet-600 hover:text-violet-800 bg-violet-50 hover:bg-violet-100 rounded px-2 py-1 mb-1 transition-colors"
                        >
                          📄 {f}.tsx
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* AI 打字中 */}
          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-violet-600" />
              </div>
              <div className="flex-1">
                <div className="rounded-2xl px-3.5 py-2.5 bg-white border border-violet-200 text-slate-700 shadow-sm max-w-[90%]">
                  <div className="whitespace-pre-wrap leading-relaxed text-xs">
                    {typingText}
                    <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse align-middle ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* 输入框 */}
        <div className="px-4 py-3 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={isTyping}
              placeholder="描述发现的问题或新的需求..."
              className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 disabled:bg-slate-50 disabled:text-slate-400"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="p-2 rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {rounds.length > 0 && currentRound < rounds.length - 1 && (
            <p className="text-xs text-slate-400 mt-1.5">
              💡 试试发送消息，AI 会根据场景继续修复。剩余 {rounds.length - currentRound - 1} 轮预设对话。
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
