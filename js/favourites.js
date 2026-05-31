const favContainer = document.getElementById("favContainer");
const movieCount = document.getElementById("movieCount");

const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

movieCount.textContent = favourites.length;

if (favourites.length === 0) {
  favContainer.innerHTML = `
    <div class="col-span-full text-center py-20">
      <h2 class="text-3xl font-bold">No Favourite Movies Yet</h2>
    </div>
  `;
}

favourites.forEach(movie => {

  const card = document.createElement("div");
  card.className = "movie-card";

  card.innerHTML = `
    <img src="${IMAGE_URL + movie.poster_path}">
    <div class="p-4">
      <h3 class="font-bold text-lg">${movie.title}</h3>
    </div>
  `;

  card.addEventListener("click", () => {
    localStorage.setItem("movieId", movie.id);
    window.location.href = "details.html";
  });

  favContainer.appendChild(card);
});