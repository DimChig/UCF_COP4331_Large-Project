const Card = require("../models/Card");
const User = require("../models/User");
const {
  createCardSchema,
  getCardsSchema,
} = require("../validations/cardValidation");

// Create card
exports.createCard = async (req, res) => {
  try {
    const validation = createCardSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }
    const data = validation.data;

    // Check user
    const user = await User.findById(data.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    // Create card
    const newCard = await Card.create({
      name: data.name,
      userId: data.userId,
    });

    return res.status(201).json(newCard);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

// Search cards
exports.searchCards = async (req, res) => {
  try {
    const validation = getCardsSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }
    const data = validation.data;

    const user = await User.findById(data.userId);
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }

    const query = { userId: data.userId };
    if (data.search) {
      query.name = { $regex: data.search, $options: "i" };
    }

    const cards = await Card.find(query);
    const ret = cards.map((card) => ({
      id: card._id,
      name: card.name,
    }));

    return res.status(200).json({ results: ret });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
