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
    let { description, date, time, venue, eventType } = req.body;
    let user = await User.findOne({ _id: req.user.id });

    if (user.isAdmin) {
      let newEvent = new Event({
        description,
        date,
        time,
        venue,
        eventType,
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
    let { eventid } = req.body;
    let user = await User.findOne({ _id: req.user.id });
    if (user.isAdmin) {
      let event = await Post.findOne({ _id: eventid });
      if (event) {
        await event.remove();
        return res.send({ success: true, data: "Event deleted!" });
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
router.post("/deleteevent", isLoggedIn, isAdmin, DeleteEvent);

module.exports = router;
