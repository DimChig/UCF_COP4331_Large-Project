// src/tests/userSettingsController.test.js

// Import dependencies and validations
const userSettingsController = require("../controllers/userSettingsController");
const UserSettings = require("../models/UserSettings");
const {
  updateSettingsSchema,
  ratingSchema,
} = require("../validations/userSettingsValidation");

// Mock the UserSettings model
jest.mock("../models/UserSettings");

describe("UserSettings Controller", () => {
  let req, res;

  beforeEach(() => {
    // Reset request and response objects for each test
    req = {
      user: { _id: "1", userId: "1" },
      params: { movieId: "123" },
      body: {}, // you can modify body to simulate different validations
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  describe("likeMovie", () => {
    it("should return 404 if user is not found", async () => {
      // Simulate missing user
      req.user = null;

      await userSettingsController.likeMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });

  describe("rateMovie", () => {
    it("should return error 400 if rating is invalid", async () => {
      // Here, req.body does not include a valid rating value so that it fails validation
      await userSettingsController.rateMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      // The response should contain the error message and an array of validation errors,
      // similar to what your validation library returns.
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Invalid rating",
          errors: expect.any(Array),
        })
      );
    });
  });
});
