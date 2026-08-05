const scenarios = [
  {
    title: "熟人不当触碰场景",
    type: "身体边界",
    risk: "熟人越界",
    image: "assets/scene-boundary.png",
    tag: "不舒服就拒绝",
    prompt:
      "熟悉的大人提出让你不舒服的身体接触，还说只是开玩笑。你需要先保护自己的身体边界。",
    dialogue: "来，让叔叔抱一下，别这么小气，也不要告诉别人。",
    coach:
      "哪怕是熟人，只要让你不舒服，也可以马上说不，离开现场并告诉可信任的大人。",
    traffic: "隐私部位不能被别人随意触碰；不舒服、害怕、被要求保密，都是红灯信号。",
    options: ["大声说不要碰我", "立刻后退离开"],
    good: ["拒绝", "不要", "别碰", "离开", "后退", "跑", "求助", "告诉", "老师", "爸爸", "妈妈", "报警"],
    risky: ["忍", "答应", "保密", "不说", "没关系", "让他"],
    feedbackGood:
      "回答很棒。你说出了拒绝和离开，这是保护身体边界的关键。下一步要把事情告诉爸爸妈妈、老师或其他可信任的大人。",
    feedbackImprove:
      "你已经注意到不舒服的感觉了。回答里还需要更明确地说出：大声拒绝、马上离开、告诉可信任的大人。"
  },
  {
    title: "独处胁迫威胁场景",
    type: "果断逃离",
    risk: "被威胁",
    image: "assets/scene-escape.png",
    tag: "先到安全地方",
    prompt:
      "有人把你带到偏僻角落，用威胁的话阻止你离开。现在最重要的是把自己带到安全处。",
    dialogue: "不许走，也不许告诉别人，不然我就让你倒霉。",
    coach:
      "遇到威胁时，生命安全最优先。寻找机会去人多明亮的地方，并大声呼救。",
    traffic: "被堵住、被吓唬、被要求不能说，是需要立刻求助的红灯信号。",
    options: ["找机会向外逃跑", "大声呼喊求救"],
    good: ["跑", "逃", "离开", "呼救", "喊", "救命", "人多", "安全", "老师", "警察", "报警", "告诉"],
    risky: ["听话", "留下", "不喊", "保密", "害怕不说", "跟他走"],
    feedbackGood:
      "做得对。面对威胁时，先脱离危险环境，再向警察、老师、家长求助。不要因为对方吓唬你就独自承受。",
    feedbackImprove:
      "你的回答还可以更果断。请记住三个动作：找机会离开、大声呼救、去找可信任的大人。"
  },
  {
    title: "零食礼物诱骗场景",
    type: "拒绝利诱",
    risk: "礼物诱骗",
    image: "assets/scene-gift.png",
    tag: "不单独跟走",
    prompt:
      "陌生人拿出零食和玩具，想让你跟他去一个没人的地方。礼物不能交换你的安全。",
    dialogue: "我这里有好玩的玩具，跟我去那边，我只给你一个人看。",
    coach:
      "不收陌生人的礼物，不跟任何人去隐蔽地方，转身回到家长或老师身边。",
    traffic: "用礼物换独处机会，是危险信号；不确定时先拒绝，再找熟悉的大人。",
    options: ["拒绝礼物", "转身离开并告知家长"],
    good: ["拒绝", "不要", "不收", "不去", "离开", "回家", "家长", "老师", "告诉", "警察"],
    risky: ["收下", "跟去", "看看", "一个人", "保密", "拿礼物"],
    feedbackGood:
      "判断正确。陌生人的礼物如果附带单独离开的要求，就要直接拒绝，回到家长、老师或保安身边。",
    feedbackImprove:
      "这类情境要把拒绝说清楚。可以回答：我不要礼物，我不会跟你走，我要去找家长。"
  },
  {
    title: "网络私密聊天场景",
    type: "线上防侵害",
    risk: "网络诱导",
    image: "assets/scene-online.png",
    tag: "不发隐私照片",
    prompt:
      "手机里有陌生人要求你发送私密照片，还让你不要告诉家长。线上也要保护身体和隐私。",
    dialogue: "发一张只有我能看的照片吧，这会是我们的秘密。",
    coach:
      "不要发送隐私照片，不继续聊天，保留证据并告诉家长。必要时请大人报警。",
    traffic: "索要照片、视频、住址、学校信息，都是网络安全红灯信号。",
    options: ["直接拉黑删除", "告诉父母并保留证据"],
    good: ["不发", "拒绝", "拉黑", "删除", "截图", "证据", "告诉", "父母", "家长", "报警", "老师"],
    risky: ["发送", "发照片", "秘密", "不告诉", "继续聊", "裸聊"],
    feedbackGood:
      "很好。线上遇到索要隐私照片或秘密聊天，要停止交流、保留证据、告诉家长或老师。",
    feedbackImprove:
      "你的回答需要补上网络保护动作：不发送、不继续聊、截图留证、告诉家长。"
  },
  {
    title: "事后勇敢求助场景",
    type: "倾诉求助",
    risk: "事后支持",
    image: "assets/scene-help.png",
    tag: "不是你的错",
    prompt:
      "如果已经发生让你害怕或难过的事，你仍然可以得到保护。沉默不会让伤害变小。",
    dialogue: "我很害怕，也不知道该不该告诉妈妈。",
    coach:
      "遭遇伤害不是你的错。请把事情告诉可信任的大人，保留证据，寻求警察和心理支持。",
    traffic: "害怕、羞耻、被威胁不能说时，更需要向可信任的大人求助。",
    options: ["勇敢说出经历", "寻求警察和心理帮助"],
    good: ["告诉", "说出来", "求助", "妈妈", "爸爸", "老师", "警察", "报警", "心理", "证据", "不是我的错"],
    risky: ["隐瞒", "不说", "忍着", "自己扛", "算了", "害怕不说"],
    feedbackGood:
      "你选择了求助，这是非常重要的保护方式。请记住：伤害不是你的错，可信任的大人会帮助你。",
    feedbackImprove:
      "如果发生了让你害怕的事，不要独自承受。请说出经历，找家长、老师、警察或心理老师帮忙。"
  }
];

const dimensionLabels = ["识别危险", "拒绝能力", "求助意识", "自我保护", "边界意识"];
const initialMetrics = [55, 55, 55, 55, 55];
const storageKey = "tongdun-report-v1";

let currentIndex = 0;
let recognition = null;
let isRecording = false;
let completed = new Set();
let attempts = Array(scenarios.length).fill(null);
let availableVoices = [];
let lastMetrics = [...initialMetrics];

const els = {
  scenarioList: document.getElementById("scenarioList"),
  progressText: document.getElementById("progressText"),
  progressBar: document.getElementById("progressBar"),
  reportSummary: document.getElementById("reportSummary"),
  sceneType: document.getElementById("sceneType"),
  sceneTitle: document.getElementById("sceneTitle"),
  riskPill: document.getElementById("riskPill"),
  sceneImage: document.getElementById("sceneImage"),
  dangerTag: document.getElementById("dangerTag"),
  scenePrompt: document.getElementById("scenePrompt"),
  dialogueText: document.getElementById("dialogueText"),
  coachLine: document.getElementById("coachLine"),
  trafficText: document.getElementById("trafficText"),
  answerOptions: document.getElementById("answerOptions"),
  recordBtn: document.getElementById("recordBtn"),
  recordLabel: document.getElementById("recordLabel"),
  bigMicBtn: document.getElementById("bigMicBtn"), // 兼容巨型麦克风按钮
  analyzeBtn: document.getElementById("analyzeBtn"),
  resetBtn: document.getElementById("resetBtn"),
  answerInput: document.getElementById("answerInput"),
  feedbackBox: document.getElementById("feedbackBox"),
  radarCanvas: document.getElementById("radarCanvas"),
  radarLegend: document.getElementById("radarLegend"),
  speakSceneBtn: document.getElementById("speakSceneBtn"),
  playDialogueBtn: document.getElementById("playDialogueBtn"),
  trainingStage: document.querySelector(".training-stage"),
  reportPage: document.querySelector(".report-page")
};

function init() {
  refreshVoices();
  loadStoredAttempts();
  renderScenarioTabs();
  renderRadarLegend();
  setupSpeechRecognition();
  bindEvents();
  loadScenario(0);
}

function renderScenarioTabs() {
  if (!els.scenarioList) return;
  els.scenarioList.innerHTML = scenarios
    .map(
      (scenario, index) => `
        <button class="scenario-tab" type="button" data-index="${index}">
          <i>${index + 1}</i>
          <span>${scenario.type}</span>
          <strong>${scenario.title}</strong>
        </button>
      `
    )
    .join("");
}

function renderRadarLegend(values = lastMetrics) {
  if (!els.radarLegend) return;
  els.radarLegend.innerHTML = dimensionLabels
    .map((label, index) => `<span><i></i>${label}<b>${Math.round(values[index])}/100</b></span>`)
    .join("");
}

function bindEvents() {
  els.scenarioList?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-index]");
    if (!button) return;
    loadScenario(Number(button.dataset.index));
  });

  els.answerOptions?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    els.answerInput.value = button.dataset.answer;
    lastMetrics = calculateMetrics(els.answerInput.value, scenarios[currentIndex]);
    drawRadar(lastMetrics);
    analyzeAnswer();
  });

  els.analyzeBtn?.addEventListener("click", analyzeAnswer);
  els.resetBtn?.addEventListener("click", resetTraining);
  
  // 绑定常规麦克风与巨型儿童麦克风
  els.recordBtn?.addEventListener("click", toggleRecording);
  els.bigMicBtn?.addEventListener("click", toggleRecording);

  els.speakSceneBtn?.addEventListener("click", speakScene);
  els.playDialogueBtn?.addEventListener("click", () => speakVillain(scenarios[currentIndex].dialogue));
  els.answerInput?.addEventListener("input", () => {
    lastMetrics = calculateMetrics(els.answerInput.value, scenarios[currentIndex]);
    drawRadar(lastMetrics);
  });
}

function resetTraining() {
  localStorage.removeItem(storageKey);
  attempts = Array(scenarios.length).fill(null);
  completed = new Set();
  currentIndex = 0;
  window.speechSynthesis?.cancel();
  loadScenario(0);
}

function loadScenario(index) {
  currentIndex = index;
  const scenario = scenarios[index];

  if (els.sceneType) els.sceneType.textContent = scenario.type;
  if (els.sceneTitle) els.sceneTitle.textContent = scenario.title;
  if (els.riskPill) els.riskPill.textContent = scenario.risk;
  if (els.sceneImage) {
    els.sceneImage.src = scenario.image;
    els.sceneImage.alt = `${scenario.title}绘本式界面`;
  }
  if (els.dangerTag) els.dangerTag.textContent = scenario.tag;
  if (els.scenePrompt) els.scenePrompt.textContent = scenario.prompt;
  if (els.dialogueText) els.dialogueText.textContent = scenario.dialogue;
  if (els.coachLine) els.coachLine.textContent = scenario.coach;
  if (els.trafficText) els.trafficText.textContent = scenario.traffic;
  if (els.answerInput) els.answerInput.value = "";

  if (els.answerOptions) {
    els.answerOptions.innerHTML = scenario.options
      .map((option) => `<button class="option-button" type="button" data-answer="${option}">${option}</button>`)
      .join("");
  }

  document.querySelectorAll(".scenario-tab").forEach((tab) => {
    tab.classList.toggle("is-active", Number(tab.dataset.index) === index);
  });

  lastMetrics = [...initialMetrics];
  setFeedback("等待回答", "选择一个做法，或按下录音按钮说出你的决定。", "neutral");
  drawRadar(lastMetrics);
  updateProgress();
  triggerStepAnimation();
}

// 激发步骤元素的淡入上升效果
function triggerStepAnimation() {
  const stepItems = document.querySelectorAll(".step-item");
  stepItems.forEach((item) => item.classList.remove("show"));
  setTimeout(() => {
    stepItems.forEach((item, idx) => {
      setTimeout(() => item.classList.add("show"), idx * 100);
    });
  }, 50);
}

function updateProgress() {
  const count = completed.size;
  if (els.progressText) els.progressText.textContent = `${Math.max(currentIndex + 1, count)} / ${scenarios.length}`;
  if (els.progressBar) els.progressBar.style.width = `${Math.max(((count || currentIndex + 1) / scenarios.length) * 100, 20)}%`;
  if (els.reportSummary) {
    els.reportSummary.textContent =
      count === 0
        ? "完成练习后生成五维能力观察。"
        : `已完成 ${count} 个场景，重点观察：识别危险、拒绝、求助。`;
  }
}

function loadStoredAttempts() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (!stored || !Array.isArray(stored.attempts)) return;
    attempts = scenarios.map((_, index) => stored.attempts[index] || null);
    completed = new Set(
      attempts.map((item, index) => (item?.status === "good" ? index : null)).filter((item) => item !== null)
    );
  } catch {
    attempts = Array(scenarios.length).fill(null);
  }
}

function analyzeAnswer() {
  const scenario = scenarios[currentIndex];
  const raw = els.answerInput.value.trim();

  if (!raw) {
    setFeedback("还没听清", "请先说出或输入你的决定。可以试着说：我拒绝，我要离开并告诉家长。", "warning");
    speakTeacher("请先说出或输入你的决定。");
    return;
  }

  const answer = raw.toLowerCase();
  const goodHits = scenario.good.filter((word) => answer.includes(word.toLowerCase()));
  const riskyHits = scenario.risky.filter((word) => answer.includes(word.toLowerCase()));
  const hasCoreAction = goodHits.length >= 2 || scenario.options.some((option) => answer.includes(option));
  lastMetrics = calculateMetrics(raw, scenario);
  drawRadar(lastMetrics);

  if (riskyHits.length > 0 && goodHits.length === 0) {
    setFeedback(
      "需要纠正",
      `这个回答可能让你继续处在危险里。童童老师建议：${scenario.feedbackImprove}`,
      "danger"
    );
    saveAttempt("danger", "需要重点陪伴", raw, scenario.feedbackImprove);
    speakTeacher(scenario.feedbackImprove);
    return;
  }

  if (hasCoreAction) {
    completed.add(currentIndex);
    setFeedback("回答正确", scenario.feedbackGood, "good");
    saveAttempt("good", "掌握较好", raw, scenario.feedbackGood);
    speakTeacher(scenario.feedbackGood);
    updateProgress();
    return;
  }

  setFeedback("再补一句", scenario.feedbackImprove, "warning");
  saveAttempt("warn", "需要补充动作", raw, scenario.feedbackImprove);
  speakTeacher(scenario.feedbackImprove);
}

function saveAttempt(status, label, answer, feedback) {
  attempts[currentIndex] = {
    status,
    label,
    answer,
    feedback,
    metrics: [...lastMetrics],
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
  };
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      updatedAt: new Date().toISOString(),
      attempts
    })
  );
}

function calculateMetrics(raw, scenario) {
  const answer = raw.trim().toLowerCase();
  if (!answer) return [...initialMetrics];

  const groups = [
    ["危险", "不舒服", "害怕", "威胁", "陌生", "红灯", "隐私", "坏", "不安全", "诱骗"],
    ["拒绝", "不要", "不行", "不去", "不发", "不收", "别碰", "拉黑", "删除", "不可以"],
    ["求助", "告诉", "爸爸", "妈妈", "父母", "家长", "老师", "警察", "报警", "保安"],
    ["离开", "跑", "逃", "人多", "安全", "截图", "证据", "保留", "呼喊", "救命"],
    ["身体", "边界", "隐私", "照片", "秘密", "不能", "不可以", "我的身体", "保护", "保密"]
  ];

  const scenarioHits = scenario.good.filter((word) => answer.includes(word.toLowerCase())).length;
  const riskyHits = scenario.risky.filter((word) => answer.includes(word.toLowerCase())).length;

  return groups.map((keywords, index) => {
    const hits = keywords.filter((word) => answer.includes(word)).length;
    const base = 50 + Math.min(answer.length, 36) * 0.45;
    const score = base + hits * 9 + scenarioHits * 4.5 - riskyHits * 18 + index * 1.2;
    return clamp(score, riskyHits ? 18 : 58, 100);
  });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setFeedback(title, text, state) {
  if (!els.feedbackBox) return;
  els.feedbackBox.className = `feedback ${
    state === "good" ? "is-good success" : state === "warning" ? "is-warning warning" : state === "danger" ? "is-danger" : ""
  }`;
  els.feedbackBox.innerHTML = `<span class="feedback-state">${title}</span><p>${text}</p>`;
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    if (els.recordLabel) els.recordLabel.textContent = "输入回答";
    els.recordBtn?.addEventListener("click", () => els.answerInput.focus(), { once: true });
    els.bigMicBtn?.addEventListener("click", () => els.answerInput.focus(), { once: true });
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    isRecording = true;
    els.recordBtn?.classList.add("is-recording", "recording");
    els.bigMicBtn?.classList.add("is-recording");
    if (els.recordLabel) els.recordLabel.textContent = "正在听...";
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      transcript += event.results[i][0].transcript;
    }
    if (els.answerInput) els.answerInput.value = transcript;
    lastMetrics = calculateMetrics(transcript, scenarios[currentIndex]);
    drawRadar(lastMetrics);
  };

  recognition.onerror = () => {
    setFeedback("录音未完成", "浏览器没有完成语音识别，可以直接在输入框写下你的回答。", "warning");
  };

  recognition.onend = () => {
    isRecording = false;
    els.recordBtn?.classList.remove("is-recording", "recording");
    els.bigMicBtn?.classList.remove("is-recording");
    if (els.recordLabel) els.recordLabel.textContent = "说出你的决定";
    if (els.answerInput?.value.trim()) analyzeAnswer();
  };
}

function toggleRecording() {
  if (!recognition) {
    els.answerInput?.focus();
    return;
  }
  if (isRecording) {
    recognition.stop();
    return;
  }
  if (els.answerInput) els.answerInput.value = "";
  drawRadar(initialMetrics);
  recognition.start();
}

function speakScene() {
  const scenario = scenarios[currentIndex];
  speakSequence([
    { text: scenario.prompt, role: "teacher" },
    { text: `对方说：${scenario.dialogue}`, role: "villain" },
    { text: scenario.coach, role: "teacher" }
  ]);
}

function speakTeacher(text) {
  speakWithRole(text, "teacher");
}

function speakVillain(text) {
  speakWithRole(text, "villain");
}

function speakWithRole(text, role) {
  speakSequence([{ text, role }]);
}

function speakSequence(parts) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  
  // 触发播放中的波纹样式
  els.recordBtn?.classList.add("speaking");

  const queue = parts.flatMap((part) =>
    segmentSpeech(part.text).map((text, index) => ({
      text,
      role: part.role,
      index
    }))
  );

  const playNext = () => {
    const part = queue.shift();
    if (!part) {
      els.recordBtn?.classList.remove("speaking");
      return;
    }
    const utterance = createUtterance(part.text, part.role, part.index);
    utterance.onend = playNext;
    utterance.onerror = () => els.recordBtn?.classList.remove("speaking");
    window.speechSynthesis.speak(utterance);
  };

  playNext();
}

function segmentSpeech(text) {
  return text
    .split(/(?<=[。！？!?])/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function createUtterance(text, role, index = 0) {
  refreshVoices();
  const utterance = new SpeechSynthesisUtterance(shapeSpeechText(text, role));
  utterance.lang = "zh-CN";
  utterance.voice = pickVoice(role);

  if (role === "villain") {
    utterance.pitch = index % 2 === 0 ? 0.42 : 0.5;
    utterance.rate = index % 2 === 0 ? 0.66 : 0.72;
    utterance.volume = 1;
  } else {
    utterance.pitch = index % 2 === 0 ? 1.34 : 1.22;
    utterance.rate = index % 2 === 0 ? 1.05 : 0.98;
    utterance.volume = 0.95;
  }

  return utterance;
}

function shapeSpeechText(text, role) {
  if (role === "villain") {
    return text.replace(/，/g, "。 ").replace(/。/g, "。  ").replace(/别/g, "别 ");
  }
  return text.replace(/。/g, "。 ").replace(/：/g, "： ").replace(/请/g, "请 ");
}

function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  availableVoices = window.speechSynthesis.getVoices();
}

function pickVoice(role) {
  if (!availableVoices.length) return null;
  const zhVoices = availableVoices.filter((voice) => /zh|cmn|Chinese/i.test(`${voice.lang} ${voice.name}`));
  const pool = zhVoices.length ? zhVoices : availableVoices;
  const teacherPriority = ["Xiaoxiao", "Xiaoyi", "Huihui", "Yaoyao", "Tingting", "Female", "Woman", "女"];
  const villainPriority = ["Kangkang", "Yunyang", "Yunxi", "Male", "Man", "男"];
  const priority = role === "villain" ? villainPriority : teacherPriority;

  const scored = pool
    .map((voice) => {
      const name = voice.name.toLowerCase();
      const rank = priority.findIndex((item) => name.includes(item.toLowerCase()));
      const naturalBoost = /natural|online|neural/i.test(voice.name) ? -0.5 : 0;
      return { voice, score: rank === -1 ? 99 : rank + naturalBoost };
    })
    .sort((a, b) => a.score - b.score);

  return scored[0]?.voice || null;
}

function drawRadar(values) {
  if (!els.radarCanvas) return;
  drawRadarOn(els.radarCanvas, values);
  renderRadarLegend(values);
}

function drawRadarOn(canvas, values) {
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) * 0.35;
  const points = values.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 1;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "14px Microsoft YaHei, Arial";

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

  values.forEach((value, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / points;
    const r = (radius * value) / 100;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#f47c32";
    ctx.fill();
  });

  ctx.fillStyle = "#263238";
  dimensionLabels.forEach((label, i) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * i) / points;
    const labelRadius = radius + 42;
    const x = centerX + Math.cos(angle) * labelRadius;
    const y = centerY + Math.sin(angle) * labelRadius;
    ctx.fillText(label, x, y);
  });
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

// 页面加载完成后启动
document.addEventListener("DOMContentLoaded", init);
