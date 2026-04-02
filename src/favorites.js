"use strict";
import { addToFavs } from "./favUtils.js";
import { removeFromFavs } from "./favUtils.js";

const resultContainer = document.getElementById("results-container");

window.addEventListener("load", () => {
  displayFavs();
});

function displayFavs() {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  console.log(favs);
  favs.forEach((item) => {
    console.log(item);
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
        <h5>${item.postalcode} Brussel</h5>
        <img src="/public/fav_hover.svg" class="fav-icon" width="24" height="24" alt="favoriet" />
      </div>
    `;
    if(favs.find((fav) => fav.name_nl === item.name_nl)) {

      }

    const favIcons = divCard.querySelectorAll(".fav-icon");
    favIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        if (icon.src.includes("fav_hover.svg")) {
          icon.src = "/public/fav.svg";
          removeFromFavs(item);
          divCard.remove();
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
