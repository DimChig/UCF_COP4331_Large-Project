const { z } = require("zod");
const { userIdSchema } = require("./userIdValidation");

const createCardSchema = z.object({
  name: z.string().min(1).max(100),
  userId: userIdSchema,
});

const getCardsSchema = z.object({
  search: z.string().optional(),
  userId: userIdSchema,
});

module.exports = {
  createCardSchema,
  getCardsSchema,
};
