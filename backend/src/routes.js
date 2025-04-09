const express = require("express");
const router = express.Router();
const { jwtMiddleware } = require("./middleware/authMiddleware");
const authController = require("./controllers/authController");
const cardController = require("./controllers/cardController");
const movieController = require("./controllers/movieController");
const commentsController = require("./controllers/commentsController");

// POST /api/register
router.post("/api/register", authController.register);

// POST /api/login
router.post("/api/login", authController.login);

// POST /api/cards
router.post("/api/cards", jwtMiddleware, cardController.createCard);

// POST /api/searchcards
router.get("/api/searchcards", jwtMiddleware, cardController.searchCards);

// POST /api/comments
router.post(
  "/api/movies/:movieId/comments",
  jwtMiddleware,
  commentsController.postComment
);

// Delete /api/comments
router.delete(
  "/api/movies/:movieId/comments/:commentId",
  jwtMiddleware,
  commentsController.deleteComment
);

// GET /api/movies/popular
router.get("/api/movies/popular", movieController.getPopular);

// GET /api/movies/now-playing
router.get("/api/movies/now-playing", movieController.getNowPlaying);

// GET /api/movies/top-rated
router.get("/api/movies/top-rated", movieController.getTopRated);

// GET /api/movies/upcoming
router.get("/api/movies/upcoming", movieController.getUpcoming);

// GET /api/movies/searchMovies
router.get("/api/movies/searchmovies", movieController.searchMovies);

// GET /api/movies/:id
router.get("/api/movies/:movieId", movieController.getMovieById);

module.exports = router;
