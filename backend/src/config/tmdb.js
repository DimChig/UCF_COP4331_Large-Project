const { MovieDb } = require("moviedb-promise");

const getMovieDBClient = () => {
  return new MovieDb(process.env.TMDB_API_KEY);
};

module.exports = getMovieDBClient;
