const mongoose = require("mongoose");
const User = require("./User");

const eventSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
    eventType: { type: String, required: true }, //virtual/physical
    maybe: { type: User, ref: "User" },
    yes: { type: User, ref: "User" },
    no: { type: User, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
