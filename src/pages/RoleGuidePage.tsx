import { useState } from "react";
import { AppLayout } from "@/components/common/AppLayout";
import { DepartmentTabs } from "@/components/role/DepartmentTabs";
import { RoleCard } from "@/components/role/RoleCard";
import { departments } from "@/data/departmentRoles";
import { Info } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function RoleGuidePage() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const { dispatch, showToast } = useAppContext();

  const filteredDepts = selectedDept
    ? departments.filter((d) => d.id === selectedDept)
    : departments;

  return (
    <AppLayout title="部门角色指南" color="blue">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">部门角色指南</h1>
          <p className="text-slate-500">选择你的部门和岗位，查看推荐的使用场景和工具建议</p>
        </div>

        <DepartmentTabs selectedId={selectedDept} onSelect={(id) => { setSelectedDept(id); dispatch({ type: "SET_DEPARTMENT", payload: id }); }} />

        {filteredDepts.map((dept) => (
          <div key={dept.id} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-slate-100">
                <Info className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">{dept.name}</h2>
                <p className="text-sm text-slate-500">{dept.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {dept.roles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </div>
        ))}

        {filteredDepts.length === 0 && (
          <div className="text-center py-16 text-slate-400">请选择一个部门查看岗位指南</div>
        )}
      </div>
    </AppLayout>
  );
}
