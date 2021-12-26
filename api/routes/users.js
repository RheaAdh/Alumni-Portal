const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isLoggedIn = require("../middleware/isLoggedIn");

const GetAll = async (req, res) => {
  console.log("get all");
  try {
    const users = await User.find({}).exec();
    return res.send({ success: true, data: users });
  } catch (err) {
    return res.send({ success: false, data: "Server Error" });
  }
};

// const ViewOtherProfile =
const Profile = async (req, res) => {
  try {
    const {
      profileImage,
      college,
      gradYear,
      company,
      prevCompany,
      designation,
      prevDesignation,
      yearsOfExp,
      location,
      house,
    } = req.body;
    console.log(req.body);
    const user = await User.updateOne(
      { email: req.user.email },
      {
        $set: {
          college,
          designation,
          prevDesignation,
          gradYear,
          prevCompany,
          company,
          yearsOfExp,
          location,
          house,
        },
      }
    );
    return res.send({ success: true, data: user });
  } catch (err) {
    return res.send({ success: false, data: "Server Error" });
  }
};

const GetProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
      isVerifiedByAdmin: true,
      isVerified: true,
    }).select("-password");
    if (user) {
      return res.send({ success: true, data: user });
    } else {
      return res.send({ success: false, data: "user doesnt exist" });
    }
  } catch (err) {
    console.log(err);
    return res.send({ success: false, data: "Server Error" });
  }
};

router.get("/getall", isLoggedIn, GetAll);
// router.get("/profile/:username", isLoggedIn, ViewOtherProfile);
router.put("/profile", isLoggedIn, Profile);
router.get("/profile/:username", isLoggedIn, GetProfile);

module.exports = router;
