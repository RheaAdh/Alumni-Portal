const User = require("../../models/User");
const Post = require("../.././models/Post");
const Conversation = require("../.././models/Conversation");
const Message = require("../.././models/Message");

module.exports = async (req, res) => {
    try {
        let oldConvo;
        oldConvo = await Conversation.findOne({
            senderid: req.body.senderid,
            receiverid: req.body.receiverid,
        });
        if (!oldConvo)
            oldConvo = await Conversation.findOne({
                senderid: req.body.receiverid,
                receiverid: req.body.senderid,
            });
        if (oldConvo) {
            return res.send({ success: true, data: oldConvo });
        }
        let receiver = await User.findOne({
            _id: req.body.receiverid,
        });
        console.log(receiver);
        const newConvo = new Conversation({
            senderid: req.body.senderid,
            receiverid: req.body.receiverid,
            receiver: receiver,
        });
        await newConvo.save();
        return res.send({ success: true, data: newConvo, status: 1 });
    } catch (err) {
        return res.send({ success: false, data: "Server Error" });
    }
};
