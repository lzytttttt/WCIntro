import { AppLayout } from "@/components/common/AppLayout";
import { CompletionSummary } from "@/components/CompletionSummary";
import { useAppContext } from "@/context/AppContext";
import { learningSummary } from "@/data/learningSummary";
import { departments } from "@/data/departmentRoles";
import { Monitor, Code2, Layers } from "lucide-react";

export default function SummaryPage() {
  const { progress } = useAppContext();
  const completedModules = progress.completedModules;

  const toolIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    workbuddy: Monitor, codebuddy: Code2, both: Layers,
  };

  return (
    <AppLayout title="学习总结" color="blue">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* 进度与下载 */}
        <CompletionSummary />

        {/* 已完成章节 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">已完成章节</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {learningSummary.modules.map((mod) => (
              <div
                key={mod}
                className={`px-3 py-2 rounded-lg text-sm ${
                  completedModules.includes(mod)
                    ? "bg-green-50 text-green-700 font-medium"
                    : "bg-slate-50 text-slate-400"
                }`}
              >
                {completedModules.includes(mod) ? "✓ " : "○ "}{mod}
              </div>
            ))}
          </div>
        </div>

        {/* 工具选择口诀 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">工具选择口诀</h2>
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-700 font-medium">{learningSummary.toolSelection.rule}</p>
            <p className="text-sm text-indigo-600 mt-2">{learningSummary.toolSelection.shortCut}</p>
          </div>
        </div>

        {/* Prompt 公式 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Prompt 编写公式</h2>
          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-primary-700 font-medium">{learningSummary.promptFormula}</p>
          </div>
        </div>

        {/* 部门角色速查表 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">部门角色工具推荐速查</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 text-slate-500 font-medium">部门</th>
                  <th className="text-left py-2 text-slate-500 font-medium">岗位</th>
                  <th className="text-left py-2 text-slate-500 font-medium">推荐工具</th>
                  <th className="text-left py-2 text-slate-500 font-medium">优先级</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) =>
                  dept.roles.map((role, ri) => {
                    const ToolIcon = toolIconMap[role.recommendedTool] || Monitor;
                    return (
                      <tr key={role.id} className="border-b border-slate-50">
                        {ri === 0 && (
                          <td className="py-2 text-slate-700 font-medium" rowSpan={dept.roles.length}>
                            {dept.name}
                          </td>
                        )}
                        <td className="py-2 text-slate-600">{role.name}</td>
                        <td className="py-2">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                            role.recommendedTool === "codebuddy" ? "bg-violet-100 text-violet-600"
                              : role.recommendedTool === "both" ? "bg-indigo-100 text-indigo-600"
                              : "bg-cyan-100 text-cyan-600"
                          }`}>
                            <ToolIcon className="w-3 h-3" />
                            {role.recommendedTool === "workbuddy" ? "WorkBuddy" : role.recommendedTool === "codebuddy" ? "CodeBuddy" : "两者配合"}
                          </span>
                        </td>
                        <td className="py-2 text-xs text-slate-500">{role.toolPriority}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 常见风险提醒 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">常见风险提醒</h2>
          <div className="space-y-2">
            {learningSummary.risks.map((risk, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠️</span>
                {risk}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
