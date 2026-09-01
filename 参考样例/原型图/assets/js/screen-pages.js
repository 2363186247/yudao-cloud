(function () {
  const pageKey = document.body.dataset.page;
  const pageContent = document.getElementById("pageContent");
  if (!pageContent) return;

  const formatTime = () => {
    const now = new Date();
    const pad = (value) => String(value).padStart(2, "0");
    const weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][now.getDay()];
    return {
      date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
      time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
      weekday,
    };
  };

  function renderSparkline(color = "#15c9ff") {
    return `
      <div class="screen-sparkline">
        <svg viewBox="0 0 132 52" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sparkFill${color.replace("#", "")}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${color}" stop-opacity="0.34" />
              <stop offset="1" stop-color="${color}" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 43 L12 39 L23 41 L35 30 L47 34 L58 24 L70 28 L82 17 L94 23 L106 12 L119 19 L132 16 L132 52 L0 52 Z" fill="url(#sparkFill${color.replace("#", "")})" />
          <polyline points="0,43 12,39 23,41 35,30 47,34 58,24 70,28 82,17 94,23 106,12 119,19 132,16" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" />
          <circle cx="106" cy="12" r="3" fill="${color}" />
        </svg>
      </div>
    `;
  }

  function renderKpis() {
    const cards = [
      ["◎", "目标总数", "12,845", "较昨日", "8.4%", "#15c9ff", false],
      ["人", "境外人员数", "6,328", "较昨日", "5.8%", "#19d2d0", false],
      ["情", "情报总数", "98,732", "较昨日", "12.6%", "#6f8cff", false],
      ["警", "预警总数", "3,276", "较昨日", "15.3%", "#ff9200", true],
    ];

    return `
      <section class="screen-kpi-grid">
        ${cards.map(([icon, label, value, prefix, change, color, warning]) => `
          <article class="screen-kpi-card ${warning ? "is-warning" : ""}">
            <div class="screen-kpi-icon">${icon}</div>
            <div>
              <div class="screen-kpi-label">${label}</div>
              <div class="screen-kpi-value">${value}</div>
              <div class="screen-kpi-trend">${prefix} <span class="${warning ? "screen-hot" : "screen-up"}">↑ ${change}</span></div>
            </div>
            ${renderSparkline(color)}
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderTargets() {
    const rows = [
      ["阿", "亚历山大·科尔文", 86, "1,287"],
      ["林", "林嘉豪", 74, "986"],
      ["卡", "卡里姆·侯赛因", 72, "872"],
      ["伊", "伊莲娜·桑切斯", 69, "645"],
      ["陈", "陈志远", 61, "317"],
      ["米", "米哈伊尔·伊万诺夫", 58, "421"],
      ["索", "索菲亚·德拉科娃", 54, "276"],
      ["阿", "阿里·本·萨利姆", 49, "198"],
      ["罗", "罗伯特·安德森", 46, "164"],
      ["娜", "娜塔莉亚·彼得洛娃", 43, "138"],
    ];

    return `
      <section class="screen-panel">
        <div class="screen-panel-head">
          <div class="screen-panel-title"><i>⊕</i>重点目标</div>
          <span class="screen-more">更多 ></span>
        </div>
        <div class="screen-target-table">
          <div class="screen-target-row is-head"><span>头像</span><span>姓名</span><span>风险值</span><span>动态</span></div>
          ${rows.map(([avatar, name, risk, dynamic]) => `
            <div class="screen-target-row">
              <span class="screen-avatar">${avatar}</span>
              <span class="screen-name">${name}</span>
              <span class="screen-risk">${risk}</span>
              <span class="screen-dynamic">${dynamic}</span>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderTrendChart() {
    return `
      <section class="screen-panel screen-trend-panel">
        <div class="screen-panel-head">
          <div class="screen-panel-title"><i>⌁</i>总体动态趋势</div>
          <div class="screen-tabs"><span>近24小时</span><span class="active">近7日</span><span>近30日</span><span>自定义</span></div>
        </div>
        <div class="screen-legend">
          <span class="blue"><i></i>动态总数</span>
          <span class="orange"><i></i>敏感动态数</span>
          <span class="cyan"><i></i>本地情报数</span>
        </div>
        <div class="screen-line-chart">
          <svg viewBox="0 0 720 250" preserveAspectRatio="none" aria-label="总体动态趋势折线图">
            <defs>
              <linearGradient id="trendBlueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#156fff" stop-opacity="0.48" />
                <stop offset="1" stop-color="#156fff" stop-opacity="0.02" />
              </linearGradient>
            </defs>
            <g fill="#9fb9d8" font-size="11">
              <text x="14" y="30">25,000</text><text x="23" y="84">20,000</text><text x="23" y="138">15,000</text><text x="23" y="192">10,000</text><text x="36" y="236">0</text>
              <text x="86" y="244">05-14</text><text x="190" y="244">05-15</text><text x="294" y="244">05-16</text><text x="398" y="244">05-17</text><text x="502" y="244">05-18</text><text x="606" y="244">05-19</text><text x="682" y="244">05-20</text>
            </g>
            <path d="M70 96 L174 72 L278 94 L382 58 L486 44 L590 34 L694 26 L694 228 L70 228 Z" fill="url(#trendBlueFill)" />
            <polyline points="70,96 174,72 278,94 382,58 486,44 590,34 694,26" fill="none" stroke="#5a9cff" stroke-width="2.5" />
            <polyline points="70,188 174,184 278,188 382,180 486,174 590,168 694,162" fill="none" stroke="#ff9300" stroke-width="2.5" />
            <polyline points="70,210 174,208 278,209 382,204 486,200 590,195 694,190" fill="none" stroke="#18d8d4" stroke-width="2.5" />
            <g fill="#ffffff" font-size="11">
              <text x="64" y="84">14,562</text><text x="166" y="60">81,034</text><text x="270" y="82">76,231</text><text x="374" y="46">88,145</text><text x="478" y="32">92,673</text><text x="582" y="22">96,184</text><text x="674" y="16">98,732</text>
            </g>
          </svg>
        </div>
      </section>
    `;
  }

  function renderHotWords() {
    const words = [
      ["网络攻击", "size-xl", ""], ["人工智能", "size-lg", ""], ["数据泄露", "size-lg", "orange"],
      ["经济制裁", "size-md", "green"], ["能源安全", "size-md", ""], ["供应链", "size-md", ""],
      ["舆论波动", "size-md", "orange"], ["技术势力", "size-md", "green"], ["社媒扩散", "size-md", ""],
      ["数据利用", "size-md", "orange"], ["供应安全", "size-md", ""], ["数据监测", "size-md", ""],
    ];
    const positions = [
      "left:36%;top:36%", "left:36%;top:13%", "left:43%;top:70%", "left:69%;top:27%",
      "left:69%;top:50%", "left:12%;top:20%", "left:16%;top:70%", "left:20%;top:56%",
      "left:58%;top:14%", "left:26%;top:78%", "left:10%;top:42%", "left:70%;top:10%",
    ];

    return `
      <section class="screen-panel">
        <div class="screen-panel-head">
          <div class="screen-panel-title"><i>✺</i>高频热词</div>
          <span class="screen-more">更多 ></span>
        </div>
        <div class="screen-cloud">
          ${words.map(([word, size, tone], index) => `<span class="${size} ${tone}" style="${positions[index]}">${word}</span>`).join("")}
        </div>
      </section>
    `;
  }

  function renderRegions() {
    const rows = [
      ["1", "中东地区", 96, "2,341", "18.7%", false],
      ["2", "东南亚地区", 78, "1,876", "14.2%", false],
      ["3", "欧洲地区", 68, "1,642", "9.6%", false],
      ["4", "东亚地区", 52, "1,257", "11.3%", false],
      ["5", "北美地区", 44, "1,098", "6.3%", false],
      ["6", "南美地区", 30, "782", "2.1%", true],
    ];

    return `
      <section class="screen-panel">
        <div class="screen-panel-head">
          <div class="screen-panel-title"><i>◉</i>今日活跃地缘</div>
          <span class="screen-more">更多 ></span>
        </div>
        <div class="screen-region-list">
          ${rows.map(([rank, area, width, count, change, down]) => `
            <div class="screen-region-row">
              <span class="screen-rank ${rank <= 3 ? "top" : ""}">${rank}</span>
              <span>${area}</span>
              <span class="screen-bar"><i style="width:${width}%"></i></span>
              <span>${count}</span>
              <span class="screen-change ${down ? "down" : ""}">${down ? "↓" : "↑"} ${change}</span>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderEvents() {
    const rows = [
      ["10:10", "关于中东局势的情报研判", "高", "进行中", "high", "active"],
      ["09:30", "网络攻击事件溯源分析", "高", "进行中", "high", "active"],
      ["08:45", "重点目标动态跟踪日报", "中", "待审核", "medium", "pending"],
      ["07:20", "东南亚地区异常舆情监控", "中", "已完成", "medium", "done"],
      ["05-19", "经济制裁影响评估报告", "低", "已完成", "low", "done"],
    ];

    return `
      <section class="screen-panel">
        <div class="screen-panel-head">
          <div class="screen-panel-title"><i>▤</i>我的事件</div>
          <span class="screen-more">更多 ></span>
        </div>
        <div class="screen-event-list">
          <div class="screen-event-row is-head"><span>时间</span><span>事件主题</span><span>优先级</span><span>状态</span></div>
          ${rows.map(([time, topic, priority, state, priorityClass, stateClass]) => `
            <div class="screen-event-row">
              <span>${time}</span>
              <span class="screen-event-topic">${topic}</span>
              <span class="screen-priority ${priorityClass}">${priority}</span>
              <span class="screen-state ${stateClass}">${state}</span>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderRiskDistribution() {
    const items = [
      ["高风险", "14.0%", "#ff6f1a"],
      ["较高风险", "24.0%", "#ff8a00"],
      ["中风险", "37.0%", "#16c7ff"],
      ["低风险", "14.0%", "#33df76"],
      ["极低风险", "11.0%", "#22d2d8"],
    ];

    return `
      <section class="screen-panel">
        <div class="screen-panel-head">
          <div class="screen-panel-title"><i>◌</i>风险等级分布</div>
          <span class="screen-more">详情 ></span>
        </div>
        <div class="screen-risk-body">
          <div class="screen-donut"><span class="p1">14.0%</span><span class="p2">24.0%</span><span class="p3">37.0%</span><span class="p4">14.0%</span></div>
          <ul class="screen-risk-legend">
            ${items.map(([label, value, color]) => `<li><span class="screen-dot" style="background:${color}"></span><span>${label}</span><strong>${value}</strong></li>`).join("")}
          </ul>
        </div>
      </section>
    `;
  }

  function renderIntel() {
    const rows = [
      ["张", "10:21", "张文博：“新能源大战或升级，美欧博弈加剧...”", "X"],
      ["林", "09:05", "林夏禾：“关于东南亚地区的最新评估报告...”", "X"],
      ["李", "07:42", "李明：“地缘局势或引发连锁反应，需警惕...”", "X"],
      ["谢", "06:18", "谢磊：“欧洲网络安全会议观点摘述...”", "X"],
      ["宋", "03:33", "宋文远：“人工智能监管需重新审视...”", "X"],
    ];

    return `
      <section class="screen-panel">
        <div class="screen-panel-head">
          <div class="screen-panel-title"><i>⊕</i>重点情报</div>
          <span class="screen-note">点击头像查看近24小时内情报动态</span>
        </div>
        <div class="screen-intel-list">
          ${rows.map(([avatar, time, text, platform]) => `
            <div class="screen-intel-row">
              <span class="screen-source-icon">${avatar}</span>
              <span>${time}</span>
              <span class="screen-intel-text">${text}</span>
              <span class="screen-platform">${platform}</span>
            </div>
          `).join("")}
        </div>
        <span class="screen-more">共 23 条情报　查看全部 ></span>
      </section>
    `;
  }

  function renderDataAnalysisScreen() {
    const now = formatTime();
    const kpis = [
      ["◎", "目标总数", "12,845", "较昨日", "8.4%", "#15c9ff", ""],
      ["⌁", "动态总数", "98,732", "较昨日", "12.6%", "#19d2d0", ""],
      ["!", "涉及的敏感动态总数", "3,276", "较昨日", "15.3%", "#ff8a00", "warn"],
      ["▣", "本地情报总数", "5,648", "较昨日", "6.1%", "#9fd7ff", "purple"],
    ];
    const targets = [
      ["亚", "亚历山大·科尔文", 86, "1,287"],
      ["林", "林嘉豪", 74, "986"],
      ["卡", "卡里姆·侯赛因", 72, "872"],
      ["伊", "伊莲娜·桑切斯", 69, "645"],
      ["陈", "陈志远", 61, "317"],
      ["米", "米哈伊尔·伊万诺夫", 58, "421"],
      ["索", "索菲亚·德拉科娃", 54, "276"],
      ["阿", "阿里·本·萨利姆", 49, "198"],
    ];
    const regions = [
      ["1", "中东地区", 96, "2,341", "18.7%", false],
      ["2", "东南亚地区", 78, "1,876", "14.2%", false],
      ["3", "欧洲地区", 68, "1,642", "9.6%", false],
      ["4", "东亚地区", 52, "1,257", "11.3%", false],
      ["5", "北美地区", 44, "1,098", "6.3%", false],
      ["6", "南美地区", 30, "782", "2.1%", true],
    ];
    const events = [
      ["05-20 10:10", "关于中东局势的情报研判", "高", "进行中", "high", "active"],
      ["05-20 09:30", "网络攻击事件溯源分析", "高", "进行中", "high", "active"],
      ["05-20 08:45", "重点目标动态跟踪日报", "中", "待审核", "medium", "active"],
      ["05-20 07:20", "东南亚地区异常舆情监控", "中", "已完成", "medium", "done"],
      ["05-19 18:30", "经济制裁影响评估报告", "低", "已完成", "low", "done"],
    ];
    const intel = [
      ["张", "10:21", "张文博：“新能源大战或升级，美欧博弈加剧...”", "↗"],
      ["林", "09:05", "林夏禾：“关于东南亚地区的最新评估报告...”", "↗"],
      ["李", "07:42", "李明：“地缘局势或引发连锁反应，需警惕...”", "↗"],
      ["谢", "06:18", "谢磊：“欧洲网络安全会议观点摘述...”", "↗"],
      ["宋", "03:33", "宋文远：“人工智能监管需重新审视...”", "↗"],
    ];

    const spark = (color) => `
      <div class="data-screen-spark">
        <svg viewBox="0 0 150 54" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="dataSpark${color.replace("#", "")}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="${color}" stop-opacity="0.34" />
              <stop offset="1" stop-color="${color}" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 42 L14 39 L27 43 L41 31 L55 35 L69 24 L82 29 L96 18 L110 23 L124 12 L138 19 L150 16 L150 54 L0 54 Z" fill="url(#dataSpark${color.replace("#", "")})" />
          <polyline points="0,42 14,39 27,43 41,31 55,35 69,24 82,29 96,18 110,23 124,12 138,19 150,16" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" />
          <circle cx="124" cy="12" r="3" fill="${color}" />
        </svg>
      </div>
    `;

    pageContent.innerHTML = `
      <div class="data-screen">
        <header class="data-screen-header">
          <div class="data-screen-brand"><span class="data-screen-shield">盾</span><span>××系统</span></div>
          <div class="data-screen-title">数据分析智慧大屏</div>
          <div class="data-screen-meta">
            <span id="dataScreenDate">${now.date}</span>
            <span id="dataScreenTime">${now.time}</span>
            <span id="dataScreenWeekday">${now.weekday}</span>
            <span class="data-screen-status">系统运行状态：<i></i>正常</span>
          </div>
        </header>

        <section class="data-screen-kpis">
          ${kpis.map(([icon, label, value, prefix, change, color, tone]) => `
            <article class="data-screen-kpi ${tone}">
              <div class="data-screen-kpi-icon">${icon}</div>
              <div>
                <div class="data-screen-kpi-label">${label}</div>
                <div class="data-screen-kpi-value">${value}</div>
                <div class="data-screen-kpi-trend">${prefix} <span class="${tone === "warn" ? "data-screen-hot" : "data-screen-up"}">↑ ${change}</span></div>
              </div>
              ${spark(color)}
            </article>
          `).join("")}
        </section>

        <main class="data-screen-layout">
          <section class="data-screen-panel data-screen-targets">
            <div class="data-screen-panel-head">
              <div class="data-screen-panel-title"><i>⊕</i>重点目标</div>
              <span class="data-screen-more">更多 ></span>
            </div>
            <div class="data-screen-target-table">
              <div class="data-screen-target-row head"><span>头像</span><span>姓名</span><span>风险</span><span>动态</span></div>
              ${targets.map(([avatar, name, risk, dynamic]) => `
                <div class="data-screen-target-row">
                  <span class="data-screen-avatar">${avatar}</span>
                  <span class="data-screen-name">${name}</span>
                  <span class="data-screen-risk">${risk}</span>
                  <span class="data-screen-dynamic">${dynamic}</span>
                </div>
              `).join("")}
            </div>
          </section>

          <section class="data-screen-panel data-screen-trend">
            <div class="data-screen-panel-head">
              <div class="data-screen-panel-title"><i>⌁</i>总体动态趋势</div>
              <div class="data-screen-tabs"><span>近24小时</span><span class="active">近7日</span><span>近30日</span><span>自定义</span></div>
            </div>
            <div class="data-screen-legend">
              <span><i style="background:#5a9cff"></i>动态总数</span>
              <span><i style="background:#ff8a00"></i>敏感动态数</span>
              <span><i style="background:#18d8d4"></i>本地情报数</span>
            </div>
            <div class="data-screen-chart">
              <svg viewBox="0 0 820 360" preserveAspectRatio="none" aria-label="总体动态趋势折线图">
                <defs>
                  <linearGradient id="dataTrendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#156fff" stop-opacity="0.48" />
                    <stop offset="1" stop-color="#156fff" stop-opacity="0.03" />
                  </linearGradient>
                </defs>
                <g fill="#9bbbdd" font-size="13">
                  <text x="18" y="42">25,000</text><text x="26" y="112">20,000</text><text x="26" y="182">15,000</text><text x="26" y="252">10,000</text><text x="42" y="326">0</text>
                  <text x="98" y="342">05-14</text><text x="216" y="342">05-15</text><text x="334" y="342">05-16</text><text x="452" y="342">05-17</text><text x="570" y="342">05-18</text><text x="688" y="342">05-19</text><text x="770" y="342">05-20</text>
                </g>
                <path d="M82 132 L200 96 L318 126 L436 78 L554 58 L672 44 L790 34 L790 314 L82 314 Z" fill="url(#dataTrendFill)" />
                <polyline points="82,132 200,96 318,126 436,78 554,58 672,44 790,34" fill="none" stroke="#5a9cff" stroke-width="3" />
                <polyline points="82,236 200,230 318,236 436,224 554,214 672,206 790,196" fill="none" stroke="#ff8a00" stroke-width="3" />
                <polyline points="82,268 200,264 318,266 436,258 554,250 672,244 790,236" fill="none" stroke="#18d8d4" stroke-width="3" />
                <g fill="#ffffff" font-size="13">
                  <text x="76" y="116">14,562</text><text x="192" y="80">81,034</text><text x="310" y="110">76,231</text><text x="428" y="62">88,145</text><text x="546" y="42">92,673</text><text x="664" y="28">96,184</text><text x="768" y="20">98,732</text>
                  <text x="74" y="224">2,312</text><text x="192" y="218">2,498</text><text x="310" y="224">2,245</text><text x="428" y="212">2,617</text><text x="546" y="202">2,842</text><text x="664" y="194">2,967</text><text x="768" y="184">3,276</text>
                  <text x="74" y="292">4,832</text><text x="192" y="288">4,915</text><text x="310" y="290">4,701</text><text x="428" y="282">4,985</text><text x="546" y="274">5,121</text><text x="664" y="268">5,317</text><text x="768" y="260">5,648</text>
                </g>
              </svg>
            </div>
          </section>

          <div class="data-screen-right">
            <section class="data-screen-panel">
              <div class="data-screen-panel-head">
                <div class="data-screen-panel-title"><i>✺</i>高频热词</div>
                <span class="data-screen-more">更多 ></span>
              </div>
              <div class="data-screen-cloud">
                <span class="xl" style="left:31%;top:35%">网络安全</span>
                <span class="lg" style="left:37%;top:14%;color:#9fd7ff">人工智能</span>
                <span class="lg orange" style="left:43%;top:70%">数据泄露</span>
                <span class="md green" style="left:69%;top:28%">经济制裁</span>
                <span class="md" style="left:69%;top:50%">能源安全</span>
                <span class="md" style="left:13%;top:22%">供应链</span>
                <span class="md orange" style="left:14%;top:70%">舆论波动</span>
                <span class="md green" style="left:20%;top:56%">地缘冲突</span>
                <span class="md" style="left:58%;top:14%">数据监测</span>
                <span class="md orange" style="left:26%;top:79%">数据利用</span>
              </div>
            </section>

            <section class="data-screen-panel">
              <div class="data-screen-panel-head">
                <div class="data-screen-panel-title"><i>◉</i>今日活跃地缘</div>
                <span class="data-screen-more">更多 ></span>
              </div>
              <div class="data-screen-region-list">
                ${regions.map(([rank, area, width, count, change, down]) => `
                  <div class="data-screen-region-row">
                    <span class="data-screen-rank ${rank <= 3 ? "top" : ""}">${rank}</span>
                    <span>${area}</span>
                    <span class="data-screen-bar"><i style="width:${width}%"></i></span>
                    <span>${count}</span>
                    <span class="data-screen-change ${down ? "down" : ""}">${down ? "↓" : "↑"} ${change}</span>
                  </div>
                `).join("")}
              </div>
            </section>

            <section class="data-screen-panel">
              <div class="data-screen-panel-head">
                <div class="data-screen-panel-title"><i>▤</i>我的事件</div>
                <span class="data-screen-more">更多 ></span>
              </div>
              <div class="data-screen-event-list">
                <div class="data-screen-event-row head"><span>时间</span><span>事件主题</span><span>优先级</span><span>状态</span></div>
                ${events.map(([time, topic, priority, state, priorityClass, stateClass]) => `
                  <div class="data-screen-event-row">
                    <span>${time}</span>
                    <span class="data-screen-event-topic">${topic}</span>
                    <span class="data-screen-priority ${priorityClass}">${priority}</span>
                    <span class="data-screen-state ${stateClass}">${state}</span>
                  </div>
                `).join("")}
              </div>
            </section>
          </div>

          <section class="data-screen-panel data-screen-risk-panel">
            <div class="data-screen-panel-head">
              <div class="data-screen-panel-title">风险等级分布</div>
            </div>
            <div class="data-screen-risk-body">
              <div class="data-screen-donut"><span class="p1">14.0%</span><span class="p2">24.0%</span><span class="p3">37.0%</span><span class="p4">25.0%</span></div>
              <ul class="data-screen-risk-legend">
                ${[
                  ["高风险", "14.0%", "#ff6f1a"],
                  ["较高风险", "24.0%", "#ff8a00"],
                  ["中风险", "37.0%", "#21cfff"],
                  ["低风险", "25.0%", "#35e980"],
                  ["极低风险", "11.0%", "#16b8c8"],
                ].map(([label, value, color]) => `<li><span class="data-screen-dot" style="background:${color}"></span><span>${label}</span><strong>${value}</strong></li>`).join("")}
              </ul>
            </div>
          </section>

          <section class="data-screen-panel data-screen-intel-panel">
            <div class="data-screen-panel-head">
              <div class="data-screen-panel-title"><i>⊕</i>重点情报</div>
              <span class="data-screen-note">点击头像查看该情报24小时内相关动态</span>
            </div>
            <div class="data-screen-intel-list">
              ${intel.map(([avatar, time, text, action]) => `
                <div class="data-screen-intel-row">
                  <span class="data-screen-source-icon">${avatar}</span>
                  <span>${time}</span>
                  <span class="data-screen-intel-text">${text}</span>
                  <span class="data-screen-platform">${action}</span>
                </div>
              `).join("")}
            </div>
            <span class="data-screen-more">共 23 条情报　查看全部 ></span>
          </section>
        </main>
      </div>
    `;

    window.clearInterval(window.screenClockTimer);
    window.screenClockTimer = window.setInterval(() => {
      const current = formatTime();
      const date = document.getElementById("dataScreenDate");
      const time = document.getElementById("dataScreenTime");
      const weekday = document.getElementById("dataScreenWeekday");
      if (date) date.textContent = current.date;
      if (time) time.textContent = current.time;
      if (weekday) weekday.textContent = current.weekday;
    }, 1000);
  }

  function renderHotspotScreen() {
    const now = formatTime();
    const internationalHotspots = [
      ["俄乌冲突局势升级和谈僵局受阻", "路透社", "05-24 09:58", "9,856"],
      ["中东多国呼吁停止人道危机加剧", "半岛电视台", "05-24 09:41", "8,742"],
      ["美国就业数据超预期全球股市普涨", "彭博社", "05-24 09:20", "7,654"],
      ["日本地震预警引发民众广泛关注", "NHK", "05-24 08:56", "6,321"],
      ["英国大选民调显示执政支持下滑", "BBC", "05-24 08:32", "5,432"],
      ["欧盟通过人工智能监管新规", "法新社", "05-24 08:10", "4,321"],
      ["美国科技巨头面临反垄断新调查", "华尔街日报", "05-24 07:48", "3,256"],
      ["拉美多国加大打击犯罪集团行动", "美联社", "05-24 07:30", "2,845"],
      ["欧洲多国高温天气引发预警", "卫报", "05-24 07:05", "2,321"],
      ["印度与加拿大外交关系紧张升级", "NDTV", "05-24 06:40", "1,875"],
      ["非洲多国爆发抗议示威活动", "阿拉比亚", "05-24 06:18", "1,356"],
      ["全球航运价格持续上涨影响贸易", "海运公报", "05-24 05:58", "1,125"],
    ];
    const regionRows = [
      ["亚洲", "49.2%", 92],
      ["欧洲", "18.6%", 54],
      ["北美洲", "13.4%", 46],
      ["南美洲", "7.2%", 30],
      ["非洲", "6.5%", 27],
      ["大洋洲", "5.1%", 21],
    ];
    const domesticHotspots = [
      ["个人信息对我科技企业实施制裁", "央视新闻", "05-24 09:52", "高风险"],
      ["涉南海海产行动引发外媒关注", "环球时报", "05-24 09:33", "高风险"],
      ["台海局势加剧各方举行军事演练", "国防部网站", "05-24 09:15", "中风险"],
      ["西方媒体炒作我人权问题", "新华社", "05-24 09:00", "中风险"],
      ["境外组织抹黑我国绿色发展成就", "生态环境部", "05-24 08:28", "关注级"],
      ["涉我企业在海外项目遭遇阻碍", "商务部", "05-24 08:05", "中风险"],
      ["个别政客涉华言论引发争议", "人民日报", "05-24 07:42", "关注级"],
      ["网络平台出现涉我不实信息传播", "网信办", "05-24 07:18", "关注级"],
    ];
    const categories = [
      ["政", "政治", "2,844", "22.2%"],
      ["军", "军事", "1,842", "14.3%"],
      ["经", "经济", "2,136", "16.6%"],
      ["科", "科技", "1,756", "13.7%"],
      ["社", "社会", "1,325", "10.3%"],
      ["环", "环境", "865", "6.7%"],
      ["其", "其他", "494", "3.8%"],
    ];
    const warnings = [
      ["高风险", "涉我科技企业遭国外制裁", "10:27"],
      ["高风险", "境外媒体恶意炒作涉我议题", "10:23"],
      ["中风险", "涉我海外使馆安全受威胁", "10:18"],
      ["中风险", "涉我贸易企业遭不公平调查", "10:15"],
      ["关注级", "涉我文化活动遭抵制", "10:10"],
    ];

    pageContent.innerHTML = `
      <div class="hotspot-screen">
        <header class="hotspot-header">
          <div class="hotspot-brand"><span class="hotspot-brand-mark">盾</span><span>××系统</span></div>
          <div class="hotspot-title-wrap">
            <div class="hotspot-title">热点分析智慧大屏</div>
            <div class="hotspot-subtitle">热点监测 / 风险研判 / 趋势分析</div>
          </div>
          <div class="hotspot-meta">
            <span id="hotspotDate">${now.date}</span>
            <span id="hotspotTime">${now.time}</span>
            <span id="hotspotWeekday">${now.weekday}</span>
            <span>数据来源：全国监测平台</span>
            <span class="hotspot-updated">数据更新：1分钟前</span>
          </div>
        </header>

        <main class="hotspot-layout">
          <aside class="hotspot-left">
            <section class="hotspot-panel hotspot-international">
              <div class="hotspot-panel-head">
                <div class="hotspot-panel-title"><i>▣</i>国际热点</div>
                <span class="hotspot-more">更多 ></span>
              </div>
              <div class="hotspot-rank-list">
                ${internationalHotspots.map(([title, source, time, heat], index) => `
                  <div class="hotspot-rank-row">
                    <span class="hotspot-rank-no ${index < 3 ? "top" : ""}">${index + 1}</span>
                    <span class="hotspot-rank-title">${title}</span>
                    <span class="hotspot-source">${source}</span>
                    <span class="hotspot-time">${time}</span>
                    <span class="hotspot-heat">◆ ${heat}</span>
                  </div>
                `).join("")}
              </div>
            </section>

            <section class="hotspot-panel">
              <div class="hotspot-panel-head">
                <div class="hotspot-panel-title"><i>⌖</i>热点来源地区分布（全部热点）</div>
                <span class="hotspot-more">更多 ></span>
              </div>
              <div class="hotspot-region-body">
                <div class="hotspot-region-bars">
                  ${regionRows.map(([name, ratio, width]) => `
                    <div class="hotspot-region-row">
                      <span>${name}</span>
                      <span class="hotspot-progress"><i style="width:${width}%"></i></span>
                      <strong>${ratio}</strong>
                    </div>
                  `).join("")}
                </div>
                <div class="hotspot-mini-map" aria-hidden="true"></div>
              </div>
            </section>
          </aside>

          <section class="hotspot-center">
            <div class="hotspot-kpis">
              ${[
                ["总", "今日热点总数", "12,846", "环比", "12.6%", "同比", "18.3%"],
                ["国", "国际热点总数", "5,342", "环比", "8.7%", "同比", "15.2%"],
                ["涉", "涉我热点总数", "7,504", "环比", "15.8%", "同比", "21.6%"],
              ].map(([icon, label, value, qoqLabel, qoq, yoyLabel, yoy]) => `
                <article class="hotspot-card">
                  <div class="hotspot-card-icon">${icon}</div>
                  <div>
                    <div class="hotspot-card-label">${label}</div>
                    <div class="hotspot-card-value">${value}</div>
                    <div class="hotspot-card-change"><span>${qoqLabel} <b class="hotspot-orange">↑ ${qoq}</b></span><span>${yoyLabel} <b class="hotspot-orange">↑ ${yoy}</b></span></div>
                  </div>
                </article>
              `).join("")}
            </div>

            <section class="hotspot-panel hotspot-map-panel">
              <div class="hotspot-panel-head">
                <div class="hotspot-panel-title"><i>▦</i>热点态势地图（国际热点 & 涉我热点关联）</div>
              </div>
              <div class="hotspot-map-stage">
                <svg class="hotspot-world-svg" viewBox="0 0 900 500" preserveAspectRatio="none" aria-hidden="true">
                  <path class="land" d="M75 185 L138 132 L222 148 L266 202 L235 265 L168 286 L102 250 Z" />
                  <path class="land" d="M220 312 L270 286 L305 338 L280 416 L226 390 Z" />
                  <path class="land" d="M400 132 L476 118 L548 158 L526 238 L446 250 L378 202 Z" />
                  <path class="land" d="M452 245 L526 252 L574 328 L538 420 L456 382 L420 304 Z" />
                  <path class="land" d="M565 168 L720 130 L835 212 L786 302 L654 286 L596 232 Z" />
                  <path class="land" d="M738 330 L826 350 L852 424 L770 430 Z" />
                  <path class="path" d="M186 235 C270 180 376 184 455 210" />
                  <path class="path" d="M455 210 C540 160 640 154 728 222" />
                  <path class="path hot" d="M728 222 C662 266 608 310 520 328" />
                  <path class="path" d="M186 235 C305 314 380 346 488 314" />
                  <path class="path hot" d="M728 222 C760 250 798 284 806 354" />
                </svg>
                <span class="hotspot-dot" style="left:15%;top:45%"></span>
                <span class="hotspot-dot" style="left:48%;top:39%"></span>
                <span class="hotspot-dot" style="left:61%;top:48%"></span>
                <span class="hotspot-dot" style="left:83%;top:62%"></span>
                <span class="hotspot-dot hot" style="left:72%;top:41%"></span>
                <span class="hotspot-map-label" style="left:9%;top:26%">北美热点<strong>856</strong></span>
                <span class="hotspot-map-label" style="left:47%;top:11%">欧洲热点<strong>1,248</strong></span>
                <span class="hotspot-map-label" style="left:57%;top:38%">中东热点<strong>1,542</strong></span>
                <span class="hotspot-map-label" style="left:48%;top:58%">非洲热点<strong>632</strong></span>
                <span class="hotspot-map-label" style="left:22%;top:68%">拉美热点<strong>654</strong></span>
                <span class="hotspot-map-label" style="left:82%;top:52%">亚太热点<strong>2,356</strong></span>
                <span class="hotspot-map-label hot" style="right:4%;top:19%">涉我热点集中区<strong>4,256</strong></span>
                <div class="hotspot-intensity">热点强度图例<div class="hotspot-heat-bar"></div><div>高</div><div>低</div></div>
                <div class="hotspot-map-legend"><span class="hot"><i></i>涉我热点</span><span><i></i>国际热点</span></div>
              </div>
            </section>

            <section class="hotspot-panel">
              <div class="hotspot-panel-head">
                <div class="hotspot-panel-title"><i>▥</i>热点分类占比（全部热点）</div>
              </div>
              <div class="hotspot-category-body">
                <div class="hotspot-category-list">
                  ${categories.map(([icon, name, count, ratio]) => `
                    <div class="hotspot-category-item">
                      <span class="hotspot-category-icon">${icon}</span>
                      <span class="hotspot-category-name">${name}</span>
                      <strong class="hotspot-category-count">${count}</strong>
                      <span class="hotspot-category-ratio">${ratio}</span>
                    </div>
                  `).join("")}
                </div>
                <div class="hotspot-category-map" aria-hidden="true"></div>
              </div>
            </section>
          </section>

          <aside class="hotspot-right">
            <section class="hotspot-panel hotspot-domestic">
              <div class="hotspot-panel-head">
                <div class="hotspot-panel-title"><i>●</i>涉我热点</div>
                <span class="hotspot-more">更多 ></span>
              </div>
              <div class="hotspot-rank-list">
                ${domesticHotspots.map(([title, source, time, risk], index) => `
                  <div class="hotspot-rank-row">
                    <span class="hotspot-rank-no ${index < 3 ? "top" : ""}">${index + 1}</span>
                    <span class="hotspot-rank-title">${title}</span>
                    <span class="hotspot-source">${source}</span>
                    <span class="hotspot-time">${time}</span>
                    <span class="hotspot-risk ${risk === "关注级" ? "watch" : ""}">${risk}</span>
                  </div>
                `).join("")}
              </div>
            </section>

            <section class="hotspot-panel">
              <div class="hotspot-panel-head">
                <div class="hotspot-panel-title"><i>盾</i>热点风险预测（涉我热点）</div>
              </div>
              <div class="hotspot-risk-body">
                <div class="hotspot-risk-donut"><div class="hotspot-risk-total"><strong>7,504</strong><span>总数</span></div></div>
                <div class="hotspot-risk-list">
                  ${[
                    ["高风险", "1,842", "24.6%", ""],
                    ["中风险", "3,256", "43.4%", ""],
                    ["关注级", "2,406", "32.0%", "cyan"],
                  ].map(([name, count, ratio, tone]) => `
                    <div class="hotspot-risk-row">
                      <span class="hotspot-risk-dot ${tone}"></span>
                      <span>${name}</span>
                      <strong>${count}</strong>
                      <span>${ratio}</span>
                    </div>
                  `).join("")}
                </div>
              </div>
              <div class="hotspot-risk-change">
                <span>高风险 ↑ 12.3%</span>
                <span>中风险 ↑ 8.6%</span>
                <span class="down">关注级 ↓ 5.2%</span>
              </div>
            </section>

            <section class="hotspot-panel">
              <div class="hotspot-panel-head">
                <div class="hotspot-panel-title"><i>警</i>实时预警（涉我热点）</div>
                <span class="hotspot-more">更多 ></span>
              </div>
              <div class="hotspot-warning-list">
                ${warnings.map(([level, title, time]) => `
                  <div class="hotspot-warning-row">
                    <span class="hotspot-risk ${level === "关注级" ? "watch" : ""}">${level}</span>
                    <span class="hotspot-warning-title">${title}</span>
                    <span class="hotspot-warning-time">${time}</span>
                  </div>
                `).join("")}
              </div>
            </section>
          </aside>
        </main>
      </div>
    `;

    window.clearInterval(window.hotspotClockTimer);
    window.hotspotClockTimer = window.setInterval(() => {
      const current = formatTime();
      const date = document.getElementById("hotspotDate");
      const time = document.getElementById("hotspotTime");
      const weekday = document.getElementById("hotspotWeekday");
      if (date) date.textContent = current.date;
      if (time) time.textContent = current.time;
      if (weekday) weekday.textContent = current.weekday;
    }, 1000);
  }

  function renderSettingsScreen() {
    pageContent.innerHTML = `
      <div class="screen-page screen-placeholder">
        <section class="screen-settings">
          <h1>大屏设置</h1>
          <p>用于后续配置大屏展示项、刷新频率、主题颜色和数据源。当前保留基础表单占位。</p>
          <div class="screen-setting-grid">
            <div class="screen-field"><label>刷新频率</label><select><option>30 秒</option><option>1 分钟</option><option>5 分钟</option></select></div>
            <div class="screen-field"><label>主题颜色</label><select><option>深蓝科技</option><option>青蓝高亮</option><option>夜间低亮</option></select></div>
            <div class="screen-field"><label>默认展示页</label><select><option>数据分析大屏</option><option>热点分析大屏</option></select></div>
            <div class="screen-field"><label>数据源</label><select><option>综合分析库</option><option>实时动态流</option><option>事件预警库</option></select></div>
            <div class="screen-field"><label>展示项</label><input value="KPI、重点目标、趋势、热词、事件" /></div>
            <div class="screen-field"><label>运行状态提示</label><input value="正常" /></div>
          </div>
          <div class="screen-actions">
            <button class="screen-btn primary" type="button">保存配置</button>
            <button class="screen-btn" type="button">恢复默认</button>
          </div>
        </section>
      </div>
    `;
  }

  if (pageKey === "data-analysis-screen") renderDataAnalysisScreen();
  if (pageKey === "hotspot-analysis-screen") renderHotspotScreen();
  if (pageKey === "screen-settings") renderSettingsScreen();
})();
