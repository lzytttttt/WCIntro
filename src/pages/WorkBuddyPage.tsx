import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/common/AppLayout";
import { Sidebar } from "@/components/common/Sidebar";
import { StepContent } from "@/components/common/StepContent";
import { StepNavigation } from "@/components/common/StepNavigation";
import { ChatPanel } from "@/components/workbuddy/ChatPanel";
import { ExecutionStatus } from "@/components/workbuddy/ExecutionStatus";
import { ResultPreview } from "@/components/workbuddy/ResultPreview";
import { ScenarioBanner } from "@/components/common/ScenarioBanner";
import { useAppContext } from "@/context/AppContext";
import { workbuddySteps } from "@/data/workbuddySteps";
import {
  getWBScenarioData,
  featuredWBScenarios,
  DEFAULT_WB_SCENARIO,
} from "@/data/scenarios/index";
import type { WBScenarioDemoData } from "@/data/scenarios/types";
import { CheckCircle, Copy, FileDown } from "lucide-react";

export default function WorkBuddyPage() {
  const { dispatch, showToast, progress } = useAppContext();
  const [searchParams] = useSearchParams();
  const scenarioId = searchParams.get("scenario") || DEFAULT_WB_SCENARIO;
  const [scenarioData, setScenarioData] = useState<WBScenarioDemoData>(
    getWBScenarioData(scenarioId)
  );

  const [currentStep, setCurrentStep] = useState(
    progress.lastStep > 0 ? progress.lastStep : 1
  );
  const [steps, setSteps] = useState(
    workbuddySteps.map((s) => ({
      ...s,
      completed: progress.completedSteps["workbuddy"]?.includes(s.id) || false,
    }))
  );
  const [showResult, setShowResult] = useState(false);

  // 当场景变化时重新加载数据
  useEffect(() => {
    setScenarioData(getWBScenarioData(scenarioId));
    setShowResult(false);
  }, [scenarioId]);

  const step = steps[currentStep - 1];
  const isLastStep = currentStep === steps.length;
  const isStepCompleted = step.completed;

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const handleComplete = () => {
    const newSteps = steps.map((s) =>
      s.id === currentStep ? { ...s, completed: true } : s
    );
    setSteps(newSteps);
    dispatch({
      type: "COMPLETE_STEP",
      payload: { module: "workbuddy", step: currentStep },
    });
    showToast(`步骤 ${currentStep} 已完成`, "success");
  };

  const handleStepClick = (id: number) => setCurrentStep(id);

  // 渲染模拟内容
  const renderSimulation = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 rounded-xl border border-cyan-100">
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-5 ring-4 ring-cyan-100">
                <span className="text-4xl">{scenarioData.scenarioIcon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {scenarioData.scenarioName}
              </h3>
              <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                {scenarioData.scenarioDescription}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-cyan-600 bg-cyan-50 rounded-full px-3 py-1.5 w-fit mx-auto">
                <CheckCircle className="w-3.5 h-3.5" />
                当前演示场景
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-cyan-100">
            <div className="text-center animate-fade-in">
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-4">
                {[
                  { icon: "📝", label: "描述任务" },
                  { icon: "📎", label: "提供材料" },
                  { icon: "✨", label: "获得结果" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 shadow-sm border border-cyan-100 hover:shadow-md transition-all"
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <div className="text-xs text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500">
                选择场景后，WorkBuddy 将通过这三步为您高效完成任务
              </p>
            </div>
          </div>
        );

      case 3:
      case 4:
        return (
          <ChatPanel
            initialMessages={scenarioData.chatMessages.slice(0, 2)}
            streamingResponse={[
              "正在理解您的任务...",
              "正在提取关键信息...",
              "正在分析内容结构...",
              "正在生成结构化输出...",
              `\n\n## 📄 ${scenarioData.scenarioName}\n\n即将为您生成完整结果...`,
            ]}
            allowInput={currentStep === 4}
          />
        );

      case 5:
        return (
          <div className="p-4 animate-fade-in">
            <ExecutionStatus
              statuses={scenarioData.executionStatuses}
              currentIndex={0}
              autoPlay
              playSpeed={1000}
              onComplete={() => {
                setTimeout(() => setShowResult(true), 500);
              }}
            />
            {!showResult && (
              <div className="text-center mt-4">
                <p className="text-xs text-slate-400 animate-pulse">
                  正在自动播放执行流程... 您也可以手动点击下方按钮跳转
                </p>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="p-4 max-h-[500px] overflow-auto animate-fade-in">
            {showResult ? (
              <ResultPreview
                conclusions={scenarioData.resultData.conclusions}
                conclusionsTitle={scenarioData.resultData.conclusionsTitle}
                todos={scenarioData.resultData.todos}
                risks={scenarioData.resultData.risks}
                email={scenarioData.resultData.email}
                emailTitle={scenarioData.resultData.emailTitle}
                report={scenarioData.resultData.report}
                reportTitle={scenarioData.resultData.reportTitle}
                prd={scenarioData.resultData.prd}
                comparison={scenarioData.resultData.comparison}
              />
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-2xl">📋</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  执行完成后将自动展示结果
                </p>
                <button
                  onClick={() => setShowResult(true)}
                  className="px-5 py-2.5 bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 text-sm font-medium transition-all hover:shadow-lg"
                >
                  立即查看输出结果
                </button>
              </div>
            )}
          </div>
        );

      case 7:
        return (
          <ChatPanel
            initialMessages={scenarioData.chatMessages}
            allowInput
            streamingResponse={
              scenarioData.modificationPrompt
                ? [
                    "正在理解您的修改要求...",
                    "正在调整输出内容...",
                    "正在优化格式...",
                    "\n\n根据您的要求，已更新相关内容。",
                  ]
                : undefined
            }
          />
        );

      case 8:
        return (
          <div className="p-6 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-5 ring-4 ring-green-50">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              任务完成！
            </h3>
            <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
              您已体验了「{scenarioData.scenarioName}」场景下 WorkBuddy 从发起到交付的完整流程。
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-all hover:shadow-lg">
                <Copy className="w-4 h-4" /> 复制全部结果
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-all">
                <FileDown className="w-4 h-4" /> 导出文档
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout title="WorkBuddy 入门" color="blue">
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <ScenarioBanner
          scenarioName={scenarioData.scenarioName}
          scenarioIcon={scenarioData.scenarioIcon}
          color="blue"
          featuredScenarios={featuredWBScenarios}
          currentScenarioId={scenarioId}
          basePath="/workbuddy"
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            color="blue"
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <StepContent
              title={`${step.id} ${step.title}`}
              description={step.description}
              scenario={step.scenario}
              tips={step.tips}
              color="blue"
            >
              {renderSimulation()}
            </StepContent>
            <div className="px-6 pb-4">
              <StepNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onPrev={handlePrev}
                onNext={handleNext}
                isCompleted={isStepCompleted}
                onComplete={handleComplete}
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
