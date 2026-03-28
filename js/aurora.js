/* ============================================================
   MONETA CLOUD — aurora.js
   Aurora WebGL animated background for the hero section.
   Renders a Three.js shader into #aurora-canvas inside .hero.
   Ported from the starfall-portfolio-landing React component.
   ============================================================ */

(function () {
  'use strict';

  const heroEl   = document.querySelector('.hero');
  const mountEl  = document.getElementById('aurora-canvas');

  if (!mountEl || !heroEl || typeof THREE === 'undefined') return;

  /* ── Remove mount div from flex flow immediately ── */
  mountEl.style.position    = 'absolute';
  mountEl.style.top         = '0';
  mountEl.style.left        = '0';
  mountEl.style.right       = '0';
  mountEl.style.bottom      = '0';
  mountEl.style.overflow    = 'hidden';
  mountEl.style.pointerEvents = 'none';
  mountEl.style.zIndex      = '0';

  /* ── Scene setup ── */
  const scene    = new THREE.Scene();
  const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });

  function heroSize() {
    return { w: heroEl.offsetWidth, h: heroEl.offsetHeight };
  }

  const { w, h } = heroSize();
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  /* Canvas fills the hero absolutely */
  const canvas = renderer.domElement;
  canvas.style.position    = 'absolute';
  canvas.style.top         = '0';
  canvas.style.left        = '0';
  canvas.style.width       = '100%';
  canvas.style.height      = '100%';
  canvas.style.pointerEvents = 'none';
  mountEl.appendChild(canvas);

  /* ── Aurora shader material ── */
  const material = new THREE.ShaderMaterial({
    uniforms: {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2(w, h) }
    },

    vertexShader: /* glsl */`
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `,

    fragmentShader: /* glsl */`
      uniform float iTime;
      uniform vec2  iResolution;

      #define NUM_OCTAVES 3

      float rand(vec2 n) {
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 u  = fract(p);
        u = u * u * (3.0 - 2.0 * u);
        return mix(
          mix(rand(ip),                rand(ip + vec2(1.0, 0.0)), u.x),
          mix(rand(ip + vec2(0.0,1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
          u.y
        ) * fract(p).x; /* keep pattern from tiling visibly */
      }

      float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.3;
        vec2  shift = vec2(100.0);
        mat2  rot   = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
          v += a * noise(x);
          x  = rot * x * 2.0 + shift;
          a *= 0.4;
        }
        return v;
      }

      void main() {
        vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5)
                 / iResolution.y
                 * mat2(6.0, -4.0, 4.0, 6.0);

        vec4  o = vec4(0.0);
        float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

        for (float i = 0.0; i++ < 35.0;) {
          vec2 v = p + cos(
            i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)
          ) * 3.5;

          float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3
                            * (1.0 - i / 35.0);

          vec4 auroraColor = vec4(
            0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
            0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
            0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
            1.0
          );

          vec4 contrib = auroraColor
            * exp(sin(i * i + iTime * 0.8))
            / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));

          float thin = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
          o += contrib * (1.0 + tailNoise * 0.8) * thin;
        }

        o = tanh(pow(o / 100.0, vec4(1.6)));
        gl_FragColor = o * 1.5;
      }
    `
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  scene.add(new THREE.Mesh(geometry, material));

  /* ── Animation loop ── */
  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);
    material.uniforms.iTime.value += 0.016;
    renderer.render(scene, camera);
  }

  /* ── Resize handling ── */
  function onResize() {
    const { w: nw, h: nh } = heroSize();
    renderer.setSize(nw, nh);
    material.uniforms.iResolution.value.set(nw, nh);
  }

  window.addEventListener('resize', onResize, { passive: true });
  animate();
})();
