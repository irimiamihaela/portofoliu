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

// ======================== MODAL PENTRU IMAGINI ========================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.querySelector('.close');

// Toate imaginile din carduri
const projectImages = document.querySelectorAll('.card img');

// Funcție deschide modal
function openModal(imgElement) {
  modal.style.display = 'block';
  modalImg.src = imgElement.src;
  modalCaption.innerHTML = imgElement.alt || 'Imagine mărită';
}

// Adaugă eveniment click pe fiecare imagine
projectImages.forEach(img => {
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(img);
  });
});

// Închide modal la click pe X sau pe fundalul întunecat
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  // Dacă se face click pe fundalul modalului (nu pe imagine sau pe X)
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Închide cu tasta Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
  }
});
