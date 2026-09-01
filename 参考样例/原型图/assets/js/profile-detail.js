const targetProfile = {
  originalName: "حسن نصر الله",
  cnName: "哈桑·纳斯鲁拉",
  enName: "Hassan Nasrallah",
  alias: "真主党总书记",
  id: "T024-01562-0001",
  topic: "中东安全形势专题",
  country: "黎巴嫩",
  type: "政治人物 / 军事领导人",
  phone: "+961 70 123 456",
  email: "contact@hezbollah.org",
  org: "真主党（Hezbollah）",
  tags: ["抵抗组织领导人", "反以立场", "地区影响力", "什叶派领袖"],
  corpus: ["全网舆情库", "社交媒体库", "新闻库", "学术库", "论坛库"],
  updatedAt: "2025-05-24 10:28:35",
  risk: "高风险",
  status: "活跃中",
};

const dynamicRows = [
  {
    platform: "X",
    title: "就黎以边境局势发表强硬表态",
    type: "原创",
    tags: ["黎以边境", "地区安全", "真主党"],
    group: "中东安全观察群体",
    time: "2026-05-27 21:30",
    summary: "账号围绕黎以边境军事态势发布简短声明，强调组织将持续关注边境安全变化。",
    full: "完整正文显示该目标将黎以边境局势与地区安全议题相互绑定，重点提及抵抗阵营、民众安全和外部势力介入等话题，传播后被多个地区观察账号转发。",
  },
  {
    platform: "Telegram",
    title: "转发地区媒体关于停火谈判的报道",
    type: "转发",
    tags: ["停火谈判", "地区斡旋"],
    group: "黎巴嫩政治讨论群",
    time: "2026-05-26 18:05",
    summary: "转发报道并附加短评，指出停火方案仍需观察实际执行。",
    full: "该动态转发地区媒体消息，评论中强调谈判安排不能脱离安全现实，相关内容在阿拉伯语社群中形成二次扩散。",
  },
  {
    platform: "Facebook",
    title: "评论能源通道安全与地区稳定",
    type: "评论",
    tags: ["能源通道", "中东局势"],
    group: "地区政策分析账号",
    time: "2026-05-24 12:10",
    summary: "评论称地区稳定与能源通道安全相互关联，应警惕冲突外溢。",
    full: "评论正文围绕能源运输、安全风险和外部制裁展开，对区域国家的政策选择提出批评，并引发多个机构账号参与讨论。",
  },
];

const relationRows = [
  ["阿里·穆萨", "Telegram", "黎巴嫩", "组织宣传账号", "92", "386", "2026-05-27 22:10"],
  ["抵抗阵线新闻", "X", "伊朗", "媒体矩阵账号", "88", "294", "2026-05-27 19:40"],
  ["贝鲁特观察", "Facebook", "黎巴嫩", "地区评论员", "76", "146", "2026-05-26 17:18"],
  ["南部边境频道", "Telegram", "黎巴嫩", "本地资讯账号", "72", "128", "2026-05-25 15:02"],
];

const interactionRows = [
  ["@resistance_news", "X", "媒体账号", "伊朗", "机构运营", 126, 35, 42, 88, "2026-05-27", "高"],
  ["@beirut_watch", "Facebook", "个人账号", "黎巴嫩", "政治评论员", 74, 21, 18, 46, "2026-05-26", "中"],
  ["@south_border", "Telegram", "频道账号", "黎巴嫩", "地区资讯", 93, 16, 27, 34, "2026-05-25", "中"],
];

const friendRows = [
  ["伊朗最高领袖", "Telegram", "伊朗", "已匹配邮箱", "关联人物", "92%", "128次", "2025-05-24"],
  ["约伊纳·卡西姆", "X", "黎巴嫩", "已匹配手机号", "核心联系人", "86%", "96次", "2025-05-23"],
  ["阿巴斯·穆萨维", "Facebook", "黎巴嫩", "无社工信息", "历史联系人", "64%", "51次", "2025-05-21"],
];

const interactionOrganizations = [
  ["真主党 Hezbollah", 568, "38.6%", "核心组织"],
  ["伊朗革命卫队 IRGC", 342, "23.2%", "军事关联"],
  ["哈马斯 Hamas", 234, "15.9%", "地区组织"],
  ["黎巴嫩议会", 156, "10.6%", "政治机构"],
  ["叙利亚政府", 98, "6.7%", "政府机构"],
];

const interactionSubjects = [
  ["人物", 42.6, "#1a56db"],
  ["组织", 23.8, "#16a34a"],
  ["媒体账号", 14.2, "#f59e0b"],
  ["政府机构", 8.6, "#7c3aed"],
  ["社交群组", 6.4, "#0f766e"],
  ["普通用户", 4.4, "#64748b"],
];

const interactionTimeBuckets = [
  ["00:00-06:00", 36],
  ["06:00-12:00", 58],
  ["12:00-18:00", 82],
  ["18:00-24:00", 94],
];

const tweetOrganizations = [
  ["真主党 Hezbollah", 568],
  ["哈马斯 Hamas", 234],
  ["伊朗革命卫队 IRGC", 198],
  ["黎巴嫩议会", 156],
  ["以色列国防军", 128],
  ["联合国安理会", 87],
];

const tweetThemes = [
  ["政治立场", 28.6, "#1a56db"],
  ["军事冲突", 21.7, "#ef4444"],
  ["地区安全", 16.9, "#16a34a"],
  ["宗教信仰", 12.8, "#7c3aed"],
  ["纪念活动", 9.6, "#f59e0b"],
  ["国际关系", 6.8, "#0f766e"],
  ["其他", 3.6, "#64748b"],
];

const tweetTrend = [28, 34, 29, 42, 48, 40, 55, 62, 58, 66, 74, 70, 82, 88];

const mediaMonths = [
  {
    month: "2026-05",
    total: 23,
    items: Array.from({ length: 12 }, (_, index) => ({
      title: `边境局势相关图文 ${index + 1}`,
      platform: index % 2 ? "Telegram" : "X",
      type: index % 3 === 0 ? "视频" : index % 3 === 1 ? "图片" : "图文长帖",
      time: `2026-05-${String(27 - index).padStart(2, "0")} 18:20`,
    })),
  },
  {
    month: "2026-04",
    total: 18,
    items: Array.from({ length: 12 }, (_, index) => ({
      title: `地区讲话多媒体 ${index + 1}`,
      platform: index % 2 ? "Facebook" : "Telegram",
      type: index % 4 === 0 ? "直播切片" : "图片",
      time: `2026-04-${String(24 - index).padStart(2, "0")} 11:00`,
    })),
  },
];

function renderProfileDetailPage() {
  const pageContent = document.getElementById("pageContent");
  if (!pageContent) return;

  pageContent.innerHTML = `
    <section class="profile-detail-page">
      ${renderOverview()}
      ${renderTabs()}
      <section class="tab-content active" id="dynamic">${renderDynamicTab()}</section>
      <section class="tab-content" id="relation">${renderRelationTab()}</section>
      <section class="tab-content" id="interaction">${renderInteractionTab()}</section>
      <section class="tab-content" id="interaction-analysis">${renderInteractionAnalysisTab()}</section>
      <section class="tab-content" id="tweet-analysis">${renderTweetAnalysisTab()}</section>
      <section class="tab-content" id="media">${renderMediaTab()}</section>
      <section class="tab-content" id="deep-analysis">${renderDeepAnalysisTab()}</section>
    </section>
    ${renderMediaModal()}
    <div class="toast" id="detailToast">操作已提交</div>
  `;

  bindProfileDetailEvents();
}

function renderOverview() {
  return `
    <section class="profile-summary-card">
      <div class="profile-summary-main">
        <div class="profile-identity">
          <div class="profile-avatar">哈</div>
          <div class="profile-main">
            <div class="profile-name">${targetProfile.enName}</div>
            <div class="profile-tags">
              <span class="summary-tag tag-blue">个人</span>
              <span class="summary-tag tag-red">${targetProfile.risk}</span>
              <span class="summary-tag tag-green">${targetProfile.status}</span>
              <span class="summary-tag tag-danger-outline">重点关注</span>
            </div>
            <div class="profile-sub">ID：${targetProfile.id}</div>
            <div class="profile-sub">更新时间：${targetProfile.updatedAt}</div>
          </div>
        </div>
        <div class="profile-field-grid">
          <div class="profile-field-col">
            ${summaryField("所属专题", targetProfile.topic, true)}
            ${summaryField("别称", "真主党总书记、抵抗领袖")}
            ${summaryField("电子邮箱", targetProfile.email, true)}
            ${summaryField("电子邮箱/账号", targetProfile.org)}
            ${summaryField("参与语料库", targetProfile.corpus.join("、"))}
          </div>
          <div class="profile-field-col">
            ${summaryField("原文名称", targetProfile.originalName)}
            ${summaryField("国家/地区", targetProfile.country)}
            ${summaryField("手机/国籍", targetProfile.org)}
            ${summaryField("组织/团体", targetProfile.org, true)}
          </div>
          <div class="profile-field-col">
            ${summaryField("中文名称", targetProfile.cnName)}
            ${summaryField("目标类型", targetProfile.type)}
            ${summaryField("业务属性标签", targetProfile.tags.join("、"), true)}
          </div>
          <div class="profile-field-col">
            ${summaryField("英文名称", targetProfile.enName)}
            ${summaryField("手机/电话", targetProfile.phone)}
          </div>
        </div>
      </div>
      <div class="profile-actions">
        <button class="detail-btn primary" data-action="关注目标">+ 关注目标</button>
        <button class="detail-btn" data-action="生成报告">生成报告</button>
        <button class="detail-btn" data-action="导出画像">导出画像</button>
        <button class="detail-btn" data-action="更多操作">更多操作⌄</button>
      </div>
    </section>
  `;
}

function summaryField(label, value, link = false) {
  return `<div class="profile-field"><span class="label">${label}</span><span class="value ${link ? "link" : ""}" title="${value}">${value}</span></div>`;
}

function renderTabs() {
  const tabs = [
    ["dynamic", "动态信息"],
    ["relation", "社交关系"],
    ["interaction", "互动信息"],
    ["interaction-analysis", "互动分析"],
    ["tweet-analysis", "推文分析"],
    ["media", "多媒体库"],
    ["deep-analysis", "深度分析"],
  ];
  return `<nav class="profile-tabs">${tabs.map(([key, label], index) => `<button class="tab-item ${index === 0 ? "active" : ""}" data-tab="${key}" type="button">${label}</button>`).join("")}</nav>`;
}

function renderDynamicTab() {
  return `
    <section class="detail-card panel-card">
      <div class="dynamic-list">
        ${dynamicRows.map(renderDynamicItem).join("")}
      </div>
    </section>
  `;
}

function renderDynamicItem(item) {
  return `
    <article class="dynamic-item">
      <div class="dynamic-head">
        <div>
          <h3>${item.title}</h3>
          <div class="dynamic-meta">
            <span class="detail-tag">${item.platform}</span>
            <span class="detail-tag success">${item.type}</span>
            <span class="detail-tag warning">${item.time}</span>
            <span class="detail-tag">${item.group}</span>
          </div>
        </div>
        <button class="detail-btn" type="button" data-toggle-body>查看正文</button>
      </div>
      <p class="dynamic-summary">${item.summary}</p>
      <div class="tag-line">${item.tags.map((tag) => `<button class="detail-tag" data-keyword="${tag}">${tag}</button>`).join("")}</div>
      <p class="dynamic-full">${item.full}</p>
    </article>
  `;
}

function renderRelationTab() {
  return `
    <section class="detail-card panel-card relation-graph-card">
      <div class="analysis-card-head">
        <h3><span></span>关系图谱</h3>
        <div class="graph-tools">
          <button class="detail-btn" type="button" data-action="关系图谱全屏">全屏</button>
          <button class="detail-btn" type="button" data-action="关系图谱放大">放大</button>
          <button class="detail-btn" type="button" data-action="关系图谱缩小">缩小</button>
          <button class="detail-btn" type="button" data-action="关系图谱重置视图">重置视图</button>
        </div>
      </div>
      ${renderRelationGraph()}
    </section>
    <section class="detail-card panel-card friend-list-card">
      <div class="analysis-card-head">
        <h3><span></span>好友列表</h3>
        <em>共 128 个关联账号</em>
      </div>
      <div class="table-wrap">
        ${renderFriendTable()}
      </div>
    </section>
  `;
}

function renderInteractionTab() {
  return `
    <section class="stat-grid-detail">
      ${miniStat("互动账号数", "86")}
      ${miniStat("总转发次数", "1,284")}
      ${miniStat("总引用次数", "326")}
      ${miniStat("总@次数", "412")}
      ${miniStat("总评论次数", "968")}
    </section>
    <section class="detail-card panel-card">
      ${renderTable(["互动账号", "平台", "账号类型", "国家/地区", "社工信息", "转发", "引用", "@", "评论", "最近互动", "亲密度", "操作"], interactionRows.map((row) => [...row, `<button class="text-action" data-action="查看互动详情">互动详情</button> <button class="text-action" data-action="查看档案">档案</button> <button class="text-action" data-action="加入关注">关注</button>`]))}
    </section>
  `;
}

function renderInteractionAnalysisTab() {
  return `
    <section class="analysis-grid two-col">
      <div class="detail-card panel-card">
        <div class="analysis-card-head"><h3><span></span>涉及组织</h3></div>
        ${rankBars(interactionOrganizations.map(([name, count, ratio, tag]) => ({ name, count: `${count}次`, ratio, tag })))}
      </div>
      <div class="detail-card panel-card">
        <div class="analysis-card-head"><h3><span></span>主体分布</h3></div>
        ${donutPanel(interactionSubjects)}
      </div>
    </section>
    <section class="detail-card panel-card">
      <div class="analysis-card-head"><h3><span></span>时间分布</h3><em>互动高峰集中在 18:00-24:00</em></div>
      ${timeDistribution(interactionTimeBuckets)}
    </section>
  `;
}

function renderTweetAnalysisTab() {
  return `
    <section class="analysis-grid three-col">
      <div class="detail-card panel-card">
        <div class="analysis-card-head"><h3><span></span>主题分布</h3></div>
        ${donutPanel(tweetThemes)}
      </div>
      <div class="detail-card panel-card">
        <div class="analysis-card-head"><h3><span></span>时间分布</h3><em>近30天发文趋势</em></div>
        ${trendChart(tweetTrend)}
      </div>
      <div class="detail-card panel-card">
        <div class="analysis-card-head"><h3><span></span>涉及组织</h3></div>
        ${rankBars(tweetOrganizations.map(([name, count]) => ({ name, count: `${count}次`, ratio: `${Math.round((count / 568) * 100)}%`, tag: "组织" })))}
      </div>
    </section>
    <section class="detail-card panel-card">
      <div class="analysis-card-head"><h3><span></span>周内发布时间热力图</h3><em>颜色越深代表发文越集中</em></div>
      ${weekHeatmap()}
    </section>
  `;
}

function renderRelationGraph() {
  const nodes = [
    ["人物", "伊朗最高领袖", "node-person", "13%", "18%"],
    ["人物", "约伊纳·卡西姆", "node-person", "27%", "10%"],
    ["人物", "阿巴斯·穆萨维", "node-person", "19%", "72%"],
    ["组织", "真主党 Hezbollah", "node-org", "47%", "13%"],
    ["组织", "伊朗革命卫队 IRGC", "node-org", "65%", "18%"],
    ["组织", "黎巴嫩议会", "node-org", "78%", "62%"],
    ["地点", "黎巴嫩", "node-place", "9%", "47%"],
    ["地点", "贝鲁特", "node-place", "37%", "77%"],
    ["地点", "德黑兰", "node-place", "72%", "37%"],
    ["事件", "2016年利雅得行动", "node-event", "48%", "72%"],
    ["事件", "2019年相关声明", "node-event", "61%", "80%"],
    ["事件", "以巴冲突相关表态", "node-event", "82%", "20%"],
    ["账号", "Telegram @nasrallah", "node-account", "28%", "38%"],
    ["账号", "X @XNasrallah", "node-account", "57%", "45%"],
    ["账号", "Facebook nasrallah.official", "node-account", "77%", "79%"],
  ];

  return `
    <div class="relation-graph" id="relationGraph">
      <svg class="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 50 C28 20, 20 20, 13 18" />
        <path d="M50 50 C38 18, 34 14, 27 10" />
        <path d="M50 50 C32 62, 25 70, 19 72" />
        <path d="M50 50 C50 32, 48 24, 47 13" />
        <path d="M50 50 C58 28, 62 22, 65 18" />
        <path d="M50 50 C66 54, 75 58, 78 62" />
        <path d="M50 50 C32 44, 20 46, 9 47" />
        <path d="M50 50 C44 64, 40 72, 37 77" />
        <path d="M50 50 C62 42, 68 38, 72 37" />
        <path d="M50 50 C48 60, 48 68, 48 72" />
        <path d="M50 50 C56 62, 60 72, 61 80" />
        <path d="M50 50 C66 36, 76 26, 82 20" />
        <path d="M50 50 C42 44, 34 40, 28 38" />
        <path d="M50 50 C54 48, 56 46, 57 45" />
        <path d="M50 50 C66 58, 74 72, 77 79" />
      </svg>
      <div class="graph-legend">
        ${["人物", "组织", "地点", "事件", "账号"].map((item, index) => `<span class="legend-${index + 1}">${item}</span>`).join("")}
      </div>
      <button class="graph-node center" style="left:50%;top:50%" data-node="Hassan Nasrallah" type="button">Hassan Nasrallah</button>
      ${nodes.map(([type, name, cls, left, top]) => `<button class="graph-node ${cls}" style="left:${left};top:${top}" data-node="${name}" title="${type}：${name}" type="button">${name}</button>`).join("")}
    </div>
  `;
}

function renderFriendTable() {
  return renderTable(
    ["头像", "账号名称", "平台", "国家/地区", "社工信息", "关系类型", "亲密度", "互动次数", "最近互动时间", "操作"],
    friendRows.map(([name, platform, country, info, type, intimacy, count, time]) => [
      `<span class="friend-avatar">${name.slice(0, 1)}</span>`,
      `<strong>${name}</strong>`,
      `<span class="detail-tag">${platform}</span>`,
      country,
      info,
      `<span class="detail-tag success">${type}</span>`,
      `<span class="intimacy">${intimacy}</span>`,
      count,
      time,
      `<button class="text-action" data-action="查看${name}详情">查看详情</button><button class="text-action" data-action="查看${name}互动">查看互动</button><button class="text-action" data-action="关注${name}">加入关注</button>`,
    ]),
  );
}

function periodGroup(key, items, activeIndex = 0) {
  return `
    <div class="period-field">
      <label>时间范围</label>
      <div class="period-group">
        ${items.map((item, index) => `<button class="${index === activeIndex ? "active" : ""}" data-period="${key}" type="button">${item}</button>`).join("")}
      </div>
    </div>
  `;
}

function rankBars(items) {
  return `
    <div class="rank-list">
      ${items.map((item) => `
        <button class="rank-row" data-keyword="${item.name}" type="button">
          <span class="rank-main"><strong>${item.name}</strong><em>${item.tag}</em></span>
          <span class="rank-bar"><i style="width:${item.ratio}"></i></span>
          <span class="rank-count">${item.count}</span>
          <span class="rank-ratio">${item.ratio}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function donutPanel(items) {
  let start = 0;
  const gradient = items
    .map(([, value, color]) => {
      const end = start + value;
      const segment = `${color} ${start}% ${end}%`;
      start = end;
      return segment;
    })
    .join(", ");

  return `
    <div class="donut-panel">
      <div class="donut-chart" style="background: conic-gradient(${gradient})"><span>${items[0][1]}%</span></div>
      <div class="donut-legend">
        ${items.map(([name, value, color]) => `<button data-keyword="${name}" type="button"><i style="background:${color}"></i><span>${name}</span><strong>${value}%</strong></button>`).join("")}
      </div>
    </div>
  `;
}

function timeDistribution(items) {
  return `
    <div class="time-bars">
      ${items.map(([label, value]) => `
        <div class="time-bar">
          <span>${label}</span>
          <div><i style="width:${value}%"></i></div>
          <strong>${value}%</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function trendChart(values) {
  const max = Math.max(...values);
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${100 - (value / max) * 86}`).join(" ");
  return `
    <div class="trend-chart">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polyline points="${points}" />
      </svg>
      <div class="trend-axis"><span>05-01</span><span>05-15</span><span>05-30</span></div>
    </div>
  `;
}

function weekHeatmap() {
  const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const periods = ["00", "04", "08", "12", "16", "20"];
  return `
    <div class="week-heatmap">
      <div></div>
      ${periods.map((period) => `<span>${period}点</span>`).join("")}
      ${days.map((day, dayIndex) => `
        <strong>${day}</strong>
        ${periods.map((period, periodIndex) => `<i class="lv${((dayIndex + periodIndex) % 4) + 1}" title="${day} ${period}:00"></i>`).join("")}
      `).join("")}
    </div>
  `;
}

function renderMediaTab() {
  return mediaMonths
    .map(
      (month) => `
        <section class="detail-card media-month">
          <div class="media-head"><h3>${month.month}<span class="section-count">共 ${month.total} 条</span></h3><button class="text-action" data-more-media>查看更多</button></div>
          <div class="media-grid">
            ${month.items.map((item, index) => renderMediaCard(item, index >= 11)).join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function renderMediaCard(item, hidden) {
  return `
    <article class="media-card ${hidden ? "media-extra" : ""}" data-media='${encodeURIComponent(JSON.stringify(item))}'>
      <div class="media-thumb">${item.type}</div>
      <div class="media-body"><strong>${item.title}</strong><br />${item.platform} / ${item.time}</div>
    </article>
  `;
}

function renderDeepAnalysisTab() {
  return `
    <section class="deep-analysis-panel">
      <section class="deep-filter-bar">
        <div class="deep-filter-group deep-time-group">
          <span class="deep-filter-label">时间范围</span>
          <button class="deep-time-btn" data-deep-range type="button">近7天</button>
          <button class="deep-time-btn active" data-deep-range type="button">近30天</button>
          <button class="deep-time-btn" data-deep-range type="button">近90天</button>
          <button class="deep-time-btn" data-deep-range type="button">自定义时间 ▣</button>
        </div>
        <div class="deep-filter-group">
          <span class="deep-filter-label">平台</span>
          <select class="detail-select">
            <option>全部平台</option><option>Telegram</option><option>X / Twitter</option><option>YouTube</option><option>Facebook</option><option>Instagram</option><option>TikTok</option>
          </select>
        </div>
        <div class="deep-filter-group">
          <span class="deep-filter-label">类型</span>
          <select class="detail-select">
            <option>全部类型</option><option>原创</option><option>转发</option><option>引用</option><option>评论</option><option>提及</option>
          </select>
        </div>
        <button class="detail-btn primary" type="button" data-action="刷新深度分析">刷新分析</button>
        <div class="deep-filter-tip">ⓘ 默认分析近一个月言论</div>
      </section>

      <section class="deep-stat-grid">
        ${deepStatCard("言论总量", "12,875", "较上期 ↑ 18.6%", "blue", "评")}
        ${deepStatCard("被提及次数", "5,326", "较上期 ↑ 22.3%", "green", "@")}
        ${deepStatCard("关键词数", "156", "较上期 ↑ 6.7%", "purple", "#")}
        ${deepStatCard("活跃时段", "18:00-24:00", "占比 46.8%", "orange", "时")}
      </section>

      <section class="deep-main">
        <section class="deep-card">
          <div class="deep-card-title"><h3>发布时间段分布</h3></div>
          <div class="deep-time-bars">
            ${deepTimeBar("00:00-06:00", "6.7%", 6.7)}
            ${deepTimeBar("06:00-12:00", "21.4%", 21.4)}
            ${deepTimeBar("12:00-18:00", "25.1%", 25.1)}
            ${deepTimeBar("18:00-24:00", "46.8%", 46.8, true)}
          </div>
          <div class="deep-scale"><span>0%</span><span>10%</span><span>20%</span><span>30%</span><span>40%</span><span>50%</span></div>
          <div class="deep-insight">ⓘ 目标相关言论在 18:00-24:00 最为活跃，占比 46.8%，建议重点关注该时段舆情动态。</div>
        </section>

        <section class="deep-card deep-report-card">
          <div class="deep-card-title"><h3>分析报告</h3></div>
          ${deepReportSection("分析摘要", "本报告基于近30天内在全部平台上提及目标的公开言论数据，综合分析不同类型言论（直接提及、评论讨论、转发引用、组织声明、群组讨论等）的规模与特征，揭示目标在网络舆论中的传播态势、主要议题与潜在风险点。", "摘")}
          <section class="deep-report-section">
            <div class="deep-report-title"><span>发</span>重点发现</div>
            <ol class="deep-number-list">
              <li><strong>言论规模上升：</strong>近30天目标相关言论总量12,875条，较上期增长18.6%，被提及次数5,326次，较上期增长22.3%，关注度持续上升。</li>
              <li><strong>活跃时段集中：</strong>18:00-24:00为最活跃时段，占比46.8%；其次12:00-18:00占25.1%，需加强晚间舆情监测与响应。</li>
              <li><strong>议题以社会与政策类为主：</strong>舆论主要围绕政策解读、社会事件、民生议题展开，负面情绪占比较上期略有上升。</li>
              <li><strong>传播路径多元：</strong>除直接发帖外，转发引用与群组讨论贡献较高，部分议题在特定群组中出现扩散迹象，需关注二次传播风险。</li>
            </ol>
          </section>
          <section class="deep-report-section">
            <div class="deep-report-title"><span>词</span>高频关键词</div>
            <div class="deep-keyword-list">
              ${deepKeyword("政策", "1,235")}
              ${deepKeyword("民生", "987")}
              ${deepKeyword("改革", "812")}
              ${deepKeyword("就业", "743")}
              ${deepKeyword("发展", "688")}
              ${deepKeyword("监管", "612")}
              ${deepKeyword("民意", "587")}
              ${deepKeyword("透明", "471")}
              <button class="deep-keyword more" data-action="查看更多高频关键词" type="button">更多 &gt;</button>
            </div>
            <p class="deep-note">点击关键词可匹配相关言论内容，查看典型讨论与趋势变化。</p>
          </section>
          <section class="deep-report-section">
            <div class="deep-report-title"><span>判</span>研判建议</div>
            <ol class="deep-number-list">
              <li>持续关注18:00-24:00时段及周末的舆情变化，重点监测政策相关与民生议题的讨论走向。</li>
              <li>加强对转发引用与群组讨论的监测，及时识别潜在扩散源与重点传播节点，防范负面舆情放大。</li>
              <li>针对高频议题主动发布权威信息，做好政策解读与互动回应，引导理性讨论，降低误解与负面情绪。</li>
            </ol>
          </section>
          <div class="deep-data-note">ⓘ 数据统计周期：近30天（含今日）；较上期：前30天；数据来源：全部平台公开言论。</div>
        </section>
      </section>
    </section>
  `;
}

function deepStatCard(label, value, trend, tone, icon) {
  return `
    <div class="deep-stat-card">
      <div class="deep-stat-icon ${tone}">${icon}</div>
      <div>
        <span>${label}</span>
        <strong>${value}</strong>
        <em>${trend}</em>
      </div>
    </div>
  `;
}

function deepTimeBar(label, value, percent, active = false) {
  return `
    <div class="deep-time-row ${active ? "active" : ""}">
      <span>${label}</span>
      <div class="deep-time-track"><i style="width:${percent * 2}%"></i></div>
      <strong>${value}</strong>
    </div>
  `;
}

function deepReportSection(title, text, icon) {
  return `
    <section class="deep-report-section">
      <div class="deep-report-title"><span>${icon}</span>${title}</div>
      <p>${text}</p>
    </section>
  `;
}

function deepKeyword(word, count) {
  return `<button class="deep-keyword" data-keyword="${word}" type="button">${word} <strong>${count}</strong></button>`;
}

function filterSelect(label, options) {
  return `<div class="filter-field"><label>${label}</label><select class="detail-select">${options.map((item) => `<option>${item}</option>`).join("")}</select></div>`;
}

function renderTable(headers, rows) {
  return `<table class="detail-table"><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}

function miniStat(label, value) {
  return `<div class="mini-stat"><span>${label}</span><strong>${value}</strong></div>`;
}

function lineChart() {
  return `<div class="mock-chart"><svg class="mock-line" viewBox="0 0 420 150" preserveAspectRatio="none"><polyline fill="none" stroke="#1a56db" stroke-width="4" points="0,110 70,88 140,95 210,48 280,68 350,32 420,40"/><polyline fill="none" stroke="#7c3aed" stroke-width="3" points="0,128 70,112 140,116 210,82 280,88 350,60 420,70"/></svg></div>`;
}

function barChart() {
  return `<div class="bar-chart">${["00-03", "04-07", "08-11", "12-15", "16-19", "20-23", "24+"].map((label, index) => `<div class="bar"><i style="height:${45 + index * 8}%"></i><span>${label}</span></div>`).join("")}</div>`;
}

function wordCloud(words) {
  return `<div class="word-cloud-detail">${words.map((word, index) => `<button class="w${(index % 3) + 1}" data-keyword="${word}">${word}</button>`).join("")}</div>`;
}

function renderKeyLists() {
  return `
    <div class="tag-line"><span class="detail-tag">关键名称：纳斯鲁拉</span><span class="detail-tag">机构：真主党媒体办</span><span class="detail-tag">地点：贝鲁特</span><span class="detail-tag">联系人：阿里·穆萨</span></div>
    ${renderTable(["类型", "名称", "热度"], [["关键名称", "纳斯鲁拉", "92"], ["关键机构", "抵抗阵线新闻", "86"], ["关键地点", "黎巴嫩南部", "78"], ["密切联系人", "阿里·穆萨", "92"]])}
  `;
}

function renderMediaModal() {
  return `
    <div class="modal-mask" id="mediaModal">
      <div class="media-modal">
        <div class="modal-head"><strong id="mediaModalTitle">多媒体详情</strong><button class="drawer-close" data-close-media type="button">×</button></div>
        <div class="modal-body" id="mediaModalBody"></div>
        <div class="modal-foot"><span>原文链接已归档</span><button class="detail-btn primary" data-action="下载多媒体">下载</button></div>
      </div>
    </div>
  `;
}

function bindProfileDetailEvents() {
  document.querySelectorAll(".tab-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-item").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });

  document.addEventListener("click", (event) => {
    const bodyToggle = event.target.closest("[data-toggle-body]");
    if (bodyToggle) {
      const item = bodyToggle.closest(".dynamic-item");
      item.classList.toggle("expanded");
      bodyToggle.textContent = item.classList.contains("expanded") ? "收起正文" : "查看正文";
      return;
    }

    const relationView = event.target.closest("[data-relation-view]");
    if (relationView) {
      document.querySelectorAll("[data-relation-view]").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".relation-view").forEach((item) => item.classList.remove("active"));
      relationView.classList.add("active");
      document.getElementById(relationView.dataset.relationView).classList.add("active");
      return;
    }

    const period = event.target.closest("[data-period]");
    if (period) {
      document.querySelectorAll(`[data-period="${period.dataset.period}"]`).forEach((item) => item.classList.remove("active"));
      period.classList.add("active");
      showToast(`已切换时间范围：${period.textContent.trim()}`);
      return;
    }

    const deepRange = event.target.closest("[data-deep-range]");
    if (deepRange) {
      deepRange.closest(".deep-time-group").querySelectorAll("[data-deep-range]").forEach((item) => item.classList.remove("active"));
      deepRange.classList.add("active");
      showToast(`已切换深度分析时间：${deepRange.textContent.trim()}`);
      return;
    }

    const moreMedia = event.target.closest("[data-more-media]");
    if (moreMedia) {
      const month = moreMedia.closest(".media-month");
      month.classList.toggle("expanded");
      moreMedia.textContent = month.classList.contains("expanded") ? "收起" : "查看更多";
      return;
    }

    const mediaCard = event.target.closest(".media-card");
    if (mediaCard) {
      const data = JSON.parse(decodeURIComponent(mediaCard.dataset.media));
      document.getElementById("mediaModalTitle").textContent = data.title;
      document.getElementById("mediaModalBody").innerHTML = `<div class="media-thumb" style="height:260px;border-radius:12px;margin-bottom:12px">${data.type}</div><p>发布平台：${data.platform}</p><p>发布时间：${data.time}</p><p>关联言论：${data.title}</p><div class="tag-line"><span class="detail-tag">中东局势</span><span class="detail-tag">真主党</span></div>`;
      document.getElementById("mediaModal").classList.add("open");
      return;
    }

    if (event.target.closest("[data-close-media]") || event.target.id === "mediaModal") {
      document.getElementById("mediaModal").classList.remove("open");
      return;
    }

    const keyword = event.target.closest("[data-keyword]");
    if (keyword) {
      showToast(`已筛选关键词：${keyword.dataset.keyword || keyword.textContent.trim()}`);
      return;
    }

    const node = event.target.closest("[data-node]");
    if (node) {
      showToast(`节点详情：${node.dataset.node}`);
      return;
    }

    const action = event.target.closest("[data-action]");
    if (action) showToast(`${action.dataset.action}已提交`);
  });
}

function showToast(text) {
  const toast = document.getElementById("detailToast");
  toast.textContent = text;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1600);
}

renderProfileDetailPage();
