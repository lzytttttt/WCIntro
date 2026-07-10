import { FileText, CheckCircle2 } from "lucide-react";

interface PlanFile {
  file: string;
  action: string;
  description: string;
}

interface TaskPlanProps {
  title: string;
  steps: string[];
  files: PlanFile[];
  onApprove: () => void;
  approved: boolean;
}

export function TaskPlan({ title, steps, files, onApprove, approved }: TaskPlanProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5">
      <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>

      {/* 步骤列表 */}
      <div className="space-y-2 mb-6">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
            <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
              {i + 1}
            </span>
            {step}
          </div>
        ))}
      </div>

      {/* 文件列表 */}
      <div className="border-t border-slate-100 pt-4 mb-4">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">涉及文件</h4>
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              <FileText className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded">{f.file}</code>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    f.action === "创建" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                  }`}>
                    {f.action}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 批准按钮 */}
      <button
        onClick={onApprove}
        disabled={approved}
        className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
          approved
            ? "bg-green-50 text-green-600 cursor-default flex items-center justify-center gap-2"
            : "bg-violet-500 text-white hover:bg-violet-600"
        }`}
      >
        {approved ? (
          <>
            <CheckCircle2 className="w-4 h-4" /> 已批准，正在执行...
          </>
        ) : (
          "确认并开始执行"
        )}
      </button>
    </div>
  );
}
