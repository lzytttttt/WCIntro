export const codeSnippets: Record<string, string> = {
  "taskcard": `import React from "react";

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800">{task.title}</h3>
        <StatusBadge status={task.status} onChange={(s) => onStatusChange(task.id, s)} />
      </div>
      <p className="text-sm text-slate-500 mb-3">{task.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{task.assignee}</span>
        <span className="text-xs text-slate-400">{task.dueDate}</span>
      </div>
    </div>
  );
}`,
  "taskboard": `import React, { useState } from "react";
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
      <h1 className="text-2xl font-bold mb-6">部门任务看板</h1>
      <FilterBar tasks={tasks} onFilter={setFilter} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {filtered.map(task => (
          <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
        ))}
      </div>
    </div>
  );
}`,
  "filterbar": `import React from "react";

interface FilterBarProps {
  tasks: Task[];
  onFilter: (assignee: string) => void;
}

export function FilterBar({ tasks, onFilter }: FilterBarProps) {
  const assignees = [...new Set(tasks.map(t => t.assignee))];

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onFilter("all")}
        className="px-3 py-1.5 text-sm rounded-md bg-slate-100 hover:bg-slate-200"
      >
        全部
      </button>
      {assignees.map(name => (
        <button
          key={name}
          onClick={() => onFilter(name)}
          className="px-3 py-1.5 text-sm rounded-md bg-slate-100 hover:bg-slate-200"
        >
          {name}
        </button>
      ))}
    </div>
  );
}`,
  "mocktasks": `import { Task } from "../types";

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
];
`,
  "app": `import React from "react";
import { TaskBoard } from "./components/TaskBoard";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TaskBoard />
    </div>
  );
}

export default App;
`,
  "main": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
  "packagejson": `{
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
