const Event = require("../models/Event");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");

const GetEvents = async (req, res) => {
  try {
    const events = await Event.find({}).exec();
    return res.send({ success: true, data: events });
  } catch (err) {
    console.log("err:");
    console.log(err);
    return res.send({ success: false, data: "Server error" });
  }
};

router.get("/", isLoggedIn, GetEvents);

module.exports = router;
