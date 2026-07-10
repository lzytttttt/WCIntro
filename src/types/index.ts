// ===== 步骤类型 =====
export interface Step {
  id: number;
  title: string;
  description: string;
  scenario: string;
  tips: string;
  completed: boolean;
}

// ===== 场景类型 =====
export interface Scenario {
  id: string;
  name: string;
  description: string;
  tool: "workbuddy" | "codebuddy";
  examplePrompt: string;
  tags: string[];
  departments?: string[];
  roles?: string[];
}

// ===== 部门类型 =====
export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  roles: Role[];
}

// ===== 岗位类型 =====
export interface Role {
  id: string;
  name: string;
  departmentId: string;
  recommendedTool: "workbuddy" | "codebuddy" | "both";
  toolPriority: string;
  usageAdvice: string;
  scenarioIds: string[];
  precautions?: string[];
}

// ===== 聊天消息类型 =====
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string | string[];
  timestamp: string;
  isStreaming?: boolean;
}

// ===== 文件节点类型 =====
export interface FileNode {
  id: string;
  name: string;
  type: "file" | "directory";
  children?: FileNode[];
  status?: "modified" | "added" | "deleted" | "normal";
}

// ===== Diff 行类型 =====
export interface DiffLine {
  type: "added" | "deleted" | "unchanged";
  content: string;
  lineNumber?: number;
}

// ===== Toast 类型 =====
export interface ToastState {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  visible: boolean;
}

// ===== Prompt 表单类型 =====
export interface PromptFormData {
  goal: string;
  background: string;
  materials: string;
  outputFormat: string;
  constraints: string;
  executionMethod: string;
}

// ===== 练习任务状态类型 =====
export type PracticeStatus =
  | "idle"
  | "understanding"
  | "extracting"
  | "organizing"
  | "generating"
  | "completed";

export type CodePracticeStatus =
  | "idle"
  | "scanning"
  | "analyzing"
  | "planning"
  | "modifying"
  | "installing"
  | "building"
  | "checking"
  | "completed";

// ===== 最佳实践类型 =====
export interface BestPractice {
  id: string;
  title: string;
  description: string;
  isRecommended: boolean;
  tool: "workbuddy" | "codebuddy";
}

// ===== 全局状态类型 =====
export interface AppState {
  currentModule: "workbuddy" | "codebuddy" | null;
  currentStep: number;
  completedSteps: Record<string, number[]>;
  selectedFile: string | null;
  selectedDepartment: string | null;
  promptForm: PromptFormData;
  toast: ToastState | null;
}

// ===== Action 类型 =====
export type AppAction =
  | { type: "SET_MODULE"; payload: "workbuddy" | "codebuddy" | null }
  | { type: "SET_STEP"; payload: number }
  | { type: "COMPLETE_STEP"; payload: { module: string; step: number } }
  | { type: "SET_SELECTED_FILE"; payload: string | null }
  | { type: "SET_DEPARTMENT"; payload: string | null }
  | { type: "SET_PROMPT_FORM"; payload: Partial<PromptFormData> }
  | { type: "SHOW_TOAST"; payload: { message: string; type: "success" | "error" | "info" } }
  | { type: "HIDE_TOAST" }
  | { type: "CLEAR_PROGRESS" };
