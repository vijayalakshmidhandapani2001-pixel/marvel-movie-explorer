# 🦸 Marvel Movie Explorer

A responsive web app to browse Marvel Cinematic Universe films, search them live, view details in a modal, and build a personal watchlist that persists between visits.

**[→ Live Demo](https://vijayalakshmidhandapani2001-pixel.github.io/marvel-movie-explorer/)**

## Features
- Live search filtering that updates as you type
- Click any movie card to view full details in a modal
- Watchlist saved to localStorage — persists after closing the browser
- Responsive CSS Grid layout that adapts from mobile to desktop
- Graceful error and empty states

## Tech Stack
Vanilla JavaScript (ES6+), HTML5, CSS3 — no frameworks or libraries.

## What I Learned
Built entirely without a framework to strengthen my fundamentals in DOM manipulation and async JavaScript. Key challenges:

- **Async data loading:** Used `fetch` with `async/await` and `try/catch` to load and handle local JSON data, including proper error states when the request fails.
- **Avoiding duplicated logic:** Refactored card rendering into a single shared `createCard()` function used by both the results grid and the watchlist, rather than maintaining two copies of the same markup.
- **Data persistence:** Stored only movie IDs in localStorage rather than full objects, keeping storage lightweight and ensuring the displayed data always stays in sync with the source dataset.
- **Event bubbling:** Used `e.stopPropagation()` so clicking the "Add to Watchlist" button doesn't also trigger the parent card's click handler (which opens the detail modal).

## Running Locally
1. Clone this repo
2. Open the folder in VS Code
3. Install the Live Server extension and right-click `index.html` → "Open with Live Server"

> Note: opening `index.html` directly via `file://` won't work — `fetch` requires a local server.
