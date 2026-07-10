import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "blue" | "violet";
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, color = "blue", showLabel = true }: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const pct = Math.min((value / max) * 100, 100);
  const barColor = color === "violet" ? "bg-violet-500" : "bg-primary-500";

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 100);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      {showLabel && <span className="text-xs font-medium text-slate-500 min-w-[36px]">{Math.round(pct)}%</span>}
    </div>
  );
}
