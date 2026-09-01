const menuConfig = [
  {
    title: "工作台",
    key: "dashboard",
    url: "./dashboard.html",
    defaultPage: "dashboard",
    children: [{ title: "个人工作台", key: "dashboard", url: "./dashboard.html" }],
  },
  {
    title: "事件预警",
    key: "warning",
    url: "./warning-rank.html",
    defaultPage: "warning-rank",
    children: [
      { title: "事件榜单", key: "warning-rank", url: "./warning-rank.html" },
      { title: "我的事件", key: "warning-my-events", url: "./warning-my-events.html" },
      { title: "我的订阅", key: "warning-subscriptions", url: "./warning-subscriptions.html" },
    ],
  },
  {
    title: "专题监测",
    key: "topic",
    url: "./topic-dynamics.html",
    defaultPage: "topic-dynamics",
    children: [
      { title: "专题池", key: "topic-dynamics", url: "./topic-dynamics.html" },
      { title: "专题详情", key: "topic-reports", url: "./topic-reports.html" },
      { title: "专题创建", key: "topic-settings", url: "./topic-settings.html" },
    ],
  },
  {
    title: "业务推送",
    key: "push",
    url: "./business-push/index.html",
    defaultPage: "business-push-index",
    children: [
      { title: "专题分类", key: "business-push-index", url: "./business-push/index.html" },
      { title: "新建分类", key: "business-push-create", url: "./business-push/create.html" },
      { title: "推送记录", key: "business-push-record", url: "./business-push/push-record.html" },
      { title: "推送反馈", key: "business-push-feedback", url: "./business-push/feedback.html" },
    ],
  },
  {
    title: "境外人员管理",
    key: "foreign-person",
    url: "./overseas_person_list.html",
    defaultPage: "overseas-person-list-new",
    children: [
      { title: "境外人员列表", key: "overseas-person-list-new", url: "./overseas_person_list.html" },
      { title: "境外人员登记", key: "person-register", url: "./person_register.html" },
      { title: "预警规则管理", key: "warning-rules", url: "./warning_rules.html" },
      { title: "比对发现", key: "comparison-findings", url: "./comparison_findings.html" },
    ],
  },
  {
    title: "目标画像分析",
    key: "profile",
    url: "./target_pool.html",
    defaultPage: "profile-list",
    children: [
      { title: "目标列表", key: "profile-list", url: "./target_pool.html" },
      { title: "目标画像", key: "profile-detail", url: "./profile-detail.html" },
      { title: "动态轨迹", key: "profile-tracks", url: "./profile-tracks.html" },
      { title: "关系分析", key: "profile-relations", url: "./profile-relations.html" },
      { title: "风险标签", key: "profile-tags", url: "./profile-tags.html" },
    ],
  },
  {
    title: "反制数据分析",
    key: "gang",
    url: "./gang-person-files.html",
    defaultPage: "gang-person-files",
    children: [
      { title: "FF人员反制数据分析", key: "gang-person-files", url: "./gang-person-files.html" },
      { title: "反制编号库", key: "counter-account-pool", url: "./counter-account-pool.html" },
      { title: "风险分析", key: "gang-risk-analysis", url: "./gang-risk-analysis.html" },
      { title: "关系网络", key: "gang-relation-network", url: "./gang-relation-network.html" },
      { title: "反制线索", key: "gang-clues", url: "./gang-clues.html" },
    ],
  },
  {
    title: "信息查询",
    key: "search",
    url: "./search-info.html",
    defaultPage: "search-info",
    children: [
      { title: "信息查询", key: "search-info", url: "./search-info.html" },
      { title: "全国联网查询", key: "search-national-network", url: "./search-national-network.html" },
    ],
  },
  {
    title: "境外人员管理",
    key: "overseas",
    url: "./overseas-person-list.html",
    defaultPage: "overseas-person-list",
    children: [
      { title: "人员列表", key: "overseas-person-list", url: "./overseas-person-list.html" },
      { title: "人员档案", key: "overseas-person-files", url: "./overseas-person-files.html" },
      { title: "入境动态", key: "overseas-entry-dynamics", url: "./overseas-entry-dynamics.html" },
      { title: "活动轨迹", key: "overseas-activity-tracks", url: "./overseas-activity-tracks.html" },
      { title: "关注预警", key: "overseas-warnings", url: "./overseas-warnings.html" },
    ],
  },
  {
    title: "综合研判",
    key: "judgement",
    url: "./judgement-workbench.html",
    defaultPage: "judgement-workbench",
    children: [
      { title: "研判工作台", key: "judgement-workbench", url: "./judgement-workbench.html" },
      { title: "线索研判", key: "judgement-clues", url: "./judgement-clues.html" },
      { title: "事件研判", key: "judgement-events", url: "./judgement-events.html" },
      { title: "目标研判", key: "judgement-targets", url: "./judgement-targets.html" },
      { title: "研判报告", key: "judgement-reports", url: "./judgement-reports.html" },
    ],
  },
  {
    title: "智慧大屏",
    key: "screen",
    url: "./data-analysis-screen.html",
    defaultPage: "data-analysis-screen",
    children: [
      { title: "数据分析大屏", key: "data-analysis-screen", url: "./data-analysis-screen.html" },
      { title: "热点分析大屏", key: "hotspot-analysis-screen", url: "./hotspot-analysis-screen.html" },
      { title: "大屏设置", key: "screen-settings", url: "./screen-settings.html" },
    ],
  },
];

function getCurrentModule(moduleKey) {
  return menuConfig.find((item) => item.key === moduleKey) || menuConfig[0];
}

function getCurrentPage(pageKey) {
  return menuConfig.flatMap((item) => item.children).find((item) => item.key === pageKey);
}
