// backend/src/models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        tmdbId: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        posterPath: {
            type: String,
            trim: true,
        },
        releaseDate: {
            type: Date,
        },
        voteAverage: {
            type: Number,
        },
        voteCount: {
            type: Number,
        },
        popularity: {
            type: Number,
        },
        genres: [{
            id: Number,
            name: String
        }]
    },
    { timestamps: true }
);


module.exports = mongoose.model("Movie", movieSchema);