import { useState } from "react";
import { AppLayout } from "@/components/common/AppLayout";
import { BestPracticeCard } from "@/components/BestPracticeCard";
import { bestPractices } from "@/data/bestPractices";
import { useAppContext } from "@/context/AppContext";
import { Monitor, Code2 } from "lucide-react";

export default function BestPracticePage() {
  const [filter, setFilter] = useState<"all" | "workbuddy" | "codebuddy">("all");
  const { dispatch } = useAppContext();

  const filtered = filter === "all"
    ? bestPractices
    : bestPractices.filter((p) => p.tool === filter);

  const recommended = filtered.filter((p) => p.isRecommended);
  const notRecommended = filtered.filter((p) => !p.isRecommended);

  return (
    <AppLayout title="最佳实践" color="blue">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">最佳实践</h1>
        <p className="text-slate-500 mb-6">掌握这些使用原则，让 WorkBuddy 和 CodeBuddy 发挥最大价值</p>

        {/* 筛选 */}
        <div className="flex gap-2 mb-8">
          {[
            { value: "all", label: "全部" },
            { value: "workbuddy", label: "WorkBuddy", icon: Monitor, color: "cyan" },
            { value: "codebuddy", label: "CodeBuddy", icon: Code2, color: "violet" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item.value as typeof filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === item.value
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              {item.label}
            </button>
          ))}
        </div>

        {/* 推荐做法 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" /> 推荐做法
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommended.map((p) => (
              <BestPracticeCard key={p.id} practice={p} />
            ))}
          </div>
        </div>

        {/* 不推荐做法 */}
        <div>
          <h2 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" /> 不推荐做法
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notRecommended.map((p) => (
              <BestPracticeCard key={p.id} practice={p} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
