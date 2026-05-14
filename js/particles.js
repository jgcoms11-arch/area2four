(function () {
  const PARTICLE_COUNT = 60;
  const BASE_SPEED     = 0.28;
  const DOT_RADIUS     = 1.7;
  const LINE_DIST      = 140;
  const MOUSE_RADIUS   = 130;
  const MOUSE_FORCE    = 4;
  const DOT_COLOR      = '#F0B429';
  const LINE_OPACITY   = 0.15;
  const LINE_WIDTH     = 0.6;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;display:block;';
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  let mouse = { x: -9999, y: -9999 };

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  class Particle {
    constructor() { this.init(); }
    init() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * BASE_SPEED; this.vy = (Math.random() - 0.5) * BASE_SPEED;
      this.r = DOT_RADIUS + Math.random() * 1.2; this.a = 0.4 + Math.random() * 0.5;
    }
    update() {
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) { const f = (MOUSE_RADIUS - dist) / MOUSE_RADIUS; this.vx += (dx / dist) * f * MOUSE_FORCE * 0.055; this.vy += (dy / dist) * f * MOUSE_FORCE * 0.055; }
      this.vx *= 0.988; this.vy *= 0.988;
      const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (spd > BASE_SPEED * 4) { this.vx = (this.vx / spd) * BASE_SPEED * 4; this.vy = (this.vy / spd) * BASE_SPEED * 4; }
      if (spd < 0.08) { this.vx += (Math.random() - 0.5) * 0.1; this.vy += (Math.random() - 0.5) * 0.1; }
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0) { this.x = 0; this.vx *= -1; } if (this.x > W) { this.x = W; this.vx *= -1; }
      if (this.y < 0) { this.y = 0; this.vy *= -1; } if (this.y > H) { this.y = H; this.vy *= -1; }
    }
    draw() {
      ctx.save(); ctx.globalAlpha = this.a; ctx.fillStyle = DOT_COLOR;
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
  }

  function initParticles() { particles = []; for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle()); }
  function drawLines() {
    ctx.lineWidth = LINE_WIDTH;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINE_DIST) { const a = (1 - dist / LINE_DIST) * LINE_OPACITY; ctx.strokeStyle = `rgba(240,180,41,${a.toFixed(3)})`; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
      }
    }
  }
  function animate() { ctx.clearRect(0, 0, W, H); drawLines(); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize(); initParticles(); animate();
})();
