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
          { id: "courseplayer", name: "CoursePlayer.tsx", type: "file", status: "modified" },
          { id: "progressbar", name: "ProgressBar.tsx", type: "file", status: "normal" },
          { id: "comments", name: "Comments.tsx", type: "file", status: "normal" },
        ],
      },
      {
        id: "utils",
        name: "utils",
        type: "directory",
        children: [
          { id: "timeformat", name: "timeFormat.ts", type: "file", status: "normal" },
        ],
      },
      { id: "app", name: "App.tsx", type: "file", status: "normal" },
    ],
  },
  { id: "packagejson", name: "package.json", type: "file", status: "normal" },
];

const codeSnippets: Record<string, string> = {
  courseplayer: `import React, { useRef, useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { Comments } from "./Comments";
import { formatTime } from "../utils/timeFormat";

export function CoursePlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // BUG FIX: 进度超过90%时缺少边界检查
  const handleProgress = (percent: number) => {
    if (!videoRef.current || !duration) return;
    const clampedPercent = Math.max(0, Math.min(100, percent));
    const newTime = (clampedPercent / 100) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="course-player bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src="/videos/sample.mp4"
        className="w-full aspect-video"
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
      />
      <div className="p-4 bg-slate-900">
        <ProgressBar
          current={currentTime}
          total={duration}
          onSeek={handleProgress}
        />
        <div className="text-slate-400 text-sm mt-2">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}`,
  progressbar: `import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
  onSeek: (percent: number) => void;
}

export function ProgressBar({ current, total, onSeek }: ProgressBarProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div
      className="h-2 bg-slate-700 rounded-full cursor-pointer relative group"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        onSeek(pct);
      }}
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all"
        style={{ width: \`\${percent}%\` }}
      />
      <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: \`\${percent}%\`, marginLeft: -8 }}
      />
    </div>
  );
}`,
};

const diffItems: Record<string, DiffLine[]> = {
  courseplayer: [
    { type: "unchanged", content: `import React, { useRef, useEffect, useState } from "react";`, lineNumber: 1 },
    { type: "unchanged", content: `import { ProgressBar } from "./ProgressBar";`, lineNumber: 2 },
    { type: "unchanged", content: `import { Comments } from "./Comments";`, lineNumber: 3 },
    { type: "unchanged", content: `import { formatTime } from "../utils/timeFormat";`, lineNumber: 4 },
    { type: "unchanged", content: "", lineNumber: 5 },
    { type: "unchanged", content: `export function CoursePlayer() {`, lineNumber: 6 },
    { type: "unchanged", content: `  const videoRef = useRef<HTMLVideoElement>(null);`, lineNumber: 7 },
    { type: "unchanged", content: `  const [currentTime, setCurrentTime] = useState(0);`, lineNumber: 8 },
    { type: "unchanged", content: `  const [duration, setDuration] = useState(0);`, lineNumber: 9 },
    { type: "unchanged", content: `  const [isPlaying, setIsPlaying] = useState(false);`, lineNumber: 10 },
    { type: "unchanged", content: "", lineNumber: 11 },
    { type: "added", content: `  // BUG FIX: 进度超过90%时缺少边界检查`, lineNumber: 12 },
    { type: "deleted", content: `  const handleProgress = (percent: number) => {`, lineNumber: 13 },
    { type: "added", content: `  const handleProgress = (percent: number) => {`, lineNumber: 14 },
    { type: "deleted", content: `    if (!videoRef.current || !duration) return;`, lineNumber: 15 },
    { type: "added", content: `    if (!videoRef.current || !duration) return;`, lineNumber: 16 },
    { type: "deleted", content: `    const newTime = (percent / 100) * duration;`, lineNumber: 17 },
    { type: "added", content: `    const clampedPercent = Math.max(0, Math.min(100, percent));`, lineNumber: 18 },
    { type: "added", content: `    const newTime = (clampedPercent / 100) * duration;`, lineNumber: 19 },
    { type: "deleted", content: `    videoRef.current.currentTime = newTime;`, lineNumber: 20 },
    { type: "added", content: `    videoRef.current.currentTime = newTime;`, lineNumber: 21 },
  ],
};

const terminalOutputs: string[][] = [
  [
    "$ npm run dev",
    "",
    "> course-platform@2.0.0 dev",
    "> vite",
    "",
    "  VITE v5.4.11  ready in 295 ms",
    "",
    "  ➜  Local:   http://localhost:5173/",
  ],
  [
    "$ npm run build",
    "",
    "> course-platform@2.0.0 build",
    "> tsc && vite build",
    "",
    "vite v5.4.11 building for production...",
    "✓ 58 modules transformed.",
    "✓ built in 1.87s",
    "",
    "dist/assets/index-xxx.js  52.34 kB │ gzip: 17.89 kB",
  ],
];

export const cbFixBugData: CBScenarioDemoData = {
  scenarioName: "修复 Bug",
  scenarioDescription: "根据错误信息和问题描述定位并修复代码中的 Bug",
  scenarioIcon: "🐛",
  fileTree,
  codeSnippets,
  diffData: diffItems,
  terminalOutputs,
  plan: {
    title: "回放页面白屏 Bug 修复计划",
    task: "录播回放页面在播放进度超过90%后页面白屏，控制台报 Uncaught TypeError: Cannot read properties of undefined。需要定位 Bug 并修复。",
    analysis: `Bug 分析完成：
- 错误位置：CoursePlayer.tsx handleProgress 方法
- 根因：progress 超过 90% 后，percent 值可能超出 [0, 100] 范围，导致 currentTime 计算为 NaN
- 影响：视频 seek 到无效时间后触发 onTimeUpdate，currentTime 变为 undefined，导致页面崩溃
- 修复方案：对 percent 值进行 Math.max(0, Math.min(100, percent)) 边界钳制`,
    steps: [
      "1. 复现 Bug：将进度拖拽到 95%+ 位置",
      "2. 定位问题代码：CoursePlayer.tsx handleProgress 方法",
      "3. 根因分析：percent 参数缺少边界检查",
      "4. 添加边界钳制逻辑：Math.max/Math.min",
      "5. 验证修复：拖动进度到任意位置不再白屏",
    ],
    files: [
      { file: "src/components/CoursePlayer.tsx", action: "修改", description: "handleProgress 添加边界检查" },
    ],
  },
  practiceStatuses: [
    "正在读取项目文件...",
    "正在复现 Bug...",
    "正在定位问题代码...",
    "正在分析根因...",
    "正在生成修复方案...",
    "正在修改代码...",
    "正在执行构建验证...",
    "Bug 修复完成 ✓",
  ],
  chatMessages: [
    {
      id: "msg-1",
      role: "user",
      content: "录播回放页面在播放进度超过90%后页面白屏，控制台报 Uncaught TypeError，请帮我定位并修复。",
      timestamp: "15:20",
    },
    {
      id: "msg-2",
      role: "user",
      content: "补充一下：是课程回放模块的 CoursePlayer 组件，用户拖动进度条到接近结尾的位置就会崩溃。",
      timestamp: "15:21",
    },
    {
      id: "msg-3",
      role: "assistant",
      content: "正在读取 CoursePlayer.tsx 代码...\n定位到 handleProgress 方法...\n发现 percent 参数缺少边界检查，超过 100% 时会导致 NaN 计算...",
      timestamp: "15:22",
      isStreaming: true,
    },
    {
      id: "msg-4",
      role: "assistant",
      content: `## 🐛 Bug 分析报告

**问题定位**：\`CoursePlayer.tsx\` 第 21 行 \`handleProgress\` 方法

**根因**：
\`\`\`ts
// 修复前
const handleProgress = (percent: number) => {
  if (!videoRef.current || !duration) return;
  const newTime = (percent / 100) * duration;  // ❌ percent 可能超出 [0, 100]
  videoRef.current.currentTime = newTime;
};
\`\`\`
当用户拖拽进度超过 90% 时，percent 值可能超出 100，导致 \`newTime\` > \`duration\`，触发无效 seek 操作，\`currentTime\` 变为 \`undefined\`，最终导致页面崩溃。

**修复方案**：添加边界钳制
\`\`\`ts
// 修复后
const handleProgress = (percent: number) => {
  if (!videoRef.current || !duration) return;
  const clampedPercent = Math.max(0, Math.min(100, percent));  // ✅ 钳制到 [0, 100]
  const newTime = (clampedPercent / 100) * duration;
  videoRef.current.currentTime = newTime;
  setCurrentTime(newTime);
};
\`\`\`

**修改文件**：仅 1 个文件，添加 1 行边界检查代码。`,
      timestamp: "15:23",
    },
  ],
  buildVerification: {
    checks: [
      { label: "TypeScript 类型检查", passed: true, detail: "0 errors" },
      { label: "Bug 复现测试", passed: true, detail: "进度 95%+ 不再白屏" },
      { label: "回归测试通过", passed: true, detail: "已有功能正常" },
      { label: "生产构建成功", passed: true, detail: "built in 1.87s" },
    ],
    bundleSize: { raw: "52.34 kB", gzip: "17.89 kB" },
    buildTime: "1.87s",
    previewUrl: "http://localhost:5173/course/playback",
    previewTitle: "课程回放 — 修复验证",
  },
  iterationData: {
    problemHint: "QA 反馈：进度条拖到 0% 以下（向左拖出边界）也会触发异常。需要同时处理下边界问题。",
    rounds: [
      {
        userMessage: "修复上边界后，QA 发现进度条拖到 0% 以下也会出问题。handleProgress 是否也需要钳制下限？",
        aiResponse: "好问题！当前只修复了上边界（max），下边界同样需要保护。\n\n正在为 handleProgress 补充下限检查...\n\n修复后进度值将严格限制在 [0, 100] 区间内，测试覆盖范围包括：\n- 进度 < 0%（左边界外拖拽）\n- 进度 > 100%（右边界外拖拽）\n- 进度为 NaN（异常数据）\n- 进度为正常值（回归验证）",
        fixFiles: ["courseplayer"],
        fixSnippets: {},
      },
    ],
  },
  completionSummary: {
    features: [
      "修复进度超过 90% 白屏 Bug（上边界钳制）",
      "修复进度低于 0% 异常（下边界钳制）",
      "补充 NaN 值的防御性检查",
      "添加 progress 边界测试用例",
      "回归验证：正常播放/暂停/拖拽均正常",
    ],
    stats: {
      filesCreated: 0,
      filesModified: 1,
      filesDeleted: 0,
      linesAdded: 3,
      linesRemoved: 1,
    },
    tips: [
      "报告 Bug 时附带完整错误信息和控制台输出，AI 定位更快",
      "描述复现步骤：操作→预期结果→实际结果，三步清晰",
      "修复后要求 AI 补充边界测试用例，防止同类问题复发",
      "一个 Bug 修完后，检查同类函数是否也存在相同问题",
    ],
  },
};
