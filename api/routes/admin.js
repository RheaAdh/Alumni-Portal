const Event = require("../models/Event");
const User = require("../models/User");
const Gallery = require("../models/Gallery");
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
  } catch (err) {
    return res.send({ success: false, data: "Server error" });
  }
};

const DeleteEvent = async (req, res) => {
  try {
    let { eventid } = req.params;
    console.log("eventid:", eventid);

    let event = await Event.deleteOne({ _id: eventid });
    if (event) {
      let events = await Event.find({});
      return res.send({ success: true, data: events });
    } else {
      return res.send({ success: false, data: "Event doesnt exist" });
    }
  } catch (err) {
    return res.send({ success: false, data: "Server error" });
  }
};

const AddDriveLink = async (req, res) => {
  console.log("aaaaaaa");
  try {
    console.log("aaaaaaa");
    let { driveLink, title } = req.body;
    let eventPics = await new Gallery({
      driveLink,
      title,
    });
    await eventPics.save();
    return res.send({ success: true, data: "Drive Link added" });
  } catch (err) {
    console.log("err:");
    console.log(err);
    return res.send({ success: false, data: "Server error" });
  }
};

const GetDriveLink = async (req, res) => {
  try {
    let links = await Gallery.find({}).exec();
    return res.send({ success: true, data: links });
  } catch (err) {
    return res.send({ success: false, data: "Server error" });
  }
};

const DeleteDriveLink = async (req, res) => {
  try {
    let { linkid } = req.params;

    let event = await Gallery.deleteOne({ _id: linkid });
    if (event) {
      let events = await Gallery.find({});
      return res.send({ success: true, data: events });
    } else {
      return res.send({
        success: false,
        data: "Event Gallery Link doesnt exist",
      });
    }
  } catch (err) {
    return res.send({ success: false, data: "Server error" });
  }
};

const MakeAdmin = async (req, res) => {
  try {
    let { userid } = req.body;
    let user = await User.findOne({ _id: userid });
    if (user) {
      if (user.isAdmin) {
        return res.send({
          success: true,
          data: "admin already",
        });
      } else {
        user.isAdmin = true;
        await user.save();
        return res.send({ success: true, data: "user admin access granted" });
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

const RemoveAdmin = async (req, res) => {
  try {
    let { userid } = req.body;
    let user = await User.findOne({ _id: userid });
    if (user) {
      if (!user.isAdmin) {
        return res.send({
          success: true,
          data: "not admin already",
        });
      } else {
        user.isAdmin = false;
        await user.save();
        return res.send({ success: true, data: "user admin access removed" });
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

router.post("/verifyuser", isLoggedIn, isAdmin, VerifyUser);
router.post("/blockuser", isLoggedIn, isAdmin, BlockUser);

router.post("/addevent", isLoggedIn, isAdmin, AddEvent);
router.delete("/deleteevent/:eventid", isLoggedIn, isAdmin, DeleteEvent);

router.post("/adddrivelink", isLoggedIn, isAdmin, AddDriveLink);
router.get("/getdrivelink", isLoggedIn, GetDriveLink);
router.delete("/deletedrivelink/:linkid", isLoggedIn, isAdmin, DeleteDriveLink);
router.post("/makeadmin", isLoggedIn, isAdmin, MakeAdmin);
router.post("/removeadmin", isLoggedIn, isAdmin, RemoveAdmin);

module.exports = router;
