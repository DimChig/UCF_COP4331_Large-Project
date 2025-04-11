const express = require("express");
const router = express.Router();
const { jwtMiddleware } = require("./middleware/authMiddleware");
const authController = require("./controllers/authController");
const cardController = require("./controllers/cardController");
const movieController = require("./controllers/movieController");
const commentsController = require("./controllers/commentsController");
const userSettingsController = require("./controllers/userSettingsController");
const userMoviesController = require("./controllers/userMoviesController");

// POST /api/register
router.post("/api/register", authController.register);

// POST /api/login
router.post("/api/login", authController.login);

// POST /api/cards
router.post("/api/cards", jwtMiddleware, cardController.createCard);

// POST /api/searchcards
router.get("/api/searchcards", jwtMiddleware, cardController.searchCards);

//POST & DELETE like movie
router.post(
  "/api/movies/:movieId/like",
  jwtMiddleware,
  userSettingsController.likeMovie
);
router.delete(
  "/api/movies/:movieId/like",
  jwtMiddleware,
  userSettingsController.unlikeMovie
);

// POST & DELETE save movie
router.post(
  "/api/movies/:movieId/save",
  jwtMiddleware,
  userSettingsController.saveMovie
);
router.delete(
  "/api/movies/:movieId/save",
  jwtMiddleware,
  userSettingsController.unsaveMovie
);

// POST & DELETE rate movie
router.post(
  "/api/movies/:movieId/rating",
  jwtMiddleware,
  userSettingsController.rateMovie
);
router.delete(
  "/api/movies/:movieId/rating",
  jwtMiddleware,
  userSettingsController.unrateMovie
);

// GET liked and saved movies
router.get(
  "/api/movies/liked",
  jwtMiddleware,
  userMoviesController.getLikedMovies
);
router.get(
  "/api/movies/saved",
  jwtMiddleware,
  userMoviesController.getSavedMovies
);
router.get("/api/movies/raw", jwtMiddleware, userMoviesController.getMoviesRaw);

// POST comment
router.post(
  "/api/movies/:movieId/comments",
  jwtMiddleware,
  commentsController.postComment
);

// Delete comment
router.delete(
  "/api/movies/:movieId/comments/:commentId",
  jwtMiddleware,
  commentsController.deleteComment
);

// Get comments
router.get(
  "/api/movies/:movieId/comments",
  jwtMiddleware,
  commentsController.getComments
);

// GET /api/movie
router.get("/api/movies", movieController.getMovies);

// GET /api/movies/popular
router.get("/api/movies/popular", movieController.getPopular);

// GET /api/movies/now-playing
router.get("/api/movies/now-playing", movieController.getNowPlaying);

// GET /api/movies/top-rated
router.get("/api/movies/top-rated", movieController.getTopRated);

// GET /api/movies/upcoming
router.get("/api/movies/upcoming", movieController.getUpcoming);

// GET /api/movies/searchMovies
router.get("/api/movies/search", movieController.searchMovies);

// GET /api/movies/:id
router.get("/api/movies/:movieId", movieController.getMovieById);

module.exports = router;
