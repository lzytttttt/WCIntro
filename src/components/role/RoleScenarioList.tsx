import { scenarios } from "@/data/scenarios";
import { Monitor, Code2 } from "lucide-react";

interface RoleScenarioListProps {
  scenarioIds: string[];
}

export function RoleScenarioList({ scenarioIds }: RoleScenarioListProps) {
  const roleScenarios = scenarios.filter((s) => scenarioIds.includes(s.id));

  return (
    <div className="space-y-2">
      {roleScenarios.map((s) => (
        <div key={s.id} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-100">
          <div className={`p-1.5 rounded-md ${s.tool === "workbuddy" ? "bg-cyan-50" : "bg-violet-50"}`}>
            {s.tool === "workbuddy" ? (
              <Monitor className="w-4 h-4 text-cyan-500" />
            ) : (
              <Code2 className="w-4 h-4 text-violet-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-slate-700">{s.name}</h4>
            <p className="text-xs text-slate-400 truncate">{s.examplePrompt}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
