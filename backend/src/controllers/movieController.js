const {
  baseMoviesSchema,
  searchMoviesSchema,
  movieIdSchema,
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
        console.log("asd");
        return res.status(400).json(extraValidation.error.errors);
      }
      // Merge extra validated properties in
      validatedData = { ...validatedData, ...extraValidation.data };
    }

    console.log(validatedData);
    // Call the provided API function with the validated parameters.
    const response = await apiCall(validatedData);

    // Limit results to the validated limit.
    const results = response.results.slice(0, validatedData.limit);

    // Generate return json
    return res.status(200).json({
      page: response.page,
      results,
      total_pages: response.total_pages,
      total_results: response.total_results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
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
    return moviedb.movieTopRated({ page: data.page });
  });
};

// get Upcoming
exports.getUpcoming = async (req, res) => {
  await handleMovieRequest(req, res, (data) => {
    return moviedb.upcomingMovies({ page: data.page });
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

// exports.createMovieCard = async (req, res) => {
//     try {
//         const response = await fetch(url);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Server Error" })
//     }
// }
