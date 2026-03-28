/* ============================================================
   MONETA CLOUD — flow-field.js
   Vanilla JS port of the flow-field-background React component.
   Renders a particle flow-field canvas into #aurora-canvas
   inside .hero. Mouse repulsion included.

   Config (mirrors the React props):
     color        — particle fill color
     trailOpacity — lower = longer trails (0.0–1.0)
     particleCount
     speed        — velocity multiplier
   ============================================================ */

(function () {
  'use strict';

  /* ── Config ── */
  var COLOR         = '#7ecef0';   /* brighter light blue */
  var TRAIL_OPACITY = 0.18;        /* controls fade speed — higher = shorter trails */
  var PARTICLE_COUNT = 550;
  var SPEED         = 0.85;

  /* ── Mount ── */
  var mountEl = document.getElementById('aurora-canvas');
  var heroEl  = document.querySelector('.hero');
  if (!mountEl || !heroEl) return;

  /* ── Canvas setup ── */
  var canvas = document.createElement('canvas');
  canvas.style.position    = 'absolute';
  canvas.style.top         = '0';
  canvas.style.left        = '0';
  canvas.style.width       = '100%';
  canvas.style.height      = '100%';
  canvas.style.pointerEvents = 'none';
  mountEl.appendChild(canvas);

  var ctx = canvas.getContext('2d');

  /* ── State ── */
  var width, height, dpr;
  var particles = [];
  var mouse = { x: -9999, y: -9999 };
  var rafId;

  /* ── Particle ── */
  function Particle() {
    this.reset();
    /* Scatter initial ages so they don't all spawn/die together */
    this.age = Math.floor(Math.random() * this.life);
  }

  Particle.prototype.reset = function () {
    this.x   = Math.random() * width;
    this.y   = Math.random() * height;
    this.vx  = 0;
    this.vy  = 0;
    this.age = 0;
    this.life = Math.random() * 200 + 100;
  };

  Particle.prototype.update = function () {
    /* Flow field angle from position */
    var angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;

    /* Flow field force */
    this.vx += Math.cos(angle) * 0.2 * SPEED;
    this.vy += Math.sin(angle) * 0.2 * SPEED;

    /* Mouse repulsion */
    var dx = mouse.x - this.x;
    var dy = mouse.y - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var radius = 160;
    if (dist < radius) {
      var force = (radius - dist) / radius;
      this.vx -= dx * force * 0.05;
      this.vy -= dy * force * 0.05;
    }

    /* Friction + movement */
    this.x  += this.vx;
    this.y  += this.vy;
    this.vx *= 0.95;
    this.vy *= 0.95;

    /* Age and recycle */
    this.age++;
    if (this.age > this.life) this.reset();

    /* Wrap edges */
    if (this.x < 0)      this.x = width;
    if (this.x > width)  this.x = 0;
    if (this.y < 0)      this.y = height;
    if (this.y > height) this.y = 0;
  };

  Particle.prototype.draw = function () {
    /* Fade in / out over lifespan */
    var alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
    ctx.globalAlpha = Math.max(0, alpha);
    ctx.fillStyle   = COLOR;
    ctx.fillRect(this.x, this.y, 1.5, 1.5);
  };

  /* ── Init ── */
  function init() {
    dpr    = window.devicePixelRatio || 1;
    width  = heroEl.offsetWidth;
    height = heroEl.offsetHeight;

    canvas.width  = width  * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  /* ── Animation loop ── */
  function animate() {
    rafId = requestAnimationFrame(animate);

    /* Paint a semi-transparent layer each frame — previous dots fade out gradually */
    ctx.globalAlpha = TRAIL_OPACITY;
    ctx.fillStyle   = '#1E3D5C';   /* hero background color */
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 1;

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
  }

  /* ── Event listeners ── */
  function onResize() {
    cancelAnimationFrame(rafId);
    init();
    animate();
  }

  function onMouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onMouseLeave() {
    mouse.x = -9999;
    mouse.y = -9999;
  }

  window.addEventListener('resize',    onResize,     { passive: true });
  heroEl.addEventListener('mousemove', onMouseMove,  { passive: true });
  heroEl.addEventListener('mouseleave', onMouseLeave, { passive: true });

  /* ── Start ── */
  init();
  animate();

})();
