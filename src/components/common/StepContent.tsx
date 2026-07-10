import type { ReactNode } from "react";
import { Lightbulb, Target, BookOpen } from "lucide-react";

interface StepContentProps {
  title: string;
  description: string;
  scenario: string;
  tips: string;
  children: ReactNode;
  color?: "blue" | "violet";
}

export function StepContent({ title, description, scenario, tips, children, color = "blue" }: StepContentProps) {
  const accentColor = color === "violet" ? "violet" : "primary";
  const badgeBg = color === "violet" ? "bg-violet-50 text-violet-700" : "bg-primary-50 text-primary-700";
  const borderColor = color === "violet" ? "border-violet-200" : "border-primary-200";

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* 标题与说明 */}
        <div className={`mb-6 p-6 bg-white rounded-xl border ${borderColor}`}>
          <h2 className={`text-xl font-bold text-${accentColor}-700 mb-3`}>
            步骤 {title.split(" ")[0] || "1"}: {title.includes(" ") ? title.substring(title.indexOf(" ") + 1) : title}
          </h2>
          <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>

        {/* 场景与提示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">使用场景</span>
            </div>
            <p className="text-sm text-slate-500">{scenario}</p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">操作提示</span>
            </div>
            <p className="text-sm text-slate-500">{tips}</p>
          </div>
        </div>

        {/* 模拟界面 */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">模拟界面</span>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
