const express = require("express");
const router = express.Router();
const { jwtMiddleware } = require("./middleware/authMiddleware");
const authController = require("./controllers/authController");
const cardController = require("./controllers/cardController");

// POST /api/register
router.post("/api/register", authController.register);

// POST /api/login
router.post("/api/login", authController.login);

// POST /api/cards
router.post("/api/cards", jwtMiddleware, cardController.createCard);

// POST /api/searchcards
router.get("/api/cards", jwtMiddleware, cardController.searchCards);

module.exports = router;
