'use strict';
import { displayImages } from "./main.js";

window.addEventListener("load", () => {
  const favs = localStorage.getItem("favs") || [];
  displayImages(JSON.parse(favs));
})
