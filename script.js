// ------------------ Counter animat ------------------
const counters = document.querySelectorAll('.counter');
let counted = false;

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'), 10);
  let current = 0;
  const step = Math.ceil(target / 30);
  function update() {
    current += step;
    if (current >= target) {
      counter.innerText = target;
      return;
    }
    counter.innerText = current;
    requestAnimationFrame(update);
  }
  update();
}

const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      counters.forEach(c => animateCounter(c));
      statsObserver.unobserve(statsSection);
    }
  });
}, { threshold: 0.5 });
if (statsSection) statsObserver.observe(statsSection);

// ------------------ Reveal on scroll ------------------
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.2 });
reveals.forEach(el => revealObserver.observe(el));

// ------------------ Back to top button ------------------
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
