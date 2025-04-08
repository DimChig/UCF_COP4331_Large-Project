require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const connectMovieDb = require("./config/tmdb")

// Initialize express
const app = express();

// Database connection
connectDB();
connectMovieDb();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const routes = require("./routes.js");
app.use(routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
