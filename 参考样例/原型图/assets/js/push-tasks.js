(function () {
  const storageKey = "businessPushItems";
  const currentUser = "分析员";

  const seedPushItems = [
    {
      id: "BP-20260624-001",
      title: "比对发现命中重点人员，建议核查",
      relatedObject: "王某某 / 境外人员比对任务",
      sourceModule: "比对发现",
      pushType: "手动推送",
      riskLevel: "高风险",
      pushTime: "2026-06-24 09:32",
      pusher: "赵六",
      receiver: "情报研判组",
      status: "待反馈",
      relatedPerson: "王某某",
      relatedOrg: "--",
      relatedEvent: "境外入境人员疑似命中",
      relatedTopic: "境外人员动态核查",
      compareTask: "境外人员比对任务",
      compareRecordId: "CP-DEMO-001",
      hitType: "人像比对",
      similarity: "92.6%",
      evidence: ["比对截图", "人员照片", "命中记录"],
      description: "在人像比对中发现疑似重点人员命中记录，建议业务部门进一步核查身份信息、活动轨迹及关联关系。",
      feedbackRecords: [],
    },
    {
      id: "BP-20260624-002",
      title: "专题研判形成阶段性风险提示",
      relatedObject: "重点人员活动专题 / 关联事件 36 条",
      sourceModule: "专题研判",
      pushType: "自动推送",
      riskLevel: "中风险",
      pushTime: "2026-06-24 08:40",
      pusher: "系统",
      receiver: "专题处置组",
      status: "已反馈",
      relatedPerson: "重点人员群组",
      relatedOrg: "相关社群组织",
      relatedEvent: "专题风险走势抬升",
      relatedTopic: "重点人员活动专题",
      compareTask: "--",
      hitType: "--",
      similarity: "--",
      evidence: ["专题报告摘要", "事件时间轴"],
      description: "专题研判识别重点人员相关议题讨论升温，已推送业务单位开展持续关注。",
      feedbackRecords: [
        {
          conclusion: "持续关注",
          handler: "李娜",
          time: "2026-06-24 10:15",
          remark: "已纳入本周专题跟踪清单，继续观察重点账号互动变化。",
        },
      ],
    },
    {
      id: "BP-20260623-003",
      title: "综合研判发现异常传播链",
      relatedObject: "网络舆情专题 / 异常账号集群",
      sourceModule: "综合研判",
      pushType: "自动推送",
      riskLevel: "高风险",
      pushTime: "2026-06-23 16:20",
      pusher: "系统",
      receiver: "值班研判组",
      status: "待反馈",
      relatedPerson: "异常账号集群",
      relatedOrg: "--",
      relatedEvent: "跨平台传播链异常",
      relatedTopic: "网络舆情专题",
      compareTask: "--",
      hitType: "--",
      similarity: "--",
      evidence: ["传播链路图", "原始情报"],
      description: "综合分析发现多个账号在短时间内同步转发同类内容，建议核查是否存在组织化传播行为。",
      feedbackRecords: [],
    },
    {
      id: "BP-20260622-004",
      title: "人工推送重点线索补充核查",
      relatedObject: "张某某 / 线索核查任务",
      sourceModule: "人工推送",
      pushType: "手动推送",
      riskLevel: "低风险",
      pushTime: "2026-06-22 11:05",
      pusher: "王明",
      receiver: "一大队",
      status: "已退回",
      relatedPerson: "张某某",
      relatedOrg: "--",
      relatedEvent: "线索信息不完整",
      relatedTopic: "--",
      compareTask: "--",
      hitType: "--",
      similarity: "--",
      evidence: ["线索登记表"],
      description: "人工推送一条待核查线索，接收单位反馈需补充来源材料和对象身份信息。",
      feedbackRecords: [
        {
          conclusion: "退回补充",
          handler: "张三",
          time: "2026-06-22 14:30",
          remark: "材料不足，建议补充原始来源、身份信息和推送依据后重新推送。",
        },
      ],
    },
    {
      id: "BP-20260620-005",
      title: "比对任务命中疑似关联对象",
      relatedObject: "李某某 / 入境记录比对",
      sourceModule: "比对发现",
      pushType: "手动推送",
      riskLevel: "中风险",
      pushTime: "2026-06-20 15:18",
      pusher: "陈晨",
      receiver: "二大队",
      status: "已撤回",
      relatedPerson: "李某某",
      relatedOrg: "--",
      relatedEvent: "入境记录疑似关联",
      relatedTopic: "境外人员管理",
      compareTask: "入境记录比对",
      hitType: "证件比对",
      similarity: "86.4%",
      evidence: ["比对记录"],
      description: "因后续人工复核发现比对条件需调整，推送方已撤回该事项。",
      feedbackRecords: [],
    },
  ];

  let pushItems = loadPushItems();
  let activeFeedbackId = "";

  function loadPushItems() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(stored) && stored.length) return stored;
    } catch (error) {
      // Ignore broken local demo data and fall back to seed records.
    }
    return seedPushItems.slice();
  }

  function savePushItems() {
    localStorage.setItem(storageKey, JSON.stringify(pushItems));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function nowText() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }

  function dateOnly(value) {
    return String(value || "").slice(0, 10);
  }

  function statusClass(status) {
    if (status === "已反馈") return "status-done";
    if (status === "已退回") return "status-returned";
    if (status === "已撤回") return "status-withdrawn";
    return "status-pending";
  }

  function riskClass(risk) {
    if (risk === "高风险") return "risk-high";
    if (risk === "中风险") return "risk-medium";
    return "risk-low";
  }

  function sourceClass(source) {
    if (source === "比对发现") return "source-compare";
    if (source === "专题研判") return "source-topic";
    if (source === "综合研判") return "source-judgement";
    return "source-manual";
  }

  function typeClass(type) {
    return type === "自动推送" ? "type-auto" : "type-manual";
  }

  function renderTag(text, cls) {
    return `<span class="push-tag ${cls}">${escapeHtml(text)}</span>`;
  }

  function inRange(item, range) {
    if (!range || range === "自定义") return true;
    const itemDate = new Date(`${dateOnly(item.pushTime)}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - itemDate) / 86400000);
    if (range === "今日") return diffDays === 0;
    if (range === "近7日") return diffDays >= 0 && diffDays <= 7;
    if (range === "近30日") return diffDays >= 0 && diffDays <= 30;
    return true;
  }

  function getFilteredItems() {
    const source = document.getElementById("sourceFilter")?.value || "";
    const type = document.getElementById("typeFilter")?.value || "";
    const status = document.getElementById("statusFilter")?.value || "";
    const risk = document.getElementById("riskFilter")?.value || "";
    const range = document.getElementById("rangeFilter")?.value || "";
    const keyword = (document.getElementById("keywordFilter")?.value || "").trim().toLowerCase();
    return pushItems.filter((item) => {
      const haystack = [
        item.title,
        item.relatedObject,
        item.relatedPerson,
        item.relatedOrg,
        item.relatedEvent,
        item.relatedTopic,
        item.compareTask,
        item.receiver,
      ].join(" ").toLowerCase();
      return (!source || item.sourceModule === source)
        && (!type || item.pushType === type)
        && (!status || item.status === status)
        && (!risk || item.riskLevel === risk)
        && inRange(item, range)
        && (!keyword || haystack.includes(keyword));
    });
  }

  function statValue(type) {
    if (type === "today") return pushItems.filter((item) => dateOnly(item.pushTime) === dateOnly(nowText())).length;
    if (type === "pending") return pushItems.filter((item) => item.status === "待反馈").length;
    if (type === "compare") return pushItems.filter((item) => item.sourceModule === "比对发现").length;
    return pushItems.filter((item) => item.status === "已反馈").length;
  }

  function actionButtons(item) {
    const detail = `<button class="push-link-btn" type="button" data-action="detail" data-id="${escapeHtml(item.id)}">查看详情</button>`;
    if (item.status === "待反馈") {
      return `${detail}<button class="push-link-btn" type="button" data-action="feedback" data-id="${escapeHtml(item.id)}">反馈</button><button class="push-link-btn danger" type="button" data-action="withdraw" data-id="${escapeHtml(item.id)}">撤回</button>`;
    }
    if (item.status === "已反馈") {
      return `${detail}<button class="push-link-btn" type="button" data-action="record" data-id="${escapeHtml(item.id)}">处理记录</button>`;
    }
    if (item.status === "已退回") {
      return `${detail}<button class="push-link-btn" type="button" data-action="resend" data-id="${escapeHtml(item.id)}">重新推送</button>`;
    }
    return detail;
  }

  function renderTableRows() {
    const rows = getFilteredItems();
    if (!rows.length) {
      return `<tr><td colspan="8" class="push-empty-cell">当前筛选条件下暂无推送事项</td></tr>`;
    }
    return rows.map((item) => `
      <tr>
        <td class="push-title-cell">${escapeHtml(item.title)}</td>
        <td>${escapeHtml(item.relatedObject)}</td>
        <td>${renderTag(item.sourceModule, sourceClass(item.sourceModule))}</td>
        <td>${escapeHtml(item.pushTime)}</td>
        <td>${renderTag(item.pushType, typeClass(item.pushType))}</td>
        <td>${renderTag(item.riskLevel, riskClass(item.riskLevel))}</td>
        <td>${renderTag(item.status, statusClass(item.status))}</td>
        <td><span class="push-actions">${actionButtons(item)}</span></td>
      </tr>
    `).join("");
  }

  function renderPage() {
    const pageContent = document.getElementById("pageContent");
    if (!pageContent) return;

    const breadcrumb = document.querySelector(".topbar-breadcrumb");
    if (breadcrumb) breadcrumb.innerHTML = '<span>工作台</span><i>/</i><span class="current">业务推送</span>';

    pageContent.innerHTML = `
      <div class="push-page">
        <section class="page-header">
          <div>
            <h1>业务推送</h1>
            <p>汇聚比对发现、专题研判和综合分析产生的推送事项，支持统一查看、反馈处理和闭环跟踪。</p>
          </div>
        </section>

        <section class="push-stat-grid" aria-label="业务推送数据概览">
          ${statCard("↗", "orange", "今日新增推送", statValue("today"), "当天新增推送事项")}
          ${statCard("!", "purple", "待反馈事项", statValue("pending"), "业务单位尚未反馈")}
          ${statCard("✓", "green", "已反馈事项", statValue("done"), "已完成反馈处理")}
        </section>

        <section class="push-table-card">
          <div class="push-card-head">
            <h2 class="push-card-title">推送事项列表</h2>
          </div>

          <div class="push-filter-panel">
            ${selectField("sourceFilter", "来源模块", ["", "比对发现", "专题研判", "综合研判", "人工推送"], ["全部", "比对发现", "专题研判", "综合研判", "人工推送"])}
            ${selectField("typeFilter", "推送类型", ["", "自动推送", "手动推送"], ["全部", "自动推送", "手动推送"])}
            ${selectField("statusFilter", "反馈状态", ["", "待反馈", "已反馈", "已退回", "已撤回"], ["全部", "待反馈", "已反馈", "已退回", "已撤回"])}
            ${selectField("riskFilter", "风险等级", ["", "高风险", "中风险", "低风险"], ["全部", "高风险", "中风险", "低风险"])}
            ${selectField("rangeFilter", "时间范围", ["", "今日", "近7日", "近30日", "自定义"], ["全部", "今日", "近7日", "近30日", "自定义"])}
            <label class="push-filter-field push-filter-keyword"><span>关键词</span><input id="keywordFilter" class="control" placeholder="推送标题/关联人员/专题/接收单位" /></label>
            <div class="push-filter-actions">
              <button class="btn primary" id="queryPushItems" type="button">查询</button>
              <button class="btn" id="resetPushFilters" type="button">重置</button>
            </div>
          </div>

          <div class="push-table-wrap">
            <table class="push-table">
              <thead>
                <tr>
                  <th>推送事项</th>
                  <th>关联对象</th>
                  <th>来源模块</th>
                  <th>推送时间</th>
                  <th>推送类型</th>
                  <th>风险等级</th>
                  <th>反馈状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody id="pushTableBody">${renderTableRows()}</tbody>
            </table>
          </div>
        </section>
      </div>

      <div class="push-modal-mask" id="pushDetailModal" aria-hidden="true">
        <div class="push-modal push-detail-modal" role="dialog" aria-modal="true" aria-labelledby="pushDetailTitle">
          <div class="push-modal-head">
            <h3 class="push-modal-title" id="pushDetailTitle">推送事项详情</h3>
            <button class="push-modal-close" type="button" data-close-push-modal>×</button>
          </div>
          <div class="push-modal-body" id="pushDetailBody"></div>
        </div>
      </div>

      <div class="push-modal-mask" id="pushFeedbackModal" aria-hidden="true">
        <div class="push-modal" role="dialog" aria-modal="true" aria-labelledby="pushFeedbackTitle">
          <div class="push-modal-head">
            <h3 class="push-modal-title" id="pushFeedbackTitle">业务反馈</h3>
            <button class="push-modal-close" type="button" data-close-push-modal>×</button>
          </div>
          <div class="push-modal-body">
            <form class="push-feedback-form" id="pushFeedbackForm">
              <div class="push-form-row">
                <div class="push-form-field">
                  <label for="feedbackConclusion">反馈结论</label>
                  <select class="control" id="feedbackConclusion" required>
                    <option>已核查</option>
                    <option>持续关注</option>
                    <option>无风险</option>
                    <option>需进一步研判</option>
                    <option>退回补充</option>
                  </select>
                </div>
                <div class="push-form-field">
                  <label for="feedbackHandler">处置人员</label>
                  <input class="control" id="feedbackHandler" value="${escapeHtml(currentUser)}" />
                </div>
              </div>
              <div class="push-form-field">
                <label for="feedbackRemark">处置说明</label>
                <textarea class="control" id="feedbackRemark" placeholder="请输入核查过程、处置结果或后续跟踪要求" required></textarea>
              </div>
              <div class="push-form-field">
                <label for="feedbackFile">附件上传</label>
                <input class="control" id="feedbackFile" type="file" />
              </div>
              <div class="push-modal-actions">
                <button class="btn" type="button" data-close-push-modal>取消</button>
                <button class="btn primary" type="submit">提交反馈</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function statCard(icon, tone, label, value, note) {
    return `
      <div class="push-stat-card">
        <div class="push-stat-icon ${tone}">${icon}</div>
        <div>
          <div class="push-stat-label">${label}</div>
          <div class="push-stat-value">${value}</div>
          <div class="push-stat-note">${note}</div>
        </div>
      </div>
    `;
  }

  function selectField(id, label, values, labels) {
    return `
      <label class="push-filter-field">
        <span>${label}</span>
        <select id="${id}" class="control">
          ${values.map((value, index) => `<option value="${escapeHtml(value)}">${escapeHtml(labels[index])}</option>`).join("")}
        </select>
      </label>
    `;
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModals() {
    document.querySelectorAll(".push-modal-mask").forEach((modal) => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    });
  }

  function findItem(id) {
    return pushItems.find((item) => item.id === id);
  }

  function detailItem(label, value, wide = false) {
    return `<div class="push-detail-item ${wide ? "wide" : ""}"><div class="push-detail-label">${label}</div><div class="push-detail-value">${value}</div></div>`;
  }

  function feedbackHtml(item) {
    if (!item.feedbackRecords?.length) return "暂无反馈记录";
    return item.feedbackRecords.map((record) => `
      <div class="push-record-item">
        <strong>${escapeHtml(record.conclusion)}</strong>
        <span>${escapeHtml(record.handler)} · ${escapeHtml(record.time)}</span>
        <p>${escapeHtml(record.remark)}</p>
      </div>
    `).join("");
  }

  function showDetail(id) {
    const item = findItem(id);
    const body = document.getElementById("pushDetailBody");
    if (!item || !body) return;
    body.innerHTML = `
      <section class="push-detail-section">
        <h4>基础信息</h4>
        <div class="push-detail-grid">
          ${detailItem("推送标题", escapeHtml(item.title), true)}
          ${detailItem("来源模块", renderTag(item.sourceModule, sourceClass(item.sourceModule)))}
          ${detailItem("推送类型", renderTag(item.pushType, typeClass(item.pushType)))}
          ${detailItem("风险等级", renderTag(item.riskLevel, riskClass(item.riskLevel)))}
          ${detailItem("当前状态", renderTag(item.status, statusClass(item.status)))}
          ${detailItem("推送时间", escapeHtml(item.pushTime))}
          ${detailItem("推送人", escapeHtml(item.pusher || "--"))}
          ${detailItem("接收单位", escapeHtml(item.receiver || "--"))}
        </div>
      </section>
      <section class="push-detail-section">
        <h4>关联信息</h4>
        <div class="push-detail-grid">
          ${detailItem("关联人员", escapeHtml(item.relatedPerson || "--"))}
          ${detailItem("关联组织", escapeHtml(item.relatedOrg || "--"))}
          ${detailItem("关联事件", escapeHtml(item.relatedEvent || "--"))}
          ${detailItem("关联专题", escapeHtml(item.relatedTopic || "--"))}
          ${detailItem("关联比对任务", escapeHtml(item.compareTask || "--"))}
          ${detailItem("命中相似度/匹配结果", escapeHtml(item.similarity || "--"))}
        </div>
      </section>
      <section class="push-detail-section">
        <h4>推送说明</h4>
        <div class="push-detail-grid">${detailItem("说明内容", escapeHtml(item.description || "--"), true)}</div>
      </section>
      <section class="push-detail-section">
        <h4>附件或证据材料</h4>
        <div class="push-evidence-list">${(item.evidence || ["暂无附件"]).map((file) => `<span>${escapeHtml(file)}</span>`).join("")}</div>
      </section>
      <section class="push-detail-section">
        <h4>反馈记录</h4>
        <div class="push-record-list">${feedbackHtml(item)}</div>
      </section>
    `;
    openModal("pushDetailModal");
  }

  function showFeedback(id) {
    activeFeedbackId = id;
    document.getElementById("pushFeedbackForm")?.reset();
    const handler = document.getElementById("feedbackHandler");
    if (handler) handler.value = currentUser;
    openModal("pushFeedbackModal");
  }

  function refreshPage() {
    savePushItems();
    renderPage();
  }

  function refreshRows() {
    const tbody = document.getElementById("pushTableBody");
    if (tbody) tbody.innerHTML = renderTableRows();
  }

  function submitFeedback(event) {
    event.preventDefault();
    const item = findItem(activeFeedbackId);
    if (!item) return;
    const conclusion = document.getElementById("feedbackConclusion").value;
    const remark = document.getElementById("feedbackRemark").value.trim();
    const handler = document.getElementById("feedbackHandler").value.trim() || currentUser;
    if (!remark) {
      alert("请填写处置说明");
      return;
    }
    item.status = "已反馈";
    item.feedbackRecords = item.feedbackRecords || [];
    item.feedbackRecords.unshift({ conclusion, handler, time: nowText(), remark });
    if (item.sourceModule === "比对发现" && item.compareRecordId) {
      try {
        const compareStatus = JSON.parse(localStorage.getItem("comparePushStatusMap") || "{}");
        compareStatus[item.compareRecordId] = { pushStatus: "feedback", pushStatusName: "已反馈" };
        localStorage.setItem("comparePushStatusMap", JSON.stringify(compareStatus));
      } catch (error) {
        // Keep the push feedback flow available even if comparison status sync fails.
      }
    }
    savePushItems();
    closeModals();
    renderPage();
    alert("反馈提交成功");
  }

  function updateStatus(id, status, message) {
    const item = findItem(id);
    if (!item) return;
    item.status = status;
    if (status === "待反馈") {
      item.pushTime = nowText();
      item.feedbackRecords = [];
    }
    savePushItems();
    renderPage();
    alert(message);
  }

  function bindEvents() {
    document.getElementById("queryPushItems")?.addEventListener("click", refreshRows);
    document.getElementById("resetPushFilters")?.addEventListener("click", () => {
      ["sourceFilter", "typeFilter", "statusFilter", "riskFilter", "rangeFilter", "keywordFilter"].forEach((id) => {
        const element = document.getElementById(id);
        if (element) element.value = "";
      });
      refreshRows();
    });
    ["sourceFilter", "typeFilter", "statusFilter", "riskFilter", "rangeFilter", "keywordFilter"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", refreshRows);
      document.getElementById(id)?.addEventListener("change", refreshRows);
    });

    document.getElementById("pushTableBody")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      const id = button.dataset.id;
      const action = button.dataset.action;
      if (action === "detail" || action === "record") showDetail(id);
      if (action === "feedback") showFeedback(id);
      if (action === "withdraw") updateStatus(id, "已撤回", "推送事项已撤回");
      if (action === "resend") updateStatus(id, "待反馈", "推送事项已重新推送");
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-push-modal]")) closeModals();
      if (event.target.classList.contains("push-modal-mask")) closeModals();
    });
    document.getElementById("pushFeedbackForm")?.addEventListener("submit", submitFeedback);
  }

  renderPage();
})();
