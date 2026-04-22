document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     THEME TOGGLE
     ============================== */
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;
  const icon = themeToggle.querySelector("i");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  icon.className = savedTheme === "dark"
    ? "fa-solid fa-moon"
    : "fa-solid fa-sun";

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    icon.className = next === "dark"
      ? "fa-solid fa-moon"
      : "fa-solid fa-sun";
  });

  /* ==============================
     MOBILE MENU
     ============================== */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  /* ==============================
     NAVBAR SCROLL EFFECT
     ============================== */
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ==============================
     TYPING EFFECT
     ============================== */
  const typedEl = document.getElementById("typed");
  const words = ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Open Source Enthusiast"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  /* ==============================
     SCROLL REVEAL ANIMATIONS
     ============================== */
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-left, .reveal-right"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ==============================
     SKILL BARS ANIMATION
     ============================== */
  const progressBars = document.querySelectorAll(".progress");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach((bar) => skillObserver.observe(bar));

  /* ==============================
     COUNTER ANIMATION (STATS)
     ============================== */
  const counters = document.querySelectorAll(".number[data-target]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          entry.target.classList.add("counted");
          const target = +entry.target.dataset.target;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              entry.target.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              entry.target.textContent = target;
            }
          };

          updateCounter();
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => counterObserver.observe(c));

  /* ==============================
     SMOOTH SCROLL FOR NAV LINKS
     ============================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

});