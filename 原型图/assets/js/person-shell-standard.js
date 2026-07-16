(function () {
  const pages = {
    "person_register.html": {
      title: "境外人员登记",
      crumb: "境外人员登记",
      active: "person_register.html",
    },
    "warning_rules.html": {
      title: "预警规则管理",
      crumb: "预警规则管理",
      active: "warning_rules.html",
    },
    "comparison_findings.html": {
      title: "比对发现",
      crumb: "比对发现",
      active: "comparison_findings.html",
    },
    "compare_result.html": {
      title: "比对结果",
      crumb: "比对结果",
      active: "comparison_findings.html",
    },
  };

  const currentPath = window.location.pathname.split("/").pop() || "person_register.html";
  const current = pages[currentPath];
  if (!current) return;

  function ensureStylesheet() {
    if (document.querySelector('link[href="../assets/css/person-shell-standard.css"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../assets/css/person-shell-standard.css";
    document.head.appendChild(link);
  }

  function menuLink(title, key, href, icon) {
    const active = key === current.active ? " active" : "";
    return `
      <a class="menu-link${active}" href="${href}">
        <span class="menu-icon">${icon}</span>
        <span class="menu-text">${title}</span>
      </a>
    `;
  }

  function menuGroup(title, key, href, icon, children) {
    const open = children && children.some((item) => item.href === current.active);
    const active = key === "foreign-person" && open;
    return `
      <div class="menu-group ${open || active ? "open" : ""}">
        <a class="menu-link menu-parent ${active ? "active" : ""}" href="${href}" aria-expanded="${open ? "true" : "false"}">
          <span class="menu-icon">${icon}</span>
          <span class="menu-text">${title}</span>
        </a>
        ${
          children
            ? `<div class="submenu">${children
                .map((item) => `<a class="submenu-link ${item.href === current.active ? "active" : ""}" href="${item.href}">${item.title}</a>`)
                .join("")}</div>`
            : ""
        }
      </div>
    `;
  }

  function renderSidebar() {
    return `
      <a class="brand-box" href="../index.html">
        <span class="brand-logo">盾</span>
        <span class="brand-title">境外舆情分析系统</span>
      </a>
      <nav class="side-menu">
        <div class="menu-group">${menuLink("工作台", "dashboard.html", "dashboard.html", "工")}</div>
        ${menuGroup("信息查询", "search", "search-info.html", "查", [
          { title: "信息查询", href: "search-info.html" },
          { title: "全国联网查询", href: "search-national-network.html" },
        ])}
        ${menuGroup("目标管理", "profile", "profile-list.html", "目", [
          { title: "目标列表", href: "profile-list.html" },
          { title: "目标详情", href: "profile-detail.html" },
        ])}
        ${menuGroup("情报追踪", "tracking", "judgement-workbench.html", "追", [
          { title: "综合研判", href: "judgement-workbench.html" },
          { title: "业务推送", href: "business-push/index.html" },
          { title: "境外人员", href: "overseas-person-list.html" },
        ])}
        ${menuGroup("境外人员管理", "foreign-person", "overseas_person_list.html", "人", [
          { title: "境外人员列表", href: "overseas_person_list.html" },
          { title: "境外人员登记", href: "person_register.html" },
          { title: "预警规则管理", href: "warning_rules.html" },
          { title: "比对发现", href: "comparison_findings.html" },
        ])}
        ${menuGroup("反制数据分析", "gang", "gang-person-files.html", "反", [
          { title: "FF人员反制数据分析", href: "gang-person-files.html" },
          { title: "反制编号库", href: "counter-account-pool.html" },
        ])}
        ${menuGroup("专题监测", "topic", "topic-dynamics.html", "专", [
          { title: "专题池", href: "topic-dynamics.html" },
          { title: "专题报告", href: "topic-reports.html" },
          { title: "专题创建", href: "topic-settings.html" },
        ])}
        ${menuGroup("事件预警", "warning", "warning-rank.html", "警", [
          { title: "事件榜单", href: "warning-rank.html" },
          { title: "我的事件", href: "warning-my-events.html" },
          { title: "我的订阅", href: "warning-subscriptions.html" },
        ])}
        <div class="menu-group">${menuLink("知识库", "knowledge", "#", "库")}</div>
        <div class="menu-group">${menuLink("系统管理", "system", "#", "系")}</div>
      </nav>
      <div class="sidebar-footer">
        <button class="collapse-btn" id="collapseBtn" type="button"><span>‹</span><em>收起菜单</em></button>
      </div>
    `;
  }

  function renderTopbar() {
    document.title = `境外舆情分析系统 - ${current.title}`;
    return `
      <div class="topbar-left">
        <button class="menu-toggle" id="menuToggle" type="button" aria-label="折叠菜单">☰</button>
        <div class="topbar-breadcrumb">
          <span>工作台</span><i>/</i><span>境外人员管理</span><i>/</i><span class="current">${current.crumb}</span>
        </div>
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
    `;
  }

  function bindShell() {
    const layout = document.querySelector(".system-layout");
    const toggle = () => layout && layout.classList.toggle("collapsed");
    const collapseBtn = document.getElementById("collapseBtn");
    const menuToggle = document.getElementById("menuToggle");
    if (collapseBtn) collapseBtn.addEventListener("click", toggle);
    if (menuToggle) menuToggle.addEventListener("click", toggle);
  }

  ensureStylesheet();
  const sidebar = document.querySelector(".sidebar");
  const topbar = document.querySelector(".topbar");
  if (sidebar) sidebar.innerHTML = renderSidebar();
  if (topbar) topbar.innerHTML = renderTopbar();
  bindShell();
})();
