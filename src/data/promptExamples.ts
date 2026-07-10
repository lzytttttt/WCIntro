export const promptExamples = {
  bad: {
    prompt: "帮我做一个页面。",
    analysis: "这个 Prompt 信息严重不足：没有说明页面做什么、用什么技术、有什么功能要求、期望什么风格。AI 只能猜测，结果大概率不符合预期。",
    issues: ["缺少技术栈说明", "缺少功能描述", "没有输出格式要求", "没有约束条件"],
  },
  good: {
    prompt:
      "请使用 React 和 TypeScript 开发一个部门任务看板。页面需要支持任务新增、状态切换和负责人筛选，数据保存在 localStorage 中。整体使用简洁的企业管理后台风格，不接入后端。请先分析需求并给出实施计划，再开始编写代码。",
    analysis:
      "这个优化后的 Prompt 包含了技术栈（React+TS）、核心功能（新增/切换/筛选）、数据方案（localStorage）、风格要求（企业管理后台）、约束条件（不接后端）和执行方式（先计划后实施）。每个关键信息都对 AI 的理解和输出质量有帮助。",
    strengths: [
      "明确技术栈：AI 知道使用 React 和 TypeScript",
      "具体的功能列表：新增、状态切换、筛选，逐一列出",
      "数据存储方案：localStorage，避免复杂后端",
      "风格要求：简洁企业管理后台风格",
      "约束条件：不接入后端",
      "执行方式：先计划后执行，提高可控性",
    ],
  },
};

// 三步优化对比
export const optimizationComparison = [
  {
    level: "第一步：说清做什么",
    before: "帮我整理会议。",
    after: "帮我整理今天下午产品评审会的会议纪要，提炼出关键结论和每个人的待办事项。",
    reason: "从模糊的「整理会议」变为具体的「整理纪要、提炼结论、列出待办」，AI 知道了精确任务。",
  },
  {
    level: "第二步：补充背景和材料",
    before: "帮我整理今天下午产品评审会的会议纪要。",
    after:
      "帮我整理今天下午产品评审会的会议纪要，这是教研平台V3.0的阶段会议，我粘贴了会议转录文本。请提炼关键结论和待办事项。",
    reason: "增加了业务背景（V3.0）和输入材料（转录文本），AI 有了更丰富的上下文来做判断。",
  },
  {
    level: "第三步：指定输出格式和标准",
    before:
      "帮我整理今天下午产品评审会的会议纪要，提炼关键结论和待办事项，这是会议转录文本：{文本}",
    after:
      "请根据以下会议转录文本，整理出：1）核心结论（3-5条）2）待办事项表格（含负责人和截止时间）3）会后同步邮件（正式语气、300字以内）。这是教研平台V3.0阶段评审会。转录文本：{文本}",
    reason: "指定了输出结构、数量和格式标准，AI 的输出可以几乎不需要再调整格式。",
  },
];

export const promptStructure = [
  { element: "角色", description: "告诉 AI 它扮演什么角色，如「你是一名产品经理」", icon: "User" },
  { element: "目标", description: "清晰描述要完成什么任务", icon: "Target" },
  { element: "背景", description: "提供任务相关的背景信息和上下文", icon: "Info" },
  { element: "输入材料", description: "附上需要处理的数据、文本或参考资料", icon: "FileText" },
  { element: "约束条件", description: "明确限制条件：不做什么、用什么技术、有无字数限制", icon: "Shield" },
  { element: "输出格式", description: "指定输出结构：列表、表格、邮件、报告等", icon: "Layout" },
  { element: "验收标准", description: "说明怎样才算合格：准确性、完整性、风格等", icon: "CheckCircle" },
];
