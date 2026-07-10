import { Check } from "lucide-react";
import type { Step } from "@/types";

interface SidebarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
  color?: "blue" | "violet";
}

export function Sidebar({ steps, currentStep, onStepClick, color = "blue" }: SidebarProps) {
  const accentColor = color === "violet" ? "violet" : "primary";

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 overflow-auto">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">学习步骤</h3>
        <nav className="space-y-1">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = step.completed;

            return (
              <button
                key={step.id}
                onClick={() => onStepClick(step.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-3
                  ${isActive ? `bg-${accentColor}-50 text-${accentColor}-700 font-medium` : "text-slate-600 hover:bg-slate-50"}
                `}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                    ${isActive ? `bg-${accentColor}-500 text-white` : isCompleted ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.id}
                </span>
                <span className="truncate">{step.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
