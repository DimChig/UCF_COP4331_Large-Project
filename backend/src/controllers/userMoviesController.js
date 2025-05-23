const UserSettings = require("../models/UserSettings");
const getMovieDBClient = require("../config/tmdb");

// Get moviedb client
const moviedb = getMovieDBClient();

// Get user's movies based on filter (liked or saved)
const getUserMovies = async (req, res, filter) => {
  try {
    // Get user ID from JWT middleware
    if (!req.user)
      return res.status(404).json({
        error: "User not found",
      });

    const userId = req.user._id;

    // Define the query based on the filter
    const query = { userId: userId };

    // Add filter condition
    if (filter === "liked") {
      query.isLiked = true;
    } else if (filter === "saved") {
      query.isSaved = true;
    } else {
      return res.status(400).json({ error: "Invalid filter type" });
    }

    // Get all user settings matching the query (userId, liked/saved)
    const userSettings = await UserSettings.find(query).sort({ updatedAt: -1 });

    // If no settings found for user, return empty array
    if (userSettings.length === 0) {
      return res.status(200).json({ results: [] });
    }

    // Fetch movie details for each movie ID
    const moviePromises = userSettings.map(async (setting) => {
      try {
        // Fetch movie details from TMDB API
        const movieDetails = await moviedb.movieInfo({ id: setting.movieId });

        // Add user-specific fields to the movie object
        return {
          movie_data: movieDetails,
          isLiked: setting.isLiked || false,
          isSaved: setting.isSaved || false,
        };
      } catch (error) {
        console.error(
          `Error fetching movie id=${setting.movieId}: Status`,
          error.status
        );
        // Return null for failed requests
        return null;
      }
    });

    // Wait for all movie fetch operations to complete
    const movies = await Promise.all(moviePromises);

    // Filter out failed requests
    const validMovies = movies.filter((movie) => movie !== null);

    return res.status(200).json({
      results: validMovies,
      total_results: validMovies.length,
    });
  } catch (err) {
    console.error("Error getting user movies:", err);
    return res.status(500).json({ error: "Server Error" });
  }
};

// Returns all liked movies from specified user
exports.getLikedMovies = async (req, res) => {
  return getUserMovies(req, res, "liked");
};

// Returns all saved movies from specified user
exports.getSavedMovies = async (req, res) => {
  return getUserMovies(req, res, "saved");
};

exports.getMoviesRaw = async (req, res) => {
  try {
    // Get user ID from JWT middleware
    if (!req.user)
      return res.status(404).json({
        error: "User not found",
      });

    const userId = req.user._id;

    // Get all user settings matching the query (userId, liked/saved)
    const userSettings = await UserSettings.find({ userId: userId }).select(
      "movieId isLiked isSaved rating"
    );

    return res.status(200).json(userSettings);
  } catch (err) {
    console.error("Error getting user movies:", err);
    return res.status(500).json({ error: "Server Error" });
  }
};
