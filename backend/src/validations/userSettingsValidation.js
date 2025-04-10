const { z } = require("zod");
const mongoose = require("mongoose");

// Checking if rating is a value in between 0 and 10
exports.ratingSchema = z.object({
  rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(10, "Rating must be at most 10"),
});
