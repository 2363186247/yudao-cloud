(function () {
  const pageContent = document.getElementById("pageContent");
  if (!pageContent || document.body.dataset.page !== "dashboard") return;

  pageContent.innerHTML = `
    <div class="dashboard-stack">
      ${renderDashboardHeader()}
      ${renderSummary()}
      <div class="dashboard-grid-top">
        ${renderInfoSearch()}
        ${renderHotWords()}
        ${renderDynamicRank()}
      </div>
      <div class="dashboard-grid-bottom">
        ${renderFollowDynamics()}
        ${renderRiskPrediction()}
        ${renderQuickTools()}
      </div>
    </div>
  `;

  bindDashboardEvents();
})();

function renderDashboardHeader() {
  return `
    <section class="dashboard-header">
      <div>
        <div class="breadcrumb">首页 / 工作台 / <span>个人工作台</span></div>
        <h1>个人工作台</h1>
      </div>
      <div class="dashboard-actions">
        <button class="btn">自定义布局</button>
        <button class="btn primary">添加组件</button>
        <button class="btn">工具管理</button>
      </div>
    </section>
  `;
}

function renderSummary() {
  return `
    <section class="card summary-card">
      <div class="card-title">
        <h2>数据汇总</h2>
        <select class="control"><option>近30天</option><option>近7天</option><option>今日</option></select>
      </div>
      <div class="summary-grid">
        ${dashboardMock.metrics
          .map(
            (item) => `
              <div class="metric-box">
                <span class="metric-icon ${item.tone}">${item.icon}</span>
                <div>
                  <div class="metric-title">${item.title}</div>
                  <div class="metric-value">${item.value}</div>
                  <div class="metric-change">月增 ${item.change} ↑</div>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderInfoSearch() {
  return `
    <section class="card dashboard-card">
      <div class="card-title"><h2>信息搜索</h2></div>
      <div class="search-line">
        <select class="control" id="searchScope"><option>仅搜领域</option><option>全库搜索</option><option>关注目标</option></select>
        <input class="control" id="searchKeyword" placeholder="请输入关键词或关键词组合" />
        <button class="btn primary" id="searchButton">搜索</button>
      </div>
      <div class="search-meta">
        <span>时间范围：</span>
        <select class="control" id="searchTime"><option>近三天</option><option>近七天</option><option>近30天</option></select>
      </div>
      <div class="hot-row">
        <span>热门搜索：</span>
        <div>${dashboardMock.hotSearches.map((word) => `<button class="soft-tag" data-keyword="${word}">${word}</button>`).join("")}</div>
      </div>
    </section>
  `;
}

function renderHotWords() {
  return `
    <section class="card dashboard-card">
      <div class="card-title">
        <h2>高频热词</h2>
        <div>
          <select class="control"><option>全部领域</option><option>国际</option><option>国内</option></select>
          <select class="control"><option>近三天</option><option>近七天</option><option>近30天</option></select>
        </div>
      </div>
      <div class="word-cloud">
        ${dashboardMock.hotWords.map(([word, weight]) => `<button class="w${weight}" data-keyword="${word}">${word}</button>`).join("")}
      </div>
      <button class="more-link" data-href="./search-info.html">查看更多 ›</button>
    </section>
  `;
}

function renderDynamicRank(type = "international") {
  const rows = dashboardMock.ranks[type];
  return `
    <section class="card dashboard-card" id="rankCard">
      <div class="card-title">
        <h2>动态热榜</h2>
        <div class="tabs">
          <button class="${type === "international" ? "active" : ""}" data-rank-tab="international">国际动态</button>
          <button class="${type === "domestic" ? "active" : ""}" data-rank-tab="domestic">国内动态</button>
          <button class="more-link" data-href="./warning-rank.html">更多 ›</button>
        </div>
      </div>
      <div class="rank-list">
        ${rows
          .map(
            (item, index) => `
              <button class="rank-item" data-detail='${JSON.stringify({ 标题: item[0], 来源: item[1], 发布时间: item[2], 风险等级: item[3] })}'>
                <span class="rank-index ${index < 3 ? "hot" : ""}">${index + 1}</span>
                <span>
                  <span class="rank-title">${item[0]}</span>
                  <span class="rank-source">${item[1]}</span>
                </span>
                <span class="rank-time">${item[2]}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderFollowDynamics(type = "local") {
  const rows = dashboardMock.follows[type];
  return `
    <section class="card dashboard-card" id="followCard">
      <div class="card-title">
        <h2>关注动态</h2>
        <div class="tabs">
          <button class="${type === "local" ? "active" : ""}" data-follow-tab="local">本地</button>
          <button class="${type === "media" ? "active" : ""}" data-follow-tab="media">自媒体</button>
          <select class="control"><option>近三天</option><option>近七天</option><option>近30天</option></select>
        </div>
      </div>
      <div class="follow-list">
        ${rows
          .map(
            (item) => `
              <button class="follow-item" data-detail='${JSON.stringify({ 标题: item[0], 来源类型: item[1], 发布时间: item[2] })}'>
                <span class="follow-dot"></span>
                <span class="follow-title">${item[0]}</span>
                <span>${item[1]}</span>
                <time>${item[2]}</time>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderRiskPrediction() {
  return `
    <section class="card dashboard-card">
      <div class="card-title">
        <h2>风险预测</h2>
        <select class="control"><option>24小时</option><option>72小时</option><option>近7天</option></select>
      </div>
      <div class="risk-body">
        <div class="risk-ring"><div class="risk-ring-inner"><strong>24</strong><span>事件总数</span></div></div>
        <div class="risk-levels">
          ${dashboardMock.risks
            .map(
              (risk) => `
                <button class="risk-level" data-level="${risk.key}">
                  <span>${risk.label}</span>
                  <strong>${risk.value}</strong>
                  <span>${risk.percent}</span>
                  <span class="progress"><i style="width:${risk.percent};background:${risk.color}"></i></span>
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderQuickTools() {
  return `
    <section class="card dashboard-card">
      <div class="card-title"><h2>工具快捷入口</h2></div>
      <div class="quick-grid">
        ${dashboardMock.quickTools
          .map(
            ([title, url, icon]) => `
              <a class="quick-tool" href="${url}">
                <span>${icon}</span>
                <span>${title}</span>
              </a>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function bindDashboardEvents() {
  document.getElementById("searchButton").addEventListener("click", () => {
    const keyword = document.getElementById("searchKeyword").value.trim();
    const time = document.getElementById("searchTime").value;
    const scope = document.getElementById("searchScope").value;
    location.href = `./search-info.html?keyword=${encodeURIComponent(keyword)}&time=${encodeURIComponent(time)}&scope=${encodeURIComponent(scope)}`;
  });

  document.querySelectorAll("[data-keyword]").forEach((item) => {
    item.addEventListener("click", () => {
      location.href = `./search-info.html?keyword=${encodeURIComponent(item.dataset.keyword)}`;
    });
  });

  document.querySelectorAll("[data-level]").forEach((item) => {
    item.addEventListener("click", () => {
      location.href = `./warning-rank.html?level=${encodeURIComponent(item.dataset.level)}`;
    });
  });

  document.querySelectorAll("[data-href]").forEach((item) => {
    item.addEventListener("click", () => {
      location.href = item.dataset.href;
    });
  });

  document.querySelectorAll("[data-rank-tab]").forEach((item) => {
    item.addEventListener("click", () => {
      document.getElementById("rankCard").outerHTML = renderDynamicRank(item.dataset.rankTab);
      bindDashboardEvents();
    });
  });

  document.querySelectorAll("[data-follow-tab]").forEach((item) => {
    item.addEventListener("click", () => {
      document.getElementById("followCard").outerHTML = renderFollowDynamics(item.dataset.followTab);
      bindDashboardEvents();
    });
  });

  document.querySelectorAll("[data-detail]").forEach((item) => {
    item.addEventListener("click", () => openDetailDrawer(JSON.parse(item.dataset.detail)));
  });
}
