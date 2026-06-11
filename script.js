// fade-in on scroll
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// counters
const counters = document.querySelectorAll(".counter");

const runCounters = () => {
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const inc = target / 100;

      if (current < target) {
        counter.innerText = Math.ceil(current + inc);
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
};

window.addEventListener("scroll", runCounters, { once: true });

// back to top
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
