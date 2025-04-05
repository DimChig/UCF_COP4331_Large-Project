const { z } = require("zod");

const registerSchema = z.object({
  login: z.string().min(1).max(50),
  password: z.string().min(1).max(100),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
});

const loginSchema = registerSchema.pick({ login: true, password: true });

module.exports = {
  registerSchema,
  loginSchema,
};
