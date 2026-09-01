export const menuConfig = [
  {
    key: "dashboard",
    title: "工作台",
    path: "/dashboard",
    children: [
      {
        key: "dashboard-home",
        title: "个人工作台",
        path: "/dashboard",
        file: "dashboard/DashboardPage",
        hidePageHeader: true,
        description: "展示数据汇总、信息搜索、高频热词、动态热榜、关注动态、风险预测和快捷入口。",
      },
    ],
  },
  {
    key: "warning",
    title: "事件预警",
    children: [
      { key: "warning-rank", title: "事件榜单", path: "/warning/rank", file: "warning/EventRank" },
      { key: "warning-my-events", title: "我的事件", path: "/warning/my-events", file: "warning/MyEvents" },
      { key: "warning-subscriptions", title: "我的订阅", path: "/warning/subscriptions", file: "warning/Subscriptions" },
    ],
  },
  {
    key: "topic",
    title: "专题监测",
    children: [
      { key: "topic-dynamics", title: "专题池", path: "/topic/dynamics", file: "topic/TopicDynamics" },
      { key: "topic-reports", title: "专题报告", path: "/topic/reports", file: "topic/TopicReports" },
      { key: "topic-settings", title: "专题创建", path: "/topic/settings", file: "topic/TopicSettings" },
    ],
  },
  {
    key: "push",
    title: "业务推送",
    children: [
      { key: "push-tasks", title: "推送任务", path: "/push/tasks", file: "push/PushTasks" },
      { key: "push-records", title: "推送记录", path: "/push/records", file: "push/PushRecords" },
      { key: "push-feedback", title: "接收反馈", path: "/push/feedback", file: "push/PushFeedback" },
      { key: "push-settings", title: "推送配置", path: "/push/settings", file: "push/PushSettings" },
    ],
  },
  {
    key: "profile",
    title: "目标画像分析",
    children: [
      { key: "profile-list", title: "目标列表", path: "/profile/list", file: "profile/TargetList" },
      { key: "profile-detail", title: "目标画像", path: "/profile/detail", file: "profile/TargetDetail" },
      { key: "profile-tracks", title: "动态轨迹", path: "/profile/tracks", file: "profile/TargetTracks" },
      { key: "profile-relations", title: "关系分析", path: "/profile/relations", file: "profile/RelationAnalysis" },
      { key: "profile-tags", title: "风险标签", path: "/profile/tags", file: "profile/RiskTags" },
    ],
  },
  {
    key: "gang",
    title: "FF人员反制数据分析",
    children: [
      { key: "gang-person-files", title: "人员档案", path: "/gang/person-files", file: "gang/PersonFiles" },
      { key: "gang-risk-analysis", title: "风险分析", path: "/gang/risk-analysis", file: "gang/RiskAnalysis" },
      { key: "gang-relation-network", title: "关系网络", path: "/gang/relation-network", file: "gang/RelationNetwork" },
      { key: "gang-clues", title: "反制线索", path: "/gang/clues", file: "gang/CounterClues" },
    ],
  },
  {
    key: "search",
    title: "综合查询",
    children: [
      { key: "search-info", title: "信息查询", path: "/search/info", file: "search/InfoSearch" },
      { key: "search-national-network", title: "全国联网查询", path: "/search/national-network", file: "search/NationalNetwork" },
    ],
  },
  {
    key: "overseas",
    title: "境外人员管理",
    children: [
      { key: "overseas-person-list", title: "人员列表", path: "/overseas/person-list", file: "overseas/PersonList" },
      { key: "overseas-person-files", title: "人员档案", path: "/overseas/person-files", file: "overseas/PersonFiles" },
      { key: "overseas-entry-dynamics", title: "入境动态", path: "/overseas/entry-dynamics", file: "overseas/EntryDynamics" },
      { key: "overseas-activity-tracks", title: "活动轨迹", path: "/overseas/activity-tracks", file: "overseas/ActivityTracks" },
      { key: "overseas-warnings", title: "关注预警", path: "/overseas/warnings", file: "overseas/Warnings" },
    ],
  },
  {
    key: "judgement",
    title: "综合研判",
    children: [
      { key: "judgement-workbench", title: "研判工作台", path: "/judgement/workbench", file: "judgement/JudgementWorkbench" },
      { key: "judgement-clues", title: "线索研判", path: "/judgement/clues", file: "judgement/ClueJudgement" },
      { key: "judgement-events", title: "事件研判", path: "/judgement/events", file: "judgement/EventJudgement" },
      { key: "judgement-targets", title: "目标研判", path: "/judgement/targets", file: "judgement/TargetJudgement" },
      { key: "judgement-reports", title: "研判报告", path: "/judgement/reports", file: "judgement/JudgementReports" },
    ],
  },
];

export const flatMenus = menuConfig.flatMap((module) =>
  module.children.map((child) => ({
    ...child,
    moduleKey: module.key,
    moduleTitle: module.title,
  })),
);

export const defaultRoute = "/dashboard";

export function getModuleByPath(pathname) {
  return menuConfig.find((module) => module.children.some((child) => child.path === pathname)) || menuConfig[0];
}

export function getPageByPath(pathname) {
  return flatMenus.find((item) => item.path === pathname) || flatMenus[0];
}

export function getDefaultChildPath(moduleKey) {
  return menuConfig.find((module) => module.key === moduleKey)?.children[0]?.path || defaultRoute;
}
