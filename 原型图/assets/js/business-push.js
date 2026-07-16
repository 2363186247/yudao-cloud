(function () {
  const page = document.body.dataset.businessPage || "index";
  const app = document.getElementById("businessPushApp");
  const storageKey = "business_push_records";
  const categoryStorageKey = "business_push_categories";
  const pushUsers = [
    { name: "张明", dept: "研判一组" },
    { name: "李娜", dept: "情报二组" },
    { name: "王强", dept: "专题专班" },
    { name: "赵敏", dept: "核验中心" },
  ];

  const categoryList = [
    {
      id: "cat-001",
      name: "境外涉华舆情专题",
      type: "专题",
      organizationCategory: "FLG",
      platform: "X",
      riskLevel: "高风险",
      count: 38,
      highRiskCount: 12,
      owner: "研判一组",
      updateTime: "2026-04-17 10:20",
      status: "启用",
      description: "围绕境外涉华议题、账号扩散和跨平台传播走势进行持续收录。",
    },
    {
      id: "cat-002",
      name: "重点账号异常活跃分类",
      type: "专题",
      organizationCategory: "QNS",
      platform: "Telegram",
      riskLevel: "中风险",
      count: 24,
      highRiskCount: 5,
      owner: "情报二组",
      updateTime: "2026-04-17 09:45",
      status: "启用",
      description: "由账号增粉、密集发布和关联链路规则自动归集。",
    },
    {
      id: "cat-003",
      name: "涉边事件跟踪分类",
      type: "专题",
      organizationCategory: "ZHG",
      platform: "境外新闻站",
      riskLevel: "高风险",
      count: 19,
      highRiskCount: 8,
      owner: "专题专班",
      updateTime: "2026-04-16 20:30",
      status: "启用",
      description: "对多源情报指向同一涉边议题的事件进行统一管理。",
    },
    {
      id: "cat-004",
      name: "海外论坛误导信息分类",
      type: "专题",
      organizationCategory: "XSD",
      platform: "论坛",
      riskLevel: "低风险",
      count: 16,
      highRiskCount: 1,
      owner: "核验中心",
      updateTime: "2026-04-15 16:12",
      status: "停用",
      description: "已完成信息核验，后续以低频监测和归档复核为主。",
    },
  ];

  readStoredCategories().forEach((item) => {
    if (!categoryList.some((category) => category.id === item.id)) categoryList.unshift(item);
  });

  const categoryIntelligenceMap = {
    "cat-001": [
      {
        id: "intel-001",
        title: "东南亚社交平台涉华议题集中升温",
        summary: "近24小时多平台出现集中转发，相关讨论热度持续升高。",
        organizationCategory: "FLG",
        riskLevel: "高风险",
        sourcePlatform: "X / Facebook / Telegram",
        collectTime: "2026-04-17 09:20",
        collectSource: "规则收录",
        status: "已收录",
      },
      {
        id: "intel-002",
        title: "境外账号发布涉华剪辑内容并快速传播",
        summary: "内容被多个账号二次剪辑，需要补充源头研判与传播路径核验。",
        organizationCategory: "FLG",
        riskLevel: "中风险",
        sourcePlatform: "Facebook / YouTube",
        collectTime: "2026-04-17 08:35",
        collectSource: "人工收录",
        status: "待核验",
      },
      {
        id: "intel-006",
        title: "涉华标签在境外平台短时进入讨论榜单",
        summary: "多个语种账号围绕同一标签扩散，需持续观察二次传播情况。",
        organizationCategory: "其他",
        riskLevel: "高风险",
        sourcePlatform: "X / 新闻网站",
        collectTime: "2026-04-17 07:50",
        collectSource: "专题转入",
        status: "已推送",
      },
    ],
    "cat-002": [
      {
        id: "intel-003",
        title: "重点账号异常增粉并密集发布相关内容",
        summary: "账号关联链路和内容指向性仍在补充，存在短时协同扩散特征。",
        organizationCategory: "QNS",
        riskLevel: "中风险",
        sourcePlatform: "Telegram",
        collectTime: "2026-04-17 08:45",
        collectSource: "规则收录",
        status: "已收录",
      },
      {
        id: "intel-007",
        title: "同源素材在多个频道重复出现",
        summary: "频道间发布时间接近，素材水印和话术模板存在明显相似性。",
        organizationCategory: "QNS",
        riskLevel: "低风险",
        sourcePlatform: "Telegram / 论坛",
        collectTime: "2026-04-16 22:10",
        collectSource: "人工收录",
        status: "待核验",
      },
    ],
    "cat-003": [
      {
        id: "intel-004",
        title: "境外媒体集中报道涉边事件动态",
        summary: "多条情报指向同一涉边议题，已形成事件记录并进入跟踪。",
        organizationCategory: "ZHG",
        riskLevel: "高风险",
        sourcePlatform: "境外新闻站 / YouTube",
        collectTime: "2026-04-16 20:30",
        collectSource: "专题转入",
        status: "已收录",
      },
      {
        id: "intel-008",
        title: "涉边议题评论区出现组织化引导迹象",
        summary: "评论账号活跃时间高度集中，需结合账号画像进一步核验。",
        organizationCategory: "ZHG",
        riskLevel: "高风险",
        sourcePlatform: "Facebook / X",
        collectTime: "2026-04-16 18:40",
        collectSource: "规则收录",
        status: "已推送",
      },
    ],
    "cat-004": [
      {
        id: "intel-005",
        title: "海外社媒出现区域性误导信息传播",
        summary: "已完成澄清内容跟踪，转入低频监测与归档复核。",
        organizationCategory: "XSD",
        riskLevel: "低风险",
        sourcePlatform: "论坛",
        collectTime: "2026-04-15 16:12",
        collectSource: "人工收录",
        status: "已收录",
      },
    ],
  };

  readStoredCategories().forEach((item) => {
    if (!categoryIntelligenceMap[item.id]) categoryIntelligenceMap[item.id] = [];
  });

  const categories = categoryList;
  const intelligence = Object.entries(categoryIntelligenceMap).flatMap(([categoryId, records]) =>
    records.map((item) => ({
      ...item,
      categoryId,
      source: item.sourcePlatform,
      risk: item.riskLevel,
      time: item.collectTime,
    })),
  );

  const initialPushRecords = [
    {
      id: "push-001",
      title: "境外涉华舆情事件",
      categoryId: "cat-001",
      intelligenceId: "intel-001",
      eventId: "event-001",
      riskLevel: "高风险",
      sourcePlatform: "X",
      pushType: "事件推送",
      pushMethod: "站内推送",
      pushTarget: ["张明"],
      status: "已推送",
      feedbackStatus: "待反馈",
      createTime: "2026-04-17 10:00",
      updateTime: "2026-04-17 10:10",
      remark: "已推送至专题专班，等待业务反馈。",
    },
    {
      id: "push-002",
      title: "重点账号异常活跃情报",
      categoryId: "cat-002",
      intelligenceId: "intel-003",
      eventId: "event-002",
      riskLevel: "中风险",
      sourcePlatform: "Telegram",
      pushType: "分类推送",
      pushMethod: "站内推送",
      pushTarget: ["李娜"],
      status: "已推送",
      feedbackStatus: "已反馈",
      createTime: "2026-04-17 09:30",
      updateTime: "2026-04-17 10:05",
      remark: "已纳入账号关联补充核验。",
    },
  ];

  function html(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
  }

  function riskClass(value) {
    if (value === "高风险") return "high";
    if (value === "中风险") return "mid";
    return "low";
  }

  function statusClass(value) {
    if (["启用", "已反馈", "已收录", "已处置", "已推送"].includes(value)) return "enabled";
    if (["待反馈", "待核验"].includes(value)) return "pending";
    return "disabled";
  }

  function getCategory(id) {
    return categories.find((item) => item.id === id) || categories[0];
  }

  function readStoredCategories() {
    try {
      const parsed = JSON.parse(localStorage.getItem(categoryStorageKey) || "[]");
      return Array.isArray(parsed) ? parsed.map((item) => ({ ...item, type: "专题" })) : [];
    } catch (error) {
      return [];
    }
  }

  function writeStoredCategory(category) {
    const stored = readStoredCategories();
    stored.unshift(category);
    localStorage.setItem(categoryStorageKey, JSON.stringify(stored));
  }

  function removeStoredCategory(id) {
    const stored = readStoredCategories().filter((item) => item.id !== id);
    localStorage.setItem(categoryStorageKey, JSON.stringify(stored));
  }

  function readStoredPushRecords() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeStoredPushRecord(record) {
    const stored = readStoredPushRecords();
    stored.unshift(record);
    localStorage.setItem(storageKey, JSON.stringify(stored));
  }

  function getPushRecords() {
    const stored = readStoredPushRecords();
    const ids = new Set(stored.map((item) => item.id));
    return [...stored, ...initialPushRecords.filter((item) => !ids.has(item.id))];
  }

  function nav() {
    const items = [
      ["index", "专题分类", "index.html", "专"],
      ["create", "新建分类", "create.html", "建"],
      ["push-record", "推送记录", "push-record.html", "记"],
      ["feedback", "推送反馈", "feedback.html", "馈"],
    ];
    return items.map(([key, title, url, icon]) => `<a class="${page === key ? "active" : ""}" href="${url}"><i>${icon}</i>${title}</a>`).join("");
  }

  function layout(title, subtitle, body) {
    app.innerHTML = `
      <div class="bp-shell">
        <aside class="bp-sidebar">
          <div class="bp-brand"><strong>业务推送</strong><span>情报-专题分类-收录-推送-反馈</span></div>
          <nav class="bp-nav">${nav()}</nav>
        </aside>
        <main class="bp-main">
          <header class="bp-topbar">
            <div class="bp-crumb">工作台 / 情报追踪 / 业务推送 / ${html(title)}</div>
            <div class="bp-user"><span class="bp-avatar">管</span><span>管理员</span></div>
          </header>
          <div class="bp-content">
            <section class="bp-page-head">
              <div><h1>${html(title)}</h1><p>${html(subtitle)}</p></div>
              <div class="bp-head-actions">${page === "index" ? '<a class="bp-btn primary" href="create.html">新建专题分类</a>' : '<a class="bp-btn" href="index.html">返回分类首页</a>'}</div>
            </section>
            ${body}
          </div>
        </main>
      </div>
    `;
  }

  function renderStats() {
    const records = getPushRecords();
    return `
      <section class="bp-stats">
        <div class="bp-card bp-stat"><span>专题分类</span><strong id="statCategoryCount">${categories.length}</strong></div>
        <div class="bp-card bp-stat"><span>收录情报</span><strong id="statIntelCount">${categories.reduce((sum, item) => sum + item.count, 0)}</strong></div>
        <div class="bp-card bp-stat"><span>高风险数量</span><strong>${categories.reduce((sum, item) => sum + item.highRiskCount, 0)}</strong></div>
        <div class="bp-card bp-stat"><span>推送记录</span><strong>${records.length}</strong></div>
      </section>
    `;
  }

  function categoryRows(items) {
    return items
      .map(
        (item) => `
          <article class="bp-category-item" data-category-id="${item.id}" tabindex="0">
            <div class="bp-category-item-main">
              <h3>${html(item.name)}</h3>
              <div class="bp-category-meta"><span>${html(item.type)}</span><span class="bp-tag ${riskClass(item.riskLevel)}">${html(item.riskLevel)}</span><span class="bp-tag ${statusClass(item.status)}">${html(item.status)}</span></div>
              <p>收录 ${item.count} 条</p>
              <small>更新时间：${html(item.updateTime)}</small>
            </div>
            <div class="bp-category-item-actions">
              <button class="bp-btn text" type="button" data-toggle-category="${item.id}">${item.status === "启用" ? "停用" : "启用"}</button>
              <button class="bp-btn text danger" type="button" data-delete-category="${item.id}">删除</button>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function intelligenceRows(items, category) {
    if (!items.length) {
      return `
        <tr>
          <td colspan="8">
            <div class="bp-empty">当前分类暂无收录情报，可通过规则收录或人工收录方式添加。</div>
          </td>
        </tr>
      `;
    }
    return items
      .map(
        (item) => `
          <tr>
            <td class="bp-title-cell"><strong>${html(item.title)}</strong><span>${html(item.summary)}</span></td>
            <td>${html(item.organizationCategory)}</td>
            <td><span class="bp-tag ${riskClass(item.riskLevel)}">${html(item.riskLevel)}</span></td>
            <td>${html(item.sourcePlatform)}</td>
            <td>${html(item.collectTime)}</td>
            <td>${html(item.collectSource)}</td>
            <td><span class="bp-tag ${statusClass(item.status)}">${html(item.status)}</span></td>
            <td><div class="bp-table-actions"><button class="bp-btn text" type="button">查看</button><button class="bp-btn text" data-index-push="${item.id}" type="button" ${category.status === "停用" ? "disabled" : ""}>推送</button><button class="bp-btn text danger" data-remove-intel="${item.id}" type="button">移出</button></div></td>
          </tr>
        `,
      )
      .join("");
  }

  function renderIndex() {
    let filteredItems = [...categories];
    let selectedCategoryId = categories[0]?.id || "";

    layout(
      "分类列表",
      "统一管理专题分类，支持情报自动/手动收录以及分类级、事件级推送。",
      `
        <section class="bp-query">
          <div class="bp-query-grid">
            <div class="bp-field"><label>分类名称</label><input id="qName" placeholder="请输入分类名称" /></div>
            <div class="bp-field"><label>组织类别</label><select id="qOrg"><option value="">全部类别</option><option>FLG</option><option>QNS</option><option>ZHG</option><option>XSD</option><option>DLM</option><option>其他</option></select></div>
            <div class="bp-field"><label>平台</label><select id="qPlatform"><option value="">全部平台</option><option>X</option><option>Facebook</option><option>Telegram</option><option>论坛</option><option>境外新闻站</option></select></div>
            <div class="bp-field"><label>风险等级</label><select id="qRisk"><option value="">全部等级</option><option>高风险</option><option>中风险</option><option>低风险</option></select></div>
            <div class="bp-actions"><button class="bp-btn primary" id="queryBtn" type="button">查询</button><button class="bp-btn" id="resetBtn" type="button">重置</button></div>
          </div>
        </section>
        <section class="bp-split">
          <aside class="bp-panel bp-category-pane">
            <div class="bp-panel-head">
              <div><h2 class="bp-panel-title">分类列表</h2><p class="bp-panel-desc">点击分类查看收录情报。</p></div>
              <span class="bp-tag blue" id="categoryCount"></span>
            </div>
            <div class="bp-category-list" id="categoryRows"></div>
          </aside>
          <section class="bp-panel bp-intel-pane">
            <div id="categoryIntelPanel"></div>
          </section>
        </section>
        ${pushModal()}
      `,
    );

    const updateStats = () => {
      const statCategoryCount = document.getElementById("statCategoryCount");
      const statIntelCount = document.getElementById("statIntelCount");
      if (statCategoryCount) statCategoryCount.textContent = categories.length;
      if (statIntelCount) statIntelCount.textContent = categories.reduce((sum, item) => sum + item.count, 0);
    };

    const getFilteredItems = () => {
      const name = document.getElementById("qName").value.trim().toLowerCase();
      const org = document.getElementById("qOrg").value;
      const platform = document.getElementById("qPlatform").value;
      const risk = document.getElementById("qRisk").value;
      return categories.filter((item) => (!name || item.name.toLowerCase().includes(name)) && (!org || item.organizationCategory === org) && (!platform || item.platform === platform) && (!risk || item.riskLevel === risk));
    };

    const renderCategoryList = () => {
      document.getElementById("categoryCount").textContent = `已展示 ${filteredItems.length} 个分类`;
      document.getElementById("categoryRows").innerHTML = filteredItems.length ? categoryRows(filteredItems) : '<div class="bp-empty">暂无符合条件的分类</div>';
      document.querySelectorAll(".bp-category-item").forEach((item) => item.classList.toggle("active", item.dataset.categoryId === selectedCategoryId));
    };

    const renderCategoryIntel = () => {
      const category = categories.find((item) => item.id === selectedCategoryId);
      const panel = document.getElementById("categoryIntelPanel");
      if (!category) {
        panel.innerHTML = '<div class="bp-empty large">请选择左侧分类查看收录情报。</div>';
        return;
      }
      const records = categoryIntelligenceMap[category.id] || [];
      const batchDisabled = category.status === "停用";
      panel.innerHTML = `
        <div class="bp-panel-head">
          <div><h2 class="bp-panel-title">${html(category.name)}</h2></div>
          <div class="bp-actions"><button class="bp-btn primary" data-index-push="batch" type="button" ${batchDisabled ? "disabled" : ""}>批量推送</button><button class="bp-btn" type="button">导出</button></div>
        </div>
        <div class="bp-summary-strip">
          <span>分类类型：<strong>${html(category.type)}</strong></span>
          <span>风险等级：<strong class="${riskClass(category.riskLevel)}">${html(category.riskLevel)}</strong></span>
          <span>收录数量：<strong>${category.count}</strong></span>
          <span>高风险数量：<strong>${category.highRiskCount}</strong></span>
          <span>负责人：<strong>${html(category.owner)}</strong></span>
          <span>更新时间：<strong>${html(category.updateTime)}</strong></span>
          <span>状态：<strong>${html(category.status)}</strong></span>
        </div>
        <div class="bp-table-wrap"><table class="bp-table bp-intel-table"><thead><tr><th>情报标题</th><th>组织类别</th><th>风险等级</th><th>来源平台 / 渠道</th><th>收录时间</th><th>收录来源</th><th>状态</th><th>操作</th></tr></thead><tbody>${intelligenceRows(records, category)}</tbody></table></div>
      `;
    };

    const render = () => {
      filteredItems = getFilteredItems();
      if (!filteredItems.some((item) => item.id === selectedCategoryId)) {
        selectedCategoryId = filteredItems[0]?.id || "";
      }
      updateStats();
      renderCategoryList();
      renderCategoryIntel();
    };

    document.getElementById("queryBtn").addEventListener("click", render);
    document.getElementById("resetBtn").addEventListener("click", () => {
      ["qName", "qOrg", "qPlatform", "qRisk"].forEach((id) => (document.getElementById(id).value = ""));
      render();
    });
    document.getElementById("categoryRows").addEventListener("click", (event) => {
      const deleteButton = event.target.closest("[data-delete-category]");
      if (deleteButton) {
        const id = deleteButton.dataset.deleteCategory;
        const category = categories.find((item) => item.id === id);
        if (!category || !window.confirm(`确认删除“${category.name}”吗？删除后该分类及其收录情报将不再展示。`)) return;
        const currentIndex = filteredItems.findIndex((item) => item.id === id);
        const dataIndex = categories.findIndex((item) => item.id === id);
        if (dataIndex >= 0) categories.splice(dataIndex, 1);
        delete categoryIntelligenceMap[id];
        removeStoredCategory(id);
        filteredItems = getFilteredItems();
        if (selectedCategoryId === id) {
          selectedCategoryId = filteredItems[currentIndex]?.id || filteredItems[currentIndex - 1]?.id || filteredItems[0]?.id || "";
        }
        render();
        alert("分类已删除");
        return;
      }

      const toggleButton = event.target.closest("[data-toggle-category]");
      if (toggleButton) {
        const category = getCategory(toggleButton.dataset.toggleCategory);
        if (category.status === "启用" && !window.confirm(`确认停用“${category.name}”吗？停用后仍可查看，但批量推送将不可用。`)) return;
        category.status = category.status === "启用" ? "停用" : "启用";
        render();
        alert(category.status === "停用" ? "分类已停用" : "分类已启用");
        return;
      }

      const item = event.target.closest("[data-category-id]");
      if (item) {
        selectedCategoryId = item.dataset.categoryId;
        renderCategoryList();
        renderCategoryIntel();
      }
    });
    document.getElementById("categoryRows").addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const item = event.target.closest("[data-category-id]");
      if (!item) return;
      selectedCategoryId = item.dataset.categoryId;
      renderCategoryList();
      renderCategoryIntel();
    });
    document.getElementById("categoryIntelPanel").addEventListener("click", (event) => {
      const removeButton = event.target.closest("[data-remove-intel]");
      if (removeButton) {
        const category = getCategory(selectedCategoryId);
        const records = categoryIntelligenceMap[category.id] || [];
        const item = records.find((record) => record.id === removeButton.dataset.removeIntel);
        if (!item || !window.confirm(`确认将“${item.title}”移出当前分类吗？`)) return;
        categoryIntelligenceMap[category.id] = records.filter((record) => record.id !== item.id);
        category.count = Math.max(0, category.count - 1);
        if (item.riskLevel === "高风险") category.highRiskCount = Math.max(0, category.highRiskCount - 1);
        renderCategoryList();
        renderCategoryIntel();
        alert("情报已移出当前分类");
        return;
      }

      const pushButton = event.target.closest("[data-index-push]");
      if (!pushButton || pushButton.disabled) return;
      const category = getCategory(selectedCategoryId);
      const id = pushButton.dataset.indexPush;
      const payload =
        id === "batch"
          ? { title: `${category.name}批量情报`, categoryId: category.id, pushType: "分类推送", riskLevel: category.riskLevel, sourcePlatform: category.platform }
          : (() => {
              const item = (categoryIntelligenceMap[category.id] || []).find((record) => record.id === id);
              return { title: item.title, categoryId: category.id, intelligenceId: item.id, pushType: "情报推送", riskLevel: item.riskLevel, sourcePlatform: item.sourcePlatform };
            })();
      document.getElementById("pushModal").dataset.payload = JSON.stringify(payload);
      document.getElementById("pushCategory").value = payload.categoryId;
      document.getElementById("pushUser").value = "";
      document.getElementById("pushDept").value = "系统自动联动";
      document.getElementById("pushMethod").value = "站内推送";
      document.getElementById("pushPriority").value = "中";
      document.getElementById("pushRemark").value = "";
      document.getElementById("pushModalDesc").textContent = `推送内容：${payload.title}`;
      document.getElementById("pushModal").classList.add("open");
    });
    document.querySelectorAll("[data-close-push]").forEach((button) => button.addEventListener("click", () => document.getElementById("pushModal").classList.remove("open")));
    document.getElementById("pushModal").addEventListener("click", (event) => {
      if (event.target.id === "pushModal") event.currentTarget.classList.remove("open");
    });
    document.getElementById("pushUser").addEventListener("change", (event) => {
      const option = event.target.selectedOptions[0];
      document.getElementById("pushDept").value = option?.dataset.dept || "系统自动联动";
    });
    document.getElementById("confirmPushBtn").addEventListener("click", () => {
      const payload = JSON.parse(document.getElementById("pushModal").dataset.payload || "{}");
      const categoryId = document.getElementById("pushCategory").value;
      const pushUser = document.getElementById("pushUser").value;
      const pushRemark = document.getElementById("pushRemark").value.trim();
      if (!pushUser) {
        alert("请选择接收用户");
        return;
      }
      if (!pushRemark) {
        alert("请输入推送说明");
        return;
      }
      const record = {
        id: `push-${Date.now()}`,
        title: payload.title || "业务推送任务",
        categoryId,
        intelligenceId: payload.intelligenceId || "",
        eventId: "",
        riskLevel: payload.riskLevel || getCategory(categoryId).riskLevel,
        sourcePlatform: payload.sourcePlatform || getCategory(categoryId).platform,
        pushType: payload.pushType || "情报推送",
        pushMethod: document.getElementById("pushMethod").value,
        pushTarget: [pushUser],
        pushPriority: document.getElementById("pushPriority").value,
        status: "已推送",
        feedbackStatus: "待反馈",
        createTime: "2026-04-17 11:30",
        updateTime: "2026-04-17 11:30",
        remark: pushRemark,
      };
      writeStoredPushRecord(record);
      document.getElementById("pushModal").classList.remove("open");
      alert("已生成业务推送记录");
    });
    render();
  }

  function renderCreate() {
    layout(
      "新建专题分类",
      "创建专题分类并配置收录规则与推送规则，形成可追溯的业务推送闭环。",
      `
        <form class="bp-form" id="categoryForm">
          <section class="bp-card bp-form-section">
            <h2 class="bp-section-title">基础信息</h2>
            <div class="bp-form-grid">
              <div class="bp-field"><label>分类名称</label><input id="categoryName" placeholder="请输入专题分类名称" /></div>
              <div class="bp-field"><label>分类类型</label><select id="categoryType"><option>专题</option></select></div>
              <div class="bp-field"><label>风险等级</label><select id="categoryRisk"><option>高风险</option><option>中风险</option><option>低风险</option></select></div>
              <div class="bp-field"><label>负责人</label><input id="categoryOwner" placeholder="请输入负责人或小组" /></div>
              <div class="bp-field full"><label>描述</label><textarea id="categoryDesc" placeholder="请输入分类说明"></textarea></div>
            </div>
          </section>
          <section class="bp-card bp-form-section">
            <h2 class="bp-section-title">收录规则</h2>
            <div class="bp-form-grid">
              <div class="bp-field"><label>关键词</label><input placeholder="多个关键词以逗号分隔" /></div>
              <div class="bp-field"><label>人物/组织</label><input placeholder="请输入人物或组织" /></div>
              <div class="bp-field"><label>平台</label><select id="categoryPlatform"><option>X</option><option>Facebook</option><option>Telegram</option><option>论坛</option><option>境外新闻站</option></select></div>
              <div class="bp-field"><label>标签</label><input placeholder="涉华、涉边、账号异常" /></div>
            </div>
          </section>
          <section class="bp-card bp-form-section">
            <h2 class="bp-section-title">推送规则</h2>
            <div class="bp-form-grid">
              <div class="bp-field"><label>推送对象</label><select id="categoryPushTarget"><option>研判一组</option><option>情报二组</option><option>专题专班</option><option>核验中心</option><option>指挥调度岗</option></select></div>
              <div class="bp-field"><label>推送方式</label><select id="categoryPushMethod"><option>站内推送</option></select></div>
              <div class="bp-field"><label>推送频率</label><select><option>实时</option><option>每日汇总</option><option>条件触发</option></select></div>
              <div class="bp-field"><label>状态</label><select id="categoryStatus"><option>启用</option><option>停用</option></select></div>
            </div>
          </section>
          <div class="bp-form-actions"><a class="bp-btn" href="index.html">取消</a><button class="bp-btn ghost" type="submit">保存</button><button class="bp-btn primary" id="saveEnableBtn" type="button">保存并启用</button></div>
        </form>
      `,
    );
    const save = (enabled) => {
      const name = document.getElementById("categoryName").value.trim();
      if (!name) {
        alert("请输入分类名称");
        return;
      }
      const now = new Date();
      const updateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      writeStoredCategory({
        id: `cat-${Date.now()}`,
        name,
        type: "专题",
        riskLevel: document.getElementById("categoryRisk").value,
        organizationCategory: "其他",
        platform: document.getElementById("categoryPlatform").value,
        count: 0,
        highRiskCount: 0,
        owner: document.getElementById("categoryOwner").value.trim() || "未指定",
        updateTime,
        status: enabled ? "启用" : document.getElementById("categoryStatus").value,
        description: document.getElementById("categoryDesc").value.trim() || "暂无分类说明。",
      });
      alert(enabled ? "已保存并启用专题分类" : "已保存专题分类");
      window.location.href = "index.html";
    };
    document.getElementById("categoryForm").addEventListener("submit", (event) => {
      event.preventDefault();
      save(false);
    });
    document.getElementById("saveEnableBtn").addEventListener("click", () => save(true));
  }

  function pushModal() {
    return `
      <div class="bp-modal" id="pushModal">
        <div class="bp-modal-card bp-push-modal-card">
          <div class="bp-modal-head"><div><h3>推送用户</h3><p id="pushModalDesc">选择接收用户与推送要求，生成可追溯推送记录。</p></div><button class="bp-modal-close" type="button" data-close-push>×</button></div>
          <div class="bp-modal-body">
            <div class="bp-form-grid">
              <select class="bp-hidden-field" id="pushCategory">${categories.map((item) => `<option value="${item.id}">${html(item.name)}</option>`).join("")}</select>
              <div class="bp-field"><label>接收用户<span class="bp-required">*</span></label><select id="pushUser"><option value="">请选择接收用户</option>${pushUsers.map((item) => `<option value="${html(item.name)}" data-dept="${html(item.dept)}">${html(item.name)}</option>`).join("")}</select></div>
              <div class="bp-field"><label>接收部门</label><input id="pushDept" value="系统自动联动" disabled /></div>
              <div class="bp-field"><label>推送方式<span class="bp-required">*</span></label><select id="pushMethod"><option>站内推送</option></select></div>
              <div class="bp-field"><label>推送优先级</label><select id="pushPriority"><option>中</option><option>高</option><option>低</option></select></div>
              <div class="bp-field full"><label>推送说明<span class="bp-required">*</span></label><textarea id="pushRemark" placeholder="请输入本次推送原因或办理要求"></textarea></div>
            </div>
            <div class="bp-modal-actions"><button class="bp-btn" type="button" data-close-push>取消</button><button class="bp-btn primary" id="confirmPushBtn" type="button">确认推送</button></div>
          </div>
        </div>
      </div>
    `;
  }

  function bindPushModal(getPayload) {
    document.querySelectorAll("[data-open-push]").forEach((button) => {
      button.addEventListener("click", () => {
        const payload = getPayload(button.dataset.openPush);
        document.getElementById("pushModal").dataset.payload = JSON.stringify(payload);
        document.getElementById("pushCategory").value = payload.categoryId || categories[0].id;
        document.getElementById("pushUser").value = "";
        document.getElementById("pushDept").value = "系统自动联动";
        document.getElementById("pushMethod").value = "站内推送";
        document.getElementById("pushPriority").value = "中";
        document.getElementById("pushRemark").value = "";
        document.getElementById("pushModalDesc").textContent = `推送内容：${payload.title}`;
        document.getElementById("pushModal").classList.add("open");
      });
    });
    document.querySelectorAll("[data-close-push]").forEach((button) => button.addEventListener("click", () => document.getElementById("pushModal").classList.remove("open")));
    document.getElementById("pushModal").addEventListener("click", (event) => {
      if (event.target.id === "pushModal") event.currentTarget.classList.remove("open");
    });
    document.getElementById("pushUser").addEventListener("change", (event) => {
      const option = event.target.selectedOptions[0];
      document.getElementById("pushDept").value = option?.dataset.dept || "系统自动联动";
    });
    document.getElementById("confirmPushBtn").addEventListener("click", () => {
      const payload = JSON.parse(document.getElementById("pushModal").dataset.payload || "{}");
      const categoryId = document.getElementById("pushCategory").value;
      const pushUser = document.getElementById("pushUser").value;
      const pushRemark = document.getElementById("pushRemark").value.trim();
      if (!pushUser) {
        alert("请选择接收用户");
        return;
      }
      if (!pushRemark) {
        alert("请输入推送说明");
        return;
      }
      const record = {
        id: `push-${Date.now()}`,
        title: payload.title || "业务推送任务",
        categoryId,
        intelligenceId: payload.intelligenceId || "",
        eventId: payload.eventId || "",
        riskLevel: payload.riskLevel || getCategory(categoryId).riskLevel,
        sourcePlatform: payload.sourcePlatform || getCategory(categoryId).platform,
        pushType: payload.pushType || "情报推送",
        pushMethod: document.getElementById("pushMethod").value,
        pushTarget: [pushUser],
        pushPriority: document.getElementById("pushPriority").value,
        status: "已推送",
        feedbackStatus: "待反馈",
        createTime: "2026-04-17 11:30",
        updateTime: "2026-04-17 11:30",
        remark: pushRemark,
      };
      writeStoredPushRecord(record);
      document.getElementById("pushModal").classList.remove("open");
      alert("已生成业务推送记录");
    });
  }

  function renderDetail() {
    const params = new URLSearchParams(window.location.search);
    const category = getCategory(params.get("id") || "cat-001");
    layout(
      "分类详情",
      "查看专题分类下的收录情报、推送记录与规则配置，支持批量推送和单条推送。",
      `
        <section class="bp-detail-summary">
          <div class="bp-card bp-stat"><span>分类名称</span><strong>${html(category.name)}</strong></div>
          <div class="bp-card bp-stat"><span>风险等级</span><strong>${html(category.riskLevel)}</strong></div>
          <div class="bp-card bp-stat"><span>收录数量</span><strong>${category.count}</strong></div>
          <div class="bp-card bp-stat"><span>推送次数</span><strong>${getPushRecords().filter((item) => item.categoryId === category.id).length}</strong></div>
          <div class="bp-card bp-stat"><span>最近更新时间</span><strong>${html(category.updateTime)}</strong></div>
        </section>
        <section class="bp-panel">
          <div class="bp-panel-head"><div><h2 class="bp-panel-title">${html(category.name)}</h2><p class="bp-panel-desc">${html(category.description)}</p></div><div class="bp-actions"><button class="bp-btn primary" data-open-push="batch" type="button">批量推送</button></div></div>
          <div class="bp-tabs"><button class="bp-tab active" data-tab="intel" type="button">收录情报</button><button class="bp-tab" data-tab="records" type="button">推送记录</button><button class="bp-tab" data-tab="rules" type="button">规则配置</button></div>
          <div id="detailTabPanel"></div>
        </section>
        ${pushModal()}
      `,
    );

    const renderTab = (tab) => {
      const panel = document.getElementById("detailTabPanel");
      if (tab === "records") {
        const records = getPushRecords().filter((item) => item.categoryId === category.id);
        panel.innerHTML = `<div class="bp-table-wrap"><table class="bp-table"><thead><tr><th>推送标题</th><th>推送类型</th><th>方式</th><th>对象</th><th>状态</th><th>反馈</th><th>创建时间</th></tr></thead><tbody>${pushRecordRows(records)}</tbody></table></div>`;
        return;
      }
      if (tab === "rules") {
        panel.innerHTML = `
          <div class="bp-rule-grid">
            <div class="bp-rule-box"><h3>收录规则</h3><p>关键词：涉华、境外传播、账号异常</p><p>人物/组织：${html(category.organizationCategory)}</p><p>平台：${html(category.platform)}</p><p>自动收录：启用</p></div>
            <div class="bp-rule-box"><h3>推送规则</h3><p>推送对象：${html(category.owner)}、专题专班</p><p>推送方式：站内推送</p><p>推送频率：实时</p></div>
          </div>
        `;
        return;
      }
      const rows = intelligence
        .filter((item) => item.categoryId === category.id)
        .map(
          (item) => `
            <tr>
              <td class="bp-title-cell"><strong>${html(item.title)}</strong><span>${html(item.summary)}</span></td>
              <td>${html(item.source)}</td>
              <td><span class="bp-tag ${riskClass(item.risk)}">${html(item.risk)}</span></td>
              <td>${html(item.time)}</td>
              <td><span class="bp-tag ${statusClass(item.status)}">${html(item.status)}</span></td>
              <td><div class="bp-table-actions"><button class="bp-btn text" type="button">查看</button><button class="bp-btn text danger" type="button" onclick="return window.confirm('确认将该情报移出当前分类吗？')">移出分类</button><button class="bp-btn text" data-open-push="${item.id}" type="button">推送</button></div></td>
            </tr>
          `,
        )
        .join("");
      panel.innerHTML = `<div class="bp-table-wrap"><table class="bp-table"><thead><tr><th>情报标题</th><th>来源</th><th>风险</th><th>时间</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows}</tbody></table></div>`;
      bindPushModal((id) => {
        if (id === "batch") return { title: `${category.name}批量情报`, categoryId: category.id, pushType: "分类推送", riskLevel: category.riskLevel, sourcePlatform: category.platform };
        const item = intelligence.find((record) => record.id === id);
        return { title: item.title, categoryId: category.id, intelligenceId: item.id, pushType: "情报推送", riskLevel: item.risk, sourcePlatform: item.source };
      });
    };

    document.querySelectorAll("[data-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-tab]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        renderTab(button.dataset.tab);
      });
    });
    renderTab("intel");
  }

  function pushRecordRows(records) {
    if (!records.length) return `<tr><td colspan="7">暂无推送记录</td></tr>`;
    return records
      .map(
        (item) => `
          <tr>
            <td class="bp-title-cell"><strong>${html(item.title)}</strong><span>${html(getCategory(item.categoryId).name)}</span></td>
            <td><span class="bp-tag blue">${html(item.pushType)}</span></td>
            <td>${html(item.pushMethod)}</td>
            <td>${html((item.pushTarget || []).join("、"))}</td>
            <td><span class="bp-tag ${statusClass(item.status)}">${html(item.status)}</span></td>
            <td><span class="bp-tag ${statusClass(item.feedbackStatus)}">${html(item.feedbackStatus)}</span></td>
            <td>${html(item.createTime)}</td>
          </tr>
        `,
      )
      .join("");
  }

  function renderPushRecord() {
    layout(
      "推送记录",
      "记录分类级与事件级推送任务，追溯谁推送、推给谁、推送了什么。",
      `
        <section class="bp-query">
          <div class="bp-query-grid">
            <div class="bp-field"><label>推送标题</label><input id="recordName" placeholder="请输入推送标题" /></div>
            <div class="bp-field"><label>所属分类</label><select id="recordCategory"><option value="">全部分类</option>${categories.map((item) => `<option value="${item.id}">${html(item.name)}</option>`).join("")}</select></div>
            <div class="bp-field"><label>推送方式</label><select id="recordMethod"><option value="">全部方式</option><option>站内推送</option></select></div>
            <div class="bp-field"><label>反馈状态</label><select id="recordFeedback"><option value="">全部状态</option><option>待反馈</option><option>已反馈</option></select></div>
            <div class="bp-actions"><button class="bp-btn primary" id="recordQuery" type="button">查询</button><button class="bp-btn" id="recordReset" type="button">重置</button></div>
          </div>
        </section>
        <section class="bp-panel"><div class="bp-panel-head"><div><h2 class="bp-panel-title">业务推送记录</h2><p class="bp-panel-desc">推送任务生成后统一进入记录中心，后续与反馈状态联动。</p></div><span class="bp-tag blue" id="recordCount"></span></div><div class="bp-table-wrap"><table class="bp-table"><thead><tr><th>推送标题</th><th>推送类型</th><th>方式</th><th>对象</th><th>状态</th><th>反馈</th><th>创建时间</th></tr></thead><tbody id="recordRows"></tbody></table></div></section>
      `,
    );
    const render = () => {
      const keyword = document.getElementById("recordName").value.trim().toLowerCase();
      const categoryId = document.getElementById("recordCategory").value;
      const method = document.getElementById("recordMethod").value;
      const feedback = document.getElementById("recordFeedback").value;
      const records = getPushRecords().filter((item) => (!keyword || item.title.toLowerCase().includes(keyword)) && (!categoryId || item.categoryId === categoryId) && (!method || item.pushMethod === method) && (!feedback || item.feedbackStatus === feedback));
      document.getElementById("recordCount").textContent = `已展示 ${records.length} 条记录`;
      document.getElementById("recordRows").innerHTML = pushRecordRows(records);
    };
    document.getElementById("recordQuery").addEventListener("click", render);
    document.getElementById("recordReset").addEventListener("click", () => {
      ["recordName", "recordCategory", "recordMethod", "recordFeedback"].forEach((id) => (document.getElementById(id).value = ""));
      render();
    });
    render();
  }

  function renderFeedback() {
    const records = getPushRecords();
    layout(
      "推送反馈",
      "跟踪接收对象反馈、处置进展和状态更新，完成业务闭环。",
      `
        <section class="bp-stats">
          <div class="bp-card bp-stat"><span>全部反馈</span><strong>${records.length}</strong></div>
          <div class="bp-card bp-stat"><span>待反馈</span><strong>${records.filter((item) => item.feedbackStatus === "待反馈").length}</strong></div>
          <div class="bp-card bp-stat"><span>已反馈</span><strong>${records.filter((item) => item.feedbackStatus === "已反馈").length}</strong></div>
          <div class="bp-card bp-stat"><span>今日更新</span><strong>${records.filter((item) => item.updateTime.startsWith("2026-04-17")).length}</strong></div>
        </section>
        <section class="bp-panel"><div class="bp-panel-head"><div><h2 class="bp-panel-title">反馈列表</h2><p class="bp-panel-desc">反馈结果回写后同步更新推送状态和处置进度。</p></div></div><div class="bp-table-wrap"><table class="bp-table"><thead><tr><th>推送标题</th><th>接收对象</th><th>反馈状态</th><th>反馈说明</th><th>更新时间</th><th>操作</th></tr></thead><tbody>${records
          .map(
            (item) => `
              <tr>
                <td class="bp-title-cell"><strong>${html(item.title)}</strong><span>${html(getCategory(item.categoryId).name)}</span></td>
                <td>${html((item.pushTarget || []).join("、"))}</td>
                <td><span class="bp-tag ${statusClass(item.feedbackStatus)}">${html(item.feedbackStatus)}</span></td>
                <td>${html(item.remark || "等待接收方反馈处置结果")}</td>
                <td>${html(item.updateTime)}</td>
                <td><div class="bp-table-actions"><button class="bp-btn text" type="button">查看</button><button class="bp-btn text" type="button">更新状态</button></div></td>
              </tr>
            `,
          )
          .join("")}</tbody></table></div></section>
      `,
    );
  }

  if (page === "create") renderCreate();
  if (page === "category-detail") renderDetail();
  if (page === "push-record") renderPushRecord();
  if (page === "feedback") renderFeedback();
  if (page === "index") renderIndex();
})();
