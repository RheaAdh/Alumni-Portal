const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question: { type: String },
    imageLink: { type: String },
    liked: [
      {
        type: String,
      },
    ],
    isAdmin: { type: String, required: false },
    currentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
