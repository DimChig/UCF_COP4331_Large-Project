const { z } = require("zod");

const searchMoviesSchema = z.object({
    query: z.string().min(1).max(100),
    page: z.coerce.number().positive().optional().default(1),
    limit: z.coerce.number().min(1).max(30).optional().default(15),
});

const getMoviesPathSchema = z.object({
    page: z.number().positive().default(1),
    limit: z.number().min(1).max(30).default(20)
});

module.exports = {
    searchMoviesSchema,
    getMoviesPathSchema
}