// src/tests/movieController.test.js
const { movieIdSchema } = require("../validations/movieValidation");

const createTestController = (mockMovieInfo) => {
  return {
    getMovieById: async (req, res) => {
      try {
        const { movieId } = req.params;

        // Validate ID
        const validation = movieIdSchema.safeParse({
          movieId: Number(movieId),
        });
        if (!validation.success) {
          return res.status(400).json(validation.error.errors);
        }
        const validationData = validation.data;

        try {
          const movie = await mockMovieInfo({ id: validationData.movieId });
          return res.status(200).json(movie);
        } catch (err) {
          if (err.response && err.response.status === 404) {
            return res.status(404).json({ error: "Movie not found" });
          }
          return res.status(500).json({ error: `Server Error: ${err}` });
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: `Server Error: ${err}` });
      }
    },
  };
};

describe("Movie Controller - getMovieById", () => {
  let req, res, mockMovieInfo, controller;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create mock function
    mockMovieInfo = jest.fn();

    // Create test controller with mock
    controller = createTestController(mockMovieInfo);

    // Mock request and response
    req = {
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 error for invalid movieId", async () => {
    // Invalid movie ID (non-numeric)
    req.params.movieId = "l;lk@#$@9999";

    await controller.getMovieById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(mockMovieInfo).not.toHaveBeenCalled();
  });

  it("should return 404 error when movie is not found", async () => {
    // Valid movie ID but movie not found
    req.params.movieId = "109283547234";

    // Setup mock to throw error with 404 status
    const notFoundError = new Error("Movie not found");
    notFoundError.response = { status: 404 };
    mockMovieInfo.mockRejectedValueOnce(notFoundError);

    await controller.getMovieById(req, res);

    expect(mockMovieInfo).toHaveBeenCalledWith({ id: 109283547234 });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Movie not found" });
  });

  it("should return 200 and movie data for valid request", async () => {
    // Valid movie ID and successful response
    req.params.movieId = "28";

    const mockMovieData = {
      id: 28,
      title: "Apocalypse Now",
      overview: `At the height of the Vietnam war, Captain Benjamin Willard
                is sent on a dangerous mission that, officially, "does not
                exist, nor will it ever exist." His goal is to locate - 
                and eliminate - a mysterious Green Beret Colonel named 
                Walter Kurtz, who has been leading his personal army on 
                illegal guerrilla missions into enemy territory.`,
      release_date: "1979/08/15",
    };

    mockMovieInfo.mockResolvedValueOnce(mockMovieData);

    await controller.getMovieById(req, res);

    expect(mockMovieInfo).toHaveBeenCalledWith({ id: 28 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockMovieData);
  });
});
