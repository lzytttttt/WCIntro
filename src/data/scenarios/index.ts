import type { WBScenarioDemoData, CBScenarioDemoData, ScenarioDemoData } from "./types";
import { wbMeetingSummaryData } from "./wb-meeting-summary";
import { wbWeeklyReportData } from "./wb-weekly-report";
import { wbPRDData } from "./wb-prd";
import { cbCreatePageData } from "./cb-create-page";
import { cbFixBugData } from "./cb-fix-bug";
import { cbRefactorData } from "./cb-refactor";
import { scenarios } from "../scenarios";

// ===== 精选场景数据映射 =====
const wbScenarioMap: Record<string, WBScenarioDemoData> = {
  "wb-meeting-summary": wbMeetingSummaryData,
  "wb-weekly-report": wbWeeklyReportData,
  "wb-prd": wbPRDData,
};

const cbScenarioMap: Record<string, CBScenarioDemoData> = {
  "cb-create-page": cbCreatePageData,
  "cb-fix-bug": cbFixBugData,
  "cb-refactor": cbRefactorData,
};

// ===== 默认场景 ID =====
export const DEFAULT_WB_SCENARIO = "wb-meeting-summary";
export const DEFAULT_CB_SCENARIO = "cb-create-page";

// ===== 获取 WorkBuddy 场景数据 =====
export function getWBScenarioData(scenarioId?: string | null): WBScenarioDemoData {
  if (scenarioId && wbScenarioMap[scenarioId]) {
    return wbScenarioMap[scenarioId];
  }
  return wbScenarioMap[DEFAULT_WB_SCENARIO];
}

// ===== 获取 CodeBuddy 场景数据 =====
export function getCBScenarioData(scenarioId?: string | null): CBScenarioDemoData {
  if (scenarioId && cbScenarioMap[scenarioId]) {
    return cbScenarioMap[scenarioId];
  }
  return cbScenarioMap[DEFAULT_CB_SCENARIO];
}

// ===== 通用模板生成器：为非精选 WB 场景生成基础演示数据 =====
export function generateGenericWBData(scenarioId: string): WBScenarioDemoData {
  const scenario = scenarios.find((s) => s.id === scenarioId);
  const name = scenario?.name || "通用任务";
  const desc = scenario?.description || "";
  const prompt = scenario?.examplePrompt || "请帮我完成这个任务。";

  return {
    scenarioName: name,
    scenarioDescription: desc,
    scenarioIcon: "📄",
    chatMessages: [
      {
        id: "gen-1",
        role: "user",
        content: prompt,
        timestamp: "09:00",
      },
      {
        id: "gen-2",
        role: "assistant",
        content: `正在理解您的「${name}」任务需求...\n已识别任务类型和目标...\n正在生成结构化输出...`,
        timestamp: "09:01",
        isStreaming: true,
      },
      {
        id: "gen-3",
        role: "assistant",
        content: `## 📄 ${name} 输出结果\n\n已根据您的需求完成「${name}」任务处理。\n\n在实际使用中，WorkBuddy 会根据您提供的具体材料生成针对性的结构化内容。\n\n💡 **提示**：您可以切换到其他精选场景（如"会议纪要整理"或"周报和汇报材料"）查看完整演示效果。`,
        timestamp: "09:02",
      },
    ],
    executionStatuses: [
      "正在理解任务需求...",
      "正在分析场景类型...",
      "正在提取关键要素...",
      "正在生成输出结果...",
      "输出完成 ✓",
    ],
    resultData: {
      conclusions: [`已完成「${name}」任务处理`],
      todos: [
        { task: "查看完整演示效果", assignee: "你", deadline: "今天", priority: "中" },
      ],
    },
  };
}

// ===== 通用模板生成器：为非精选 CB 场景生成基础演示数据 =====
export function generateGenericCBData(scenarioId: string): CBScenarioDemoData {
  const scenario = scenarios.find((s) => s.id === scenarioId);
  const name = scenario?.name || "通用开发任务";
  const desc = scenario?.description || "";
  const prompt = scenario?.examplePrompt || "请帮我完成这个开发任务。";

  const fileId = scenarioId.replace("cb-", "").replace(/-/g, "");

  return {
    scenarioName: name,
    scenarioDescription: desc,
    scenarioIcon: "💻",
    fileTree: [
      {
        id: "src",
        name: "src",
        type: "directory",
        children: [
          { id: "app", name: "App.tsx", type: "file", status: "modified" },
          { id: "main", name: "main.tsx", type: "file", status: "normal" },
        ],
      },
      { id: "packagejson", name: "package.json", type: "file", status: "normal" },
    ],
    codeSnippets: {
      app: `import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-bold">${name}</h1>
      <p className="text-slate-500 mt-2">${desc}</p>
    </div>
  );
}

export default App;`,
    },
    diffData: {},
    terminalOutputs: [
      ["$ npm run dev", "", "> project@1.0.0 dev", "> vite", "", "VITE ready in 280ms"],
    ],
    plan: {
      title: `${name} 开发计划`,
      task: prompt,
      analysis: `项目分析完成。\n\n💡 **提示**：此场景为通用模板演示。切换到精选场景（如"创建前端页面""修复 Bug""代码重构"）可查看更完整的交互演示。`,
      steps: ["1. 分析开发需求", "2. 制定实施方案", "3. 编写代码", "4. 验证结果"],
      files: [
        { file: "src/App.tsx", action: "修改", description: `实现「${name}」功能` },
      ],
    },
    practiceStatuses: [
      "正在读取项目文件...",
      "正在分析需求...",
      "正在执行任务...",
      "任务完成 ✓",
    ],
    chatMessages: [
      {
        id: "gen-1",
        role: "user",
        content: prompt,
        timestamp: "10:00",
      },
      {
        id: "gen-2",
        role: "assistant",
        content: `正在读取项目结构...\n正在分析需求...\n正在制定计划...\n\n💡 此场景为通用演示模板，切换到精选场景（如"创建前端页面""修复 Bug""代码重构"）可查看更完整的交互演示效果。`,
        timestamp: "10:01",
        isStreaming: true,
      },
    ],
    buildVerification: {
      checks: [
        { label: "TypeScript 编译", passed: true, detail: "0 errors" },
        { label: "生产构建", passed: true, detail: "built successfully" },
      ],
      bundleSize: { raw: "-- kB", gzip: "-- kB" },
      buildTime: "< 2s",
    },
    iterationData: {
      problemHint: "通用模板场景 — 切换到精选场景查看完整的迭代修复演示",
      rounds: [],
    },
    completionSummary: {
      features: [`完成了「${name}」开发任务`],
      stats: { filesCreated: 1, filesModified: 0, filesDeleted: 0, linesAdded: 20, linesRemoved: 0 },
      tips: ["切换到精选场景查看更丰富的交互演示"],
    },
  };
}

// ===== 获取所有精选场景 ID 列表（用于 ScenarioBanner 切换器） =====
export const featuredWBScenarios = Object.keys(wbScenarioMap);
export const featuredCBScenarios = Object.keys(cbScenarioMap);

// ===== 检查是否为精选场景 =====
export function isFeaturedScenario(scenarioId: string): boolean {
  return scenarioId in wbScenarioMap || scenarioId in cbScenarioMap;
}

// ===== 获取场景数据（统一入口） =====
export function getScenarioData(
  scenarioId: string,
  type: "workbuddy" | "codebuddy"
): ScenarioDemoData {
  if (type === "workbuddy") {
    if (wbScenarioMap[scenarioId]) {
      return wbScenarioMap[scenarioId];
    }
    return generateGenericWBData(scenarioId);
  } else {
    if (cbScenarioMap[scenarioId]) {
      return cbScenarioMap[scenarioId];
    }
    return generateGenericCBData(scenarioId);
  }
}
