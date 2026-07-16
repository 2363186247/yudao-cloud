import {
  Bell,
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardList,
  Database,
  FileSearch,
  Flag,
  Globe2,
  LayoutGrid,
  ListChecks,
  Radar,
  Search,
  ShieldAlert,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";

export const summaryMetrics = [
  { key: "targets", title: "目标总数", value: "1,289", change: "+128", icon: UserRoundSearch, tone: "blue" },
  { key: "dynamics", title: "领域动态总数", value: "35,892", change: "+3,256", icon: Radar, tone: "blue" },
  { key: "sensitive", title: "领域敏感动态总数", value: "2,153", change: "+236", icon: ShieldAlert, tone: "red" },
  { key: "warnings", title: "预警事件总数", value: "368", change: "+48", icon: Bell, tone: "purple" },
  { key: "focus", title: "关注目标总数", value: "532", change: "+56", icon: UsersRound, tone: "green" },
  { key: "topics", title: "专题任务总数", value: "24", change: "+4", icon: ClipboardList, tone: "cyan" },
  { key: "overseas", title: "境外人员关注数", value: "187", change: "+19", icon: Globe2, tone: "blue" },
  { key: "judgements", title: "研判任务总数", value: "76", change: "+8", icon: BookOpenCheck, tone: "amber" },
];

export const hotSearches = ["中美关系", "人工智能", "俄乌冲突", "气候变化", "芯片", "网络安全"];

export const hotWords = [
  { word: "人工智能", weight: 5 },
  { word: "中美关系", weight: 4 },
  { word: "新能源", weight: 3 },
  { word: "芯片", weight: 4 },
  { word: "大数据", weight: 2 },
  { word: "欧盟", weight: 2 },
  { word: "网络安全", weight: 2 },
  { word: "可持续发展", weight: 2 },
  { word: "国际合作", weight: 2 },
  { word: "网络攻击", weight: 2 },
  { word: "一带一路", weight: 1 },
  { word: "贸易", weight: 1 },
  { word: "技术创新", weight: 1 },
  { word: "中东局势", weight: 1 },
  { word: "经贸", weight: 1 },
];

export const dynamicRanks = {
  international: [
    { id: "event-1", title: "美欧就对俄新一轮制裁达成一致", source: "路透社", time: "05-25 10:24", risk: "高", status: "待研判", category: "国际动态", area: "欧洲" },
    { id: "event-2", title: "美联储暗示今年可能降息", source: "彭博社", time: "05-25 09:58", risk: "中", status: "监测中", category: "国际动态", area: "北美" },
    { id: "event-3", title: "日本将加强半导体产业合作", source: "NHK", time: "05-25 08:41", risk: "中", status: "监测中", category: "产业动态", area: "东亚" },
    { id: "event-4", title: "欧盟通过新数字服务法案", source: "BBC", time: "05-25 07:33", risk: "低", status: "已办结", category: "政策动态", area: "欧洲" },
    { id: "event-5", title: "印度与加拿大外交关系紧张升级", source: "Al Jazeera", time: "05-25 06:15", risk: "高", status: "处置中", category: "外交动态", area: "南亚" },
  ],
  domestic: [
    { id: "event-6", title: "国内多地迎来高温天气", source: "新华社", time: "05-25 10:30", risk: "低", status: "监测中", category: "国内动态", area: "全国" },
    { id: "event-7", title: "我国发布人工智能发展白皮书", source: "人民网", time: "05-25 09:45", risk: "中", status: "已办结", category: "科技动态", area: "北京" },
    { id: "event-8", title: "国内成品油价格迎来上调", source: "央视网", time: "05-25 08:30", risk: "中", status: "监测中", category: "经济动态", area: "全国" },
    { id: "event-9", title: "新能源汽车销量持续增长", source: "经济日报", time: "05-25 07:20", risk: "低", status: "已办结", category: "产业动态", area: "华东" },
    { id: "event-10", title: "多地出台楼市新政促市场回暖", source: "财新网", time: "05-25 06:05", risk: "中", status: "待研判", category: "民生动态", area: "多地" },
  ],
};

export const followDynamics = {
  local: [
    { id: "follow-1", title: "某地加强数据安全管理措施", source: "本地媒体", time: "05-25 10:20", risk: "中", status: "监测中", category: "本地动态", area: "本地" },
    { id: "follow-2", title: "本地企业参与国际展会取得成果", source: "本地媒体", time: "05-25 09:15", risk: "低", status: "已办结", category: "产业动态", area: "本地" },
    { id: "follow-3", title: "某地启动新一轮环境整治行动", source: "本地媒体", time: "05-25 08:40", risk: "低", status: "监测中", category: "治理动态", area: "本地" },
    { id: "follow-4", title: "本地教育政策有所调整", source: "本地媒体", time: "05-25 07:30", risk: "低", status: "已办结", category: "政策动态", area: "本地" },
    { id: "follow-5", title: "某地重大项目开工建设", source: "本地媒体", time: "05-25 06:10", risk: "中", status: "处置中", category: "项目动态", area: "本地" },
  ],
  media: [
    { id: "follow-6", title: "重点账号讨论跨境经贸议题", source: "自媒体", time: "05-25 10:11", risk: "中", status: "待研判", category: "舆情动态", area: "网络" },
    { id: "follow-7", title: "多个账号转发芯片产业评论", source: "自媒体", time: "05-25 09:36", risk: "低", status: "监测中", category: "舆情动态", area: "网络" },
    { id: "follow-8", title: "境外平台出现涉本地话题讨论", source: "自媒体", time: "05-25 08:22", risk: "高", status: "处置中", category: "境外动态", area: "网络" },
    { id: "follow-9", title: "重点博主发布国际关系解读", source: "自媒体", time: "05-25 07:08", risk: "中", status: "监测中", category: "舆情动态", area: "网络" },
  ],
};

export const riskPrediction = {
  total: 24,
  levels: [
    { key: "danger", label: "危险级", value: 2, percent: "8.33%", risk: "高", color: "#ef3d32" },
    { key: "serious", label: "严重级", value: 7, percent: "29.17%", risk: "中", color: "#ff7a1a" },
    { key: "warning", label: "警示级", value: 15, percent: "62.50%", risk: "低", color: "#f5b400" },
  ],
};

export const quickTools = [
  { title: "信息查询", path: "/search/info", icon: Search },
  { title: "全国联网查询", path: "/search/national-network", icon: Database },
  { title: "事件榜单", path: "/warning/rank", icon: Bell },
  { title: "我的事件", path: "/warning/my-events", icon: Flag },
  { title: "我的订阅", path: "/warning/subscriptions", icon: ListChecks },
  { title: "专题任务", path: "/topic/tasks", icon: BriefcaseBusiness },
  { title: "目标画像", path: "/profile/detail", icon: UserRoundSearch },
  { title: "FF人员反制数据分析", path: "/gang/person-files", icon: ShieldAlert },
  { title: "境外人员管理", path: "/overseas/person-list", icon: Globe2 },
  { title: "综合研判", path: "/judgement/workbench", icon: FileSearch },
];

export const dashboardActions = [
  { title: "自定义布局", icon: LayoutGrid },
  { title: "添加组件", icon: FileSearch, primary: true },
  { title: "工具管理", icon: BriefcaseBusiness },
];
