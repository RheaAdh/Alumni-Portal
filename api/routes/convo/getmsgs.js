const User = require("../../models/User");
const Post = require("../../models/Post");
const Conversation = require("../.././models/Conversation");
const Message = require("../.././models/Message");

module.exports = async (req, res) => {
    try {
        //returns conversations with user having userid in req.params
        const messages = await Message.find({
            conversationid: req.params.convoid,
        });

        return res.send({ success: true, data: messages });
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
