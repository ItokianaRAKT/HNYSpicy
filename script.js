const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];

const colors = [
  [170, 180, 255], 
  [255, 160, 190], 
  [190, 255, 220], 
  [255, 220, 160]  
];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createExplosion(x, y) {
  const count = random(35, 60);
  const color = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = random(1.2, 3.5);

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: random(50, 80),
      alpha: 1,
      color
    });
  }
}

function createFireworksCluster() {
  const explosions = Math.floor(random(2, 4));

  for (let i = 0; i < explosions; i++) {
    const x = random(canvas.width * 0.15, canvas.width * 0.85);
    const y = random(canvas.height * 0.15, canvas.height * 0.6);

    setTimeout(() => createExplosion(x, y), i * 120);
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.02; 
    p.life--;
    p.alpha -= 0.012;

    ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  });

  particles = particles.filter(p => p.life > 0 && p.alpha > 0);
  requestAnimationFrame(update);
}


setInterval(createFireworksCluster, 1000);
update();

const text = `Hello Spicy.
Je voulais te remercier pour ton message.
Et te souhaiter une MERVEILLEUSE année, remplie de joies et de belles choses.
Mais aussi d’emmerdements (signés Ghostie 👻), 
parce que la vie serait nulle sinon (tu sais que j'ai raison😎).
(P.S: Merci pour ces dernières semaines magnifiques. J'espères que ce n'était que le début)
(P.P.S: Le compteur reviens à 0 cette année, donc PEUT-ÊTRE que tu seras le premier?
Qui sais ?😉)`;

const element = document.getElementById("typing-text");
let index = 0;

function typeWriter() {
  if (index < text.length) {
    const char = text[index];
    element.innerHTML += char === "\n" ? "<br>" : char;
    index++;
    setTimeout(typeWriter, 100);
  }
}


setTimeout(typeWriter, 1000);
