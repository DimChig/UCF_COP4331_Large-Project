const Comment = require("../models/Comments");
const { commentSchema } = require("../validations/commentValidation");
const { movieIdSchema } = require("../validations/movieValidation");
const { objectIdSchema } = require("../validations/objectIdValidation");

exports.postComment = async (req, res) => {
  try {
    // Validate Movie ID
    const validationMovieId = movieIdSchema.safeParse({
      movieId: Number(req.params.movieId),
    });
    if (!validationMovieId.success) {
      return res.status(400).json(validationMovieId.error.errors);
    }
    const { movieId } = validationMovieId.data;

    // Getting comment args from request payload
    const inputData = req.body;

    // Validate the body with the Zod schema
    const validationComment = commentSchema.safeParse(inputData);
    if (!validationComment.success) {
      return res.status(400).json(validationComment.error.errors);
    }
    const { text } = validationComment.data;

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

exports.deleteComment = async (req, res) => {
  try {
    // Validate Movie ID
    const validationMovieId = movieIdSchema.safeParse({
      movieId: Number(req.params.movieId),
    });
    if (!validationMovieId.success) {
      return res.status(400).json(validationMovieId.error.errors);
    }
    const { movieId } = validationMovieId.data;

    // Validate Comment ID
    const validationCommentId = objectIdSchema.safeParse({
      id: req.params.commentId,
    });
    if (!validationCommentId.success) {
      return res.status(400).json(validationCommentId.error.errors);
    }
    const { id: commentId } = validationCommentId.data;

    // Delete comment from DB
    const deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
      movieId: movieId,
      userId: req.user._id,
    });

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Return
    return res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
