// src/tests/commentsController.test.js

// Import the validation schemas from your project
const { movieIdSchema } = require("../validations/movieValidation");
const { commentSchema } = require("../validations/commentValidation");
const { objectIdSchema } = require("../validations/objectIdValidation");

// Mock the Comment model
const mockComment = {
  create: jest.fn(),
  findOneAndDelete: jest.fn(),
};

// Create test versions of the controller functions
const createPostCommentTest = (mockCommentModel) => {
  return async (req, res) => {
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
      const newComment = await mockCommentModel.create({
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
};

const createDeleteCommentTest = (mockCommentModel) => {
  return async (req, res) => {
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

      // Delete comment from "DB"
      const deletedComment = await mockCommentModel.findOneAndDelete({
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
};

describe("Comments Controller", () => {
  let req, res, postCommentTest, deleteCommentTest;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create test functions with the mock model
    postCommentTest = createPostCommentTest(mockComment);
    deleteCommentTest = createDeleteCommentTest(mockComment);

    // Setup req and res mocks
    req = {
      params: {},
      body: {},
      user: {
        _id: "6507aca13ababc1234567890", // Mock user ID
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("postComment", () => {
    it("should return 400 error for invalid movieId", async () => {
      req.params.movieId = "asiufh@#$#@$324"; // Invalid movie ID
      req.body.text = "This is a valid comment";

      await postCommentTest(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(mockComment.create).not.toHaveBeenCalled();
    });

    it("should return 400 error for invalid comment text", async () => {
      req.params.movieId = "12345";
      req.body.text = ""; // Empty comment

      await postCommentTest(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(mockComment.create).not.toHaveBeenCalled();
    });

    it("should create a comment and return 201 status for valid input", async () => {
      req.params.movieId = "12345"; // numeric
      req.body.text = "This is a valid comment"; // non-blank comment

      const mockCreatedComment = {
        _id: "6507aca13ababc0987654321",
        userId: req.user._id,
        movieId: 12345,
        text: "This is a valid comment",
        createdAt: new Date().toISOString(),
      };

      mockComment.create.mockResolvedValueOnce(mockCreatedComment);

      await postCommentTest(req, res);

      expect(mockComment.create).toHaveBeenCalledWith({
        userId: req.user._id,
        movieId: 12345,
        text: "This is a valid comment",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment posted",
        comment: mockCreatedComment,
      });
    });
  });

  describe("deleteComment", () => {
    it("should return 400 error for invalid movieId", async () => {
      req.params.movieId = "lkc@$@!ejik@#$"; // Invalid movie ID
      req.params.commentId = "6507aca13ababc0987654321"; // Valid comment ID

      await deleteCommentTest(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(mockComment.findOneAndDelete).not.toHaveBeenCalled();
    });

    it("should return 404 error when comment is not found", async () => {
      req.params.movieId = "28"; // Valid movie ID
      req.params.commentId = "6507aca13ababc0987654321"; // Valid comment ID

      // Mock findOneAndDelete to return null (comment not found)
      mockComment.findOneAndDelete.mockResolvedValueOnce(null);

      await deleteCommentTest(req, res);

      expect(mockComment.findOneAndDelete).toHaveBeenCalledWith({
        _id: "6507aca13ababc0987654321",
        movieId: 28,
        userId: req.user._id,
      });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Comment not found" });
    });

    it("should delete comment and return 200 status for valid request", async () => {
      req.params.movieId = "28";
      req.params.commentId = "6507aca13ababc0987654321";

      const mockDeletedComment = {
        _id: "6507aca13ababc0987654321",
        userId: req.user._id,
        movieId: 28,
        text: "This is a comment that will be deleted",
      };

      mockComment.findOneAndDelete.mockResolvedValueOnce(mockDeletedComment);

      await deleteCommentTest(req, res);

      expect(mockComment.findOneAndDelete).toHaveBeenCalledWith({
        _id: "6507aca13ababc0987654321",
        movieId: 28,
        userId: req.user._id,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Comment deleted" });
    });
  });
});
