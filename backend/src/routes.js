const express = require("express");
const router = express.Router();
const { jwtMiddleware } = require("./middleware/authMiddleware");
const authController = require("./controllers/authController");
const cardController = require("./controllers/cardController");
const movieController = require("./controllers/movieController");

// POST /api/register
router.post("/api/register", authController.register);

// POST /api/login
router.post("/api/login", authController.login);

// POST /api/cards
router.post("/api/cards", jwtMiddleware, cardController.createCard);

// POST /api/searchcards
router.get("/api/searchcards", jwtMiddleware, cardController.searchCards);

// GET /api/movies/popular
router.get("/api/movies/popular", movieController.getPopular);
router.get("/api/movies/popular/:page", movieController.getPopular);
router.get("/api/movies/popular/:page/:limit", movieController.getPopular);

// GET /api/movies/now-playing
router.get("/api/movies/now-playing", movieController.getNowPlaying)
router.get("/api/movies/now-playing/:page", movieController.getNowPlaying)
router.get("/api/movies/now-playing/:page/:limit", movieController.getNowPlaying)

// GET /api/movies/top-rated
router.get("/api/movies/top-rated", movieController.getTopRated)
router.get("/api/movies/top-rated/:page", movieController.getTopRated)
router.get("/api/movies/top-rated/:page/:limit", movieController.getTopRated)

// GET /api/movies/upcoming
router.get("/api/movies/upcoming", movieController.getUpcoming);
router.get("/api/movies/upcoming/:page", movieController.getUpcoming);
router.get("/api/movies/upcoming/:page/:limit", movieController.getUpcoming);

// GET /api/movies/searchMovies
router.get("/api/movies/searchmovies", movieController.searchMovies);

// GET /api/movies/:id
router.get("/api/movies/:id", movieController.getMovieById);

module.exports = router;
