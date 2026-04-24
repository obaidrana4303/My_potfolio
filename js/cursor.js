'use strict';

/* ══════════════════════════════════════════════════
   CURSOR — Custom dot + ring + magnetic buttons
══════════════════════════════════════════════════ */
(function initCursor() {
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  // Smooth ring follow
  (function animRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Hover state on interactive elements
  const interactives = 'a,button,.proj-card,.skill-card,.stat-card,.contact-card,.exp-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      dot.classList.add('big');
      ring.classList.add('big');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) {
      dot.classList.remove('big');
      ring.classList.remove('big');
    }
  });
  document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(.7)');
  document.addEventListener('mouseup', () => dot.style.transform = 'translate(-50%,-50%)');
  document.addEventListener('mouseleave', () => dot.classList.add('hidden'));
  document.addEventListener('mouseenter', () => dot.classList.remove('hidden'));
})();

/* ══════════════════════════════════════════════════
   MAGNETIC BUTTONS
══════════════════════════════════════════════════ */
function initMagnetic() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * .28}px, ${dy * .28}px)`;
      btn.style.transition = 'transform .1s linear';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'all .5s var(--ease-spring)';
    });
  });
}
