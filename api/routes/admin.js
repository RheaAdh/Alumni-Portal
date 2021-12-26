const Post = require("../models/Post");
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

const DeleteUser = async (req, res) => {
  try {
    let { userid } = req.body;
    let user = await User.findByIdAndDelete({
      _id: userid,
    });
    return res.send({ success: true, data: "user deleted" });
  } catch (err) {
    console.log("err:");
    console.log(err);
    return res.send({ success: false, data: "Server error" });
  }
};

router.post("/verifyuser", isLoggedIn, isAdmin, VerifyUser);
router.post("/blockuser", isLoggedIn, isAdmin, BlockUser);
router.post("/deleteuser", isLoggedIn, isAdmin, DeleteUser);

module.exports = router;
