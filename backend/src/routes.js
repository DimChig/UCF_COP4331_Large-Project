const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");
const cardController = require("./controllers/cardController");

// POST /api/register
router.post("/api/register", authController.register);

// POST /api/login
router.post("/api/login", authController.login);

// POST /api/cards
router.post("/api/cards", cardController.createCard);

// POST /api/searchcards
router.post("/api/searchcards", cardController.searchCards);

module.exports = router;
