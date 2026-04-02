export function addToFavs(item) {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  if (!favs.find((fav) => fav.name_nl === item.name_nl)) {
    favs.push(item);
    localStorage.setItem("favs", JSON.stringify(favs));
  }
}

export function removeFromFavs(item) {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  const updated = favs.filter((fav) => fav.name_nl !== item.name_nl);
  localStorage.setItem("favs", JSON.stringify(updated));
}