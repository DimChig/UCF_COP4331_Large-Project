const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (
    authHeader &&
    authHeader.startsWith("Bearer") &&
    authHeader.includes(" ")
  ) {
    try {
      // Get token from header "Bearer TOKEN"
      const token = authHeader.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get userID form token
      const userId = decoded.userId;

      // Get user from db
      req.user = await User.findById(userId).select("-password");
      // Call next piece of middleware
      return next();
    } catch (error) {
      // Return error that token is invalid
      return res.status(401).json({ error: "Invalid token!" });
    }
  }
  // Return error that token wasn't provided
  return res.status(401).json({ error: "No Bearer authorization token!" });
};

module.exports = { jwtMiddleware };
