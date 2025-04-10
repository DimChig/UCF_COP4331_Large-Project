const UserSettings = require("../models/UserSettings");
const { ratingSchema } = require("../validations/userSettingsValidation");

const updateSetting = async (req, res, update) => {
  try {
    const userID = req.user_id;
    const movieID = req.params.movieId;

    const updated = await UserSettings.findOneAndUpdate(
      { userID, movieID },
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
