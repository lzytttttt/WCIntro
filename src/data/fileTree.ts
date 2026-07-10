import type { FileNode } from "@/types";

export const mockFileTree: FileNode[] = [
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

export function getFileNodeById(id: string, nodes: FileNode[] = mockFileTree): FileNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = getFileNodeById(id, node.children);
      if (found) return found;
    }
  }
  return undefined;
}
