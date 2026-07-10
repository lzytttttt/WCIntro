import { useState, useEffect } from "react";
import {
  CheckCircle2, FileText, GitBranch, PlusCircle, MinusCircle,
  Pencil, Trash2, Sparkles, Lightbulb, TrendingUp,
  ChevronDown, ChevronRight,
} from "lucide-react";
import type { CompletionSummaryData } from "@/data/scenarios/types";

interface CompletionSummaryProps {
  summary: CompletionSummaryData;
  scenarioName: string;
}

function StatCard({
  icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  delay: number;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-3 text-center transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <div className={`mx-auto w-8 h-8 rounded-lg ${color} flex items-center justify-center mb-1.5`}>
        {icon}
      </div>
      <div className="text-lg font-bold text-slate-800">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? features : features.slice(0, 4);

  return (
    <div className="space-y-1.5">
      {visible.map((f, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-slate-600 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          {f}
        </div>
      ))}
      {features.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-xs text-violet-500 hover:text-violet-700 mt-1"
        >
          {showAll ? "收起" : `查看全部 ${features.length} 项功能`}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}

export function CompletionSummary({ summary, scenarioName }: CompletionSummaryProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [expandedTips, setExpandedTips] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCelebration(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="h-80 overflow-auto animate-fade-in">
      {/* 庆祝横幅 */}
      <div
        className={`text-center mb-4 transition-all duration-700 ${
          showCelebration ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-full border border-green-200 mb-2">
          <span className="text-2xl">🎉</span>
          <span className="text-sm font-semibold text-green-700">
            {scenarioName} — 开发完成！
          </span>
          <Sparkles className="w-4 h-4 text-green-500" />
        </div>
        <p className="text-xs text-slate-400">
          CodeBuddy 已按照您的需求完成了全部开发任务
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        <StatCard
          icon={<PlusCircle className="w-4 h-4 text-green-600" />}
          label="新建文件"
          value={summary.stats.filesCreated}
          color="bg-green-100"
          delay={300}
        />
        <StatCard
          icon={<Pencil className="w-4 h-4 text-amber-600" />}
          label="修改文件"
          value={summary.stats.filesModified}
          color="bg-amber-100"
          delay={450}
        />
        <StatCard
          icon={<Trash2 className="w-4 h-4 text-red-600" />}
          label="删除文件"
          value={summary.stats.filesDeleted}
          color="bg-red-100"
          delay={600}
        />
        <StatCard
          icon={<PlusCircle className="w-4 h-4 text-violet-600" />}
          label="新增行数"
          value={`+${summary.stats.linesAdded}`}
          color="bg-violet-100"
          delay={750}
        />
        <StatCard
          icon={<MinusCircle className="w-4 h-4 text-slate-600" />}
          label="删除行数"
          value={`-${summary.stats.linesRemoved}`}
          color="bg-slate-100"
          delay={900}
        />
      </div>

      {/* 两栏详情 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 功能清单 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <h4 className="text-sm font-semibold text-slate-700">已完成功能</h4>
          </div>
          <FeatureList features={summary.features} />
        </div>

        {/* 经验总结 */}
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-200 p-4">
          <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setExpandedTips(!expandedTips)}>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-semibold text-slate-700">AI 使用技巧</h4>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedTips ? "rotate-180" : ""}`} />
          </div>
          <div
            className={`space-y-2 overflow-hidden transition-all duration-300 ${
              expandedTips ? "max-h-60 opacity-100" : "max-h-16 opacity-80"
            }`}
          >
            {summary.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-violet-700">
                <TrendingUp className="w-3.5 h-3.5 text-violet-400 mt-0.5 flex-shrink-0" />
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
