'use strict';

/* ══════════════════════════════════════════════════
   UTILS — Shared helpers
══════════════════════════════════════════════════ */

/**
 * Run callback once when element enters viewport.
 */
function onVisible(el, cb, threshold = 0.1) {
  if (!el) return;
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { cb(); obs.disconnect(); }
  }, { threshold });
  obs.observe(el);
}

/**
 * Animate a number counter from 0 to target.
 */
function animateCounter(el, target, suffix, duration = 1400) {
  const start = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/**
 * Attach 3D tilt effect on mousemove for a card element.
 */
function attachTilt(el, strength = 8) {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    const rx = -(y - cy) / cy * strength;
    const ry = (x - cx) / cx * strength;
    // Update shine position CSS var
    el.style.setProperty('--sx', (x / r.width * 100) + '%');
    el.style.setProperty('--sy', (y / r.height * 100) + '%');
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
    el.style.transition = 'transform .05s linear';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'all .6s var(--ease-spring)';
  });
}
