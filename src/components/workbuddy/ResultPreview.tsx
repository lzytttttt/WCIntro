import { useState } from "react";
import {
  CheckCircle, AlertTriangle, ListTodo, Mail,
  ChevronDown, ChevronRight, Copy, FileText, BookOpen,
} from "lucide-react";
import { copyToClipboard } from "@/utils/clipboard";

interface ToDoItem {
  task: string;
  assignee: string;
  deadline: string;
  priority: "高" | "中" | "低";
}

interface PRDSection {
  title: string;
  content: string;
}

interface ResultPreviewProps {
  conclusions?: string[];
  todos?: ToDoItem[];
  risks?: string[];
  email?: string;
  report?: string;
  prd?: { sections: PRDSection[] };
}

function CollapsibleSection({
  title,
  icon,
  accentColor,
  defaultOpen = true,
  children,
  copyContent,
}: {
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  copyContent?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          {icon}
          <h3 className="font-semibold text-slate-700 text-sm">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {copyContent && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(copyContent);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="复制此章节"
            >
              <Copy className="w-3.5 h-3.5" />
            </span>
          )}
          <span className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </span>
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-out overflow-hidden ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

export function ResultPreview({ conclusions, todos, risks, email, report, prd }: ResultPreviewProps) {
  const priorityColors: Record<string, string> = {
    高: "bg-red-100 text-red-700",
    中: "bg-amber-100 text-amber-700",
    低: "bg-green-100 text-green-700",
  };

  if (report) {
    return (
      <div className="space-y-3">
        <CollapsibleSection
          title="周报内容"
          icon={<FileText className="w-5 h-5 text-blue-500" />}
          accentColor="text-blue-500"
          copyContent={report}
        >
          <pre className="text-sm text-slate-600 whitespace-pre-wrap font-sans bg-slate-50 p-4 rounded-lg leading-relaxed">
            {report}
          </pre>
        </CollapsibleSection>
      </div>
    );
  }

  if (prd) {
    return (
      <div className="space-y-3">
        {prd.sections.map((section, i) => (
          <CollapsibleSection
            key={i}
            title={section.title}
            icon={<BookOpen className="w-5 h-5 text-violet-500" />}
            accentColor="text-violet-500"
            defaultOpen={i === 0}
            copyContent={section.content}
          >
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </p>
          </CollapsibleSection>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* 结论 */}
      {conclusions && conclusions.length > 0 && (
        <CollapsibleSection
          title="会议结论"
          icon={<CheckCircle className="w-5 h-5 text-green-500" />}
          accentColor="text-green-500"
          copyContent={conclusions.join("\n")}
        >
          <ul className="space-y-2">
            {conclusions.map((c, i) => (
              <li
                key={i}
                className="text-sm text-slate-600 pl-5 relative before:content-['▸'] before:absolute before:left-1 before:text-cyan-400 before:text-xs before:top-0.5"
              >
                {c}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* 待办 */}
      {todos && todos.length > 0 && (
        <CollapsibleSection
          title="待办事项"
          icon={<ListTodo className="w-5 h-5 text-amber-500" />}
          accentColor="text-amber-500"
          copyContent={todos.map((t) => `${t.task} - ${t.assignee} - ${t.deadline} (${t.priority})`).join("\n")}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 text-slate-500 font-medium">任务</th>
                  <th className="text-left py-2 text-slate-500 font-medium">负责人</th>
                  <th className="text-left py-2 text-slate-500 font-medium">截止</th>
                  <th className="text-left py-2 text-slate-500 font-medium">优先级</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((t, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 text-slate-700">{t.task}</td>
                    <td className="py-2.5 text-slate-500">{t.assignee}</td>
                    <td className="py-2.5 text-slate-500">{t.deadline}</td>
                    <td className="py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[t.priority] || "bg-slate-100 text-slate-500"}`}>
                        {t.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>
      )}

      {/* 风险 */}
      {risks && risks.length > 0 && (
        <CollapsibleSection
          title="风险点"
          icon={<AlertTriangle className="w-5 h-5 text-red-500" />}
          accentColor="text-red-500"
          copyContent={risks.join("\n")}
        >
          <ul className="space-y-1.5">
            {risks.map((r, i) => (
              <li
                key={i}
                className="text-sm text-red-600 pl-5 relative before:content-['!'] before:absolute before:left-1 before:font-bold before:text-red-400"
              >
                {r}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* 邮件 */}
      {email && (
        <CollapsibleSection
          title="会后同步邮件"
          icon={<Mail className="w-5 h-5 text-blue-500" />}
          accentColor="text-blue-500"
          copyContent={email}
        >
          <pre className="text-sm text-slate-600 whitespace-pre-wrap font-sans bg-slate-50 p-4 rounded-lg leading-relaxed">
            {email}
          </pre>
        </CollapsibleSection>
      )}
    </div>
  );
}
