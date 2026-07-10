import { departments } from "@/data/departmentRoles";
import { TrendingUp, Package, Wrench, Code, Building } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Package, Wrench, Code, Building,
};

interface DepartmentTabsProps {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export function DepartmentTabs({ selectedId, onSelect }: DepartmentTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          selectedId === null
            ? "bg-slate-800 text-white"
            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
        }`}
      >
        全部部门
      </button>
      {departments.map((dept) => {
        const Icon = iconMap[dept.icon] || Building;
        const isActive = selectedId === dept.id;
        return (
          <button
            key={dept.id}
            onClick={() => onSelect(isActive ? null : dept.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary-500 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Icon className="w-4 h-4" />
            {dept.name}
          </button>
        );
      })}
    </div>
  );
}
