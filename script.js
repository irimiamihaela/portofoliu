document.addEventListener("DOMContentLoaded", function () {

  // FADE-IN ON SCROLL
  const reveals = document.querySelectorAll(".reveal");

  function reveal() {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal();

  // COUNTERS
  const counters = document.querySelectorAll(".counter");
  let started = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;

      const update = () => {
        if (count < target) {
          count++;
          counter.innerText = count;
          setTimeout(update, 30);
        }
      };

      update();
    });
  }

  window.addEventListener("scroll", () => {
    if (!started && window.scrollY > 200) {
      runCounters();
      started = true;
    }
  });

  // BACK TO TOP
  const btn = document.getElementById("topBtn");

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

});
