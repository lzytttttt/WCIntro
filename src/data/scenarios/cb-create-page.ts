import type { CBScenarioDemoData } from "./types";
import type { FileNode, DiffLine } from "@/types";

const fileTree: FileNode[] = [
  {
    id: "src",
    name: "src",
    type: "directory",
    children: [
      {
        id: "components",
        name: "components",
        type: "directory",
        children: [
          { id: "taskcard", name: "TaskCard.tsx", type: "file", status: "modified" },
          { id: "taskboard", name: "TaskBoard.tsx", type: "file", status: "modified" },
          { id: "filterbar", name: "FilterBar.tsx", type: "file", status: "added" },
        ],
      },
      {
        id: "data",
        name: "data",
        type: "directory",
        children: [
          { id: "mocktasks", name: "mockTasks.ts", type: "file", status: "added" },
        ],
      },
      { id: "app", name: "App.tsx", type: "file", status: "modified" },
      { id: "main", name: "main.tsx", type: "file", status: "normal" },
    ],
  },
  { id: "packagejson", name: "package.json", type: "file", status: "normal" },
];

const codeSnippets: Record<string, string> = {
  taskcard: `import React from "react";

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800">{task.title}</h3>
        <StatusBadge
          status={task.status}
          onChange={(s) => onStatusChange(task.id, s)}
        />
      </div>
      <p className="text-sm text-slate-500 mb-3">{task.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">👤 {task.assignee}</span>
        <span className="text-xs text-slate-400">📅 {task.dueDate}</span>
      </div>
    </div>
  );
}`,
  taskboard: `import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import { FilterBar } from "./FilterBar";
import { mockTasks } from "../data/mockTasks";

export function TaskBoard() {
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState("all");

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const filtered = filter === "all"
    ? tasks
    : tasks.filter(t => t.assignee === filter);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 部门任务看板</h1>
      <FilterBar tasks={tasks} onFilter={setFilter} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {filtered.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}`,
  filterbar: `import React from "react";

interface FilterBarProps {
  tasks: Task[];
  onFilter: (assignee: string) => void;
}

export function FilterBar({ tasks, onFilter }: FilterBarProps) {
  const assignees = [...new Set(tasks.map(t => t.assignee))];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => onFilter("all")}
        className="px-3 py-1.5 text-sm rounded-lg font-medium
          bg-violet-500 text-white hover:bg-violet-600 transition-colors"
      >
        全部
      </button>
      {assignees.map(name => (
        <button
          key={name}
          onClick={() => onFilter(name)}
          className="px-3 py-1.5 text-sm rounded-lg
            bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          {name}
        </button>
      ))}
    </div>
  );
}`,
  mocktasks: `import type { Task } from "../types";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "课堂回放标注功能开发",
    description: "实现视频播放器时间轴上的文本标注功能",
    status: "in-progress",
    assignee: "李工",
    dueDate: "2026-07-20",
  },
  {
    id: "2",
    title: "学情数据面板UI开发",
    description: "根据设计稿实现学情数据统计面板",
    status: "todo",
    assignee: "小王",
    dueDate: "2026-07-18",
  },
  {
    id: "3",
    title: "录播服务器兼容性修复",
    description: "修复部分服务器型号下的推流兼容性问题",
    status: "in-progress",
    assignee: "李工",
    dueDate: "2026-07-15",
  },
  {
    id: "4",
    title: "课程管理列表页重构",
    description: "优化列表页性能，支持虚拟滚动加载",
    status: "done",
    assignee: "小张",
    dueDate: "2026-07-12",
  },
];`,
  app: `import React from "react";
import { TaskBoard } from "./components/TaskBoard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
      <TaskBoard />
    </div>
  );
}

export default App;`,
  main: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  packagejson: `{
  "name": "task-board",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.6.0",
    "vite": "^5.4.0"
  }
}`,
};

const diffItems: Record<string, DiffLine[]> = {
  taskcard: [
    { type: "added", content: `import React from "react";`, lineNumber: 1 },
    { type: "added", content: "", lineNumber: 2 },
    { type: "added", content: `interface TaskCardProps {`, lineNumber: 3 },
    { type: "added", content: `  task: Task;`, lineNumber: 4 },
    { type: "added", content: `  onStatusChange: (id: string, status: TaskStatus) => void;`, lineNumber: 5 },
    { type: "added", content: `}`, lineNumber: 6 },
    { type: "added", content: "", lineNumber: 7 },
    { type: "added", content: `export function TaskCard({ task, onStatusChange }: TaskCardProps) {`, lineNumber: 8 },
    { type: "added", content: `  return (`, lineNumber: 9 },
    { type: "added", content: `    <div className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">`, lineNumber: 10 },
    { type: "added", content: `      <div className="flex items-start justify-between mb-3">`, lineNumber: 11 },
    { type: "added", content: `        <h3 className="font-semibold text-slate-800">{task.title}</h3>`, lineNumber: 12 },
    { type: "added", content: `        <StatusBadge status={task.status} onChange={(s) => onStatusChange(task.id, s)} />`, lineNumber: 13 },
    { type: "added", content: `      </div>`, lineNumber: 14 },
    { type: "added", content: `      <p className="text-sm text-slate-500 mb-3">{task.description}</p>`, lineNumber: 15 },
    { type: "added", content: `      <div className="flex items-center justify-between">`, lineNumber: 16 },
    { type: "added", content: `        <span className="text-xs text-slate-400">👤 {task.assignee}</span>`, lineNumber: 17 },
    { type: "added", content: `        <span className="text-xs text-slate-400">📅 {task.dueDate}</span>`, lineNumber: 18 },
    { type: "added", content: `      </div>`, lineNumber: 19 },
    { type: "added", content: `    </div>`, lineNumber: 20 },
    { type: "added", content: `  );`, lineNumber: 21 },
    { type: "added", content: `}`, lineNumber: 22 },
  ],
  app: [
    { type: "unchanged", content: `import React from "react";`, lineNumber: 1 },
    { type: "added", content: `import { TaskBoard } from "./components/TaskBoard";`, lineNumber: 2 },
    { type: "unchanged", content: "", lineNumber: 3 },
    { type: "unchanged", content: `function App() {`, lineNumber: 4 },
    { type: "unchanged", content: `  return (`, lineNumber: 5 },
    { type: "deleted", content: `    <div className="min-h-screen bg-slate-50">`, lineNumber: 6 },
    { type: "added", content: `    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">`, lineNumber: 7 },
    { type: "added", content: `      <TaskBoard />`, lineNumber: 8 },
    { type: "unchanged", content: `    </div>`, lineNumber: 9 },
    { type: "unchanged", content: `  );`, lineNumber: 10 },
    { type: "unchanged", content: `}`, lineNumber: 11 },
    { type: "unchanged", content: "", lineNumber: 12 },
    { type: "unchanged", content: `export default App;`, lineNumber: 13 },
  ],
};

const terminalOutputs: string[][] = [
  [
    "$ npm install",
    "",
    "added 142 packages, and audited 143 packages in 12s",
    "",
    "26 packages are looking for funding",
    "  run `npm fund` for details",
    "",
    "found 0 vulnerabilities",
  ],
  [
    "$ npm run dev",
    "",
    "> task-board@1.0.0 dev",
    "> vite",
    "",
    "  VITE v5.4.11  ready in 348 ms",
    "",
    "  ➜  Local:   http://localhost:5173/",
    "  ➜  Network: http://192.168.1.100:5173/",
  ],
  [
    "$ npm run build",
    "",
    "> task-board@1.0.0 build",
    "> tsc && vite build",
    "",
    "vite v5.4.11 building for production...",
    "✓ 42 modules transformed.",
    "dist/index.html                   0.49 kB │ gzip: 0.34 kB",
    "dist/assets/index-xxx.css         3.21 kB │ gzip: 1.12 kB",
    "dist/assets/index-xxx.js         45.67 kB │ gzip: 15.23 kB",
    "✓ built in 2.14s",
  ],
];

export const cbCreatePageData: CBScenarioDemoData = {
  scenarioName: "创建前端页面",
  scenarioDescription: "根据UI描述快速生成完整的React/Vue页面组件，包含样式和基础交互",
  scenarioIcon: "🎨",
  fileTree,
  codeSnippets,
  diffData: diffItems,
  terminalOutputs,
  plan: {
    title: "部门任务看板开发计划",
    task: "使用 React 和 TypeScript 开发一个部门任务看板，支持任务新增、状态切换、负责人筛选和本地数据保存。",
    analysis: `项目分析完成：
- 当前项目：Vite + React 18 + TypeScript
- 无现有组件，需要从头搭建
- 建议文件结构：components/ 下放置业务组件，data/ 下放置 Mock 数据`,
    steps: [
      "1. 创建类型定义文件 types/index.ts",
      "2. 创建 Mock 数据文件 data/mockTasks.ts",
      "3. 开发 TaskCard 组件（任务卡片，含状态切换和悬停动效）",
      "4. 开发 FilterBar 组件（负责人筛选栏）",
      "5. 开发 TaskBoard 组件（看板主组件，含响应式网格布局）",
      "6. 修改 App.tsx 集成看板组件并添加渐变背景",
      "7. 安装依赖并构建验证",
    ],
    files: [
      { file: "src/types/index.ts", action: "创建", description: "定义 Task 和 TaskStatus 类型" },
      { file: "src/data/mockTasks.ts", action: "创建", description: "模拟4条部门任务数据" },
      { file: "src/components/TaskCard.tsx", action: "创建", description: "任务卡片：标题/描述/状态/负责人/截止日期" },
      { file: "src/components/FilterBar.tsx", action: "创建", description: "筛选栏：按负责人筛选，活跃态高亮" },
      { file: "src/components/TaskBoard.tsx", action: "创建", description: "看板主组件：组合 TaskCard 和 FilterBar" },
      { file: "src/App.tsx", action: "修改", description: "引入 TaskBoard，添加渐变背景" },
    ],
  },
  practiceStatuses: [
    "正在扫描项目文件...",
    "正在分析组件结构...",
    "正在制定开发计划...",
    "正在创建类型定义...",
    "正在编写 TaskCard 组件...",
    "正在编写 FilterBar 组件...",
    "正在编写 TaskBoard 组件...",
    "正在修改 App.tsx...",
    "正在安装依赖...",
    "正在执行构建...",
    "检查结果中...",
    "任务完成 ✓",
  ],
  chatMessages: [
    {
      id: "msg-1",
      role: "user",
      content: "使用 React 和 TypeScript 开发一个部门任务看板，支持任务新增、状态切换、负责人筛选和本地数据保存。",
      timestamp: "10:05",
    },
    {
      id: "msg-2",
      role: "assistant",
      content: "正在分析项目结构...\n检测到 Vite + React 18 + TypeScript 项目...\n正在制定开发计划...",
      timestamp: "10:06",
      isStreaming: true,
    },
  ],
  buildVerification: {
    checks: [
      { label: "TypeScript 编译检查", passed: true, detail: "0 errors, 0 warnings" },
      { label: "Vite 生产构建", passed: true, detail: "42 modules, built in 2.14s" },
      { label: "ESLint 代码检查", passed: true, detail: "0 errors, 0 warnings" },
      { label: "开发服务器启动", passed: true, detail: "ready in 348ms" },
    ],
    bundleSize: { raw: "45.67 kB", gzip: "15.23 kB" },
    buildTime: "2.14s",
    previewUrl: "http://localhost:5173",
    previewTitle: "任务看板 — 开发预览",
  },
  iterationData: {
    problemHint: "小李发现：点击 FilterBar 中的负责人名字后，任务列表没有正确筛选。怀疑 FilterBar 的状态没有同步到 TaskBoard。",
    rounds: [
      {
        userMessage: "FilterBar 筛选负责人后，TaskBoard 没有响应筛选结果。FilterBar 的 onChange 回调没有正确传递到 TaskBoard。",
        aiResponse: "收到，正在检查 FilterBar 和 TaskBoard 之间的数据流...\n\n发现问题：FilterBar 内部的 selectedAssignee 是独立 state，没有通过 props 受控。修复方案是将 FilterBar 改为完全受控组件，由 TaskBoard 统一管理筛选状态。\n\n正在修改 FilterBar.tsx...",
        fixFiles: ["filterbar", "taskboard"],
        fixSnippets: {},
      },
      {
        userMessage: "修复后筛选功能正常了！但我还想让任务卡片在状态切换时有一个过渡动画效果。",
        aiResponse: "好的，为 TaskCard 添加状态切换过渡动画。\n\n使用 CSS transition + transform 实现卡片在状态变化时的平滑过渡效果。同时在 StatusBadge 切换时添加轻微的缩放动画。\n\n修改已完成，刷新页面即可看到效果。",
        fixFiles: ["taskcard"],
        fixSnippets: {},
      },
    ],
  },
  completionSummary: {
    features: [
      "任务卡片展示（标题、描述、状态、负责人、截止日期）",
      "状态切换（待办 → 进行中 → 已完成，带过渡动画）",
      "负责人筛选（点击 FilterBar 按人筛选任务）",
      "响应式网格布局（适配不同屏幕尺寸）",
      "悬停效果（卡片阴影提升 + 进度条提示）",
      "本地 Mock 数据驱动",
    ],
    stats: {
      filesCreated: 5,
      filesModified: 1,
      filesDeleted: 0,
      linesAdded: 320,
      linesRemoved: 12,
    },
    tips: [
      "明确列出功能清单（新增、状态切换、筛选），AI 才能一次生成完整方案",
      "要求 AI 先输出实施计划再写代码，方向不对可以及时纠正",
      "单次功能范围控制在 3-6 个文件，分批实现更可控",
      "让 AI 同时写组件和对应样式，保证 UI 一致性",
    ],
  },
};
