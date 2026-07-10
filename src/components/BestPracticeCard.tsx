import { CheckCircle2, XCircle } from "lucide-react";
import type { BestPractice } from "@/types";

interface BestPracticeCardProps {
  practice: BestPractice;
}

export function BestPracticeCard({ practice }: BestPracticeCardProps) {
  const isWB = practice.tool === "workbuddy";

  return (
    <div
      className={`p-4 rounded-lg border ${
        practice.isRecommended
          ? isWB ? "border-green-200 bg-green-50/50" : "border-green-200 bg-green-50/50"
          : "border-red-200 bg-red-50/50"
      }`}
    >
      <div className="flex items-start gap-3">
        {practice.isRecommended ? (
          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        )}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-slate-800">{practice.title}</h4>
            <span className={`text-xs px-1.5 py-0.5 rounded ${isWB ? "bg-cyan-100 text-cyan-600" : "bg-violet-100 text-violet-600"}`}>
              {isWB ? "WB" : "CB"}
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{practice.description}</p>
        </div>
      </div>
    </div>
  );
}
