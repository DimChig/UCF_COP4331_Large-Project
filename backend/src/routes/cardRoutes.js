const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

// POST /api/cards
router.post("/", cardController.createCard);

// POST /api/searchcards
router.post("/searchcards", cardController.searchCards);

module.exports = router;
