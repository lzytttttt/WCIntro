export const learningSummary = {
  workbuddyFlow: "描述场景 → 明确目标 → 提供材料 → 查看执行 → 检查结果 → 迭代优化 → 导出交付",
  codebuddyFlow: "打开项目 → 描述需求 → 分析结构 → 查看计划 → 生成代码 → 检查Diff → 运行验证 → 迭代修复 → 完成",
  toolSelection: {
    rule: "先问三个问题：涉及代码？需要操作项目文件？产出是代码还是文档？",
    shortCut: "代码相关 → CodeBuddy | 文档分析 → WorkBuddy | 两者结合 → 先用 WorkBuddy 理思路，再用 CodeBuddy 写代码",
  },
  promptFormula: "角色 + 目标 + 背景 + 输入材料 + 约束条件 + 输出格式 + 验收标准 = 高效 Prompt",
  risks: [
    "不要输入敏感信息（密钥、密码、客户隐私数据）",
    "AI 输出需要人工核验，不是最终版本",
    "不理解的终端命令不要执行",
    "重要代码必须经过 Code Review",
    "单次不要改太多文件，分步推进更可控",
  ],
  modules: [
    "首页",
    "WorkBuddy 入门",
    "CodeBuddy 入门",
    "部门角色指南",
    "场景选择",
    "Prompt 教学",
    "模拟练习",
    "最佳实践",
    "学习总结",
  ],
};
