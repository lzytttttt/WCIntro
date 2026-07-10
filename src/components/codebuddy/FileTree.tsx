import { useState } from "react";
import type { FileNode } from "@/types";
import {
  FolderOpen, Folder, File,
  ChevronRight, Plus, Minus, MinusCircle,
} from "lucide-react";

interface FileTreeProps {
  nodes: FileNode[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function TreeNode({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: FileNode;
  depth: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 1);
  const isDir = node.type === "directory";
  const isSelected = selectedId === node.id;

  const statusColors: Record<string, string> = {
    modified: "text-amber-500",
    added: "text-green-500",
    deleted: "text-red-500",
    normal: "text-slate-400",
  };

  const statusLabels: Record<string, string> = {
    modified: "M",
    added: "A",
    deleted: "D",
  };

  return (
    <div>
      <button
        onClick={() => {
          if (isDir) {
            setExpanded(!expanded);
          } else {
            onSelect(node.id);
          }
        }}
        className={`w-full flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md transition-all duration-200 ${
          isSelected
            ? "bg-violet-100 text-violet-700 font-medium shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {/* 展开/折叠箭头 */}
        {isDir ? (
          <span className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </span>
        ) : (
          <span className="w-3.5" />
        )}

        {/* 图标 */}
        {isDir ? (
          expanded ? (
            <FolderOpen className="w-4 h-4 text-amber-400" />
          ) : (
            <Folder className="w-4 h-4 text-amber-400" />
          )
        ) : (
          <File className={`w-4 h-4 ${statusColors[node.status || "normal"]}`} />
        )}

        {/* 文件名 */}
        <span className="truncate flex-1 text-left">{node.name}</span>

        {/* 状态标记 */}
        {node.status && node.status !== "normal" && (
          <span
            className={`text-[10px] px-1 rounded font-bold flex-shrink-0 ${
              node.status === "added"
                ? "bg-green-100 text-green-600"
                : node.status === "deleted"
                ? "bg-red-100 text-red-600"
                : "bg-amber-100 text-amber-600"
            }`}
          >
            {statusLabels[node.status]}
          </span>
        )}
      </button>

      {/* 子节点（带展开动画） */}
      {isDir && node.children && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileTree({ nodes, selectedId, onSelect }: FileTreeProps) {
  const fileCount = countFiles(nodes);
  const dirCount = countDirs(nodes);

  return (
    <div className="h-full bg-slate-50 border-r border-slate-200 flex flex-col">
      {/* 标题 */}
      <div className="px-3 py-2.5 border-b border-slate-200 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          项目文件
        </span>
        <span className="text-[10px] text-slate-400">
          {fileCount} 文件 · {dirCount} 目录
        </span>
      </div>

      {/* 文件树 */}
      <div className="flex-1 overflow-auto py-1">
        {nodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function countFiles(nodes: FileNode[]): number {
  let count = 0;
  for (const node of nodes) {
    if (node.type === "file") count++;
    if (node.children) count += countFiles(node.children);
  }
  return count;
}

function countDirs(nodes: FileNode[]): number {
  let count = 0;
  for (const node of nodes) {
    if (node.type === "directory") {
      count++;
      if (node.children) count += countDirs(node.children);
    }
  }
  return count;
}
