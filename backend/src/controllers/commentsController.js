const Comment = require("../models/Comments");

exports.postComments = async (req, res) => {
  try {
    const { movieID, text } = req.body;

    // Check movieID and text
    if (!movieID || !text) {
      return res.status(400).json({ message: "movieID and text are required" });
    }

    const newComment = new Comment({
      userID: req.user._id, // auto-filled by JWT middleware
      movieID: req.body.movieID,
      text: req.body.text,
    });

    await newComment.save();

    return res
      .status(201)
      .json({ message: "Comment posted!", comment: newComment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
