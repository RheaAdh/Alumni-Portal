const express = require("express");
const router = express.Router();

const isLoggedIn = require("../../middleware/isLoggedIn");

const PostConvo = require("./postconvo");
const GetConvo = require("./getconvo");
const AddMsg = require("./addmsg");
const GetMsgs = require("./getmsgs");

// every message has its convoid associated with it
router.post("/addmsg", isLoggedIn, AddMsg);
// to get messages of a particular conversation with a person
router.get("/getmsgs/:convoid", isLoggedIn, GetMsgs);
// get all conversations of curr user with anyone to display on left side
router.get("/getconvo", isLoggedIn, GetConvo);
// start a new conversation with random user
router.post("/postconvo", isLoggedIn, PostConvo);


module.exports = router;
