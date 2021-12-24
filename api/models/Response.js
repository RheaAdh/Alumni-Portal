const mongoose = require("mongoose");
const Post = require("./Post");

const responseSchema = new mongoose.Schema(
    {
        postid: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        imageLink: { type: String },
        answer: { type: String },
    },
    {
        timestamps: true,
    }
);

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;
