export const terminalCommands: string[][] = [
  // npm install
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
  // npm run dev
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
  // npm run build
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

// CodeBuddy 练习的完整终端模拟
export const practiceTerminal: string[][] = [
  // 扫描项目
  [
    "$ tree src/",
    "src/",
    "├── App.tsx",
    "├── main.tsx",
    "└── index.css",
    "",
    "0 directories, 3 files",
  ],
  // 安装依赖
  [
    "$ npm install",
    "",
    "added 142 packages in 10s",
    "found 0 vulnerabilities",
  ],
  // 构建
  [
    "$ npm run build",
    "",
    "> tsc && vite build",
    "vite v5.4.11 building...",
    "✓ 42 modules transformed.",
    "dist/index.html   0.49 kB",
    "✓ built in 2.1s",
  ],
];
