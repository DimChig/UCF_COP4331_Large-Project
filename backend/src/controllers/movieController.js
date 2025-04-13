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

const getCastInfo = async (movieId, limit) => {
  const credits = await moviedb.movieCredits({ id: movieId });
  if (!credits || !credits.cast) return undefined;

  const cast = credits.cast
    .filter((member) => member.known_for_department === "Acting")
    .filter((member) => !!member.character)
    .filter(
      (member, index, self) =>
        self.findIndex((t) => t.id === member.id) === index
    )
    .slice(0, limit);
  return cast.map((member) => {
    return {
      id: member.id,
      name: member.name,
      profile_path: member.profile_path,
      character: member.character,
      popularity: member.popularity,
    };
  });
};

const getCrewInfo = async (movieId, limit) => {
  const credits = await moviedb.movieCredits({ id: movieId });
  if (!credits || !credits.crew) return undefined;

  const crew = credits.crew
    .sort((a, b) => b.popularity - a.popularity)
    .filter((member) => member.known_for_department !== "Acting")
    .filter(
      (member, index, self) =>
        self.findIndex((t) => t.id === member.id) === index
    )
    .slice(0, limit);

  return crew.map((member) => {
    return {
      id: member.id,
      name: member.name,
      department: member.department,
      job: member.job,
      profile_path: member.profile_path,
    };
  });
};

const getImagesInfo = async (movieId, limit) => {
  const images = await moviedb.movieImages({ id: movieId });
  if (!images || !images.backdrops) return undefined;

  const backdrops = images.backdrops
    .sort((a, b) => b.vote_average - a.vote_average)
    .filter((limit) => !!limit.file_path)
    .slice(0, limit);
  return backdrops.map((image) => {
    return {
      file_path: image.file_path,
    };
  });
};

const getSimilarMovies = async (movieId, limit) => {
  const similar = await moviedb.movieSimilar({ id: movieId });
  if (!similar || !similar.results) return undefined;

  // sort by vote_count > 200 first
  // then sort by popularity
  const sortedResults = similar.results.sort((a, b) => {
    // First prioritize movies with vote_count > 200
    const aHasEnoughVotes = a.vote_count > 200;
    const bHasEnoughVotes = b.vote_count > 200;

    if (aHasEnoughVotes && !bHasEnoughVotes) return -1;
    if (!aHasEnoughVotes && bHasEnoughVotes) return 1;

    // Then sort by popularity
    return b.popularity - a.popularity;
  });

  return sortedResults.slice(0, limit);
};

// Get movie details
exports.getMovieById = async (req, res) => {
  try {
    // Validate ID
    const validation = movieIdSchema.safeParse({
      movieId: Number(req.params.movieId),
    });
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }
    const movieId = validation.data.movieId;

    const movieData = await moviedb.movieInfo({ id: movieId });
    if (!movieData)
      return res.status(500).json({ error: "Movie was not found" });

    const crew = await getCrewInfo(movieId, 6);

    const cast = await getCastInfo(movieId, 12);

    const images = await getImagesInfo(movieId, 5);

    const similar = await getSimilarMovies(movieId, 8);

    return res.status(200).json({
      movie_data: movieData,
      crew: crew,
      cast: cast,
      images: images,
      similar: similar,
    });
  } catch (err) {
    console.error(err);
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: "Movie not found" });
    }
    return res.status(500).json({ error: `Server Error: ${err}` });
  }
};
