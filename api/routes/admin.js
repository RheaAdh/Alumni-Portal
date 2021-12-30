const Event = require("../models/Event");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");

const BlockUser = async (req, res) => {
  try {
    let { userid } = req.body;
    let user = await User.findOne({ _id: userid });
    if (user) {
      if (!user.isVerifiedByAdmin) {
        return res.send({
          success: false,
          data: "already not verified",
        });
      } else {
        user.isVerifiedByAdmin = false;
        await user.save();
        return res.send({ success: true, data: "user unverified" });
      }
    } else {
      return res.send({ success: false, data: "user doesnt exist" });
    }
  } catch (err) {
    console.log("err:");
    console.log(err);
    return res.send({ success: false, data: "Server error" });
  }
};

const VerifyUser = async (req, res) => {
  try {
    let { userid } = req.body;
    let user = await User.findOne({ _id: userid });

    if (user) {
      if (user.isVerifiedByAdmin) {
        return res.send({ success: false, data: "already verified" });
      } else {
        user.isVerifiedByAdmin = true;
        await user.save();
        return res.send({ success: true, data: "user verified" });
      }
    } else {
      return res.send({ success: false, data: "user doesnt exist" });
    }
  } catch (err) {
    return res.send({ success: false, data: "Server error" });
  }
};

const AddEvent = async (req, res) => {
  try {
    let { description, date, time, venue, eventType, eventLink } = req.body;
    let user = await User.findOne({ _id: req.user.id });

    if (user.isAdmin) {
      let newEvent = new Event({
        description,
        date,
        time,
        venue,
        eventType,
        eventLink,
      });
      await newEvent.save();
      return res.send({ success: true, data: "Event added!" });
    } else {
      return res.send({ success: false, data: "You are not admin" });
    }
  } catch (err) {
    console.log("err:");
    console.log(err);
    return res.send({ success: false, data: "Server error" });
  }
};

const DeleteEvent = async (req, res) => {
  try {
    let { eventid } = req.params;
    console.log("eventid:", eventid);
    let user = await User.findOne({ _id: req.user.id });
    if (user.isAdmin) {
      let event = await Event.deleteOne({ _id: eventid });
      if (event) {
        let events = await Event.find({});
        return res.send({ success: true, data: events });
      } else {
        return res.send({ success: false, data: "Event doesnt exist" });
      }
    } else {
      return res.send({ success: false, data: "You are not admin" });
    }
  } catch (err) {
    console.log("err:");
    console.log(err);
    return res.send({ success: false, data: "Server error" });
  }
};

router.post("/verifyuser", isLoggedIn, isAdmin, VerifyUser);
router.post("/blockuser", isLoggedIn, isAdmin, BlockUser);

router.post("/addevent", isLoggedIn, isAdmin, AddEvent);
router.delete("/deleteevent/:eventid", isLoggedIn, isAdmin, DeleteEvent);

module.exports = router;
