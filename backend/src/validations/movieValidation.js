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

const sortByOptions = [
  // "first_air_date.asc",
  // "first_air_date.desc",
  // "name.asc",
  // "name.desc",
  // "original_name.asc",
  // "original_name.desc",
  // "popularity.asc",
  "popularity.desc",
  // "vote_average.asc",
  "vote_average.desc",
  // "vote_count.asc",
  "vote_count.desc",
  // "release_date.asc",
  "release_date.desc",
  // "title.asc",
  // "title.desc",
  "revenue.desc",
];

const searchMoviesFiterSchema = z.object({
  genres: z.string().optional(),
  sortBy: z.enum(sortByOptions).optional(),
});

module.exports = {
  baseMoviesSchema,
  searchMoviesSchema,
  movieIdSchema,
  searchMoviesFilterSchema,
};
