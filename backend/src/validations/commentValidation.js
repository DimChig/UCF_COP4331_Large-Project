const { z } = require("zod");
const movieIdSchema = require("./movieValidation").movieIdSchema;

const commentsSchema = movieIdSchema.extend({
  text: z
    .string()
    .min(1, "Comment text is required")
    .max(500, "Comment text is too long"),
});
module.exports = {
  commentsSchema,
};
