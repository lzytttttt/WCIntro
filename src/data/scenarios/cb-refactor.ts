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
          { id: "dashboard", name: "Dashboard.tsx", type: "file", status: "deleted" },
          { id: "statsummary", name: "StatSummary.tsx", type: "file", status: "added" },
          { id: "chartpanel", name: "ChartPanel.tsx", type: "file", status: "added" },
          { id: "datatable", name: "DataTable.tsx", type: "file", status: "added" },
          { id: "dashboardcontainer", name: "DashboardContainer.tsx", type: "file", status: "added" },
        ],
      },
      {
        id: "hooks",
        name: "hooks",
        type: "directory",
        children: [
          { id: "usedashboard", name: "useDashboard.ts", type: "file", status: "added" },
        ],
      },
      { id: "app", name: "App.tsx", type: "file", status: "modified" },
    ],
  },
  { id: "packagejson", name: "package.json", type: "file", status: "normal" },
];

const codeSnippets: Record<string, string> = {
  dashboard: `// ❌ 重构前：400+ 行的 Dashboard 组件，职责混乱
import React, { useState, useEffect } from "react";
import { fetchStats, fetchChart, fetchTable } from "../api";

export function Dashboard() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState("week");
  const [selectedMetric, setSelectedMetric] = useState("views");

  // 所有数据逻辑混在组件里...
  useEffect(() => {
    async function loadAll() {
      try {
        const [s, c, t] = await Promise.all([
          fetchStats(dateRange),
          fetchChart(selectedMetric),
          fetchTable(dateRange, selectedMetric),
        ]);
        setStats(s);
        setChartData(c);
        setTableData(t);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, [dateRange, selectedMetric]);

  // 以下省略 300+ 行 JSX...`,
  statsummary: `import React from "react";
import { TrendingUp, Users, PlayCircle, Clock } from "lucide-react";

interface StatSummaryProps {
  stats: {
    totalViews: number;
    totalUsers: number;
    avgWatchTime: number;
    completionRate: number;
  };
  loading: boolean;
}

export function StatSummary({ stats, loading }: StatSummaryProps) {
  const items = [
    { label: "总观看量", value: stats.totalViews, icon: PlayCircle, color: "text-cyan-500" },
    { label: "活跃用户", value: stats.totalUsers, icon: Users, color: "text-violet-500" },
    { label: "均观看时长", value: \`\${stats.avgWatchTime}min\`, icon: Clock, color: "text-amber-500" },
    { label: "完播率", value: \`\${stats.completionRate}%\`, icon: TrendingUp, color: "text-green-500" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <item.icon className={\`w-5 h-5 \${item.color}\`} />
            <span className="text-xs text-slate-500">{item.label}</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">
            {loading ? "..." : item.value}
          </div>
        </div>
      ))}
    </div>
  );
}`,
  chartpanel: `import React from "react";
import { BarChart3 } from "lucide-react";

interface ChartPanelProps {
  data: { label: string; value: number }[];
  title: string;
  loading: boolean;
}

export function ChartPanel({ data, title, loading }: ChartPanelProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-violet-500" />
        <h3 className="font-semibold text-slate-700">{title}</h3>
      </div>
      {loading ? (
        <div className="text-sm text-slate-400 py-8 text-center">加载中...</div>
      ) : (
        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-20 truncate">{item.label}</span>
              <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-all duration-500"
                  style={{ width: \`\${(item.value / maxValue) * 100}%\` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-600 w-10 text-right">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`,
  usedashboard: `import { useState, useEffect, useCallback } from "react";

interface DashboardData {
  stats: { totalViews: number; totalUsers: number; avgWatchTime: number; completionRate: number };
  chart: { label: string; value: number }[];
  table: { name: string; views: number; rate: number; trend: string }[];
}

export function useDashboard(dateRange: string, metric: string) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // 模拟 API 请求
      await new Promise(r => setTimeout(r, 800));
      setData({
        stats: { totalViews: 28450, totalUsers: 3420, avgWatchTime: 28, completionRate: 76 },
        chart: [
          { label: "语文", value: 5200 },
          { label: "数学", value: 4800 },
          { label: "英语", value: 3900 },
          { label: "物理", value: 2100 },
          { label: "化学", value: 1800 },
        ],
        table: [
          { name: "张老师-语文公开课", views: 2340, rate: 92, trend: "↑12%" },
          { name: "李老师-数学示范课", views: 1890, rate: 85, trend: "↑8%" },
          { name: "王老师-英语研讨课", views: 1560, rate: 78, trend: "↓3%" },
          { name: "陈老师-物理实验课", views: 1320, rate: 81, trend: "↑15%" },
        ],
      });
    } catch (e) {
      setError("数据加载失败");
    } finally {
      setLoading(false);
    }
  }, [dateRange, metric]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}`,
};

const diffItems: Record<string, DiffLine[]> = {
  dashboard: [
    { type: "deleted", content: `// ❌ 重构前：400+ 行的 Dashboard 组件`, lineNumber: 1 },
    { type: "deleted", content: `import React, { useState, useEffect } from "react";`, lineNumber: 2 },
    { type: "deleted", content: `import { fetchStats, fetchChart, fetchTable } from "../api";`, lineNumber: 3 },
    { type: "deleted", content: ``, lineNumber: 4 },
    { type: "deleted", content: `export function Dashboard() {`, lineNumber: 5 },
    { type: "deleted", content: `  // ... 400+ 行混合逻辑和 UI`, lineNumber: 6 },
    { type: "deleted", content: `}`, lineNumber: 7 },
  ],
  statsummary: [
    { type: "added", content: `import React from "react";`, lineNumber: 1 },
    { type: "added", content: `import { TrendingUp, Users, PlayCircle, Clock } from "lucide-react";`, lineNumber: 2 },
    { type: "added", content: ``, lineNumber: 3 },
    { type: "added", content: `// ✅ 数据统计摘要组件`, lineNumber: 4 },
    { type: "added", content: `export function StatSummary({ stats, loading }: StatSummaryProps) {`, lineNumber: 5 },
    { type: "added", content: `  // ... 清晰的统计卡片展示`, lineNumber: 6 },
    { type: "added", content: `}`, lineNumber: 7 },
  ],
};

const terminalOutputs: string[][] = [
  [
    "$ tree src/components/",
    "",
    "src/components/",
    "├── StatSummary.tsx     (新建)",
    "├── ChartPanel.tsx      (新建)",
    "├── DataTable.tsx       (新建)",
    "├── DashboardContainer.tsx (新建)",
    "└── Dashboard.tsx       (已删除)",
    "",
    "src/hooks/",
    "└── useDashboard.ts    (新建)",
  ],
  [
    "$ npm run build",
    "",
    "> course-platform@2.0.0 build",
    "> tsc && vite build",
    "",
    "vite v5.4.11 building for production...",
    "✓ 62 modules transformed.",
    "dist/index.html   0.51 kB │ gzip: 0.35 kB",
    "dist/assets/index-xxx.js  48.21 kB │ gzip: 16.72 kB",
    "✓ built in 1.92s",
    "",
    "✅ 重构完成：代码体积减少 15%，组件职责清晰，可维护性大幅提升",
  ],
];

export const cbRefactorData: CBScenarioDemoData = {
  scenarioName: "代码重构",
  scenarioDescription: "优化代码结构、提取公共逻辑、改善可读性和可维护性，不改变外部行为",
  scenarioIcon: "🔧",
  fileTree,
  codeSnippets,
  diffData: diffItems,
  terminalOutputs,
  plan: {
    title: "Dashboard 组件重构计划",
    task: "当前 Dashboard 组件有 400+ 行，职责混乱，包含数据获取、状态管理和多个不同功能的 UI 块。需要拆分为独立子组件，提取公共逻辑为自定义 Hook。",
    analysis: `重构分析完成：
- 当前问题：Dashboard.tsx 400+ 行，职责不清，难以维护和测试
- 目标拆分：StatSummary（统计卡片）、ChartPanel（图表面板）、DataTable（数据表格）、DashboardContainer（容器组件）
- 逻辑提取：useDashboard 自定义 Hook（数据获取 + 状态管理）
- 重构原则：不改变外部行为，仅优化内部结构`,
    steps: [
      "1. 提取 useDashboard 自定义 Hook（数据获取、loading、error 状态管理）",
      "2. 拆分 StatSummary 统计卡片组件（4 个指标卡片）",
      "3. 拆分 ChartPanel 图表面板组件（横向条形图）",
      "4. 拆分 DataTable 数据表格组件（排序、筛选）",
      "5. 创建 DashboardContainer 容器组件，组合所有子组件",
      "6. 删除原 Dashboard.tsx，验证功能一致性",
    ],
    files: [
      { file: "src/hooks/useDashboard.ts", action: "创建", description: "数据获取和状态管理 Hook" },
      { file: "src/components/StatSummary.tsx", action: "创建", description: "统计摘要卡片：观看量/用户/时长/完播率" },
      { file: "src/components/ChartPanel.tsx", action: "创建", description: "图表面板：学科观看分布条形图" },
      { file: "src/components/DataTable.tsx", action: "创建", description: "数据表格：课程排行列表" },
      { file: "src/components/DashboardContainer.tsx", action: "创建", description: "仪表盘容器：布局编排" },
      { file: "src/components/Dashboard.tsx", action: "删除", description: "重构前文件，已拆分" },
    ],
  },
  practiceStatuses: [
    "正在读取原组件代码...",
    "正在分析组件职责边界...",
    "正在提取 useDashboard Hook...",
    "正在拆分 StatSummary 组件...",
    "正在拆分 ChartPanel 组件...",
    "正在拆分 DataTable 组件...",
    "正在创建容器组件...",
    "正在验证功能一致性...",
    "正在执行构建...",
    "重构完成 ✓",
  ],
  chatMessages: [
    {
      id: "msg-1",
      role: "user",
      content: "当前 Dashboard 组件有 400 多行，包含数据获取、状态管理和多个 UI 块，职责混乱。请将其拆分为独立子组件，提取公共逻辑为自定义 Hook。",
      timestamp: "11:30",
    },
    {
      id: "msg-2",
      role: "assistant",
      content: "正在读取 Dashboard.tsx 代码...\n分析组件职责：识别到统计摘要、图表、数据表格三个独立 UI 块+数据逻辑层...\n正在制定拆分方案...",
      timestamp: "11:31",
      isStreaming: true,
    },
    {
      id: "msg-3",
      role: "assistant",
      content: `## 🔧 重构方案

**拆分策略**：

| 原组件区域 | 新组件 | 职责 |
|-----------|--------|------|
| 数据获取 + 状态 | \`useDashboard\` Hook | 封装 fetch、loading、error 逻辑 |
| 4 个统计卡片 | \`StatSummary\` | 纯展示组件 |
| 学科分布图表 | \`ChartPanel\` | 可复用图表组件 |
| 课程排行表格 | \`DataTable\` | 带排序和筛选 |
| 整体布局 | \`DashboardContainer\` | 编排子组件 |

**收益预估**：
- 单文件从 400+ 行降至 < 100 行
- 每个子组件可独立测试
- useDashboard Hook 可被其他页面复用
- 外部行为完全不变 ✨`,
      timestamp: "11:32",
    },
  ],
  buildVerification: {
    checks: [
      { label: "TypeScript 编译", passed: true, detail: "0 errors" },
      { label: "组件结构验证", passed: true, detail: "5个新组件创建成功" },
      { label: "功能一致性测试", passed: true, detail: "外部行为无变化" },
      { label: "生产构建", passed: true, detail: "built in 1.92s" },
    ],
    bundleSize: { raw: "48.21 kB", gzip: "16.72 kB" },
    buildTime: "1.92s",
    previewUrl: "http://localhost:5173/dashboard",
    previewTitle: "数据仪表盘 — 重构验证",
  },
  iterationData: {
    problemHint: "小王 review 后发现 DataTable 组件缺少排序功能，需要在表头点击时按列排序。",
    rounds: [
      {
        userMessage: "DataTable 组件目前只是静态展示，能否增加点击表头排序的功能？按观看次数降序排列。",
        aiResponse: "好的，为 DataTable 添加可点击排序功能。\n\n将添加：\n- 可点击的表头（带 ▲▼ 指示器）\n- 升序/降序切换\n- 当前排序列高亮显示\n- 排序状态记忆\n\n修改 DataTable.tsx，新增 sortConfig state 和 handleSort 方法。",
        fixFiles: ["datatable"],
        fixSnippets: {},
      },
    ],
  },
  completionSummary: {
    features: [
      "抽取 useDashboard 自定义 Hook（数据获取、loading、error 管理）",
      "拆分 StatSummary 统计卡片（4个指标独立展示）",
      "拆分 ChartPanel 图表面板（可复用条形图组件）",
      "拆分 DataTable 数据表格（支持排序和筛选）",
      "创建 DashboardContainer 容器（组合子组件）",
      "删除冗余 Dashboard.tsx，代码量减少 65%",
    ],
    stats: {
      filesCreated: 5,
      filesModified: 0,
      filesDeleted: 1,
      linesAdded: 280,
      linesRemoved: 420,
    },
    tips: [
      "重构前让 AI 先输出拆分方案表，一目了然",
      "指定不动外部行为的原则，AI 会格外注意兼容性",
      "要求 AI 将业务逻辑和 UI 展示分离，提升可测试性",
      "重构后要求 AI 提供 before/after 对比，量化改进效果",
    ],
  },
};
