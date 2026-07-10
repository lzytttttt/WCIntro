import { useMemo } from "react";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import type { PromptFormData } from "@/types";
import { buildPrompt } from "@/utils/prompt";
import { copyToClipboard } from "@/utils/clipboard";

interface PromptPreviewProps {
  form: PromptFormData;
}

export function PromptPreview({ form }: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);
  const fullPrompt = useMemo(() => buildPrompt(form), [form]);
  const hasContent = Object.values(form).some((v) => v.trim());

  const handleCopy = () => {
    if (copyToClipboard(fullPrompt)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
        <span className="text-xs text-slate-400 font-medium">实时预览</span>
        <button
          onClick={handleCopy}
          disabled={!hasContent}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors disabled:opacity-30"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <div className="p-4 terminal-font text-sm text-slate-300 min-h-[200px] whitespace-pre-wrap">
        {hasContent ? fullPrompt : <span className="text-slate-600">在左侧填写信息后，此处实时显示拼接结果...</span>}
      </div>
    </div>
  );
}
