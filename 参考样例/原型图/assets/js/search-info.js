let pageContent;

const intelligenceResults = [
  {
    id: 1,
    title: "伊朗导弹袭击以色列特拉维夫，多地传出爆炸声",
    source: "新华社",
    time: "2025-05-24 09:58",
    type: "新闻",
    summary: "当地时间5月24日凌晨，伊朗对以色列发动新一轮导弹袭击，特拉维夫及周边地区传出巨大爆炸声，相关防空系统已启动拦截。",
    content:
      "多方信源显示，袭击发生后以色列中部多地拉响防空警报，特拉维夫、拉马特甘等区域有爆炸声传出。当地应急部门已启动现场排查，交通与能源基础设施维持高度戒备。研判认为，本轮导弹袭击可能推动地区军事对抗升级，并进一步影响周边国家安全态势。",
    tags: ["中东局势", "导弹袭击", "伊朗", "以色列"],
    relevance: 98,
    followed: false,
    tone: "tone-fire",
    originalUrl: "https://example.org/intelligence/iran-missile-1",
  },
  {
    id: 2,
    title: "伊朗伊斯兰革命卫队：对以色列发动“真实承诺3”行动",
    source: "央视新闻",
    time: "2025-05-24 09:41",
    type: "新闻",
    summary: "伊朗伊斯兰革命卫队发表声明称，针对以色列的军事行动已经开始，将持续打击以色列相关军事目标。",
    content:
      "革命卫队声明强调，行动目标集中在军事设施与相关指挥节点。地区观察人士认为，该声明意在强化对外威慑，同时为后续谈判或冲突管控保留空间。当前多个国际组织呼吁相关方保持克制。",
    tags: ["军事行动", "革命卫队", "中东冲突"],
    relevance: 96,
    followed: false,
    tone: "tone-fire",
    originalUrl: "https://example.org/intelligence/irgc-operation-3",
  },
  {
    id: 3,
    title: "国际原子能机构：伊朗核设施目前未发现放射性泄漏",
    source: "路透社",
    time: "2025-05-24 08:32",
    type: "新闻",
    summary: "国际原子能机构表示，截至目前，伊朗核设施未出现放射性泄漏迹象，但局势仍高度紧张。",
    content:
      "国际原子能机构持续监测伊朗关键核设施运行状态，并与地区相关方保持沟通。初步信息显示，当前未发现放射性泄漏迹象，但部分设施周边的安全管控级别已提高。核设施安全仍是本轮冲突外溢风险中的重点变量。",
    tags: ["IAEA", "核设施", "核安全"],
    relevance: 95,
    followed: false,
    tone: "tone-map",
    originalUrl: "https://example.org/intelligence/iaea-nuclear-safety",
  },
  {
    id: 4,
    title: "伊朗民众在德黑兰街头集会，反对以色列军事行动",
    source: "半岛电视台",
    time: "2025-05-24 07:20",
    type: "社交媒体",
    summary: "数千名伊朗民众在德黑兰革命广场集会，抗议以色列对伊朗的军事打击，现场高呼反美反以口号。",
    content:
      "社交平台视频显示，德黑兰市中心出现大规模集会，现场标语与口号集中指向以色列军事行动。舆情样本中民族主义情绪和安全焦虑同步上升，相关话题在多个平台形成二次传播。",
    tags: ["德黑兰", "集会", "舆情反应"],
    relevance: 93,
    followed: false,
    tone: "tone-night",
    originalUrl: "https://example.org/intelligence/tehran-rally",
  },
  {
    id: 5,
    title: "IAEA总干事：正密切关注伊朗局势，将与各方保持沟通",
    source: "国际原子能机构",
    time: "2025-05-24 06:15",
    type: "官方公告",
    summary: "IAEA总干事表示，正在密切关注伊朗局势发展，将与相关各方保持沟通，确保核设施安全。",
    content:
      "公告称，机构已要求相关成员方及时通报可能影响核设施安全的信息。后续关注重点包括关键设施周边军事活动、应急响应准备和国际监督机制的连续性。",
    tags: ["国际机构", "核安全", "伊朗局势"],
    relevance: 92,
    followed: false,
    tone: "tone-org",
    originalUrl: "https://example.org/intelligence/iaea-director-statement",
  },
  {
    id: 6,
    title: "霍尔木兹海峡航运风险升高，能源市场波动加剧",
    source: "彭博社",
    time: "2025-05-24 05:48",
    type: "新闻资讯",
    summary: "受中东局势影响，霍尔木兹海峡周边航运安全风险升高，国际油价和能源供应链受到市场关注。",
    content:
      "航运机构提示称，霍尔木兹海峡周边通行风险升高，部分船运公司开始调整航线与保险策略。能源交易市场对供应链中断风险的敏感度上升，油价短线波动明显扩大。",
    tags: ["霍尔木兹海峡", "能源安全", "航运风险"],
    relevance: 90,
    followed: false,
    tone: "tone-sea",
    originalUrl: "https://example.org/intelligence/hormuz-shipping-risk",
  },
];

function renderInfoSearchPage() {
  const keyword = new URLSearchParams(location.search).get("keyword") || "伊朗 战争";
  pageContent.innerHTML = `
    <section class="info-query-page">
      <header class="page-header">
        <div>
          <div class="breadcrumb">首页 / 信息查询 / <span>信息查询</span></div>
          <h1>信息查询</h1>
          <p>围绕开源情报动态进行全文检索、分类统计和辅助研判。</p>
        </div>
      </header>

      <section class="card query-bar">
        <div class="query-row">
          <select class="control" id="searchType" aria-label="检索类型">
            <option>全文检索</option>
            <option>标题检索</option>
            <option>正文检索</option>
            <option>发布者检索</option>
            <option>账号检索</option>
            <option>URL检索</option>
          </select>
          <div class="query-input">
            <input class="control" id="keywordInput" value="${escapeHtml(keyword)}" placeholder="请输入关键词、人物、组织、事件、账号、网址" />
          </div>
          <button class="btn primary" id="searchBtn" type="button">搜索</button>
          <a class="btn" href="./advanced-search.html">高级搜索</a>
          <button class="btn" id="filterBtn" type="button">筛选</button>
        </div>
        <div class="chip-row" id="chipRow">
          <span class="filter-chip">关键词：${escapeHtml(keyword)}</span>
          <span class="filter-chip">时间：近7天</span>
          <span class="filter-chip">主题：中东局势</span>
        </div>
      </section>

      <section class="query-main">
        <section class="card result-panel">
          <div class="result-toolbar">
            <div class="result-tools">
              <select class="control" id="sortSelect" aria-label="排序方式">
                <option>综合排序</option>
                <option>按发布时间排序</option>
                <option>按相关度排序</option>
                <option>按热度排序</option>
                <option>按来源权重排序</option>
              </select>
              <span class="result-count" id="resultCount">共找到 12,846 条结果</span>
            </div>
            <div class="view-tools">
              <button class="btn" type="button">列表视图</button>
              <button class="btn" id="refreshBtn" type="button">刷新</button>
            </div>
          </div>
          <div class="result-list" id="resultList">${renderResultCards()}</div>
          <div class="pagination query-pagination">
            <span>共 12,846 条</span>
            <div class="pager-pages">
              <button class="page-btn" type="button">‹</button>
              <button class="page-btn" type="button">1</button>
              <button class="page-btn" type="button">2</button>
              <button class="page-btn" type="button">3</button>
              <button class="page-btn" type="button">4</button>
              <button class="page-btn" type="button">5</button>
              <span>...</span>
              <button class="page-btn" type="button">643</button>
              <button class="page-btn" type="button">›</button>
            </div>
            <div class="pager-extra">
              <select class="control" aria-label="每页条数"><option>20 条/页</option><option>50 条/页</option></select>
              <span>跳至</span>
              <input class="control" value="1" style="width:64px" aria-label="跳转页码" />
              <span>页</span>
            </div>
          </div>
        </section>

      </section>
    </section>
    ${renderFilterDrawer()}
    <div class="toast" id="toast">已加入关注动态</div>
  `;
  bindSearchPageEvents();
}

function renderResultCards() {
  return intelligenceResults
    .map(
      (item, index) => `
        <article class="result-card" data-id="${item.id}">
          <span class="result-index">${index + 1}</span>
          <a class="result-thumb ${item.tone}" href="./info-detail.html?id=${item.id}" aria-label="查看情报详情"><span>${item.source.slice(0, 2)}</span></a>
          <div class="result-body">
            <div class="result-title-row">
              <a class="result-title" href="./info-detail.html?id=${item.id}">${item.title}</a>
              <span class="relevance-tag">相关度：${item.relevance}%</span>
            </div>
            <div class="result-meta">
              <span>${item.source}</span>
              <time>${item.time}</time>
              <span class="tag low">${item.type}</span>
            </div>
            <p class="result-summary">${item.summary}</p>
            <div class="result-bottom">
              <div class="tag-list">${renderTags(item.tags)}</div>
              <div class="result-actions">
                <a class="btn" href="./info-detail.html?id=${item.id}">查看详情</a>
                <button class="btn primary follow-btn ${item.followed ? "followed" : ""}" type="button" data-follow="${item.id}">
                  ${item.followed ? "已关注" : "加入关注"}
                </button>
              </div>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderTags(tags) {
  return tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
}

function renderFilterDrawer() {
  return `
    <div class="info-filter-mask" id="filterMask">
      <aside class="info-filter-drawer" aria-label="筛选详情">
        <div class="filter-head">
          <h2>筛选详情</h2>
          <button class="drawer-close" id="filterClose" type="button">×</button>
        </div>
        <div class="filter-body">
          ${renderFilterGroup("排序方式", ["综合排序", "按发布时间排序", "按相关度排序"])}
          ${renderFilterGroup("文章类型", ["新闻资讯", "社交媒体", "论坛贴文", "官方公告"])}
          ${renderFilterGroup("多媒体类型", ["图文", "视频", "直播切片", "长文本"])}
          ${renderFilterGroup("信源", ["新华社", "央视新闻", "路透社", "半岛电视台"])}
          ${renderFilterGroup("国家/地区", ["美国", "法国", "英国", "俄罗斯"])}
          ${renderFilterGroup("发布时间", ["24小时内", "近3天", "近7天", "近30天"])}
          ${renderFilterGroup("业务属性标签", ["中东局势", "导弹袭击", "核设施安全", "能源安全"])}
        </div>
        <div class="filter-footer">
          <button class="btn" id="resetFilter" type="button">重置</button>
          <button class="btn primary" id="applyFilter" type="button">应用筛选</button>
        </div>
      </aside>
    </div>
  `;
}

function renderFilterGroup(title, options) {
  return `
    <div class="filter-group">
      <label>${title}</label>
      <div class="checkbox-grid">
        ${options.map((option) => `<label><input type="checkbox" value="${option}" />${option}</label>`).join("")}
      </div>
    </div>
  `;
}

function bindSearchPageEvents() {
  const keywordInput = document.getElementById("keywordInput");
  const filterMask = document.getElementById("filterMask");
  const toast = document.getElementById("toast");

  const runSearch = () => {
    const keyword = keywordInput.value.trim() || "伊朗 战争";
    document.getElementById("chipRow").innerHTML = `
      <span class="filter-chip">关键词：${escapeHtml(keyword)}</span>
      <span class="filter-chip">时间：近7天</span>
      <span class="filter-chip">主题：中东局势</span>
    `;
    document.getElementById("resultCount").textContent = `共找到 12,846 条结果，已按“${keyword}”刷新`;
  };

  document.getElementById("searchBtn").addEventListener("click", runSearch);
  document.getElementById("refreshBtn").addEventListener("click", runSearch);
  keywordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") runSearch();
  });

  document.getElementById("filterBtn").addEventListener("click", () => filterMask.classList.add("open"));
  document.getElementById("filterClose").addEventListener("click", () => filterMask.classList.remove("open"));
  filterMask.addEventListener("click", (event) => {
    if (event.target === filterMask) filterMask.classList.remove("open");
  });
  document.getElementById("resetFilter").addEventListener("click", () => {
    filterMask.querySelectorAll("input[type='checkbox']").forEach((input) => {
      input.checked = false;
    });
  });
  document.getElementById("applyFilter").addEventListener("click", () => {
    const selected = Array.from(filterMask.querySelectorAll("input:checked")).map((input) => input.value);
    const chips = selected.slice(0, 5).map((item) => `<span class="filter-chip">${item}</span>`).join("");
    document.getElementById("chipRow").innerHTML = chips || `<span class="filter-chip">关键词：${escapeHtml(keywordInput.value || "伊朗 战争")}</span>`;
    filterMask.classList.remove("open");
  });

  pageContent.addEventListener("click", (event) => {
    const followButton = event.target.closest("[data-follow]");
    if (followButton) {
      const item = intelligenceResults.find((row) => row.id === Number(followButton.dataset.follow));
      item.followed = !item.followed;
      followButton.textContent = item.followed ? "已关注" : "加入关注";
      followButton.classList.toggle("followed", item.followed);
      followButton.classList.toggle("primary", !item.followed);
      showToast(toast, item.followed ? "已加入关注动态" : "已取消关注");
      return;
    }

  });
}

function renderInfoDetailPage() {
  const id = Number(new URLSearchParams(location.search).get("id") || 1);
  const item = intelligenceResults.find((row) => row.id === id);
  if (!item) {
    pageContent.innerHTML = `<section class="card not-found">未找到对应情报。<a class="btn" href="./search-info.html">返回信息查询</a></section>`;
    return;
  }

  pageContent.innerHTML = `
    <section class="info-detail-page">
      <header class="page-header">
        <div>
          <div class="breadcrumb">首页 / 信息查询 / <span>情报详情</span></div>
          <h1>情报详情</h1>
          <p>查看原始情报内容、命中关键词、业务标签与研判摘要。</p>
        </div>
        <div>
          <a class="btn" href="./search-info.html">返回列表</a>
          <button class="btn primary" id="detailFollow" type="button">加入关注</button>
        </div>
      </header>

      <div class="detail-layout">
        <article class="card detail-card">
          <div class="result-meta">
            <span class="source-mark">${item.source.slice(0, 1)}</span>
            <span class="tag low">${item.type}</span>
            <span class="relevance-tag">相关度：${item.relevance}%</span>
          </div>
          <h2 class="detail-title">${item.title}</h2>
          <div class="detail-meta">
            <span>来源：${item.source}</span>
            <span>发布时间：${item.time}</span>
            <span>原文链接：${item.originalUrl}</span>
          </div>
          <div class="tag-list">${renderTags(item.tags)}</div>

          <section class="detail-section">
            <h2>摘要</h2>
            <p>${item.summary}</p>
          </section>
          <section class="detail-section">
            <h2>正文片段</h2>
            <p>${item.content}</p>
          </section>
          <section class="detail-section">
            <h2>研判提示</h2>
            <p>该情报与“伊以冲突”“中东局势”“核设施安全”等专题高度相关，建议纳入地区安全态势持续跟踪，并与航运风险、能源市场波动等外围指标联动观察。</p>
          </section>
        </article>

        <aside class="card detail-card">
          <div class="analysis-head"><h2>情报属性</h2></div>
          <div class="detail-side-list">
            <div class="detail-field"><span>情报编号</span><strong>OSINT-${String(item.id).padStart(4, "0")}</strong></div>
            <div class="detail-field"><span>采集渠道</span><strong>开源媒体监测</strong></div>
            <div class="detail-field"><span>命中关键词</span><strong>${item.tags.join("、")}</strong></div>
            <div class="detail-field"><span>风险提示</span><strong>关注冲突升级与外溢风险</strong></div>
            <div class="detail-field"><span>处理状态</span><strong>待研判复核</strong></div>
          </div>
        </aside>

        <aside class="card detail-card translation-card">
          <div class="analysis-head"><h2>多语言处理</h2></div>
          <div class="translation-controls">
            <select class="control" id="sourceLang" aria-label="源语言">
              <option value="zh">中文</option>
              <option value="en">英文</option>
              <option value="ko">韩文</option>
            </select>
            <span class="translation-arrow">→</span>
            <select class="control" id="targetLang" aria-label="目标语言">
              <option value="zh">中文</option>
              <option value="en">英文</option>
              <option value="ko">韩文</option>
            </select>
            <button class="btn primary" id="translateBtn" type="button">翻译</button>
          </div>
          <div class="translation-content">
            <textarea class="control" id="sourceText" placeholder="请输入源语言内容" rows="8"></textarea>
            <textarea class="control" id="targetText" placeholder="处理结果将在此显示" rows="8"></textarea>
          </div>
        </aside>
      </div>
    </section>
    <div class="toast" id="toast">已加入关注动态</div>
  `;

  const button = document.getElementById("detailFollow");
  const toast = document.getElementById("toast");
  button.addEventListener("click", () => {
    item.followed = !item.followed;
    button.textContent = item.followed ? "已关注" : "加入关注";
    button.classList.toggle("followed", item.followed);
    button.classList.toggle("primary", !item.followed);
    showToast(toast, item.followed ? "已加入关注动态" : "已取消关注");
  });

  const translateBtn = document.getElementById("translateBtn");
  const sourceText = document.getElementById("sourceText");
  const targetText = document.getElementById("targetText");
  const sourceLang = document.getElementById("sourceLang");
  const targetLang = document.getElementById("targetLang");

  if (translateBtn) {
    translateBtn.addEventListener("click", async () => {
      const text = sourceText.value.trim();
      if (!text) {
        showToast(toast, "请输入要处理的内容");
        return;
      }
      if (sourceLang.value === targetLang.value) {
        showToast(toast, "源语言和目标语言不能相同");
        return;
      }
      translateBtn.disabled = true;
      translateBtn.textContent = "处理中...";
      try {
        const translated = await translateText(text, sourceLang.value, targetLang.value);
        targetText.value = translated;
      } catch (e) {
        showToast(toast, "处理失败，请稍后重试");
      } finally {
        translateBtn.disabled = false;
        translateBtn.textContent = "翻译";
      }
    });
  }
}

async function translateText(text, source, target) {
  const langNames = { zh: "中文", en: "英文", ko: "韩文" };
  await new Promise((resolve) => setTimeout(resolve, 800));
  return `[${langNames[source]}→${langNames[target]}] ${text}（模拟处理结果）`;
}

function renderAdvancedSearchPage() {
  pageContent.innerHTML = `
    <section class="info-detail-page">
      <header class="page-header">
        <div>
          <div class="breadcrumb">首页 / 信息查询 / <span>高级搜索</span></div>
          <h1>高级搜索</h1>
          <p>组合关键词、布尔逻辑和业务标签，形成可复用检索方案。</p>
        </div>
        <a class="btn" href="./search-info.html">返回信息查询</a>
      </header>
      <div class="detail-layout">
        <section class="card detail-card">
          <div class="filter-body" style="padding:0">
            <div class="filter-group"><label>检索表达式</label><input class="control" value="（伊朗战争 AND 伊以冲突）AND（导弹袭击 OR 无人机袭击）AND 霍尔木兹海峡 NOT 体育" /></div>
            <div class="filter-group"><label>关键词</label><input class="control" value="伊朗战争 伊以冲突 中东局势" /></div>
            <div class="filter-group"><label>精确短语</label><input class="control" value="核设施安全" /></div>
            <div class="filter-group"><label>排除词</label><input class="control" value="体育 娱乐" /></div>
            ${renderFilterGroup("布尔逻辑", ["AND", "OR", "NOT"])}
            ${renderFilterGroup("业务属性标签", ["导弹袭击", "核设施安全", "能源安全", "地区安全"])}
          </div>
        </section>
        <aside class="card detail-card">
          <div class="analysis-head"><h2>条件预览</h2></div>
          <div class="detail-side-list">
            <div class="detail-field"><span>预计结果</span><strong>8,436 条</strong></div>
            <div class="detail-field"><span>主要来源</span><strong>新闻资讯、官方公告</strong></div>
            <div class="detail-field"><span>时间范围</span><strong>近7天</strong></div>
            <div class="detail-field"><span>重点主题</span><strong>中东局势、核设施安全</strong></div>
          </div>
          <div class="result-actions" style="margin-top:16px;justify-content:flex-end">
            <a class="btn" href="./advanced-search.html">重置</a>
            <a class="btn" href="./search-info.html?keyword=%E4%BC%8A%E6%9C%97%E6%88%98%E4%BA%89">保存方案</a>
            <a class="btn primary" href="./search-info.html?keyword=%E4%BC%8A%E6%9C%97%E6%88%98%E4%BA%89">开始搜索</a>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function showToast(toast, text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1500);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

(function () {
  pageContent = document.getElementById("pageContent");
  if (!pageContent) return;

  const view = document.body.dataset.view || "search-list";
  if (view === "info-detail") {
    renderInfoDetailPage();
    return;
  }
  if (view === "advanced-search") {
    renderAdvancedSearchPage();
    return;
  }
  renderInfoSearchPage();
})();
