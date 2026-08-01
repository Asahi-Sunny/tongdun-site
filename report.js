const dimensionLabels = ["识别危险", "拒绝能力", "求助意识", "自我保护", "边界意识"];
const scenarioTitles = [
  "熟人不当触碰场景",
  "独处胁迫威胁场景",
  "零食礼物诱骗场景",
  "网络私密聊天场景",
  "事后勇敢求助场景"
];
const storageKey = "tongdun-report-v1";
const initialMetrics = [55, 55, 55, 55, 55];

const els = {
  overview: document.getElementById("reportOverviewText"),
  score: document.getElementById("reportScore"),
  completedCount: document.getElementById("completedCount"),
  strongestDimension: document.getElementById("strongestDimension"),
  weakestDimension: document.getElementById("weakestDimension"),
  totalScoreCard: document.getElementById("totalScoreCard"),
  completeCard: document.getElementById("completeCard"),
  strongCard: document.getElementById("strongCard"),
  weakCard: document.getElementById("weakCard"),
  radar: document.getElementById("reportRadarCanvas"),
  bars: document.getElementById("reportDimensionBars"),
  scenarios: document.getElementById("scenarioReports"),
  actions: document.getElementById("familyActions")
};

function initReport() {
  document.getElementById("resetReportBtn").addEventListener("click", resetReport);
  const attempts = readAttempts();
  const finished = attempts.filter(Boolean);
  const metrics = averageMetrics(finished);
  const total = finished.length ? Math.round(metrics.reduce((sum, value) => sum + value, 0) / metrics.length) : 0;
  const strongest = metrics.indexOf(Math.max(...metrics));
  const weakest = metrics.indexOf(Math.min(...metrics));

  els.score.textContent = total;
  els.completedCount.textContent = `${finished.length}/5`;
  els.strongestDimension.textContent = finished.length ? dimensionLabels[strongest] : "待生成";
  els.weakestDimension.textContent = finished.length ? dimensionLabels[weakest] : "待生成";
  els.overview.textContent = finished.length
    ? `系统已根据 ${finished.length} 个训练场景生成报告。每个维度和综合得分均按 100 分制展示。`
    : "还没有训练记录。返回训练页面完成回答后，这里会生成综合得分、维度画像、场景记录和家庭建议。";

  setScoreClass(els.totalScoreCard, total, 100);
  setScoreClass(els.completeCard, finished.length, 5);
  setScoreClass(els.strongCard, metrics[strongest], 100);
  setScoreClass(els.weakCard, metrics[weakest], 100);

  drawRadar(els.radar, metrics);
  renderBars(metrics);
  renderScenarioRecords(attempts);
  renderActions(metrics, weakest);
}

function resetReport() {
  localStorage.removeItem(storageKey);
  window.location.href = "index.html";
}

function readAttempts() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!stored || !Array.isArray(stored.attempts)) return Array(scenarioTitles.length).fill(null);
    return scenarioTitles.map((_, index) => stored.attempts[index] || null);
  } catch {
    return Array(scenarioTitles.length).fill(null);
  }
}

function averageMetrics(finished) {
  if (!finished.length) return [...initialMetrics];
  return dimensionLabels.map((_, index) => {
    const total = finished.reduce((sum, item) => sum + normalizeMetric(item.metrics[index]), 0);
    return clamp(Math.round(total / finished.length), 0, 100);
  });
}

function renderBars(values) {
  els.bars.innerHTML = dimensionLabels
    .map((label, index) => {
      const value = Math.round(values[index]);
      const level = scoreLevel(value, 100);
      return `
        <div class="dimension-row ${level}">
          <strong>${label}</strong>
          <div class="dimension-track"><span style="width:${value}%"></span></div>
          <b>${value}/100</b>
        </div>
      `;
    })
    .join("");
}

function renderScenarioRecords(attempts) {
  els.scenarios.innerHTML = scenarioTitles
    .map((title, index) => {
      const item = attempts[index];
      const score = item ? Math.round(item.metrics.reduce((sum, value) => sum + normalizeMetric(value), 0) / item.metrics.length) : 0;
      const level = item ? scoreLevel(score, 100) : "";
      const label = item ? `${score} 分` : "未练习";
      const answer = item ? item.answer : "暂无回答记录";
      const feedback = item ? item.feedback : "建议先完成本场景，再观察孩子能否识别风险、明确拒绝并主动求助。";
      return `
        <div class="scenario-report">
          <div>
            <strong>${title}</strong>
            <span class="${item?.status || ""} ${level}">${label}</span>
          </div>
          <p>${item ? item.time : "待完成"}</p>
          <p>回答：${answer}<br />建议：${feedback}</p>
        </div>
      `;
    })
    .join("");
}

function renderActions(values, weakestIndex) {
  const advice = [
    "识别危险：和孩子一起复述“身体红绿灯”，把不舒服、害怕、被要求保密都归为红灯信号。",
    "拒绝能力：每天练习 2 句清楚拒绝的话，例如“我不愿意”“请别碰我”“我要离开”。",
    "求助意识：帮孩子写下 3 位可信任的大人，并约定遇到危险时可以马上联系。",
    "自我保护：演练跑向人多明亮处、找老师/保安/警察、保存证据等具体动作。",
    "边界意识：提醒孩子身体和隐私属于自己，遭遇伤害不是孩子的错。"
  ];
  const first = advice[weakestIndex];
  els.actions.innerHTML = [first, ...advice.filter((item) => item !== first)]
    .map((item, index) => `<p class="${index === 0 ? "priority" : ""}">${item}</p>`)
    .join("");
}

function setScoreClass(element, value, max) {
  element.classList.remove("low", "mid", "high");
  element.classList.add(scoreLevel(value, max));
}

function scoreLevel(value, max) {
  const ratio = max ? value / max : 0;
  if (ratio >= 0.8) return "high";
  if (ratio >= 0.6) return "mid";
  return "low";
}

function drawRadar(canvas, values) {
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.34;
  const points = values.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 1;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "15px Microsoft YaHei, Arial";

  for (let level = 1; level <= 4; level += 1) {
    ctx.beginPath();
    for (let i = 0; i < points; i += 1) {
      const angle = -Math.PI / 2 + (Math.PI * 2 * i) / points;
      const r = (radius * level) / 4;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(91, 141, 239, 0.22)";
    ctx.stroke();
  }

  for (let i = 0; i < points; i += 1) {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / points;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
    ctx.strokeStyle = "rgba(91, 141, 239, 0.18)";
    ctx.stroke();

    const labelX = centerX + Math.cos(angle) * (radius + 45);
    const labelY = centerY + Math.sin(angle) * (radius + 38);
    ctx.fillStyle = "#263238";
    ctx.fillText(dimensionLabels[i], labelX, labelY);
  }

  ctx.beginPath();
  values.forEach((value, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / points;
    const r = (radius * value) / 100;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(74, 166, 168, 0.28)";
  ctx.strokeStyle = "#4aa6a8";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeMetric(value) {
  const number = Number(value || 0);
  return number <= 20 ? number * 5 : number;
}

initReport();
