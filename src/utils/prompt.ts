import type { PromptFormData } from "@/types";

export function buildPrompt(form: PromptFormData): string {
  const parts: string[] = [];

  if (form.goal.trim()) {
    parts.push(`## 目标\n${form.goal.trim()}`);
  }
  if (form.background.trim()) {
    parts.push(`## 背景\n${form.background.trim()}`);
  }
  if (form.materials.trim()) {
    parts.push(`## 输入材料\n${form.materials.trim()}`);
  }
  if (form.outputFormat.trim()) {
    parts.push(`## 输出格式\n${form.outputFormat.trim()}`);
  }
  if (form.constraints.trim()) {
    parts.push(`## 约束条件\n${form.constraints.trim()}`);
  }
  if (form.executionMethod.trim()) {
    parts.push(`## 执行方式\n${form.executionMethod.trim()}`);
  }

  return parts.join("\n\n");
}
