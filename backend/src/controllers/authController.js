const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  registerSchema,
  loginSchema,
} = require("../validations/authValidation");

// Register new user
exports.register = async (req, res) => {
  try {
    const validation = registerSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }
    const data = validation.data;
    data.login = data.login.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ login: data.login });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with the same login already exists!" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Create user
    const newUser = await User.create({
      login: data.login,
      password: passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    return res.status(200).json({ id: newUser._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error.errors);
    }
    const data = validation.data;
    data.login = data.login.toLowerCase();

    const user = await User.findOne({ login: data.login });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};
