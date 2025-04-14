const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.getCommentsSummary = async (comments) => {
  const response = await openai.responses.create({
    model: "gpt-4o",
    input: [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes comments of a movie. You must be concise and to the point. Write one paragraph. Sound human-like. Simple language, grammar, and word choices. Be happy, chill, and positive.",
      },
      {
        role: "user",
        content: "Here are the comments: " + comments,
      },
    ],
  });

  return response.output_text;
};
