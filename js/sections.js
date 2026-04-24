'use strict';

/* ══════════════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════════════ */
(function initAbout() {
  onVisible(document.getElementById('lbl-about'), () => {
    document.getElementById('lbl-about').classList.add('in-view');
    document.getElementById('about-left').classList.add('in-view');
    document.getElementById('about-right').classList.add('in-view');

    // Animate counters
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      animateCounter(el, target, suffix);
    });

    // Tilt on stat cards
    document.querySelectorAll('.stat-card').forEach(c => attachTilt(c, 6));
  });
})();

/* ══════════════════════════════════════════════════
   SKILLS SECTION
══════════════════════════════════════════════════ */
(function initSkills() {
  const grid = document.getElementById('skills-grid');
  Object.entries(SKILLS).forEach(([cat, { color, icon, items }], i) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.transitionDelay = `${i * 0.09}s`;
    card.innerHTML = `
      <div class="skill-shine"></div>
      <div class="skill-corner" style="background:radial-gradient(circle at top right,${color}25,transparent 70%)"></div>
      <div class="skill-icon" style="background:${color}14;border:1px solid ${color}30;font-size:${cat === 'Languages' ? '11px' : '20px'};color:${color}">${icon}</div>
      <div class="skill-cat">${cat}</div>
      <div class="skill-count">${items.length} technologies</div>
      <div class="skill-pills">${items.map((s, j) =>
        `<span class="pill" style="transition-delay:${j * .04}s">${s}</span>`
      ).join('')}</div>`;

    card.addEventListener('mouseenter', () => {
      card.style.borderColor = color;
      card.querySelectorAll('.pill').forEach(p => {
        p.style.background = color + '14';
        p.style.borderColor = color + '40';
        p.style.color = color;
      });
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
      card.querySelectorAll('.pill').forEach(p => {
        p.style.background = ''; p.style.borderColor = ''; p.style.color = '';
      });
    });
    grid.appendChild(card);
  });

  onVisible(document.getElementById('lbl-skills'), () => {
    document.getElementById('lbl-skills').classList.add('in-view');
    document.getElementById('h2-skills').classList.add('in-view');
    grid.querySelectorAll('.skill-card').forEach(c => {
      c.classList.add('in-view');
      attachTilt(c, 7);
    });
  }, 0.05);
})();

/* ══════════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════════ */
(function initProjects() {
  const cats = ['All', ...new Set(PROJECTS.map(p => p.cat))];
  const filters = document.getElementById('filters');
  const grid = document.getElementById('projects-grid');
  let active = 'All';

  function makeCard(p) {
    const card = document.createElement('div');
    card.className = 'proj-card';
    card.innerHTML = `
      <div class="proj-top-line" style="background:linear-gradient(90deg,${p.color},transparent)"></div>
      <div class="proj-shine"></div>
      <div class="proj-glow" style="background:radial-gradient(circle at top right,${p.color}18,transparent 70%)"></div>
      <div class="proj-head">
        <div class="proj-icon-wrap" style="background:${p.color}14;border:1px solid ${p.color}30">${p.icon}</div>
        <span class="proj-tag-badge" style="background:${p.color}14;color:${p.color};border:1px solid ${p.color}30">${p.tag}</span>
      </div>
      <div>
        <div class="proj-title">${p.title}</div>
        <div class="proj-sub" style="color:${p.color}">${p.sub}</div>
        <p class="proj-desc">${p.desc}</p>
      </div>
      <div class="proj-tech">${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}</div>
      <div class="proj-footer">
        <span class="proj-cat-label">${p.cat}</span>
        <a class="proj-link" href="${p.link}" target="_blank" rel="noopener" style="color:var(--text-dim)">
          ${p.type === 'live' ? 'Live Demo ↗' : 'View Code ↗'}
        </a>
      </div>`;

    card.addEventListener('mouseenter', () => {
      card.style.borderColor = p.color;
      card.style.boxShadow = `0 30px 60px rgba(0,0,0,.4),0 0 40px ${p.color}18`;
      card.querySelector('.proj-link').style.color = p.color;
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = ''; card.style.boxShadow = '';
      card.querySelector('.proj-link').style.color = 'var(--text-dim)';
    });

    requestAnimationFrame(() => attachTilt(card, 6));
    return card;
  }

  function render() {
    grid.classList.add('fading');
    setTimeout(() => {
      grid.innerHTML = '';
      PROJECTS.filter(p => active === 'All' || p.cat === active)
        .forEach(p => grid.appendChild(makeCard(p)));
      grid.classList.remove('fading');
    }, 240);
  }

  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === 'All' ? ' active' : '');
    btn.textContent = cat;
    btn.onclick = () => {
      active = cat;
      filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    };
    filters.appendChild(btn);
  });

  render();
  onVisible(document.getElementById('lbl-projects'), () => {
    document.getElementById('lbl-projects').classList.add('in-view');
    document.getElementById('h2-projects').classList.add('in-view');
  });
})();

/* ══════════════════════════════════════════════════
   EXPERIENCE SECTION
══════════════════════════════════════════════════ */
(function initExperience() {
  const container = document.getElementById('exp-items');
  EXP.forEach((e, i) => {
    const item = document.createElement('div');
    item.className = 'exp-item';
    item.style.transitionDelay = `${.2 + i * .18}s`;
    item.innerHTML = `
      <div class="exp-node" style="background:${e.color}14;border:2px solid ${e.color};color:${e.color};box-shadow:0 0 24px ${e.color}25">${e.num}</div>
      <div class="exp-card">
        <div class="exp-accent" style="background:linear-gradient(90deg,${e.color},transparent)"></div>
        <div class="exp-head">
          <div>
            <div class="exp-role">${e.role}</div>
            <div class="exp-company" style="color:${e.color}">${e.company}</div>
          </div>
          <span class="exp-period">${e.period}</span>
        </div>
        <p class="exp-desc">${e.desc}</p>
      </div>`;
    container.appendChild(item);
  });

  onVisible(document.getElementById('lbl-exp'), () => {
    document.getElementById('lbl-exp').classList.add('in-view');
    document.getElementById('h2-exp').classList.add('in-view');
    document.querySelectorAll('.exp-item').forEach(el => el.classList.add('in-view'));
    document.querySelectorAll('.exp-card').forEach(c => attachTilt(c, 4));
  });
})();

/* ══════════════════════════════════════════════════
   CONTACT SECTION
══════════════════════════════════════════════════ */
(function initContact() {
  const grid = document.getElementById('contact-grid');
  CONTACTS.forEach((c, i) => {
    const tag = c.href ? 'a' : 'div';
    const card = document.createElement(tag);
    card.className = 'contact-card';
    if (c.href) {
      card.href = c.href;
      if (c.href.startsWith('http')) { card.target = '_blank'; card.rel = 'noopener'; }
    }
    card.style.transitionDelay = `${.2 + i * .1}s`;
    card.innerHTML = `
      <div class="contact-icon" style="background:${c.color}14;border:1px solid ${c.color}30;color:${c.color}">${c.icon}</div>
      <div>
        <div class="contact-label">${c.label.toUpperCase()}</div>
        <div class="contact-value">${c.value}</div>
      </div>`;
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = c.color;
      card.querySelector('.contact-value').style.color = c.color;
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
      card.querySelector('.contact-value').style.color = '';
    });
    grid.appendChild(card);
  });

  onVisible(document.getElementById('lbl-contact'), () => {
    document.getElementById('lbl-contact').classList.add('in-view');
    document.getElementById('contact-tagline').classList.add('in-view');
    document.getElementById('contact-intro').classList.add('in-view');
    document.querySelectorAll('.contact-card').forEach(el => el.classList.add('in-view'));
    document.querySelectorAll('.contact-card').forEach(c => attachTilt(c, 5));
  });
})();

/* ══════════════════════════════════════════════════
   INIT MAGNETIC & GLOBAL OBSERVERS
══════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initMagnetic();

  // Skills section label (secondary observer)
  onVisible(document.getElementById('lbl-skills'), () => {
    document.getElementById('lbl-skills').classList.add('in-view');
    document.getElementById('h2-skills').classList.add('in-view');
  }, 0.05);
});
