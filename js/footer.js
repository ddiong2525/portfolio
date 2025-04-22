const canvas = document.querySelector('.js-canvas');
const ctx = canvas.getContext('2d');
const PI2 = Math.PI * 2;

const mouse = { x: 0, y: 0, angle: 0 };
const gravity = 0.1;
const friction = 0.95;

let w;
let wH;
let h;
let hH;

const radius = 30;
let squid;
const tentacleWidth = 8;
const numTentacles = 6;
const numPoints = 10;
let particles = [];

let tentacles;

const distanceBetween = (p1, p2) => Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
const angleBetween = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const onResize = () => {
  w = window.innerWidth;
  h = window.innerHeight;

  wH = w >> 1;
  hH = h >> 1;

  canvas.width = w;
  canvas.height = h;
};

const updateStage = () => {
  onResize();

  mouse.x = wH;
  mouse.y = hH;

  squid = { x: mouse.x, y: mouse.y, radius, bodyWidth: radius * 2, bodyHeight: 30, angle: 0, velocity: 0 };
  tentacles = [];

  let connectionX = squid.x - squid.radius - tentacleWidth;
  const incX = squid.bodyWidth / (numTentacles - 1);

  for (let i = 0; i < numTentacles; i++) {
    const length = randomBetween(5, 20);

    const tentacle = {
      length,
      connections: [],
    };

    let connectionY = squid.y + squid.bodyHeight;

    for (let q = 0; q < numPoints; q++) {
      tentacle.connections.push({
        x: connectionX,
        y: connectionY,
        oldX: connectionX,
        oldY: connectionY,
      });

      connectionY += length;
    }

    connectionX += incX;

    tentacles.push(tentacle);
  }
};

const updatePoints = () => {
  tentacles.forEach((tentacle) => {
    const { connections } = tentacle;

    connections.forEach((point) => {
      const velX = point.x - point.oldX;
      const velY = point.y - point.oldY;

      point.oldX = point.x;
      point.oldY = point.y;

      point.x += velX * friction;
      point.y += velY * friction;

      point.y += gravity;
    });
  });
};

const updateSticks = () => {
  tentacles.forEach((tentacle) => {
    const { length, connections } = tentacle;

    for (let i = 0; i < connections.length - 1; i++) {
      const from = connections[i];
      const to = connections[i + 1];

      const dx = to.x - from.x;
      const dy = to.y - from.y;

      const distance = distanceBetween(from, to);
      const difference = length - distance;
      const percent = difference / distance / 2;
      const offsetX = dx * percent;
      const offsetY = dy * percent;

      from.x -= offsetX;
      from.y -= offsetY;

      to.x += offsetX;
      to.y += offsetY;
    }
  });
};

const connectTentacles = () => {
  let x = squid.x - squid.radius + (tentacleWidth / 2);
  let y = squid.y + squid.bodyHeight;
  const posInc = (squid.bodyWidth - tentacleWidth) / (tentacles.length - 1);

  tentacles.forEach((tentacle) => {
    const connector = tentacle.connections[0];

    const angleDiff = angleBetween(squid.x, squid.y, x, y);
    const dx = squid.x - x;
    const dy = squid.y - y;
    const h = Math.sqrt((dx * dx) + (dy * dy));

    connector.x = squid.x + (Math.cos(angleDiff + squid.angle) * h);
    connector.y = squid.y + (Math.sin(angleDiff + squid.angle) * h);

    x += posInc;
  });
};

const drawTentacles = () => {
  tentacles.forEach((tentacle) => {
    const { connections } = tentacle;

    ctx.beginPath();
    ctx.lineWidth = tentacleWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(connections[0].x, connections[0].y);

    ctx.strokeStyle = "rgba(1, 48, 216, 0.8)";

    connections.slice(1).forEach((connector) => {
      ctx.lineTo(connector.x, connector.y);
    });

    ctx.stroke();
    ctx.closePath();
  });
};

const updateSquid = () => {
  const newX = squid.x + (mouse.x - squid.x) / 50;
  const newY = squid.y + (mouse.y - squid.y) / 50;
  const velocity = squid.x - newX;

  squid.angle = -velocity * 0.1;
  squid.velocity = velocity;
  squid.x = newX;
  squid.y = newY;
};

const drawSquid = () => {
  const eyeXInc = Math.cos(mouse.angle) * 5;
  const eyeYInc = Math.sin(mouse.angle) * 5;

  const eyeXInc2 = Math.cos(mouse.angle) * 10;
  const eyeYInc2 = Math.sin(mouse.angle) * 10;

  ctx.save();
  ctx.translate(squid.x, squid.y);
  ctx.rotate(squid.angle);

  ctx.beginPath();
  ctx.fillStyle = '#0130D8';
  ctx.lineWidth = 1;
  ctx.rect(-squid.radius, 0, squid.bodyWidth, squid.bodyHeight);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = '#0130D8';
  ctx.lineWidth = 1;
  ctx.arc(0, 0, squid.radius, 0, PI2, false);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(-15 + eyeXInc, eyeYInc, 4, 0, PI2, false);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(18 + eyeXInc2, eyeYInc2, 6, 0, PI2, false);
  ctx.fill();
  ctx.closePath();

  ctx.restore();
};

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateSquid();
  updatePoints();
  updateSticks();
  connectTentacles();
  drawTentacles();
  drawSquid();

  requestAnimationFrame(loop);
};

window.addEventListener('resize', onResize);
updateStage();
loop();

const onPointerMove = (e) => {
  const target = (e.touches && e.touches.length) ? e.touches[0] : e;
  const { clientX: x, clientY: y } = target;

  mouse.x = x;
  mouse.y = y;
  mouse.angle = angleBetween(squid.x, squid.y, mouse.x, mouse.y);
};

canvas.addEventListener('mousemove', onPointerMove);
canvas.addEventListener('touchmove', onPointerMove);


//글

const elSns = document.querySelector("#sns");
const elContacts = document.querySelectorAll(".contact");
const elH2s = document.querySelectorAll(".contact h2"); // 모든 h2 타겟

let contact = 0;
elContacts[contact].dataset.active = true;
elSns.dataset.contact = contact + 1;
elSns.dataset.contactCount = elContacts.length;

let inter = setInterval(changeContact, 3000);

function changeContact() {
  delete elContacts[contact].dataset.active;
  contact = (contact + 1) % elContacts.length;
  elSns.dataset.contact = contact + 1;
  elContacts[contact].dataset.active = true;
}

// 모든 h2에 마우스 이벤트 걸기
elH2s.forEach(h2 => {
  h2.addEventListener("mouseenter", () => {
    clearInterval(inter);
  });

  h2.addEventListener("mouseleave", () => {
    inter = setInterval(changeContact, 3000);
  });
});

