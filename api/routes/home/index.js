const express = require("express");
const router = express.Router();
const isAdmin = require("../../middleware/isAdmin");
const isLoggedIn = require("../../middleware/isLoggedIn");

const Addpost = require("./addpost");
const AddAdminPost = require("./addadminpost");
const Getposts = require("./getposts");
const GetAdminPosts = require("./getadminposts");
const DeletePost = require("./deletepost");
const AddComment = require("./addcomment");
const GetComments = require("./getcomments");
const GetMyPosts = require("./getmyposts");
const GetBookmarks = require("./getbookmarks");
const EditBookmark = require("./editbookmark");
const EditLike = require("./editlike");
const GetOthersPosts = require("./getothersposts");
const GetPost = require("./getpost");

router.post("/addpost", isLoggedIn, Addpost);
router.post("/addadminpost", isLoggedIn, isAdmin, AddAdminPost);

router.get("/getposts", isLoggedIn, Getposts);
router.get("/getadminposts", isLoggedIn, GetAdminPosts);

router.delete("/deletepost", isLoggedIn, DeletePost);
router.post("/getcomments", isLoggedIn, GetComments);
router.post("/addcomment", isLoggedIn, AddComment);
router.get("/getmyposts", isLoggedIn, GetMyPosts);

router.get("/getbookmarks", isLoggedIn, GetBookmarks);
router.post("/editbookmark", isLoggedIn, EditBookmark);
router.post("/editlike", isLoggedIn, EditLike);
router.get("/getothersposts/:userid", isLoggedIn, GetOthersPosts);
router.get("/getpost/:postid", isLoggedIn, GetPost);

module.exports = router;
