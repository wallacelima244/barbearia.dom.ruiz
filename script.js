// ========= Page load (carregamento suave) =========
window.addEventListener("load", () => {
  document.body.classList.remove("preload");
  document.body.classList.add("loaded");
});

// ========= Ano no footer =========
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// ========= Header scroll effect =========
const header = document.querySelector("[data-header]");
function onScrollHeader() {
  if (!header) return;
  const y = window.scrollY || 0;
  header.classList.toggle("is-scrolled", y > 8);
}
window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

// ========= Menu mobile =========
const btn = document.querySelector("[data-menu-btn]");
const mobile = document.querySelector("[data-mobile-nav]");

function closeMobile() {
  if (!mobile) return;
  mobile.classList.remove("open");
  btn?.setAttribute("aria-expanded", "false");
  mobile.setAttribute("aria-hidden", "true");
}

function toggleMobile() {
  if (!mobile || !btn) return;
  const open = mobile.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  mobile.setAttribute("aria-hidden", open ? "false" : "true");
}

btn?.addEventListener("click", toggleMobile);

// Fecha ao clicar em qualquer link do menu
mobile?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (a) closeMobile();
});

// Fecha com ESC
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobile();
});

// ========= Reveal animations =========
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
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
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// ========= Smooth anchor offset for sticky header =========
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const id = link.getAttribute("href");
  if (!id || id === "#") return;

  const target = document.querySelector(id);
  if (!target) return;

  e.preventDefault();
  closeMobile();

  const headerH = header ? header.getBoundingClientRect().height : 0;
  const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;

  window.scrollTo({ top, behavior: "smooth" });
});
