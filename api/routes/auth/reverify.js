const User = require("../../models/User");
const sendEmail = require("./email");

module.exports = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            sendEmail(user.token, user, 2);
            return res.send({
                success: true,
                data: "Check Inbox",
            });
        } else {
            return res.send({
                success: false,
                data: "User isnt registered",
            });
        }
    } catch (err) {
        console.log(`Error : ${err.message}`);
        res.status(500).json({ success: false, msg: "Server Error." });
    }
};
