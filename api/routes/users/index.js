const express = require("express");
const router = express.Router();

const isLoggedIn = require("../../middleware/isLoggedIn");

const GetAll = require("./getall");
const ViewOtherProfile = require("./viewotherprofile");
const Profile = require("./profile");
const UpdateImage = require("./uploadprofileimage");
const GetProfile = require("./viewotherprofile");

router.get("/getall", isLoggedIn, GetAll);
router.get("/profile/:username", isLoggedIn, ViewOtherProfile);
router.put("/profile", isLoggedIn, Profile);
router.post("/uploadprofileimage", isLoggedIn, UpdateImage);
router.get("/profile/:username", isLoggedIn, GetProfile);

module.exports = router;
