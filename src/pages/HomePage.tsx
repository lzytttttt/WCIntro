import { useNavigate } from "react-router-dom";
import { Monitor, Code2, BookOpen, Clock, ArrowRight, PlayCircle, Users } from "lucide-react";
import { AppLayout } from "@/components/common/AppLayout";
import { ToolSelector } from "@/components/ToolSelector";
import { useAppContext } from "@/context/AppContext";
import { learningSummary } from "@/data/learningSummary";

export default function HomePage() {
  const navigate = useNavigate();
  const { totalProgress, progress } = useAppContext();
  const completedCount = progress.completedModules.length;

  return (
    <AppLayout showBack={false}>
      {/* Hero */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-cyan-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            WorkBuddy & CodeBuddy 入门指南
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
            从提出需求到交付结果，快速掌握 AI 工作伙伴
          </p>

          {/* 双入口卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <button
              onClick={() => navigate("/workbuddy")}
              className="group p-6 bg-white rounded-2xl border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:bg-cyan-100 transition-colors">
                <Monitor className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">开始学习 WorkBuddy</h3>
              <p className="text-sm text-slate-500 mb-3">AI 办公助手 · 文档撰写 · 内容分析 · 会议纪要</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan-600 group-hover:gap-2 transition-all">
                进入学习 <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            <button
              onClick={() => navigate("/codebuddy")}
              className="group p-6 bg-white rounded-2xl border-2 border-violet-200 hover:border-violet-400 hover:shadow-lg hover:-translate-y-0.5 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors">
                <Code2 className="w-6 h-6 text-violet-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">开始学习 CodeBuddy</h3>
              <p className="text-sm text-slate-500 mb-3">AI 编程助手 · 代码生成 · Bug 修复 · 项目分析</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 group-hover:gap-2 transition-all">
                进入学习 <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 部门角色入口 + 工具选择器 */}
      <section className="py-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 部门角色快速入口 */}
            <div
              onClick={() => navigate("/role-guide")}
              className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">按岗位查看推荐</h3>
                  <p className="text-sm text-slate-500 mb-3">
                    不知道该用哪个工具？选择你的部门和岗位，查看专属的使用建议和场景推荐。
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                    查看角色指南 <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* 场景入口 */}
            <div
              onClick={() => navigate("/scenarios")}
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 cursor-pointer hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-1">浏览使用场景</h3>
                  <p className="text-sm text-slate-500 mb-3">
                    查看 WorkBuddy 和 CodeBuddy 的 19 个常见场景，找到最适合你的使用方式。
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-600">
                    浏览场景 <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 工具选择器 */}
      <section className="py-10 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-1">快速判断：我该用哪个工具？</h2>
            <p className="text-sm text-slate-500">回答三个简单问题，获得个性化推荐</p>
          </div>
          <ToolSelector />
        </div>
      </section>

      {/* 学习路径 */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">学习路径概览</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            {learningSummary.modules.map((mod, i) => {
              const isCompleted = progress.completedModules.includes(mod);
              return (
                <div key={i} className="flex items-center">
                  <div
                    onClick={() => {
                      const routes: Record<string, string> = {
                        "首页": "/", "WorkBuddy 入门": "/workbuddy", "CodeBuddy 入门": "/codebuddy",
                        "部门角色指南": "/role-guide", "场景选择": "/scenarios", "Prompt 教学": "/prompt",
                        "模拟练习": "/practice", "最佳实践": "/best-practices", "学习总结": "/summary",
                      };
                      navigate(routes[mod] || "/");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors
                      ${isCompleted ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                  >
                    {isCompleted ? "✓ " : ""}{mod}
                  </div>
                  {i < learningSummary.modules.length - 1 && (
                    <span className="mx-1 text-slate-300">→</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>预计学习时间：约 25 分钟</span>
            </div>
            <span>|</span>
            <span>共 9 个模块</span>
          </div>
        </div>
      </section>

      {/* 学习进度 */}
      <section className="py-10 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* 环形进度 */}
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="28" fill="none" stroke="#0ea5e9" strokeWidth="6"
                    strokeDasharray={`${(totalProgress / 100) * 176} 176`}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary-500">
                  {totalProgress}%
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">学习完成度</h3>
                <p className="text-sm text-slate-500">
                  已完成 {completedCount} / {learningSummary.modules.length} 个模块
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {progress.lastModule && (
                <button
                  onClick={() => {
                    const lastModRoutes: Record<string, string> = {
                      "WorkBuddy 入门": "/workbuddy", "CodeBuddy 入门": "/codebuddy",
                      "部门角色指南": "/role-guide", "场景选择": "/scenarios", "Prompt 教学": "/prompt",
                      "模拟练习": "/practice", "最佳实践": "/best-practices", "学习总结": "/summary",
                    };
                    navigate(lastModRoutes[progress.lastModule!] || "/");
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <PlayCircle className="w-4 h-4" /> 继续上次学习
                </button>
              )}
              <button
                onClick={() => navigate("/summary")}
                className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                查看总结
              </button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
