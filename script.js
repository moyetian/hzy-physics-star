const birthday = new Date("2011-08-20T00:00:00+08:00");
const petLines = [
  "欢迎来到你的物理星球，我会在这里摇尾巴等你。",
  "不用每一步都很快，慢慢走也会到达新的地方。",
  "小狗负责摇尾巴，你负责好好长大。",
  "光会绕过云，路也会在不知不觉里亮起来。",
  "分数只是一个读数，不是你的全部单位。",
  "今天也适合被夸一句：何芷滢已经很棒了。",
  "如果累了，就先停一停，小狗会陪你坐一会儿。"
];

const dogGifs = [
  "./assets/line-dog-953.gif",
  "./assets/line-dog-785.gif",
  "./assets/line-dog-1001.gif"
];

const planets = [
  {
    label: "Force Planet",
    title: "火星 · 力之星",
    shortTitle: "火星",
    type: "mars",
    bg: "linear-gradient(145deg, #d85d43, #ffb17c)",
    tilt: "-2deg",
    orbit: 165,
    size: 72,
    duration: 22,
    start: -18,
    summary: "力会改变运动状态，一句鼓励也可以让人重新动起来。",
    text: "力不一定总是很大。有时候只是轻轻推一下，原本停住的小车就会开始往前走。希望你以后也记得：卡住的时候，不需要一下子变得很厉害，先给自己一个小小的推力就够了。",
    note: "送给何芷滢的小公式：一点点行动 + 一点点坚持 = 慢慢变好的轨迹。"
  },
  {
    label: "Light Planet",
    title: "金星 · 光之星",
    shortTitle: "金星",
    type: "venus",
    bg: "linear-gradient(145deg, #fff1a8, #ffd079)",
    tilt: "2deg",
    orbit: 215,
    size: 86,
    duration: 29,
    start: 58,
    summary: "光会反射，善意也会。愿你被温柔照亮，也把明亮留给别人。",
    text: "光遇到镜子会反射，遇到透明的地方会继续前进。愿你以后遇见能看见你优点的人，也愿你把自己的明亮留给值得的人。不用一直闪闪发光，偶尔暗一点也没关系。",
    note: "如果某天觉得世界有点暗，先别急，可能只是云还没有飘过去。"
  },
  {
    label: "Sound Planet",
    title: "海王星 · 声音星",
    shortTitle: "海王星",
    type: "neptune",
    bg: "linear-gradient(145deg, #72a9ff, #354ec5)",
    tilt: "-1deg",
    orbit: 270,
    size: 76,
    duration: 35,
    start: 142,
    summary: "声音需要介质，快乐和难过也都值得被好好接住。",
    text: "声音能传播，是因为它不是孤零零地存在。人也是这样。希望你身边一直有能听你说话、陪你笑闹、也能在你低落时接住你的人。",
    note: "你的热闹不是麻烦，它是一种很珍贵的生命力。"
  },
  {
    label: "Circuit Planet",
    title: "木星 · 电路星",
    shortTitle: "木星",
    type: "jupiter",
    bg: "linear-gradient(145deg, #f0c08f, #b67849)",
    tilt: "1.5deg",
    orbit: 320,
    size: 82,
    duration: 42,
    start: 224,
    summary: "电路闭合，灯才会亮。好朋友相遇，也会点亮一段时间。",
    text: "一盏灯亮起来，需要电源、导线、开关和完整回路。人也一样，会在许多关系和经历里，找到让自己发光的能量。愿你以后有自己的开关，知道什么时候努力，也知道什么时候休息。",
    note: "不用一直亮着。会休息的灯，才能亮得更久。"
  },
  {
    label: "Future Planet",
    title: "土星 · 未来星",
    shortTitle: "土星",
    type: "saturn",
    bg: "linear-gradient(145deg, #f5d690, #c6a565)",
    tilt: "-1.5deg",
    orbit: 370,
    size: 92,
    duration: 52,
    start: 306,
    summary: "未来不是标准答案，而是一张可以慢慢画出来的星图。",
    text: "长大不是突然变成另一个人，而是在每一次选择里，多认识自己一点。愿你以后有喜欢的东西，有可靠的朋友，有越来越清楚的方向，也有很多不用解释就能开心的小事。",
    note: "何芷滢，下一站也许会很远，但你已经开始拥有自己的星图了。"
  }
];

const letters = [
  {
    title: "毕业季可读",
    unlock: "2026-06-27",
    open: "毕业不是把过去关上，而是把它变成以后可以回头看的光。希望你记得：这一段路上，你被认真看见过，也被真诚祝福过。"
  },
  {
    title: "15 岁生日可读",
    unlock: "2026-08-20",
    open: "15 岁的何芷滢，生日快乐。希望这一岁的你更了解自己，也更敢喜欢自己。慢慢来，你不是一道必须立刻解完的题，你是一颗正在长大的星星。"
  },
  {
    title: "18 岁生日可读",
    unlock: "2029-08-20",
    open: "18 岁生日快乐。愿你已经拥有更大的世界，也仍然保留现在这份可爱、鲜活，以及对喜欢事物眼睛发亮的热情。"
  },
  {
    title: "很多年以后可读",
    unlock: "2033-08-20",
    open: "如果你很多年以后又打开这里，希望你会笑一下：原来曾经有一段小小的初中时光，真的被认真地保存了下来。"
  }
];

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
let orbitAnimationFrame = 0;
let petLineIndex = 0;
let dogGifIndex = 0;
let dogGifTimer = 0;

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

planetGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".planet-card");
  if (!card) return;
  const rect = card.getBoundingClientRect();
  createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
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
});

petButton.addEventListener("click", (event) => {
  createBurst(event.clientX, event.clientY, 26);
  createPaw(event.clientX - 18, event.clientY + 8);
  createPaw(event.clientX + 22, event.clientY - 4);
  showNextPetLine();
  makeDogHappy();
  switchDogGif(true);
});

nextLineButton.addEventListener("click", () => {
  showNextPetLine();
});

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
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

updateBirthdayPanel();
renderPlanets();
renderMailbox();
rotatePetLine();
preloadDogGifs();
scheduleDogGifSwitch();
setInterval(createComet, 3200);
setTimeout(createComet, 900);
