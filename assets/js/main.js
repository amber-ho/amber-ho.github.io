const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

// Mobile menu: no editing needed unless you change the navigation markup.
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Highlights the current page in the navigation.
const currentPath = window.location.pathname.split("/").pop() || "index.html";
const isProjectDetail = window.location.pathname.includes("/projects/");

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPath = link.getAttribute("href").split("/").pop();

  if (linkPath === currentPath || (isProjectDetail && linkPath === "projects.html")) {
    link.classList.add("active");
  }
});
