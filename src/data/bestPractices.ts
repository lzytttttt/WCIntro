import type { BestPractice } from "@/types";

export const bestPractices: BestPractice[] = [
  // WorkBuddy 最佳实践
  {
    id: "wb-1",
    title: "明确任务目标",
    description: "在提出任务时清晰说明目标：要做什么、给谁看、用在什么场景。目标越具体，AI 输出越精准。",
    isRecommended: true,
    tool: "workbuddy",
  },
  {
    id: "wb-2",
    title: "提供必要上下文",
    description: "简要说明任务背景和相关约束，但不要长篇大论。一两句关键背景信息比大段无关描述更有效。",
    isRecommended: true,
    tool: "workbuddy",
  },
  {
    id: "wb-3",
    title: "指定输出格式",
    description: "明确要求输出格式（列表、表格、邮件、报告），可以让结果更符合预期，减少后续调整。",
    isRecommended: true,
    tool: "workbuddy",
  },
  {
    id: "wb-4",
    title: "重要信息人工核验",
    description: "AI 生成的人名、数字、日期、数据等需要对照原始材料核实。不要将未核验的内容直接用于重要场合。",
    isRecommended: true,
    tool: "workbuddy",
  },
  {
    id: "wb-5",
    title: "多轮对话逐步优化",
    description: "第一版输出不满意？告诉 AI 具体哪里需要调整。逐条修改比一次提所有要求效果更好。",
    isRecommended: true,
    tool: "workbuddy",
  },
  {
    id: "wb-6",
    title: "敏感信息脱敏处理",
    description: "不要将客户联系方式、合同金额、人事信息等敏感数据直接放入 Prompt。必要时用代号替代。",
    isRecommended: true,
    tool: "workbuddy",
  },
  // WorkBuddy 不推荐
  {
    id: "wb-not-1",
    title: "模糊描述任务",
    description: "只说「帮我写个报告」而不说明报告的类型、受众和用途，AI 只能猜测，结果往往不适用。",
    isRecommended: false,
    tool: "workbuddy",
  },
  {
    id: "wb-not-2",
    title: "把 AI 输出当终稿",
    description: "不经检查和调整就直接使用 AI 输出，可能包含事实错误或不合适的表达。",
    isRecommended: false,
    tool: "workbuddy",
  },

  // CodeBuddy 最佳实践
  {
    id: "cb-1",
    title: "先让 AI 阅读项目结构",
    description: "在提需求前，让 AI 先读取项目文件，了解技术栈和代码架构。这能避免方案与项目不兼容。",
    isRecommended: true,
    tool: "codebuddy",
  },
  {
    id: "cb-2",
    title: "复杂任务先输出计划",
    description: "让 AI 在写代码前先输出实施计划，确认方向正确后再动手，避免写完才发现走偏。",
    isRecommended: true,
    tool: "codebuddy",
  },
  {
    id: "cb-3",
    title: "控制单次修改范围",
    description: "一次聚焦一个功能或一个文件，避免一次改太多导致难以排查问题。分步推进更可控。",
    isRecommended: true,
    tool: "codebuddy",
  },
  {
    id: "cb-4",
    title: "修改后检查 Diff",
    description: "养成看 Diff 的习惯，理解改了什么。重点关注逻辑变更、API 调用、配置文件修改。",
    isRecommended: true,
    tool: "codebuddy",
  },
  {
    id: "cb-5",
    title: "运行测试和构建验证",
    description: "每次改动后运行构建和测试，确保没有引入新问题。尽早发现比事后排查省时间。",
    isRecommended: true,
    tool: "codebuddy",
  },
  {
    id: "cb-6",
    title: "重要代码必须人工 Review",
    description: "AI 生成的代码可能有逻辑漏洞、安全问题或不符合团队规范，核心代码务必 Code Review。",
    isRecommended: true,
    tool: "codebuddy",
  },
  {
    id: "cb-7",
    title: "永远不要在 Prompt 中放置密钥",
    description: "API Key、数据库密码、Token 等在任何情况下都不应该放在 Prompt 或代码注释中。",
    isRecommended: true,
    tool: "codebuddy",
  },
  {
    id: "cb-8",
    title: "不直接执行不理解的命令",
    description: "AI 建议的终端命令，如果不理解其作用，先问清楚再决定是否执行。安全第一。",
    isRecommended: true,
    tool: "codebuddy",
  },
  // CodeBuddy 不推荐
  {
    id: "cb-not-1",
    title: "直接粘贴报错不提供上下文",
    description: "只贴错误信息而不说明在什么操作下出现、当前项目环境等信息，AI 难以准确诊断。",
    isRecommended: false,
    tool: "codebuddy",
  },
  {
    id: "cb-not-2",
    title: "盲目信任 AI 的所有建议",
    description: "不检查 AI 的代码就直接运行或合并，可能引入安全漏洞或不合理的架构设计。",
    isRecommended: false,
    tool: "codebuddy",
  },
];
