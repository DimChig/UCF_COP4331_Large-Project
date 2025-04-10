const UserSettings = require("../models/UserSettings");
const {
  ratingSchema,
  updateSettingsSchema,
} = require("../validations/userSettingsValidation");

const updateSetting = async (req, res, update) => {
  try {
    // Get user ID from JWT middleware
    if (!req.user)
      return res.status(404).json({
        error: "User not found",
      });

    const userId = req.user._id;
    const movieId = req.params.movieId;

    const validation = updateSettingsSchema.safeParse({
      userId: String(userId),
      movieId: parseInt(movieId),
    });
    if (!validation.success) {
      return res
        .status(400)
        .json({ message: "Invalid rating", errors: validation.error.errors });
    }
    const validationData = validation.data;

    const updated = await UserSettings.findOneAndUpdate(
      { userId: validationData.userId, movieId: validationData.movieId },
      { $set: update },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: "User settings updated successfully",
      settings: updated,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Endpoints

// Like movie
exports.likeMovie = (req, res) => updateSetting(req, res, { isLiked: true });
exports.unlikeMovie = (req, res) => updateSetting(req, res, { isLiked: false });

// Save movie
exports.saveMovie = (req, res) => updateSetting(req, res, { isSaved: true });
exports.unsaveMovie = (req, res) => updateSetting(req, res, { isSaved: false });

// Rate movie
exports.rateMovie = async (req, res) => {
  const validation = ratingSchema.safeParse(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json({ message: "Invalid rating", errors: validation.error.errors });
  }

  return updateSetting(req, res, { rating: validation.data.rating });
};

// Unrate Movie
exports.unrateMovie = (req, res) => updateSetting(req, res, { rating: null });
