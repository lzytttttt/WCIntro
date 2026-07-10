import { useState } from "react";
import { Monitor, Code2, ChevronDown, ChevronUp, Play } from "lucide-react";
import type { Scenario } from "@/types";
import { useNavigate } from "react-router-dom";

interface ScenarioCardProps {
  scenario: Scenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const isWB = scenario.tool === "workbuddy";

  return (
    <div className={`bg-white rounded-xl border ${isWB ? "border-cyan-100 hover:border-cyan-200" : "border-violet-100 hover:border-violet-200"} hover:shadow-md transition-all p-5`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isWB ? "bg-cyan-50" : "bg-violet-50"}`}>
            {isWB ? <Monitor className="w-4 h-4 text-cyan-500" /> : <Code2 className="w-4 h-4 text-violet-500" />}
          </div>
          <h3 className="font-semibold text-slate-800">{scenario.name}</h3>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isWB ? "bg-cyan-50 text-cyan-600" : "bg-violet-50 text-violet-600"}`}>
          {isWB ? "WorkBuddy" : "CodeBuddy"}
        </span>
      </div>

      <p className="text-sm text-slate-500 mb-3">{scenario.description}</p>

      {/* 标签 */}
      <div className="flex flex-wrap gap-1 mb-3">
        {scenario.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500">{tag}</span>
        ))}
      </div>

      {/* Prompt 预览 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1 text-xs font-medium text-primary-500 hover:text-primary-600 mb-2"
      >
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        示例 Prompt
      </button>
      {expanded && (
        <div className="bg-slate-50 rounded-lg p-3 mb-3 animate-fade-in">
          <p className="text-xs text-slate-600 font-mono">{scenario.examplePrompt}</p>
        </div>
      )}

      <button
        onClick={() => navigate(isWB ? `/workbuddy?scenario=${scenario.id}` : `/codebuddy?scenario=${scenario.id}`)}
        className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors
          ${isWB ? "border-cyan-200 text-cyan-600 hover:bg-cyan-50" : "border-violet-200 text-violet-600 hover:bg-violet-50"}`}
      >
        <Play className="w-3.5 h-3.5" /> 查看演示
      </button>
    </div>
  );
}
