const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    //UserId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //MovieId
    movieId: {
      type: Number,
      required: true,
    },

    //Comment
    text: {
      type: String,
      required: false,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
  },
  //get timestamps
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentsSchema);
