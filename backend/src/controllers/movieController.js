const { MovieDb } = require("moviedb-promise");
const {
    searchMoviesSchema,
    getMoviesPathSchema
} = require("../validations/movieValidation");
const Movie = require("../models/Movie");

const moviedb = new MovieDb(process.env.API_KEY);

// get Popular
exports.getPopular = async (req, res) => {
    try {
        // Default values if params are undefined
        const pageParam = req.params.page === undefined ? 1 : req.params.page;
        const limitParam = req.params.limit === undefined ? 20 : req.params.limit;

        // Convert to numbers and validate
        const validation = getMoviesPathSchema.safeParse({
            page: Number(pageParam),
            limit: Number(limitParam)
        });

        if (!validation.success) {
            return res.status(400).json(validation.error.errors);
        }

        const validatedData = validation.data;

        const response = await moviedb.moviePopular({ page: validatedData.page });

        // Limit the results if needed
        const results = response.results.slice(0, validatedData.limit);

        return res.status(200).json({
            page: response.page,
            results,
            total_pages: response.total_pages,
            total_results: response.total_results
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};

// get Now Playing
exports.getNowPlaying = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.params;

        // Convert to numbers and validate
        const validation = getMoviesPathSchema.safeParse({
            page: Number(page),
            limit: Number(limit)
        });

        if (!validation.success) {
            return res.status(400).json(validation.error.errors);
        }

        const validatedData = validation.data;

        const response = await moviedb.movieNowPlaying({ page: validatedData.page });

        // Limit the results if needed
        const results = response.results.slice(0, validatedData.limit);

        return res.status(200).json({
            page: response.page,
            results,
            total_pages: response.total_pages,
            total_results: response.total_results
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};

// get Top Rated
exports.getTopRated = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.params;

        // Convert to numbers and validate
        const validation = getMoviesPathSchema.safeParse({
            page: Number(page),
            limit: Number(limit)
        });

        if (!validation.success) {
            return res.status(400).json(validation.error.errors);
        }

        const validatedData = validation.data;

        const response = await moviedb.movieTopRated({ page: validatedData.page });

        // Limit the results if needed
        const results = response.results.slice(0, validatedData.limit);

        return res.status(200).json({
            page: response.page,
            results,
            total_pages: response.total_pages,
            total_results: response.total_results
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
};

// get Upcoming
exports.getUpcoming = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.params;

        // Convert to numbers and validate
        const validation = getMoviesPathSchema.safeParse({
            page: Number(page),
            limit: Number(limit)
        });

        if (!validation.success) {
            return res.status(400).json(validation.error.errors);
        }

        const validatedData = validation.data;

        const response = await moviedb.upcomingMovies({ page: validatedData.page });

        // Limit the results if needed
        const results = response.results.slice(0, validatedData.limit);

        return res.status(200).json({
            page: response.page,
            results,
            total_pages: response.total_pages,
            total_results: response.total_results
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
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

        const {
            query,
            page = 1,
            limit = 15
        } = validation.data;

        const response = await moviedb.searchMovie({ query, page });

        // Limit the results if needed
        const results = response.results.slice(0, limit);

        return res.status(200).json({
            page: response.page,
            results,
            total_pages: response.total_pages,
            total_results: response.total_results
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