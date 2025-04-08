// backend/src/config/tmdb.js
const { MovieDb } = require('moviedb-promise');

// Initialize the MovieDB client with your API key
const connnectMovieDb = async () => {
  try {
    const moviedb = new MovieDb(process.env.TMDB_API_KEY);
    console.log("Connected to TMDb!");
  } catch (err) {
    console.error("Could not connect to TMDb...", err);
    process.exit(1);
  }
};

module.exports = connnectMovieDb;