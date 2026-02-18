/* ===================================================
   PORTFOLIO SCRIPT - Sai Hae Naing Lay
   =================================================== */

/* ---------- TYPING EFFECT ---------- */
const roles = [
  'Computer Engineering Student',
  'AI / ML Learner',
  'Web & App Developer'
];
let roleIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function tick() {
  const word = roles[roleIdx];
  typedEl.textContent = deleting ? word.slice(0, charIdx--) : word.slice(0, charIdx++);
  let delay = deleting ? 42 : 92;
  if (!deleting && charIdx > word.length) { delay = 1800; deleting = true; }
  else if (deleting && charIdx < 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; charIdx = 0; delay = 400; }
  setTimeout(tick, delay);
}
setTimeout(tick, 900);


/* ---------- ACTIVE NAV ON SCROLL ---------- */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) cur = s.id;
  });
  navAs.forEach(a => {
    const href = a.getAttribute('href');
    // Only toggle active for section links (starting with #)
    if (href && href.startsWith('#')) {
      a.classList.toggle('active', href === '#' + cur);
    } else {
      a.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
// Also run on load so active state is correct immediately
window.addEventListener('load', updateActiveNav);
updateActiveNav();


/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});


/* ---------- THEME TOGGLE ---------- */
const themeBtn  = document.getElementById('themeToggle');
const themeIcon = themeBtn.querySelector('i');

function applyTheme(t) {
  document.body.classList.toggle('light', t === 'light');
  themeIcon.className = t === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', t);
}

applyTheme(localStorage.getItem('theme') || 'dark');
themeBtn.addEventListener('click', () =>
  applyTheme(document.body.classList.contains('light') ? 'dark' : 'light')
);


/* ---------- PROJECT FILTER TABS ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c => c.classList.toggle('hidden', f !== 'all' && c.dataset.category !== f));
  });
});


/* ---------- SCROLL REVEAL ---------- */
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(
  '.project-card, .trait, .timeline-item, .skill-cat, .skills-extra-card, .contact-item, .social-card, .stats-card, .edu-card'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 55}ms`;
  revObs.observe(el);
});