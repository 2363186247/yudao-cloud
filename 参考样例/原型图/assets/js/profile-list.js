const profileTargetStoreKey = "profileTargetListItems";

const profileTargetSeeds = [
  {
    id: "target-001",
    name: "特朗普",
    alias: "Donald Trump",
    account: "@realDonaldTrump",
    avatar: "",
    gender: "男",
    nationality: "美国",
    identityType: "政治人物 / 企业家",
    birthday: "1946-06-14",
    orgKey: "republican",
    organization: "共和党",
    faction: "共和党",
    location: "美国 佛罗里达州",
    mainIdentity: "美国前总统 / 公众人物",
    focusLevel: "高",
    riskLevel: "高风险",
    activeStatus: "重点关注",
    personCategory: "政治人物",
    activePlatforms: ["社交媒体", "公开演讲", "新闻采访"],
    primaryPlatform: "Truth Social / X",
    mediaAccounts: "Truth Social、X、竞选官网",
    tags: ["领导人", "商人", "演说者", "媒体焦点"],
    riskTags: ["高关注度", "强影响力"],
    latestDynamicTime: "2025-05-24 09:12",
    updateTime: "2025-05-24 10:30",
    maintainer: "管理员",
    monitorConfig: { dynamic: true, interaction: true, tweet: true, relation: true },
    remark: "重点关注其公开发言、社交媒体账号动态和相关组织动员情况。",
    maintenanceRecords: [],
  },
  {
    id: "target-002",
    name: "阿布都热合曼",
    alias: "阿布都",
    account: "@abdurahman_et",
    avatar: "",
    gender: "男",
    nationality: "土耳其",
    identityType: "组织骨干",
    birthday: "1984-03-18",
    orgKey: "etim",
    organization: "东突厥斯坦伊斯兰运动",
    faction: "境外极端组织",
    location: "土耳其 / 叙利亚",
    mainIdentity: "核心成员 / 组织者",
    focusLevel: "高",
    riskLevel: "高风险",
    activeStatus: "重点关注",
    personCategory: "组织者",
    activePlatforms: ["Telegram", "Facebook"],
    primaryPlatform: "Telegram",
    mediaAccounts: "@abdurahman_et",
    tags: ["组织者", "跨境联络", "重点关注"],
    riskTags: ["高风险", "联络频繁"],
    latestDynamicTime: "2025-05-23 18:40",
    updateTime: "2025-05-24 08:50",
    maintainer: "管理员",
    monitorConfig: { dynamic: true, interaction: true, tweet: false, relation: true },
    remark: "持续关注其跨境联络、组织动员和传播活动。",
    maintenanceRecords: [],
  },
  {
    id: "target-003",
    name: "买买提明",
    alias: "艾米",
    account: "@mamattimin_et",
    avatar: "",
    gender: "男",
    nationality: "土耳其",
    identityType: "宣传人员",
    birthday: "1991-09-02",
    orgKey: "etim",
    organization: "东突厥斯坦伊斯兰运动",
    faction: "外围宣传网络",
    location: "土耳其",
    mainIdentity: "宣传者 / 内容转发节点",
    focusLevel: "中",
    riskLevel: "中风险",
    activeStatus: "持续监测",
    personCategory: "宣传者",
    activePlatforms: ["X", "Telegram"],
    primaryPlatform: "X",
    mediaAccounts: "@mamattimin_et",
    tags: ["宣传者", "议题放大", "社群活跃"],
    riskTags: ["中风险"],
    latestDynamicTime: "2025-05-22 21:12",
    updateTime: "2025-05-23 10:20",
    maintainer: "李警官",
    monitorConfig: { dynamic: true, interaction: true, tweet: true, relation: false },
    remark: "以内容扩散和议题转发为主，暂未发现线下组织动向。",
    maintenanceRecords: [],
  },
  {
    id: "target-004",
    name: "艾克拜尔",
    alias: "阿克",
    account: "@ekber_et",
    avatar: "",
    gender: "男",
    nationality: "吉尔吉斯斯坦",
    identityType: "联络人员",
    birthday: "1989-12-06",
    orgKey: "etim",
    organization: "东突厥斯坦伊斯兰运动",
    faction: "外围联络网络",
    location: "吉尔吉斯斯坦",
    mainIdentity: "联络人员 / 外围人员",
    focusLevel: "低",
    riskLevel: "低风险",
    activeStatus: "暂停关注",
    personCategory: "联络人员",
    activePlatforms: ["WhatsApp"],
    primaryPlatform: "WhatsApp",
    mediaAccounts: "--",
    tags: ["联络人员", "外围人员"],
    riskTags: ["低风险"],
    latestDynamicTime: "2025-05-12 15:30",
    updateTime: "2025-05-20 09:15",
    maintainer: "王明",
    monitorConfig: { dynamic: true, interaction: false, tweet: false, relation: true },
    remark: "近期活跃度降低，保留基础观察。",
    maintenanceRecords: [],
  },
  {
    id: "target-005",
    name: "阿布·穆罕默德",
    alias: "阿布",
    account: "@abu_mohammed_aq",
    avatar: "",
    gender: "男",
    nationality: "阿富汗",
    identityType: "组织骨干",
    birthday: "1978-05-11",
    orgKey: "aq",
    organization: "基地组织",
    faction: "核心派别",
    location: "阿富汗 / 巴基斯坦",
    mainIdentity: "核心成员 / 组织者",
    focusLevel: "高",
    riskLevel: "高风险",
    activeStatus: "重点关注",
    personCategory: "核心成员",
    activePlatforms: ["Telegram", "Signal"],
    primaryPlatform: "Telegram",
    mediaAccounts: "@abu_mohammed_aq",
    tags: ["核心成员", "组织者", "高危"],
    riskTags: ["高风险", "组织动员"],
    latestDynamicTime: "2025-05-24 06:48",
    updateTime: "2025-05-24 11:20",
    maintainer: "管理员",
    monitorConfig: { dynamic: true, interaction: true, tweet: false, relation: true },
    remark: "重点关注其组织联络和跨平台传播链路。",
    maintenanceRecords: [],
  },
  {
    id: "target-006",
    name: "优素福",
    alias: "阿布·优素福",
    account: "@yusuf_isis",
    avatar: "",
    gender: "男",
    nationality: "土耳其",
    identityType: "支持人员",
    birthday: "1993-02-23",
    orgKey: "isis",
    organization: "伊斯兰国",
    faction: "外围支持网络",
    location: "土耳其",
    mainIdentity: "后勤支持 / 外围人员",
    focusLevel: "中",
    riskLevel: "中风险",
    activeStatus: "持续监测",
    personCategory: "支持者",
    activePlatforms: ["WhatsApp", "Telegram"],
    primaryPlatform: "Telegram",
    mediaAccounts: "@yusuf_isis",
    tags: ["支持者", "后勤支持", "外围人员"],
    riskTags: ["中风险"],
    latestDynamicTime: "2025-05-21 17:45",
    updateTime: "2025-05-22 12:10",
    maintainer: "赵强",
    monitorConfig: { dynamic: true, interaction: false, tweet: false, relation: true },
    remark: "持续监测其外围支持和联络关系变化。",
    maintenanceRecords: [],
  },
];

let profileTargets = loadProfileTargets();

function loadProfileTargets() {
  try {
    const stored = JSON.parse(localStorage.getItem(profileTargetStoreKey) || "[]");
    if (Array.isArray(stored) && stored.length) return stored;
  } catch (error) {
    // Broken local demo data should not block page rendering.
  }
  return profileTargetSeeds.slice();
}

function saveProfileTargets() {
  localStorage.setItem(profileTargetStoreKey, JSON.stringify(profileTargets));
}

function escapeProfile(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function nowProfileTime() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function orgKeyFromName(name) {
  return String(name || "other").replace(/\s+/g, "-").toLowerCase();
}

function targetInitial(name) {
  return String(name || "目").trim().slice(0, 1);
}

function getDetailUrl(id) {
  return `profile-detail.html?id=${encodeURIComponent(id)}`;
}

function getOrgOptions() {
  const map = new Map();
  profileTargets.forEach((item) => map.set(item.orgKey || orgKeyFromName(item.organization), item.organization || "未分组目标"));
  return Array.from(map.entries());
}

function renderProfileTargetPage() {
  const pageContent = document.getElementById("pageContent");
  if (!pageContent) return;

  pageContent.innerHTML = `
    <section class="profile-target-page">
      <section class="module-header">
        <div>
          <h1 class="page-title">目标池</h1>
          <p class="page-desc">按组织分组管理重点目标，支持目标创建、目标检索、风险筛选、画像维护与详情查看。</p>
        </div>
        <button class="pool-btn pool-btn-primary create-target-btn" id="createTargetButton" type="button">+ 新建目标</button>
      </section>

      <section class="filter-card">
        <div class="filter-row">
          <div class="filter-item wide">
            <label class="filter-label" for="searchInput">目标姓名/别名/账号</label>
            <input class="filter-input" id="searchInput" type="text" placeholder="请输入目标姓名、别名或账号" />
          </div>
          <div class="filter-item">
            <label class="filter-label" for="orgFilter">所属组织</label>
            <select class="filter-select" id="orgFilter">
              <option value="">全部组织</option>
              ${getOrgOptions().map(([key, name]) => `<option value="${escapeProfile(key)}">${escapeProfile(name)}</option>`).join("")}
            </select>
          </div>
          <div class="filter-item">
            <label class="filter-label" for="categoryFilter">人员类别</label>
            <select class="filter-select" id="categoryFilter">
              <option value="">全部类别</option>
              <option>政治人物</option>
              <option>核心成员</option>
              <option>组织者</option>
              <option>宣传者</option>
              <option>联络人员</option>
              <option>支持者</option>
              <option>外围人员</option>
            </select>
          </div>
          <div class="filter-item">
            <label class="filter-label" for="riskFilter">风险等级</label>
            <select class="filter-select" id="riskFilter">
              <option value="">全部等级</option>
              <option>高风险</option>
              <option>中风险</option>
              <option>低风险</option>
            </select>
          </div>
          <div class="filter-item">
            <label class="filter-label" for="statusFilter">活跃状态</label>
            <select class="filter-select" id="statusFilter">
              <option value="">全部状态</option>
              <option>重点关注</option>
              <option>正常关注</option>
              <option>持续监测</option>
              <option>暂停关注</option>
              <option>待完善</option>
              <option>已归档</option>
            </select>
          </div>
          <div class="filter-actions">
            <button class="pool-btn pool-btn-primary" id="searchButton" type="button">查询</button>
            <button class="pool-btn pool-btn-secondary" id="resetButton" type="button">重置</button>
          </div>
        </div>
      </section>

      <section class="section-header">
        <div class="section-title">目标列表</div>
      </section>

      <div id="targetPoolContent"></div>
    </section>
  `;

  renderTargetPool();
  bindProfileTargetEvents();
}

function currentFilters() {
  return {
    keyword: document.getElementById("searchInput")?.value.trim().toLowerCase() || "",
    org: document.getElementById("orgFilter")?.value || "",
    category: document.getElementById("categoryFilter")?.value || "",
    risk: document.getElementById("riskFilter")?.value || "",
    status: document.getElementById("statusFilter")?.value || "",
  };
}

function filteredTargets() {
  const filters = currentFilters();
  return profileTargets.filter((item) => {
    const text = [item.name, item.alias, item.account, item.nationality, item.location, item.organization].join(" ").toLowerCase();
    return (!filters.keyword || text.includes(filters.keyword))
      && (!filters.org || item.orgKey === filters.org)
      && (!filters.category || item.personCategory === filters.category)
      && (!filters.risk || item.riskLevel === filters.risk)
      && (!filters.status ? item.activeStatus !== "已归档" : item.activeStatus === filters.status);
  });
}

function renderTargetPool(list = filteredTargets()) {
  const container = document.getElementById("targetPoolContent");
  if (!container) return;
  const groups = getOrgOptions()
    .map(([key, name]) => {
      const rows = list.filter((item) => item.orgKey === key);
      if (!rows.length) return "";
      return `
        <div class="org-group" data-org="${escapeProfile(key)}">
          <div class="org-title">${escapeProfile(name)}<span class="section-count">${rows.length}人</span></div>
          <div class="target-grid">${rows.map(renderTargetCard).join("")}</div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = groups || `<div class="empty-state"><span class="empty-state-icon">⌕</span><h3>暂无匹配目标</h3><p>请调整筛选条件后重试。</p></div>`;
}

function renderAvatar(item) {
  if (item.avatar) {
    return `<div class="target-avatar"><img src="${escapeProfile(item.avatar)}" alt="${escapeProfile(item.name)}" /></div>`;
  }
  return `<div class="target-avatar">${escapeProfile(targetInitial(item.name))}</div>`;
}

function renderTargetCard(item) {
  const archived = item.activeStatus === "已归档";
  return `
    <article class="target-card" data-id="${escapeProfile(item.id)}">
      <div class="card-header">
        ${renderAvatar(item)}
        <div class="target-main">
          <div class="target-title-line">
            <div>
              <div class="target-name">${escapeProfile(item.name)}</div>
              <div class="target-alias">${escapeProfile(item.alias || "--")} / ${escapeProfile(item.account || "--")}</div>
            </div>
            <div class="target-levels">
              <span class="pool-tag focus-${focusClass(item.focusLevel)}">关注${escapeProfile(item.focusLevel || "中")}</span>
              <span class="pool-tag ${riskClass(item.riskLevel)}">${escapeProfile(item.riskLevel || "中风险")}</span>
            </div>
          </div>
          <div class="status-indicator status-${statusClass(item.activeStatus)}"><span class="status-dot"></span>${escapeProfile(item.activeStatus || "持续监测")}</div>
        </div>
      </div>
      <div class="card-body">
        <div class="target-info-grid">
          ${infoField("国籍", item.nationality)}
          ${infoField("身份", item.identityType)}
          ${infoField("主要身份", item.mainIdentity)}
          ${infoField("所属组织", item.organization)}
          ${infoField("活跃平台", (item.activePlatforms || []).join(" / "))}
          ${infoField("所在地", item.location)}
          ${infoField("主要传播平台", item.primaryPlatform)}
          ${infoField("维护人", item.maintainer)}
        </div>
        <div class="tag-row">
          <span class="pool-tag ${categoryClass(item.personCategory)}">${escapeProfile(item.personCategory || "外围人员")}</span>
          ${(item.tags || []).slice(0, 4).map((tag) => `<span class="pool-tag tag-plain">${escapeProfile(tag)}</span>`).join("")}
          ${(item.riskTags || []).slice(0, 2).map((tag) => `<span class="pool-tag tag-risk-note">${escapeProfile(tag)}</span>`).join("")}
        </div>
      </div>
      <div class="card-footer">
        <div class="maintenance-copy">
          <span>最近动态：${escapeProfile(item.latestDynamicTime || "--")}</span>
          <span>最近维护：${escapeProfile(item.updateTime || "--")}</span>
        </div>
        <div class="card-actions">
          <a href="${getDetailUrl(item.id)}" class="action-btn" data-detail-link>查看详情</a>
          ${archived
            ? `<button class="action-btn action-btn-secondary" type="button" data-restore-target="${escapeProfile(item.id)}">恢复关注</button>`
            : `<button class="action-btn action-btn-secondary" type="button" data-edit-target="${escapeProfile(item.id)}">编辑维护</button><button class="action-btn action-btn-ghost" type="button" data-archive-target="${escapeProfile(item.id)}">归档</button>`}
        </div>
      </div>
    </article>
  `;
}

function infoField(label, value) {
  return `<div class="target-info-item"><span>${escapeProfile(label)}</span><strong>${escapeProfile(value || "--")}</strong></div>`;
}

function focusClass(level) {
  if (level === "高") return "high";
  if (level === "低") return "low";
  return "medium";
}

function riskClass(risk) {
  if (risk === "高风险") return "tag-risk-high";
  if (risk === "低风险") return "tag-risk-low";
  return "tag-risk-medium";
}

function statusClass(status) {
  if (status === "重点关注") return "key";
  if (status === "正常关注") return "normal";
  if (status === "暂停关注") return "paused";
  if (status === "已归档") return "archived";
  if (status === "待完善") return "draft";
  return "monitor";
}

function categoryClass(category) {
  const map = {
    政治人物: "tag-category-blue",
    核心成员: "tag-category-blue",
    组织者: "tag-category-purple",
    宣传者: "tag-category-orange",
    联络人员: "tag-category-cyan",
    支持者: "tag-category-green",
  };
  return map[category] || "tag-category-gray";
}

function searchTargets() {
  renderTargetPool();
}

function resetFilters() {
  ["searchInput", "orgFilter", "categoryFilter", "riskFilter", "statusFilter"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.value = "";
  });
  renderTargetPool();
}

function targetById(id) {
  return profileTargets.find((item) => item.id === id);
}

function openTargetModal(mode, targetId = "") {
  const isEdit = mode === "edit";
  const target = isEdit ? targetById(targetId) : {};
  if (isEdit && !target) return;
  closeTargetModal();
  const root = document.createElement("div");
  root.className = "target-modal-mask open";
  root.id = "targetModalRoot";
  root.innerHTML = `
    <div class="target-modal" role="dialog" aria-modal="true" aria-labelledby="targetModalTitle">
      <div class="target-modal-head">
        <h2 id="targetModalTitle">${isEdit ? "目标维护" : "创建目标"}</h2>
        <button class="target-modal-close" type="button" data-close-target-modal>×</button>
      </div>
      <div class="target-modal-body">
        <form id="targetForm" class="target-form">
          <div class="target-form-section">
            <h3>基础信息</h3>
            <div class="target-form-grid">
              ${formInput("name", "目标姓名", target.name, true)}
              ${formSelect("gender", "性别", ["男", "女", "未知"], target.gender)}
              ${formInput("nationality", "国籍", target.nationality, true)}
              ${formInput("identityType", "身份类型", target.identityType, true)}
              ${formInput("birthday", "出生日期", target.birthday, false, "date")}
              ${formInput("organization", "所属组织", target.organization)}
              ${formInput("faction", "所属党派 / 所属派别", target.faction)}
              ${formInput("location", "所在国家 / 地区", target.location)}
              ${formInput("mainIdentity", "主要身份", target.mainIdentity)}
              ${formInput("avatar", "目标头像", target.avatar, false, "text", "可填写图片路径")}
            </div>
          </div>
          <div class="target-form-section">
            <h3>账号与平台信息</h3>
            <div class="target-form-grid">
              ${formInput("alias", "别名", target.alias)}
              ${formInput("account", "账号", target.account)}
              ${formInput("activePlatforms", "活跃平台", (target.activePlatforms || []).join(" / "), false, "text", "多个平台用 / 分隔")}
              ${formInput("primaryPlatform", "主要传播平台", target.primaryPlatform)}
              ${formInput("mediaAccounts", "关联媒体账号", target.mediaAccounts)}
            </div>
          </div>
          <div class="target-form-section">
            <h3>关注与风险信息</h3>
            <div class="target-form-grid">
              ${formSelect("focusLevel", "关注等级", ["高", "中", "低"], target.focusLevel, true)}
              ${formSelect("riskLevel", "风险等级", ["高风险", "中风险", "低风险"], target.riskLevel, true)}
              ${formSelect("activeStatus", "活跃状态", ["重点关注", "正常关注", "持续监测", "暂停关注", "待完善", "已归档"], target.activeStatus || "持续监测", true)}
              ${formSelect("personCategory", "人员类别", ["政治人物", "核心成员", "组织者", "宣传者", "外围人员", "支持者", "联络人员"], target.personCategory)}
              ${formInput("tags", "目标标签", (target.tags || []).join(" / "), false, "text", "多个标签用 / 分隔")}
            </div>
          </div>
          <div class="target-form-section">
            <h3>画像配置</h3>
            <div class="target-switch-grid">
              ${formCheck("monitorDynamic", "启用动态监测", target.monitorConfig?.dynamic !== false)}
              ${formCheck("monitorInteraction", "启用互动分析", target.monitorConfig?.interaction !== false)}
              ${formCheck("monitorTweet", "启用推文分析", target.monitorConfig?.tweet !== false)}
              ${formCheck("monitorRelation", "启用社交关系分析", target.monitorConfig?.relation !== false)}
            </div>
            <label class="target-form-field target-form-wide"><span>备注说明</span><textarea name="remark" class="target-textarea">${escapeProfile(target.remark || "")}</textarea></label>
            ${isEdit ? `<label class="target-form-field target-form-wide"><span>本次维护说明</span><textarea name="maintenanceNote" class="target-textarea" placeholder="请输入本次维护内容、依据或变更说明"></textarea></label>` : ""}
          </div>
        </form>
      </div>
      <div class="target-modal-actions">
        <button class="pool-btn pool-btn-secondary" type="button" data-close-target-modal>取消</button>
        ${isEdit
          ? `<button class="pool-btn pool-btn-primary" type="button" id="saveTargetMaintain">保存维护</button>`
          : `<button class="pool-btn pool-btn-secondary" type="button" id="saveTargetDraft">保存草稿</button><button class="pool-btn pool-btn-primary" type="button" id="createTargetSubmit">创建目标</button>`}
      </div>
    </div>
  `;
  document.body.appendChild(root);
  root.addEventListener("click", (event) => {
    if (event.target === root || event.target.closest("[data-close-target-modal]")) closeTargetModal();
  });
  if (isEdit) {
    document.getElementById("saveTargetMaintain").addEventListener("click", () => saveTargetMaintenance(targetId));
  } else {
    document.getElementById("saveTargetDraft").addEventListener("click", () => createTarget(true));
    document.getElementById("createTargetSubmit").addEventListener("click", () => createTarget(false));
  }
}

function closeTargetModal() {
  document.getElementById("targetModalRoot")?.remove();
}

function formInput(name, label, value = "", required = false, type = "text", placeholder = "") {
  return `<label class="target-form-field"><span>${label}${required ? '<em>*</em>' : ""}</span><input name="${name}" class="target-input" type="${type}" value="${escapeProfile(value || "")}" placeholder="${escapeProfile(placeholder)}" /></label>`;
}

function formSelect(name, label, options, value = "", required = false) {
  return `<label class="target-form-field"><span>${label}${required ? '<em>*</em>' : ""}</span><select name="${name}" class="target-input">${options.map((item) => `<option value="${escapeProfile(item)}" ${item === value ? "selected" : ""}>${escapeProfile(item)}</option>`).join("")}</select></label>`;
}

function formCheck(name, label, checked) {
  return `<label class="target-switch"><input name="${name}" type="checkbox" ${checked ? "checked" : ""} /><span>${label}</span></label>`;
}

function formValue(name) {
  return document.querySelector(`#targetForm [name="${name}"]`)?.value.trim() || "";
}

function formChecked(name) {
  return !!document.querySelector(`#targetForm [name="${name}"]`)?.checked;
}

function collectTargetPayload(existing = {}) {
  const organization = formValue("organization") || "未分组目标";
  const now = nowProfileTime();
  return {
    ...existing,
    name: formValue("name"),
    alias: formValue("alias"),
    account: formValue("account"),
    avatar: formValue("avatar"),
    gender: formValue("gender"),
    nationality: formValue("nationality"),
    identityType: formValue("identityType"),
    birthday: formValue("birthday"),
    organization,
    orgKey: existing.orgKey || orgKeyFromName(organization),
    faction: formValue("faction"),
    location: formValue("location"),
    mainIdentity: formValue("mainIdentity"),
    focusLevel: formValue("focusLevel"),
    riskLevel: formValue("riskLevel"),
    activeStatus: formValue("activeStatus"),
    personCategory: formValue("personCategory"),
    activePlatforms: splitProfileList(formValue("activePlatforms")),
    primaryPlatform: formValue("primaryPlatform"),
    mediaAccounts: formValue("mediaAccounts"),
    tags: splitProfileList(formValue("tags")),
    riskTags: existing.riskTags || [],
    latestDynamicTime: existing.latestDynamicTime || now,
    updateTime: now,
    maintainer: "管理员",
    monitorConfig: {
      dynamic: formChecked("monitorDynamic"),
      interaction: formChecked("monitorInteraction"),
      tweet: formChecked("monitorTweet"),
      relation: formChecked("monitorRelation"),
    },
    remark: formValue("remark"),
    maintenanceRecords: existing.maintenanceRecords || [],
  };
}

function splitProfileList(value) {
  return String(value || "").split(/[\/,，、]+/).map((item) => item.trim()).filter(Boolean);
}

function validateTarget(payload, draft = false) {
  if (draft) {
    if (!payload.name) return "保存草稿至少需要填写目标姓名";
    return "";
  }
  if (!payload.name) return "请填写目标姓名";
  if (!payload.nationality) return "请填写国籍";
  if (!payload.identityType) return "请填写身份类型";
  if (!payload.focusLevel) return "请选择关注等级";
  if (!payload.riskLevel) return "请选择风险等级";
  if (!payload.activeStatus) return "请选择活跃状态";
  return "";
}

function createTarget(draft) {
  const payload = collectTargetPayload();
  const message = validateTarget(payload, draft);
  if (message) {
    alert(message);
    return;
  }
  payload.id = `target-${Date.now()}`;
  if (draft) payload.activeStatus = "待完善";
  if (!payload.tags.length) payload.tags = [payload.personCategory || "目标画像"];
  profileTargets.unshift(payload);
  saveProfileTargets();
  closeTargetModal();
  renderProfileTargetPage();
  alert(draft ? "目标草稿已保存" : "目标创建成功");
}

function saveTargetMaintenance(id) {
  const index = profileTargets.findIndex((item) => item.id === id);
  if (index < 0) return;
  const payload = collectTargetPayload(profileTargets[index]);
  const message = validateTarget(payload, false);
  if (message) {
    alert(message);
    return;
  }
  const note = formValue("maintenanceNote");
  if (note) {
    payload.maintenanceRecords = payload.maintenanceRecords || [];
    payload.maintenanceRecords.unshift({ time: payload.updateTime, maintainer: payload.maintainer, note });
  }
  profileTargets[index] = payload;
  saveProfileTargets();
  closeTargetModal();
  renderProfileTargetPage();
  alert("目标信息已更新");
}

function archiveTarget(id) {
  const target = targetById(id);
  if (!target) return;
  if (!confirm("确认归档该目标？归档后该目标将不再参与重点监测，但历史画像和维护记录将保留。")) return;
  target.activeStatus = "已归档";
  target.updateTime = nowProfileTime();
  target.maintainer = "管理员";
  saveProfileTargets();
  renderProfileTargetPage();
}

function restoreTarget(id) {
  const target = targetById(id);
  if (!target) return;
  target.activeStatus = "持续监测";
  target.updateTime = nowProfileTime();
  target.maintainer = "管理员";
  saveProfileTargets();
  renderProfileTargetPage();
  alert("目标已恢复关注");
}

function bindProfileTargetEvents() {
  document.getElementById("searchButton").addEventListener("click", searchTargets);
  document.getElementById("resetButton").addEventListener("click", resetFilters);
  document.getElementById("createTargetButton").addEventListener("click", () => openTargetModal("create"));
  document.getElementById("searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") searchTargets();
  });
  ["orgFilter", "categoryFilter", "riskFilter", "statusFilter"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", searchTargets);
  });
  document.getElementById("targetPoolContent").addEventListener("click", (event) => {
    const edit = event.target.closest("[data-edit-target]");
    const archive = event.target.closest("[data-archive-target]");
    const restore = event.target.closest("[data-restore-target]");
    const detail = event.target.closest("[data-detail-link]");
    if (edit) {
      event.stopPropagation();
      openTargetModal("edit", edit.dataset.editTarget);
      return;
    }
    if (archive) {
      event.stopPropagation();
      archiveTarget(archive.dataset.archiveTarget);
      return;
    }
    if (restore) {
      event.stopPropagation();
      restoreTarget(restore.dataset.restoreTarget);
      return;
    }
    if (detail) {
      event.stopPropagation();
      return;
    }
    const card = event.target.closest(".target-card");
    if (card) window.location.href = getDetailUrl(card.dataset.id);
  });
}

renderProfileTargetPage();
