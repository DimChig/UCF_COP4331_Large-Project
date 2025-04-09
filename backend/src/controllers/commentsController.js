const { text } = require("express");
const Comments = require("../models/Comments");
const Comment = require("../models/Comments");
const { commentSchema } = require("../validations/commentValidation");
const { movieIdSchema } = require("../validations/movieValidation");
const { objectIdSchema } = require("../validations/objectIdValidation");

/**
 * POST /api/movies/{movieId}/comments
 * Creates a new comment for the specified movie by the authenticated user.
 * Expects a payload with a "text" field. Returns the created comment and a success message.
 */
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
      .json({ message: "Comment posted", comment: newComment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

/**
 * DELETE /api/movies/{movieId}/comments/{commentId}
 * Deletes a comment for the specified movie if it belongs to the authenticated user.
 * Returns a success message if the comment is deleted.
 */
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

// Search cards
/**
 * GET /api/movies/{movieId}/comments
 * Returns comments for a given movie. Each comment contains:
 * - text: string
 * - createdAt: timestamp
 * - author: { firstName, lastName }
 * - isMine: boolean (true if the comment belongs to the authenticated user)
 *
 * Response JSON format:
 * {
 *   "results": [
 *     {
 *       "text": "This is a comment",
 *       "createdAt": "2025-04-09T19:28:32.753Z",
 *       "author": { "firstName": "Dmytro", "lastName": "Chygarov" },
 *       "isMine": true
 *     },
 *     ...
 *   ]
 * }
 */
exports.getComments = async (req, res) => {
  try {
    // Validate Movie ID
    const validationMovieId = movieIdSchema.safeParse({
      movieId: Number(req.params.movieId),
    });
    if (!validationMovieId.success) {
      return res.status(400).json(validationMovieId.error.errors);
    }
    const { movieId } = validationMovieId.data;

    // Get comments
    const comments = await Comment.find({ movieId: movieId }).populate(
      "userId",
      "firstName lastName"
    );

    // Preprocess cards (reassign fields)
    const ret = comments.map((comment) => ({
      id: comments._id,
      text: comment.text,
      createdAt: comment.createdAt,
      author: {
        firstName: comment.userId.firstName,
        lastName: comment.userId.lastName,
      },
      isMine: comment.userId._id.toString() === req.user._id.toString(),
    }));

    // Sort: First by isMine (mine first) and then by createdAt (most recent first)
    ret.sort((a, b) => {
      if (a.isMine === b.isMine) {
        // Both are mine or not mine, sort by createdAt descending (most recent at top)
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return a.isMine ? -1 : 1;
    });

    // Return
    return res.status(200).json({ results: ret });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
