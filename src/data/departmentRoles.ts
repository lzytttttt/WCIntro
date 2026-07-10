import type { Department } from "@/types";

export const departments: Department[] = [
  {
    id: "sales",
    name: "销售中心",
    icon: "TrendingUp",
    description: "负责教育录播与教研平台产品的市场推广与客户开拓",
    roles: [
      {
        id: "sales-rep",
        name: "销售",
        departmentId: "sales",
        recommendedTool: "workbuddy",
        toolPriority: "WorkBuddy 为主",
        usageAdvice: "日常以客户沟通、文档整理、邮件撰写为主，WorkBuddy 可大幅提升案头工作效率，帮您快速整理客户拜访纪要、生成标准报价邮件、汇总跟进记录。",
        scenarioIds: [
          "wb-meeting-summary",
          "wb-competitor-analysis",
          "wb-quote-email",
          "wb-weekly-report",
          "wb-content-summary",
        ],
        precautions: [
          "客户报价、折扣等敏感商业数据不要直接放入 Prompt",
          "竞品分析结论需人工核实后再用于客户沟通",
        ],
      },
    ],
  },
  {
    id: "product",
    name: "产品中心",
    icon: "Package",
    description: "负责产品规划、售前支持、市场推广与需求管理",
    roles: [
      {
        id: "presales",
        name: "售前",
        departmentId: "product",
        recommendedTool: "both",
        toolPriority: "WorkBuddy 为主，CodeBuddy 辅助演示原型",
        usageAdvice: "标书响应和方案文档用 WorkBuddy 快速生成初稿，需要给客户演示产品功能体验时用 CodeBuddy 快速搭建演示原型验证概念。",
        scenarioIds: [
          "wb-meeting-summary",
          "wb-prd",
          "wb-competitor-analysis",
          "wb-content-summary",
          "cb-create-page",
        ],
        precautions: [
          "标书、合同等正式文档需仔细人工审核确认后再提交",
          "演示原型仅用于功能验证和概念展示，不可直接作为交付物",
        ],
      },
      {
        id: "pm",
        name: "产品经理",
        departmentId: "product",
        recommendedTool: "both",
        toolPriority: "WorkBuddy + CodeBuddy 并重",
        usageAdvice: "需求分析和竞品分析用 WorkBuddy，快速验证功能可行性和交互原型用 CodeBuddy，两种工具配合使用效率最高。",
        scenarioIds: [
          "wb-prd",
          "wb-competitor-analysis",
          "wb-meeting-summary",
          "wb-project-plan",
          "wb-training-material",
          "cb-create-page",
        ],
        precautions: [
          "需求文档中的业务逻辑和交互细节需人工确认",
          "AI 生成的原型代码需研发评估技术可行性后再纳入开发计划",
        ],
      },
      {
        id: "pm-market",
        name: "产品市场",
        departmentId: "product",
        recommendedTool: "workbuddy",
        toolPriority: "WorkBuddy 为主",
        usageAdvice: "市场调研、宣传文案、活动策划等内容创作场景是 WorkBuddy 的主场，它能帮您快速产出初稿，让您专注于策略和创意。",
        scenarioIds: [
          "wb-competitor-analysis",
          "wb-content-summary",
          "wb-data-analysis",
          "wb-training-material",
        ],
        precautions: [
          "市场数据和竞品信息可能过时，重要结论需交叉验证来源",
          "宣传材料中涉及的产品参数必须与研发确认后再发布",
        ],
      },
    ],
  },
  {
    id: "tech",
    name: "技术中心",
    icon: "Wrench",
    description: "负责产品部署、技术支持与现场服务",
    roles: [
      {
        id: "tech-support",
        name: "技服",
        departmentId: "tech",
        recommendedTool: "both",
        toolPriority: "WorkBuddy 处理文档，CodeBuddy 处理脚本和排障",
        usageAdvice: "工单整理、现场记录、部署文档用 WorkBuddy 提高效率；脚本编写、日志分析、配置生成用 CodeBuddy，但要先在测试环境验证。",
        scenarioIds: [
          "wb-meeting-summary",
          "wb-weekly-report",
          "wb-training-material",
          "cb-fix-bug",
          "cb-explain-code",
          "cb-analyze-error",
          "cb-run-command",
        ],
        precautions: [
          "客户环境配置、IP 地址等敏感信息不要直接粘贴",
          "AI 生成的脚本必须在测试环境验证后才能执行",
          "部署操作前确认备份已完成",
        ],
      },
    ],
  },
  {
    id: "rd",
    name: "研发中心",
    icon: "Code",
    description: "负责教育录播与教研平台的产品研发与技术迭代",
    roles: [
      {
        id: "developer",
        name: "研发",
        departmentId: "rd",
        recommendedTool: "codebuddy",
        toolPriority: "CodeBuddy 为主，WorkBuddy 辅助文档",
        usageAdvice: "日常开发以 CodeBuddy 为核心，从代码生成到 Bug 修复到项目分析一站完成。技术方案文档和调研报告可用 WorkBuddy 辅助整理。",
        scenarioIds: [
          "cb-create-page",
          "cb-modify-project",
          "cb-fix-bug",
          "cb-explain-code",
          "cb-refactor",
          "cb-write-test",
          "cb-generate-component",
          "cb-analyze-error",
          "cb-run-command",
          "cb-read-files",
          "wb-meeting-summary",
          "wb-project-plan",
        ],
        precautions: [
          "AI 生成的代码必须经过 Code Review 后再合并",
          "绝不将 API 密钥、数据库密码等放入 Prompt",
          "不理解的终端命令不要直接执行，先问清楚再决定",
          "修改核心模块前确认有完整的测试覆盖",
        ],
      },
    ],
  },
  {
    id: "admin",
    name: "行政办公室",
    icon: "Building",
    description: "负责公司行政管理、职能支持与团队运营",
    roles: [
      {
        id: "staff",
        name: "职能",
        departmentId: "admin",
        recommendedTool: "workbuddy",
        toolPriority: "WorkBuddy 为主",
        usageAdvice: "会议纪要、通知公告、规章制度整理、周报月报等工作文档，WorkBuddy 均可高效完成，让日常行政工作更轻松有序。",
        scenarioIds: [
          "wb-meeting-summary",
          "wb-weekly-report",
          "wb-content-summary",
          "wb-project-plan",
        ],
        precautions: [
          "涉及人事薪酬、员工隐私等敏感信息不要直接输入",
          "正式发布的公司通知需人工审核措辞和合规性",
        ],
      },
      {
        id: "manager",
        name: "管理",
        departmentId: "admin",
        recommendedTool: "workbuddy",
        toolPriority: "WorkBuddy 为主",
        usageAdvice: "工作汇报、团队规划、数据分析等管理类内容，WorkBuddy 可辅助生成初稿和分析框架，助您快速把握全局。",
        scenarioIds: [
          "wb-weekly-report",
          "wb-data-analysis",
          "wb-project-plan",
          "wb-content-summary",
        ],
        precautions: [
          "决策建议仅供参考，重要决策需结合实际情况自行判断",
          "数据报告中的结论需核实数据来源的准确性",
          "战略规划相关内容不要输入到外部 AI 产品中",
        ],
      },
    ],
  },
];

// 扁平化所有岗位列表
export const allRoles = departments.flatMap((d) => d.roles);

// 根据 ID 查找部门
export function getDepartmentById(id: string): Department | undefined {
  return departments.find((d) => d.id === id);
}

// 根据 ID 查找岗位
export function getRoleById(id: string) {
  return allRoles.find((r) => r.id === id);
}
