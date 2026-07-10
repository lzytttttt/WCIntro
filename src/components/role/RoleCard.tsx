import { useState } from "react";
import { ChevronDown, ChevronUp, Monitor, Code2, Layers, AlertTriangle, ArrowRight } from "lucide-react";
import type { Role } from "@/types";
import { scenarios } from "@/data/scenarios";
import { useNavigate } from "react-router-dom";

interface RoleCardProps {
  role: Role;
}

export function RoleCard({ role }: RoleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const roleScenarios = scenarios.filter((s) => role.scenarioIds.includes(s.id));

  const toolBadge = {
    workbuddy: { label: "WorkBuddy", color: "bg-cyan-100 text-cyan-700", icon: Monitor },
    codebuddy: { label: "CodeBuddy", color: "bg-violet-100 text-violet-700", icon: Code2 },
    both: { label: "两者配合", color: "bg-indigo-100 text-indigo-700", icon: Layers },
  };

  const badge = toolBadge[role.recommendedTool];
  const ToolIcon = badge.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* 头部 */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{role.name}</h3>
            <p className="text-sm text-slate-500">{role.toolPriority}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
            <ToolIcon className="w-3.5 h-3.5" />
            {badge.label}
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">{role.usageAdvice}</p>

        {/* 注意事项 */}
        {role.precautions && role.precautions.length > 0 && (
          <div className="bg-amber-50 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-amber-700">注意事项</span>
            </div>
            <ul className="space-y-1">
              {role.precautions.map((p, i) => (
                <li key={i} className="text-xs text-amber-600 pl-6 relative before:content-['•'] before:absolute before:left-1">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 展开按钮 */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {expanded ? "收起场景" : `查看典型场景（${roleScenarios.length}个）`}
        </button>
      </div>

      {/* 展开的场景列表 */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50 p-4 animate-fade-in">
          <div className="grid grid-cols-1 gap-3">
            {roleScenarios.map((scenario) => (
              <div key={scenario.id} className="bg-white rounded-lg border border-slate-200 p-3">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-semibold text-slate-700">{scenario.name}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      scenario.tool === "workbuddy"
                        ? "bg-cyan-50 text-cyan-600"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    {scenario.tool === "workbuddy" ? "WorkBuddy" : "CodeBuddy"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{scenario.description}</p>
                <p className="text-xs text-slate-400 font-mono bg-slate-50 p-2 rounded truncate">
                  {scenario.examplePrompt}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/scenarios")}
            className="mt-3 flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600"
          >
            查看所有场景演示 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
