// details.js

document.addEventListener("DOMContentLoaded", async () => {

  const movieId = localStorage.getItem("movieId");

  if (!movieId) {

    alert("No Movie Selected");
    window.location.href = "index.html";
    return;

  }

  try {

    // 🎬 MOVIE DETAILS API
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );

    const movie = await res.json();

    console.log(movie);

  
    document.getElementById("hero").style.backgroundImage =
      `url(${BACKDROP_URL + movie.backdrop_path})`;

  
    document.getElementById("poster").src =
      movie.poster_path
      ? IMAGE_URL + movie.poster_path
      : "https://via.placeholder.com/500x750";

    // 🎬 TITLE
    document.getElementById("title").textContent =
      movie.title || "No Title";

    document.getElementById("rating").textContent =
      "⭐ " + movie.vote_average.toFixed(1);

   
    document.getElementById("year").textContent =
      "📅 " + (movie.release_date?.slice(0,4) || "N/A");

    // ⏱ RUNTIME
    document.getElementById("runtime").textContent =
      "⏱ " + (movie.runtime || "0") + " min";

    // 🏷 GENRES
    document.getElementById("genres").innerHTML =
      movie.genres.map(g => `
        <span class="bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-2 rounded-full text-xs">
          ${g.name}
        </span>
      `).join("");

   
    document.getElementById("overview").textContent =
      movie.overview || "No overview available.";

    // 🎭 CAST API
    const castRes = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );

    const castData = await castRes.json();

    renderCast(castData.cast);

    
    const favBtn =
      document.getElementById("favBtn");

    // already favourite?
    let favourites =
      JSON.parse(localStorage.getItem("favourites")) || [];

    const alreadyExists =
      favourites.some(f => f.id === movie.id);

    if(alreadyExists){

      favBtn.textContent = "❤️ Added";
      favBtn.classList.add("bg-red-600");

    }

    favBtn.addEventListener("click", () => {

  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const exists = favourites.some(f => f.id === movie.id);

  if (exists) {
    alert("Already in favourites ❤️");
    return;
  }

  favourites.push(movie);

  localStorage.setItem("favourites", JSON.stringify(favourites));

  favBtn.textContent = "❤️ Added";
});

  }

  catch (error) {

    console.log(error);

    alert("Something Went Wrong!");

  }

});



function renderCast(cast) {

  const container =
    document.getElementById("castContainer");

  if(!container) return;

  container.innerHTML = "";

  cast.slice(0,10).forEach(actor => {

    const div = document.createElement("div");

    div.className =
      "text-center min-w-[120px]";

    div.innerHTML = `

      <img
      src="${
        actor.profile_path
        ? IMAGE_URL + actor.profile_path
        : 'https://via.placeholder.com/150'
      }"

      class="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#2A2A2A]">

      <p class="text-sm mt-3 font-semibold">
        ${actor.name}
      </p>

      <p class="text-xs text-[#888] mt-1">
        ${actor.character || "Unknown"}
      </p>

    `;

    container.appendChild(div);

  });

}