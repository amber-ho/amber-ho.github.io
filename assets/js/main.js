const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const getSavedTheme = () => {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Theme still changes for the current page if browser storage is unavailable.
  }
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }
};

applyTheme(getSavedTheme() || (prefersDark ? "dark" : "light"));

// Theme switcher: edit the colors in styles.css if you want different palettes.
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    saveTheme(nextTheme);
    applyTheme(nextTheme);
  });
}

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
