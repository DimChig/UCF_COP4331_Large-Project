const { z } = require("zod");
const mongoose = require("mongoose");

// Checking if userID is a valid 24-hex string
const userIdSchema = z
  .string()
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid user ID",
  });

module.exports = {
  userIdSchema,
};
