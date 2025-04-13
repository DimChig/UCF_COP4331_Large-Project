const {
  baseMoviesSchema,
  searchMoviesSchema,
  movieIdSchema,
  searchMoviesFilterSchema,
} = require("../validations/movieValidation");
const getMovieDBClient = require("../config/tmdb");

// Get moviedb client
const moviedb = getMovieDBClient();

// Utility function to handle movie requests
const handleMovieRequest = async (req, res, apiCall, extraSchema = null) => {
  try {
    // Use default values (provided as fallback during destructuring)
    const { page: pageParam = 1, limit: limitParam = 20 } = req.query;

    // Validate the common parameters
    const baseValidation = baseMoviesSchema.safeParse({
      page: pageParam,
      limit: limitParam,
    });

    if (!baseValidation.success) {
      return res.status(400).json(baseValidation.error.errors);
    }
    let validatedData = baseValidation.data;

    // If an extra schema is provided, validate additional query parameters.
    if (extraSchema) {
      const extraValidation = extraSchema.safeParse(req.query);
      if (!extraValidation.success) {
        return res.status(400).json(extraValidation.error.errors);
      }
      // Merge extra validated properties in
      validatedData = { ...validatedData, ...extraValidation.data };
    }

    // Call the provided API function with the validated parameters.
    const response = await apiCall(validatedData);

    const movies = response.results.filter(
      (movie) =>
        movie.id != null &&
        movie.title != null &&
        movie.overview != null &&
        movie.popularity != null &&
        movie.poster_path != null &&
        movie.release_date != null &&
        movie.vote_average != null &&
        movie.vote_count != null
    );

    // Limit results to the validated limit.
    const results = movies.slice(0, validatedData.limit);

    // Generate return json
    return res.status(200).json({
      results,
      total_pages: response.total_pages,
      total_results: response.total_results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
};

const getCurrentDateFormatted = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// get with filters and sorting
exports.getMovies = async (req, res) => {
  await handleMovieRequest(
    req,
    res,
    (data) => {
      return moviedb.discoverMovie({
        page: data.page,
        include_adult: false,
        include_video: false,
        language: "en",
        with_genres: data.genres,
        without_genres: "99,10755",
        sort_by: data.sortBy,
        "vote_count.gte": 200,
        "primary_release_date.lte": getCurrentDateFormatted(),
      });
    },
    searchMoviesFilterSchema
  );
};

// get Popular
exports.getPopular = async (req, res) => {
  await handleMovieRequest(req, res, (data) => {
    return moviedb.moviePopular({ page: data.page });
  });
};

// get Now Playing
exports.getNowPlaying = async (req, res) => {
  await handleMovieRequest(req, res, (data) => {
    return moviedb.movieNowPlaying({ page: data.page });
  });
};

// get Top Rated
exports.getTopRated = async (req, res) => {
  await handleMovieRequest(req, res, (data) => {
    return moviedb.discoverMovie({
      page: data.page,
      language: "en-US",
      include_adult: false,
      include_video: false,
      without_genres: "99,10755",
      sort_by: "vote_average.desc",
      "vote_count.gte": 25000,
      "primary_release_date.gte": "2000-01-01",
    });
  });
};

// get Upcoming
exports.getUpcoming = async (req, res) => {
  await handleMovieRequest(req, res, (data) => {
    return moviedb.discoverMovie({
      page: data.page,
      language: "en-US",
      include_adult: false,
      include_video: false,
      without_genres: "99,10755",
      sort_by: "popularity.desc",
      "primary_release_date.gte": getCurrentDateFormatted(),
    });
  });
};

// Search movie by name
exports.searchMovies = async (req, res) => {
  await handleMovieRequest(
    req,
    res,
    (data) => {
      return moviedb.searchMovie({ page: data.page, query: data.query });
    },
    searchMoviesSchema
  );
};

// Get movie details
exports.getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Validate ID
    const validation = movieIdSchema.safeParse({ movieId: Number(movieId) });
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }
    const validationData = validation.data;

    const movie = await moviedb.movieInfo({ id: validationData.movieId });

    return res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
};
