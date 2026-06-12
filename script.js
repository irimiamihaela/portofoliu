// ======================== MODAL PENTRU IMAGINI ========================
// Așteaptă ca întregul document să fie încărcat
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM încărcat - inițializare modal');

  // Găsește elementele modalului
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.close');

  // Verifică dacă elementele există
  if (!modal) console.error('Elementul #imageModal nu există!');
  if (!modalImg) console.error('Elementul #modalImg nu există!');
  if (!closeBtn) console.error('Butonul .close nu există!');

  // Toate imaginile din carduri
  const projectImages = document.querySelectorAll('.card img');
  console.log('S-au găsit ' + projectImages.length + ' imagini în carduri');

  // Funcția care deschide modalul
  function openModal(imgElement) {
    console.log('Click pe imagine: ' + imgElement.src);
    modal.style.display = 'block';
    modalImg.src = imgElement.src;
    modalCaption.innerHTML = imgElement.alt || 'Imagine mărită';
  }

  // Adaugă click pe fiecare imagine
  projectImages.forEach((img, index) => {
    img.style.cursor = 'pointer';  // arată că se poate da click
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      openModal(this);
    });
    console.log('Atasat click pe imaginea ' + index);
  });

  // Închide modal la click pe X
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  // Închide modal la click pe fundalul întunecat
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Închide cu tasta ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });
});

// ======================== COUNTER ANIMATION ========================
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
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(c => animateCounter(c));
        statsObserver.unobserve(statsSection);
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

// ======================== REVEAL ON SCROLL ========================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.2 });
reveals.forEach(el => revealObserver.observe(el));

// ======================== BACK TO TOP BUTTON ========================
const topBtn = document.getElementById('topBtn');
if (topBtn) {
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ======================== MODAL CU DELEGARE ========================
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.close');
  const gridContainer = document.querySelector('.grid'); // sau un container mai general

  if (!gridContainer) {
    console.error('Nu s-a găsit containerul .grid');
    return;
  }

  // Ascultă click-uri pe containerul .grid și verifică dacă targetul este o imagine
  gridContainer.addEventListener('click', function(e) {
    let target = e.target;
    // Caută dacă elementul click-uit este o imagine sau se află în interiorul unei imagini
    while (target && target !== gridContainer) {
      if (target.tagName === 'IMG') {
        e.preventDefault();
        e.stopPropagation();
        // Deschide modalul
        modal.style.display = 'block';
        modalImg.src = target.src;
        modalCaption.innerHTML = target.alt || 'Imagine mărită';
        return;
      }
      target = target.parentNode;
    }
  });

  // Închidere modal
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });
});
