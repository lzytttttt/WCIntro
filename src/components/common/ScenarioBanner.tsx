import { ChevronDown, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ScenarioBannerProps {
  scenarioName: string;
  scenarioIcon: string;
  color: "blue" | "violet";
  featuredScenarios: string[];
  currentScenarioId: string;
  basePath: string;
}

const scenarioLabels: Record<string, string> = {
  "wb-meeting-summary": "会议纪要整理",
  "wb-weekly-report": "周报和汇报材料",
  "wb-prd": "产品需求分析",
  "wb-competitor-analysis": "竞品信息整理",
  "wb-quote-email": "邮件撰写",
  "wb-content-summary": "内容总结",
  "wb-project-plan": "项目计划拆解",
  "wb-data-analysis": "数据结论描述",
  "wb-training-material": "培训材料生成",
  "cb-create-page": "创建前端页面",
  "cb-fix-bug": "修复 Bug",
  "cb-refactor": "代码重构",
};

export function ScenarioBanner({
  scenarioName,
  scenarioIcon,
  color,
  featuredScenarios,
  currentScenarioId,
  basePath,
}: ScenarioBannerProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const bgGradient = color === "blue"
    ? "from-cyan-500/10 via-cyan-400/5 to-cyan-300/10"
    : "from-violet-500/10 via-violet-400/5 to-violet-300/10";
  const borderColor = color === "blue" ? "border-cyan-200/50" : "border-violet-200/50";
  const iconBg = color === "blue" ? "bg-cyan-100" : "bg-violet-100";
  const badgeBg = color === "blue" ? "bg-cyan-500" : "bg-violet-500";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`px-6 py-3 bg-gradient-to-r ${bgGradient} border-b ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center text-lg`}>
            {scenarioIcon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">{scenarioName}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full text-white ${badgeBg}`}>
                演示中
              </span>
            </div>
            <p className="text-xs text-slate-400">当前演示场景</p>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:text-slate-700 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            切换场景
            <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-50 animate-fade-in">
              <div className="px-3 py-1.5 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                精选场景
              </div>
              {featuredScenarios.map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setOpen(false);
                    navigate(`${basePath}?scenario=${id}`);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    id === currentScenarioId
                      ? "bg-slate-50 text-slate-800 font-medium"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  {id === currentScenarioId && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-2 align-middle" />
                  )}
                  {scenarioLabels[id] || id}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
