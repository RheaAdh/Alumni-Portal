const express = require("express");
const router = express.Router();

const isLoggedIn = require("../../middleware/isLoggedIn");
const LoginUser = require("./login");
const RegisterUser = require("./register");
const GetUser = require("./getuser");
const ForgotPassword = require("./forgotpassword");
const ResetPassword = require("./resetpassword");
const VerifyEmail = require("./verifyemail");
const ReVerify = require("./reverify");
const getUserFromToken = require("./getuserfromtoken");

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/forgotpassword", ForgotPassword);
router.post("/resetpassword/:token", ResetPassword);
router.post("/reverify", ReVerify);
router.get("/verifyemail/:token", VerifyEmail);
router.get("/getuser", isLoggedIn, GetUser);
router.get("/user/:token", getUserFromToken);

module.exports = router;
