/* Split from script.js. Loaded as a plain browser script. */
function renderLabTabs() {
  labTabs.innerHTML = labExperiments
    .map(
      (experiment, index) => `
        <button
          class="lab-tab ${index === currentLabIndex ? "is-active" : ""}"
          type="button"
          data-lab-index="${index}"
          aria-pressed="${index === currentLabIndex}"
        >
          ${experiment.title.replace(/小车|实验|小剧场|发射台|碰碰车|轨道|开门器|侦探|摆摆屋|的秘密/g, "")}
        </button>
      `
    )
    .join("");
}

function applySliderConfig(slider, config) {
  slider.min = config.min;
  slider.max = config.max;
  slider.step = config.step;
  slider.value = config.value;
}

function renderLabExperiment(index = currentLabIndex) {
  currentLabIndex = index;
  const experiment = labExperiments[currentLabIndex];
  const [controlOne, controlTwo] = experiment.controls;

  experimentLabel.textContent = `${experiment.badge} · ${currentLabIndex + 1}/${labExperiments.length}`;
  labTitle.textContent = experiment.title;
  labQuestion.textContent = experiment.question;
  controlOneLabel.textContent = controlOne.label;
  controlTwoLabel.textContent = controlTwo.label;
  labResultLabel.textContent = experiment.resultLabel;
  completeLabButton.textContent = "记录这次实验";

  applySliderConfig(forceSlider, controlOne);
  applySliderConfig(massSlider, controlTwo);
  renderLabTabs();
  updateMotionLab();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setVisualVars(vars) {
  labVisual.removeAttribute("style");
  Object.entries(vars).forEach(([key, value]) => {
    labVisual.style.setProperty(key, value);
  });
}

function stopLabPhysics() {
  if (labPhysicsFrame) {
    cancelAnimationFrame(labPhysicsFrame);
    labPhysicsFrame = 0;
  }
  labPhysicsState = null;
}

function createPhysicsCanvas(experiment, values, result) {
  stopLabPhysics();
  setVisualVars({});
  const modelLabels = {
    ohm: "电路模型",
    refraction: "光路模型",
    photoelectric: "能量阈值模型"
  };
  labVisual.className = `lab-visual ${experiment.id}-visual physics-visual`;
  labVisual.innerHTML = `
    <canvas class="physics-canvas" aria-hidden="true"></canvas>
    <span class="physics-badge">${modelLabels[experiment.id] || "2D 刚体模型"}</span>
    <span class="physics-meter">${result.value}</span>
  `;

  const canvas = labVisual.querySelector("canvas");
  labPhysicsState = {
    id: experiment.id,
    values,
    result,
    canvas,
    context: canvas.getContext("2d"),
    width: 0,
    height: 0,
    lastTime: performance.now(),
    accumulator: 0,
    fixedDt: 1 / 60,
    time: 0,
    bodies: [],
    particles: []
  };
  resetPhysicsScene(labPhysicsState);
  labPhysicsFrame = requestAnimationFrame(stepLabPhysics);
}

function fitPhysicsCanvas(state) {
  const rect = state.canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.round(rect.width));
  const height = Math.max(170, Math.round(rect.height));
  if (state.width === width && state.height === height) return;
  state.width = width;
  state.height = height;
  state.canvas.width = Math.round(width * scale);
  state.canvas.height = Math.round(height * scale);
  state.context.setTransform(scale, 0, 0, scale, 0, 0);
  resetPhysicsScene(state);
}

function makeBody(x, y, radius, mass, options = {}) {
  return {
    x,
    y,
    vx: options.vx || 0,
    vy: options.vy || 0,
    radius,
    mass,
    restitution: options.restitution ?? 0.42,
    friction: options.friction ?? 0.985,
    color: options.color || "#fff6b9",
    label: options.label || ""
  };
}

function resetPhysicsScene(state) {
  const [first, second] = state.values;
  const w = state.width || 360;
  const h = state.height || 190;
  state.time = 0;
  state.accumulator = 0;
  state.bodies = [];
  state.particles = [];
  state.scale = Math.min(46, Math.max(28, w / 11));
  state.origin = { x: 40, y: h - 36 };
  state.gravity = 9.8;

  if (state.id === "newton") {
    state.trackLength = 7.2;
    state.startX = 0.25;
    state.cartWidth = 0.86;
    state.bodies = [makeBody(state.startX, 0.24, clamp(0.2 + second * 0.018, 0.22, 0.38), second, { color: "#ff9ac2" })];
    state.force = first;
    state.runDuration = Math.sqrt((2 * (state.trackLength - state.startX - state.cartWidth)) / Math.max(0.1, first / second));
  }

  if (state.id === "hooke") {
    state.scale = Math.min(58, Math.max(40, h / 3.5));
    state.anchor = { x: w / 2, y: 24 };
    state.massKg = 0.42;
    state.springRest = 0.72;
    state.springK = first;
    state.initialStretch = second / 100;
    state.bodies = [
      makeBody(0, state.springRest + state.initialStretch, 0.18, state.massKg, {
        color: "#6fa8ff"
      })
    ];
  }

  if (state.id === "pendulum") {
    state.scale = Math.min(70, Math.max(46, h / 3.2));
    state.anchor = { x: w / 2, y: 24 };
    state.ropeLength = first;
    state.angle = 0.34;
    state.angularVelocity = 0;
    state.gravity = second;
  }

  if (state.id === "projectile") {
    state.scale = Math.min(9, Math.max(5.5, (w - 74) / Math.max(24, state.result.range || 45)));
    const angle = (second * Math.PI) / 180;
    state.bodies = [
      makeBody(0, 0.18, 0.16, 1, {
        vx: first * Math.cos(angle),
        vy: first * Math.sin(angle),
        restitution: 0.52,
        color: "#fff6b9"
      })
    ];
    state.trail = [];
  }

  if (state.id === "momentum") {
    state.scale = Math.min(54, Math.max(34, w / 9.5));
    state.hasMerged = false;
    state.massB = 4;
    state.bodies = [
      makeBody(0.25, 0.32, clamp(0.22 + first * 0.025, 0.24, 0.42), first, {
        vx: second,
        restitution: 0,
        color: "#fff6b9",
        label: "A"
      }),
      makeBody(4.55, 0.32, 0.34, state.massB, {
        restitution: 0,
        color: "#9ff0d2",
        label: "B"
      })
    ];
  }

  if (state.id === "magnet") {
    state.scale = Math.min(70, Math.max(44, h / 3.2));
    state.bodies = [makeBody(0, 0, 0.16, 0.08, { color: "#ff9ac2" })];
    state.force = first * second * 0.5;
    state.springK = 6.8;
  }
}

function stepRigidBody(body, dt, bounds, gravity = 0) {
  body.vy += gravity * dt;
  body.x += body.vx * dt;
  body.y += body.vy * dt;
  const floor = bounds.bottom - body.radius;
  const ceiling = bounds.top + body.radius;
  const left = bounds.left + body.radius;
  const right = bounds.right - body.radius;

  if (body.y > floor) {
    body.y = floor;
    body.vy = -Math.abs(body.vy) * body.restitution;
    body.vx *= body.friction;
  }
  if (body.y < ceiling) {
    body.y = ceiling;
    body.vy = Math.abs(body.vy) * body.restitution;
  }
  if (body.x < left || body.x > right) {
    body.x = clamp(body.x, left, right);
    body.vx *= -body.restitution;
  }
}

function resolveBodyCollision(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.hypot(dx, dy) || 1;
  const overlap = a.radius + b.radius - distance;
  if (overlap <= 0) return;

  const nx = dx / distance;
  const ny = dy / distance;
  const correction = overlap / 2;
  a.x -= nx * correction;
  a.y -= ny * correction;
  b.x += nx * correction;
  b.y += ny * correction;

  const relativeVelocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
  if (relativeVelocity > 0) return;
  const impulse = (-(1 + Math.min(a.restitution, b.restitution)) * relativeVelocity) / (1 / a.mass + 1 / b.mass);
  a.vx -= (impulse * nx) / a.mass;
  a.vy -= (impulse * ny) / a.mass;
  b.vx += (impulse * nx) / b.mass;
  b.vy += (impulse * ny) / b.mass;
}

function stepLabPhysics(now) {
  if (!labPhysicsState) return;
  const state = labPhysicsState;
  fitPhysicsCanvas(state);
  const frameDt = Math.min(0.08, (now - state.lastTime) / 1000 || state.fixedDt);
  state.lastTime = now;
  state.accumulator += frameDt;
  while (state.accumulator >= state.fixedDt) {
    state.time += state.fixedDt;
    updatePhysicsScene(state, state.fixedDt);
    state.accumulator -= state.fixedDt;
  }
  drawPhysicsScene(state);
  labPhysicsFrame = requestAnimationFrame(stepLabPhysics);
}

function updatePhysicsScene(state, dt) {
  const [first, second] = state.values;
  const bounds = { left: 18, right: state.width - 18, top: 14, bottom: state.height - 32 };

  if (state.id === "newton") {
    const cart = state.bodies[0];
    const acceleration = state.force / Math.max(0.1, second);
    cart.vx += acceleration * dt;
    cart.x += cart.vx * dt;
    if (cart.x > state.trackLength - state.cartWidth) {
      cart.x = state.trackLength - state.cartWidth;
      cart.vx = 0;
      state.time = 0;
      cart.x = state.startX;
    }
  }

  if (state.id === "hooke") {
    const mass = state.bodies[0];
    const stretch = mass.y - state.springRest;
    const springForce = -state.springK * stretch;
    const netForce = mass.mass * state.gravity + springForce;
    mass.vy += (netForce / mass.mass) * dt;
    mass.vy *= 0.992;
    mass.y += mass.vy * dt;
    mass.y = clamp(mass.y, state.springRest + 0.02, 2.65);
  }

  if (state.id === "pendulum") {
    const angularAcceleration = (-state.gravity / state.ropeLength) * Math.sin(state.angle);
    state.angularVelocity += angularAcceleration * dt;
    state.angularVelocity *= 0.999;
    state.angle += state.angularVelocity * dt;
  }

  if (state.id === "projectile") {
    const ball = state.bodies[0];
    ball.vy -= state.gravity * dt;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    state.trail.push({ x: ball.x, y: ball.y });
    state.trail = state.trail.slice(-80);
    if (ball.y <= 0 && state.time > 0.24) resetPhysicsScene(state);
  }

  if (state.id === "momentum") {
    const [cartA, cartB] = state.bodies;
    if (!state.hasMerged && cartA.x + cartA.radius >= cartB.x - cartB.radius) {
      const commonVelocity = (cartA.mass * cartA.vx + cartB.mass * cartB.vx) / (cartA.mass + cartB.mass);
      cartA.mass += cartB.mass;
      cartA.radius = Math.max(cartA.radius, cartB.radius) + 0.04;
      cartA.vx = commonVelocity;
      cartA.x = cartB.x - cartA.radius;
      cartA.label = "AB";
      cartA.color = "#fff6b9";
      state.bodies = [cartA];
      state.hasMerged = true;
    }
    state.bodies.forEach((body) => {
      body.x += body.vx * dt;
      body.vx *= 0.998;
      if (body.x > 7.4) resetPhysicsScene(state);
    });
  }

  if (state.id === "magnet") {
    const wire = state.bodies[0];
    const netForce = state.force - state.springK * wire.y;
    wire.vy += (netForce / wire.mass) * dt;
    wire.vy *= 0.94;
    wire.y += wire.vy * dt;
    wire.y = clamp(wire.y, -0.62, 0.92);
  }
}

function drawPhysicsScene(state) {
  const ctx = state.context;
  const w = state.width;
  const h = state.height;
  ctx.clearRect(0, 0, w, h);
  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, "rgba(111, 168, 255, 0.14)");
  gradient.addColorStop(0.55, "rgba(159, 240, 210, 0.08)");
  gradient.addColorStop(1, "rgba(255, 154, 194, 0.12)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
  drawGrid(ctx, w, h);

  if (state.id === "newton") drawNewtonScene(ctx, state);
  if (state.id === "hooke") drawHookeScene(ctx, state);
  if (state.id === "ohm") drawOhmScene(ctx, state);
  if (state.id === "pendulum") drawPendulumScene(ctx, state);
  if (state.id === "refraction") drawRefractionScene(ctx, state);
  if (state.id === "projectile") drawProjectileScene(ctx, state);
  if (state.id === "momentum") drawMomentumScene(ctx, state);
  if (state.id === "magnet") drawMagnetScene(ctx, state);
  if (state.id === "photoelectric") drawPhotoelectricScene(ctx, state);
}

function drawGrid(ctx, w, h) {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  for (let x = 24; x < w; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 12);
    ctx.lineTo(x, h - 22);
    ctx.stroke();
  }
  for (let y = 24; y < h; y += 32) {
    ctx.beginPath();
    ctx.moveTo(16, y);
    ctx.lineTo(w - 16, y);
    ctx.stroke();
  }
}

function drawTrack(ctx, state) {
  ctx.strokeStyle = "rgba(159, 240, 210, 0.9)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(22, state.height - 30);
  ctx.lineTo(state.width - 22, state.height - 30);
  ctx.stroke();
}

function projectPoint(state, x, y) {
  return {
    x: state.origin.x + x * state.scale,
    y: state.origin.y - y * state.scale
  };
}

function drawWorldTrack(ctx, state, length, label = "m") {
  const start = projectPoint(state, 0, 0);
  const end = projectPoint(state, length, 0);
  ctx.strokeStyle = "rgba(159, 240, 210, 0.9)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.fillStyle = "rgba(249, 251, 255, 0.68)";
  ctx.font = "700 11px sans-serif";
  ctx.textAlign = "center";
  for (let meter = 0; meter <= Math.floor(length); meter += 1) {
    const tick = projectPoint(state, meter, 0);
    ctx.fillRect(tick.x - 1, tick.y - 8, 2, 8);
    ctx.fillText(`${meter}${meter === 0 ? label : ""}`, tick.x, tick.y + 18);
  }
}

function drawWorldBody(ctx, state, body) {
  const point = projectPoint(state, body.x, body.y);
  drawBody(ctx, {
    ...body,
    x: point.x,
    y: point.y,
    radius: Math.max(7, body.radius * state.scale)
  });
}

function drawBody(ctx, body) {
  ctx.fillStyle = body.color;
  ctx.beginPath();
  ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(36, 48, 95, 0.6)";
  ctx.lineWidth = 3;
  ctx.stroke();
  if (!body.label) return;
  ctx.fillStyle = "#24305f";
  ctx.font = "700 14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(body.label, body.x, body.y + 1);
}

function drawArrow(ctx, x1, y1, x2, y2, color, label) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 12 * Math.cos(angle - 0.45), y2 - 12 * Math.sin(angle - 0.45));
  ctx.lineTo(x2 - 12 * Math.cos(angle + 0.45), y2 - 12 * Math.sin(angle + 0.45));
  ctx.closePath();
  ctx.fill();
  if (label) {
    ctx.font = "700 13px sans-serif";
    ctx.fillText(label, x2 + 14, y2 - 8);
  }
}

function drawScaleText(ctx, text, x, y) {
  ctx.fillStyle = "rgba(9, 17, 57, 0.42)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
  ctx.lineWidth = 1;
  const width = Math.max(72, text.length * 7.2 + 18);
  ctx.beginPath();
  ctx.roundRect(x - width / 2, y - 15, width, 28, 12);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fff6b9";
  ctx.font = "700 12px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function drawNewtonScene(ctx, state) {
  const cart = state.bodies[0];
  const point = projectPoint(state, cart.x, cart.y);
  drawWorldTrack(ctx, state, state.trackLength, " m");
  drawArrow(ctx, point.x - 52, point.y - 6, point.x - 52 + clamp(state.force * 4, 30, 86), point.y - 6, "#fff6b9", "F");
  ctx.fillStyle = cart.color;
  ctx.fillRect(point.x - 34, point.y - 18, 68, 34);
  drawBody(ctx, { ...cart, x: point.x - 21, y: point.y + 18, radius: 8, color: "#fffdf7" });
  drawBody(ctx, { ...cart, x: point.x + 21, y: point.y + 18, radius: 8, color: "#fffdf7" });
  drawArrow(ctx, point.x + 18, point.y - 30, point.x + 18 + clamp((state.force / cart.mass) * 14, 18, 86), point.y - 30, "#9ff0d2", "a");
  drawScaleText(ctx, `a = ${(state.force / cart.mass).toFixed(2)} m/s²`, state.width - 92, 34);
}

function drawHookeScene(ctx, state) {
  const mass = state.bodies[0];
  const anchor = state.anchor;
  const massPoint = { x: anchor.x, y: anchor.y + mass.y * state.scale };
  const restPoint = anchor.y + state.springRest * state.scale;
  const equilibriumPoint = anchor.y + (state.springRest + (mass.mass * state.gravity) / state.springK) * state.scale;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(anchor.x - 54, anchor.y);
  ctx.lineTo(anchor.x + 54, anchor.y);
  ctx.stroke();
  ctx.strokeStyle = "#9ff0d2";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(anchor.x, anchor.y);
  const coils = 9;
  for (let i = 1; i <= coils; i += 1) {
    const t = i / coils;
    const x = anchor.x + (i % 2 ? 14 : -14);
    const y = anchor.y + (massPoint.y - anchor.y - mass.radius * state.scale) * t;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(massPoint.x, massPoint.y - mass.radius * state.scale);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 246, 185, 0.42)";
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(anchor.x + 44, restPoint);
  ctx.lineTo(anchor.x + 94, restPoint);
  ctx.stroke();
  ctx.strokeStyle = "rgba(159, 240, 210, 0.62)";
  ctx.beginPath();
  ctx.moveTo(anchor.x + 44, equilibriumPoint);
  ctx.lineTo(anchor.x + 112, equilibriumPoint);
  ctx.stroke();
  ctx.setLineDash([]);
  drawBody(ctx, { ...mass, x: massPoint.x, y: massPoint.y, radius: mass.radius * state.scale });
  drawArrow(ctx, massPoint.x + 52, massPoint.y + 4, massPoint.x + 52, massPoint.y - 44, "#fff6b9", "kx");
  drawScaleText(ctx, "虚线: 原长 / 平衡", state.width - 92, 34);
}

function drawOhmScene(ctx, state) {
  const { voltage, resistance, current, power } = state.result;
  const w = state.width;
  const h = state.height;
  const left = 44;
  const right = w - 44;
  const top = 48;
  const bottom = h - 48;
  const glow = clamp(current / 2.4, 0.12, 1);

  ctx.strokeStyle = "rgba(159, 240, 210, 0.82)";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(right, top);
  ctx.lineTo(right, bottom);
  ctx.lineTo(left, bottom);
  ctx.lineTo(left, top);
  ctx.stroke();

  drawCircuitBox(ctx, left - 22, h / 2 - 30, 44, 60, `${voltage.toFixed(0)}V`, "#fff6b9");
  drawCircuitBox(ctx, w / 2 - 46, top - 22, 92, 44, `${resistance.toFixed(0)}Ω`, "#fffdf7");
  drawMeter(ctx, right, h / 2 - 44, "A", `${current.toFixed(2)}`);
  drawMeter(ctx, w / 2, bottom, "V", `${voltage.toFixed(1)}`);

  ctx.fillStyle = `rgba(255, 246, 185, ${0.18 + glow * 0.38})`;
  ctx.shadowColor = `rgba(255, 246, 185, ${glow})`;
  ctx.shadowBlur = 18 + glow * 32;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2 + 12, 24 + glow * 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#24305f";
  ctx.font = "700 12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("热效应", w / 2, h / 2 + 16);

  const loop = [
    [left, top],
    [right, top],
    [right, bottom],
    [left, bottom]
  ];
  for (let i = 0; i < 10; i += 1) {
    const phase = (state.time * clamp(current, 0.12, 4) * 0.55 + i / 10) % 1;
    const dot = pointOnRectLoop(loop, phase);
    ctx.fillStyle = "#9ff0d2";
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  drawArrow(ctx, left + 26, top - 18, left + 86, top - 18, "#fff6b9", "I");
  drawArrow(ctx, right - 30, bottom + 18, right - 90, bottom + 18, "rgba(159, 240, 210, 0.78)", "电子");
  drawScaleText(ctx, `P = UI = ${power.toFixed(1)} W`, w / 2, 24);
}

function drawCircuitBox(ctx, x, y, width, height, text, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(36, 48, 95, 0.42)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 12);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#24305f";
  ctx.font = "700 13px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + width / 2, y + height / 2);
}

function drawMeter(ctx, x, y, label, value) {
  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.strokeStyle = "rgba(255, 246, 185, 0.78)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(x, y, 27, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#fff6b9";
  ctx.font = "700 14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y - 5);
  ctx.font = "700 10px sans-serif";
  ctx.fillText(value, x, y + 10);
}

function pointOnRectLoop(points, phase) {
  const segments = points.map((point, index) => {
    const next = points[(index + 1) % points.length];
    return { from: point, to: next, length: Math.hypot(next[0] - point[0], next[1] - point[1]) };
  });
  const perimeter = segments.reduce((sum, segment) => sum + segment.length, 0);
  let distance = phase * perimeter;
  for (const segment of segments) {
    if (distance <= segment.length) {
      const t = distance / segment.length;
      return {
        x: segment.from[0] + (segment.to[0] - segment.from[0]) * t,
        y: segment.from[1] + (segment.to[1] - segment.from[1]) * t
      };
    }
    distance -= segment.length;
  }
  return { x: points[0][0], y: points[0][1] };
}

function drawPendulumScene(ctx, state) {
  const anchor = state.anchor;
  const bob = {
    x: anchor.x + Math.sin(state.angle) * state.ropeLength * state.scale,
    y: anchor.y + Math.cos(state.angle) * state.ropeLength * state.scale,
    radius: 20,
    color: "#ff9ac2"
  };
  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(anchor.x, anchor.y);
  ctx.lineTo(bob.x, bob.y);
  ctx.stroke();
  drawBody(ctx, bob);
  drawArrow(ctx, bob.x, bob.y, anchor.x, anchor.y, "rgba(159, 240, 210, 0.75)", "T");
  drawArrow(ctx, bob.x + 25, bob.y, bob.x + 25, bob.y + 42, "#fff6b9", "mg");
  drawScaleText(ctx, `T = ${(2 * Math.PI * Math.sqrt(state.ropeLength / state.gravity)).toFixed(2)} s`, state.width - 90, 34);
}

function drawRefractionScene(ctx, state) {
  const result = state.result;
  const w = state.width;
  const h = state.height;
  const centerX = w / 2;
  const interfaceY = h / 2;
  const length = Math.min(w, h) * 0.42;
  const incident = (result.incidentAngle * Math.PI) / 180;

  ctx.fillStyle = "rgba(111, 168, 255, 0.12)";
  ctx.fillRect(0, 0, w, interfaceY);
  ctx.fillStyle = "rgba(159, 240, 210, 0.16)";
  ctx.fillRect(0, interfaceY, w, h - interfaceY);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.42)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(24, interfaceY);
  ctx.lineTo(w - 24, interfaceY);
  ctx.stroke();
  ctx.setLineDash([5, 6]);
  ctx.strokeStyle = "rgba(255, 246, 185, 0.62)";
  ctx.beginPath();
  ctx.moveTo(centerX, 20);
  ctx.lineTo(centerX, h - 20);
  ctx.stroke();
  ctx.setLineDash([]);

  const start = {
    x: centerX - Math.sin(incident) * length,
    y: interfaceY - Math.cos(incident) * length
  };
  drawArrow(ctx, start.x, start.y, centerX, interfaceY, "#fff6b9", "入射光");

  const reflectedEnd = {
    x: centerX + Math.sin(incident) * length * 0.82,
    y: interfaceY - Math.cos(incident) * length * 0.82
  };
  drawArrow(ctx, centerX, interfaceY, reflectedEnd.x, reflectedEnd.y, "rgba(255, 154, 194, 0.86)", "反射光");

  if (!result.totalInternalReflection) {
    const refracted = (result.refractedAngle * Math.PI) / 180;
    const refractedEnd = {
      x: centerX + Math.sin(refracted) * length,
      y: interfaceY + Math.cos(refracted) * length
    };
    drawArrow(ctx, centerX, interfaceY, refractedEnd.x, refractedEnd.y, "#9ff0d2", "折射光");
  } else {
    ctx.fillStyle = "rgba(255, 246, 185, 0.18)";
    ctx.beginPath();
    ctx.arc(centerX, interfaceY, 34 + Math.sin(state.time * 8) * 4, 0, Math.PI * 2);
    ctx.fill();
    drawScaleText(ctx, "发生全反射", centerX, interfaceY + 42);
  }

  drawAngleArc(ctx, centerX, interfaceY, -Math.PI / 2, -Math.PI / 2 - incident, 34, `${result.incidentAngle.toFixed(0)}°`);
  if (!result.totalInternalReflection) {
    const refracted = (result.refractedAngle * Math.PI) / 180;
    drawAngleArc(ctx, centerX, interfaceY, Math.PI / 2, Math.PI / 2 - refracted, 46, `${result.refractedAngle.toFixed(0)}°`);
  }
  ctx.fillStyle = "rgba(249, 251, 255, 0.76)";
  ctx.font = "700 12px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("介质 1：玻璃 n₁ = 1.50", 24, 32);
  ctx.fillText(`介质 2：n₂ = ${result.refractiveIndexTwo.toFixed(2)}`, 24, h - 22);
  if (result.criticalAngle) drawScaleText(ctx, `临界角 ${result.criticalAngle.toFixed(1)}°`, w - 94, 34);
}

function drawAngleArc(ctx, x, y, startAngle, endAngle, radius, text) {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.52)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle, endAngle < startAngle);
  ctx.stroke();
  const mid = (startAngle + endAngle) / 2;
  ctx.fillStyle = "#fff6b9";
  ctx.font = "700 11px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + Math.cos(mid) * (radius + 14), y + Math.sin(mid) * (radius + 14));
}

function drawProjectileScene(ctx, state) {
  const range = Math.max(8, state.result.range || 20);
  drawWorldTrack(ctx, state, Math.min(range + 4, 42), " m");
  ctx.strokeStyle = "rgba(255, 246, 185, 0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  state.trail.forEach((point, index) => {
    const projected = projectPoint(state, point.x, point.y);
    if (index === 0) ctx.moveTo(projected.x, projected.y);
    else ctx.lineTo(projected.x, projected.y);
  });
  ctx.stroke();
  drawWorldBody(ctx, state, state.bodies[0]);
  const muzzle = projectPoint(state, 0, 0.18);
  const angle = Math.atan2(state.bodies[0].vy, state.bodies[0].vx);
  drawArrow(ctx, muzzle.x, muzzle.y, muzzle.x + Math.cos(angle) * 48, muzzle.y - Math.sin(angle) * 48, "#9ff0d2", "v");
  const target = projectPoint(state, state.result.range || 0, 0);
  ctx.fillStyle = "#ff9ac2";
  ctx.fillRect(target.x - 2, target.y - 34, 4, 34);
  ctx.beginPath();
  ctx.moveTo(target.x, target.y - 34);
  ctx.lineTo(target.x + 22, target.y - 25);
  ctx.lineTo(target.x, target.y - 16);
  ctx.fill();
}

function drawMomentumScene(ctx, state) {
  drawWorldTrack(ctx, state, 7.8, " m");
  state.bodies.forEach((body) => drawWorldBody(ctx, state, body));
  const body = state.bodies[0];
  const point = projectPoint(state, body.x, body.y);
  drawArrow(ctx, point.x, point.y - 34, point.x + clamp(body.vx * 12, 18, 88), point.y - 34, "#fff6b9", "p");
  drawScaleText(ctx, state.hasMerged ? "碰后共速" : "完全非弹性碰撞", state.width - 96, 34);
}

function drawMagnetScene(ctx, state) {
  const wire = state.bodies[0];
  ctx.fillStyle = "#6fa8ff";
  ctx.fillRect(34, 34, 54, state.height - 68);
  ctx.fillStyle = "#ff9ac2";
  ctx.fillRect(state.width - 88, 34, 54, state.height - 68);
  ctx.fillStyle = "#24305f";
  ctx.font = "700 20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("N", 61, state.height / 2);
  ctx.fillText("S", state.width - 61, state.height / 2);
  for (let y = 54; y < state.height - 38; y += 34) {
    drawArrow(ctx, 102, y, state.width - 104, y, "rgba(159, 240, 210, 0.46)", "");
  }
  ctx.strokeStyle = "#fff6b9";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  const wireY = state.height / 2 + wire.y * state.scale;
  ctx.beginPath();
  ctx.moveTo(state.width / 2 - 62, wireY);
  ctx.lineTo(state.width / 2 + 62, wireY);
  ctx.stroke();
  drawBody(ctx, { ...wire, x: state.width / 2, y: wireY, radius: wire.radius * state.scale });
  drawArrow(ctx, state.width / 2 + 38, wireY, state.width / 2 + 38, wireY + clamp(state.force * 36, 18, 76), "#fff6b9", "F");
  drawScaleText(ctx, `F = ${(state.force).toFixed(2)} N`, state.width - 92, 34);
}

function drawPhotoelectricScene(ctx, state) {
  const result = state.result;
  const w = state.width;
  const h = state.height;
  const plateX = w * 0.36;
  const collectorX = w * 0.78;
  const top = 46;
  const bottom = h - 42;
  const active = result.kineticEnergy > 0;
  const energyRatio = clamp(result.photonEnergy / Math.max(result.photonEnergy, result.thresholdFrequency * 0.414), 0.18, 1.45);

  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(28, 28, w - 56, h - 56, 20);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#fff6b9";
  ctx.fillRect(plateX - 10, top, 20, bottom - top);
  ctx.fillStyle = "rgba(159, 240, 210, 0.72)";
  ctx.fillRect(collectorX - 8, top + 10, 16, bottom - top - 20);
  ctx.fillStyle = "#24305f";
  ctx.font = "700 12px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("金属板", plateX, bottom + 18);
  ctx.fillText("收集极", collectorX, bottom + 18);

  for (let i = 0; i < 4; i += 1) {
    const phase = (state.time * (0.7 + result.photonEnergy / 4) + i * 0.24) % 1;
    const y = top + 24 + i * 28;
    const x = 34 + (plateX - 58) * phase;
    drawPhoton(ctx, x, y, 16 + energyRatio * 8);
  }

  ctx.strokeStyle = active ? "rgba(159, 240, 210, 0.65)" : "rgba(255, 154, 194, 0.42)";
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(plateX + 18, h / 2);
  ctx.lineTo(collectorX - 18, h / 2);
  ctx.stroke();
  ctx.setLineDash([]);

  if (active) {
    for (let i = 0; i < 5; i += 1) {
      const phase = (state.time * (0.45 + result.kineticEnergy / 2.8) + i * 0.18) % 1;
      const x = plateX + 22 + (collectorX - plateX - 48) * phase;
      const y = h / 2 + Math.sin(phase * Math.PI * 2 + i) * 22;
      ctx.fillStyle = "#9ff0d2";
      ctx.shadowColor = "rgba(159, 240, 210, 0.78)";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    drawArrow(ctx, plateX + 36, h / 2 - 36, collectorX - 48, h / 2 - 36, "#9ff0d2", "逸出电子");
  } else {
    ctx.fillStyle = "rgba(255, 154, 194, 0.22)";
    ctx.beginPath();
    ctx.arc(plateX + 26, h / 2, 20 + Math.sin(state.time * 7) * 3, 0, Math.PI * 2);
    ctx.fill();
    drawScaleText(ctx, "频率未过阈值", (plateX + collectorX) / 2, h / 2);
  }

  const thresholdX = 46;
  const barWidth = Math.min(150, w * 0.32);
  const fillWidth = clamp(result.photonEnergy / Math.max(5, result.photonEnergy, result.thresholdFrequency * 0.414), 0, 1) * barWidth;
  ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
  ctx.fillRect(thresholdX, h - 28, barWidth, 9);
  ctx.fillStyle = active ? "#9ff0d2" : "#ff9ac2";
  ctx.fillRect(thresholdX, h - 28, fillWidth, 9);
  ctx.fillStyle = "rgba(249, 251, 255, 0.78)";
  ctx.font = "700 11px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`hν = ${result.photonEnergy.toFixed(2)} eV`, thresholdX, h - 36);
  drawScaleText(ctx, `ν₀ = ${result.thresholdFrequency.toFixed(1)}×10¹⁴ Hz`, w - 112, 34);
}

function drawPhoton(ctx, x, y, size) {
  ctx.strokeStyle = "#fff6b9";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 12; i += 1) {
    const t = i / 12;
    const px = x + t * size;
    const py = y + Math.sin(t * Math.PI * 4) * 5;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  drawArrow(ctx, x + size - 2, y, x + size + 12, y, "#fff6b9", "");
}

function renderLabVisual(experiment, values, result) {
  const [first, second] = values;
  const progress = clamp(result.progress, 8, 92);
  const speed = clamp(result.speed, 0.6, 2.8);
  const physicsExperimentIds = [
    "newton",
    "hooke",
    "ohm",
    "pendulum",
    "refraction",
    "projectile",
    "momentum",
    "magnet",
    "photoelectric"
  ];

  labVisual.className = `lab-visual ${experiment.id}-visual`;

  if (physicsExperimentIds.includes(experiment.id)) {
    createPhysicsCanvas(experiment, values, result);
    return;
  }

  stopLabPhysics();

  if (experiment.id === "newton") {
    setVisualVars({
      "--cart-left": `${progress}%`,
      "--force-width": `${clamp(24 + first * 4, 32, 112)}px`,
      "--mass-size": `${clamp(28 + second * 3, 30, 62)}px`,
      "--lab-speed": `${speed}s`
    });
    labVisual.innerHTML = `
      <span class="lab-floor"></span>
      <span class="force-arrow"></span>
      <span class="visual-cart"><span class="cart-mass"></span><span class="wheel left"></span><span class="wheel right"></span></span>
      <span class="visual-label left">F</span>
      <span class="visual-label right">a</span>
    `;
    return;
  }

  if (experiment.id === "hooke") {
    setVisualVars({
      "--spring-stretch": `${clamp(44 + second * 4, 48, 126)}px`,
      "--mass-size": `${clamp(34 + first / 3, 38, 72)}px`,
      "--lab-speed": `${speed}s`
    });
    labVisual.innerHTML = `
      <span class="lab-hook"></span>
      <span class="visual-spring"></span>
      <span class="hanging-mass"></span>
      <span class="ruler"></span>
      <span class="visual-label right">x</span>
    `;
    return;
  }

  if (experiment.id === "ohm") {
    setVisualVars({
      "--bulb-glow": `${clamp(progress / 80, 0.22, 1)}`,
      "--electron-speed": `${speed}s`
    });
    labVisual.innerHTML = `
      <span class="circuit-wire top"></span>
      <span class="circuit-wire bottom"></span>
      <span class="battery-icon">+ −</span>
      <span class="resistor-icon">R</span>
      <span class="bulb-icon"></span>
      <span class="electron-dot one"></span>
      <span class="electron-dot two"></span>
      <span class="electron-dot three"></span>
    `;
    return;
  }

  if (experiment.id === "battery") {
    setVisualVars({
      "--voltage-level": `${progress}%`,
      "--electron-speed": `${speed}s`
    });
    labVisual.innerHTML = `
      <span class="battery-pack"><span class="battery-fill"></span></span>
      <span class="internal-resistor">r</span>
      <span class="meter-face">V</span>
      <span class="voltage-bar"><span></span></span>
      <span class="electron-dot one"></span>
      <span class="electron-dot two"></span>
    `;
    return;
  }

  if (experiment.id === "pendulum") {
    setVisualVars({
      "--pendulum-length": `${clamp(72 + first * 32, 78, 142)}px`,
      "--pendulum-angle": `${clamp(10 + (10.5 - second) * 4 + first * 3, 10, 28)}deg`,
      "--lab-speed": `${speed}s`
    });
    labVisual.innerHTML = `
      <span class="pendulum-stand"></span>
      <span class="pendulum-arm"><span class="pendulum-bob"></span></span>
      <span class="period-arc"></span>
      <span class="visual-label right">T</span>
    `;
    return;
  }

  if (experiment.id === "projectile") {
    const shotX = clamp(100 + progress * 2.2, 120, 280);
    const shotY = clamp(44 + second * 1.1, 56, 126);
    setVisualVars({
      "--shot-x": `${shotX}px`,
      "--shot-y": `-${shotY}px`,
      "--cannon-angle": `${-second}deg`,
      "--lab-speed": `${speed}s`
    });
    labVisual.innerHTML = `
      <span class="projectile-ground"></span>
      <span class="cannon"></span>
      <span class="trajectory"></span>
      <span class="projectile-ball"></span>
      <span class="target-flag"></span>
    `;
    return;
  }

  if (experiment.id === "momentum") {
    setVisualVars({
      "--cart-a-size": `${clamp(34 + first * 4, 38, 72)}px`,
      "--cart-speed": `${speed}s`,
      "--merge-speed": `${clamp(2.2 - progress / 80, 0.8, 1.9)}s`
    });
    labVisual.innerHTML = `
      <span class="collision-track"></span>
      <span class="collision-cart cart-a">A</span>
      <span class="collision-cart cart-b">B</span>
      <span class="collision-cart cart-merged">AB</span>
      <span class="impact-flash"></span>
    `;
    return;
  }

  if (experiment.id === "magnet") {
    setVisualVars({
      "--wire-deflect": `${clamp(progress / 2, 8, 48)}px`,
      "--lab-speed": `${speed}s`
    });
    labVisual.innerHTML = `
      <span class="magnet-pole north">N</span>
      <span class="magnet-pole south">S</span>
      <span class="field-line one"></span>
      <span class="field-line two"></span>
      <span class="field-line three"></span>
      <span class="current-wire"></span>
      <span class="ampere-arrow">F</span>
    `;
    return;
  }

  const photonEnergy = 0.414 * first;
  const kineticEnergy = Math.max(0, photonEnergy - second);
  labVisual.classList.toggle("is-active", kineticEnergy > 0);
  setVisualVars({
    "--electron-distance": `${clamp(58 + kineticEnergy * 10, 58, 92)}%`,
    "--photon-speed": `${speed}s`
  });
  labVisual.innerHTML = `
    <span class="photo-machine">
      <span class="metal-plate"></span>
      <span class="collector-plate"></span>
      <span class="vacuum-window"></span>
    </span>
    <span class="photon one"></span>
    <span class="photon two"></span>
    <span class="photon three"></span>
    <span class="electron escaped one"></span>
    <span class="electron escaped two"></span>
    <span class="threshold-gate">W₀</span>
  `;
}

function updateMotionLab() {
  const experiment = labExperiments[currentLabIndex];
  const [controlOne, controlTwo] = experiment.controls;
  const values = [Number(forceSlider.value), Number(massSlider.value)];
  const result = experiment.calculate(values);

  forceValue.textContent = formatControlValue(values[0], controlOne.unit);
  massValue.textContent = formatControlValue(values[1], controlTwo.unit);
  accelerationValue.textContent = result.value;
  motionHint.textContent = result.hint;
  renderLabVisual(experiment, values, result);
}

function completeMotionLab(event) {
  const experiment = labExperiments[currentLabIndex];

  recordLabLearning(experiment);
  completeMission("game");
  createBurst(event.clientX, event.clientY, 20);
  petLine.textContent = experiment.completeText;
}

