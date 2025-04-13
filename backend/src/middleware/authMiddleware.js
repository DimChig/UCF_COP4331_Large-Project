const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Extract common functionality into a helper function.
async function getUserFromAuthHeader(authHeader) {
  // Check that the header exists, starts with "Bearer ", and only has two parts.
  if (
    authHeader &&
    authHeader.startsWith("Bearer ") &&
    authHeader.split(" ").length === 2
  ) {
    // Extract the token from the header.
    const token = authHeader.split(" ")[1];
    // Verify the token using the secret.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Retrieve the user from the database, excluding the password.
    return await User.findById(decoded.userId).select("-password");
  }
  // Throw an error if the token was not provided properly.
  throw new Error("No token provided");
}

// Middleware for routes requiring a valid JWT.
const jwtMiddleware = async (req, res, next) => {
  try {
    // Attempt to retrieve the user based on the Authorization header.
    req.user = await getUserFromAuthHeader(req.headers["authorization"]);
    next();
  } catch (error) {
    // Differentiate between a missing token and an invalid token.
    if (error.message === "No token provided") {
      return res.status(401).json({ error: "No Bearer authorization token!" });
    }
    return res.status(401).json({ error: "Invalid token!" });
  }
};

// Optional JWT middleware for routes that allow anonymous access.
// If the token is missing or invalid, req.user is simply set to null.
const jwtMiddlewareOptional = async (req, res, next) => {
  try {
    req.user = await getUserFromAuthHeader(req.headers["authorization"]);
  } catch (error) {
    req.user = null;
  }
  next();
};

module.exports = { jwtMiddleware, jwtMiddlewareOptional };
