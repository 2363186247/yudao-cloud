(function () {
  const pageKey = document.body.dataset.page;
  const pageContent = document.getElementById("pageContent");
  if (!pageContent) return;

  const rankRecords = [
    {
      id: "EVT-240416-01",
      name: "东南亚社交平台涉华议题集中升温",
      description: "近 24 小时多平台出现集中转发，相关讨论出现跨语种扩散迹象。",
      category: "FLG",
      heat: 98,
      risk: "高风险",
      status: "预警中",
      source: "X / Facebook / Telegram",
      updatedAt: "2026-04-16 09:22",
      followed: false,
      keywords: "涉华议题、跨平台传播、热点账号",
    },
    {
      id: "EVT-240416-02",
      name: "境外媒体集中报道涉边事件动态",
      description: "多家境外媒体同步转载评论，舆论场存在进一步聚合风险。",
      category: "QNS",
      heat: 92,
      risk: "高风险",
      status: "持续跟踪",
      source: "新闻网站 / 视频平台",
      updatedAt: "2026-04-16 08:55",
      followed: true,
      keywords: "边境事件、境外媒体、转载扩散",
    },
    {
      id: "EVT-240416-03",
      name: "海外论坛突发聚集活动话题扩散",
      description: "论坛帖文热度快速上升，评论区出现跨平台引流行为。",
      category: "ZHG",
      heat: 88,
      risk: "中风险",
      status: "待研判",
      source: "论坛 / 短视频评论区",
      updatedAt: "2026-04-16 07:48",
      followed: false,
      keywords: "聚集活动、论坛扩散、跨平台引流",
    },
    {
      id: "EVT-240416-04",
      name: "重点账号异常增粉并密集发布相关内容",
      description: "目标账号在短时段内出现增粉异常，关联内容指向同一议题。",
      category: "XSD",
      heat: 79,
      risk: "中风险",
      status: "预警中",
      source: "X / Instagram",
      updatedAt: "2026-04-15 21:10",
      followed: true,
      keywords: "重点账号、增粉异常、内容联动",
    },
    {
      id: "EVT-240416-05",
      name: "海外社媒出现区域性误导信息传播",
      description: "区域性谣传内容被多账号二次搬运，但传播速度已有回落。",
      category: "DLM",
      heat: 71,
      risk: "低风险",
      status: "已处置",
      source: "Facebook / 本地论坛",
      updatedAt: "2026-04-14 18:20",
      followed: false,
      keywords: "误导信息、区域传播、谣传回落",
    },
    {
      id: "EVT-240416-06",
      name: "敏感议题视频片段在外部社区再传播",
      description: "旧视频被重新剪辑后流入多个社区，情绪性评论占比提升。",
      category: "其他",
      heat: 83,
      risk: "中风险",
      status: "持续跟踪",
      source: "视频平台 / 社区频道",
      updatedAt: "2026-04-13 16:40",
      followed: false,
      keywords: "旧视频翻炒、社区传播、情绪评论",
    },
  ];

  const myEvents = [
    {
      id: "event-001",
      eventName: "东南亚社交平台涉华议题集中升温",
      summary: "由录入情报触发，持续跟踪相关账号扩散和跨平台传播走势。",
      organizationCategory: "FLG",
      riskLevel: "高风险",
      status: "跟踪中",
      updateTime: "2026-04-17 09:20",
      sourcePlatform: "X / Facebook / Telegram",
    },
    {
      id: "event-002",
      eventName: "重点账号异常增粉并密集发布相关内容",
      summary: "由情报数据命中规则后生成，需补充账号关联链路和内容指向性研判。",
      organizationCategory: "QNS",
      riskLevel: "中风险",
      status: "待研判",
      updateTime: "2026-04-17 08:45",
      sourcePlatform: "X / Instagram",
    },
    {
      id: "event-003",
      eventName: "境外媒体集中报道涉边事件动态",
      summary: "多条录入情报指向同一涉边议题，已形成事件跟踪记录。",
      organizationCategory: "ZHG",
      riskLevel: "高风险",
      status: "跟踪中",
      updateTime: "2026-04-16 20:30",
      sourcePlatform: "新闻网站 / 视频平台",
    },
    {
      id: "event-004",
      eventName: "海外社媒出现区域性误导信息传播",
      summary: "已完成信息核验和澄清内容跟踪，后续转入低频监测。",
      organizationCategory: "XSD",
      riskLevel: "低风险",
      status: "已处置",
      updateTime: "2026-04-15 16:12",
      sourcePlatform: "Facebook / 本地论坛",
    },
    {
      id: "event-005",
      eventName: "海外论坛突发聚集活动话题扩散",
      summary: "扩散热度降低，已纳入历史事件归档。",
      organizationCategory: "其他",
      riskLevel: "中风险",
      status: "已归档",
      updateTime: "2026-04-13 10:05",
      sourcePlatform: "论坛 / 短视频评论区",
    },
  ];

  const subscriptions = [
    {
      id: "SUB-001",
      intelligenceId: "intel-001",
      title: "某境外账号发布涉华敏感言论，关注度持续上升",
      summary: "该情报浏览量和互动量持续增长，已关联涉华舆情事件。",
      organizationCategory: "FLG",
      sourcePlatform: "X / Facebook / Telegram",
      relatedEvent: "涉华舆情事件",
      relatedTopic: "境外舆论专题",
      riskLevel: "高风险",
      followTime: "2026-04-17 09:30",
      latestUpdateTime: "2026-04-17 11:20",
      updateStatus: "有更新",
      pushMethod: "站内提醒 / App",
      frequency: "实时",
      status: "关注中",
      remark: "重点关注传播链扩散和评论情绪变化。",
    },
    {
      id: "SUB-002",
      intelligenceId: "intel-002",
      title: "重点人员相关视频在多平台传播",
      summary: "视频内容被多个账号二次转发，传播范围扩大。",
      organizationCategory: "QNS",
      sourcePlatform: "X / Instagram",
      relatedEvent: "重点人员活动事件",
      relatedTopic: "重点人员专题",
      riskLevel: "中风险",
      followTime: "2026-04-16 15:45",
      latestUpdateTime: "2026-04-17 08:50",
      updateStatus: "待查看",
      pushMethod: "站内提醒",
      frequency: "每日摘要",
      status: "关注中",
      remark: "持续观察二次传播账号与跨平台扩散路径。",
    },
    {
      id: "SUB-003",
      intelligenceId: "intel-003",
      title: "境外论坛出现针对某议题的集中讨论",
      summary: "多个论坛账号围绕同一议题持续发帖，存在扩散趋势。",
      organizationCategory: "ZHG",
      sourcePlatform: "论坛 / 短视频评论区",
      relatedEvent: "跨平台扩散事件",
      relatedTopic: "网络舆情专题",
      riskLevel: "中风险",
      followTime: "2026-04-15 18:20",
      latestUpdateTime: "2026-04-16 20:15",
      updateStatus: "已查看",
      pushMethod: "邮件",
      frequency: "每日摘要",
      status: "关注中",
      remark: "已查看上一轮风险变化，继续保留日报推送。",
    },
    {
      id: "SUB-004",
      intelligenceId: "intel-004",
      title: "某新闻网站发布涉边事件报道",
      summary: "报道被多平台引用，已进入事件跟踪范围。",
      organizationCategory: "XSD",
      sourcePlatform: "新闻网站 / 视频平台",
      relatedEvent: "涉边事件",
      relatedTopic: "边境动态专题",
      riskLevel: "低风险",
      followTime: "2026-04-14 10:10",
      latestUpdateTime: "2026-04-14 16:30",
      updateStatus: "无更新",
      pushMethod: "站内提醒",
      frequency: "仅高风险变化时提醒",
      status: "关注中",
      remark: "仅在风险等级变化时提醒。",
    },
    {
      id: "SUB-005",
      intelligenceId: "intel-005",
      title: "敏感议题视频片段在外部社区再传播",
      summary: "旧视频被重新剪辑后流入多个社区，情绪性评论占比提升。",
      organizationCategory: "其他",
      sourcePlatform: "YouTube / 社区频道",
      relatedEvent: "敏感视频回流事件",
      relatedTopic: "视频传播专题",
      riskLevel: "中风险",
      followTime: "2026-04-17 10:05",
      latestUpdateTime: "2026-04-17 10:55",
      updateStatus: "有更新",
      pushMethod: "站内提醒 / Webhook",
      frequency: "实时",
      status: "关注中",
      remark: "由事件榜单加入关注，监测二次剪辑和社区传播。",
    },
  ];

  let editingEventId = "";
  let editingSubscriptionId = "";

  const html = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function setBreadcrumb(title) {
    const crumb = document.querySelector(".topbar-breadcrumb");
    if (crumb) {
      crumb.innerHTML = `<span>首页</span><i>/</i><span>事件预警</span><i>/</i><span class="current">${title}</span>`;
    }
  }

  function setBreadcrumbTrail(parts) {
    const crumb = document.querySelector(".topbar-breadcrumb");
    if (!crumb) return;
    crumb.innerHTML = parts
      .map((part, index) => `<span class="${index === parts.length - 1 ? "current" : ""}">${part}</span>`)
      .join("<i>/</i>");
  }

  function riskTag(risk) {
    if (risk === "高风险") return "high";
    if (risk === "中风险") return "medium";
    return "low";
  }

  function statusTag(status) {
    if (["预警中", "跟踪中", "持续跟踪", "生效中", "关注中"].includes(status)) return "low";
    if (["待研判", "暂停中"].includes(status)) return "medium";
    if (["已取消", "已归档"].includes(status)) return "cancelled";
    return "";
  }

  function updateStatusTag(status) {
    if (status === "有更新") return "update-new";
    if (status === "待查看") return "update-pending";
    if (status === "已查看") return "update-read";
    return "update-none";
  }

  function firstPlatform(source) {
    return String(source || "其他").split(/[\/、]/)[0].trim() || "其他";
  }

  const subscriptionStorageKey = "warning_my_subscriptions";

  function saveSubscriptions() {
    try {
      localStorage.setItem(subscriptionStorageKey, JSON.stringify(subscriptions));
    } catch (error) {
      // 原型页面在无存储权限环境下仍可运行。
    }
  }

  function hydrateSubscriptions() {
    try {
      const raw = localStorage.getItem(subscriptionStorageKey);
      if (!raw) return;
      const stored = JSON.parse(raw);
      if (!Array.isArray(stored)) return;
      subscriptions.splice(0, subscriptions.length, ...stored.filter((record) => record && record.id));
    } catch (error) {
      // 忽略损坏的本地原型数据。
    }
  }

  function addSubscriptionFromEvent(item) {
    hydrateSubscriptions();
    if (!item) return false;
    const subscriptionId = `SUB-${item.id}`;
    if (subscriptions.some((record) => record.id === subscriptionId || record.intelligenceId === item.id)) {
      return false;
    }
    const title = item.eventName || item.name;
    const summary = item.summary || item.description;
    const source = item.source || item.sourcePlatform || item.intelligenceSource;
    const category = item.organizationCategory || item.category;
    const risk = item.riskLevel || item.risk;
    const updatedAt = item.updateTime || item.updatedAt;

    subscriptions.unshift({
      id: subscriptionId,
      intelligenceId: item.id,
      title,
      summary,
      sourcePlatform: firstPlatform(source),
      organizationCategory: category,
      relatedEvent: title,
      relatedTopic: category,
      riskLevel: risk,
      followTime: "2026-04-17 11:30",
      latestUpdateTime: updatedAt,
      updateStatus: "有更新",
      pushMethod: "站内提醒 / App",
      frequency: "实时",
      status: "关注中",
      remark: "由事件榜单或事件详情加入关注。",
    });
    saveSubscriptions();
    return true;
  }

  function hasSubscriptionForEvent(item) {
    if (!item) return false;
    return subscriptions.some((record) => record.id === `SUB-${item.id}` || record.intelligenceId === item.id);
  }

  function parseDate(value) {
    return new Date(value.replace(/-/g, "/")).getTime();
  }

  function inRange(value, range) {
    if (!range) return true;
    const now = new Date("2026/04/17 12:00").getTime();
    const days = { "1d": 1, "7d": 7, "30d": 30, "90d": 90 }[range] || 9999;
    return now - parseDate(value) <= days * 24 * 60 * 60 * 1000;
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("open");
  }

  function closeModal(modal) {
    modal.classList.remove("open");
  }

  function bindModalClose() {
    document.querySelectorAll(".warning-modal").forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.hasAttribute("data-modal-close")) {
          closeModal(modal);
        }
      });
    });
  }

  function detailGrid(items) {
    return items
      .map(
        ([label, value, full]) => `
          <div class="detail-item ${full ? "full" : ""}">
            <div class="detail-label">${label}</div>
            <div class="detail-value">${html(value)}</div>
          </div>
        `,
      )
      .join("");
  }

  function pagination(total) {
    return `
      <div class="warning-pagination">
        <span>共 ${total} 条</span>
        <div class="warning-pages">
          <button class="page-chip" type="button">上一页</button>
          <button class="page-chip active" type="button">1</button>
          <button class="page-chip" type="button">2</button>
          <button class="page-chip" type="button">下一页</button>
        </div>
      </div>
    `;
  }

  function renderRankPage() {
    hydrateSubscriptions();
    setBreadcrumb("事件榜单");
    pageContent.innerHTML = `
      <div class="warning-page">
        <section class="warning-page-head">
          <div>
            <h1>事件榜单</h1>
            <p>按热度、组织类别和风险等级展示重点事件，支持快速筛选和查看详情。</p>
          </div>
          <div class="warning-head-actions">
            <button class="btn" id="rankRefreshBtn" type="button">刷新榜单</button>
            <button class="btn primary" id="rankExportBtn" type="button">导出榜单</button>
          </div>
        </section>
        <section class="query-panel">
          <div class="query-grid rank-query-grid">
            <div class="query-item"><label>事件名称：</label><input id="rankSearch" placeholder="请输入" /></div>
            <div class="query-item"><label>组织类别：</label><select id="rankCategory"><option value="">全部类别</option><option>FLG</option><option>QNS</option><option>ZHG</option><option>XSD</option><option>DLM</option><option>其他</option></select></div>
            <div class="query-item"><label>风险等级：</label><select id="rankRisk"><option value="">全部等级</option><option>高风险</option><option>中风险</option><option>低风险</option></select></div>
            <div class="query-item"><label>时间范围：</label><select id="rankTimeRange"><option value="">全部时间</option><option value="1d">近 24 小时</option><option value="7d">近 7 天</option><option value="30d">近 30 天</option></select></div>
            <div class="query-actions">
              <button class="btn-primary" id="rankQueryBtn" type="button">查询</button>
              <button class="btn-default" id="rankResetBtn" type="button">重置</button>
            </div>
          </div>
        </section>
        <section class="card warning-panel">
          <div class="warning-panel-head">
            <div>
              <h2 class="warning-panel-title">榜单列表</h2>
              <p class="warning-panel-desc">展示排名、组织类别、热度指数、风险等级和来源渠道。</p>
            </div>
            <div class="warning-note" id="rankSummary">已加载 0 条榜单事件</div>
          </div>
          <div class="warning-table-wrap">
            <table class="warning-table">
              <thead><tr><th>排名</th><th>事件名称</th><th>组织类别</th><th>热度指数</th><th>风险等级</th><th>来源平台 / 渠道</th><th>录入时间</th><th>操作</th></tr></thead>
              <tbody id="rankTableBody"></tbody>
            </table>
          </div>
          <div class="warning-empty" id="rankEmpty">未找到符合条件的榜单事件</div>
          <div id="rankPager"></div>
        </section>
      </div>
      <div class="warning-modal" id="rankDetailModal"><div class="warning-modal-card"><div class="warning-modal-head"><div><h3>事件详情</h3><p>查看榜单事件基础信息、热度、来源和摘要。</p></div><button class="btn" type="button" data-modal-close>关闭</button></div><div class="warning-modal-body"><div class="detail-grid" id="rankDetailGrid"></div></div></div></div>
    `;

    const filter = () => {
      const keyword = document.getElementById("rankSearch").value.trim().toLowerCase();
      const category = document.getElementById("rankCategory").value;
      const risk = document.getElementById("rankRisk").value;
      const range = document.getElementById("rankTimeRange").value;
      return rankRecords
        .filter((item) => {
          const text = `${item.name} ${item.description} ${item.keywords}`.toLowerCase();
          return (
            (!keyword || text.includes(keyword)) &&
            (!category || item.category === category) &&
            (!risk || item.risk === risk) &&
            inRange(item.updatedAt, range)
          );
        })
        .sort((a, b) => b.heat - a.heat);
    };

    function render() {
      const records = filter();
      document.getElementById("rankSummary").textContent = `已展示 ${records.length} 条榜单事件`;
      document.getElementById("rankEmpty").classList.toggle("show", records.length === 0);
      document.getElementById("rankPager").innerHTML = pagination(records.length);
      document.getElementById("rankTableBody").innerHTML = records
        .map(
          (item, index) => `
            <tr>
              <td><span class="rank-badge ${index < 3 ? `top-${index + 1}` : ""}">${index + 1}</span></td>
              <td class="event-title-cell"><div class="event-name">${html(item.name)}</div><div class="event-summary">${html(item.description)}</div></td>
              <td>${html(item.category)}</td>
              <td><div class="heat-bar"><strong>${item.heat}</strong><div class="heat-track"><div class="heat-fill" style="width:${item.heat}%"></div></div></div></td>
              <td><span class="tag ${riskTag(item.risk)}">${html(item.risk)}</span></td>
              <td>${html(item.source)}</td>
              <td>${html(item.updatedAt)}</td>
              <td><div class="warning-actions"><button class="btn text" data-view="${item.id}" type="button">详情</button></div></td>
            </tr>
          `,
        )
        .join("");
      document.querySelectorAll("[data-view]").forEach((button) => {
        button.addEventListener("click", () => {
          const item = rankRecords.find((record) => record.id === button.dataset.view);
          document.getElementById("rankDetailGrid").innerHTML = detailGrid([
            ["事件编号", item.id],
            ["事件名称", item.name],
            ["组织类别", item.category],
            ["风险等级", item.risk],
            ["热度指数", item.heat],
            ["来源平台 / 渠道", item.source],
            ["录入时间", item.updatedAt],
            ["关键词", item.keywords, true],
            ["事件摘要", item.description, true],
          ]);
          openModal("rankDetailModal");
        });
      });
    }

    document.getElementById("rankQueryBtn").addEventListener("click", render);
    document.getElementById("rankRefreshBtn").addEventListener("click", render);
    document.getElementById("rankExportBtn").addEventListener("click", () => alert("导出榜单数据"));
    document.getElementById("rankResetBtn").addEventListener("click", () => {
      ["rankSearch", "rankCategory", "rankRisk", "rankTimeRange"].forEach((id) => (document.getElementById(id).value = ""));
      render();
    });
    bindModalClose();
    render();
  }

  function renderMyEventsPage() {
    setBreadcrumb("我的事件");
    pageContent.innerHTML = `
      <div class="warning-page">
        <section class="warning-page-head"><div><h1>我的事件</h1><p>管理当前录入情报或已加入处置的事件，支持筛选和查看详情。</p></div><div class="warning-head-actions"><button class="btn primary" id="eventCreateBtn" type="button">新建事件</button></div></section>
        <section class="query-panel">
          <div class="query-grid my-events-query-grid">
            <div class="query-item"><label>事件名称：</label><input id="eventSearch" placeholder="请输入" /></div>
            <div class="query-item"><label>组织类别：</label><select id="organizationCategory"><option value="">全部类别</option><option>FLG</option><option>QNS</option><option>ZHG</option><option>XSD</option><option>DLM</option><option>其他</option></select></div>
            <div class="query-item"><label>风险等级：</label><select id="eventRisk"><option value="">全部等级</option><option>高风险</option><option>中风险</option><option>低风险</option></select></div>
            <div class="query-item"><label>时间范围：</label><select id="eventTimeRange"><option value="">全部时间</option><option value="7d">近 7 天</option><option value="30d">近 30 天</option><option value="90d">近 90 天</option></select></div>
            <div class="query-actions">
              <button class="btn-primary" id="eventQueryBtn" type="button">查询</button>
              <button class="btn-default" id="eventResetBtn" type="button">重置</button>
            </div>
          </div>
        </section>
        <section class="card warning-panel">
          <div class="warning-panel-head"><div><h2 class="warning-panel-title">事件列表</h2><p class="warning-panel-desc">展示当前录入情报或已加入处置的事件，支持查看详情。</p></div><div class="warning-note" id="eventSummary">已加载 0 条我的事件</div></div>
          <div class="warning-table-wrap"><table class="warning-table my-events-table"><thead><tr><th>事件名称</th><th>组织类别</th><th>风险等级</th><th>当前状态</th><th>更新时间</th><th>来源平台 / 渠道</th><th>操作</th></tr></thead><tbody id="myEventsTableBody"></tbody></table></div>
          <div class="warning-empty" id="eventEmpty">未找到符合条件的我的事件</div><div id="eventPager"></div>
        </section>
      </div>
      <div class="warning-modal" id="eventEditorModal"><div class="warning-modal-card"><div class="warning-modal-head"><div><h3 id="eventEditorTitle">新建事件</h3><p>录入或更新个人关注事件的基础信息。</p></div><button class="btn" type="button" data-modal-close>关闭</button></div><div class="warning-modal-body"><div class="editor-grid">
        <div class="warning-field full"><label>事件名称</label><input class="control" id="editorName" /></div>
        <div class="warning-field"><label>组织类别</label><select class="control" id="editorOrganizationCategory"><option>FLG</option><option>QNS</option><option>ZHG</option><option>XSD</option><option>DLM</option><option>其他</option></select></div>
        <div class="warning-field"><label>风险等级</label><select class="control" id="editorRisk"><option>高风险</option><option>中风险</option><option>低风险</option></select></div>
        <div class="warning-field"><label>事件状态</label><select class="control" id="editorStatus"><option>跟踪中</option><option>待研判</option><option>已处置</option><option>已归档</option></select></div>
        <div class="warning-field"><label>来源平台 / 渠道</label><input class="control" id="editorSourcePlatform" /></div>
        <div class="warning-field full"><label>事件摘要</label><textarea class="control" id="editorDescription" rows="4"></textarea></div>
      </div><div class="warning-modal-actions"><button class="btn" type="button" data-modal-close>取消</button><button class="btn primary" id="eventSaveBtn" type="button">保存</button></div></div></div></div>
      <div class="warning-modal" id="eventPushModal"><div class="warning-modal-card"><div class="warning-modal-head"><div><h3>事件推送</h3><p id="eventPushDesc">选择所属分类、推送对象和推送方式，生成业务推送记录。</p></div><button class="btn" type="button" data-modal-close>关闭</button></div><div class="warning-modal-body"><div class="editor-grid">
        <div class="warning-field"><label>所属分类</label><select class="control" id="eventPushCategory"><option value="cat-001">境外涉华舆情专题</option><option value="cat-002">重点账号异常活跃分类</option><option value="cat-003">涉边事件跟踪分类</option><option value="cat-004">海外论坛误导信息分类</option></select></div>
        <div class="warning-field"><label>推送对象</label><input class="control" id="eventPushTarget" value="专题专班, 研判一组" /></div>
        <div class="warning-field"><label>推送方式</label><select class="control" id="eventPushMethod"><option>App</option><option>邮件</option><option>短信</option><option>Webhook</option></select></div>
        <div class="warning-field full"><label>推送说明</label><textarea class="control" id="eventPushRemark" rows="4">请及时查看并反馈处置进展。</textarea></div>
      </div><div class="warning-modal-actions"><button class="btn" type="button" data-modal-close>取消</button><button class="btn primary" id="eventPushSaveBtn" type="button">确认推送</button></div></div></div></div>
    `;

    function filter() {
      const keyword = document.getElementById("eventSearch").value.trim().toLowerCase();
      return myEvents.filter((item) => {
        const text = `${item.eventName} ${item.summary} ${item.sourcePlatform}`.toLowerCase();
        return (
          (!keyword || text.includes(keyword)) &&
          (!document.getElementById("organizationCategory").value || item.organizationCategory === document.getElementById("organizationCategory").value) &&
          (!document.getElementById("eventRisk").value || item.riskLevel === document.getElementById("eventRisk").value) &&
          inRange(item.updateTime, document.getElementById("eventTimeRange").value)
        );
      });
    }

    function openEditor(record) {
      editingEventId = record ? record.id : "";
      document.getElementById("eventEditorTitle").textContent = record ? "编辑事件" : "新建事件";
      document.getElementById("editorName").value = record ? record.eventName : "";
      document.getElementById("editorOrganizationCategory").value = record ? record.organizationCategory : "FLG";
      document.getElementById("editorRisk").value = record ? record.riskLevel : "中风险";
      document.getElementById("editorStatus").value = record ? record.status : "跟踪中";
      document.getElementById("editorSourcePlatform").value = record ? record.sourcePlatform : "";
      document.getElementById("editorDescription").value = record ? record.summary : "";
      openModal("eventEditorModal");
    }

    function openPush(record) {
      editingEventId = record ? record.id : "";
      document.getElementById("eventPushDesc").textContent = record ? `推送事件：${record.eventName}` : "选择所属分类、推送对象和推送方式，生成业务推送记录。";
      document.getElementById("eventPushCategory").value = "cat-001";
      document.getElementById("eventPushTarget").value = "专题专班, 研判一组";
      document.getElementById("eventPushMethod").value = "App";
      document.getElementById("eventPushRemark").value = record ? `请关注${record.eventName}，并反馈处置进展。` : "请及时查看并反馈处置进展。";
      openModal("eventPushModal");
    }

    function render() {
      const records = filter();
      document.getElementById("eventSummary").textContent = `已展示 ${records.length} 条我的事件`;
      document.getElementById("eventEmpty").classList.toggle("show", records.length === 0);
      document.getElementById("eventPager").innerHTML = pagination(records.length);
      document.getElementById("myEventsTableBody").innerHTML = records
        .map(
          (item) => `
            <tr><td class="event-title-cell"><div class="event-name">${html(item.eventName)}</div><div class="event-summary">${html(item.summary)}</div></td><td><span class="tag organization">${html(item.organizationCategory)}</span></td><td><span class="tag ${riskTag(item.riskLevel)}">${html(item.riskLevel)}</span></td><td><span class="tag ${statusTag(item.status)}">${html(item.status)}</span></td><td>${html(item.updateTime)}</td><td><span class="tag source">${html(item.sourcePlatform)}</span></td><td><div class="warning-actions"><button class="btn text" data-view-event="${item.id}" type="button">详情</button><button class="btn text" data-push-event="${item.id}" type="button">推送</button></div></td></tr>
          `,
        )
        .join("");
      document.querySelectorAll("[data-view-event]").forEach((button) => {
        button.addEventListener("click", () => {
          window.location.href = `warning-event-detail.html?id=${encodeURIComponent(button.dataset.viewEvent)}`;
        });
      });
      document.querySelectorAll("[data-push-event]").forEach((button) => {
        button.addEventListener("click", () => {
          const item = myEvents.find((record) => record.id === button.dataset.pushEvent);
          if (item) openPush(item);
        });
      });
    }

    document.getElementById("eventCreateBtn").addEventListener("click", () => openEditor(null));
    document.getElementById("eventQueryBtn").addEventListener("click", render);
    document.getElementById("eventResetBtn").addEventListener("click", () => {
      ["eventSearch", "organizationCategory", "eventRisk", "eventTimeRange"].forEach((id) => (document.getElementById(id).value = ""));
      render();
    });
    document.getElementById("eventSaveBtn").addEventListener("click", () => {
      const name = document.getElementById("editorName").value.trim();
      if (!name) {
        alert("请输入事件名称");
        return;
      }
      if (editingEventId) {
        const item = myEvents.find((record) => record.id === editingEventId);
        item.eventName = name;
        item.organizationCategory = document.getElementById("editorOrganizationCategory").value;
        item.riskLevel = document.getElementById("editorRisk").value;
        item.status = document.getElementById("editorStatus").value;
        item.sourcePlatform = document.getElementById("editorSourcePlatform").value.trim() || "未标注渠道";
        item.summary = document.getElementById("editorDescription").value.trim() || "已补充事件摘要。";
        item.updateTime = "2026-04-17 11:00";
      } else {
        myEvents.unshift({
          id: `event-${String(myEvents.length + 1).padStart(3, "0")}`,
          eventName: name,
          organizationCategory: document.getElementById("editorOrganizationCategory").value,
          riskLevel: document.getElementById("editorRisk").value,
          status: document.getElementById("editorStatus").value,
          updateTime: "2026-04-17 11:00",
          sourcePlatform: document.getElementById("editorSourcePlatform").value.trim() || "未标注渠道",
          summary: document.getElementById("editorDescription").value.trim() || "新建事件，待补充详细摘要。",
        });
      }
      closeModal(document.getElementById("eventEditorModal"));
      render();
    });
    document.getElementById("eventPushSaveBtn").addEventListener("click", () => {
      const item = myEvents.find((record) => record.id === editingEventId);
      if (!item) return;
      const targets = document
        .getElementById("eventPushTarget")
        .value.split(/[,，]/)
        .map((target) => target.trim())
        .filter(Boolean);
      const storageKey = "business_push_records";
      let records = [];
      try {
        records = JSON.parse(localStorage.getItem(storageKey) || "[]");
      } catch (error) {
        records = [];
      }
      records.unshift({
        id: `push-${Date.now()}`,
        title: item.eventName,
        categoryId: document.getElementById("eventPushCategory").value,
        intelligenceId: "",
        eventId: item.id,
        riskLevel: item.riskLevel,
        sourcePlatform: item.sourcePlatform,
        pushType: "事件推送",
        pushMethod: document.getElementById("eventPushMethod").value,
        pushTarget: targets,
        status: "已推送",
        feedbackStatus: "待反馈",
        createTime: "2026-04-17 11:30",
        updateTime: "2026-04-17 11:30",
        remark: document.getElementById("eventPushRemark").value.trim(),
      });
      localStorage.setItem(storageKey, JSON.stringify(records));
      closeModal(document.getElementById("eventPushModal"));
      alert("已生成业务推送记录，可在业务推送记录中查看。");
    });
    bindModalClose();
    render();
  }

  function renderEventDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("id") || "event-001";
    const event =
      myEvents.find((item) => item.id === eventId) ||
      rankRecords.find((item) => item.id === eventId) ||
      myEvents[0];

    setBreadcrumbTrail(["工作台", "事件预警", "我的事件", "事件详情"]);
    const eventName = event.eventName || event.name || "东南亚社交平台涉华议题集中升温";
    const eventStatus = event.status === "跟踪中" ? "跟踪中" : event.status || "跟踪中";
    const eventCategory = event.organizationCategory || event.category || "FLG";
    const eventRisk = event.riskLevel || event.risk || "高风险";
    const eventSource = event.sourcePlatform || event.source || "未标注渠道";
    hydrateSubscriptions();
    const eventFollowed = hasSubscriptionForEvent(event);
    pageContent.innerHTML = `
      <div class="event-detail-page">
        <section class="event-detail-hero">
          <div class="event-detail-actions">
            <button class="btn" id="backEventListBtn" type="button"><span>←</span>返回列表</button>
            <button class="btn" id="followEventInfoBtn" type="button"><span>★</span>${eventFollowed ? "已关注" : "加入关注"}</button>
            <button class="btn primary" id="editEventBtn" type="button"><span>✎</span>编辑事件</button>
            <button class="btn primary" id="reportEventBtn" type="button"><span>▣</span>生成报告</button>
          </div>
        </section>

        <section class="detail-card event-basic-card">
          <h2 class="detail-section-title">事件基本信息</h2>
          <div class="event-basic-grid">
            <div class="event-basic-left">
              ${[
                ["事件名称", eventName],
                ["相关时间节点", "2026-04-14 19:00  至  2026-04-17 09:20 （持续中）"],
              ]
                .map(([label, value]) => `<div class="basic-row"><div class="basic-label">${label}</div><div class="basic-value">${html(value)}</div></div>`)
                .join("")}
              <div class="basic-row">
                <div class="basic-label">关联关键词</div>
                <div class="keyword-pills">
                  ${["涉华议题", "东南亚", "舆论传播", "社交平台", "民族情绪", "国际舆情"].map((word) => `<span>${word}</span>`).join("")}
                </div>
              </div>
              <div class="basic-row">
                <div class="basic-label">详细事件描述</div>
                <div class="basic-desc">4月14日晚间起，东南亚地区多个社交平台上出现关于中国企业在当地投资企业投资项目的讨论帖，部分内容指出违规环保问题集中发酵，随后涉及歧视与排斥言论。情绪逐步升温。目前已扩散至 Reddit、X（原 Twitter）、Facebook、TikTok 等平台，呈现国别、反华叙事和受众扩散快的特征，需以多方观察与监测并引发区域内舆情共振，存在进一步扩散跨境议题引发连锁反应的风险。</div>
              </div>
            </div>
            <div class="event-basic-right">
              ${[
                ["组织类别", eventCategory, eventCategory, ""],
                ["风险等级", eventRisk, eventRisk, "danger"],
                ["当前状态", eventStatus, "跟踪中", "success"],
                ["创建时间", "2026-04-16 10:00:20", "2026-04-16 10:00:20", ""],
              ]
                .map(
                  ([label, raw, value, type]) => `
                    <div class="side-row">
                      <div class="basic-label">${label}</div>
                      <div class="side-value ${type ? `pill-${type}` : ""}">${type ? `<span>${html(value)}</span>` : html(raw)}</div>
                    </div>
                  `,
                )
                .join("")}
              <div class="side-row">
                <div class="basic-label">来源平台 / 渠道</div>
                <div class="side-value">${html(eventSource)} · <a href="warning-rank.html">东南亚涉华话题榜 · 第 3 位</a></div>
              </div>
            </div>
          </div>
        </section>

        <section class="detail-two-col">
          <div class="detail-card overview-card">
            <h2 class="detail-section-title">整体概况</h2>
            <div class="metric-grid">
              ${[
                ["✉", "信息推送总量", "8,742", "条", "较昨日 -18.6%", "down"],
                ["▣", "重点平台数", "12", "个", "较昨日 +1", ""],
                ["●", "相关账号数", "1,256", "个", "较昨日 +9.3%", "up"],
                ["▲", "高风险信息数", "368", "条", "较昨日 +21.1%", "up danger"],
              ]
                .map(
                  ([icon, label, value, unit, delta, trend]) => `
                    <div class="metric-item ${trend.includes("danger") ? "danger" : ""}">
                      <div class="metric-icon">${icon}</div>
                      <div>
                        <div class="metric-label">${label}</div>
                        <div class="metric-value">${value}<small>${unit}</small></div>
                        <div class="metric-delta ${trend.includes("up") ? "up" : trend.includes("down") ? "down" : ""}">${delta}${trend.includes("up") ? " ↑" : trend.includes("down") ? " ↓" : ""}</div>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
            <div class="overview-note">
              <div class="note-icon">◆</div>
              <p>事件自 4月14日 晚间发酵，热度持续攀升，主要集中在 X、Facebook 和 TikTok 平台。讨论内容以质疑、指责及情绪化表达为主，建议各相关部门密切跟踪，存在进一步扩散至主流媒体及线下场景风险，请加强舆论引导，谨慎关注。</p>
            </div>
          </div>

          <div class="detail-card evolution-card">
            <h2 class="detail-section-title">事件演化脉络</h2>
            <div class="evolution-line">
              ${[
                ["04-14 19:00", "初始触发", "东南亚社交平台出现关于中国企业投资项目的讨论帖。"],
                ["04-15 08:30", "快速扩散", "相关内容被多账号转发与评论，情绪化言论增多。"],
                ["04-15 16:40", "平台放大", "相关话题登上 Reddit、X 热榜，讨论热度显著上升。"],
                ["04-16 09:20", "跨区域讨论", "话题扩散至泛东南亚，部分升级至歧视与排斥言论。"],
                ["04-17 09:20", "当前阶段", "热度高位运行，涉事内容持续被转载及延伸讨论。"],
              ]
                .map(
                  ([time, title, desc]) => `
                    <div class="evolution-node">
                      <div class="evolution-dot"></div>
                      <div class="evolution-time">${time}</div>
                      <div class="evolution-title">${title}</div>
                      <p>${desc}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>
        </section>

        <section class="detail-card push-table-card">
          <h2 class="detail-section-title">重点推送信息</h2>
          <div class="detail-table-wrap">
            <table class="detail-table">
              <thead>
                <tr><th>时间</th><th>平台</th><th>标题/摘要</th><th>风险标签</th><th>状态</th><th>操作</th></tr>
              </thead>
              <tbody>
                ${[
                  ["2026-04-17 09:10", "𝕏 X（Twitter）", "【热点】某中国企业在印尼的投资环境？当地居民发声要求整改！", "高风险"],
                  ["2026-04-17 08:45", "f Facebook", "视频：东南亚多国民众在中国基建项目起反对和抵制", "中风险"],
                  ["2026-04-17 07:30", "♪ TikTok", "实拍：当地渔民控诉工厂排污造成渔业大量死亡", "高风险"],
                  ["2026-04-16 23:55", "◎ Reddit", "讨论帖：中国公司在东南亚的“真实面目”", "中风险"],
                  ["2026-04-16 21:20", "▶ YouTube", "视频：东南亚环保组织集中中国国企破坏生态", "中风险"],
                ]
                  .map(
                    ([time, platform, title, risk]) => `
                      <tr>
                        <td>${time}</td>
                        <td class="platform-cell">${platform}</td>
                        <td>${title}</td>
                        <td><span class="detail-risk ${risk === "高风险" ? "high" : "mid"}">${risk}</span></td>
                        <td><span class="detail-status">已推送</span></td>
                        <td><button class="detail-link" type="button" data-info-view>查看详情</button><button class="detail-link" type="button" data-info-view>来源分析</button></td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          <div class="detail-pagination"><span>共 5 条</span><button disabled>‹</button><button class="active">1</button><button>›</button><select><option>10 条/页</option></select></div>
        </section>
      </div>
    `;

    document.getElementById("backEventListBtn").addEventListener("click", () => {
      window.location.href = "warning-my-events.html";
    });
    document.getElementById("followEventInfoBtn").addEventListener("click", () => {
      const added = addSubscriptionFromEvent(event);
      document.getElementById("followEventInfoBtn").innerHTML = "<span>★</span>已关注";
      alert(added ? "已加入我的订阅。" : "该情报已在我的订阅中。");
    });
    document.getElementById("editEventBtn").addEventListener("click", () => alert("进入事件编辑"));
    document.getElementById("reportEventBtn").addEventListener("click", () => alert("正在生成事件报告"));
    document.querySelectorAll("[data-info-view]").forEach((button) => {
      button.addEventListener("click", () => alert("查看事件信息详情"));
    });
  }

  function renderSubscriptionsPage() {
    hydrateSubscriptions();
    setBreadcrumb("我的订阅");
    pageContent.innerHTML = `
      <div class="warning-page">
        <section class="warning-page-head"><div><h1>我的订阅</h1><p>展示当前用户已加入关注的情报数据，支持筛选、查看详情和取消关注。</p></div></section>
        <section class="subscription-stat-grid">
          <div class="subscription-stat-card"><div class="subscription-stat-icon info">情</div><div><span>已关注情报</span><strong id="statFollowed">0</strong></div></div>
          <div class="subscription-stat-card"><div class="subscription-stat-icon update">更</div><div><span>今日更新</span><strong id="statToday">0</strong></div></div>
          <div class="subscription-stat-card"><div class="subscription-stat-icon risk">险</div><div><span>高风险关注</span><strong id="statHighRisk">0</strong></div></div>
          <div class="subscription-stat-card"><div class="subscription-stat-icon todo">提</div><div><span>待处理提醒</span><strong id="statPending">0</strong></div></div>
        </section>
        <section class="query-panel">
          <div class="query-grid subscription-query-grid">
            <div class="query-item"><label>事件名称：</label><input id="subscriptionSearch" placeholder="请输入" /></div>
            <div class="query-item"><label>组织类别：</label><select id="subscriptionOrgCategory"><option value="">全部类别</option><option>FLG</option><option>QNS</option><option>ZHG</option><option>XSD</option><option>DLM</option><option>其他</option></select></div>
            <div class="query-item"><label>风险等级：</label><select id="subscriptionRisk"><option value="">全部等级</option><option>高风险</option><option>中风险</option><option>低风险</option></select></div>
            <div class="query-item"><label>时间范围：</label><select id="subscriptionRange"><option value="">全部时间</option><option value="1d">今日</option><option value="7d">近 7 天</option><option value="30d">近 30 天</option><option value="custom">自定义</option></select></div>
            <div class="query-actions">
              <button class="btn-primary" id="subscriptionQueryBtn" type="button">查询</button>
              <button class="btn-default" id="subscriptionResetBtn" type="button">重置</button>
            </div>
          </div>
        </section>
        <section class="card warning-panel">
          <div class="warning-panel-head"><div><h2 class="warning-panel-title">关注情报列表</h2><p class="warning-panel-desc">展示当前用户已加入关注的情报数据，支持查看详情和取消关注。</p></div><div class="warning-note" id="subscriptionSummary">已关注 0 条情报</div></div>
          <div class="warning-table-wrap"><table class="warning-table subscription-table"><thead><tr><th>事件名称</th><th>组织类别</th><th>风险等级</th><th>当前状态</th><th>更新时间</th><th>来源平台 / 渠道</th><th>操作</th></tr></thead><tbody id="subscriptionTableBody"></tbody></table></div>
          <div class="warning-empty" id="subscriptionEmpty">未找到符合条件的关注情报</div><div id="subscriptionPager"></div>
        </section>
      </div>
      <div class="warning-modal" id="subscriptionDetailModal"><div class="warning-modal-card"><div class="warning-modal-head"><div><h3>情报详情</h3><p>查看当前关注情报的基础信息、关联事件和最新更新情况。</p></div><button class="btn" type="button" data-modal-close>关闭</button></div><div class="warning-modal-body"><div class="detail-grid" id="subscriptionDetailGrid"></div></div></div></div>
    `;

    function filter() {
      const keyword = document.getElementById("subscriptionSearch").value.trim().toLowerCase();
      return subscriptions.filter((item) => {
        const text = `${item.title} ${item.summary} ${item.sourcePlatform} ${item.relatedEvent} ${item.relatedTopic}`.toLowerCase();
        return (
          (!keyword || text.includes(keyword)) &&
          (!document.getElementById("subscriptionOrgCategory").value || item.organizationCategory === document.getElementById("subscriptionOrgCategory").value) &&
          (!document.getElementById("subscriptionRisk").value || item.riskLevel === document.getElementById("subscriptionRisk").value) &&
          (document.getElementById("subscriptionRange").value === "custom" || inRange(item.latestUpdateTime, document.getElementById("subscriptionRange").value))
        );
      });
    }

    function updateStats() {
      document.getElementById("statFollowed").textContent = subscriptions.length;
      document.getElementById("statToday").textContent = subscriptions.filter((item) => item.latestUpdateTime.startsWith("2026-04-17")).length;
      document.getElementById("statHighRisk").textContent = subscriptions.filter((item) => item.riskLevel === "高风险").length;
      document.getElementById("statPending").textContent = subscriptions.filter((item) => ["有更新", "待查看"].includes(item.updateStatus)).length;
    }

    function renderDetail(item) {
      document.getElementById("subscriptionDetailGrid").innerHTML = detailGrid([
        ["情报编号", item.intelligenceId],
        ["事件名称", item.title, true],
        ["组织类别", item.organizationCategory || "其他"],
        ["风险等级", item.riskLevel],
        ["当前状态", item.status],
        ["更新时间", item.latestUpdateTime],
        ["来源平台 / 渠道", item.sourcePlatform],
        ["事件摘要", item.summary, true],
      ]);
      openModal("subscriptionDetailModal");
    }

    function render() {
      updateStats();
      const records = filter().sort((a, b) => parseDate(b.latestUpdateTime) - parseDate(a.latestUpdateTime));
      document.getElementById("subscriptionSummary").textContent = `已关注 ${records.length} 条情报`;
      document.getElementById("subscriptionEmpty").classList.toggle("show", records.length === 0);
      document.getElementById("subscriptionPager").innerHTML = pagination(records.length);
      document.getElementById("subscriptionTableBody").innerHTML = records
        .map(
          (item) => `
            <tr>
              <td class="event-title-cell"><div class="event-name">${html(item.title)}</div><div class="event-summary">${html(item.summary)}</div></td>
              <td><span class="tag organization">${html(item.organizationCategory || "其他")}</span></td>
              <td><span class="tag ${riskTag(item.riskLevel)}">${html(item.riskLevel)}</span></td>
              <td><span class="tag ${statusTag(item.status)}">${html(item.status)}</span></td>
              <td>${html(item.latestUpdateTime)}</td>
              <td><span class="tag source">${html(item.sourcePlatform)}</span></td>
              <td><div class="warning-actions"><button class="btn text" data-view-sub="${item.id}" type="button">查看详情</button><button class="btn text danger" data-cancel-sub="${item.id}" type="button">取消关注</button></div></td>
            </tr>
          `,
        )
        .join("");
      document.querySelectorAll("[data-view-sub]").forEach((button) => {
        button.addEventListener("click", () => {
          const item = subscriptions.find((record) => record.id === button.dataset.viewSub);
          if (item) renderDetail(item);
        });
      });
      document.querySelectorAll("[data-cancel-sub]").forEach((button) => {
        button.addEventListener("click", () => {
          const index = subscriptions.findIndex((record) => record.id === button.dataset.cancelSub);
          if (index >= 0 && confirm("确认取消关注该情报？取消后将不再接收该情报的更新提醒。")) {
            const item = subscriptions[index];
            subscriptions.splice(index, 1);
            const relatedRank = rankRecords.find((record) => record.id === item.intelligenceId);
            if (relatedRank) relatedRank.followed = false;
            saveSubscriptions();
            alert("已取消关注。");
            render();
          }
        });
      });
    }

    document.getElementById("subscriptionQueryBtn").addEventListener("click", render);
    document.getElementById("subscriptionResetBtn").addEventListener("click", () => {
      ["subscriptionSearch", "subscriptionOrgCategory", "subscriptionRisk", "subscriptionRange"].forEach((id) => (document.getElementById(id).value = ""));
      render();
    });
    ["subscriptionSearch", "subscriptionOrgCategory", "subscriptionRisk", "subscriptionRange"].forEach((id) => {
      document.getElementById(id).addEventListener("change", render);
      document.getElementById(id).addEventListener("input", render);
    });
    bindModalClose();
    render();
  }

  if (pageKey === "warning-rank") renderRankPage();
  if (pageKey === "warning-my-events") renderMyEventsPage();
  if (pageKey === "warning-event-detail") renderEventDetailPage();
  if (pageKey === "warning-subscriptions") renderSubscriptionsPage();
})();
