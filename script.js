/* ════════════════════════════════════════════
   NITHISH BALAJI PORTFOLIO — script.js
   ════════════════════════════════════════════ */

/* ── THEME TOGGLE ── */
(function () {
  const html  = document.documentElement;
  const btn   = document.getElementById('theme-toggle');
  const KEY   = 'nb-theme';          // only set when user manually picks
  const mq    = window.matchMedia('(prefers-color-scheme: light)');

  // Apply: saved manual preference wins; otherwise follow the browser
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
  }

  const saved = localStorage.getItem(KEY);
  applyTheme(saved ?? (mq.matches ? 'light' : 'dark'));

  // If user hasn't overridden, track OS-level changes live
  mq.addEventListener('change', e => {
    if (!localStorage.getItem(KEY)) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  // Manual toggle — store the choice so it sticks
  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(KEY, next);
  });
})();

/* ── CUSTOM CURSOR ── */
(function () {
  const C  = document.getElementById('C');
  const CR = document.getElementById('CR');
  let mx = -200, my = -200, crx = -200, cry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    C.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });

  (function animRing() {
    crx += (mx - crx) * .1;
    cry += (my - cry) * .1;
    CR.style.transform = `translate(${crx}px,${cry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animRing);
  })();

  const hoverEls = 'a, button, .sk-card, .pj-card, .cert, .exp-tab, .pill-link, #theme-toggle';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
})();

/* ── HERO CANVAS — particle field ── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r:  Math.random() * 1.5 + .5,
      a:  Math.random()
    }));
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // lines between nearby particles
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.hypot(dx, dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(92,124,250,${.15 * (1 - d / 120)})`;
          ctx.lineWidth   = .5;
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    // dots
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(92,124,250,${p.a * .55})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── SCROLL REVEAL ── */
(function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.rv').forEach(el => observer.observe(el));
})();

/* ── EXPERIENCE TABS ── */
(function () {
  document.querySelectorAll('.exp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = tab.dataset.tab;
      document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('ep' + idx);
      if (panel) panel.classList.add('active');
    });
  });
})();

/* ── NAV SCROLL GLASS ── */
(function () {
  const nav = document.getElementById('nav');
  const theme = () => document.documentElement.getAttribute('data-theme');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.background = theme() === 'light'
        ? 'rgba(245,246,250,.97)'
        : 'rgba(10,10,15,.92)';
    } else {
      nav.style.background = '';   // falls back to CSS var
    }
  }, { passive: true });

  // Re-apply on theme change so nav bg is correct
  const mutObs = new MutationObserver(() => { nav.style.background = ''; });
  mutObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
