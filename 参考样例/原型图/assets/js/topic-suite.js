const topicSuiteStoreKey = "topicSuiteSelectedId";
const topicSuiteOverrideKey = "topicSuiteTopicOverrides";
const topicSuiteDeletedKey = "topicSuiteDeletedTopicIds";

const topicSuiteTopics = [
  {
    id: "TP-2026-041501",
    name: "境外社交平台涉华舆情监测",
    type: "境外舆情",
    time: "2026-04-15",
    updateTime: "2026-04-18 16:30",
    owner: "王明",
    cycle: "近30日",
    risk: "高风险",
    status: "进行中",
    auditStatus: "审核通过",
    submitTime: "2026-04-10 09:30",
    auditor: "管理员",
    auditTime: "2026-04-10 11:20",
    auditOpinion: "专题配置完整，监测对象明确，同意启用。",
    events: 42,
    desc: "围绕境外社交平台涉华议题、重点账号联动和外溢传播风险开展持续监测。",
    tags: ["境外舆情", "社会舆情", "涉华议题"],
    keywords: ["涉华", "社交平台", "舆情监测"],
    metrics: { intel: 186, people: 24, nodes: 37 },
    trend: [38, 52, 61, 76, 88, 104, 126],
    overview: [["监测情报总量", "186 条"], ["涉及重点人物", "24 人"], ["重点传播节点", "37 个"], ["当前态势", "多平台扩散趋势明显，需持续跟踪二次传播"]],
    opinions: [["观点一", "部分账号集中放大政策解读类内容。"], ["观点二", "转发引用链条较长，形成跨圈层传播。"], ["观点三", "情绪表达集中在晚间时段。"]],
    intelPeople: [["涉及情报", "平台公开言论、转发链路、评论互动。"], ["涉及人物", "区域意见领袖、媒体账号、组织账号。"], ["涉及组织", "境外媒体矩阵、社群频道。"]],
    nodes: [["核心平台", "X / Telegram / YouTube"], ["关键节点", "高频转发账号和群组频道"], ["传播特征", "首发后 6 小时内扩散最明显"]],
    conclusions: ["建议将高频账号纳入重点观察列表。", "建议建立晚间快速响应机制。", "建议对跨平台同步内容进行关联研判。"],
    timeline: [["2026-04-01 09:20", "专题启动，完成历史数据回溯。"], ["2026-04-06 18:40", "识别首批高频传播节点。"], ["2026-04-12 21:15", "晚间讨论热度快速抬升。"], ["2026-04-15 10:30", "生成阶段性专题报告。"]],
  },
  {
    id: "TP-2026-041207",
    name: "热点事件传播链跟踪",
    type: "事件跟踪",
    time: "2026-04-12",
    updateTime: "2026-04-17 10:18",
    owner: "李娜",
    cycle: "近15日",
    risk: "中风险",
    status: "进行中",
    auditStatus: "审核通过",
    submitTime: "2026-04-12 08:55",
    auditor: "管理员",
    auditTime: "2026-04-12 10:30",
    auditOpinion: "传播链路配置清晰，同意启用。",
    events: 28,
    desc: "聚焦热点事件在多平台之间的传播路径、关键节点和二次发酵趋势。",
    tags: ["事件跟踪", "传播链", "舆情分析"],
    keywords: ["热点事件", "传播链", "扩散"],
    metrics: { intel: 112, people: 13, nodes: 19 },
    trend: [22, 34, 42, 46, 51, 59, 68],
    overview: [["监测情报总量", "112 条"], ["涉及重点人物", "13 人"], ["重点传播节点", "19 个"], ["当前态势", "热度稳定上升，讨论主题逐渐集中"]],
    opinions: [["观点一", "讨论集中于事件评论与立场表达。"], ["观点二", "少量高活跃用户贡献大部分互动。"], ["观点三", "议题存在向社媒平台迁移迹象。"]],
    intelPeople: [["涉及情报", "论坛帖子、跟帖、引用链接。"], ["涉及人物", "高活跃发帖用户。"], ["涉及组织", "区域论坛与外部转载站点。"]],
    nodes: [["核心平台", "论坛站点 / X"], ["关键节点", "高频楼主和转载账号"], ["传播特征", "长尾讨论明显"]],
    conclusions: ["建议持续跟踪高活跃楼主。", "建议对跨平台外链做溯源分析。", "建议输出每周主题词变化摘要。"],
    timeline: [["2026-04-12 08:30", "专题创建完成。"], ["2026-04-13 14:10", "识别高频帖子。"], ["2026-04-14 20:20", "形成主题词变化分析。"]],
  },
  {
    id: "TP-2026-040908",
    name: "重点人员活动专题",
    type: "重点人物",
    time: "2026-04-09",
    updateTime: "2026-04-16 09:42",
    owner: "赵强",
    cycle: "长期跟踪",
    risk: "高风险",
    status: "进行中",
    auditStatus: "审核通过",
    submitTime: "2026-04-09 10:00",
    auditor: "管理员",
    auditTime: "2026-04-09 11:15",
    auditOpinion: "重点对象明确，监测周期合理，同意启用。",
    events: 36,
    desc: "对重点人员公开活动、网络声量、关联组织和异常动向进行长期跟踪。",
    tags: ["重点人员", "活动轨迹", "长期监测"],
    keywords: ["人物", "活动", "关联"],
    metrics: { intel: 74, people: 8, nodes: 11 },
    trend: [16, 18, 21, 24, 23, 27, 31],
    overview: [["监测情报总量", "74 条"], ["涉及重点人物", "8 人"], ["重点传播节点", "11 个"], ["当前态势", "整体热度较低，仍需观察关联议题变化"]],
    opinions: [["观点一", "直接提及量较少。"], ["观点二", "评论讨论以背景信息为主。"], ["观点三", "暂无明显跨平台扩散。"]],
    intelPeople: [["涉及情报", "公开言论与人物提及。"], ["涉及人物", "目标及外围联系人。"], ["涉及组织", "相关机构与社群。"]],
    nodes: [["核心平台", "Facebook / Telegram"], ["关键节点", "外围联系人账号"], ["传播特征", "低频持续讨论"]],
    conclusions: ["建议维持基础监测。", "建议结合目标画像更新关联人物。", "建议出现异常声量时触发报告。"],
    timeline: [["2026-04-09 10:00", "专题纳入长期跟踪。"], ["2026-04-11 16:00", "补充关联人物信息。"]],
  },
  {
    id: "TP-2026-040612",
    name: "人工智能安全议题监测",
    type: "人工智能",
    time: "2026-04-06",
    updateTime: "2026-04-15 14:20",
    owner: "陈晨",
    cycle: "近30日",
    risk: "中风险",
    status: "待启动",
    auditStatus: "待审核",
    submitTime: "2026-04-06 09:00",
    auditor: "--",
    auditTime: "--",
    auditOpinion: "",
    events: 19,
    desc: "跟踪人工智能安全相关议题的传播热度、观点分化和跨平台讨论趋势。",
    tags: ["人工智能", "安全议题", "趋势研判"],
    keywords: ["人工智能", "安全", "议题"],
    metrics: { intel: 96, people: 9, nodes: 15 },
    trend: [18, 22, 30, 33, 41, 45, 52],
    overview: [["监测情报总量", "96 条"], ["涉及重点人物", "9 人"], ["重点传播节点", "15 个"], ["当前态势", "议题热度逐步升高，需关注外部观点聚合"]],
    opinions: [["观点一", "讨论集中在模型安全、数据治理和跨境监管。"], ["观点二", "专业媒体与行业账号传播权重较高。"]],
    intelPeople: [["涉及情报", "行业文章、公开评论、技术论坛讨论。"], ["涉及人物", "技术意见领袖与行业观察账号。"], ["涉及组织", "研究机构、技术社群。"]],
    nodes: [["核心平台", "论坛 / X / YouTube"], ["关键节点", "行业媒体与技术社区账号"], ["传播特征", "专业圈层扩散较强"]],
    conclusions: ["建议关注安全议题是否外溢为公共舆情。", "建议持续观察重点行业账号的议题引导。"],
    timeline: [["2026-04-06 09:00", "专题完成配置。"], ["2026-04-10 15:30", "识别首批高频关键词。"]],
  },
  {
    id: "TP-2026-033108",
    name: "重大活动安保舆情专题",
    type: "重大活动",
    time: "2026-03-31",
    updateTime: "2026-04-14 18:05",
    owner: "孙杰",
    cycle: "近15日",
    risk: "低风险",
    status: "进行中",
    auditStatus: "审核通过",
    submitTime: "2026-03-31 10:00",
    auditor: "管理员",
    auditTime: "2026-03-31 11:05",
    auditOpinion: "专题目标明确，准予启用。",
    events: 23,
    desc: "围绕重大活动期间网络舆情、现场秩序讨论和风险苗头进行专题跟踪。",
    tags: ["重大活动", "安保舆情", "舆论引导"],
    keywords: ["重大活动", "安保", "舆情"],
    metrics: { intel: 68, people: 6, nodes: 10 },
    trend: [12, 16, 20, 22, 21, 24, 29],
    overview: [["监测情报总量", "68 条"], ["涉及重点人物", "6 人"], ["重点传播节点", "10 个"], ["当前态势", "整体舆情平稳，局部讨论需持续观察"]],
    opinions: [["观点一", "讨论多集中在活动安排和现场体验。"], ["观点二", "暂未发现明显异常聚集话题。"]],
    intelPeople: [["涉及情报", "公开评论、活动相关帖子和短视频描述。"], ["涉及人物", "活动参与者与现场传播账号。"], ["涉及组织", "活动主办方及周边社群。"]],
    nodes: [["核心平台", "微博 / X / YouTube"], ["关键节点", "现场发布账号"], ["传播特征", "短时集中、后续回落"]],
    conclusions: ["建议保持活动期常态监测。", "建议对异常负面话题设置快速核查。"],
    timeline: [["2026-03-31 10:00", "专题启动。"], ["2026-04-05 20:30", "完成阶段性舆情汇总。"]],
  },
  {
    id: "TP-2026-032208",
    name: "敏感时段网络动态观察",
    type: "网络安全",
    time: "2026-03-22",
    updateTime: "2026-04-13 11:25",
    owner: "周敏",
    cycle: "长期跟踪",
    risk: "中风险",
    status: "未启用",
    auditStatus: "审核驳回",
    submitTime: "2026-03-22 09:30",
    auditor: "管理员",
    auditTime: "2026-03-22 15:40",
    auditOpinion: "监测关键词范围过宽，请补充重点对象后重新提交。",
    events: 31,
    desc: "针对敏感时段网络动态、主题词变化和异常互动行为开展观察分析。",
    tags: ["网络动态", "敏感时段", "舆情分析"],
    keywords: ["敏感时段", "网络动态", "主题词"],
    metrics: { intel: 121, people: 11, nodes: 18 },
    trend: [26, 31, 37, 44, 40, 35, 33],
    overview: [["监测情报总量", "121 条"], ["涉及重点人物", "11 人"], ["重点传播节点", "18 个"], ["当前态势", "专题已完成阶段归档，可作为后续对比基线"]],
    opinions: [["观点一", "敏感时段讨论存在周期性抬升。"], ["观点二", "关键词变化与外部事件关联明显。"]],
    intelPeople: [["涉及情报", "公开帖子、评论互动和关键词趋势。"], ["涉及人物", "高频互动用户。"], ["涉及组织", "论坛社群与转载站点。"]],
    nodes: [["核心平台", "论坛 / Telegram"], ["关键节点", "高频互动账号"], ["传播特征", "时间窗口集中"]],
    conclusions: ["建议沉淀为敏感时段研判模板。", "建议保留关键词变化用于后续专题比对。"],
    timeline: [["2026-03-22 09:30", "专题启动。"], ["2026-04-12 17:00", "专题归档并形成分析结论。"]],
  },
];

function topicEscape(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function getTopicStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch (error) {
    return fallback;
  }
}

function getAllTopics() {
  const extra = getTopicStorage("topicSuiteExtraTopics", []);
  const overrides = getTopicStorage(topicSuiteOverrideKey, {});
  const deletedIds = new Set(getTopicStorage(topicSuiteDeletedKey, []));
  return topicSuiteTopics
    .concat(extra)
    .filter((topic) => !deletedIds.has(topic.id))
    .map((topic) => ({
      ...topic,
      canEdit: topic.canEdit !== false,
      canDelete: topic.canDelete !== false,
      ...(overrides[topic.id] || {}),
    }));
}

function findTopicById(id) {
  return getAllTopics().find((topic) => topic.id === id);
}

function saveTopicUpdate(id, updates) {
  const overrides = getTopicStorage(topicSuiteOverrideKey, {});
  overrides[id] = { ...(overrides[id] || {}), ...updates, id };
  localStorage.setItem(topicSuiteOverrideKey, JSON.stringify(overrides));
}

function removeTopic(id) {
  const deletedIds = new Set(getTopicStorage(topicSuiteDeletedKey, []));
  deletedIds.add(id);
  localStorage.setItem(topicSuiteDeletedKey, JSON.stringify(Array.from(deletedIds)));

  const overrides = getTopicStorage(topicSuiteOverrideKey, {});
  delete overrides[id];
  localStorage.setItem(topicSuiteOverrideKey, JSON.stringify(overrides));

  if (getSelectedTopicId() === id) {
    const nextTopic = getAllTopics().find((topic) => topic.id !== id);
    if (nextTopic) setSelectedTopic(nextTopic.id);
    else localStorage.removeItem(topicSuiteStoreKey);
  }
}

function getSelectedTopicId() {
  const firstTopic = getAllTopics()[0];
  return localStorage.getItem(topicSuiteStoreKey) || (firstTopic ? firstTopic.id : "");
}

function setSelectedTopic(id) {
  if (id) localStorage.setItem(topicSuiteStoreKey, id);
}

function getSelectedTopic() {
  const topics = getAllTopics();
  return topics.find((topic) => topic.id === getSelectedTopicId()) || topics[0];
}

function riskClass(risk) {
  if (risk === "高风险" || risk === "高热") return "danger";
  if (risk === "中风险" || risk === "中热") return "warning";
  return "success";
}

function statusClass(status) {
  if (status === "待启动") return "pending";
  if (status === "未启用" || status === "已归档") return "archived";
  return "active";
}

function auditClass(status) {
  if (status === "待审核") return "pending";
  if (status === "审核驳回") return "rejected";
  return "approved";
}

function topicAuditStatus(topic) {
  if (topic.auditStatus) return topic.auditStatus;
  if (topic.status === "待启动") return "待审核";
  if (topic.status === "未启用") return "审核驳回";
  return "审核通过";
}

function nowDateTime() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  const time = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
  ].join(":");
  return `${date} ${time}`;
}

function renderTopicTags(tags) {
  return (tags || []).map((tag) => `<span class="topic-chip">${topicEscape(tag)}</span>`).join("");
}

function showTopicToast(text) {
  let toast = document.getElementById("topicSuiteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "topicSuiteToast";
    toast.className = "topic-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  window.clearTimeout(showTopicToast.timer);
  showTopicToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1500);
}

function closeTopicModal() {
  document.getElementById("topicSuiteModalRoot")?.remove();
}

function createTopicModal(content) {
  closeTopicModal();
  const root = document.createElement("div");
  root.id = "topicSuiteModalRoot";
  root.className = "topic-modal-backdrop";
  root.innerHTML = content;
  document.body.appendChild(root);
  root.addEventListener("click", (event) => {
    if (event.target === root || event.target.closest("[data-modal-close]")) closeTopicModal();
  });
  return root;
}

function topicFieldValue(root, name) {
  return (root.querySelector(`[name="${name}"]`)?.value || "").trim();
}

function openTopicEditModal(topicId, onSave) {
  const topic = findTopicById(topicId);
  if (!topic) return;
  if (topic.canEdit === false) {
    showTopicToast("暂无修改权限");
    return;
  }
  const riskOptions = ["高风险", "中风险", "低风险"];
  const statusOptions = ["进行中", "待启动", "未启用"];
  const optionTemplate = (options, selected) => options.map((item) => `<option value="${topicEscape(item)}" ${item === selected ? "selected" : ""}>${topicEscape(item)}</option>`).join("");
  const root = createTopicModal(`
    <div class="topic-modal" role="dialog" aria-modal="true" aria-labelledby="topicEditTitle">
      <div class="topic-modal-head">
        <h2 id="topicEditTitle">修改专题</h2>
        <button class="topic-modal-close" type="button" aria-label="关闭" data-modal-close>×</button>
      </div>
      <div class="topic-edit-form">
        <label class="topic-edit-field topic-edit-wide"><span>专题名称</span><input name="name" class="text-input" value="${topicEscape(topic.name)}" /></label>
        <label class="topic-edit-field topic-edit-wide"><span>专题描述</span><textarea name="desc" class="text-area">${topicEscape(topic.desc)}</textarea></label>
        <label class="topic-edit-field"><span>风险等级</span><select name="risk" class="select-input">${optionTemplate(riskOptions, topic.risk)}</select></label>
        <label class="topic-edit-field"><span>运行状态</span><select name="status" class="select-input">${optionTemplate(statusOptions, topic.status)}</select></label>
        <label class="topic-edit-field topic-edit-wide"><span>标签</span><input name="tags" class="text-input" value="${topicEscape((topic.tags || []).join(" / "))}" /></label>
        <label class="topic-edit-field"><span>创建人</span><input name="owner" class="text-input" value="${topicEscape(topic.owner || "")}" /></label>
        <label class="topic-edit-field"><span>更新时间</span><input name="updateTime" class="text-input" value="${topicEscape(topic.updateTime || topic.time || "")}" /></label>
        <label class="topic-edit-field"><span>关联事件数</span><input name="events" class="text-input" type="number" min="0" value="${topicEscape(topic.events ?? topic.metrics?.intel ?? 0)}" /></label>
      </div>
      <div class="topic-modal-actions">
        <button class="btn-line" type="button" data-modal-close>取消</button>
        <button class="btn-main" type="button" id="saveTopicEdit">保存修改</button>
      </div>
    </div>
  `);
  root.querySelector("#saveTopicEdit").addEventListener("click", () => {
    const name = topicFieldValue(root, "name");
    if (!name) {
      showTopicToast("请填写专题名称");
      root.querySelector('[name="name"]')?.focus();
      return;
    }
    const tags = topicFieldValue(root, "tags")
      .split(/[\/,，、\s]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 6);
    saveTopicUpdate(topicId, {
      name,
      desc: topicFieldValue(root, "desc"),
      risk: topicFieldValue(root, "risk"),
      status: topicFieldValue(root, "status"),
      tags,
      keywords: tags,
      owner: topicFieldValue(root, "owner"),
      updateTime: topicFieldValue(root, "updateTime"),
      events: Number(topicFieldValue(root, "events")) || 0,
    });
    closeTopicModal();
    onSave?.();
    showTopicToast("专题修改成功");
  });
}

function openTopicDeleteModal(topicId, onDelete) {
  const topic = findTopicById(topicId);
  if (!topic) return;
  if (topic.canDelete === false) {
    showTopicToast("暂无删除权限");
    return;
  }
  const isActive = topic.status === "进行中";
  const root = createTopicModal(`
    <div class="topic-modal topic-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="topicDeleteTitle">
      <div class="topic-modal-head">
        <h2 id="topicDeleteTitle">删除专题</h2>
        <button class="topic-modal-close" type="button" aria-label="关闭" data-modal-close>×</button>
      </div>
      <div class="topic-confirm-copy">
        <strong>${topicEscape(topic.name)}</strong>
        <p>删除后该专题及其关联配置将不可恢复，是否确认删除？</p>
        ${isActive ? `<div class="topic-confirm-warning">该专题正在进行中，建议先归档或停用后再删除。</div>` : ""}
      </div>
      <div class="topic-modal-actions">
        <button class="btn-line" type="button" data-modal-close>取消</button>
        <button class="btn-danger" type="button" id="confirmTopicDelete">确认删除</button>
      </div>
    </div>
  `);
  root.querySelector("#confirmTopicDelete").addEventListener("click", () => {
    removeTopic(topicId);
    closeTopicModal();
    onDelete?.();
    showTopicToast("专题删除成功");
  });
}

function topicArrayValue(topic, label, fallback = "--") {
  const row = (topic.intelPeople || []).find((item) => item[0] === label);
  return topic[label] || row?.[1] || fallback;
}

function openTopicAuditModal(topicId, onSave) {
  const topic = findTopicById(topicId);
  if (!topic) return;
  const keywords = (topic.keywords || topic.tags || []).join(" / ") || "--";
  const people = topic.people || topicArrayValue(topic, "涉及人物");
  const org = topic.org || topicArrayValue(topic, "涉及组织");
  const root = createTopicModal(`
    <div class="topic-modal topic-audit-modal" role="dialog" aria-modal="true" aria-labelledby="topicAuditTitle">
      <div class="topic-modal-head">
        <h2 id="topicAuditTitle">专题审核</h2>
        <button class="topic-modal-close" type="button" aria-label="关闭" data-modal-close>×</button>
      </div>
      <div class="topic-audit-body">
        <section class="topic-audit-section">
          <div class="topic-audit-title">专题基本信息</div>
          <div class="topic-audit-grid">
            <div><span>专题名称</span><strong>${topicEscape(topic.name)}</strong></div>
            <div><span>专题类型</span><strong>${topicEscape(topic.type)}</strong></div>
            <div><span>创建人</span><strong>${topicEscape(topic.owner || "当前用户")}</strong></div>
            <div><span>提交时间</span><strong>${topicEscape(topic.submitTime || topic.updateTime || topic.time || "--")}</strong></div>
            <div><span>监测周期</span><strong>${topicEscape(topic.cycle || "--")}</strong></div>
            <div><span>风险等级</span><strong>${topicEscape(topic.risk || "中风险")}</strong></div>
            <div class="topic-audit-wide"><span>监测关键词</span><strong>${topicEscape(keywords)}</strong></div>
            <div><span>重点人物</span><strong>${topicEscape(people)}</strong></div>
            <div><span>重点组织</span><strong>${topicEscape(org)}</strong></div>
            <div class="topic-audit-wide"><span>专题描述</span><strong>${topicEscape(topic.desc || "--")}</strong></div>
          </div>
        </section>
        <section class="topic-audit-section">
          <label class="topic-edit-field topic-edit-wide" for="auditOpinion">
            <span>审核意见</span>
            <textarea id="auditOpinion" class="text-area" placeholder="请输入审核意见，审核驳回时必填">${topicEscape(topic.auditOpinion || "")}</textarea>
          </label>
        </section>
      </div>
      <div class="topic-modal-actions">
        <button class="btn-line" type="button" data-modal-close>取消</button>
        <button class="btn-danger btn-danger-outline" type="button" id="rejectTopicAudit">驳回</button>
        <button class="btn-main" type="button" id="approveTopicAudit">审核通过</button>
      </div>
    </div>
  `);
  const opinionInput = root.querySelector("#auditOpinion");
  const completeAudit = (approved) => {
    const opinion = opinionInput.value.trim();
    if (!approved && !opinion) {
      showTopicToast("驳回时请填写审核意见");
      opinionInput.focus();
      return;
    }
    saveTopicUpdate(topicId, {
      auditStatus: approved ? "审核通过" : "审核驳回",
      status: approved ? "进行中" : "未启用",
      auditor: "管理员",
      auditTime: nowDateTime(),
      auditOpinion: opinion || "专题配置完整，监测对象明确，同意启用。",
      updateTime: nowDateTime(),
    });
    closeTopicModal();
    onSave?.();
    showTopicToast(approved ? "审核通过，专题已启用。" : "专题已驳回。");
  };
  root.querySelector("#approveTopicAudit").addEventListener("click", () => completeAudit(true));
  root.querySelector("#rejectTopicAudit").addEventListener("click", () => completeAudit(false));
}

function resubmitTopic(topicId, onSave) {
  saveTopicUpdate(topicId, {
    auditStatus: "待审核",
    status: "待启动",
    submitTime: nowDateTime(),
    auditor: "--",
    auditTime: "--",
    auditOpinion: "",
    updateTime: nowDateTime(),
  });
  onSave?.();
  showTopicToast("专题已重新提交审核");
}

function renderTopicPool() {
  const pageContent = document.getElementById("pageContent");
  const allTopics = getAllTopics();
  const activeCount = allTopics.filter((topic) => topic.status === "进行中").length;
  const pendingAuditCount = allTopics.filter((topic) => topicAuditStatus(topic) === "待审核").length;
  const highRiskCount = allTopics.filter((topic) => topic.risk === "高风险" || topic.risk === "高热").length;
  pageContent.innerHTML = `
    <section class="topic-suite section">
      <div class="section-head">
        <div class="section-title"><span class="title-icon">▣</span>专题池</div>
        <div class="section-actions">
          <a class="btn-line" href="./topic-settings.html">创建专题</a>
        </div>
      </div>
      <div class="stats-grid topic-pool-stats">
        <div class="panel pool-stat-card stat-blue">
          <div class="pool-stat-icon">▦</div>
          <div class="pool-stat-copy"><span>专题总数</span><strong>${allTopics.length}</strong></div>
          <div class="pool-stat-change up">↑ 3</div>
        </div>
        <div class="panel pool-stat-card stat-green">
          <div class="pool-stat-icon">▶</div>
          <div class="pool-stat-copy"><span>进行中专题</span><strong>${activeCount}</strong></div>
          <div class="pool-stat-change up">↑ 2</div>
        </div>
        <div class="panel pool-stat-card stat-orange">
          <div class="pool-stat-icon">＋</div>
          <div class="pool-stat-copy"><span>待审核专题</span><strong>${pendingAuditCount}</strong></div>
          <div class="pool-stat-change down">↓ 1</div>
        </div>
        <div class="panel pool-stat-card stat-red">
          <div class="pool-stat-icon">!</div>
          <div class="pool-stat-copy"><span>高风险专题</span><strong>${highRiskCount}</strong></div>
          <div class="pool-stat-change up">↑ 3</div>
        </div>
      </div>
      <div class="panel toolbar-panel">
        <div class="search-row topic-filter-row">
          <div class="filter-field filter-name">
            <label for="searchInput">专题名称：</label>
            <input id="searchInput" class="text-input" placeholder="请输入" />
          </div>
          <div class="filter-field">
            <label for="statusFilter">运行状态：</label>
            <select id="statusFilter" class="select-input">
              <option value="">全部</option><option value="进行中">进行中</option><option value="待启动">待启动</option><option value="未启用">未启用</option>
            </select>
          </div>
          <div class="filter-field">
            <label for="auditFilter">审核状态：</label>
            <select id="auditFilter" class="select-input">
              <option value="">全部</option><option value="待审核">待审核</option><option value="审核通过">审核通过</option><option value="审核驳回">审核驳回</option>
            </select>
          </div>
          <div class="filter-actions">
            <button id="queryFilters" class="btn-main" type="button">⌕ 查询</button>
            <button id="resetFilters" class="btn-line" type="button">重置</button>
          </div>
        </div>
      </div>
      <div class="panel topic-list-panel">
        <div class="card-head">
          <div class="card-title with-bar">专题列表</div>
          <button class="view-switch" type="button" aria-label="切换视图">▦</button>
        </div>
        <div class="topic-list" id="topicList"></div>
      </div>
      <div class="empty-state" id="emptyState" hidden>当前筛选条件下暂无匹配专题，请调整检索条件后重试。</div>
    </section>
  `;

  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");
  const auditFilter = document.getElementById("auditFilter");
  const topicList = document.getElementById("topicList");
  const emptyState = document.getElementById("emptyState");

  function renderList() {
    const keyword = searchInput.value.trim().toLowerCase();
    const topics = getAllTopics().filter((topic) => {
      const text = [topic.id, topic.name, topic.desc].concat(topic.tags, topic.keywords).join(" ").toLowerCase();
      const auditStatus = topicAuditStatus(topic);
      return (!keyword || text.includes(keyword)) && (!statusFilter.value || topic.status === statusFilter.value) && (!auditFilter.value || auditStatus === auditFilter.value);
    });
    emptyState.hidden = !!topics.length;
    topicList.innerHTML = topics.map((topic) => {
      const canEdit = topic.canEdit !== false;
      const canDelete = topic.canDelete !== false;
      const auditStatus = topicAuditStatus(topic);
      const action = auditStatus === "待审核"
        ? `<button class="btn-main topic-audit-btn" type="button" data-topic-id="${topicEscape(topic.id)}">审核</button>`
        : auditStatus === "审核驳回"
          ? `<button class="btn-main topic-resubmit-btn" type="button" data-topic-id="${topicEscape(topic.id)}">重新提交</button>`
          : `<a class="btn-main topic-report-link" href="./topic-reports.html?id=${encodeURIComponent(topic.id)}" data-topic-id="${topicEscape(topic.id)}">进入专题</a>`;
      return `
      <article class="topic-card">
        <div class="topic-head">
          <div class="topic-name">${topicEscape(topic.name)}</div>
          <div class="topic-labels">
            <span class="topic-tag ${riskClass(topic.risk)}">${topicEscape(topic.risk)}</span>
            <span class="status-tag ${statusClass(topic.status)}">${topicEscape(topic.status || "进行中")}</span>
            <span class="audit-tag ${auditClass(auditStatus)}">${topicEscape(auditStatus)}</span>
          </div>
        </div>
        <div class="topic-desc">${topicEscape(topic.desc)}</div>
        <div class="tags">${renderTopicTags(topic.tags)}</div>
        <div class="topic-info-grid">
          <div><span>创建人</span><strong>${topicEscape(topic.owner || "当前用户")}</strong></div>
          <div><span>更新时间</span><strong>${topicEscape(topic.updateTime || topic.time)}</strong></div>
          <div><span>关联事件数</span><strong>${topicEscape(topic.events ?? topic.metrics?.intel ?? 0)}</strong></div>
        </div>
        <div class="topic-actions">
          <a class="btn-line topic-detail-link" href="./topic-reports.html?id=${encodeURIComponent(topic.id)}" data-topic-id="${topicEscape(topic.id)}">查看详情</a>
          ${action}
          <button class="btn-secondary-blue topic-edit-btn" type="button" data-topic-id="${topicEscape(topic.id)}" ${canEdit ? "" : "disabled"}>修改</button>
          <button class="btn-secondary-red topic-delete-btn" type="button" data-topic-id="${topicEscape(topic.id)}" ${canDelete ? "" : "disabled"}>删除</button>
        </div>
      </article>
    `;
    }).join("");
  }

  [searchInput, statusFilter, auditFilter].forEach((element) => {
    element.addEventListener("input", renderList);
    element.addEventListener("change", renderList);
  });
  document.getElementById("queryFilters").addEventListener("click", renderList);
  document.getElementById("resetFilters").addEventListener("click", () => {
    searchInput.value = "";
    statusFilter.value = "";
    auditFilter.value = "";
    renderList();
  });
  topicList.addEventListener("click", (event) => {
    const detail = event.target.closest(".topic-detail-link");
    const report = event.target.closest(".topic-report-link");
    const audit = event.target.closest(".topic-audit-btn");
    const resubmit = event.target.closest(".topic-resubmit-btn");
    const edit = event.target.closest(".topic-edit-btn");
    const remove = event.target.closest(".topic-delete-btn");
    if (detail) setSelectedTopic(detail.dataset.topicId);
    if (report) setSelectedTopic(report.dataset.topicId);
    if (audit) openTopicAuditModal(audit.dataset.topicId, renderList);
    if (resubmit) resubmitTopic(resubmit.dataset.topicId, renderList);
    if (edit) openTopicEditModal(edit.dataset.topicId, renderList);
    if (remove) openTopicDeleteModal(remove.dataset.topicId, renderList);
  });
  renderList();
}

function renderTopicReport() {
  const pageContent = document.getElementById("pageContent");
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id");
  if (requestedId) setSelectedTopic(requestedId);

  const topicDetailMock = {
    topic001: {
      id: "topic001",
      name: "境外社交平台涉华舆情监测",
      desc: "监测境外社交平台涉我舆论动态及重点话题演化",
      type: "境外舆情",
      risk: "高风险",
      status: "进行中",
      owner: "李警官",
      time: "2025-05-25 09:40",
    },
    "TP-2025-001": {
      id: "TP-2025-001",
      name: "境外社交平台涉华舆情监测",
      desc: "监测境外社交平台涉我舆论动态及重点话题演化",
      type: "境外舆情",
      risk: "高风险",
      status: "进行中",
      owner: "李警官",
      time: "2025-05-25 09:40",
    },
    "TP-2025-002": {
      id: "TP-2025-002",
      name: "热点事件传播链跟踪",
      desc: "跟踪重点热点事件传播路径与关键节点，持续识别跨平台扩散趋势。",
      type: "事件跟踪",
      risk: "中风险",
      status: "进行中",
      owner: "王警官",
      time: "2025-05-25 08:55",
    },
    "TP-2025-003": {
      id: "TP-2025-003",
      name: "重点人员活动专题",
      desc: "关注重点人员公开活动及网络讨论情况，研判关联组织与异常动向。",
      type: "重点人员",
      risk: "高风险",
      status: "进行中",
      owner: "张警官",
      time: "2025-05-24 16:30",
    },
    "TP-2025-004": {
      id: "TP-2025-004",
      name: "人工智能安全议题监测",
      desc: "监测人工智能安全相关政策、技术与舆论动态，识别跨平台讨论热点。",
      type: "人工智能",
      risk: "中风险",
      status: "进行中",
      owner: "刘警官",
      time: "2025-05-24 11:20",
    },
    "TP-2025-005": {
      id: "TP-2025-005",
      name: "重大活动安保舆情专题",
      desc: "围绕重大活动开展舆情监测与风险研判，及时发现异常传播苗头。",
      type: "重大活动",
      risk: "高风险",
      status: "待启动",
      owner: "陈警官",
      time: "2025-05-23 17:05",
    },
    "TP-2025-006": {
      id: "TP-2025-006",
      name: "敏感时段网络动态观察",
      desc: "敏感时段网络舆情与舆论热点随访跟踪总结，沉淀后续对比基线。",
      type: "网络安全",
      risk: "低风险",
      status: "未启用",
      owner: "赵警官",
      time: "2025-05-22 10:10",
    },
  };
  const selectedTopic = topicDetailMock[requestedId] || topicDetailMock[getSelectedTopicId()] || getSelectedTopic() || topicDetailMock.topic001;
  const topic = {
    ...topicDetailMock.topic001,
    ...selectedTopic,
    status: selectedTopic.status === "运行中" ? "进行中" : selectedTopic.status || "进行中",
    events: selectedTopic.events ?? 23,
  };
  const auditStatus = topicAuditStatus(topic);

  const monitorRows = [
    ["美议员就关税政策发文批评中国经济模式", "X（原Twitter）", "美国国会议员发文批评中国通过国家补贴扭曲市场，呼吁盟友采取联合应对措施。", "2025-05-25 10:18"],
    ["外国博主质疑中国高铁安全标准", "Facebook", "多名外国博主在 Facebook 上发布视频，质疑中国高铁建设标准及安全性。", "2025-05-25 09:57"],
    ["关于新疆问题的虚假信息在 YouTube 传播", "YouTube", "部分账号发布不实视频，炒作新疆“强迫劳动”议题，获取较高播放量。", "2025-05-25 09:32"],
    ["Telegram 群组传播涉台分裂言论", "Telegram", "某境外 TG 群组出现煽动台海独立的言论，并鼓动抵制中国企业产品。", "2025-05-25 09:05"],
    ["Reddit 用户发起抵制中国电动车品牌讨论", "Reddit", "Reddit 相关版块出现抵制中国电动车品牌的讨论帖，部分内容被置顶。", "2025-05-25 08:44"],
    ["美媒炒作中国“债务陷阱”相关报道", "X（原Twitter）", "美国媒体账号转载文章，渲染中国对发展中国家“债务陷阱”，引发讨论。", "2025-05-25 08:12"],
  ];
  const reportSummary = [
    "本周（5月19日-5月25日）境外社交平台涉华舆情总体平稳，声量环比下降5.2%，负面情绪占比小幅回落。",
    "美国、英国、澳大利亚等国家账号仍为主要传播来源，围绕中国科技发展、台湾议题的讨论热度较高。",
    "部分西方媒体及政客继续炒作台湾议题，个别加强炒作别有用心的舆论密集讨论，需持续关注潜在风险。",
  ];
  const monitorOverviewStats = [
    ["监测情报总数", "18,742 条", "环比 -5.2% ↓", "情", "blue"],
    ["涉及海外账号数", "6,318 个", "环比 -4.8% ↓", "账", "green"],
    ["平台来源数", "7 个", "环比 +1 ↑", "源", "purple"],
  ];
  const reportTimelineRows = [
    ["05-19 08:45", "X（Twitter）", "美议员涉台言论引发关注", "美国会议员在社交平台发文称将推动“挺台法案”，引发网友讨论，相关话题热度上升。"],
    ["05-20 14:20", "Reddit", "台湾议题在国际论坛被讨论", "多个国际论坛出现关于台海局势的讨论帖，部分用户转载涉政分析文章，讨论热度上升。"],
    ["05-21 09:45", "YouTube", "涉华视频出现虚假信息传播", "个别账号发布涉华不实言论，涉及经济数据与政策解读，相关视频被多次转发与评论。"],
    ["05-22 18:35", "Facebook", "涉华负面文章仍在持续发布", "部分媒体账号发布涉华负面新闻，炒作“产能过剩”等议题，引发评论区对立讨论。"],
    ["05-23 11:10", "X（Twitter）", "海外KOL发布涉华观点帖文", "海外KOL发布对中国科技发展的评论帖文，观点不一，评论区出现激烈对峙。"],
    ["05-24 16:50", "Reddit", "某平台出现煽动性言论扩散", "个别用户发布煽动性言论并获得较高互动，平台已对部分内容进行标注与限制。"],
    ["05-25 10:05", "YouTube", "正向视频内容传播提升", "多段介绍中国科技与文化的视频获得较高播放量，相关正向内容互动量上升。"],
  ];
  const riskJudgements = [
    ["高风险", "科技竞争领域舆论攻势增强", "部分国家借科技竞争议题渲染中美阻断，可能影响国际合作氛围与企业形象。", "high"],
    ["中风险", "台湾等敏感议题引发炒作", "外部势力持续利用台湾议题渲染紧张局势，存在舆论引导与炒作风险。", "medium"],
    ["低风险", "个别虚假信息扩散风险可控", "虚假信息主要集中在个别平台，传播范围有限，整体可控。", "low"],
  ];
  const handlingSuggestions = [
    "加强对重点平台与重点账号的监测，提升预警灵敏度，及时发现异常趋势。",
    "针对不实信息与恶意炒作内容，协调权威媒体与官方渠道加强澄清与正面引导。",
    "加强涉华议题的正向内容供给，扩大优质内容的国际传播影响力。",
  ];

  const monitorRowTemplate = (row) => `
    <tr>
      <td>${topicEscape(row[0])}</td>
      <td>${topicEscape(row[1])}</td>
      <td>${topicEscape(row[2])}</td>
      <td>${topicEscape(row[3])}</td>
      <td><button class="detail-view-btn" type="button">查看</button></td>
    </tr>
  `;
  const bulletListTemplate = (items) => items.map((item) => `<li>${topicEscape(item)}</li>`).join("");
  const monitorOverviewTemplate = (row) => `
    <article class="monitor-stat-card ${topicEscape(row[4])}">
      <div class="monitor-stat-icon">${topicEscape(row[3])}</div>
      <div class="monitor-stat-copy">
        <span>${topicEscape(row[0])}</span>
        <strong>${topicEscape(row[1])}</strong>
        <em>${topicEscape(row[2])}</em>
      </div>
    </article>
  `;
  const timelineRowTemplate = (row) => `
    <tr>
      <td class="timeline-time"><span>${topicEscape(row[0])}</span></td>
      <td><span class="platform-chip">${topicEscape(row[1])}</span></td>
      <td class="timeline-topic">${topicEscape(row[2])}</td>
      <td>${topicEscape(row[3])}</td>
    </tr>
  `;
  const riskRowTemplate = (row) => `
    <div class="risk-judgement-row">
      <span class="risk-level ${topicEscape(row[3])}">${topicEscape(row[0])}</span>
      <div class="risk-copy">
        <strong>${topicEscape(row[1])}</strong>
        <p>${topicEscape(row[2])}</p>
      </div>
    </div>
  `;

  pageContent.innerHTML = `
    <section class="topic-suite topic-detail-page">
      <nav class="detail-breadcrumb" aria-label="面包屑">
        <span>专题监测</span><i>/</i><span>专题库</span><i>/</i><span class="current">专题详情</span>
      </nav>

      <article class="panel topic-detail-card">
        <div class="topic-detail-main">
          <div class="detail-topic-icon" aria-hidden="true">◎</div>
          <div class="detail-topic-copy">
            <div class="detail-title-row">
              <h1>${topicEscape(topic.name)}</h1>
            </div>
            <div class="detail-fields">
              <div><span>专题分类</span><strong class="detail-pill blue">${topicEscape(topic.type)}</strong></div>
              <div><span>风险等级</span><strong class="detail-pill red">${topicEscape(topic.risk)}</strong></div>
              <div><span>运行状态</span><strong class="detail-pill blue">${topicEscape(topic.status)}</strong></div>
              <div><span>创建人</span><strong>${topicEscape(topic.owner || "李警官")}</strong></div>
              <div><span>创建时间</span><strong>${topicEscape(topic.time || "2025-05-25 09:40")}</strong></div>
              <div><span>关联事件数</span><strong>${topicEscape(topic.events)}</strong></div>
            </div>
            <p>${topicEscape(topic.desc || "监测境外社交平台涉我舆论动态及重点话题演化")}</p>
          </div>
        </div>
      </article>

      <article class="panel topic-audit-info-card">
        <div class="card-head">
          <div class="card-title with-bar">审核信息</div>
          <span class="audit-tag ${auditClass(auditStatus)}">${topicEscape(auditStatus)}</span>
        </div>
        <div class="topic-audit-info-grid">
          <div><span>提交时间</span><strong>${topicEscape(topic.submitTime || topic.updateTime || topic.time || "--")}</strong></div>
          <div><span>审核人</span><strong>${topicEscape(auditStatus === "待审核" ? "--" : topic.auditor || "--")}</strong></div>
          <div><span>审核时间</span><strong>${topicEscape(auditStatus === "待审核" ? "--" : topic.auditTime || "--")}</strong></div>
          <div class="audit-opinion"><span>审核意见</span><strong>${topicEscape(auditStatus === "待审核" ? "--" : topic.auditOpinion || "--")}</strong></div>
        </div>
      </article>

      <section class="panel topic-detail-tabs">
          <div class="detail-tabs" role="tablist" aria-label="专题详情内容">
            <button class="detail-tab active" type="button" role="tab" aria-selected="true" data-detail-tab="monitor">监测动态</button>
            <button class="detail-tab" type="button" role="tab" aria-selected="false" data-detail-tab="reports">专题报告</button>
          </div>
        <div class="detail-tab-panel active" id="monitorPanel" role="tabpanel">
          <table class="detail-table monitor-table">
            <thead>
              <tr>
                <th>情报标题</th>
                <th>来源/平台</th>
                <th>情报简要内容</th>
                <th>更新时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>${monitorRows.map(monitorRowTemplate).join("")}</tbody>
          </table>
        </div>
        <div class="detail-tab-panel" id="reportsPanel" role="tabpanel">
          <div class="report-tab-content">
            <section class="report-section report-summary-section">
              <h3 class="report-section-title">报告摘要</h3>
              <ul class="report-bullet-list">${bulletListTemplate(reportSummary)}</ul>
            </section>

            <section class="report-section report-monitor-overview-section">
              <h3 class="report-section-title">监测情报概览</h3>
              <div class="monitor-overview-grid">
                ${monitorOverviewStats.map(monitorOverviewTemplate).join("")}
              </div>
            </section>

            <section class="report-section report-timeline-section">
              <h3 class="report-section-title">事件时间轴</h3>
              <table class="timeline-table">
                <thead>
                  <tr>
                    <th>时间</th>
                    <th>平台</th>
                    <th>事件/话题</th>
                    <th>事件概要</th>
                  </tr>
                </thead>
                <tbody>${reportTimelineRows.map(timelineRowTemplate).join("")}</tbody>
              </table>
            </section>

            <section class="report-section report-risk-section">
              <h3 class="report-section-title">风险研判</h3>
              <div class="risk-judgement-list">${riskJudgements.map(riskRowTemplate).join("")}</div>
            </section>

            <section class="report-section report-suggestion-section">
              <h3 class="report-section-title">处置建议</h3>
              <ul class="report-bullet-list">${bulletListTemplate(handlingSuggestions)}</ul>
            </section>
          </div>
        </div>
      </section>
    </section>
  `;

  document.querySelectorAll(".detail-tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".detail-tab").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", active ? "true" : "false");
      });
      document.querySelectorAll(".detail-tab-panel").forEach((panel) => panel.classList.remove("active"));
      document.getElementById(`${button.dataset.detailTab}Panel`)?.classList.add("active");
    });
  });
}

function renderTopicCreate() {
  const pageContent = document.getElementById("pageContent");
  pageContent.innerHTML = `
    <section class="topic-suite section">
      <div class="section-head"><div class="section-title"><span class="title-icon">＋</span>创建专题</div></div>
      <div class="panel form-shell">
        <div class="card-head"><div class="card-title">专题配置表单</div><div class="card-action">根据关键词、人物、事件与组织建立监测任务</div></div>
        <div class="form-grid">
          ${field("topicName", "专题名称", "input", "请输入专题名称")}
          ${field("topicType", "专题类型", "select", "", ["跨境传播", "网络舆情", "重点人物", "重点组织", "信息外溢", "论坛扩散"])}
          ${field("topicKeywords", "监测关键词", "input", "多个关键词用 / 分隔")}
          ${field("topicPeople", "重点人物", "input", "请输入人物名称")}
          ${field("topicOrg", "重点组织", "input", "请输入组织名称")}
          ${field("topicCycle", "监测周期", "select", "", ["近7日", "近15日", "近30日", "长期跟踪"])}
          <div class="field field-wide"><label for="topicDesc">专题描述</label><textarea id="topicDesc" class="text-area" placeholder="请输入专题监测目标、关注方向与分析重点"></textarea></div>
        </div>
        <div class="helper-grid">
          <div class="helper-card"><strong>研判目标</strong><span>用于描述专题需要长期跟踪的核心问题，便于后续输出专题报告。</span></div>
          <div class="helper-card"><strong>监测对象</strong><span>支持从关键词、人物、组织和事件四个维度组合配置监测条件。</span></div>
          <div class="helper-card"><strong>输出结果</strong><span>提交后将进入专题池待审核，审核通过后启用专题监测。</span></div>
        </div>
        <div class="form-actions"><button id="resetForm" class="btn-line" type="button">重置</button><button id="submitTopic" class="btn-main" type="button">提交审核</button></div>
      </div>
      <div class="result-banner" id="resultBanner">
        <div class="result-copy"><strong id="resultTitle">专题已提交审核</strong><span id="resultText">请等待审核通过后启用。</span></div>
        <div class="result-actions"><a class="btn-line" href="./topic-dynamics.html">返回专题池</a><a class="btn-main" href="./topic-reports.html" id="reportLink">查看专题详情</a></div>
      </div>
    </section>
  `;

  const ids = ["topicName", "topicType", "topicKeywords", "topicPeople", "topicOrg", "topicCycle", "topicDesc"];
  const elements = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
  function resetForm() {
    elements.topicName.value = "";
    elements.topicType.selectedIndex = 0;
    elements.topicKeywords.value = "";
    elements.topicPeople.value = "";
    elements.topicOrg.value = "";
    elements.topicCycle.selectedIndex = 0;
    elements.topicDesc.value = "";
    document.getElementById("resultBanner").classList.remove("is-visible");
  }
  document.getElementById("resetForm").addEventListener("click", resetForm);
  document.getElementById("submitTopic").addEventListener("click", () => {
    const name = elements.topicName.value.trim();
    if (!name) {
      showTopicToast("请先填写专题名称");
      elements.topicName.focus();
      return;
    }
    const keywordText = elements.topicKeywords.value.trim();
    const peopleText = elements.topicPeople.value.trim();
    const orgText = elements.topicOrg.value.trim();
    if (!keywordText && !peopleText && !orgText) {
      showTopicToast("监测关键词、重点人物、重点组织至少填写一项");
      elements.topicKeywords.focus();
      return;
    }
    if (!elements.topicDesc.value.trim()) {
      showTopicToast("请填写专题描述");
      elements.topicDesc.focus();
      return;
    }
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const tags = (keywordText || `${elements.topicType.value}/专题监测/${peopleText || orgText || "综合分析"}`).split("/").map((item) => item.trim()).filter(Boolean).slice(0, 3);
    const topic = {
      id: `TP-${now.getFullYear()}-${String(now.getTime()).slice(-6)}`,
      name,
      type: elements.topicType.value,
      time: date,
      updateTime: nowDateTime(),
      owner: "创建人 / 当前用户",
      cycle: elements.topicCycle.value,
      risk: elements.topicType.value === "重点人物" || elements.topicType.value === "重点组织" ? "高风险" : "中风险",
      status: "待启动",
      auditStatus: "待审核",
      submitTime: nowDateTime(),
      auditor: "--",
      auditTime: "--",
      auditOpinion: "",
      desc: elements.topicDesc.value.trim(),
      tags,
      keywords: tags,
      people: peopleText || "--",
      org: orgText || "--",
      events: 0,
      metrics: { intel: 86, people: 5, nodes: 12 },
      trend: [26, 34, 39, 47, 56, 62, 69],
      overview: [["监测情报总量", "86 条"], ["涉及重点人物", "5 人"], ["重点传播节点", "12 个"], ["当前态势", "专题已创建，系统将持续聚合后续监测结果"]],
      timeline: [[`${date} 09:10`, "专题创建完成，系统开始聚合历史与实时情报。"], [`${date} 10:25`, "根据关键词与对象条件完成第一轮关联分析。"], [`${date} 12:10`, "专题报告草稿已准备，可进入报告页查看。"]],
      opinions: [["主要观点一", "当前传播观点仍以基础信息扩散为主。"], ["主要观点二", "需关注重点对象与外围账号的联动放大作用。"]],
      nodes: [["核心平台", "初步识别为主要信息扩散入口"], ["关联账号", "存在连续转发与互动放大现象"]],
      intelPeople: [["涉及情报", "系统将持续聚合与该专题相关的新增情报。"], ["涉及人物", peopleText || "暂未指定固定重点人物，采用关联识别模式。"], ["涉及组织", orgText || "暂未指定固定重点组织，采用综合聚合模式。"]],
      conclusions: ["专题配置已完成，后续应重点关注相关议题是否出现跨平台联动增长。", "建议在专题运行初期优先跟踪首发平台和高频转述账号的结构变化。"],
    };
    const extra = JSON.parse(localStorage.getItem("topicSuiteExtraTopics") || "[]");
    extra.unshift(topic);
    localStorage.setItem("topicSuiteExtraTopics", JSON.stringify(extra));
    setSelectedTopic(topic.id);
    showTopicToast("专题已提交审核，请等待审核通过后启用。");
    document.getElementById("resultTitle").textContent = `专题《${topic.name}》已提交审核`;
    document.getElementById("resultText").textContent = "专题已提交审核，请等待审核通过后启用。";
    document.getElementById("resultBanner").classList.add("is-visible");
    window.setTimeout(() => {
      window.location.href = "./topic-dynamics.html";
    }, 900);
  });
}

function innerCard(title, id, cls = "bullet-list") {
  return `<div class="inner-card"><div class="inner-title">${title}</div><div class="${cls}" id="${id}"></div></div>`;
}

function statCards(topic) {
  return [
    ["监测情报总量", topic.metrics.intel, "报告已同步专题最新聚合结果", "blue"],
    ["涉及重点人物", topic.metrics.people, "当前专题重点对象持续跟踪中", "cyan"],
    ["传播节点数量", topic.metrics.nodes, "重点传播链路已识别", "orange"],
    ["当前热度等级", topic.risk, "报告结论可直接支撑研判", "green"],
  ].map(([label, value, desc, tone]) => `<div class="panel stat-card ${tone}"><div class="stat-top"><div class="stat-label">${label}</div><div class="stat-icon">●</div></div><div class="stat-value">${topicEscape(value)}</div><div class="stat-desc">${desc}</div></div>`).join("");
}

function renderBulletList(id, rows) {
  document.getElementById(id).innerHTML = (rows || []).map(([label, value]) => `<div class="bullet-item"><strong>${topicEscape(label)}</strong><span>${topicEscape(value)}</span></div>`).join("");
}

function renderTimeline(id, rows) {
  document.getElementById(id).innerHTML = (rows || []).map(([time, text]) => `<div class="timeline-item"><time>${topicEscape(time)}</time><span>${topicEscape(text)}</span></div>`).join("");
}

function renderTrend(id, values) {
  const max = Math.max(...values);
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${100 - (value / max) * 82}`).join(" ");
  document.getElementById(id).innerHTML = `<svg class="topic-line-chart" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="${points}"></polyline></svg>`;
}

function field(id, label, type, placeholder, options = []) {
  if (type === "select") return `<div class="field"><label for="${id}">${label}</label><select id="${id}" class="select-input">${options.map((item) => `<option>${item}</option>`).join("")}</select></div>`;
  return `<div class="field"><label for="${id}">${label}</label><input id="${id}" class="text-input" placeholder="${placeholder}" /></div>`;
}

(function initTopicSuite() {
  const page = document.body.dataset.page;
  if (page === "topic-dynamics") renderTopicPool();
  if (page === "topic-reports") renderTopicReport();
  if (page === "topic-settings") renderTopicCreate();
})();
