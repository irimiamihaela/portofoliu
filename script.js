// script.js
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  let count = 0;
  const updateCounter = () => {
    if (count < target) {
      count += Math.ceil(target / 30);
      if (count > target) count = target;
      counter.innerText = count;
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
};

// Observator pentru a porni animația când statisticile devin vizibile
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(counter => animateCounter(counter));
      observer.unobserve(statsSection);
    }
  });
}, { threshold: 0.5 });
observer.observe(statsSection);

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.2 });
reveals.forEach(el => revealObserver.observe(el));

// Back to top button
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) topBtn.style.display = 'block';
  else topBtn.style.display = 'none';
});
topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
