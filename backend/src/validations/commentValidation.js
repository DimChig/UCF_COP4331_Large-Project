const { z } = require("zod");

const commentSchema = z.object({
  text: z
    .string()
    .min(1, "Comment text is required")
    .max(1000, "Comment text is too long"),
});

module.exports = {
  commentSchema,
};
