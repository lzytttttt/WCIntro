import { useState, useEffect, useRef } from "react";
import { AppLayout } from "@/components/common/AppLayout";
import { ExecutionStatus } from "@/components/workbuddy/ExecutionStatus";
import { ResultPreview } from "@/components/workbuddy/ResultPreview";
import { TaskPlan } from "@/components/codebuddy/TaskPlan";
import { TerminalPanel } from "@/components/codebuddy/TerminalPanel";
import { DiffViewer } from "@/components/codebuddy/DiffViewer";
import { meetingMinutes, workbuddyPracticeStatuses } from "@/data/meetingMinutes";
import { codebuddyPlan } from "@/data/codebuddyPlan";
import { diffData } from "@/data/diffData";
import { useAppContext } from "@/context/AppContext";
import { Play, RotateCcw, Monitor, Code2, FileText } from "lucide-react";

export default function PracticePage() {
  const { showToast } = useAppContext();
  const [activeTab, setActiveTab] = useState<"workbuddy" | "codebuddy">("workbuddy");

  // WorkBuddy 练习状态
  const [wbStatus, setWbStatus] = useState(0);
  const [wbRunning, setWbRunning] = useState(false);
  const [wbResult, setWbResult] = useState(false);
  const wbInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // CodeBuddy 练习状态
  const [cbStatus, setCbStatus] = useState(0);
  const [cbRunning, setCbRunning] = useState(false);
  const [cbPlanApproved, setCbPlanApproved] = useState(false);
  const [cbShowDiff, setCbShowDiff] = useState(false);
  const [cbShowTerminal, setCbShowTerminal] = useState(false);
  const [cbTerminalRunning, setCbTerminalRunning] = useState(false);
  const [cbTerminalComplete, setCbTerminalComplete] = useState(false);
  const [cbComplete, setCbComplete] = useState(false);
  const cbInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // 清理
  useEffect(() => {
    return () => {
      if (wbInterval.current) clearInterval(wbInterval.current);
      if (cbInterval.current) clearInterval(cbInterval.current);
    };
  }, []);

  // WorkBuddy 练习开始
  const startWB = () => {
    setWbRunning(true);
    setWbStatus(0);
    setWbResult(false);
    wbInterval.current = setInterval(() => {
      setWbStatus((prev) => {
        if (prev >= workbuddyPracticeStatuses.length - 1) {
          if (wbInterval.current) clearInterval(wbInterval.current);
          setWbRunning(false);
          setWbResult(true);
          showToast("WorkBuddy 练习完成", "success");
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  // CodeBuddy 练习开始
  const startCB = () => {
    setCbStatus(0);
    setCbRunning(true);
    setCbPlanApproved(false);
    setCbShowDiff(false);
    setCbShowTerminal(false);
    setCbComplete(false);
  };

  const approveCBPlan = () => {
    setCbPlanApproved(true);
    cbInterval.current = setInterval(() => {
      setCbStatus((prev) => {
        if (prev >= codebuddyPlan.practiceStatuses.length - 2) {
          if (cbInterval.current) clearInterval(cbInterval.current);
          setCbRunning(false);
          setCbShowDiff(true);
          setCbShowTerminal(true);
          setCbComplete(true);
          showToast("CodeBuddy 练习完成", "success");
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  return (
    <AppLayout title="模拟练习" color="blue">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">模拟练习</h1>
        <p className="text-slate-500 mb-6">动手体验 WorkBuddy 和 CodeBuddy 的完整使用流程</p>

        {/* Tab 切换 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("workbuddy")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "workbuddy" ? "bg-cyan-500 text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            <Monitor className="w-4 h-4" /> WorkBuddy 练习
          </button>
          <button
            onClick={() => setActiveTab("codebuddy")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "codebuddy" ? "bg-violet-500 text-white" : "bg-white text-slate-600 border border-slate-200"
            }`}
          >
            <Code2 className="w-4 h-4" /> CodeBuddy 练习
          </button>
        </div>

        {/* WorkBuddy 练习 */}
        {activeTab === "workbuddy" && (
          <div className="space-y-6">
            {/* 会议纪要展示 */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">📄 模拟会议记录</h3>
              <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 font-mono whitespace-pre-wrap">
                {meetingMinutes.rawText}
              </div>
            </div>

            {/* 执行区 */}
            {!wbRunning && !wbResult && (
              <button
                onClick={startWB}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-xl font-medium hover:bg-cyan-600 transition-colors"
              >
                <Play className="w-5 h-5" /> 提交给 WorkBuddy
              </button>
            )}

            {wbRunning && (
              <ExecutionStatus statuses={workbuddyPracticeStatuses} currentIndex={wbStatus} />
            )}

            {wbResult && (
              <>
                <ResultPreview
                  conclusions={meetingMinutes.expectedResult.conclusions}
                  todos={meetingMinutes.expectedResult.todos}
                  risks={meetingMinutes.expectedResult.risks}
                  email={meetingMinutes.expectedResult.email}
                />
                <button
                  onClick={startWB}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50"
                >
                  <RotateCcw className="w-4 h-4" /> 重新练习
                </button>
              </>
            )}
          </div>
        )}

        {/* CodeBuddy 练习 */}
        {activeTab === "codebuddy" && (
          <div className="space-y-6">
            {/* 任务描述 */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">📋 开发任务</h3>
              <p className="text-sm text-slate-600">{codebuddyPlan.task}</p>
            </div>

            {/* 开始/执行区 */}
            {!cbRunning && !cbComplete && (
              <button
                onClick={startCB}
                className="flex items-center gap-2 px-6 py-3 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors"
              >
                <Play className="w-5 h-5" /> 提交给 CodeBuddy
              </button>
            )}

            {cbRunning && !cbPlanApproved && (
              <div className="space-y-4">
                <ExecutionStatus statuses={codebuddyPlan.practiceStatuses} currentIndex={cbStatus} />
                {cbStatus >= 2 && (
                  <TaskPlan
                    title={codebuddyPlan.plan.title}
                    steps={codebuddyPlan.plan.steps}
                    files={codebuddyPlan.plan.files}
                    onApprove={approveCBPlan}
                    approved={cbPlanApproved}
                  />
                )}
              </div>
            )}

            {cbRunning && cbPlanApproved && (
              <ExecutionStatus statuses={codebuddyPlan.practiceStatuses} currentIndex={cbStatus} />
            )}

            {cbShowDiff && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setCbShowDiff(true)}
                    className="px-3 py-1.5 text-xs font-medium bg-violet-500 text-white rounded-lg"
                  >
                    查看 Diff
                  </button>
                </div>
                <div className="h-60">
                  <DiffViewer diffLines={diffData["taskcard"] || []} fileName="TaskCard.tsx" />
                </div>
              </div>
            )}

            {cbShowTerminal && (
              <div className="h-48">
                <TerminalPanel
                  lines={codebuddyPlan.terminalOutput}
                  isRunning={cbTerminalRunning}
                  isComplete={cbTerminalComplete}
                  onStart={() => { setCbTerminalRunning(true); setTimeout(() => { setCbTerminalRunning(false); setCbTerminalComplete(true); }, codebuddyPlan.terminalOutput.length * 300); }}
                  onReset={() => { setCbTerminalRunning(false); setCbTerminalComplete(false); }}
                />
              </div>
            )}

            {cbComplete && (
              <button
                onClick={startCB}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50"
              >
                <RotateCcw className="w-4 h-4" /> 重新练习
              </button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
