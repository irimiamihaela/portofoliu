// ======================== COUNTER ANIMATION ========================
const counters = document.querySelectorAll('.counter');
let counted = false;

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'), 10);
  let current = 0;
  const increment = Math.ceil(target / 30);
  const update = () => {
    current += increment;
    if (current >= target) {
      counter.innerText = target;
      return;
    }
    counter.innerText = current;
    requestAnimationFrame(update);
  };
  update();
}

const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      counters.forEach(counter => animateCounter(counter));
      statsObserver.unobserve(statsSection);
    }
  });
}, { threshold: 0.5 });
if (statsSection) statsObserver.observe(statsSection);

// ======================== REVEAL ON SCROLL ========================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.2 });
reveals.forEach(el => revealObserver.observe(el));

// ======================== BACK TO TOP BUTTON ========================
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
});
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
