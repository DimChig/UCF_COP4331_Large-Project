const {
  searchMoviesSchema,
  getMoviesSchema,
} = require("../validations/movieValidation");
const Movie = require("../models/Movie");
const getMovieDBClient = require("../config/tmdb");

// Get moviedb client
const moviedb = getMovieDBClient();

// Utility function to handle movie requests
const handleMovieRequest = async (req, res, apiCall) => {
  try {
    // Extract default values from query parameters
    const { page: pageParam = 1, limit: limitParam = 20 } = req.query;

    // Validate using Zod. Note that the inputs come in as strings.
    const validationResult = getMoviesSchema.safeParse({
      page: pageParam,
      limit: limitParam,
    });

    if (!validationResult.success) {
      return res.status(400).json(validationResult.error.errors);
    }
    const { page, limit } = validationResult.data;

    // Call the provided API call function with validated page number.
    const response = await apiCall(page);

    // Slice the results according to validated limit
    const results = response.results.slice(0, limit);

    return res.status(200).json({
      page: response.page,
      results,
      total_pages: response.total_pages,
      total_results: response.total_results,
    });
  } catch (err) {
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
};

// get Popular
exports.getPopular = async (req, res) => {
  await handleMovieRequest(req, res, (page) => {
    return moviedb.moviePopular({ page });
  });
};

// get Now Playing
exports.getNowPlaying = async (req, res) => {
  await handleMovieRequest(req, res, (page) => {
    return moviedb.movieNowPlaying({ page });
  });
};

// get Top Rated
exports.getTopRated = async (req, res) => {
  await handleMovieRequest(req, res, (page) => {
    return moviedb.movieTopRated({ page });
  });
};

// get Upcoming
exports.getUpcoming = async (req, res) => {
  await handleMovieRequest(req, res, (page) => {
    return moviedb.upcomingMovies({ page });
  });
};

// Search movie by name (could be modified to include more search terms)
exports.searchMovies = async (req, res) => {
  try {
    // Getting from request payload
    const inputData = req.body;

    const validation = searchMoviesSchema.safeParse(inputData);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }

    const { query, page = 1, limit = 15 } = validation.data;

    const response = await moviedb.searchMovie({ query, page });

    // Limit the results if needed
    const results = response.results.slice(0, limit);

    return res.status(200).json({
      page: response.page,
      results,
      total_pages: response.total_pages,
      total_results: response.total_results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

// Get movie details
exports.getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Movie ID is required" });
    }

    const movie = await moviedb.movieInfo({ id });

    return res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(500).json({ error: "Server Error" });
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
