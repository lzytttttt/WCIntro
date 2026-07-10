import type { WBScenarioDemoData } from "./types";

export const wbContentSummaryData: WBScenarioDemoData = {
  scenarioName: "内容总结",
  scenarioDescription: "对长文档、技术白皮书、行业报告进行快速摘要，提取关键观点和数据",
  scenarioIcon: "📑",
  chatMessages: [
    {
      id: "msg-1",
      role: "user",
      content: "我们行业研究员刚出了一份《2026教育信息化行业报告》，有30多页。请帮我提炼成一份对内简报，500字以内，重点给销售和产品同学看：核心数据、趋势判断、对咱们产品的启示。",
      timestamp: "11:30",
    },
    {
      id: "msg-2",
      role: "user",
      content: "报告关键内容：2025年K12录播设备渗透率约42%，较2020年提升23个百分点；区县级教育云平台招标同比增长37%；AI教研工具采购预算在教育信息化总盘占比从8%升至15%；政策端强调『三个课堂』常态化；但学校普遍反映教师数字化能力不足是落地瓶颈。",
      timestamp: "11:32",
    },
    {
      id: "msg-3",
      role: "assistant",
      content: "正在解析报告关键内容...\n已提取核心数据与观点...\n正在归纳趋势判断...\n正在映射到产品启示...",
      timestamp: "11:33",
      isStreaming: true,
    },
    {
      id: "msg-4",
      role: "assistant",
      content: "## 📑 行业报告摘要（2026教育信息化行业报告）\n\n### 核心数据\n- K12录播设备渗透率约42%，五年提升23个百分点\n- 区县级教育云平台招标同比+37%\n- AI教研工具预算占比由8%升至15%\n\n### 趋势判断\n1. 录播基础设施进入普及中后期，竞争从『有没有』转向『用得好』\n2. AI教研工具成为新增长极，预算倾斜明显\n3. 政策持续推动『三个课堂』常态化落地\n\n### 对产品启示\n- 渗透率高但使用率低，应强化教研标注等『用好』类能力\n- AI教研报告可作为高级版差异化卖点重点发力\n- 教师培训/上手门槛是落地关键，需配培训材料与轻量引导",
      timestamp: "11:34",
    },
  ],
  executionStatuses: [
    "正在解析长文档内容...",
    "正在提取核心数据...",
    "正在归纳趋势判断...",
    "正在映射到产品启示...",
    "正在压缩篇幅...",
    "内容摘要生成完成 ✓",
  ],
  resultData: {
    conclusions: [
      "K12录播渗透率达42%，竞争从『覆盖』转向『用好』",
      "AI教研工具预算占比翻倍至15%，成新增长极",
      "区县级云平台招标同比+37%，下沉市场活跃",
      "教师数字化能力不足是落地瓶颈，需配套培训与上手引导",
    ],
    conclusionsTitle: "摘要要点",
    todos: [
      { task: "产品侧强化AI教研报告能力（高级版卖点）", assignee: "产品组", deadline: "本季度", priority: "高" },
      { task: "销售侧制作『用好录播』价值话术", assignee: "销售组", deadline: "本月", priority: "中" },
      { task: "配套生成教师上手培训材料", assignee: "培训组", deadline: "下月", priority: "中" },
    ],
  },
  modificationPrompt: "请再补充一条『风险提示』：预算从硬件转向软件，可能影响传统录播硬件销售。",
};
