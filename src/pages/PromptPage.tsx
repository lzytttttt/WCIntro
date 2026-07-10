import { useState, useCallback } from "react";
import { AppLayout } from "@/components/common/AppLayout";
import { PromptBuilder } from "@/components/PromptBuilder";
import { PromptPreview } from "@/components/PromptPreview";
import { promptExamples, optimizationComparison, promptStructure } from "@/data/promptExamples";
import { useAppContext } from "@/context/AppContext";
import { User, Target, Info, FileText, Shield, Layout, CheckCircle, ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import type { PromptFormData } from "@/types";

const structureIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  User, Target, Info, FileText, Shield, Layout, CheckCircle,
};

export default function PromptPage() {
  const { dispatch } = useAppContext();
  const [form, setForm] = useState<PromptFormData>({
    goal: "", background: "", materials: "", outputFormat: "", constraints: "", executionMethod: "",
  });

  const handleChange = useCallback((field: keyof PromptFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    dispatch({ type: "SET_PROMPT_FORM", payload: { [field]: value } });
  }, [dispatch]);

  return (
    <AppLayout title="Prompt 教学" color="blue">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Prompt 教学</h1>

        {/* 结构讲解 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">Prompt 七大要素</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {promptStructure.map((item) => {
              const Icon = structureIcons[item.icon] || Info;
              return (
                <div key={item.element} className="p-4 bg-white rounded-lg border border-slate-200">
                  <Icon className="w-5 h-5 text-primary-500 mb-2" />
                  <h3 className="text-sm font-semibold text-slate-700 mb-1">{item.element}</h3>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 对比示例 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">对比示例：为什么好的 Prompt 更有效</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-red-700">较差的 Prompt</h3>
              </div>
              <p className="text-sm text-red-600 bg-white p-3 rounded-lg mb-3 font-mono">{promptExamples.bad.prompt}</p>
              <div className="space-y-1">
                {promptExamples.bad.issues.map((issue, i) => (
                  <div key={i} className="flex items-center gap-1 text-xs text-red-500">
                    <span className="text-red-300">✗</span> {issue}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-green-700">优化后的 Prompt</h3>
              </div>
              <p className="text-sm text-green-700 bg-white p-3 rounded-lg mb-3 font-mono">{promptExamples.good.prompt}</p>
              <div className="space-y-1">
                {promptExamples.good.strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-1 text-xs text-green-600">
                    <span className="text-green-400">✓</span> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 三步优化 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">三步写出优质 Prompt</h2>
          <div className="space-y-4">
            {optimizationComparison.map((item, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-primary-600 mb-2">{item.level}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <span className="text-xs text-red-400 font-medium">Before</span>
                    <p className="text-xs text-red-600 mt-1">{item.before}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-green-400 font-medium">After</span>
                      <ArrowRight className="w-3 h-3 text-green-400" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">{item.after}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">💡 {item.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prompt 生成器 */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">交互式 Prompt 生成器</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PromptBuilder form={form} onChange={handleChange} />
            <PromptPreview form={form} />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
