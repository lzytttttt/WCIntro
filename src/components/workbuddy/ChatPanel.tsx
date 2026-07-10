import { useState, useEffect, useRef, useCallback } from "react";
import { ChatMessage as ChatMessageComp } from "./ChatMessage";
import { MockFileAttachment } from "./MockFileAttachment";
import { Send, Paperclip, StopCircle, RefreshCw, Copy } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import type { ChatMessage } from "@/types";
import { copyToClipboard } from "@/utils/clipboard";

interface ChatPanelProps {
  initialMessages?: ChatMessage[];
  /** 流式回复的分段文本 */
  streamingResponse?: string[];
  /** 每段打字间隔 ms */
  typeSpeed?: number;
  /** 发送消息回调 */
  onSendMessage?: (content: string) => void;
  /** 是否允许输入 */
  allowInput?: boolean;
}

export function ChatPanel({
  initialMessages = [],
  streamingResponse,
  typeSpeed = 50,
  onSendMessage,
  allowInput = true,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [showAttachment, setShowAttachment] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultStreaming = [
    "正在理解您的任务...",
    "正在提取关键信息...",
    "正在分析内容...",
    "正在生成结构化输出...",
    "\n\n## 📄 输出结果\n\n处理完成。",
  ];
  const response = streamingResponse || defaultStreaming;

  const { displayedText, isTyping, start, stop } = useTypewriter(response, typeSpeed);

  // 自动滚动到底部
  useEffect(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages, displayedText]);

  // 重置消息当 initialMessages 变化
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const appendMessage = useCallback((role: "user" | "assistant", content: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role,
      content,
      timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
  }, []);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    const text = inputValue.trim();
    setInputValue("");
    appendMessage("user", text);
    setIsGenerating(true);
    start();

    if (onSendMessage) {
      onSendMessage(text);
    }

    const totalDuration = response.length * typeSpeed + 800;
    setTimeout(() => {
      setIsGenerating(false);
    }, totalDuration);
  };

  const handleCopy = () => {
    const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
    if (lastAssistantMsg) {
      const text = typeof lastAssistantMsg.content === "string"
        ? lastAssistantMsg.content
        : lastAssistantMsg.content.join("");
      copyToClipboard(text);
    } else {
      copyToClipboard("已复制对话内容");
    }
  };

  return (
    <div className="flex h-full">
      {/* 左侧会话列表 */}
      <div className="w-48 border-r border-slate-200 bg-slate-50 p-3 hidden md:block">
        <button className="w-full px-3 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 mb-3 transition-colors">
          + 新建任务
        </button>
        <div className="space-y-1">
          {["当前会话"].map((title, i) => (
            <button
              key={i}
              className="w-full text-left px-3 py-2 rounded-lg text-sm bg-white shadow-sm text-slate-700 font-medium"
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* 中间对话区 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 消息列表 */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessageComp
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isStreaming={msg.isStreaming}
            />
          ))}
          {/* 模拟流式生成 */}
          {isTyping && (
            <ChatMessageComp role="assistant" content={displayedText} isStreaming />
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 操作栏 */}
        <div className="flex items-center gap-2 px-4 py-2 border-t border-slate-200">
          {isTyping ? (
            <button
              onClick={stop}
              className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              title="停止生成"
            >
              <StopCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="复制对话"
            >
              <Copy className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => {
              if (!isTyping) {
                start();
                setIsGenerating(true);
                setTimeout(() => setIsGenerating(false), response.length * typeSpeed + 800);
              }
            }}
            disabled={isTyping}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-30"
            title="重新生成"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* 输入框 */}
        {allowInput && (
          <div className="p-4 border-t border-slate-200">
            {showAttachment && (
              <div className="mb-2">
                <MockFileAttachment
                  fileName="任务材料.txt"
                  onRemove={() => setShowAttachment(false)}
                />
              </div>
            )}
            <div className="flex items-end gap-2">
              <button
                onClick={() => setShowAttachment(!showAttachment)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="描述您的任务目标，或输入修改要求..."
                className="flex-1 resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 min-h-[40px] max-h-[120px]"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
