// Reveal-on-scroll for elements marked .reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Toggle a solid background on the header once the page is scrolled
const siteHeader = document.querySelector('header');
function updateHeaderState() {
  if (window.scrollY > 40) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }
}
if (siteHeader) {
  updateHeaderState();
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { updateHeaderState(); ticking = false; });
  }, { passive: true });
}

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
if (siteHeader && menuToggle) {
  const setMenu = (open) => {
    siteHeader.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  };
  menuToggle.addEventListener('click', () => setMenu(!siteHeader.classList.contains('menu-open')));
  document.querySelectorAll('#site-menu a, .nav-cta').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('pointerdown', (e) => { if (!siteHeader.contains(e.target)) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
}

// Side indicator: highlight the section currently in view
const dots = document.querySelectorAll('.dot-nav a');
if (dots.length) {
  const map = new Map();
  dots.forEach(a => { const el = document.getElementById(a.dataset.target); if (el) map.set(el, a); });
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        map.get(en.target).classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, el) => spy.observe(el));
}
