const { z } = require("zod");
const mongoose = require("mongoose");

// Checking if userId is a valid 24-hex string
const objectIdSchema = z.object({
  id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid ID",
  }),
});

module.exports = {
  objectIdSchema,
};
