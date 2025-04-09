const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    //UserID
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //MovieID
    movieID: {
      type: mongoose.Schema.Types.String,
      required: true,
    },

    //Comment
    text: {
      type: String,
      required: false,
      trim: true,
      minlength: 1,
    },
  },
  //get timestamps
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentsSchema);
