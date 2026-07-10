import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  isCompleted: boolean;
  onComplete: () => void;
  color?: "blue" | "violet";
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  isCompleted,
  onComplete,
  color = "blue",
}: StepNavigationProps) {
  const primaryColor = color === "violet" ? "violet" : "primary";
  const hoverBg = color === "violet" ? "hover:bg-violet-700" : "hover:bg-primary-600";
  const borderColor = color === "violet" ? "border-violet-200" : "border-primary-200";
  const textColor = color === "violet" ? "text-violet-600" : "text-primary-600";

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
      <button
        onClick={onPrev}
        disabled={currentStep <= 1}
        className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors
          ${currentStep <= 1 ? "text-slate-300 cursor-not-allowed" : `text-slate-600 hover:bg-slate-100`}`}
      >
        <ChevronLeft className="w-4 h-4" />
        上一步
      </button>

      <span className="text-sm text-slate-400">
        步骤 {currentStep} / {totalSteps}
      </span>

      {currentStep < totalSteps ? (
        <button
          onClick={onNext}
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-${primaryColor}-500 rounded-lg ${hoverBg} transition-colors`}
        >
          下一步
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={onComplete}
          disabled={isCompleted}
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${isCompleted
              ? "bg-green-100 text-green-600 cursor-default"
              : `bg-${primaryColor}-500 text-white ${hoverBg}`}`}
        >
          {isCompleted ? (
            <>
              <Check className="w-4 h-4" /> 已完成
            </>
          ) : (
            <>
              <Check className="w-4 h-4" /> 完成学习
            </>
          )}
        </button>
      )}
    </div>
  );
}
