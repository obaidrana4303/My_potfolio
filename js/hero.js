'use strict';

/* ══════════════════════════════════════════════════
   PAGE LOADER → HERO REVEAL
══════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');

    // Staggered hero reveal
    const badge = document.getElementById('hero-badge');
    const role = document.getElementById('hero-role');
    const desc = document.getElementById('hero-desc');
    const cta = document.getElementById('hero-cta');
    const hint = document.getElementById('scroll-hint');
    const meta = document.getElementById('hero-meta');

    // Animate name chars
    const firstEl = document.getElementById('hero-first');
    const lastEl = document.getElementById('hero-last');
    firstEl.innerHTML = 'OBAID'.split('').map(
      (c, i) => `<span class="name-char" style="transition-delay:${.9 + i * .07}s">${c}</span>`
    ).join('');
    setTimeout(() => {
      firstEl.querySelectorAll('.name-char').forEach(c => c.classList.add('show'));
      lastEl.classList.add('show');
    }, 50);

    badge.classList.add('show');
    setTimeout(() => role.classList.add('show'), 1300);
    setTimeout(() => desc.classList.add('show'), 1500);
    setTimeout(() => cta.classList.add('show'), 1700);
    setTimeout(() => hint.classList.add('show'), 2100);
    setTimeout(() => meta.classList.add('show'), 1900);
    setTimeout(() => startTypewriter(), 1500);
  }, 1100);
});

/* ══════════════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════════════ */
function startTypewriter() {
  const roles = [
    "Computer Scientist", "AI / ML Engineer", "Full-Stack Developer",
    "Flutter App Developer", "Game Developer", "Problem Solver", "Lifelong Learner"
  ];
  let wi = 0, ci = 0, deleting = false;
  const el = document.getElementById('typed');
  if (!el) return;

  function tick() {
    const word = roles[wi];
    const wait = deleting ? 45 : (ci === word.length ? 1600 : 75);
    setTimeout(() => {
      if (!deleting) {
        if (ci < word.length) el.textContent = word.slice(0, ++ci);
        else deleting = true;
      } else {
        if (ci > 0) el.textContent = word.slice(0, --ci);
        else { deleting = false; wi = (wi + 1) % roles.length; }
      }
      tick();
    }, wait);
  }
  tick();
}
