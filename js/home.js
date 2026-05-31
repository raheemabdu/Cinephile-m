const hero = document.getElementById("hero");
const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");

const moviesContainer = document.getElementById("moviesContainer");
const searchInput = document.getElementById("searchInput");
const viewAllBtn = document.getElementById("viewAllBtn");

let allMovies = [];
let visibleMovies = 10;
let showingAll = false;

/* FETCH */
async function fetchMovies() {

  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await res.json();
  allMovies = data.results;

  const randomMovie =
    allMovies[Math.floor(Math.random() * allMovies.length)];

  setHero(randomMovie);

  displayMovies(allMovies.slice(0, visibleMovies));
}

/* HERO */
function setHero(movie){
  hero.style.backgroundImage =
    `url(${BACKDROP_URL + movie.backdrop_path})`;

  heroTitle.textContent = movie.title;
  heroDescription.textContent = movie.overview;
}

/* DISPLAY */
function displayMovies(movies){

  moviesContainer.innerHTML = "";

  movies.forEach(movie => {

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${IMAGE_URL + movie.poster_path}">
      <div class="p-4">
        <h3 class="text-sm font-semibold">${movie.title}</h3>
      </div>
    `;

    card.addEventListener("click", () => {
      localStorage.setItem("movieId", movie.id);
      window.location.href = "detail.html";
    });

    moviesContainer.appendChild(card);

  });
}

/* SEARCH */
searchInput.addEventListener("input", async (e)=>{

  const query = e.target.value.trim();

  if(query === ""){
    displayMovies(allMovies.slice(0, visibleMovies));
    return;
  }

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await res.json();
  displayMovies(data.results);
});


document.getElementById("scrollLeft").addEventListener("click", () => {
  moviesContainer.scrollBy({ left: -800, behavior: "smooth" });
});

document.getElementById("scrollRight").addEventListener("click", () => {
  moviesContainer.scrollBy({ left: 800, behavior: "smooth" });
});

viewAllBtn.addEventListener("click", () => {

  showingAll = !showingAll;

  if (showingAll) {
    displayMovies(allMovies);
    viewAllBtn.textContent = "Show Less ←";
  } else {
    displayMovies(allMovies.slice(0, visibleMovies));
    viewAllBtn.textContent = "Show More Movies →";
  }
});


const images = [
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
  "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
  "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
  "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
  "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb"
];

function randomImage(){
  return images[Math.floor(Math.random() * images.length)];
}

function updateImages(){
  document.getElementById("img1").src = randomImage();
  document.getElementById("img2").src = randomImage();
}

updateImages();
setInterval(updateImages, 1000);

/* INIT */
fetchMovies();