const { z } = require("zod");

const createCardSchema = z.object({
  name: z.string().min(1).max(100),
});

const getCardsSchema = z.object({
  search: z.string().optional(),
});

module.exports = {
  createCardSchema,
  getCardsSchema,
};
