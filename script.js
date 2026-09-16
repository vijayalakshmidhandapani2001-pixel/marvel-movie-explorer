const resultsContainer = document.getElementById('results');
const favoritesContainer =document.getElementById('favorites');
const searchInput = document.getElementById('search-input');
const modalOverlay = document.getElementById('modal-overlay');
const modalPoster = document.getElementById('modal-poster');
const modalTitle = document.getElementById('modal-title');
const modalMeta = document.getElementById('modal-meta');
const modalPlot = document.getElementById('modal-plot');
const modalClose = document.getElementById('modal-close');

let allMovies = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Fetch the local JSON file
async function loadMovies() {
  try {
    const response = await fetch('movies.json');
    allMovies = await response.json();
    renderMovies(allMovies);
    renderFavorites();
  } catch (error) {
    resultsContainer.innerHTML = `<p>Couldn't load movies. Check the console for details.</p>`;
    console.error('Error loading movies:', error);
  }
}


function createCard(movie, isFavorite) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title} poster">
    <div class="card-body">
      <h3>${movie.title}</h3>
      <p class="meta">${movie.year} · ${movie.phase}</p>
      <p class="plot">${movie.plot}</p>
      <button class="fav-btn" data-id="${movie.id}">
        ${isFavorite ? '★ Remove' : '☆ Add to Watchlist'}
      </button>
    </div>
  `;

  card.addEventListener('click', () => {
    openModal(movie);
  });

  const favBtn = card.querySelector('.fav-btn');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorite(movie.id);
  });

  return card;
}

function openModal(movie) {
  modalPoster.src = movie.poster;
  modalPoster.alt = `${movie.title} poster`;
  modalTitle.textContent = movie.title;
  modalMeta.textContent = `${movie.year} · ${movie.phase}`;
  modalPlot.textContent = movie.plot;
  modalOverlay.classList.remove('hidden');
}

function closeModal() {
  modalOverlay.classList.add('hidden');
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Build and insert movie cards into the DOM
function renderMovies(movies) {
  resultsContainer.innerHTML = ''; // clear previous results

  if (movies.length === 0) {
    resultsContainer.innerHTML = `<p>No movies found.</p>`;
    return;
  }

  movies.forEach(movie => {
    const isFavorite = favorites.includes(movie.id);
    resultsContainer.appendChild(createCard(movie, isFavorite));
  });
}

function renderFavorites() {
  favoritesContainer.innerHTML = '';

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = `<p>No movies saved yet. Click "Add to Watchlist" on any movie.</p>`;
    return;
  }

  const favMovies = allMovies.filter(movie => favorites.includes(movie.id));
  favMovies.forEach(movie => {
    favoritesContainer.appendChild(createCard(movie, true));
  });
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  renderMovies(allMovies);
  renderFavorites();
  searchInput.value = '';
}

 // Live search filtering
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );
  renderMovies(filtered);
});

// Run on page load
loadMovies();