import { CheckCircle2, RefreshCw, Download } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { ProgressBar } from "./common/ProgressBar";
import { learningSummary } from "@/data/learningSummary";
import { downloadMarkdown } from "@/utils/download";

export function CompletionSummary() {
  const { totalProgress, clearProgress, showToast, progress } = useAppContext();

  const handleReset = () => {
    clearProgress();
    showToast("学习进度已重置", "info");
  };

  const handleDownload = () => {
    const sections = [
      "# WorkBuddy & CodeBuddy 学习清单",
      "",
      "## 核心流程回顾",
      `- WorkBuddy：${learningSummary.workbuddyFlow}`,
      `- CodeBuddy：${learningSummary.codebuddyFlow}`,
      "",
      "## 工具选择",
      learningSummary.toolSelection.rule,
      learningSummary.toolSelection.shortCut,
      "",
      "## Prompt 公式",
      learningSummary.promptFormula,
      "",
      "## 注意事项",
      ...learningSummary.risks.map((r) => `- ${r}`),
      "",
      "## 已完成章节",
      ...learningSummary.modules.filter((m) => progress.completedModules.includes(m)).map((m) => `- ✅ ${m}`),
      ...learningSummary.modules.filter((m) => !progress.completedModules.includes(m)).map((m) => `- ⬜ ${m}`),
    ];

    downloadMarkdown("WB-CB学习清单.md", sections.join("\n"));
    showToast("学习清单已下载", "success");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">学习总结</h2>
      <div className="mb-6">
        <span className="text-sm text-slate-500 mb-2 block">总学习进度</span>
        <ProgressBar value={totalProgress} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-50 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">WorkBuddy 核心流程</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{learningSummary.workbuddyFlow}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">CodeBuddy 核心流程</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{learningSummary.codebuddyFlow}</p>
        </div>
      </div>

      <div className="p-4 bg-primary-50 rounded-lg mb-6">
        <h3 className="text-sm font-semibold text-primary-700 mb-1">Prompt 编写公式</h3>
        <p className="text-xs text-primary-600">{learningSummary.promptFormula}</p>
      </div>

      <div className="p-4 bg-amber-50 rounded-lg mb-6">
        <h3 className="text-sm font-semibold text-amber-700 mb-2">常见风险提醒</h3>
        <ul className="space-y-1">
          {learningSummary.risks.map((r, i) => (
            <li key={i} className="text-xs text-amber-600 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Download className="w-4 h-4" /> 下载学习清单
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> 重新学习
        </button>
      </div>
    </div>
  );
}
