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
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}
