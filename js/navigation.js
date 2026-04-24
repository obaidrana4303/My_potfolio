'use strict';

/* ══════════════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════════════ */
(function initProgress() {
  const bar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════
   NAV — SCROLL SPY + ACTIVE SECTION
══════════════════════════════════════════════════ */
function navScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  const nb = document.getElementById('nav-' + id);
  if (nb) nb.classList.add('active');
}

window.addEventListener('scroll', () => {
  // Nav background
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  // Scroll spy
  const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
  let active = 'home';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 150) active = id;
  });
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  const nb = document.getElementById('nav-' + active);
  if (nb) nb.classList.add('active');
}, { passive: true });
