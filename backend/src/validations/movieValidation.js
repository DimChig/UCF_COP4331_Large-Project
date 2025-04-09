const { z } = require("zod");

const baseMoviesSchema = z.object({
  page: z.preprocess((val) => Number(val), z.number().positive().default(1)),
  limit: z.preprocess(
    (val) => Number(val),
    z.number().min(1).max(30).default(20)
  ),
});

const searchMoviesSchema = z.object({
  query: z.string().min(1, "Search query is required").optional(),
});

const movieIdSchema = z.object({
  movieId: z.number().positive("Movie ID must be a positive number"),
});

module.exports = {
  baseMoviesSchema,
  searchMoviesSchema,
  movieIdSchema,
};
