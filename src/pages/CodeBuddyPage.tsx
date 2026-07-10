import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/common/AppLayout";
import { Sidebar } from "@/components/common/Sidebar";
import { StepContent } from "@/components/common/StepContent";
import { StepNavigation } from "@/components/common/StepNavigation";
import { FileTree } from "@/components/codebuddy/FileTree";
import { CodeViewer } from "@/components/codebuddy/CodeViewer";
import { DiffViewer } from "@/components/codebuddy/DiffViewer";
import { TaskPlan } from "@/components/codebuddy/TaskPlan";
import { BuildVerification } from "@/components/codebuddy/BuildVerification";
import { IterationChat } from "@/components/codebuddy/IterationChat";
import { CompletionSummary } from "@/components/codebuddy/CompletionSummary";
import { ScenarioBanner } from "@/components/common/ScenarioBanner";
import { useAppContext } from "@/context/AppContext";
import { codebuddySteps } from "@/data/codebuddySteps";
import {
  getCBScenarioData,
  featuredCBScenarios,
  DEFAULT_CB_SCENARIO,
} from "@/data/scenarios/index";
import type { CBScenarioDemoData } from "@/data/scenarios/types";
import {
  Lightbulb, CheckCircle,
} from "lucide-react";

export default function CodeBuddyPage() {
  const { dispatch, showToast, progress } = useAppContext();
  const [searchParams] = useSearchParams();
  const scenarioId = searchParams.get("scenario") || DEFAULT_CB_SCENARIO;
  const [scenarioData, setScenarioData] = useState<CBScenarioDemoData>(
    getCBScenarioData(scenarioId)
  );

  const [currentStep, setCurrentStep] = useState(
    progress.lastStep > 0 && progress.lastModule === "codebuddy"
      ? progress.lastStep
      : 1
  );
  const [steps, setSteps] = useState(
    codebuddySteps.map((s) => ({
      ...s,
      completed: progress.completedSteps["codebuddy"]?.includes(s.id) || false,
    }))
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [terminalIdx, setTerminalIdx] = useState(0);
  const [planApproved, setPlanApproved] = useState(false);

  // 场景变化时重新加载数据
  useEffect(() => {
    setScenarioData(getCBScenarioData(scenarioId));
    setSelectedFile(null);
    setPlanApproved(false);
    setTerminalIdx(0);
  }, [scenarioId]);

  const step = steps[currentStep - 1];

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };
  const handleStepClick = (id: number) => setCurrentStep(id);

  const handleComplete = () => {
    const newSteps = steps.map((s) =>
      s.id === currentStep ? { ...s, completed: true } : s
    );
    setSteps(newSteps);
    dispatch({
      type: "COMPLETE_STEP",
      payload: { module: "codebuddy", step: currentStep },
    });
    showToast(`步骤 ${currentStep} 已完成`, "success");
  };

  const renderSimulation = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-xl border border-violet-100">
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-5 ring-4 ring-violet-100">
                <span className="text-4xl">{scenarioData.scenarioIcon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {scenarioData.scenarioName}
              </h3>
              <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                {scenarioData.scenarioDescription}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-violet-600 bg-violet-50 rounded-full px-3 py-1.5 w-fit mx-auto">
                <CheckCircle className="w-3.5 h-3.5" />
                当前演示场景
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-4 h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <FileTree
              nodes={scenarioData.fileTree}
              selectedId={selectedFile}
              onSelect={(id) => setSelectedFile(id)}
            />
            <div className="col-span-3 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center text-sm text-slate-400">
              <span className="text-4xl mb-3">📁</span>
              <p>选择左侧文件查看项目代码</p>
              <p className="text-xs mt-1 text-slate-300">
                文件总数：{countAllFiles(scenarioData.fileTree)}
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="h-80 bg-slate-900 rounded-xl p-6 flex items-center shadow-lg border border-slate-800">
            <div className="terminal-font text-green-400 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">$</span>
                <span className="animate-typewriter">{scenarioData.plan.task}</span>
              </div>
              <div className="text-slate-500 text-sm mt-3">
                AI 正在理解您的开发需求...
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400/80 text-sm">
                  需求已识别，将在下一步制定详细计划
                </span>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-4 h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <FileTree
              nodes={scenarioData.fileTree}
              selectedId={selectedFile}
              onSelect={(id) => setSelectedFile(id)}
            />
            <div className="col-span-3 bg-slate-50 p-5 text-sm overflow-auto">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-700">项目分析</span>
              </div>
              <div className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                {scenarioData.plan.analysis}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="h-80 overflow-auto animate-fade-in">
            <TaskPlan
              title={scenarioData.plan.title}
              steps={scenarioData.plan.steps}
              files={scenarioData.plan.files}
              onApprove={() => setPlanApproved(true)}
              approved={planApproved}
            />
          </div>
        );

      case 6:
        return (
          <div className="grid grid-cols-4 h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <FileTree
              nodes={scenarioData.fileTree}
              selectedId={selectedFile}
              onSelect={(id) => setSelectedFile(id)}
            />
            <div className="col-span-3 bg-slate-50">
              {selectedFile && scenarioData.codeSnippets[selectedFile] ? (
                <CodeViewer
                  code={scenarioData.codeSnippets[selectedFile]}
                  fileName={`${selectedFile}.tsx`}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-sm text-slate-400">
                  <span className="text-3xl mb-2">👆</span>
                  <p>点击左侧有状态标记的文件查看代码</p>
                  <p className="text-xs mt-1 text-slate-300">
                    修改/新增的文件带有 A/M/D 标记
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="grid grid-cols-4 h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            <FileTree
              nodes={scenarioData.fileTree}
              selectedId={selectedFile}
              onSelect={(id) => setSelectedFile(id)}
            />
            <div className="col-span-3">
              {selectedFile && scenarioData.diffData[selectedFile] ? (
                <DiffViewer
                  diffLines={scenarioData.diffData[selectedFile]}
                  fileName={`${selectedFile}.tsx`}
                />
              ) : scenarioData.diffData && Object.keys(scenarioData.diffData).length > 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-sm text-slate-400">
                  <span className="text-3xl mb-2">🔍</span>
                  <p>点击左侧带有 M/A/D 的文件查看代码变更</p>
                  <p className="text-xs mt-1 text-slate-300">
                    绿色=新增 · 红色=删除 · 灰色=未修改
                  </p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-slate-400">
                  该场景暂无 Diff 数据，请查看代码区
                </div>
              )}
            </div>
          </div>
        );

      case 8: {
        const bv = scenarioData.buildVerification;
        const tLines = scenarioData.terminalOutputs[terminalIdx] || [];
        return (
          <BuildVerification
            terminalLines={tLines}
            checks={bv?.checks || []}
            bundleSize={bv?.bundleSize}
            buildTime={bv?.buildTime}
            previewUrl={bv?.previewUrl}
            previewTitle={bv?.previewTitle}
          />
        );
      }

      case 9: {
        const iter = scenarioData.iterationData;
        return (
          <IterationChat
            rounds={iter?.rounds || []}
            fileTree={scenarioData.fileTree}
            codeSnippets={scenarioData.codeSnippets}
            problemHint={iter?.problemHint}
          />
        );
      }

      case 10: {
        const cs = scenarioData.completionSummary;
        return cs ? (
          <CompletionSummary
            summary={cs}
            scenarioName={scenarioData.scenarioName}
          />
        ) : (
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 animate-fade-in">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-5 ring-4 ring-green-50">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {scenarioData.scenarioName} — 任务完成！
              </h3>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <AppLayout title="CodeBuddy 入门" color="violet">
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <ScenarioBanner
          scenarioName={scenarioData.scenarioName}
          scenarioIcon={scenarioData.scenarioIcon}
          color="violet"
          featuredScenarios={featuredCBScenarios}
          currentScenarioId={scenarioId}
          basePath="/codebuddy"
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            color="violet"
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <StepContent
              title={`${step.id} ${step.title}`}
              description={step.description}
              scenario={step.scenario}
              tips={step.tips}
              color="violet"
            >
              {renderSimulation()}
            </StepContent>
            <div className="px-6 pb-4">
              <StepNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onPrev={handlePrev}
                onNext={handleNext}
                isCompleted={step.completed}
                onComplete={handleComplete}
                color="violet"
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function countAllFiles(nodes: import("@/types").FileNode[]): number {
  let count = 0;
  for (const node of nodes) {
    if (node.type === "file") count++;
    if (node.children) count += countAllFiles(node.children);
  }
  return count;
}
