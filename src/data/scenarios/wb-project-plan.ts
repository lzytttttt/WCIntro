import type { WBScenarioDemoData } from "./types";

export const wbProjectPlanData: WBScenarioDemoData = {
  scenarioName: "项目计划拆解",
  scenarioDescription: "将大目标拆分为可执行的阶段性任务，明确里程碑、时间节点和资源需求",
  scenarioIcon: "🗂️",
  chatMessages: [
    {
      id: "msg-1",
      role: "user",
      content: "我们计划用3个月（7-9月）完成教研平台V3.0的升级，主要目标是上线课堂回放标注和学情数据面板。请帮我把这个大目标拆解成月度里程碑和具体任务，标注负责人和关键节点。",
      timestamp: "09:40",
    },
    {
      id: "msg-2",
      role: "user",
      content: "背景：研发4人、测试2人、设计1人。8月底前要完成核心功能开发，9月做联调和试点学校灰度，9月底正式上线。",
      timestamp: "09:41",
    },
    {
      id: "msg-3",
      role: "assistant",
      content: "正在理解项目目标与资源...\n已识别3个月周期与团队规模...\n正在拆解里程碑...\n正在分配任务与节点...",
      timestamp: "09:42",
      isStreaming: true,
    },
    {
      id: "msg-4",
      role: "assistant",
      content: "## 🗂️ 教研平台V3.0 项目计划（7-9月）\n\n### 里程碑一：需求与设计（7月）\n- 完成PRD与UI设计定稿（设计/产品，7.15前）\n- 视频时间轴组件技术方案评审（研发，7.25前）\n\n### 里程碑二：核心开发（8月）\n- 课堂回放标注功能开发（研发，8.20前）\n- 学情数据面板开发（研发，8.25前）\n- 联调与内部自测启动（研发+测试，8.31前）\n\n### 里程碑三：联调与上线（9月）\n- 试点学校灰度（测试+产品，9.15前）\n- 问题修复与优化（全员，9.25前）\n- 正式上线（9.30）\n\n### 关键风险\n- 视频时间轴组件稳定性是最大不确定项，建议7月优先攻关",
      timestamp: "09:43",
    },
  ],
  executionStatuses: [
    "正在解析项目目标与周期...",
    "正在评估团队资源...",
    "正在拆解月度里程碑...",
    "正在分配任务与负责人...",
    "正在识别关键节点与风险...",
    "项目计划生成完成 ✓",
  ],
  resultData: {
    conclusions: [
      "项目分三个里程碑：需求设计(7月)、核心开发(8月)、联调上线(9月)",
      "8月底前须完成两大核心功能开发",
      "9月15日试点灰度、9月30日正式上线",
      "视频时间轴组件稳定性是最大风险，建议7月优先攻关",
    ],
    conclusionsTitle: "里程碑概览",
    todos: [
      { task: "完成PRD与UI设计定稿", assignee: "设计/产品", deadline: "7.15", priority: "高" },
      { task: "视频时间轴组件技术方案评审", assignee: "研发", deadline: "7.25", priority: "高" },
      { task: "课堂回放标注功能开发", assignee: "研发", deadline: "8.20", priority: "高" },
      { task: "学情数据面板开发", assignee: "研发", deadline: "8.25", priority: "高" },
      { task: "试点学校灰度", assignee: "测试+产品", deadline: "9.15", priority: "中" },
      { task: "正式上线", assignee: "全员", deadline: "9.30", priority: "高" },
    ],
    risks: [
      "视频时间轴组件稳定性不确定，可能拖累整体进度",
      "试点灰度发现问题若集中，9月修复窗口偏紧",
    ],
  },
  modificationPrompt: "请在里程碑二增加一条：8.10前完成标注与面板模块的接口联调对齐，避免后期返工。",
};
