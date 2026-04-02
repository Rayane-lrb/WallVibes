"use strict";
import { addToFavs } from "./favUtils.js";
import { removeFromFavs } from "./favUtils.js";

const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const themeBtnImg = document.getElementById("themeBtn-img");
const resultContainer = document.getElementById("results-container");
const searchBar = document.getElementById("searchInput");
const geenResultaatbericht = document.getElementById("geenResultaatbericht");
const sortSelect = document.getElementById("sortSelect");

function themeSwitch(theme) {
  body.classList.remove("light-theme", "dark-theme");
  body.classList.add(theme);

  if (theme === "light-theme") {
    themeBtnImg.src = "/public/moon.svg";
  } else if (theme === "dark-theme") {
    themeBtnImg.src = "/public/sun.svg";
  }
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
  fetchImages();
});

async function fetchImages() {
  try {
    const response = await fetch(
      "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/parcours_street_art/records?limit=20",
    );
    const data = await response.json();

    displayImages(data);
  } catch (error) {
    throw new Error(error);
  }
}

function displayImages(data) {
  let favs = [];
  try {
    favs = JSON.parse(localStorage.getItem("favs")) || [];
  } catch {
    favs = [];
  }

  data.results.forEach((item) => {
    const divCard = document.createElement("div");
    divCard.classList.add("card", "hidden");
    divCard.dataset.name = item.name_nl;
    divCard.innerHTML = `
      <img src="${item.url_image ? item.url_image.url : "/placeholder.jpg"}" loading="lazy" class="art_img" />
      <div class="card-info">
        <h3>${item.name_nl}</h3>
        <div class="name_date_div">
          <h3>${item.artist_name}</h3>
          <h5>${item.real_date}</h5>
        </div>
        <h5 class="postcode">${item.postalcode} Brussel</h5>
        <img src="/public/fav.svg" class="fav-icon" width="24" height="24" alt="favoriet" />
      </div>
    `;

    const isFav = favs.find((fav) => fav.name_nl === item.name_nl);
    if (isFav) {
      divCard.querySelector(".fav-icon").src = "/public/fav_hover.svg";
    }

    const favIcons = divCard.querySelectorAll(".fav-icon");
    favIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        if (icon.src.includes("fav_hover.svg")) {
          icon.src = "/public/fav.svg";
          removeFromFavs(item);
        } else {
          icon.src = "/public/fav_hover.svg";
          addToFavs(item);
        }
      });
    });

    resultContainer.appendChild(divCard);
    observer.observe(divCard);
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
});

sortSelect.addEventListener("change", () => {
  const selectedValue = sortSelect.value;
  sortCards(selectedValue);
});

function sortCards(selectedValue) {
  const cards = Array.from(document.querySelectorAll(".card"));

  cards.sort((a, b) => {
    const nameA = a.querySelector("h3").textContent;
    const nameB = b.querySelector("h3").textContent;
    const dateA = new Date(a.querySelector(".name_date_div h5").textContent);
    const dateB = new Date(b.querySelector(".name_date_div h5").textContent);
    const gemeenteA = parseInt(a.querySelector(".postcode").textContent);
    const gemeenteB = parseInt(b.querySelector(".postcode").textContent);

    if (selectedValue === "az") return nameA.localeCompare(nameB);
    if (selectedValue === "za") return nameB.localeCompare(nameA);
    if (selectedValue === "nieuwst") return dateB - dateA;
    if (selectedValue === "oudste") return dateA - dateB;
    if (selectedValue === "per gemeente") return gemeenteA - gemeenteB;
    else return ;
  });
  cards.forEach((card) => resultContainer.appendChild(card));
}

searchBar.addEventListener("input", () => {
  const searchedValue = searchBar.value;
  const cards = document.querySelectorAll(".card");

  let visibleCount = 0;

  cards.forEach((card) => {
    if (card.textContent.toLowerCase().includes(searchedValue.toLowerCase())) {
      card.style.display = "flex";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (searchedValue === "") {
    geenResultaatbericht.style.display = "none";
  } else if (visibleCount === 0) {
    geenResultaatbericht.style.display = "block";
  } else {
    geenResultaatbericht.style.display = "none";
  }
});