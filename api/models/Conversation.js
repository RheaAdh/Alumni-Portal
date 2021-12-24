const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        senderid: { type: String },
        receiverid: { type: String },
        receiver: { type: Object },
    },
    {
        timestamps: true,
    }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
