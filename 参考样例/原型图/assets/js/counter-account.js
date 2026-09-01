const counterAccount = {
  name: "正义之声_FF联盟",
  code: "FK-2025-000128",
  platformAccount: "@JusticeWatcher_US",
  org: "FF反制专项组",
  country: "美国",
  type: "反制评论账号",
  status: "活跃中",
  createdAt: "2025-01-12",
  updatedAt: "2025-05-24 10:28:35",
  topic: "跨境有组织犯罪治理专题",
  platforms: "X / YouTube / Instagram / Telegram",
  activityCount: "186 次",
  commentCount: "7,876 条",
  lastActiveAt: "2025-05-24 21:36:12",
};

const counterActivities = [
  {
    type: "发布推文",
    platform: "X",
    summary: "新货已经到港，南部路线畅通，今晚有大动作。",
    publishedAt: "2025-05-24 08:45:12",
    status: "已完成",
    account: "@JohnnyMartinez",
    link: "https://x.com/JohnnyMartinez/status/1926348754862",
    detail: "新货已经到港，南部路线畅通，今晚有大动作。#LA #Business #NoSnitching",
    liveDuration: "—",
    metrics: ["2,344", "1,856", "5,682", "312", "—"],
    comments: [
      ["@JusticeWatcher_US", "罪犯终将落网，社区不会容忍！", "2025-05-24 08:47:22", "X", "反对 / 有效"],
      ["@LA_AgainstCrime", "别再伤害更多家庭！", "2025-05-24 08:48:05", "X", "反对 / 有效"],
      ["@StopTheCartels", "执法部门正在盯着你们！", "2025-05-24 08:49:31", "X", "反对 / 强提醒"],
      ["@CommunityForLA", "这不是在炫耀，而是在让社区受害！", "2025-05-24 08:50:12", "X", "反对 / 有效"],
    ],
  },
  {
    type: "直播",
    platform: "YouTube",
    summary: "与帮派上层直播，讨论新计划和货物流向。",
    publishedAt: "2025-05-23 21:15:08",
    status: "进行中",
    account: "Johnny Live",
    link: "https://youtube.com/watch?v=counter-demo",
    detail: "直播中多次提及南部路线、资金转移和线下会面安排，评论区出现煽动性互动。",
    liveDuration: "01:32:45",
    metrics: ["1,506", "742", "4,210", "186", "01:32:45"],
    comments: [
      ["@JusticeWatcher_US", "直播内容已留痕，相关线索会被持续核查。", "2025-05-23 21:22:41", "YouTube", "警示 / 有效"],
      ["@StopTheCartels", "不要被这些话术诱导，远离犯罪网络。", "2025-05-23 21:25:08", "YouTube", "劝阻 / 有效"],
      ["@LA_AgainstCrime", "社区安全不能成为流量表演。", "2025-05-23 21:31:16", "YouTube", "反对 / 有效"],
    ],
  },
  {
    type: "发布图文",
    platform: "Instagram",
    summary: "展示新车与奢侈品，引发粉丝关注和模仿讨论。",
    publishedAt: "2025-05-23 18:25:44",
    status: "已完成",
    account: "johnny_lux",
    link: "https://instagram.com/p/counter-demo",
    detail: "图片内容以豪车、现金和奢侈品为主，评论区出现帮派符号和线下邀约暗语。",
    liveDuration: "—",
    metrics: ["896", "214", "3,405", "92", "—"],
    comments: [
      ["@JusticeWatcher_US", "炫耀犯罪所得不会带来真正的尊重。", "2025-05-23 18:31:09", "Instagram", "反对 / 有效"],
      ["@CommunityForLA", "请停止向青少年包装危险生活方式。", "2025-05-23 18:36:21", "Instagram", "劝阻 / 有效"],
    ],
  },
  {
    type: "发布消息",
    platform: "Telegram",
    summary: "发布秘密消息，疑似交易信息与集合地点。",
    publishedAt: "2025-05-22 14:20:33",
    status: "已终止",
    account: "SouthRouteChannel",
    link: "https://t.me/south-route-demo",
    detail: "频道内出现短时可见消息，包含地点暗号、交易提醒和规避执法提示。",
    liveDuration: "—",
    metrics: ["428", "316", "1,032", "54", "—"],
    comments: [
      ["@JusticeWatcher_US", "相关内容已被记录，继续传播会扩大法律风险。", "2025-05-22 14:25:10", "Telegram", "强提醒 / 有效"],
      ["@StopTheCartels", "不要参与任何线下交易邀约。", "2025-05-22 14:27:48", "Telegram", "劝阻 / 有效"],
    ],
  },
  {
    type: "发布短视频",
    platform: "TikTok",
    summary: "短视频暗示街区控制力，使用帮派音乐与手势。",
    publishedAt: "2025-05-21 19:06:27",
    status: "已完成",
    account: "@southblock_life",
    link: "https://tiktok.com/@southblock_life/video/demo",
    detail: "视频包含帮派符号、车辆位置和疑似成员聚集画面，传播速度较快。",
    liveDuration: "—",
    metrics: ["1,128", "640", "8,206", "246", "—"],
    comments: [
      ["@JusticeWatcher_US", "这类内容会伤害真实社区，请停止扩散。", "2025-05-21 19:10:33", "TikTok", "反对 / 有效"],
      ["@LA_AgainstCrime", "不要把危险行为当作娱乐。", "2025-05-21 19:14:06", "TikTok", "劝阻 / 有效"],
    ],
  },
];

const targetInfo = {
  name: "正义之声 FF联盟",
  tags: ["反制账号", "活跃中", "重点账号"],
  counterId: "FK-2025-000128",
  account: "@JusticeWatcher_US",
  organization: "FF反制专项组",
  accountType: "反制评论账号",
  country: "美国",
  createTime: "2025-01-12",
  relatedTopic: "跨境有组织犯罪治理专题",
  mainPlatforms: "X / YouTube / Instagram / Telegram",
  latestActiveTime: "2025-05-24 21:36:12",
  updateTime: "2025-05-24 22:10:00",
};

const counterActivityRecords = [
  {
    id: "act-001",
    type: "发布推文",
    platform: "X",
    summary: "新货已经到港，南部路线畅通，今晚有大动作。",
    publishedAt: "2025-05-24 08:45:12",
    status: "已完成",
    account: "@JohnnyMartinez",
    remark: "内容包含路线暗示和线下行动暗语，已由值班人员完成处置记录。",
    disposal: {
      interventionTime: "2025-05-24 08:47:00",
      accountCount: 4,
      commentCount: 4,
      result: "反制 / 有效",
    },
    comments: [
      ["@JusticeWatcher_US", "犯罪终将落网，社区不会容忍。", "2025-05-24 08:47:22", "X", "反制 / 有效"],
      ["@LA_AgainstCrime", "别再伤害更多家庭。", "2025-05-24 08:48:05", "X", "反制 / 有效"],
      ["@StopTheCartels", "执法部门正在持续关注相关行为。", "2025-05-24 08:49:31", "X", "反制 / 持续中"],
      ["@CommunityForLA", "这不是炫耀，而是在让社区受害。", "2025-05-24 08:50:12", "X", "反制 / 有效"],
    ],
  },
  {
    id: "act-002",
    type: "直播",
    platform: "YouTube",
    summary: "直播中讨论新计划和货物流向，评论区出现煽动性互动。",
    publishedAt: "2025-05-23 21:15:08",
    status: "进行中",
    account: "Johnny Live",
    remark: "处置仍在持续，需跟进评论区后续回复。",
    disposal: {
      interventionTime: "2025-05-23 21:22:00",
      accountCount: 3,
      commentCount: 3,
      result: "反制 / 持续中",
    },
    comments: [
      ["@JusticeWatcher_US", "直播内容已留痕，相关线索会被持续核查。", "2025-05-23 21:22:41", "YouTube", "反制 / 持续中"],
      ["@StopTheCartels", "不要被这些话术诱导，远离犯罪网络。", "2025-05-23 21:25:08", "YouTube", "反制 / 有效"],
      ["@LA_AgainstCrime", "社区安全不能成为流量表演。", "2025-05-23 21:31:16", "YouTube", "反制 / 有效"],
    ],
  },
  {
    id: "act-003",
    type: "发布图文",
    platform: "Instagram",
    summary: "展示新车与奢侈品，引发粉丝关注和模仿讨论。",
    publishedAt: "2025-05-23 18:25:44",
    status: "已完成",
    account: "johnny_lux",
    remark: "评论内容已完成维护，暂未发现新增互动需要处置。",
    disposal: {
      interventionTime: "2025-05-23 18:30:00",
      accountCount: 2,
      commentCount: 2,
      result: "反制 / 有效",
    },
    comments: [
      ["@JusticeWatcher_US", "炫耀犯罪所得不会带来真正的尊重。", "2025-05-23 18:31:09", "Instagram", "反制 / 有效"],
      ["@CommunityForLA", "请停止向青少年包装危险生活方式。", "2025-05-23 18:36:21", "Instagram", "反制 / 有效"],
    ],
  },
  {
    id: "act-004",
    type: "发布消息",
    platform: "Telegram",
    summary: "发布疑似交易信息与集合地点，后续内容已不可见。",
    publishedAt: "2025-05-22 14:20:33",
    status: "已终止",
    account: "SouthRouteChannel",
    remark: "活动已终止，仅保留人工录入的处置摘要和评论留痕。",
    disposal: {
      interventionTime: "2025-05-22 14:25:00",
      accountCount: 2,
      commentCount: 2,
      result: "已终止",
    },
    comments: [
      ["@JusticeWatcher_US", "相关内容已被记录，继续传播会扩大法律风险。", "2025-05-22 14:25:10", "Telegram", "反制 / 有效"],
      ["@StopTheCartels", "不要参与任何线下交易邀约。", "2025-05-22 14:27:48", "Telegram", "已终止"],
    ],
  },
  {
    id: "act-005",
    type: "发布短视频",
    platform: "TikTok",
    summary: "短视频暗示街区控制力，使用帮派音乐与手势。",
    publishedAt: "2025-05-21 19:06:27",
    status: "已完成",
    account: "@southblock_life",
    remark: "已安排两条反制评论，后续转为低频维护。",
    disposal: {
      interventionTime: "2025-05-21 19:10:00",
      accountCount: 2,
      commentCount: 2,
      result: "反制 / 有效",
    },
    comments: [
      ["@JusticeWatcher_US", "这类内容会伤害真实社区，请停止扩散。", "2025-05-21 19:10:33", "TikTok", "反制 / 有效"],
      ["@LA_AgainstCrime", "不要把危险行为当作娱乐。", "2025-05-21 19:14:06", "TikTok", "反制 / 有效"],
    ],
  },
];

const counterPoolAccounts = [
  {
    avatar: "正",
    name: "正义之声 FF联盟",
    code: "FK-2025-000128",
    handle: "@JusticeWatcher_US",
    platforms: "X / YouTube",
    org: "FF反制专项组",
    country: "美国",
    topic: "跨境有组织犯罪治理",
    status: "活跃中",
    activityCount: "186",
    commentCount: "7,876",
  },
  {
    avatar: "L",
    name: "LA_AgainstCrime",
    code: "FK-2025-000129",
    handle: "@LA_AgainstCrime",
    platforms: "X / Instagram",
    org: "洛杉矶社区反制组",
    country: "美国",
    topic: "社区对照账号",
    status: "活跃中",
    activityCount: "142",
    commentCount: "5,204",
  },
  {
    avatar: "S",
    name: "StopTheCartels",
    code: "FK-2025-000130",
    handle: "@StopTheCartels",
    platforms: "YouTube / TikTok",
    org: "跨境犯罪反制组",
    country: "墨西哥",
    topic: "强援FF账号",
    status: "活跃中",
    activityCount: "98",
    commentCount: "3,812",
  },
  {
    avatar: "C",
    name: "CommunityForLA",
    code: "FK-2025-000131",
    handle: "@CommunityForLA",
    platforms: "Facebook / X",
    org: "社区安全协作组",
    country: "美国",
    topic: "社区引导账号",
    status: "维护中",
    activityCount: "76",
    commentCount: "2,966",
  },
  {
    avatar: "T",
    name: "TruthOverFear",
    code: "FK-2025-000132",
    handle: "@TruthOverFear",
    platforms: "Telegram / X",
    org: "舆论澄清专项组",
    country: "美国",
    topic: "澄清辟谣账号",
    status: "停用",
    activityCount: "61",
    commentCount: "1,846",
  },
  {
    avatar: "B",
    name: "BorderSafetyWatch",
    code: "FK-2025-000133",
    handle: "@BorderSafetyWatch",
    platforms: "YouTube / Telegram",
    org: "边境安全反制组",
    country: "美国",
    topic: "边境安全治理专题",
    status: "活跃中",
    activityCount: "123",
    commentCount: "4,512",
  },
];

function renderCounterAccountDetail() {
  const pageContent = document.getElementById("pageContent");
  if (!pageContent) return;

  pageContent.innerHTML = `
    <section class="counter-page">
      <section class="page-header counter-page-header counter-analysis-header">
        <div>
          <div class="breadcrumb">工作台 / 反制数据分析 / <span>目标活动详情</span></div>
          <h1>反制数据分析</h1>
          <p>展示被反制目标基础信息、互联网活动记录与反制评论记录。</p>
        </div>
        <div>
          <span class="counter-update-time">数据更新时间：${targetInfo.updateTime}</span>
          <button class="btn primary" id="counterExportBtn" type="button">导出记录</button>
        </div>
      </section>

      <section class="counter-summary-card card">
        <div class="counter-identity">
          <div class="counter-avatar">反</div>
          <div class="counter-main">
            <h1>${targetInfo.name}</h1>
            <div class="counter-tags">
              ${targetInfo.tags.map((tag, index) => `<span class="tag ${index === 1 ? "low" : index === 2 ? "medium" : ""}">${tag}</span>`).join("")}
            </div>
            <p>反制编号：${targetInfo.counterId}</p>
            <p>平台账号：${targetInfo.account}</p>
          </div>
        </div>
        <div class="counter-target-column counter-target-middle">
          ${counterField("所属组织", targetInfo.organization)}
          ${counterField("账号类型", targetInfo.accountType)}
          ${counterField("国家/地区", targetInfo.country)}
          ${counterField("创建时间", targetInfo.createTime)}
        </div>
        <div class="counter-target-column counter-target-side">
          ${counterField("主要活动平台", targetInfo.mainPlatforms)}
          ${counterField("关联专题", targetInfo.relatedTopic, true)}
          ${counterField("最新活动时间", targetInfo.latestActiveTime)}
        </div>
      </section>

      <section class="counter-detail-grid">
        <section class="card counter-activity-card">
          <div class="counter-card-title"><h2>互联网活动列表</h2><span id="counterActivityTotal">共 ${counterActivityRecords.length} 条</span></div>
          <div class="activity-list" id="counterActivityList"></div>
          <div class="counter-pagination">
            <button class="page-btn">‹</button><button class="page-btn active">1</button><button class="page-btn">2</button><span>共 1 页</span><button class="page-btn">›</button>
          </div>
        </section>

        <section class="counter-right-stack" id="counterActivityDetail"></section>
      </section>
    </section>
  `;

  bindCounterDetailEvents();
}

function renderActivityDetail(item, index) {
  return `
    <section class="card counter-info-card">
      <div class="counter-card-title"><h2>活动详情</h2><span>${item.type} / ${item.platform}</span></div>
      <div class="opinion-detail-grid">
        ${counterField("发布时间", item.publishedAt)}
        ${counterField("发布账号", item.account)}
        ${counterField("平台", item.platform === "X" ? "X / Twitter" : item.platform)}
        ${counterField("活动类型", item.type)}
        ${counterField("活动状态", item.status)}
        ${counterField("内容摘要", item.summary)}
        ${counterField("备注", item.remark)}
      </div>
    </section>
    <section class="card counter-info-card">
      <div class="counter-card-title"><h2>反制评论记录</h2><span>仅展示当前活动</span></div>
      <div class="counter-table-wrap">
        ${renderCounterCommentTable(item.comments)}
      </div>
    </section>
  `;
}

function renderCounterPool() {
  const pageContent = document.getElementById("pageContent");
  if (!pageContent) return;

  pageContent.innerHTML = `
    <section class="counter-page counter-pool-page">
      <section class="page-header counter-page-header">
        <div>
          <div class="breadcrumb">工作台 / 反制数据分析 / <span>反制编号库</span></div>
          <h1>反制编号库</h1>
          <p>统一管理反制账号编号、平台身份、专题归属与账号状态。</p>
        </div>
        <div>
          <button class="btn" data-counter-action="批量导入反制账号">批量导入</button>
          <button class="btn primary" data-counter-action="新增反制账号">新增反制账号</button>
        </div>
      </section>

      <section class="counter-stats-grid">
        ${counterStat("反制账号总数", "1,286", "覆盖 18 个专题", "账", "blue")}
        ${counterStat("活跃账号数", "864", "近7日活跃 312 个", "活", "green")}
        ${counterStat("累计反制活动数", "26,418", "本月新增 1,204 次", "动", "blue")}
        ${counterStat("累计评论介入数", "438,762", "有效评论占比 82%", "评", "orange")}
        ${counterStat("近7日新增账号", "36", "待复核 4 个", "新", "purple")}
      </section>

      <section class="card counter-filter-card">
        <div class="pool-filter-row">
          <div class="pool-filter-line">
            <div class="counter-filter-field"><label>反制编号：</label><input class="control" placeholder="请输入" /></div>
            <div class="counter-filter-field"><label>账号名称/别名：</label><input class="control" placeholder="请输入" /></div>
            ${counterSelect("平台：", ["请选择", "X", "YouTube", "Instagram", "Telegram", "TikTok", "Facebook"])}
            ${counterSelect("所属组织：", ["请选择", "FF反制专项组", "洛杉矶社区反制组", "跨境犯罪反制组", "社区安全协作组", "舆论澄清专项组", "边境安全反制组"])}
            <div class="pool-filter-actions">
              <button class="btn primary" data-counter-action="查询反制编号库">查询</button>
              <button class="btn" data-counter-action="重置编号库筛选" data-counter-reset>重置</button>
            </div>
          </div>
          <div class="pool-filter-line pool-filter-line-secondary">
            ${counterSelect("国家/地区：", ["请选择", "美国", "墨西哥", "加拿大"])}
            ${counterSelect("账号状态：", ["请选择", "活跃中", "维护中", "停用"])}
            <div class="counter-filter-field counter-date-range"><label>创建时间：</label><div><input class="control" placeholder="yyyy/mm/dd" /><span>-</span><input class="control" placeholder="yyyy/mm/dd" /></div></div>
            ${counterSelect("关联专题：", ["请选择", "跨境有组织犯罪治理", "社区对照账号", "强援FF账号", "社区引导账号", "澄清辟谣账号", "边境安全治理专题"])}
            <div class="pool-filter-spacer"></div>
          </div>
        </div>
      </section>

      <section class="counter-result-section">
        <div class="counter-result-head">
          <h2>账号结果</h2>
          <span>共 1,286 个账号，当前展示 6 个</span>
        </div>
        <div class="counter-account-grid">
          ${counterPoolAccounts.map(renderCounterAccountCard).join("")}
        </div>
      </section>
    </section>
  `;

  bindCounterPoolEvents();
}

function renderCounterAccountCard(account) {
  const statusClass = account.status === "活跃中" ? "low" : account.status === "维护中" ? "medium" : "high";
  const toggleText = account.status === "停用" ? "启用" : "停用";
  return `
    <article class="card counter-account-card">
      <div class="account-card-head">
        <div class="counter-avatar small">${account.avatar}</div>
        <div class="account-title">
          <h3 title="${account.name}">${account.name}</h3>
          <p>${account.code}</p>
        </div>
        <span class="tag ${statusClass}">${account.status}</span>
      </div>
      <div class="account-card-body">
        <div class="account-core-fields">
          ${counterAccountField("平台账号", account.handle)}
          ${counterAccountField("平台", account.platforms)}
          ${counterAccountField("所属组织", account.org)}
          ${counterAccountField("国家/地区", account.country)}
          ${counterAccountField("关联专题", account.topic)}
        </div>
      </div>
      <div class="account-card-metrics">
        <div><span>历史活动</span><strong>${account.activityCount} 次</strong></div>
        <div><span>累计评论</span><strong>${account.commentCount} 条</strong></div>
      </div>
      <div class="account-card-actions">
        <a class="btn primary" href="./gang-person-files.html">查看详情</a>
        <button class="btn" data-counter-action="编辑${account.name}">编辑</button>
        <button class="btn" data-counter-action="${toggleText}${account.name}">${toggleText}</button>
      </div>
    </article>
  `;
}

function renderActivityItem(item, index) {
  return `
    <button class="activity-item ${index === 0 ? "active" : ""}" data-activity-id="${item.id}" type="button">
      <span>${index + 1}</span>
      <em>${platformIcon(item.platform)} ${item.platform}</em>
      <strong>${item.type}</strong>
      <time>${item.publishedAt}</time>
      <i class="${item.status === "已完成" ? "done" : item.status === "进行中" ? "running" : "stopped"}">${item.status}</i>
      <b>查看详情</b>
    </button>
  `;
}

function renderCounterCommentTable(comments) {
  const rows = comments
    .map(
      (row, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td>${row[3]}</td>
          <td><span class="tag low">${row[4]}</span></td>
        </tr>
      `,
    )
    .join("");

  return `
    <table class="data-table counter-comment-table">
      <thead><tr><th>序号</th><th>反制账号</th><th>评论内容</th><th>评论时间</th><th>所属平台</th><th>处置结果</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function platformIcon(platform) {
  const icons = {
    X: "X",
    YouTube: "Y",
    Instagram: "I",
    Telegram: "T",
    TikTok: "抖",
  };
  return icons[platform] || "平";
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function exportCounterRecords(records, selected) {
  const activityRows = records.map((item, index) => [
    index + 1,
    item.platform,
    item.type,
    item.publishedAt,
    item.status,
    item.account,
    item.summary,
    item.remark,
  ]);
  const commentRows = (selected?.comments || []).map((row, index) => [index + 1, ...row]);
  const csv = [
    ["互联网活动记录"],
    ["序号", "平台", "活动类型", "活动时间", "处理状态", "发布账号", "内容摘要", "备注"],
    ...activityRows,
    [],
    ["当前活动反制评论记录"],
    ["序号", "反制账号", "评论内容", "评论时间", "所属平台", "处置结果"],
    ...commentRows,
  ]
    .map((row) => row.map(csvCell).join(","))
    .join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `反制活动记录_${targetInfo.counterId}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function counterField(label, value, link = false) {
  return `<div class="counter-field"><span>${label}</span><strong class="${link ? "link" : ""}" title="${value}">${value}</strong></div>`;
}

function counterAccountField(label, value) {
  return `<div class="account-field"><span>${label}</span><strong title="${value}">${value}</strong></div>`;
}

function counterSelect(label, options, extraClass = "") {
  return `<div class="counter-filter-field ${extraClass}"><label>${label}</label><select class="control">${options.map((item) => `<option>${item}</option>`).join("")}</select></div>`;
}

function counterStat(label, value, note, icon, tone = "blue") {
  return `<div class="card counter-stat"><i class="counter-stat-icon ${tone}">${icon}</i><div><span>${label}</span><strong>${value}</strong><em>${note}</em></div></div>`;
}

function bindCounterDetailEvents() {
  const list = document.getElementById("counterActivityList");
  const detail = document.getElementById("counterActivityDetail");

  function selectActivity(id, records) {
    const item = records.find((record) => record.id === id) || records[0];
    document.querySelectorAll("[data-activity-id]").forEach((button) => button.classList.toggle("active", button.dataset.activityId === item.id));
    detail.innerHTML = renderActivityDetail(item, records.findIndex((record) => record.id === item.id));
  }

  function renderList() {
    const records = counterActivityRecords;
    document.getElementById("counterActivityTotal").textContent = `共 ${records.length} 条`;
    list.innerHTML = records.length ? records.map(renderActivityItem).join("") : `<div class="counter-empty">暂无活动记录</div>`;
    if (records.length) selectActivity(records[0].id, records);
    else detail.innerHTML = `<section class="card counter-info-card"><div class="counter-empty">请选择活动记录后查看详情</div></section>`;
    document.querySelectorAll("[data-activity-id]").forEach((button) => {
      button.addEventListener("click", () => selectActivity(button.dataset.activityId, records));
    });
  }

  document.getElementById("counterExportBtn").addEventListener("click", () => {
    const records = counterActivityRecords;
    const activeId = document.querySelector("[data-activity-id].active")?.dataset.activityId;
    exportCounterRecords(records, records.find((item) => item.id === activeId) || records[0]);
    showCounterToast("当前活动记录和评论记录已导出");
  });
  renderList();
  bindCounterActions();
}

function bindCounterPoolEvents() {
  document.querySelectorAll("[data-counter-reset]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest(".counter-filter-card");
      if (!panel) return;
      panel.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });
      panel.querySelectorAll("select").forEach((select) => {
        select.selectedIndex = 0;
      });
    });
  });
  bindCounterActions();
}

function bindCounterActions() {
  if (document.body.dataset.counterActionsBound) return;
  document.body.dataset.counterActionsBound = "true";
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-counter-action]");
    if (button) showCounterToast(`${button.dataset.counterAction}已提交`);
  });
}

function showCounterToast(text) {
  let toast = document.getElementById("counterToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "counterToast";
    toast.className = "counter-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  window.clearTimeout(showCounterToast.timer);
  showCounterToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1500);
}

(function () {
  const pageKey = document.body.dataset.page;
  if (pageKey === "gang-person-files") renderCounterAccountDetail();
  if (pageKey === "counter-account-pool") renderCounterPool();
})();
