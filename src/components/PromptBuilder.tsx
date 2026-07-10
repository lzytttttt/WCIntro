import type { PromptFormData } from "@/types";

interface PromptBuilderProps {
  form: PromptFormData;
  onChange: (field: keyof PromptFormData, value: string) => void;
}

const fields: { key: keyof PromptFormData; label: string; placeholder: string; hint: string }[] = [
  { key: "goal", label: "我想完成什么任务", placeholder: "例：整理产品评审会议纪要，生成会后同步邮件", hint: "清晰描述任务目标，越具体越好" },
  { key: "background", label: "任务背景", placeholder: "例：教研平台 V3.0 阶段评审，年前需上线", hint: "提供必要的上下文信息" },
  { key: "materials", label: "已有材料", placeholder: "例：粘贴会议录音转录文本，或附上参考文档", hint: "粘贴或描述已有的输入材料" },
  { key: "outputFormat", label: "输出要求", placeholder: "例：输出为结论列表、待办表格和正式邮件", hint: "指定输出结构和格式" },
  { key: "constraints", label: "限制条件", placeholder: "例：邮件不超过 300 字，语气正式，不包含技术术语", hint: "不做什么、字数限制、风格要求" },
  { key: "executionMethod", label: "希望 AI 如何执行", placeholder: "例：先分析关键信息，再逐步输出各部分结果", hint: "告诉 AI 执行的方式和步骤" },
];

export function PromptBuilder({ form, onChange }: PromptBuilderProps) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{field.label}</label>
          <textarea
            value={form[field.key]}
            onChange={(e) => onChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 min-h-[60px]"
            rows={2}
          />
          <p className="text-xs text-slate-400 mt-1">{field.hint}</p>
        </div>
      ))}
    </div>
  );
}
