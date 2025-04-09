const Comment = require("../models/Comments");
const { commentsSchema } = require("../validations/commentValidation");

exports.postComments = async (req, res) => {
  try {
    // Getting from request payload
    const inputData = req.body;

    // Validate the body with the Zod schema
    const validation = commentsSchema.safeParse(inputData);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }
    const { movieId, text } = validation.data;

    // Create comment
    const newComment = await Comment.create({
      userId: req.user._id, // auto-filled by JWT middleware
      movieId: movieId,
      text: text,
    });

    // Return
    return res
      .status(201)
      .json({ message: "Comment posted!", comment: newComment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
