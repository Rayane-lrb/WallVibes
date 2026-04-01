"use strict";
console.log("test");
const body = document.body;
const themeBtn = document.getElementById("themeBtn");

function themeSwitch(theme) {
  body.classList.remove("light-theme", "dark-theme");
  body.classList.add(theme);
}

themeBtn.addEventListener("click", () => {
  const newTheme = body.classList.contains("dark-theme")
    ? "light-theme"
    : "dark-theme";
  localStorage.setItem("theme", newTheme);
  themeSwitch(newTheme);
});

const savedTheme = localStorage.getItem("theme") || "light-theme";
window.addEventListener("load", () => {
  themeSwitch(savedTheme);
});
