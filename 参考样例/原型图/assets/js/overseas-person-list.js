const overseasTargets = [
  {
    id: "T001",
    name: "阿布都热合曼",
    alias: "阿布都",
    account: "@abdurahman_et",
    orgKey: "org1",
    org: "东突厥斯坦伊斯兰运动",
    identityKey: "core",
    identity: "核心成员",
    role: "组织者",
    riskKey: "high",
    risk: "高风险",
    platforms: "Telegram / Facebook",
    area: "土耳其 / 叙利亚",
    statusKey: "active",
    status: "活跃",
    verified: true,
    avatarTone: "blue",
  },
  {
    id: "T002",
    name: "买买提明",
    alias: "艾米",
    account: "@mamattimin_et",
    orgKey: "org1",
    org: "东突厥斯坦伊斯兰运动",
    identityKey: "peripheral",
    identity: "外围人员",
    role: "宣传者",
    riskKey: "medium",
    risk: "中风险",
    platforms: "X / Telegram",
    area: "土耳其",
    statusKey: "monitor",
    status: "持续监测",
    avatarTone: "amber",
  },
  {
    id: "T003",
    name: "艾克拜尔",
    alias: "阿克",
    account: "@ekber_et",
    orgKey: "org1",
    org: "东突厥斯坦伊斯兰运动",
    identityKey: "contact",
    identity: "联络人员",
    role: "活跃参与者",
    riskKey: "low",
    risk: "低风险",
    platforms: "WhatsApp",
    area: "吉尔吉斯斯坦",
    statusKey: "paused",
    status: "暂停关注",
    avatarTone: "green",
  },
  {
    id: "T004",
    name: "阿布·穆罕默德",
    alias: "阿布",
    account: "@abu_mohammed_aq",
    orgKey: "org2",
    org: "基地组织",
    identityKey: "core",
    identity: "核心成员",
    role: "组织者",
    riskKey: "high",
    risk: "高风险",
    platforms: "Telegram / Signal",
    area: "阿富汗 / 巴基斯坦",
    statusKey: "active",
    status: "活跃",
    verified: true,
    avatarTone: "red",
  },
  {
    id: "T005",
    name: "哈立德",
    alias: "阿布·哈立德",
    account: "@khaled_aq",
    orgKey: "org2",
    org: "基地组织",
    identityKey: "peripheral",
    identity: "外围人员",
    role: "资金筹集者",
    riskKey: "medium",
    risk: "中风险",
    platforms: "Facebook",
    area: "也门",
    statusKey: "monitor",
    status: "持续监测",
    avatarTone: "amber",
  },
  {
    id: "T006",
    name: "阿布·贝克尔",
    alias: "阿布",
    account: "@abu_bakr_isis",
    orgKey: "org3",
    org: "伊斯兰国",
    identityKey: "core",
    identity: "核心成员",
    role: "宣传者",
    riskKey: "high",
    risk: "高风险",
    platforms: "Telegram",
    area: "伊拉克 / 叙利亚",
    statusKey: "active",
    status: "活跃",
    verified: true,
    avatarTone: "purple",
  },
  {
    id: "T007",
    name: "优素福",
    alias: "阿布·优素福",
    account: "@yusuf_isis",
    orgKey: "org3",
    org: "伊斯兰国",
    identityKey: "peripheral",
    identity: "外围人员",
    role: "后勤支持",
    riskKey: "medium",
    risk: "中风险",
    platforms: "WhatsApp / Telegram",
    area: "土耳其",
    statusKey: "monitor",
    status: "持续监测",
    avatarTone: "green",
  },
  {
    id: "T008",
    name: "侯赛因·卡里姆",
    alias: "卡里姆",
    account: "@karim_hz",
    orgKey: "org4",
    org: "真主党",
    identityKey: "contact",
    identity: "联络人员",
    role: "媒体协调",
    riskKey: "medium",
    risk: "中风险",
    platforms: "Telegram / YouTube",
    area: "黎巴嫩 / 叙利亚",
    statusKey: "active",
    status: "活跃",
    avatarTone: "blue",
  },
];

const orgOrder = [
  ["org1", "东突厥斯坦伊斯兰运动"],
  ["org2", "基地组织"],
  ["org3", "伊斯兰国"],
  ["org4", "真主党"],
];

function renderTargetPool(list = overseasTargets) {
  const container = document.getElementById("targetPoolContent");
  const groups = orgOrder
    .map(([key, name]) => {
      const rows = list.filter((item) => item.orgKey === key);
      if (!rows.length) return "";
      return `
        <div class="org-group" data-org="${key}">
          <div class="org-title">${name}<span class="section-count">${rows.length}人</span></div>
          <div class="target-grid">${rows.map(renderTargetCard).join("")}</div>
        </div>
      `;
    })
    .join("");

  container.innerHTML =
    groups ||
    `<div class="empty-state"><i class="ri-user-search-line"></i><h3>暂无匹配目标</h3><p>请调整筛选条件后重试。</p></div>`;
}

function renderTargetCard(item) {
  return `
    <article class="target-card" data-id="${item.id}" data-org="${item.orgKey}" data-identity="${item.identityKey}" data-risk="${item.riskKey}" data-status="${item.statusKey}">
      <div class="card-header">
        <div class="target-avatar ${item.avatarTone ? `avatar-${item.avatarTone}` : ""}">
          <i class="${item.verified ? "ri-user-follow-line" : "ri-user-line"}"></i>
        </div>
        <div class="target-main">
          <div class="target-name">
            ${item.name}
            ${item.verified ? `<i class="ri-verified-badge-fill" style="color: var(--danger); font-size: 14px"></i>` : ""}
          </div>
          <div class="target-alias">别名：${item.alias} / 账号：${item.account}</div>
          <div class="target-org"><i class="ri-shield-line"></i>${item.org}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="tag-row">
          <span class="tag tag-identity">${item.identity}</span>
          <span class="tag tag-role">${item.role}</span>
          <span class="tag tag-risk-${item.riskKey}">${item.risk}</span>
        </div>
        <div class="card-info">
          <div class="info-row"><i class="ri-global-line"></i><span>常用平台：${item.platforms}</span></div>
          <div class="info-row"><i class="ri-map-pin-line"></i><span>活动区域：${item.area}</span></div>
        </div>
      </div>
      <div class="card-footer">
        <div class="status-indicator"><span class="status-dot ${item.statusKey}"></span>${item.status}</div>
        <div class="card-actions">
          <a href="${getDetailUrl(item.id)}" class="action-btn primary" data-detail-link><i class="ri-eye-line"></i>查看详情</a>
        </div>
      </div>
    </article>
  `;
}

function searchTargets() {
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  const org = document.getElementById("orgFilter").value;
  const identity = document.getElementById("identityFilter").value;
  const risk = document.getElementById("riskFilter").value;
  const status = document.getElementById("statusFilter").value;

  const filtered = overseasTargets.filter((item) => {
    const keywordText = `${item.name} ${item.alias} ${item.account}`.toLowerCase();
    return (
      (!keyword || keywordText.includes(keyword)) &&
      (!org || item.orgKey === org) &&
      (!identity || item.identityKey === identity) &&
      (!risk || item.riskKey === risk) &&
      (!status || item.statusKey === status)
    );
  });

  renderTargetPool(filtered);
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("orgFilter").value = "";
  document.getElementById("identityFilter").value = "";
  document.getElementById("riskFilter").value = "";
  document.getElementById("statusFilter").value = "";
  renderTargetPool();
}

function getDetailUrl(id) {
  return `profile-detail.html?id=${encodeURIComponent(id)}`;
}

function goToDetail(id) {
  window.location.href = getDetailUrl(id);
}

function bindTargetPoolEvents() {
  document.querySelectorAll(".menu-section").forEach((section) => {
    const trigger = section.querySelector(".menu-trigger");
    if (trigger) {
      trigger.addEventListener("click", () => section.classList.toggle("open"));
    }
  });

  document.getElementById("searchButton").addEventListener("click", searchTargets);
  document.getElementById("resetButton").addEventListener("click", resetFilters);
  document.getElementById("searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") searchTargets();
  });

  document.getElementById("targetPoolContent").addEventListener("click", (event) => {
    if (event.target.closest("[data-detail-link]")) {
      event.stopPropagation();
      return;
    }
    const card = event.target.closest(".target-card");
    if (card) goToDetail(card.dataset.id);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTargetPool();
  bindTargetPoolEvents();
});
