import { useState, useMemo } from "react";
import { AppLayout } from "@/components/common/AppLayout";
import { ScenarioCard } from "@/components/ScenarioCard";
import { scenarios } from "@/data/scenarios";
import { departments } from "@/data/departmentRoles";
import { useAppContext } from "@/context/AppContext";

const tagFilters = ["全部", "办公", "产品", "研发", "数据", "管理"];

export default function ScenarioPage() {
  const [activeTag, setActiveTag] = useState("全部");
  const [activeDept, setActiveDept] = useState<string>("全部");
  const { dispatch, showToast } = useAppContext();

  const filteredScenarios = useMemo(() => {
    return scenarios.filter((s) => {
      const tagMatch = activeTag === "全部" || s.tags.includes(activeTag);
      const deptMatch =
        activeDept === "全部" ||
        (s.departments && s.departments.includes(activeDept));
      return tagMatch && deptMatch;
    });
  }, [activeTag, activeDept]);

  return (
    <AppLayout title="场景选择" color="blue">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">使用场景</h1>
          <p className="text-slate-500">浏览 WorkBuddy 和 CodeBuddy 的常见使用场景，找到适合您的使用方式</p>
        </div>

        {/* 标签筛选 */}
        <div className="mb-3">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">按类型筛选</span>
          <div className="flex flex-wrap gap-2 mb-4">
            {tagFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTag === tag ? "bg-slate-800 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 部门筛选 */}
        <div className="mb-6">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 block">按部门筛选</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveDept("全部")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeDept === "全部" ? "bg-slate-800 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              全部部门
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => { setActiveDept(dept.id); dispatch({ type: "SET_DEPARTMENT", payload: dept.id }); }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeDept === dept.id ? "bg-primary-500 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* 结果 */}
        <div className="text-sm text-slate-400 mb-4">共 {filteredScenarios.length} 个场景</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScenarios.map((s) => (
            <ScenarioCard key={s.id} scenario={s} />
          ))}
        </div>
        {filteredScenarios.length === 0 && (
          <div className="text-center py-16 text-slate-400">没有匹配的场景，请调整筛选条件</div>
        )}
      </div>
    </AppLayout>
  );
}
