// ==========================================
// 童盾智伴 - 拟真剧情与语音交互引擎 (升级版)
// ==========================================

// 1. 场景数据定义（文案情感化重构）
const SCENARIOS = [
  {
    id: "boundary",
    type: "身体边界",
    title: "熟人不当触碰场景",
    risk: "高风险识别",
    image: "assets/scene-boundary.png",
    prompt: "放学后，平常很熟悉的邻居叔叔突然把你拉到角落，想要摸你的身体，还说要给你买冰淇淋，让你千万别告诉爸爸妈妈。",
    dialogue: "（压低声音）小宝，叔叔这里有好多好吃的，只要你让叔叔摸一下，这些都给你，这是咱们俩的小秘密哦！",
    coachLine: "别害怕，有童童老师在！任何让你感觉不舒服的触碰，都不是你的错，要勇敢说‘不’！",
    trafficText: "红灯警告：隐私部位严禁任何人触碰！如果有人让你保密，一定要马上拒绝并求助。",
    options: [
      { text: "“叔叔，我不想要冰淇淋，请你放开我，我要去找老师了！”", correct: true, feedback: "太棒啦！你非常勇敢地坚守了身体边界，并及时选择求助！" },
      { text: "“那……好吧，但你不能告诉别人哦。”", correct: false, feedback: "危险哦！身体是属于你自己的，任何涉及身体隐私的‘秘密’都是坏秘密，必须立刻拒绝！" },
      { text: "害怕得不敢说话，低着头顺从。", correct: false, feedback: "遇到这种情况害怕是很正常的，但记住：大声喊出来或者立刻跑向人多的地方才能保护自己！" }
    ]
  },
  {
    id: "stranger",
    type: "陌生人危机",
    title: "小巷拉拽与引诱",
    risk: "极高风险",
    image: "assets/scene-boundary.png",
    prompt: "在回家的路上，一个戴口罩的陌生人突然拦住你，说你妈妈出了车祸，要带你坐他的车去医院。",
    dialogue: "“快上车！你妈妈在医院抢救呢，我是你妈妈的朋友，再晚就来不及了！”",
    coachLine: "遇到紧急情况先别慌，陌生人带你走时，必须先向老师或熟悉的大人核实！",
    trafficText: "黄灯提醒：不跟陌生人走、不上陌生人的车，遇事找警察叔叔或穿制服的工作人员。",
    options: [
      { text: "“我不认识你！我现在就打电话给我爸爸核实！”", correct: true, feedback: "太机智了！不轻信陌生人的话，学会核实信息是保护自己的金钥匙！" },
      { text: "太着急了，立刻跟着陌生人上车。", correct: false, feedback: "千万不行哦！坏人经常用‘家人出事’来骗小朋友，一定要先找老师或警察帮忙打电话确认！" }
    ]
  }
];

let currentIndex = 0;
let isRecording = false;

// 2. Web Audio API：现场动态合成“魔法提示音”（无需额外加载外部MP3文件）
function playMagicChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 音符
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5 音符
    
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    console.log("AudioContext not supported");
  }
}

// 3. 拟真语音合成函数（感情化调校）
function speakText(text, onEndCallback) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel(); // 停止当前播放
  playMagicChime(); // 播放魔法提示音

  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.pitch = 1.25; // 高音调，让声音更像温柔的童声音色/绘本老师
    utterance.rate = 0.92;  // 稍微放慢，让语音充满故事感与安抚感

    // 智能筛选优质中文语音包
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.includes('zh') && (v.name.includes('Xiaoxiao') || v.name.includes('Yunxi') || v.name.includes('Google') || v.name.includes('Ting-Ting'))
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    // UI 效果：触发说话声波状态
    const recordBtn = document.getElementById('recordBtn');
    if (recordBtn) recordBtn.classList.add('speaking');

    utterance.onend = () => {
      if (recordBtn) recordBtn.classList.remove('speaking');
      if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
  }, 150);
}

// 4. 渲染当前场景
function renderScene(index) {
  const scene = SCENARIOS[index];
  document.getElementById('sceneType').innerText = scene.type;
  document.getElementById('sceneTitle').innerText = scene.title;
  document.getElementById('riskPill').innerText = scene.risk;
  document.getElementById('scenePrompt').innerText = scene.prompt;
  document.getElementById('dialogueText').innerText = scene.dialogue;
  document.getElementById('coachLine').innerText = scene.coachLine;
  document.getElementById('trafficText').innerText = scene.trafficText;

  // 渲染选项列表
  const optionsContainer = document.getElementById('answerOptions');
  optionsContainer.innerHTML = '';
  scene.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = `${String.fromCharCode(65 + idx)}. ${opt.text}`;
    btn.onclick = () => handleAnswerSelect(opt);
    optionsContainer.appendChild(btn);
  });

  // 更新进度条
  document.getElementById('progressText').innerText = `${index + 1} / ${SCENARIOS.length}`;
  document.getElementById('progressBar').style.width = `${((index + 1) / SCENARIOS.length) * 100}%`;

  // 重置反馈框
  const feedbackBox = document.getElementById('feedbackBox');
  feedbackBox.className = 'feedback';
  feedbackBox.innerHTML = `<span class="feedback-state">等待回答</span><p>别紧张，选一个做法，或者按住录音按钮说出你的决定吧！</p>`;

  drawRadarChart();
}

// 5. 处理选项选择
function handleAnswerSelect(option) {
  const feedbackBox = document.getElementById('feedbackBox');
  if (option.correct) {
    feedbackBox.className = 'feedback success';
    feedbackBox.innerHTML = `<span class="feedback-state">正确应对！</span><p>${option.feedback}</p>`;
    speakText(`棒极了！${option.feedback}`);
  } else {
    feedbackBox.className = 'feedback warning';
    feedbackBox.innerHTML = `<span class="feedback-state">警惕提醒</span><p>${option.feedback}</p>`;
    speakText(`要小心哦！${option.feedback}`);
  }
}

// 6. 绘制五维能力雷达图
function drawRadarChart() {
  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 100;
  const labels = ['识别危险', '拒绝能力', '求助意识', '自我保护', '边界意识'];
  const values = [0.85, 0.90, 0.75, 0.88, 0.95]; // 模拟实时数据

  // 绘制五边形背景网格
  for (let r = radius; r > 0; r -= 25) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();
  }

  // 绘制数据区域
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
    const x = centerX + radius * values[i] * Math.cos(angle);
    const y = centerY + radius * values[i] * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(49, 130, 206, 0.35)';
  ctx.fill();
  ctx.strokeStyle = '#3182ce';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 绘制标签
  ctx.fillStyle = '#4a5568';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  labels.forEach((label, i) => {
    const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
    const x = centerX + (radius + 22) * Math.cos(angle);
    const y = centerY + (radius + 15) * Math.sin(angle);
    ctx.fillText(label, x, y);
  });
}

// 7. 事件绑定
document.addEventListener('DOMContentLoaded', () => {
  renderScene(currentIndex);

  // 场景台词朗读
  document.getElementById('playDialogueBtn').onclick = () => {
    const scene = SCENARIOS[currentIndex];
    speakText(`坏人说：${scene.dialogue}`);
  };

  // 童童老师/场景整体朗读
  document.getElementById('speakSceneBtn').onclick = () => {
    const scene = SCENARIOS[currentIndex];
    speakText(`${scene.title}。${scene.prompt}`);
  };

  // 模拟语音录音按钮交互
  const recordBtn = document.getElementById('recordBtn');
  recordBtn.onclick = () => {
    if (!isRecording) {
      isRecording = true;
      document.getElementById('recordLabel').innerText = "正在倾听中... (再点击结束)";
      recordBtn.classList.add('recording');
    } else {
      isRecording = false;
      document.getElementById('recordLabel').innerText = "按住/点击 语音说出你的决定";
      recordBtn.classList.remove('recording');
      // 模拟解析结果
      document.getElementById('answerInput').value = "我不认识你，我要大声叫人了！";
      speakText("听到啦！你的回答非常棒，能够果断拒绝并准备求助，童童老师给你点赞！");
    }
  };

  // 一键重测
  document.getElementById('resetBtn').onclick = () => {
    currentIndex = (currentIndex + 1) % SCENARIOS.length;
    renderScene(currentIndex);
  };
});
