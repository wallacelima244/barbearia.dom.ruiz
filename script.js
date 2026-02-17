// Ano no footer
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Menu mobile
const btn = document.querySelector(".menuBtn");
const mobile = document.getElementById("mobileNav");

function toggleMobile() {
  const open = mobile.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  mobile.setAttribute("aria-hidden", open ? "false" : "true");
}
if (btn) btn.addEventListener("click", toggleMobile);

if (mobile) {
  mobile.addEventListener("click", (e) => {
    if (e.target.tagName === "A") mobile.classList.remove("open");
  });
}

// Reveal animations
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);
reveals.forEach((el) => observer.observe(el));

