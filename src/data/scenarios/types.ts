import type { ChatMessage, FileNode, DiffLine } from "@/types";

// ===== WorkBuddy 场景结果类型 =====
export interface ToDoItem {
  task: string;
  assignee: string;
  deadline: string;
  priority: "高" | "中" | "低";
}

export interface WBResultData {
  conclusions?: string[];
  todos?: ToDoItem[];
  risks?: string[];
  email?: string;
  report?: string;
  prd?: {
    sections: { title: string; content: string }[];
  };
}

// ===== WorkBuddy 场景演示数据 =====
export interface WBScenarioDemoData {
  scenarioName: string;
  scenarioDescription: string;
  scenarioIcon: string;
  chatMessages: ChatMessage[];
  executionStatuses: string[];
  resultData: WBResultData;
  modificationPrompt?: string;
}

// ===== CodeBuddy 场景文件节点 =====
export interface CBPlanFile {
  file: string;
  action: string;
  description: string;
}

export interface CBPlan {
  title: string;
  task: string;
  analysis: string;
  steps: string[];
  files: CBPlanFile[];
}

// ===== 步骤8 构建验证 =====
export interface BuildCheckItem {
  label: string;
  passed: boolean;
  detail?: string;
}

export interface BuildVerificationData {
  checks: BuildCheckItem[];
  bundleSize?: { raw: string; gzip: string };
  buildTime?: string;
  previewUrl?: string;
  previewTitle?: string;
}

// ===== 步骤9 迭代修复 =====
export interface IterationRound {
  userMessage: string;
  aiResponse: string;
  fixFiles?: string[];
  fixSnippets?: Record<string, string>;
}

export interface IterationData {
  rounds: IterationRound[];
  problemHint?: string;
}

// ===== 步骤10 完成总结 =====
export interface CompletionStats {
  filesCreated: number;
  filesModified: number;
  filesDeleted: number;
  linesAdded: number;
  linesRemoved: number;
}

export interface CompletionSummaryData {
  features: string[];
  stats: CompletionStats;
  tips: string[];
  notes?: string;
}

// ===== CodeBuddy 场景演示数据 =====
export interface CBScenarioDemoData {
  scenarioName: string;
  scenarioDescription: string;
  scenarioIcon: string;
  chatMessages: ChatMessage[];
  fileTree: FileNode[];
  codeSnippets: Record<string, string>;
  diffData: Record<string, DiffLine[]>;
  terminalOutputs: string[][];
  plan: CBPlan;
  practiceStatuses: string[];
  buildVerification?: BuildVerificationData;
  iterationData?: IterationData;
  completionSummary?: CompletionSummaryData;
}

// ===== 统一场景演示数据 =====
export type ScenarioDemoData = WBScenarioDemoData | CBScenarioDemoData;

export function isWBData(data: ScenarioDemoData): data is WBScenarioDemoData {
  return "executionStatuses" in data;
}
