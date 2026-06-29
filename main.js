/* Split from script.js. Loaded as a plain browser script. */
const petLine = document.querySelector("#petLine");
const ageDays = document.querySelector("#ageDays");
const nextBirthday = document.querySelector("#nextBirthday");
const planetGrid = document.querySelector("#planetGrid");
const mailbox = document.querySelector("#mailbox");
const sky = document.querySelector(".sky");
const mascotCard = document.querySelector("#mascotCard");
const lineDog = document.querySelector("#lineDog");
const petButton = document.querySelector("#petButton");
const nextLineButton = document.querySelector("#nextLineButton");
const dialog = document.querySelector("#planetDialog");
const closeDialog = dialog.querySelector(".close");
const dialogLabel = document.querySelector("#dialogLabel");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogText = document.querySelector("#dialogText");
const dialogNote = document.querySelector("#dialogNote");
const dailyTitle = document.querySelector("#dailyTitle");
const dailyFormula = document.querySelector("#dailyFormula");
const dailyAdvice = document.querySelector("#dailyAdvice");
const dailyAction = document.querySelector("#dailyAction");
const newSparkButton = document.querySelector("#newSparkButton");
const copySparkButton = document.querySelector("#copySparkButton");
const doneSparkButton = document.querySelector("#doneSparkButton");
const copySparkStatus = document.querySelector("#copySparkStatus");
const missionCount = document.querySelector("#missionCount");
const missionBar = document.querySelector("#missionBar");
const missionList = document.querySelector("#missionList");
const resetMissionButton = document.querySelector("#resetMissionButton");
const wishNote = document.querySelector("#wishNote");
const wishCount = document.querySelector("#wishCount");
const wishSavedAt = document.querySelector("#wishSavedAt");
const saveWishButton = document.querySelector("#saveWishButton");
const clearWishButton = document.querySelector("#clearWishButton");
const dataSummary = document.querySelector("#dataSummary");
const exportDataButton = document.querySelector("#exportDataButton");
const clearLearningButton = document.querySelector("#clearLearningButton");
const clearMoodButton = document.querySelector("#clearMoodButton");
const clearAllDataButton = document.querySelector("#clearAllDataButton");
const dataStatus = document.querySelector("#dataStatus");
const quizProgress = document.querySelector("#quizProgress");
const quizQuestion = document.querySelector("#quizQuestion");
const quizOptions = document.querySelector("#quizOptions");
const quizFeedback = document.querySelector("#quizFeedback");
const nextQuizButton = document.querySelector("#nextQuizButton");
const resetQuizButton = document.querySelector("#resetQuizButton");
const matchPrompt = document.querySelector("#matchPrompt");
const matchOptions = document.querySelector("#matchOptions");
const matchFeedback = document.querySelector("#matchFeedback");
const matchScore = document.querySelector("#matchScore");
const newMatchButton = document.querySelector("#newMatchButton");
const mistakeCount = document.querySelector("#mistakeCount");
const mistakeList = document.querySelector("#mistakeList");
const reviewMistakeButton = document.querySelector("#reviewMistakeButton");
const clearMistakesButton = document.querySelector("#clearMistakesButton");
const knowledgeTotal = document.querySelector("#knowledgeTotal");
const knowledgeMap = document.querySelector("#knowledgeMap");
const achievementCount = document.querySelector("#achievementCount");
const achievementList = document.querySelector("#achievementList");
const weatherOptions = document.querySelector("#weatherOptions");
const weatherResponse = document.querySelector("#weatherResponse");
const breathingPlanet = document.querySelector("#breathingPlanet");
const breathingPhase = document.querySelector("#breathingPhase");
const breathingButton = document.querySelector("#breathingButton");
const comfortLine = document.querySelector("#comfortLine");
const comfortButton = document.querySelector("#comfortButton");
const guardButton = document.querySelector("#guardButton");
const bubbleStage = document.querySelector("#bubbleStage");
const bubbleMessage = document.querySelector("#bubbleMessage");
const bubbleCalmBar = document.querySelector("#bubbleCalmBar");
const resetBubblesButton = document.querySelector("#resetBubblesButton");
const cloudGuide = document.querySelector("#cloudGuide");
const cloudBank = document.querySelector("#cloudBank");
const cloudBuckets = document.querySelector("#cloudBuckets");
const resetCloudsButton = document.querySelector("#resetCloudsButton");
const ventPrompts = document.querySelector("#ventPrompts");
const ventNote = document.querySelector("#ventNote");
const ventCount = document.querySelector("#ventCount");
const ventSavedAt = document.querySelector("#ventSavedAt");
const saveVentButton = document.querySelector("#saveVentButton");
const clearVentButton = document.querySelector("#clearVentButton");
const ventStars = document.querySelector("#ventStars");
const helpOptions = document.querySelector("#helpOptions");
const helpMessage = document.querySelector("#helpMessage");
const copyHelpButton = document.querySelector("#copyHelpButton");
const moodTimeline = document.querySelector("#moodTimeline");
const experimentLabel = document.querySelector("#experimentLabel");
const labTitle = document.querySelector("#labTitle");
const labQuestion = document.querySelector("#labQuestion");
const labTabs = document.querySelector("#labTabs");
const controlOneLabel = document.querySelector("#controlOneLabel");
const controlTwoLabel = document.querySelector("#controlTwoLabel");
const forceSlider = document.querySelector("#forceSlider");
const massSlider = document.querySelector("#massSlider");
const forceValue = document.querySelector("#forceValue");
const massValue = document.querySelector("#massValue");
const labResultLabel = document.querySelector("#labResultLabel");
const accelerationValue = document.querySelector("#accelerationValue");
const labVisual = document.querySelector("#labVisual");
const motionHint = document.querySelector("#motionHint");
const completeLabButton = document.querySelector("#completeLabButton");
const updateToast = document.querySelector("#updateToast");
const refreshAppButton = document.querySelector("#refreshAppButton");
let orbitAnimationFrame = 0;
let petLineIndex = 0;
let dogGifIndex = 0;
let dogGifTimer = 0;
let currentSparkIndex = 0;
let wishSaveTimer = 0;
let quizIndex = 0;
let quizCorrect = 0;
let quizAnswered = false;
let quizRoundQuestions = [];
let matchIndex = 0;
let matchCorrect = 0;
let currentLabIndex = 0;
let labPhysicsFrame = 0;
let labPhysicsState = null;
let breathingTimer = 0;
let breathingStep = 0;
let selectedCloud = "";

function formatDate(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

function daysBetween(start, end) {
  const oneDay = 24 * 60 * 60 * 1000;
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((endDay - startDay) / oneDay);
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSeededIndex(seed, length) {
  let hash = 0;

  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) % 1000003;
  }

  return hash % length;
}

function shuffleList(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[nextIndex]] = [shuffled[nextIndex], shuffled[index]];
  }

  return shuffled;
}



function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeStoredItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // localStorage can fail in strict private browsing modes.
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return entities[char];
  });
}



function formatSavedTime(isoString) {
  if (!isoString) return "尚未保存";

  return `已保存：${new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(isoString))}`;
}



function updateBirthdayPanel() {
  const today = new Date();
  const next = new Date(today.getFullYear(), 7, 20);

  if (next < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
    next.setFullYear(today.getFullYear() + 1);
  }

  ageDays.textContent = `${daysBetween(birthday, today).toLocaleString("zh-CN")} 天`;
  nextBirthday.textContent = `${daysBetween(today, next)} 天`;

  if (today.getMonth() === 7 && today.getDate() === 20) {
    petLine.textContent = "生日快乐，今天小猫小狗和整颗星球都在发光。";
    launchConfetti();
  }
}

function renderPlanets() {
  const rings = planets
    .map(
      (planet) => `
        <span
          class="orbit-ring"
          style="--orbit-size: ${planet.orbit * 2}px; --duration: ${planet.duration}s;"
          aria-hidden="true"
        ></span>
      `
    )
    .join("");

  const planetNodes = planets
    .map(
      (planet, index) => `
        <button
          class="planet-card orbital-planet"
          type="button"
          style="
            --planet-bg: ${planet.bg};
            --tilt: ${planet.tilt};
            --orbit-radius: ${planet.orbit}px;
            --planet-size: ${planet.size}px;
            --duration: ${planet.duration}s;
            --start-angle: ${planet.start}deg;
            --end-angle: ${planet.start + 360}deg;
            --counter-start: ${-planet.start}deg;
            --counter-end: ${-(planet.start + 360)}deg;
          "
          data-index="${index}"
          aria-label="打开${planet.title}"
        >
          <span class="planet-surface ${planet.type}" aria-hidden="true"></span>
          <span class="planet-name">${planet.shortTitle}</span>
          <span class="planet-subname">${planet.title.split(" · ")[1]}</span>
        </button>
      `
    )
    .join("");

  planetGrid.innerHTML = `
    <div class="orbit-hud">
      <span>ORBITAL MEMORY SYSTEM</span>
      <span>HZ-YING / 2011.08.20</span>
    </div>
    <div class="orbit-core" aria-hidden="true">
      <span class="core-title">何芷滢</span>
      <span class="core-subtitle">Physics Star</span>
    </div>
    ${rings}
    ${planetNodes}
  `;

  startOrbitSystem();
}

function startOrbitSystem() {
  if (orbitAnimationFrame) {
    cancelAnimationFrame(orbitAnimationFrame);
  }

  const planetButtons = [...planetGrid.querySelectorAll(".orbital-planet")];
  const rings = [...planetGrid.querySelectorAll(".orbit-ring")];
  const startedAt = performance.now();

  function tick(now) {
    const elapsed = (now - startedAt) / 1000;

    planetButtons.forEach((button) => {
      const planet = planets[Number(button.dataset.index)];
      const angle = planet.start + (elapsed / planet.duration) * 360;

      button.style.setProperty("--angle", `${angle}deg`);
      button.style.setProperty("--counter-angle", `${-angle}deg`);
    });

    rings.forEach((ring, index) => {
      const planet = planets[index];
      const angle = (elapsed / planet.duration) * 360;
      ring.style.setProperty("--ring-angle", `${angle}deg`);
    });

    orbitAnimationFrame = requestAnimationFrame(tick);
  }

  orbitAnimationFrame = requestAnimationFrame(tick);
}

function openPlanet(index) {
  const planet = planets[index];
  dialogLabel.textContent = planet.label;
  dialogTitle.textContent = planet.title;
  dialogText.textContent = planet.text;
  dialogNote.textContent = planet.note;
  dialog.showModal();
}

function createComet() {
  const comet = document.createElement("span");
  comet.className = "comet";
  comet.style.left = `${Math.random() * 70 - 12}vw`;
  comet.style.top = `${Math.random() * 38 + 4}vh`;
  sky.append(comet);
  comet.addEventListener("animationend", () => comet.remove());
}

function createTrailDot(x, y) {
  const dot = document.createElement("span");
  dot.className = "trail-dot";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  document.body.append(dot);
  dot.addEventListener("animationend", () => dot.remove());
}

function createPaw(x, y) {
  const paw = document.createElement("span");
  paw.className = "paw-pop";
  paw.style.left = `${x}px`;
  paw.style.top = `${y}px`;
  paw.style.setProperty("--paw-rotate", `${Math.random() * 50 - 25}deg`);
  document.body.append(paw);
  paw.addEventListener("animationend", () => paw.remove());
}

function createBurst(x, y, amount = 18) {
  const colors = ["#ff9ac2", "#ffd0a6", "#9ff0d2", "#6fa8ff", "#fff6b9"];

  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    const angle = (Math.PI * 2 * index) / amount;
    const distance = 42 + Math.random() * 54;

    piece.className = "burst-piece";
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    piece.style.setProperty("--burst-color", colors[index % colors.length]);
    piece.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    piece.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
    document.body.append(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function renderMailbox() {
  const today = new Date();
  mailbox.innerHTML = letters
    .map((letter) => {
      const unlockDate = new Date(`${letter.unlock}T00:00:00+08:00`);
      const isOpen = today >= unlockDate;
      const waitDays = Math.max(0, daysBetween(today, unlockDate));

      return `
        <article class="mail ${isOpen ? "open" : "locked"}">
          <h3>${letter.title}</h3>
          <time datetime="${letter.unlock}">${formatDate(unlockDate)}</time>
          <p>${
            isOpen
              ? letter.open
              : `还没有到打开的时间。再过 ${waitDays} 天，这封信会自己亮起来。`
          }</p>
        </article>
      `;
    })
    .join("");
}

function rotatePetLine() {
  setInterval(() => {
    showNextPetLine();
  }, 5200);
}

function showNextPetLine() {
  petLineIndex = (petLineIndex + 1) % petLines.length;
  petLine.textContent = petLines[petLineIndex];
}

function makeDogHappy() {
  lineDog.classList.remove("is-happy");
  void lineDog.offsetWidth;
  lineDog.classList.add("is-happy");
  window.setTimeout(() => lineDog.classList.remove("is-happy"), 520);
}

function preloadDogGifs() {
  dogGifs.forEach((src) => {
    const image = new Image();
    image.src = src;
  });
}

function switchDogGif(forceRandom = false) {
  let nextIndex = dogGifIndex;

  if (forceRandom) {
    while (nextIndex === dogGifIndex && dogGifs.length > 1) {
      nextIndex = Math.floor(Math.random() * dogGifs.length);
    }
  } else {
    nextIndex = (dogGifIndex + 1) % dogGifs.length;
  }

  dogGifIndex = nextIndex;
  lineDog.classList.add("is-switching");

  window.setTimeout(() => {
    lineDog.src = dogGifs[dogGifIndex];
    lineDog.classList.remove("is-switching");
  }, 160);
}

function scheduleDogGifSwitch() {
  const delay = 6500 + Math.random() * 8500;

  dogGifTimer = window.setTimeout(() => {
    switchDogGif(true);
    scheduleDogGifSwitch();
  }, delay);
}

function launchConfetti() {
  const colors = ["#ff9ac2", "#ffd0a6", "#9ff0d2", "#6fa8ff", "#fff6b9"];

  for (let index = 0; index < 90; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.setProperty("--confetti-color", colors[index % colors.length]);
    piece.style.setProperty("--duration", `${2.6 + Math.random() * 2.8}s`);
    piece.style.animationDelay = `${Math.random() * 1.6}s`;
    document.body.append(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

function renderDailySpark(index = currentSparkIndex) {
  const spark = dailySparks[index];
  currentSparkIndex = index;
  dailyTitle.textContent = spark.title;
  dailyFormula.textContent = spark.formula;
  dailyAdvice.textContent = spark.advice;
  dailyAction.textContent = `今日小任务：${spark.action}`;
  copySparkStatus.textContent = `今日星光编号：${getLocalDateKey()}`;
}

function initDailySpark() {
  const dateKey = getLocalDateKey();
  currentSparkIndex = getSeededIndex(`he-zhiying-${dateKey}`, dailySparks.length);
  renderDailySpark(currentSparkIndex);
}

function showAnotherSpark() {
  let nextIndex = currentSparkIndex;

  while (nextIndex === currentSparkIndex && dailySparks.length > 1) {
    nextIndex = Math.floor(Math.random() * dailySparks.length);
  }

  renderDailySpark(nextIndex);

  const rect = newSparkButton.getBoundingClientRect();
  createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
}

function buildSparkText() {
  const spark = dailySparks[currentSparkIndex];

  return [
    `何芷滢的今日星光：${spark.title}`,
    `幸运公式：${spark.formula}`,
    `小提醒：${spark.advice}`,
    `今日小任务：${spark.action}`
  ].join("\n");
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-999px";
  textarea.style.top = "0";
  document.body.append(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  return copied ? Promise.resolve() : Promise.reject(new Error("copy failed"));
}

function getMissionState() {
  const saved = readJson(storageKeys.missions, {});

  return missions.reduce((state, mission) => {
    state[mission.id] = Boolean(saved[mission.id]);
    return state;
  }, {});
}

function saveMissionState(state) {
  writeJson(storageKeys.missions, state);
}

function renderMissions() {
  const state = getMissionState();
  const completed = missions.filter((mission) => state[mission.id]).length;
  const progress = Math.round((completed / missions.length) * 100);

  missionCount.textContent = `${completed}/${missions.length}`;
  missionBar.style.width = `${progress}%`;
  missionList.innerHTML = missions
    .map((mission) => {
      const isDone = state[mission.id];

      return `
        <li class="${isDone ? "is-done" : ""}">
          <button
            class="mission-toggle"
            type="button"
            data-mission-id="${mission.id}"
            aria-pressed="${isDone}"
          >
            <span class="mission-check" aria-hidden="true"></span>
            <span>${mission.text}</span>
          </button>
        </li>
      `;
    })
    .join("");

  renderLearningCompanion();
}

function setMission(id, isDone = true) {
  const state = getMissionState();

  if (!(id in state) || state[id] === isDone) return;

  state[id] = isDone;
  saveMissionState(state);
  renderMissions();
  renderDataSummary();
}

function toggleMission(id) {
  const state = getMissionState();

  if (!(id in state)) return;

  state[id] = !state[id];
  saveMissionState(state);
  renderMissions();
}

function completeMission(id) {
  setMission(id, true);
}

function resetMissions() {
  saveMissionState({});
  renderMissions();
}

function updateWishMeta(updatedAt = "") {
  wishCount.textContent = `${wishNote.value.length}/240`;
  wishSavedAt.textContent = formatSavedTime(updatedAt);
}

function loadWishNote() {
  const saved = readJson(storageKeys.wish, { text: "", updatedAt: "" });

  wishNote.value = saved.text || "";
  updateWishMeta(saved.updatedAt || "");

  if (wishNote.value.trim()) {
    completeMission("wish");
  }
}

function saveWishNote(showFeedback = true) {
  const text = wishNote.value.trim();

  if (!text) {
    wishSavedAt.textContent = "先写一点内容再保存";
    setMission("wish", false);
    return;
  }

  const updatedAt = new Date().toISOString();
  const didSave = writeJson(storageKeys.wish, {
    text: wishNote.value,
    updatedAt
  });

  if (!didSave) {
    wishSavedAt.textContent = "浏览器禁止本地保存";
    return;
  }

  updateWishMeta(updatedAt);
  completeMission("wish");
  renderDataSummary();

  if (showFeedback) {
    const rect = saveWishButton.getBoundingClientRect();
    createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
    petLine.textContent = "这张小便签已经被星光收好了，只保存在这台设备里。";
  }
}

function scheduleWishSave() {
  window.clearTimeout(wishSaveTimer);

  if (!wishNote.value.trim()) {
    updateWishMeta(readJson(storageKeys.wish, { updatedAt: "" }).updatedAt || "");
    return;
  }

  wishSavedAt.textContent = "正在自动保存...";
  wishSaveTimer = window.setTimeout(() => saveWishNote(false), 900);
}

function clearWishNote() {
  window.clearTimeout(wishSaveTimer);
  wishNote.value = "";
  removeStoredItem(storageKeys.wish);
  updateWishMeta("");
  setMission("wish", false);
  renderDataSummary();
}

function getLocalDataSnapshot() {
  return {
    exportedAt: new Date().toISOString(),
    missions: readJson(storageKeys.missions, {}),
    wish: readJson(storageKeys.wish, { text: "", updatedAt: "" }),
    learning: readJson(storageKeys.learning, {}),
    mood: readJson(storageKeys.mood, {})
  };
}

function renderDataSummary() {
  if (!dataSummary) return;
  const snapshot = getLocalDataSnapshot();
  const learningAttempts = snapshot.learning.attempts || 0;
  const mistakes = Array.isArray(snapshot.learning.mistakes) ? snapshot.learning.mistakes.length : 0;
  const moodNotes = Array.isArray(snapshot.mood.notes) ? snapshot.mood.notes.length : 0;
  const missionDone = Object.values(snapshot.missions).filter(Boolean).length;
  dataSummary.innerHTML = `
    <span>星光清单：${missionDone}/${missions.length}</span>
    <span>学习记录：${learningAttempts} 次练习，${mistakes} 条错题</span>
    <span>情绪小屋：${moodNotes} 条小星星</span>
    <span>未来便签：${snapshot.wish.text ? "已保存" : "未保存"}</span>
  `;
}

async function exportLocalData() {
  const text = JSON.stringify(getLocalDataSnapshot(), null, 2);
  try {
    await navigator.clipboard.writeText(text);
    dataStatus.textContent = "本地记录已复制为 JSON";
  } catch {
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `physics-star-data-${getLocalDateKey()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    dataStatus.textContent = "已下载本地记录 JSON";
  }
}

function clearLearningData() {
  removeStoredItem(storageKeys.learning);
  renderLearningCompanion();
  renderDataSummary();
  dataStatus.textContent = "学习记录已清空";
}

function clearMoodData() {
  removeStoredItem(storageKeys.mood);
  selectedCloud = "";
  ventNote.value = "";
  renderMoodHouse();
  renderDataSummary();
  dataStatus.textContent = "情绪小屋记录已清空";
}

function clearAllLocalData() {
  Object.values(storageKeys).forEach((key) => removeStoredItem(key));
  selectedCloud = "";
  wishNote.value = "";
  ventNote.value = "";
  renderMissions();
  loadWishNote();
  renderLearningCompanion();
  renderMoodHouse();
  renderDataSummary();
  dataStatus.textContent = "全部本地记录已清空";
}

function observeReadingSections() {
  const targets = [
    { selector: "#letter", mission: "letter" },
    { selector: "#future", mission: "future" }
  ];

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          completeMission(entry.target.dataset.missionId);
        }
      });
    },
    { threshold: [0.35] }
  );

  targets.forEach(({ selector, mission }) => {
    const target = document.querySelector(selector);

    if (!target) return;

    target.dataset.missionId = mission;
    observer.observe(target);
  });
}

function renderQuiz() {
  const question = quizRoundQuestions[quizIndex];
  const optionOrder = shuffleList(question.options.map((option, index) => ({ option, index })));

  quizAnswered = false;
  quizProgress.textContent = `${quizIndex + 1}/${quizRoundQuestions.length} · ${quizCorrect} 分 · 题库 ${quizQuestions.length}`;
  quizQuestion.textContent = question.question;
  quizFeedback.textContent = "选一个你觉得对的答案。";
  nextQuizButton.textContent = quizIndex === quizRoundQuestions.length - 1 ? "完成本轮" : "下一题";

  quizOptions.innerHTML = optionOrder
    .map(
      ({ option, index }) => `
        <button class="quiz-option" type="button" data-answer-index="${index}">
          ${option}
        </button>
      `
    )
    .join("");
}

function startQuizRound() {
  quizRoundQuestions = shuffleList(quizQuestions).slice(0, QUIZ_ROUND_SIZE);
  quizIndex = 0;
  quizCorrect = 0;
  renderQuiz();
}

function resetQuiz() {
  startQuizRound();
}

function answerQuiz(answerIndex) {
  if (quizAnswered) return;

  const question = quizRoundQuestions[quizIndex];
  const isCorrect = answerIndex === question.answer;
  const buttons = [...quizOptions.querySelectorAll(".quiz-option")];

  quizAnswered = true;

  if (isCorrect) {
    quizCorrect += 1;
    quizFeedback.textContent = `答对了。${question.explain}`;
    createBurst(window.innerWidth / 2, window.innerHeight * 0.42, 18);
  } else {
    quizFeedback.textContent = `这题先记一下：${question.explain}`;
  }

  recordLearningAttempt("quiz", question, isCorrect);

  buttons.forEach((button) => {
    const index = Number(button.dataset.answerIndex);
    button.disabled = true;
    button.classList.toggle("is-correct", index === question.answer);
    button.classList.toggle("is-wrong", index === answerIndex && !isCorrect);
  });

  quizProgress.textContent = `${quizIndex + 1}/${quizRoundQuestions.length} · ${quizCorrect} 分 · 题库 ${quizQuestions.length}`;

  if (quizIndex === quizRoundQuestions.length - 1) {
    completeMission("game");
    petLine.textContent = `物理快问完成：${quizCorrect}/${quizRoundQuestions.length}。小狗从 ${quizQuestions.length} 道题里抽了一轮星星题。`;
  }
}

function goNextQuiz() {
  if (!quizAnswered) {
    quizFeedback.textContent = "先选一个答案，再去下一题。";
    return;
  }

  if (quizIndex === quizRoundQuestions.length - 1) {
    startQuizRound();
    return;
  }

  quizIndex += 1;
  renderQuiz();
}

function renderMatch() {
  const card = matchCards[matchIndex];
  const optionOrder = shuffleList(card.options.map((option, index) => ({ option, index })));

  matchPrompt.textContent = card.prompt;
  matchFeedback.textContent = "点一下你认为匹配的卡片。";
  matchScore.textContent = `${matchCorrect} 分 · 题库 ${matchCards.length}`;
  matchOptions.innerHTML = optionOrder
    .map(
      ({ option, index }) => `
        <button class="match-option" type="button" data-match-index="${index}">
          ${option}
        </button>
      `
    )
    .join("");
}

function newMatchRound() {
  let nextIndex = matchIndex;

  while (nextIndex === matchIndex && matchCards.length > 1) {
    nextIndex = Math.floor(Math.random() * matchCards.length);
  }

  matchIndex = nextIndex;
  renderMatch();
}

function answerMatch(answerIndex) {
  const card = matchCards[matchIndex];
  const isCorrect = answerIndex === card.answer;
  const buttons = [...matchOptions.querySelectorAll(".match-option")];

  buttons.forEach((button) => {
    const index = Number(button.dataset.matchIndex);
    button.disabled = true;
    button.classList.toggle("is-correct", index === card.answer);
    button.classList.toggle("is-wrong", index === answerIndex && !isCorrect);
  });

  if (isCorrect) {
    matchCorrect += 1;
    matchFeedback.textContent = `配对成功。${card.explain}`;
    matchScore.textContent = `${matchCorrect} 分 · 题库 ${matchCards.length}`;
    completeMission("game");
    createBurst(window.innerWidth / 2, window.innerHeight * 0.48, 18);
    petLine.textContent = "公式配对成功，小狗给你贴了一枚知识星贴。";
  } else {
    matchFeedback.textContent = `差一点。${card.explain}`;
  }

  recordLearningAttempt("match", card, isCorrect);
}

function formatControlValue(value, unit) {
  const formatted = Number(value) % 1 === 0 ? Number(value).toFixed(0) : Number(value).toFixed(1);
  return `${formatted} ${unit}`;
}



planetGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".planet-card");
  if (!card) return;
  const rect = card.getBoundingClientRect();
  createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
  completeMission("planet");
  openPlanet(Number(card.dataset.index));
});

mascotCard.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  createBurst(event.clientX, event.clientY, 24);
  createPaw(event.clientX - 22, event.clientY + 12);
  createPaw(event.clientX + 24, event.clientY - 4);
  showNextPetLine();
  makeDogHappy();
  if (Math.random() > 0.45) {
    switchDogGif(true);
  }
  completeMission("pet");
});

petButton.addEventListener("click", (event) => {
  createBurst(event.clientX, event.clientY, 26);
  createPaw(event.clientX - 18, event.clientY + 8);
  createPaw(event.clientX + 22, event.clientY - 4);
  showNextPetLine();
  makeDogHappy();
  switchDogGif(true);
  completeMission("pet");
});

nextLineButton.addEventListener("click", () => {
  showNextPetLine();
});

newSparkButton.addEventListener("click", showAnotherSpark);

copySparkButton.addEventListener("click", () => {
  copyText(buildSparkText())
    .then(() => {
      copySparkStatus.textContent = "已复制，可以发给未来的自己。";
    })
    .catch(() => {
      copySparkStatus.textContent = "复制失败，可以手动选中文字保存。";
    });
});

doneSparkButton.addEventListener("click", (event) => {
  completeMission("spark");
  createBurst(event.clientX, event.clientY, 20);
  petLine.textContent = "今日小任务完成，小狗给你盖一个星光爪印。";
});

missionList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mission-id]");
  if (!button) return;
  toggleMission(button.dataset.missionId);
});

resetMissionButton.addEventListener("click", () => {
  resetMissions();
});

wishNote.addEventListener("input", scheduleWishSave);

saveWishButton.addEventListener("click", () => {
  saveWishNote();
});

clearWishButton.addEventListener("click", () => {
  clearWishNote();
});

exportDataButton.addEventListener("click", exportLocalData);

clearLearningButton.addEventListener("click", clearLearningData);

clearMoodButton.addEventListener("click", clearMoodData);

clearAllDataButton.addEventListener("click", clearAllLocalData);

quizOptions.addEventListener("click", (event) => {
  const option = event.target.closest("[data-answer-index]");
  if (!option) return;
  answerQuiz(Number(option.dataset.answerIndex));
});

nextQuizButton.addEventListener("click", goNextQuiz);

resetQuizButton.addEventListener("click", resetQuiz);

matchOptions.addEventListener("click", (event) => {
  const option = event.target.closest("[data-match-index]");
  if (!option) return;
  answerMatch(Number(option.dataset.matchIndex));
});

newMatchButton.addEventListener("click", newMatchRound);

reviewMistakeButton.addEventListener("click", practiceMistakeTopic);

clearMistakesButton.addEventListener("click", clearMistakeNebula);

weatherOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-weather]");
  if (!button) return;
  const state = getMoodState();
  state.weather = button.dataset.weather;
  saveMoodState(state);
  renderMoodHouse();
});

breathingButton.addEventListener("click", toggleBreathing);

comfortButton.addEventListener("click", () => {
  const line = comfortLines[Math.floor(Math.random() * comfortLines.length)];
  comfortLine.textContent = line;
  petLine.textContent = line;
});

guardButton.addEventListener("click", () => {
  const state = getMoodState();
  state.guarded = true;
  saveMoodState(state);
  comfortLine.textContent = "小狗已经坐在门口帮你守着了。这件事可以先放在这里。";
  renderMoodHouse();
});

bubbleStage.addEventListener("click", (event) => {
  const bubble = event.target.closest("[data-bubble-index]");
  if (!bubble) return;
  bubble.classList.add("is-popped");
  const state = getMoodState();
  state.bubblePops += 1;
  saveMoodState(state);
  updateBubbleCalm(state);
  bubbleMessage.textContent = bubbleMessages[state.bubblePops % bubbleMessages.length];
  const rect = bubbleStage.getBoundingClientRect();
  createBubbleSparks(event.clientX - rect.left, event.clientY - rect.top);
  window.setTimeout(() => {
    bubble.remove();
    if (bubbleStage.querySelectorAll(".stress-bubble").length < 12) {
      bubbleStage.append(createStressBubble(Date.now() % 1000));
    }
  }, 260);
});

resetBubblesButton.addEventListener("click", () => {
  bubbleMessage.textContent = "换一池新的泡泡，重新慢慢放松。";
  renderBubbles();
});

cloudBank.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cloud]");
  if (!button) return;
  selectedCloud = button.dataset.cloud;
  renderCloudSort();
});

cloudBuckets.addEventListener("click", (event) => {
  const unsort = event.target.closest("[data-unsort-cloud]");
  if (unsort) {
    const state = getMoodState();
    delete state.sortedClouds[unsort.dataset.unsortCloud];
    saveMoodState(state);
    selectedCloud = unsort.dataset.unsortCloud;
    renderMoodHouse();
    return;
  }
  const bucket = event.target.closest("[data-bucket]");
  if (!bucket || !selectedCloud) return;
  const state = getMoodState();
  state.sortedClouds[selectedCloud] = bucket.dataset.bucket;
  saveMoodState(state);
  selectedCloud = "";
  renderMoodHouse();
});

cloudBuckets.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const bucket = event.target.closest("[data-bucket]");
  if (!bucket || !selectedCloud) return;
  event.preventDefault();
  bucket.click();
});

resetCloudsButton.addEventListener("click", () => {
  const state = getMoodState();
  state.sortedClouds = {};
  saveMoodState(state);
  selectedCloud = "";
  renderMoodHouse();
});

ventPrompts.addEventListener("click", (event) => {
  const button = event.target.closest("[data-prompt]");
  if (!button) return;
  const hints = {
    "今天有点累": "今天最消耗你的事情是什么？",
    "我有点委屈": "如果只说一句话，这份委屈会是什么？",
    "我不知道怎么说": "可以先写几个词，不用整理成完整句子。",
    "我想夸夸自己": "今天有没有一个很小但值得被看见的地方？",
    "我只是想写几句": "这里可以放任何乱乱的句子。"
  };
  ventNote.placeholder = hints[button.dataset.prompt] || ventNote.placeholder;
  ventNote.focus();
});

ventNote.addEventListener("input", updateVentMeta);

saveVentButton.addEventListener("click", saveVentNote);

clearVentButton.addEventListener("click", clearVentSpace);

helpOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-help]");
  if (!button) return;
  const note = helpNotes.find(({ label }) => label === button.dataset.help);
  if (!note) return;
  helpOptions.querySelectorAll(".help-option").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });
  helpMessage.textContent = note.messages[Math.floor(Math.random() * note.messages.length)];
});

copyHelpButton.addEventListener("click", async () => {
  const text = helpMessage.textContent.trim();
  if (!text || text.includes("点一个对象")) return;
  try {
    await navigator.clipboard.writeText(text);
    copyHelpButton.textContent = "已复制";
    window.setTimeout(() => {
      copyHelpButton.textContent = "复制这句话";
    }, 1400);
  } catch {
    copyHelpButton.textContent = "浏览器不允许复制";
  }
});

labTabs.addEventListener("click", (event) => {
  const tab = event.target.closest("[data-lab-index]");
  if (!tab) return;
  renderLabExperiment(Number(tab.dataset.labIndex));
});

forceSlider.addEventListener("input", updateMotionLab);

massSlider.addEventListener("input", updateMotionLab);

completeLabButton.addEventListener("click", completeMotionLab);

let lastTrail = 0;
window.addEventListener("pointermove", (event) => {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const now = Date.now();
  if (now - lastTrail < 70) return;
  lastTrail = now;
  createTrailDot(event.clientX, event.clientY);
});

window.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button, a, dialog")) return;
  createPaw(event.clientX, event.clientY);
});

closeDialog.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) {
    dialog.close();
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;
          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              updateToast.hidden = false;
            }
          });
        });
      })
      .catch(() => {});
  });
}

refreshAppButton.addEventListener("click", () => {
  window.location.reload();
});

updateBirthdayPanel();
initDailySpark();
renderMissions();
loadWishNote();
startQuizRound();
renderMatch();
renderLabExperiment();
renderLearningCompanion();
renderMoodHouse();
renderDataSummary();
renderPlanets();
renderMailbox();
observeReadingSections();
rotatePetLine();
preloadDogGifs();
scheduleDogGifSwitch();
setInterval(createComet, 3200);
setTimeout(createComet, 900);
