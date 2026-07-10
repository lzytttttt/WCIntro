import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Monitor, Code2, HelpCircle } from "lucide-react";

const questions = [
  {
    id: "q1",
    question: "你的任务是否涉及代码？",
    options: [
      { value: "yes", label: "涉及代码编写或修改" },
      { value: "no", label: "不涉及代码" },
    ],
  },
  // The remaining questions are dynamically shown based on answers
];

export function ToolSelector() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showingResult, setShowingResult] = useState(false);

  const allQuestions = [
    {
      id: "q1",
      question: "你的任务是否涉及代码？",
      options: [
        { value: "yes", label: "是，涉及代码编写或修改", icon: Code2 },
        { value: "no", label: "否，不涉及代码", icon: Monitor },
      ],
    },
    {
      id: "q2",
      question: "是否需要读取、修改或生成项目文件？",
      options: [
        { value: "yes", label: "是，需要操作项目文件", icon: Code2 },
        { value: "no", label: "否，不需要操作文件", icon: Monitor },
      ],
    },
    {
      id: "q3",
      question: "主要产出是文档/分析内容，还是可运行代码？",
      options: [
        { value: "doc", label: "文档或分析内容", icon: Monitor },
        { value: "code", label: "可运行代码", icon: Code2 },
      ],
    },
  ];

  const currentQ = allQuestions[step];

  const handleAnswer = (qId: string, value: string) => {
    const newAnswers = { ...answers, [qId]: value };
    setAnswers(newAnswers);

    if (step < allQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setShowingResult(true);
    }
  };

  const getRecommendation = () => {
    const q1 = answers.q1;
    const q2 = answers.q2;
    const q3 = answers.q3;

    if (q1 === "yes" && q2 === "yes" && q3 === "code") {
      return {
        tool: "CodeBuddy",
        color: "violet",
        reason: "您的任务涉及代码编写、项目文件操作，产出为可运行代码——这正是 CodeBuddy 擅长的领域。它能直接读取项目结构、生成代码、操作文件。",
        link: "/codebuddy",
      };
    }
    if (q1 === "no" && q3 === "doc") {
      return {
        tool: "WorkBuddy",
        color: "cyan",
        reason: "您的任务以文档和内容处理为主，不涉及代码——WorkBuddy 是最佳选择。它擅长整理信息、撰写文档、分析内容。",
        link: "/workbuddy",
      };
    }
    if (q2 === "yes") {
      return {
        tool: "CodeBuddy + WorkBuddy",
        color: "indigo",
        reason: "建议先用 WorkBuddy 梳理需求和文档，再用 CodeBuddy 进行实际的代码实现。两者配合使用效率最高。",
        link: "/scenarios",
      };
    }
    return {
      tool: "WorkBuddy",
      color: "cyan",
      reason: "综合来看，WorkBuddy 更适合您的任务类型。它可以帮助您高效处理文档和内容分析工作。",
      link: "/workbuddy",
    };
  };

  const result = showingResult ? getRecommendation() : null;

  if (showingResult && result) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-fade-in max-w-lg mx-auto">
        <div className="text-center mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-${result.color}-100 flex items-center justify-center mx-auto mb-3`}>
            {result.tool.includes("CodeBuddy") ? (
              <Code2 className={`w-8 h-8 text-${result.color}-500`} />
            ) : (
              <Monitor className={`w-8 h-8 text-${result.color}-500`} />
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            推荐使用：<span className={`text-${result.color}-500`}>{result.tool}</span>
          </h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">{result.reason}</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(result.link)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-${result.color}-500 text-white text-sm font-medium rounded-lg hover:bg-${result.color}-600 transition-colors`}
          >
            开始学习 <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setStep(0); setAnswers({}); setShowingResult(false); }}
            className="px-4 py-2.5 border border-slate-200 text-slate-600 text-sm rounded-lg hover:bg-slate-50 transition-colors"
          >
            重新选择
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-lg mx-auto animate-fade-in">
      <div className="flex items-center gap-2 mb-1">
        <HelpCircle className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-bold text-slate-800">工具选择器</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">回答几个问题，帮您找到最合适的工具</p>

      {/* 进度指示 */}
      <div className="flex gap-1 mb-6">
        {allQuestions.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary-500" : "bg-slate-200"}`} />
        ))}
      </div>

      {/* 当前问题 */}
      <h4 className="text-sm font-semibold text-slate-700 mb-3">{currentQ.question}</h4>
      <div className="space-y-2">
        {currentQ.options.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => handleAnswer(currentQ.id, opt.value)}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
            >
              <div className="p-1.5 rounded-md bg-slate-100">
                <Icon className="w-5 h-5 text-slate-500" />
              </div>
              <span className="text-sm font-medium text-slate-700">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
