const User = require("../../models/User");
const Post = require("../.././models/Post");
const Conversation = require("../.././models/Conversation");
const Message = require("../.././models/Message");

module.exports = async (req, res) => {
    try {
        let { conversationid, senderid, text } = req.body;
        const msg = new Message({
            conversationid,
            senderid,
            text,
        });
        await msg.save();

        return res.send({ success: true, data: msg });
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
