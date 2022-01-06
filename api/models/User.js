const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    //Profile
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    gradYear: { type: String },
    company: { type: String },
    prevCompany: { type: String },
    designation: { type: String },
    prevDesignation: { type: String },
    yearsOfExp: { type: Number },
    house: { type: String },
    location: { type: String },
    college: { type: String },
    // Auth
    token: { type: String }, //verify token not jwt token
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isVerifiedByAdmin: { type: Boolean, default: false },
    // Personal
    profileImage: { type: String },
    githubLink: { type: String },
    linkedinLink: { type: String },
    twitterLink: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
