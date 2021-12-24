const User = require("../../models/User");
const Post = require("../.././models/Post");
const Conversation = require("../.././models/Conversation");
const Message = require("../.././models/Message");

module.exports = async (req, res) => {
    console.log("in convooooooooooo");
    try {
        let convo;
        convo = await Conversation.find({
            senderid: req.user.id,
        });
        if (!convo) {
            convo = await Conversation.find({
                receiverid: req.user.id,
            });
        }
        if (convo) {
            //loggedin users conversations will be sent
            return res.send({ success: true, data: convo });
        } else {
            return res.send({ success: false, data: "no conversations" });
        }
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
