import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string | string[];
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";
  const contentStr = Array.isArray(content) ? content.join("") : content;

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* 头像 */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-primary-100" : "bg-cyan-100"
        }`}
      >
        {isUser ? <User className="w-4 h-4 text-primary-500" /> : <Bot className="w-4 h-4 text-cyan-500" />}
      </div>

      {/* 消息内容 */}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser ? "bg-primary-500 text-white rounded-tr-sm" : "bg-white border border-slate-200 rounded-tl-sm"
        }`}
      >
        <pre
          className={`text-sm whitespace-pre-wrap font-sans ${
            isUser ? "text-white" : "text-slate-700"
          }`}
        >
          {contentStr}
          {isStreaming && <span className="inline-block w-2 h-4 bg-current ml-0.5 animate-pulse align-text-bottom" />}
        </pre>
      </div>
    </div>
  );
}
