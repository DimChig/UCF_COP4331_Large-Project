const Card = require("../models/Card");
const User = require("../models/User");
const {
  createCardSchema,
  getCardsSchema,
} = require("../validations/cardValidation");

// Create card
exports.createCard = async (req, res) => {
  try {
    // Getting from request payload
    const inputData = req.body;

    // Validate the body with the Zod schema
    const validation = createCardSchema.safeParse(inputData);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }
    const data = validation.data;

    // Check if user exists
    const user = req.user; // Getting user from middleware
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    // Create card
    const newCard = await Card.create({
      name: data.name,
      userId: user._id,
    });

    // Preprocess cards (reassign fields)
    const ret = {
      id: newCard._id,
      name: newCard.name,
    };

    // Return
    return res.status(201).json(ret);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

// Search cards
exports.searchCards = async (req, res) => {
  try {
    // Getting from req.query instead (for get requests)
    const inputData = req.query;

    // Validate the body with the Zod schema
    const validation = getCardsSchema.safeParse(inputData);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }
    const data = validation.data;

    // Check if user exists
    const user = req.user; // Getting user from middleware
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    // Build query
    const query = { userId: user._id };
    if (data.search) {
      query.name = { $regex: data.search, $options: "i" };
    }
    // Get cards
    const cards = await Card.find(query);

    // Preprocess cards (reassign fields)
    const ret = cards.map((card) => ({
      id: card._id,
      name: card.name,
    }));

    // Return
    return res.status(200).json({ results: ret });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
