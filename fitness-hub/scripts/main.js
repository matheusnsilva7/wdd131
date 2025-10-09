const navMenu = document.querySelector(".main-nav");
const currentYearEl = document.getElementById("currentyear");
const menuToggleBtn = document.getElementById("menu-toggle");
const lastModifiedEl = document.getElementById("lastmodified");

menuToggleBtn?.addEventListener("click", () => {
  const isExpanded = menuToggleBtn.getAttribute("aria-expanded") === "true";
  menuToggleBtn.setAttribute("aria-expanded", String(!isExpanded));

  navMenu.style.display = isExpanded ? "none" : "block";
  menuToggleBtn.textContent = isExpanded ? "☰" : "✖";
});

if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
if (lastModifiedEl)
  lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
