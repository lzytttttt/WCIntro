export const codebuddyPlan = {
  task: "使用 React 和 TypeScript 开发一个部门任务看板，支持任务新增、状态切换、负责人筛选和本地数据保存。",
  analysis: `项目分析完成：
- 当前项目：Vite + React 18 + TypeScript
- 无现有组件，需要从头搭建
- 建议文件结构：components/ 下放置业务组件，data/ 下放置 Mock 数据`,
  plan: {
    title: "部门任务看板开发计划",
    steps: [
      "1. 创建类型定义文件 types/index.ts",
      "2. 创建 Mock 数据文件 data/mockTasks.ts",
      "3. 开发 TaskCard 组件（任务卡片）",
      "4. 开发 FilterBar 组件（筛选栏）",
      "5. 开发 TaskBoard 组件（看板主组件）",
      "6. 修改 App.tsx 集成看板组件",
      "7. 安装依赖并构建验证",
    ],
    files: [
      { file: "src/types/index.ts", action: "创建", description: "定义 Task 和 TaskStatus 类型" },
      { file: "src/data/mockTasks.ts", action: "创建", description: "模拟4条部门任务数据" },
      { file: "src/components/TaskCard.tsx", action: "创建", description: "任务卡片：展示标题/描述/状态/负责人/截止日期" },
      { file: "src/components/FilterBar.tsx", action: "创建", description: "筛选栏：按负责人筛选任务" },
      { file: "src/components/TaskBoard.tsx", action: "创建", description: "看板主组件：组合 TaskCard 和 FilterBar" },
      { file: "src/App.tsx", action: "修改", description: "引入 TaskBoard 组件" },
    ],
  },
  // CodeBuddy 练习执行状态
  practiceStatuses: [
    "正在扫描项目文件...",
    "正在分析组件结构...",
    "正在制定开发计划...",
    "正在修改文件...",
    "正在安装依赖...",
    "正在执行构建...",
    "检查结果中...",
    "任务完成 ✓",
  ],
  // 终端模拟
  terminalOutput: [
    "$ npm install",
    "",
    "added 142 packages in 12s",
    "found 0 vulnerabilities",
    "",
    "$ npm run build",
    "",
    "> tsc && vite build",
    "vite v5.4.11 building...",
    "✓ 42 modules transformed.",
    "✓ built in 2.1s",
  ],
};
