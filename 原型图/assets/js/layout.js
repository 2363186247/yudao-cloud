const shellMenu = [
  { title: "工作台", key: "dashboard", url: "./dashboard.html", icon: "工" },
  {
    title: "信息查询",
    key: "search",
    url: "./search-info.html",
    icon: "查",
    children: [
      { title: "信息查询", key: "search-info", url: "./search-info.html" },
      { title: "全国联网查询", key: "search-national-network", url: "./search-national-network.html" },
    ],
  },
  {
    title: "目标管理",
    key: "profile",
    url: "./target_pool.html",
    icon: "目",
    children: [
      { title: "目标列表", key: "profile-list", url: "./target_pool.html" },
      { title: "目标详情", key: "profile-detail", url: "./profile-detail.html" },
    ],
  },
  {
    title: "情报追踪",
    key: "tracking",
    url: "./judgement-workbench.html",
    icon: "追",
    activeKeys: ["judgement", "push", "overseas"],
    children: [
      { title: "综合研判", key: "judgement", url: "./judgement-workbench.html" },
      { title: "业务推送", key: "push", url: "./business-push/index.html" },
      { title: "境外人员", key: "overseas", url: "./overseas-person-list.html" },
    ],
  },
  {
    title: "境外人员管理",
    key: "foreign-person",
    url: "./overseas_person_list.html",
    icon: "人",
    children: [
      { title: "境外人员列表", key: "overseas-person-list-new", url: "./overseas_person_list.html" },
      { title: "境外人员登记", key: "person-register", url: "./person_register.html" },
      { title: "预警规则管理", key: "warning-rules", url: "./warning_rules.html" },
      { title: "比对发现", key: "comparison-findings", url: "./comparison_findings.html" },
    ],
  },
  {
    title: "反制数据分析",
    key: "gang",
    url: "./gang-person-files.html",
    icon: "反",
    children: [
      { title: "FF人员反制数据分析", key: "gang-person-files", url: "./gang-person-files.html" },
      { title: "反制编号库", key: "counter-account-pool", url: "./counter-account-pool.html" },
    ],
  },
  {
    title: "专题监测",
    key: "topic",
    url: "./topic-dynamics.html",
    icon: "专",
    children: [
      { title: "专题池", key: "topic-dynamics", url: "./topic-dynamics.html" },
      { title: "专题详情", key: "topic-reports", url: "./topic-reports.html" },
      { title: "专题创建", key: "topic-settings", url: "./topic-settings.html" },
    ],
  },
  {
    title: "事件预警",
    key: "warning",
    url: "./warning-rank.html",
    icon: "警",
    children: [
      { title: "事件榜单", key: "warning-rank", url: "./warning-rank.html" },
      { title: "我的事件", key: "warning-my-events", url: "./warning-my-events.html" },
      { title: "我的订阅", key: "warning-subscriptions", url: "./warning-subscriptions.html" },
    ],
  },
  {
    title: "智慧大屏",
    key: "screen",
    url: "./data-analysis-screen.html",
    icon: "屏",
    children: [
      { title: "数据分析大屏", key: "data-analysis-screen", url: "./data-analysis-screen.html" },
      { title: "热点分析大屏", key: "hotspot-analysis-screen", url: "./hotspot-analysis-screen.html" },
      { title: "大屏设置", key: "screen-settings", url: "./screen-settings.html" },
    ],
  },
  { title: "知识库", key: "knowledge", url: "#", icon: "库" },
  { title: "系统管理", key: "system", url: "#", icon: "系" },
];

function renderShellMenu(moduleKey, pageKey) {
  return shellMenu
    .map((item) => {
      const active = isShellMenuActive(item, moduleKey);
      const children = item.children ? `<div class="submenu">${renderSubMenu(item.children, moduleKey, pageKey)}</div>` : "";
      const trigger = item.children
        ? `
          <button class="menu-link ${active ? "active" : ""}" type="button" data-shell-menu-toggle aria-expanded="${active ? "true" : "false"}">
            <span class="menu-icon">${item.icon}</span>
            <span class="menu-text">${item.title}</span>
          </button>
        `
        : `
          <a class="menu-link ${active ? "active" : ""}" href="${item.url}">
            <span class="menu-icon">${item.icon}</span>
            <span class="menu-text">${item.title}</span>
          </a>
        `;
      return `
        <div class="menu-group ${active ? "open" : ""}">
          ${trigger}
          ${children}
        </div>
      `;
    })
    .join("");
}

function renderSubMenu(children, moduleKey, pageKey) {
  return children
    .map((item) => {
      const active = item.key === pageKey || item.key === moduleKey || (pageKey === "warning-event-detail" && item.key === "warning-my-events");
      return `<a class="submenu-link ${active ? "active" : ""}" href="${item.url}">${item.title}</a>`;
    })
    .join("");
}

function isShellMenuActive(item, moduleKey) {
  return item.key === moduleKey || (item.activeKeys || []).includes(moduleKey);
}

function renderBreadcrumb(moduleKey, moduleItem, pageItem) {
  const pageTitle = normalizePageTitle(moduleKey, pageItem.title);
  if (moduleKey === "profile" && pageItem.key === "profile-detail") {
    return ["工作台", "目标管理", "目标列表", "目标详情"]
      .map((part, index, parts) => `<span class="${index === parts.length - 1 ? "current" : ""}">${part}</span>`)
      .join("<i>/</i>");
  }
  const section = getShellSection(moduleKey);
  const parts = section ? ["工作台", section, pageTitle] : ["工作台"];
  return parts.map((part, index) => `<span class="${index === parts.length - 1 ? "current" : ""}">${part}</span>`).join("<i>/</i>");
}

function getShellSection(moduleKey) {
  const sectionMap = {
    search: "信息查询",
    profile: "目标管理",
    judgement: "情报追踪",
    push: "情报追踪",
    overseas: "情报追踪",
    "foreign-person": "境外人员管理",
    gang: "反制数据分析",
    topic: "专题监测",
    warning: "事件预警",
    screen: "智慧大屏",
  };
  return sectionMap[moduleKey] || "";
}

function normalizePageTitle(moduleKey, title) {
  const view = document.body.dataset.view;
  const pageKey = document.body.dataset.page;
  if (moduleKey === "dashboard") return "工作台";
  if (view === "advanced-search") return "高级搜索";
  if (view === "info-detail") return "情报详情";
  if (pageKey === "topic-dynamics") return "专题池";
  if (pageKey === "topic-reports") return "专题详情";
  if (pageKey === "topic-settings") return "创建专题";
  if (pageKey === "warning-event-detail") return "事件详情";
  if (moduleKey === "search" && title === "信息查询") return "信息查询";
  if (moduleKey === "profile" && title === "目标画像") return "目标详情";
  return title;
}

function bindShell() {
  const layout = document.getElementById("systemLayout");
  const collapseBtn = document.getElementById("collapseBtn");
  const menuToggle = document.getElementById("menuToggle");
  const toggle = () => layout.classList.toggle("collapsed");
  collapseBtn?.addEventListener("click", toggle);
  menuToggle?.addEventListener("click", toggle);
  document.querySelectorAll("[data-shell-menu-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".menu-group");
      if (!group) return;
      group.classList.toggle("open");
      button.setAttribute("aria-expanded", group.classList.contains("open") ? "true" : "false");
    });
  });
}

function renderTemplatePage(moduleItem, pageItem) {
  const pageContent = document.getElementById("pageContent");
  pageContent.innerHTML = `
    <section class="page-header">
      <div>
        <div class="breadcrumb">首页 / ${moduleItem.title} / <span>${pageItem.title}</span></div>
        <h1>${pageItem.title}</h1>
        <p>${pageItem.title}用于承载业务查询、统计概览、列表管理和后续接口接入。</p>
      </div>
      <div>
        <button class="btn">导出</button>
        <button class="btn primary">新增记录</button>
      </div>
    </section>
    <div class="template-stack">
      <section class="card query-card">
        <div class="card-title"><h2>查询条件</h2></div>
        <div class="query-form">
          <input class="control" placeholder="请输入关键词" />
          <select class="control"><option>近30天</option><option>近7天</option><option>今日</option></select>
          <select class="control"><option>全部类型</option><option>人员</option><option>事件</option><option>线索</option></select>
          <select class="control"><option>全部状态</option><option>待处理</option><option>处置中</option><option>已办结</option></select>
          <button class="btn primary">查询</button>
          <button class="btn">重置</button>
        </div>
      </section>
      <section class="card stats-card">
        <div class="stats-grid">
          ${renderStats()}
        </div>
      </section>
      <section class="card table-card">
        <div class="card-title">
          <h2>${pageItem.title}列表</h2>
          <button class="btn">批量导入</button>
        </div>
        ${renderTable()}
        <div class="pagination">
          <span>共 128 条</span>
          <button class="page-btn">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
        </div>
      </section>
    </div>
  `;

  pageContent.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => openDetailDrawer(JSON.parse(decodeURIComponent(button.dataset.view))));
  });
}

function renderStats() {
  return [
    ["总数", "1,286", "累计汇聚数据"],
    ["今日新增", "36", "较昨日 +12%"],
    ["待处理", "24", "重点核查 6 项"],
    ["高风险", "7", "已同步预警"],
  ]
    .map(
      ([label, value, note]) => `
        <div class="stat-item">
          <div class="stat-label">${label}</div>
          <div class="stat-value">${value}</div>
          <div class="stat-note">${note}</div>
        </div>
      `,
    )
    .join("");
}

function renderTable() {
  const rows = commonRows
    .map((row, index) => {
      const riskClass = row[2] === "高" ? "high" : row[2] === "中" ? "medium" : "low";
      const record = encodeURIComponent(
        JSON.stringify({
          序号: index + 1,
          名称: row[0],
          类别: row[1],
          风险等级: row[2],
          来源: row[3],
          更新时间: row[4],
          状态: row[5],
        }),
      );
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${row[0]}</td>
          <td>${row[1]}</td>
          <td><span class="tag ${riskClass}">${row[2]}风险</span></td>
          <td>${row[3]}</td>
          <td>${row[4]}</td>
          <td><span class="tag">${row[5]}</span></td>
          <td>
            <div class="table-actions">
              <button class="text-button" data-view="${record}">查看</button>
              <button class="text-button">编辑</button>
              <button class="text-button">推送</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <table class="data-table">
      <thead>
        <tr>
          <th>序号</th>
          <th>名称/标题</th>
          <th>类别</th>
          <th>风险等级</th>
          <th>来源</th>
          <th>更新时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function bindDrawer() {
  const drawer = document.getElementById("detailDrawer");
  if (!drawer) return;
  drawer.addEventListener("click", (event) => {
    if (event.target === drawer || event.target.classList.contains("drawer-close")) {
      drawer.classList.remove("open");
    }
  });
}

function openDetailDrawer(record) {
  const drawer = document.getElementById("detailDrawer");
  const body = document.getElementById("drawerBody");
  body.innerHTML = Object.entries(record)
    .map(([label, value]) => `<div class="drawer-field"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
  drawer.classList.add("open");
}

(function () {
  const moduleKey = document.body.dataset.module || "dashboard";
  const pageKey = document.body.dataset.page || "dashboard";
  const currentModule = getCurrentModule(moduleKey);
  const currentPage = getCurrentPage(pageKey) || currentModule.children[0];
  const app = document.getElementById("app");

  if (!app) return;

  app.innerHTML = `
    <div class="system-layout" id="systemLayout">
      <aside class="sidebar">
        <a class="brand-box" href="./dashboard.html">
          <span class="brand-logo">盾</span>
          <span class="brand-title">境外舆情分析系统</span>
        </a>
        <nav class="side-menu">${renderShellMenu(moduleKey, pageKey)}</nav>
        <div class="sidebar-footer">
          <button class="collapse-btn" id="collapseBtn" type="button"><span>‹</span><em>收起菜单</em></button>
        </div>
      </aside>

      <div class="main-wrapper">
        <header class="topbar">
          <div class="topbar-left">
            <button class="menu-toggle" id="menuToggle" type="button" aria-label="折叠菜单">☰</button>
            <div class="topbar-breadcrumb">${renderBreadcrumb(moduleKey, currentModule, currentPage)}</div>
          </div>
          <div class="topbar-right">
            <button class="topbar-icon" type="button" aria-label="搜索">搜</button>
            <button class="topbar-icon notice" type="button" aria-label="通知">知<span class="badge">12</span></button>
            <button class="topbar-icon" type="button" aria-label="消息">信</button>
            <button class="topbar-icon" type="button" aria-label="语言">全</button>
            <div class="user-info">
              <span class="user-avatar">析</span>
              <span>分析员</span>
              <span class="arrow">⌄</span>
            </div>
          </div>
        </header>

        <main class="content-area">
          <div class="page-content" id="pageContent"></div>
        </main>
      </div>
    </div>

    <div class="drawer-mask" id="detailDrawer">
      <aside class="drawer">
        <div class="drawer-head">
          <h2>详情信息</h2>
          <button class="drawer-close" type="button">×</button>
        </div>
        <div class="drawer-body" id="drawerBody"></div>
      </aside>
    </div>
  `;

  if (pageKey === "dashboard") {
    window.dashboardContext = { currentModule, currentPage };
  } else {
    renderTemplatePage(currentModule, currentPage);
  }

  bindShell();
  bindDrawer();
})();
